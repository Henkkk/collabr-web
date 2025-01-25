'use client'
import * as React from 'react'
import { useState } from 'react'
import { useWalletClient } from "wagmi"
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { updateDoc } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import { useAuth } from '@/lib/auth'

interface OnboardingDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingDialog({ isOpen, onClose }: OnboardingDialogProps) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<string>('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: wallet } = useWalletClient()
  const { signUp, user: authUser } = useAuth()
  const router = useRouter()

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
    if (!wallet?.account?.address && !email) {
      alert('Please connect a wallet or provide an email')
      return
    }

    setIsSubmitting(true)

    try {
      // If using email authentication, sign up first
      if (!wallet?.account?.address && email && password) {
        await signUp(email, password)
      }

      const uuid = crypto.randomUUID();
      const userRef = doc(db, "Users", uuid);
      
      let updateData: any = {
        id: uuid,
        creator_name: name,
        bio: bio,
        website: website,
        email: email,
        earning: 0,
        ip: [],
        item: [],
        wallet_address: wallet?.account?.address || null,
        createdAt: new Date().toISOString(),
      }

      // Upload profile picture if provided
      if (image) {
        const imageId = uuidv4()
        const imageRef = ref(storage, `profile_pictures/${imageId}`)
        await uploadString(imageRef, image, 'data_url')
        const imageUrl = await getDownloadURL(imageRef)
        updateData.user_icon = imageUrl
      }

      await setDoc(userRef, updateData)
      onClose()
      router.push('/profile')
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Failed to create profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Collabr! Let's set up your profile</DialogTitle>
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
            <Label htmlFor="name">Name*</Label>
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

          {!wallet?.account?.address && (
            <>
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Profile...' : 'Get Started'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 