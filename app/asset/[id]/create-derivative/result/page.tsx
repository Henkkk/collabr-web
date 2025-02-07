'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { CheckCircle2, Share2, Twitter, Facebook, Linkedin } from 'lucide-react'

interface RequestData {
  status: string;
  title: string;
  imageURL: string;
  parent: string;
}

interface ParentAsset {
  title: string;
  creator_name: string;
}

export default function DerivativeResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [request, setRequest] = useState<RequestData | null>(null)
  const [parentAsset, setParentAsset] = useState<ParentAsset | null>(null)
  const requestId = searchParams.get('requestId')
  const [isShareOpen, setIsShareOpen] = useState(false)

  useEffect(() => {
    if (!requestId) {
      router.push('/')
      return
    }

    const fetchRequestData = async () => {
      try {
        const requestDoc = await getDoc(doc(db, 'Requests', requestId))
        if (requestDoc.exists()) {
          const data = requestDoc.data() as RequestData
          setRequest(data)

          // Fetch parent asset data
          const parentDoc = await getDoc(doc(db, 'IPA', data.parent))
          if (parentDoc.exists()) {
            setParentAsset(parentDoc.data() as ParentAsset)
          }
        }
      } catch (error) {
        console.error('Error fetching request data:', error)
      }
    }

    fetchRequestData()
  }, [requestId, router])

  if (!request || !parentAsset) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Derivative Work Submitted!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center text-gray-600">
              <p className="mb-2">Your derivative work "{request.title}" has been submitted and is pending approval from the IP owner.</p>
              <p>Original work: {parentAsset.title} by {parentAsset.creator_name}</p>
            </div>

            {request.imageURL && (
              <div className="aspect-square max-w-sm mx-auto relative">
                <img 
                  src={request.imageURL} 
                  alt="Derivative Preview" 
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-col items-center gap-4 mt-6">
              <div className="bg-secondary p-3 rounded-lg text-center w-full">
                <p className="font-semibold">Status</p>
                <p className="text-yellow-600">Pending Approval</p>
              </div>

              <div className="relative w-full">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setIsShareOpen(!isShareOpen)}
                >
                  <Share2 className="w-4 h-4" />
                  Share Creation
                </Button>
                
                {isShareOpen && (
                  <div className="absolute top-12 left-0 right-0 bg-white border rounded-lg shadow-lg z-10 p-2">
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out my derivative work "${request.title}" based on "${parentAsset.title}" by ${parentAsset.creator_name}!`)}`,
                            '_blank'
                          )
                          setIsShareOpen(false)
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                      >
                        <Twitter className="w-4 h-4 text-blue-600" />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                            '_blank'
                          )
                          setIsShareOpen(false)
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                      >
                        <Facebook className="w-4 h-4 text-blue-800" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => {
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                            '_blank'
                          )
                          setIsShareOpen(false)
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                      >
                        <Linkedin className="w-4 h-4 text-blue-700" />
                        <span>LinkedIn</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => router.push('/')}
                className="w-full"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 