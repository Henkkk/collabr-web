'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import DefaultImage from '@/media/Default-Profile-Picture.png'

interface IPA {
  id: string
  title: string
  description: string
  imageURL: string
  tags: string[]
  creator: string
}

interface CreatorProfile {
  user_icon: string
  creator_name: string
  wallet_address: string
}

const isValidImageUrl = (url: string) => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    // Check if it's a Firebase Storage URL
    if (urlObj.hostname.includes('firebasestorage.googleapis.com')) {
      return true;
    }
    // For other URLs, check for image extensions
    return url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i) !== null;
  } catch {
    return false;
  }
};

const DiscoverPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [showAllTags, setShowAllTags] = useState(false)
  const [ipas, setIpas] = useState<IPA[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [creatorProfiles, setCreatorProfiles] = useState<Record<string, CreatorProfile>>({})

  // Add this constant for the number of tags to show initially
  const TAGS_PER_ROW = 10; // Adjust this number based on your layout
  const INITIAL_ROWS = 3;
  const initialTagsToShow = TAGS_PER_ROW * INITIAL_ROWS;

  // Get the tags to display based on showAllTags state
  const visibleTags = showAllTags 
    ? availableTags 
    : availableTags.slice(0, initialTagsToShow);

  // Fetch creator profiles
  const fetchCreatorProfiles = async (creators: string[]) => {
    try {
      const uniqueCreators = [...new Set(creators)];
      const usersRef = collection(db, "Users");
      const profiles: Record<string, CreatorProfile> = {};

      for (const creator of uniqueCreators) {
        const q = query(usersRef, where("wallet_address", "==", creator));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          profiles[creator] = {
            user_icon: userData.user_icon || '',
            creator_name: userData.creator_name || '',
            wallet_address: creator
          };
        }
      }

      setCreatorProfiles(profiles);
    } catch (error) {
      console.error('Error fetching creator profiles:', error);
    }
  };

  // Modify the useEffect to fetch creator profiles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipaRef = collection(db, 'IPA')
        const ipaSnapshot = await getDocs(ipaRef)
        
        const ipaData = ipaSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IPA[]
        setIpas(ipaData)

        // Extract unique tags
        const tags = new Set<string>()
        ipaData.forEach(ipa => {
          ipa.tags?.forEach(tag => tags.add(tag))
        })
        setAvailableTags(Array.from(tags))

        // Fetch creator profiles
        const creators = ipaData.map(ipa => ipa.creator);
        await fetchCreatorProfiles(creators);
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter IPAs based on search term and selected tags
  const filteredIPAs = ipas.filter(ipa => {
    const matchesSearch = searchTerm === '' || 
      (ipa.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (ipa.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => ipa.tags?.includes(tag))

    return matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleImageError = (ipaId: string) => {
    setImageErrors(prev => ({ ...prev, [ipaId]: true }))
  }

  const hasUserInput = searchTerm.trim() !== '' || selectedTags.length > 0

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-center items-center">
          <Input
            type="text"
            placeholder="Search IPAs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xl"
          />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {visibleTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => toggleTag(tag)}
                className="flex items-center gap-1"
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="h-4 w-4" />
                )}
              </Button>
            ))}
          </div>
          {availableTags.length > initialTagsToShow && (
            <Button
              variant="ghost"
              onClick={() => setShowAllTags(!showAllTags)}
              className="mt-2"
            >
              {showAllTags ? 'Show Less' : `Show ${availableTags.length - initialTagsToShow} More Tags`}
            </Button>
          )}
        </div>
      </div>

      {!hasUserInput ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Enter a search term or select tags to discover IPAs.</p>
        </div>
      ) : (
        <>
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIPAs.map(ipa => (
              <Link href={`/asset/${ipa.id}`} key={ipa.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={
                        !imageErrors[ipa.id] && isValidImageUrl(ipa.imageURL)
                          ? ipa.imageURL.replace(':443', '') // Remove the port number if present
                          : DefaultImage
                      }
                      alt={ipa.title}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(ipa.id)}
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{ipa.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={
                            creatorProfiles[ipa.creator]?.user_icon
                              ? creatorProfiles[ipa.creator].user_icon.replace(':443', '')
                              : DefaultImage
                          }
                          alt="Creator"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {creatorProfiles[ipa.creator]?.creator_name || 
                          `${ipa.creator?.slice(0, 6)}...${ipa.creator?.slice(-4)}`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ipa.tags?.map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredIPAs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No IPAs found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DiscoverPage 