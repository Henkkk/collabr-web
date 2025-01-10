'use client'
import { useState, useEffect } from 'react'
import { useWalletClient } from "wagmi"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, doc, updateDoc, getDoc, addDoc, arrayUnion } from 'firebase/firestore'
import Image from 'next/image'

interface Request {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  parent: string;
  derivativeId: string;
  creator: string;
  title: string;
  description: string;
  imageURL: string;
  derivativeType: string;
}

export default function CollaborationHub() {
  const { data: wallet } = useWalletClient()
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      if (!wallet?.account?.address) return;

      try {
        const usersQuery = query(
          collection(db, 'Users'),
          where('wallet_address', '==', wallet.account.address)
        );
        const userSnapshot = await getDocs(usersQuery);
        
        if (userSnapshot.empty) {
          console.log('User document not found');
          setRequests([]);
          setLoading(false);
          return;
        }

        const userData = userSnapshot.docs[0].data();
        const ipaRefs = userData.ip || [];
        
        // If ipaRefs contains document references, get their IDs directly
        const assetIds = ipaRefs.map((ref: any) => ref.id);

        if (assetIds.length === 0) {
          setRequests([]);
          setLoading(false);
          return;
        }

        // Get all requests for the user's assets
        const requestsQuery = query(
          collection(db, 'Requests'),
          where('parent', 'in', assetIds)
        );
        
        const requestsSnapshot = await getDocs(requestsQuery);
        const requestsData = requestsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Request[];

        setRequests(requestsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [wallet?.account?.address]);

  const handleApprove = async (requestId: string) => {
    try {
      // Get the request document
      const requestRef = doc(db, 'Requests', requestId);
      const requestDoc = await getDoc(requestRef);
      
      if (!requestDoc.exists()) {
        throw new Error('Request not found');
      }

      const requestData = requestDoc.data();

      // Create new IPA document
      const derivativeRef = await addDoc(collection(db, 'IPA'), {
        ...requestData,
        status: 'approved',
        createdAt: new Date().toISOString(),
      });

      // Update original asset's derivatives array
      const originalAssetRef = doc(db, 'IPA', requestData.parent);
      await updateDoc(originalAssetRef, {
        derivatives: arrayUnion(derivativeRef.id)
      });

      // Get the creator's user document
      const usersQuery = query(
        collection(db, 'Users'),
        where('wallet_address', '==', requestData.creator)
      );
      const userSnapshot = await getDocs(usersQuery);
      
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        // Update the user's document with the new IPA reference in the 'item' field
        await updateDoc(doc(db, 'Users', userDoc.id), {
          item: arrayUnion(doc(db, 'IPA', derivativeRef.id))
        });
      }

      // Update request status and add the derivative ID
      await updateDoc(requestRef, {
        status: 'approved',
        derivativeId: derivativeRef.id
      });

      // Update local state
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: 'approved', derivativeId: derivativeRef.id }
            : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request. Please try again.');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const requestRef = doc(db, 'Requests', requestId);
      await updateDoc(requestRef, {
        status: 'rejected'
      });

      // Update local state
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: 'rejected' }
            : request
        )
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    }
  };

  if (!wallet?.account?.address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p>Please connect your wallet to access the Collaboration Hub.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading requests...</p>
          </div>
        ) : (
          <>
            <TabsContent value="pending">
              <div className="flex flex-col gap-4">
                {requests.filter(request => request.status === 'pending').map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {request?.title || 'Untitled Request'}
                        </h3>
                        {/* <p className="text-gray-600 mb-2">
                          Type: <span className="font-medium">{request?.derivativeType || 'Not specified'}</span>
                        </p> */}
                        <p className="text-gray-600 mb-2">From: {request.creator || 'Unknown'}</p>
                        <div className="flex gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {request?.derivativeType || 'Derivative'}
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            Pending
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={() => setExpandedRequest(prev => prev === request.id ? null : request.id)}
                      >
                        {expandedRequest === request.id ? 'Show Less' : 'Learn More'}
                      </Button>
                    </div>

                    {expandedRequest === request.id && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-2">Derivative Work Details</h4>
                        <div className="space-y-4">
                          <div className="relative w-32 h-32">
                            <Image
                              src={request.imageURL || '/placeholder-image.jpg'}
                              alt={request.title || 'Request Image'}
                              fill
                              className="rounded-lg object-cover"
                              sizes="(max-width: 768px) 128px, 128px"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Project Description</h5>
                            <p className="text-gray-600">
                              {request.description || 'No description provided'}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button 
                              variant="default"
                              onClick={() => handleApprove(request.id)}
                            >
                              Approve Request
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>
                            <Link 
                              href={`/asset/${request.parent}`} 
                              className="ml-auto"
                            >
                              <Button variant="secondary">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
                {requests.filter(request => request.status === 'pending').length === 0 && (
                  <p className="text-gray-600 text-center py-8">No pending requests.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="flex flex-col gap-4">
                {requests.filter(request => request.status === 'approved').map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
                        <p className="text-gray-600 mb-2">
                          Type: <span className="font-medium">{request.derivativeType || 'Not specified'}</span>
                        </p>
                        <p className="text-gray-600 mb-2">From: {request.creator}</p>
                        <div className="flex gap-2 mb-2">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Approved
                          </span>
                        </div>
                      </div>
                      <Link href={`/asset/${request.derivativeId}`}>
                        <Button variant="outline">View Derivative</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
                {requests.filter(request => request.status === 'approved').length === 0 && (
                  <p className="text-gray-600 text-center py-8">No approved requests.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="flex flex-col gap-4">
                {requests.filter(request => request.status === 'rejected').map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
                        <p className="text-gray-600 mb-2">
                          Type: <span className="font-medium">{request.derivativeType || 'Not specified'}</span>
                        </p>
                        <p className="text-gray-600 mb-2">From: {request.creator}</p>
                        <div className="flex gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                            Rejected
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {requests.filter(request => request.status === 'rejected').length === 0 && (
                  <p className="text-gray-600 text-center py-8">No rejected requests.</p>
                )}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
} 