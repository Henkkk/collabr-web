"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletClient } from 'wagmi';
import { zeroAddress } from 'viem'
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '@/components/ui/notification';
import { client } from '@/lib/story-protocol/utils/utils'
import { uploadJSONToIPFS } from '@/lib/story-protocol/utils/uploadToIpfs'
import { createHash } from 'crypto'
import { IpMetadata } from '@story-protocol/core-sdk'

interface AssetAttribute {
    key: string;
    value: string;
}

const convertDateToTimestamp = (dateString: string) => {
    return dateString ? new Date(dateString).getTime() : 0;
};
const SUPPORTED_CURRENCIES = ['sUSD'] as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

const initDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('assetStore', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('assets')) {
        db.createObjectStore('assets');
      }
    };
  });
};

export default function AttachLicensePage() {
    const router = useRouter();
    const { data: wallet } = useWalletClient();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [assetImage, setAssetImage] = useState<string | null>(null);
    const [assetName, setAssetName] = useState<string | null>(null);
    const [assetDescription, setAssetDescription] = useState<string | null>(null);
    const [assetAttributes, setAssetAttributes] = useState<string | null>(null);
    const [assetTags, setAssetTags] = useState<string | null>(null);

    const [licenseData, setLicenseData] = useState<AssetLicense>({
        requiresAttribution: false,
        licenseFee: 0,
        revenueShare: 0,
        expiration: new Date()
    });

    interface AssetLicense {
        requiresAttribution: boolean;
        licenseFee: number;
        revenueShare: number;
        expiration: Date;
    }

    const getLicenseFromLocalStorage = (): AssetLicense | null => {
        const data = localStorage.getItem("assetLicense");
        if (!data) return null;
      
        const parsed = JSON.parse(data);
      
        // Ensure expiration is a Date object
        if (parsed.expiration && typeof parsed.expiration === "string") {
          parsed.expiration = new Date(parsed.expiration);
        }

        if (parsed.requiresAttribution && typeof parsed.requiresAttribution === "boolean") {
            parsed.requiresAttribution = Boolean(parsed.requiresAttribution)
        }
      
        return parsed;
    };

    useEffect(() => {
        const loadImageFromIndexedDB = async () => {
            try {
                const db = await initDB();
                const transaction = db.transaction('assets', 'readonly');
                const store = transaction.objectStore('assets');
                const imageRequest = store.get('assetImage');

                imageRequest.onsuccess = () => {
                    if (imageRequest.result) {
                        setAssetImage(imageRequest.result);
                    }
                };

                imageRequest.onerror = () => {
                    console.error('Failed to load image from IndexedDB:', imageRequest.error);
                };
            } catch (error) {
                console.error('Error loading image from IndexedDB:', error);
            }
        };

        setAssetName(localStorage.getItem('assetName'))
        setAssetDescription(localStorage.getItem('assetDescription'))
        setAssetAttributes(localStorage.getItem('assetAttributes'))
        setAssetTags(localStorage.getItem('assetTags'))

        const savedLicense = getLicenseFromLocalStorage();
        if (savedLicense && JSON.stringify(savedLicense) !== JSON.stringify(licenseData)) {
            setLicenseData(savedLicense);
        }

        // Load Image from IndexedDB when the page loads
        loadImageFromIndexedDB();
    }, []); // Runs only once when the component mounts

    const clearIndexedDB = async () => {
        try {
            const db = await initDB();
            const transaction = db.transaction('assets', 'readwrite');
            const store = transaction.objectStore('assets');
            store.delete('assetImage');
        } catch (error) {
            console.error('Error clearing IndexedDB:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent, pilTerms: any) => {
        e.preventDefault();
        if (!wallet?.account?.address) {
            alert('Failed to create asset, because there is no wallet connected');
            return;
        }
        setIsSubmitting(true);
        try {
            if (!assetImage) {
                throw new Error('Missing required asset data');
            }

            // Upload image to Firebase Storage first
            const imageId = uuidv4();
            const imageRef = ref(storage, `ip_assets/${imageId}`);
            await uploadString(imageRef, assetImage, 'data_url');
            const imageURL = await getDownloadURL(imageRef);

            // 1. Set up Story Protocol IP Metadata
            const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
                title: assetName || '',
                description: assetDescription || '',
                attributes: JSON.parse(assetAttributes || '[]').map((attr: AssetAttribute) => ({
                    key: attr.key,
                    value: attr.value,
                })),
                tags: JSON.parse(assetTags || '[]'),
            });

            // 2. Set up NFT Metadata
            const nftMetadata = {
                name: assetName,
                description: assetDescription,
                image: imageURL,
                attributes: assetAttributes,
                tags: assetTags,
            };

            // 3. Upload metadata to IPFS
            const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
            const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex');
            const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
            const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex');

            // 4. Register the NFT as an IP Asset with Story Protocol
            const spResponse = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
                spgNftContract: process.env.NEXT_PUBLIC_SPG_NFT_CONTRACT_ADDRESS as `0x${string}`,
                terms: pilTerms,
                ipMetadata: {
                    ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
                    ipMetadataHash: `0x${ipHash}`,
                    nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
                    nftMetadataHash: `0x${nftHash}`,
                },
                txOptions: { waitForTransaction: true },
            });

            const sanitizedPilTerms = {
                ...pilTerms,
                derivativeRevCeiling: Number(pilTerms.derivativeRevCeiling) || 0,
                commercialRevCeiling: Number(pilTerms.commercialRevCeiling) || 0,
                commercialRevShare: Number(pilTerms.commercialRevShare),
                defaultMintingFee: Number(pilTerms.defaultMintingFee),
            };

            // Create new IPA document with sanitized data and image URL
            const ipaData = {
                title: assetName,
                description: assetDescription,
                imageURL: imageURL,
                attributes: assetAttributes,
                tags: assetTags,
                createdAt: new Date().toISOString(),
                license: {
                    terms: sanitizedPilTerms
                },
                remix: 0,
                royalty: 0,
                expiration: convertDateToTimestamp(formData.expiration),
                ipId: spResponse.ipId, // Store Story Protocol IP ID
                txHash: spResponse.txHash, // Store transaction hash
            };

            const ipaRef = await addDoc(collection(db, 'IPA'), ipaData);
            
            // Update user's IP array - find user by wallet address
            const usersSnapshot = await getDocs(query(
                collection(db, 'Users'),
                where('wallet_address', '==', wallet.account.address)
            ));
            if (!usersSnapshot.empty) {
                const userDoc = usersSnapshot.docs[0];
                await updateDoc(userDoc.ref, {
                    ip: arrayUnion(doc(db, 'IPA', ipaRef.id))
                });
            } else {
                console.error('User document not found for wallet address:', wallet.account.address);
            }

            // Clear IndexedDB after successful submission
            clearIndexedDB();

            // Clear localStorage
            localStorage.removeItem('assetName');
            localStorage.removeItem('assetDescription');
            localStorage.removeItem('assetAttributes');
            localStorage.removeItem('assetTags');
            
            // Show notification instead of redirecting immediately
            setShowNotification(true);
        } catch (error) {
            console.error('Error creating asset:', error);
            alert('Failed to create asset. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Notification
                message="Asset created successfully!"
                isOpen={showNotification}
                onClose={() => setShowNotification(false)}
                onConfirm={() => router.push('/profile')}
                type="success"
                showConfirm={true}
            />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Review & Attach License</h1>
                <button
                    onClick={() => {
                        // Don't clear any data when going back to create-asset
                        router.push('/create/create-asset');
                    }}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Back
                </button>
            </div>
    
            {/* Display Asset Information */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Asset Information</h2>
                <p><strong>Name:</strong> {assetName || 'N/A'}</p>
                <p><strong>Description:</strong> {assetDescription || 'N/A'}</p>
    
                {/* Display image if available */}
                <div className="mt-4">
                    <strong>Image:</strong>
                    {assetImage ? (
                        <img
                            src={assetImage as string}
                            alt="Asset Preview"
                            className="mt-2 h-32 w-auto max-w-xs rounded"
                        />
                    ) : (
                        <p>No image available.</p>
                    )}
                </div>
    
                {/* Display Attributes */}
                <div className="mt-4">
                    <strong>Attributes:</strong>
                    {JSON.parse(assetAttributes || '[]').length > 0 ? (
                        <ul className="list-disc list-inside mt-2">
                            {JSON.parse(assetAttributes || '[]').map(
                                (attr: { key: string; value: string }, index: number) => (
                                    <li key={index}>{attr.key}: {attr.value}</li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>No attributes specified.</p>
                    )}
                </div>
    
                {/* Display Tags */}
                <div className="mt-4">
                    <strong>Tags:</strong>
                    {JSON.parse(assetTags || '[]').length > 0 ? (
                        <p>{JSON.parse(assetTags || '[]').join(', ')}</p>
                    ) : (
                        <p>No tags specified.</p>
                    )}
                </div>
            </div>
    
            {/* Display License Details */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">License Details</h2>
                <p><strong>Requires Attribution:</strong> {licenseData.requiresAttribution ? "Yes" : "No"}</p>
                <p><strong>Remix Fee:</strong> {licenseData.licenseFee}</p>
                <p><strong>Revenue Share:</strong> {`${licenseData.revenueShare}%`}</p>
                <p><strong>Expiration Date:</strong> {licenseData.expiration instanceof Date && !isNaN(licenseData.expiration.getTime()) 
    ? licenseData.expiration.toDateString() 
    : "Never"}</p>
            </div>
    
            {/* Submit Button */}
            <button
                onClick={(e) => handleSubmit(e, formData)}
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Asset with License'}
            </button>
        </div>
    );
}