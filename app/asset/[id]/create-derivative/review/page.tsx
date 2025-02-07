'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage, db } from '@/lib/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useWalletClient } from "wagmi"
import Image from 'next/image'
import { SUSDAddress } from '@/lib/story-protocol/utils/utils'

interface ReviewData {
  name: string;
  description: string;
  image: string;
  attributes: { key: string; value: string }[];
  tags: string[];
  derivativeType: string;
  parentId: string;
}

interface ParentAsset {
  id: string;
  ipid: string;
  title: string;
  description: string;
  imageURL: string;
  creator: string;
  price: number;
  license: {
    terms: {
      commercialUse: boolean;
      commercialAttribution: boolean;
      commercialRevShare: number;
      derivativesAllowed: boolean;
      derivativesAttribution: boolean;
      derivativesReciprocal: boolean;
      transferable: boolean;
    }
  };
}

export default function ReviewDerivativePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: wallet } = useWalletClient()
  const [reviewData, setReviewData] = useState<ReviewData | null>(null)
  const [parentAsset, setParentAsset] = useState<ParentAsset | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Get data from URL params and localStorage
    const parentId = searchParams.get('parentId')
    if (!parentId) {
      router.push('/')
      return
    }

    // Fetch parent asset data
    const fetchParentAsset = async () => {
      try {
        const assetDoc = await getDoc(doc(db, 'IPA', parentId));
        if (assetDoc.exists()) {
          const data = assetDoc.data();
          setParentAsset({
            id: assetDoc.id,
            ipid: String(data.ipId || ''),
            title: String(data.title || ''),
            description: String(data.description || ''),
            imageURL: String(data.imageURL || ''),
            creator: String(data.creator_name || ''),
            price: Number(data.price || 0),
            license: data.license
          });
        }
      } catch (error) {
        console.error('Error fetching parent asset:', error);
      }
    };

    const data: ReviewData = {
      name: localStorage.getItem('derivativeName') || '',
      description: localStorage.getItem('derivativeDescription') || '',
      image: '',
      attributes: JSON.parse(localStorage.getItem('derivativeAttributes') || '[]'),
      tags: JSON.parse(localStorage.getItem('derivativeTags') || '[]'),
      derivativeType: localStorage.getItem('derivativeType') || '',
      parentId
    }

    // Get image from IndexedDB
    const getImageFromIndexedDB = async () => {
      const request = indexedDB.open('derivativeStore', 1)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction('derivatives', 'readonly')
        const store = transaction.objectStore('derivatives')
        const imageRequest = store.get('derivativeImage')
        
        imageRequest.onsuccess = () => {
          if (imageRequest.result) {
            data.image = imageRequest.result
            setReviewData(data)
          }
        }
      }
    }

    fetchParentAsset();
    getImageFromIndexedDB();
  }, [searchParams, router])

  const handleSubmit = async () => {
    if (!reviewData || !wallet?.account?.address || !parentAsset) {
      alert('Missing required data or wallet not connected')
      return
    }

    setIsSubmitting(true)
    try {
      // Upload image to Firebase Storage
      const imageId = uuidv4()
      const imageRef = ref(storage, `ip_assets/${imageId}`)
      await uploadString(imageRef, reviewData.image, 'data_url')
      const imageUrl = await getDownloadURL(imageRef)

      // Create request data
      const requestData = {
        status: 'pending',
        createdAt: new Date().toISOString(),
        parent: reviewData.parentId,
        creator: wallet.account.address,
        title: reviewData.name,
        description: reviewData.description,
        imageURL: imageUrl,
        attributes: reviewData.attributes.filter(attr => attr.key && attr.value),
        tags: reviewData.tags,
        remix: 0,
        royalty: 0,
      }

      // Create request document in Requests collection
      const requestDoc = await addDoc(collection(db, 'Requests'), requestData)

      // Clear all stored data
      localStorage.removeItem('derivativeName')
      localStorage.removeItem('derivativeDescription')
      localStorage.removeItem('derivativeAttributes')
      localStorage.removeItem('derivativeTags')
      localStorage.removeItem('derivativeType')

      const request = indexedDB.open('derivativeStore', 1)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction('derivatives', 'readwrite')
        const store = transaction.objectStore('derivatives')
        store.delete('derivativeImage')
      }

      // Redirect to result page
      router.push(`/asset/${reviewData.parentId}/create-derivative/result?requestId=${requestDoc.id}`)
    } catch (error) {
      console.error('Error submitting derivative:', error)
      alert('Failed to submit derivative. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!reviewData || !parentAsset) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Review Your Derivative</h1>
      <div className="grid grid-cols-1 gap-6">
        {/* Derivative Preview Card - Now full width */}
        <Card>
          <CardHeader>
            <CardTitle>Your Derivative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Section */}
              {reviewData.image && (
                <div className="md:w-1/2">
                  <div className="aspect-square max-w-md mx-auto relative">
                    <img 
                      src={reviewData.image} 
                      alt="Preview" 
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-xl font-bold">{reviewData.name}</h2>
                <p className="text-sm text-gray-500">{reviewData.derivativeType}</p>
                <p className="text-sm text-gray-500">{reviewData.description}</p>
                
                {reviewData.attributes.length > 0 && reviewData.attributes[0].key && (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-2">Attributes</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {reviewData.attributes.map((attr, index) => (
                        attr.key && (
                          <div key={index} className="bg-secondary p-2 rounded">
                            <span className="font-medium">{attr.key}:</span> {attr.value}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
                
                {reviewData.tags.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {reviewData.tags.map((tag) => (
                        <span key={tag} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Terms and Fees Card */}
        <Card>
          <CardHeader>
            <CardTitle>License Terms & Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Commercial Terms */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Commercial Terms</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Commercial Use</span>
                    <span>{parentAsset.license.terms.commercialUse ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attribution Required</span>
                    <span>{parentAsset.license.terms.commercialAttribution ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue Share</span>
                    <span>{parentAsset.license.terms.commercialRevShare}%</span>
                  </div>
                </div>
              </div>

              {/* Derivative Terms */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Derivative Terms</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Attribution Required</span>
                    <span>{parentAsset.license.terms.derivativesAttribution ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reciprocal License</span>
                    <span>{parentAsset.license.terms.derivativesReciprocal ? 'Required' : 'Not Required'}</span>
                  </div>
                </div>
              </div>

              {/* Fees Section */}
              <div className="md:col-span-2 mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Fees</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Minting Fee</p>
                      <p className="text-sm text-gray-600">One-time fee paid to create the derivative</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{parentAsset.price} sUSD</p>
                      <p className="text-sm text-gray-500">≈ ${parentAsset.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Revenue Share</p>
                      <p className="text-sm text-gray-600">Ongoing share of commercial revenue</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{parentAsset.license.terms.commercialRevShare}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Edit Details
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
          </Button>
        </div>
      </div>
    </div>
  )
} 