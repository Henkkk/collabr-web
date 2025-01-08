'use client'
import { useState } from 'react'
import { useWalletClient } from "wagmi"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { request } from 'http'

export default function CollaborationHub() {
  const { data: wallet } = useWalletClient()
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Derivative Work Requests</h1>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="flex flex-col gap-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Manga Adaptation Request</h3>
                  <p className="text-gray-600 mb-2">
                    For: <span className="font-medium">{"My Original Story #123"}</span>
                  </p>
                  <p className="text-gray-600 mb-2">From: 0x1234...5678</p>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Manga</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Commercial Use</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">10% Royalty</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setExpandedRequest(prev => prev === '1' ? null : '1')}
                >
                  {expandedRequest === '1' ? 'Show Less' : 'Learn More'}
                </Button>
              </div>
              
              {expandedRequest === '1' && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold mb-2">Derivative Work Details</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">Project Description</h5>
                      <p className="text-gray-600">
                        I would like to create a manga adaptation of your story. The manga will follow 
                        the main plot while adding visual elements and potentially new side stories.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">Proposed Terms</h5>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>10% royalty on all sales</li>
                        <li>Credit as original story creator</li>
                        <li>Commercial distribution rights</li>
                        <li>12-month completion timeline</li>
                      </ul>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="default">Approve Request</Button>
                      <Button variant="outline">Reject</Button>
                      <Link 
                        href={`/asset/LlcC9qGxpC54M471TSqa`} 
                        className="ml-auto"
                      >
                        <Button variant="secondary">View Original Asset</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">No approved requests yet.</p>
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">No rejected requests.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 