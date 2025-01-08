"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletClient } from 'wagmi';
import { zeroAddress } from 'viem'
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { licenseTemplates } from '@/lib/constants/licenseTemplates';
import { v4 as uuidv4 } from 'uuid';

const convertDateToTimestamp = (dateString: string) => {
    return dateString ? new Date(dateString).getTime() : 0;
};

const SUPPORTED_CURRENCIES = [
  'BTC',
  'ETH',
  'USDT',
  'BNB',
  'XRP',
  'ADA',
  'SOL',
  'DOT',
  'DOGE',
  'MATIC'
] as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

export default function AttachLicensePage() {
    const router = useRouter();
    const { data: wallet } = useWalletClient();
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent, pilTerms: any) => {
        e.preventDefault();
        if (!wallet?.account?.address) {
            alert('Failed to create asset, because there is no wallet connected');
            return;
        }

        setIsSubmitting(true);

        try {
            // Get asset data from localStorage
            const assetName = localStorage.getItem('assetName');
            const assetDescription = localStorage.getItem('assetDescription');
            const assetImage = localStorage.getItem('assetImage');
            const assetAttributes = JSON.parse(localStorage.getItem('assetAttributes') || '[]');
            const assetTags = JSON.parse(localStorage.getItem('assetTags') || '[]');

            if (!assetName || !assetImage) {
                throw new Error('Missing required asset data');
            }

            // Upload image to Firebase Storage
            const imageId = uuidv4();
            const imageRef = ref(storage, `ip_assets/${imageId}/${Date.now()}`);
            await uploadString(imageRef, assetImage, 'data_url');
            const imageUrl = await getDownloadURL(imageRef);

            // Convert BigInt values to strings and ensure proper data types
            const sanitizedPilTerms = {
                ...pilTerms,
                derivativeRevCeiling: Number(pilTerms.derivativeRevCeiling) || 0,
                commercialRevCeiling: Number(pilTerms.commercialRevCeiling) || 0,
                commercialRevShare: Number(pilTerms.commercialRevShare),
                defaultMintingFee: Number(pilTerms.defaultMintingFee),
            };

            // Create new IPA document with sanitized data
            const ipaData = {
                title: assetName,
                description: assetDescription,
                imageURL: imageUrl,
                attributes: assetAttributes,
                tags: assetTags,
                createdAt: new Date().toISOString(),
                license: {
                    terms: sanitizedPilTerms
                },
                remix: 0,
                royalty: 0,
                expiration: convertDateToTimestamp(formData.expiration),
            };

            const ipaRef = await addDoc(collection(db, 'IPA'), ipaData);
            console.log("New IPA created with ID:", ipaRef.id);

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

            // Clear localStorage
            localStorage.removeItem('assetName');
            localStorage.removeItem('assetDescription');
            localStorage.removeItem('assetImage');
            localStorage.removeItem('assetAttributes');
            localStorage.removeItem('assetTags');

            router.push('/profile');

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
                        } : {}),
                        
                        ...((template.id === '2') ? {
                            commercialUse: true,
                            commercialAttribution: true,
                        } : {}),

                        ...((template.id === '3') ? {
                            derivativesAllowed: true,
                            derivativesAttribution: true,
                            commercialUse: true,
                            commercialAttribution: true,
                        } : {}),

                        transferable: formData.transferable === 'true',
                        royaltyPolicy: formData.royaltyPolicy || "",
                        defaultMintingFee: parseFloat(formData.defaultMintingFee || '0'),
                        expiration: convertDateToTimestamp(formData.expiration),
                        commercializerChecker: "",
                        commercializerCheckerData: "",
                        commercialRevShare: parseInt(formData.commercialRevShare || '50'),
                        commercialRevCeiling: "",
                        derivativesApproval: false,
                        derivativesReciprocal: formData.derivativesReciprocal === 'true',
                        derivativeRevCeiling: "",
                        currency: formData.currency || zeroAddress,
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

                    {template.parameters.map((param, index) => (
                        <div key={index}>{param}</div>
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Attach License</h1>
                <button
                    onClick={() => router.push('/create/create-asset')}
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