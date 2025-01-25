"use client"
import React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../lib/firebase"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { ArrowLeft, ArrowRight, User, Mail, Globe, PenSquare, ImagePlus, Upload } from "lucide-react"
import Image from "next/image"

export default function SetupProfile() {
  const router = useRouter()
  const { primaryWallet, user } = useDynamicContext()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    creator_name: "",
    bio: "",
    website: "",
    email: "",
    profile_picture: null as File | null,
    profile_picture_url: ""
  })

  useEffect(() => {
    const checkUser = async () => {
      const userEmail = user?.verifiedCredentials?.[0]?.email;
      
      if (!primaryWallet?.address && !userEmail) {
        router.push("/")
        return
      }

      // Check if user already exists
      const usersRef = collection(db, "Users")
      const q = primaryWallet?.address
        ? query(usersRef, where("wallet_address", "==", primaryWallet.address))
        : query(usersRef, where("email", "==", userEmail));
        
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        // User already exists, redirect to profile
        router.push("/profile")
      }
    }

    checkUser()
  }, [primaryWallet, user, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }
      
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed")
        return
      }

      setFormData(prev => ({
        ...prev,
        profile_picture: file,
        profile_picture_url: URL.createObjectURL(file)
      }))
    }
  }

  const uploadProfilePicture = async (userId: string) => {
    if (!formData.profile_picture) return ""
    
    try {
      // Create a reference to the file location
      const fileRef = ref(storage, `profile-pictures/${userId}/${formData.profile_picture.name}`)
      
      // Upload the file
      await uploadBytes(fileRef, formData.profile_picture)
      
      // Get the download URL
      const downloadURL = await getDownloadURL(fileRef)
      return downloadURL
    } catch (error) {
      console.error("Error uploading profile picture:", error)
      return ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const userEmail = user?.verifiedCredentials?.[0]?.email;
    if (!primaryWallet?.address && !userEmail || isSubmitting) return

    try {
      setIsSubmitting(true)
      const uuid = crypto.randomUUID()
      
      // Upload profile picture first if exists
      const profilePictureUrl = await uploadProfilePicture(uuid)
      
      const userRef = doc(db, "Users", uuid)
      await setDoc(userRef, {
        id: uuid,
        creator_name: formData.creator_name,
        bio: formData.bio,
        user_icon: profilePictureUrl,
        website: formData.website,
        earning: 0,
        email: formData.email || userEmail, // Use Dynamic email if form email is empty
        ip: [],
        item: [],
        wallet_address: primaryWallet?.address || null,
        createdAt: new Date().toISOString(),
      })

      router.push("/profile")
    } catch (error) {
      console.error("Error storing user data:", error)
      alert("There was an error creating your profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold mb-6">
              <User className="w-6 h-6" />
              <span>What should we call you?</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creator_name">Display Name</Label>
              <Input
                id="creator_name"
                required
                placeholder="Enter your name or username"
                value={formData.creator_name}
                onChange={(e) => setFormData(prev => ({ ...prev, creator_name: e.target.value }))}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold mb-6">
              <ImagePlus className="w-6 h-6" />
              <span>Add a profile picture</span>
            </div>
            <div className="space-y-4">
              {formData.profile_picture_url ? (
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={formData.profile_picture_url}
                    alt="Profile preview"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <Label
                  htmlFor="profile_picture"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  Choose Image
                </Label>
                <Input
                  id="profile_picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-gray-500">
                  You can skip this step and add a profile picture later
                </p>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold mb-6">
              <PenSquare className="w-6 h-6" />
              <span>Tell us about yourself</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                required
                placeholder="Share a bit about yourself, your interests, or what you create"
                className="min-h-[150px]"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold mb-6">
              <Globe className="w-6 h-6" />
              <span>Your website</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL (Optional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://your-website.com"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold mb-6">
              <Mail className="w-6 h-6" />
              <span>Contact information</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Step {step} of 5</span>
              <span className="text-sm text-gray-500">{Math.round((step / 5) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              {step < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Profile..." : "Complete Profile"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 