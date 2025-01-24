"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { Textarea } from "./textarea"

interface ProfileSetupDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (profileData: {
    creator_name: string
    bio: string
    website: string
    email: string
  }) => void
}

export function ProfileSetupDialog({ isOpen, onClose, onSubmit }: ProfileSetupDialogProps) {
  const [formData, setFormData] = useState({
    creator_name: "",
    bio: "",
    website: "",
    email: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="creator_name">Name</Label>
            <Input
              id="creator_name"
              required
              value={formData.creator_name}
              onChange={(e) => setFormData(prev => ({ ...prev, creator_name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              required
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <Button type="submit" className="w-full">Save Profile</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 