'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useWalletClient } from "wagmi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { db } from '@/lib/firebase'
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore'
import { EditProfileDialog } from '@/components/ui/edit-profile-dialog'
import { useRouter } from 'next/navigation'
import DefaultProfilePicture from '@/media/Default-Profile-Picture.png'
import { useAuth } from '@/lib/auth'

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

interface StoreItem {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  // Add other store item properties as needed
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>()
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { data: wallet } = useWalletClient();
  const { primaryWallet, user: dynamicUser } = useDynamicContext();
  const router = useRouter()
  const [storeItems, setStoreItems] = useState<StoreItem[]>([])

  const fetchUserProfile = async () => {
    if (!primaryWallet?.address && !dynamicUser?.email) {
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "Users");
      const q = primaryWallet?.address 
        ? query(usersRef, where("wallet_address", "==", primaryWallet.address))
        : query(usersRef, where("email", "==", dynamicUser?.email));
      
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        //console.log("userData", userData);
        
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
        
        try {
          if (userData.item && Array.isArray(userData.item)) {
            const itemPromises = userData.item.map((itemRef: any) => getDoc(itemRef));
            const itemDocs = await Promise.all(itemPromises);                        
            const itemData = itemDocs.map(doc => ({
              id: doc.id,
              ...(doc.data() as { [key: string]: any })
            })) as StoreItem[];
            
            setStoreItems(itemData);
          } else {
            setStoreItems([]);
          }
        } catch (itemError) {
          console.error("Error fetching store items:", itemError);
          setStoreItems([]);
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
    if (primaryWallet?.address || dynamicUser?.email) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [primaryWallet?.address, dynamicUser?.email]);

  const handleEditProfile = () => {
    setIsEditDialogOpen(true)
  }

  const handleAssetClick = (assetId: string) => {
    router.push(`/asset/${assetId}`)
  }

  if (!primaryWallet?.address && !dynamicUser?.email) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect to View Profile</h1>
          <p>Please connect your wallet or sign in with email to view your profile.</p>
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
                src={DefaultProfilePicture}
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
                    <p className="text-sm text-gray-600">Total Royalties</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push('/collaboration-hub')}>
                  Collaboration Hub
                </Button>
                <Button onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="store" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading assets...</p>
            ) : assets.length > 0 ? (
              assets.map((asset) => (
                <Card 
                  key={asset.id} 
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleAssetClick(asset.id)}
                >
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
                  <div className="mt-4">
                    <h3 className="font-semibold">{asset.title}</h3>
                  </div>
                </Card>
              ))
            ) : (
              <p>No assets found</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="store">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading store items...</p>
            ) : storeItems.length > 0 ? (
              storeItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleAssetClick(item.id)}
                >
                  <div className="relative w-full aspect-[3/4]">
                    {item.imageURL && item.imageURL.length > 0 ? (
                      <Image 
                        src={item.imageURL}
                        alt="Store item image"
                        fill
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <p>No image available</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                </Card>
              ))
            ) : (
              <p>No store items found</p>
            )}
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
