'use client'
import { useState, useEffect } from 'react'
import { useWalletClient } from "wagmi";
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { db } from '@/lib/firebase'
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore'
import { EditProfileDialog } from '@/components/edit-profile-dialog'

interface UserProfile {
  user_name: string
  user_bio: string
  user_icon: string
  total_earnings: number
}

interface Asset {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  // Add other asset properties as needed
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>()
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { data: wallet } = useWalletClient();

  const fetchUserProfile = async () => {
    if (!wallet?.account?.address) {
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("wallet_address", "==", wallet.account.address));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        setUser({
          user_name: userData.creator_name || '',
          user_bio: userData.bio || '',
          user_icon: userData.user_icon || '',
          total_earnings: userData.earnings || 0.00
        });

        try {
          if (userData.ip && Array.isArray(userData.ip)) {
            const assetPromises = userData.ip.map((assetRef: any) => getDoc(assetRef));
            const assetDocs = await Promise.all(assetPromises);
            
            const assetData = assetDocs.map(doc => ({
              id: doc.id,
              ...(doc.data() as { [key: string]: any })
            })) as Asset[];
            
            setAssets(assetData);
          } else {
            setAssets([]);
          }
        } catch (assetError) {
          console.error("Error fetching assets:", assetError);
          setAssets([]);
        }
        
      } else {
        console.log('No matching documents.');
        setUser(undefined);
        setAssets([]);
      }

    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(undefined);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet?.account?.address) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [wallet?.account?.address]);

  const handleEditProfile = () => {
    setIsEditDialogOpen(true)
  }

  if (!wallet?.account?.address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p>Please connect your wallet to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="relative w-32 h-32">
            {user?.user_icon ? (
              <Image
                src={user.user_icon}
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <Image
                src="/placeholder-avatar.png"
                alt="Default Profile Picture"
                fill
                className="rounded-full object-cover"
              />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{user?.user_name || 'Anonymous'}</h1> 
                <p className="text-gray-600 mt-2">{user?.user_bio || 'No bio yet'}</p>
                
                <div className="flex gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{assets.length}</p>
                    <p className="text-sm text-gray-600">Assets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      ${user?.total_earnings?.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </div>
              <Button onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading assets...</p>
            ) : assets.length > 0 ? (
              assets.map((asset) => (
                <Card key={asset.id} className="p-4">
                  <div className="relative w-full aspect-[3/4]">
                    {asset.imageURL && asset.imageURL.length > 0 ? (
                      <Image 
                        src={asset.imageURL}
                        alt="Asset image"
                        fill
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <p>No image available</p>
                      </div>
                    )}
                  </div>
                  {/* Add more asset details as needed */}
                </Card>
              ))
            ) : (
              <p>No assets found</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="store">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add your store items cards here */}
            <Card className="p-4">
              <h3>Store Item Example</h3>
              {/* Add store item content */}
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {user && (
        <EditProfileDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          currentProfile={{
            creator_name: user.user_name,
            user_bio: user.user_bio,
            user_icon: user.user_icon,
          }}
          onProfileUpdate={fetchUserProfile}
        />
      )}
    </div>
  )
}
