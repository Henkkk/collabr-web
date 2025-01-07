'use client'
import { useState } from 'react'
import { useWalletClient } from "wagmi"
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { v4 as uuidv4 } from 'uuid'

interface EditProfileDialogProps {
  isOpen: boolean
  onClose: () => void
  currentProfile: {
    creator_name: string
    user_bio: string
    user_icon: string
    website?: string
    email?: string
  }
  onProfileUpdate: () => void
}

export function EditProfileDialog({ isOpen, onClose, currentProfile, onProfileUpdate }: EditProfileDialogProps) {
  const [name, setName] = useState(currentProfile.creator_name || '')
  const [bio, setBio] = useState(currentProfile.user_bio || '')
  const [image, setImage] = useState<string>(currentProfile.user_icon || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: wallet } = useWalletClient()
  const [website, setWebsite] = useState(currentProfile.website || '')
  const [email, setEmail] = useState(currentProfile.email || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet?.account?.address) {
      alert('No wallet connected')
      return
    }

    setIsSubmitting(true)

    try {
      const usersRef = collection(db, "Users")
      const q = query(usersRef, where("wallet_address", "==", wallet.account.address))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        let updateData: any = {
          creator_name: name,
          bio: bio,
          website: website,
          email: email,
        }

        // Only upload and update image if it has changed
        if (image && image !== currentProfile.user_icon) {
          const imageId = uuidv4()
          const imageRef = ref(storage, `profile_pictures/${imageId}`)
          await uploadString(imageRef, image, 'data_url')
          const imageUrl = await getDownloadURL(imageRef)
          updateData.user_icon = imageUrl
        }

        await updateDoc(userDoc.ref, updateData)
        onProfileUpdate()
        onClose()
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="image">Profile Picture</Label>
            {image && (
              <div className="mt-2 flex justify-center">
                <img
                  src={image}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}
            <div className="mt-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://your-website.com"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 