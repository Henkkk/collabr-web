"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletClient } from 'wagmi';
import { zeroAddress } from 'viem'
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { licenseTemplates } from '@/lib/constants/licenseTemplates';
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
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const handleSubmit = async (e: React.FormEvent, pilTerms: any) => {
        e.preventDefault();
        if (!wallet?.account?.address) {
            alert('Failed to create asset, because there is no wallet connected');
            return;
        }
        setIsSubmitting(true);
        try {
            // Get asset data from localStorage and IndexedDB
            const assetName = localStorage.getItem('assetName');
            const assetDescription = localStorage.getItem('assetDescription');
            const assetAttributes = JSON.parse(localStorage.getItem('assetAttributes') || '[]');
            const assetTags = JSON.parse(localStorage.getItem('assetTags') || '[]');

            // Get image from IndexedDB
            const IndexedDB = await initDB();
            const transaction = IndexedDB.transaction('assets', 'readonly');
            const store = transaction.objectStore('assets');
            const imageRequest = store.get('assetImage');
            
            const assetImage = await new Promise<string>((resolve, reject) => {
                imageRequest.onsuccess = () => resolve(imageRequest.result);
                imageRequest.onerror = () => reject(imageRequest.error);
            });

            if (!assetName || !assetImage) {
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
                attributes: assetAttributes.map((attr: AssetAttribute) => ({
                    key: attr.key,
                    value: attr.value,
                })),
                tags: assetTags,
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
            console.log('pilTerms', pilTerms)
            
            const spResponse = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
                spgNftContract: process.env.NEXT_PUBLIC_SPG_NFT_CONTRACT_ADDRESS as `0x${string}`,
                terms: [{
                    transferable: formData.transferable === 'true',
                    royaltyPolicy: selectedTemplate === '1' ? zeroAddress : "0x7D2d9af4E4ab14Afcfd86436BC348928B40963Dd",
                    defaultMintingFee: Number(formData.defaultMintingFee) || 0,
                    expiration: BigInt(convertDateToTimestamp(formData.expiration)),
                    commercialUse: pilTerms.commercialUse,
                    commercialAttribution: pilTerms.commercialAttribution,
                    commercializerChecker: zeroAddress,
                    commercializerCheckerData: zeroAddress,
                    commercialRevShare: Number(formData.commercialRevShare) || 0,
                    commercialRevCeiling: Number(formData.commercialRevCeiling) || 0,
                    derivativesAllowed: pilTerms.derivativesAllowed,
                    derivativesAttribution: pilTerms.derivativesAttribution,
                    derivativesApproval: pilTerms.derivativesApproval,
                    derivativesReciprocal: formData.derivativesReciprocal === 'true',
                    derivativeRevCeiling: "",
                    currency: "0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5",
                    uri: formData.uri || '',
                }],
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
            const clearTransaction = IndexedDB.transaction('assets', 'readwrite');
            const clearStore = clearTransaction.objectStore('assets');
            clearStore.delete('assetImage');

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
    const LicenseConfiguration = ({ template, onBack }: { 
        template: typeof licenseTemplates[0], 
        onBack: () => void 
    }) => {
        // Add useEffect to set default royalty policy when commercial use is enabled
        useEffect(() => {
            if ((template.id === '2' || template.id === '3') && !formData.royaltyPolicy) {
                setFormData(prev => ({
                    ...prev,
                    royaltyPolicy: "0x7D2d9af4E4ab14Afcfd86436BC348928B40963Dd"
                }));
            }
        }, [template.id]); // Only run when template.id changes

        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">{template.name}</h2>
                <form className="space-y-4" onSubmit={(e) => {
                    const pilTerms = {
                        ...((template.id === '1') ? {
                            derivativesAllowed: true,
                            derivativesAttribution: true,
                            derivativesApproval: false,
                            derivativesReciprocal: true,
                            commercialUse: false,
                            commercialAttribution: false,
                            derivativeRevCeiling: BigInt(0),
                            royaltyPolicy: "",
                        } : {}),
                        
                        ...((template.id === '2') ? {
                            derivativesAllowed: formData.derivativesAllowed === 'true',
                            derivativesAttribution: formData.derivativesAttribution === 'true',
                            derivativesApproval: formData.derivativesApproval === 'true',
                            commercialUse: true,
                            commercialAttribution: true,
                            royaltyPolicy: "0x7D2d9af4E4ab14Afcfd86436BC348928B40963Dd",
                        } : {}),
                        ...((template.id === '3') ? {
                            derivativesAllowed: true,
                            derivativesAttribution: true,
                            commercialUse: true,
                            commercialAttribution: true,
                            royaltyPolicy: "0x7D2d9af4E4ab14Afcfd86436BC348928B40963Dd",
                        } : {}),
                        transferable: formData.transferable === 'true',
                        royaltyPolicy: template.id === '1' ? "" : "0x7D2d9af4E4ab14Afcfd86436BC348928B40963Dd",
                        defaultMintingFee: parseFloat(formData.defaultMintingFee || '0'),
                        expiration: convertDateToTimestamp(formData.expiration),
                        commercializerChecker: formData.commercializerChecker || zeroAddress,
                        commercializerCheckerData: formData.commercializerCheckerData || zeroAddress,
                        commercialRevShare: parseInt(formData.commercialRevShare || '50'),
                        commercialRevCeiling: "",
                        derivativesApproval: false,
                        derivativesReciprocal: formData.derivativesReciprocal === 'true',
                        derivativeRevCeiling: "",
                        currency: "0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5",
                        uri: formData.uri || "",
                    };
                    handleSubmit(e, pilTerms);
                }}>
                    {template.id === '1' && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Derivatives Allowed
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Derivatives Attribution
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commercial Use
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="false"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commercial Attribution
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </>
                    )}
                    {template.id === '2' && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commercial Use
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commercial Attribution
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </>
                    )}
                    {template.id === '3' && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Derivatives Allowed
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Derivatives Attribution
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commercial Use
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commercial Attribution
                                    <span className="ml-1 text-xs text-gray-500">(preset)</span>
                                </label>
                                <select 
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="true"
                                    disabled
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </>
                    )}
                    {template.parameters.map((param) => (
                        <div key={param}>
                            <label className="block text-sm font-medium mb-1">
                                {param.split(/(?=[A-Z])/).join(' ')}
                            </label>
                            {param === 'currency' ? (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                    value="sUSD (0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5)"
                                    disabled
                                />
                            ) : param === 'defaultMintingFee' || param === 'commercialRevCeiling' ? (
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-2 border rounded"
                                    value={formData[param] || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [param]: e.target.value
                                    })}
                                />
                            ) : ['royaltyPolicy', 'commercializerChecker', 'commercializerCheckerData'].includes(param) ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="w-full p-2 border rounded"
                                        value={formData[param] || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            [param]: e.target.value
                                        })}
                                    />
                                    {param === 'royaltyPolicy' && (
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">
                                                Currency
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                                value="sUSD (0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5)"
                                                disabled
                                            />
                                        </div>
                                    )}
                                </>
                            ) : param === 'commercialRevShare' ? (
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-full p-2 border rounded"
                                    value={formData[param] || '0'}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [param]: e.target.value
                                    })}
                                />
                            ) : param === 'uri' ? (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={formData[param] || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [param]: e.target.value
                                    })}
                                />
                            ) : param === 'expiration' ? (
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={formData[param] || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [param]: e.target.value
                                    })}
                                />
                            ) : (
                                <select
                                    className="w-full p-2 border rounded"
                                    value={formData[param] || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [param]: e.target.value
                                    })}
                                >
                                    <option value="">Select...</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            )}
                        </div>
                    ))}
                    
                    <div className="flex justify-between gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            disabled={isSubmitting}
                        >
                            Select another license
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create PIL License'}
                        </button>
                    </div>
                </form>
            </div>
        );
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
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Attach License</h1>
                    <a 
                        href="https://github.com/piplabs/pil-document/blob/v1.3.0/Story%20Foundation%20-%20Programmable%20IP%20License%20(1.31.25).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors text-sm font-medium flex items-center gap-1.5"
                    >
                        <span>Learn More</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
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
            
            {!selectedTemplate ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {licenseTemplates.map((template) => (
                            <div 
                                key={template.id}
                                className="border p-4 rounded-lg cursor-pointer hover:border-blue-500"
                                onClick={() => setSelectedTemplate(template.id)}
                            >
                                <h2 className="font-semibold">{template.name}</h2>
                                <p className="text-sm text-gray-600 mt-2">{template.description}</p>
                                
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                                        This license allows:
                                    </h3>
                                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                        {template.details.map((detail, index) => (
                                            <li key={index}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => router.push('/create/custom-license')}
                        className="w-full mt-6 p-4 border-2 border-dashed border-blue-500 rounded-lg text-blue-500 hover:bg-blue-50 flex items-center justify-center"
                    >
                        <span className="text-xl mr-2">+</span>
                        Create Custom License from Scratch
                    </button>
                </>
            ) : (
                <LicenseConfiguration 
                    template={licenseTemplates.find(t => t.id === selectedTemplate)!}
                    onBack={() => setSelectedTemplate(null)}
                />
            )}
        </div>
    );
}