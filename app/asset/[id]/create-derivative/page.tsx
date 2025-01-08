'use client'
import { useState, useEffect, use } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useWalletClient } from "wagmi"
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, updateDoc, getDocs, query, where, arrayUnion } from 'firebase/firestore'
import { storage } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

interface Asset {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  creator: string;
  price: number;
  license: {
    terms: {
      commercialUse: boolean;
      commercialAttribution: boolean;
      commercialRevShare: number;
      derivativesAllowed: boolean;
      derivativesAttribution: boolean;
      derivativesReciprocal: boolean;
      transferable: boolean;
    }
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CreateDerivativePage({ params }: PageProps) {
  const { id } = use(params);
  const { data: wallet } = useWalletClient();
  const [originalAsset, setOriginalAsset] = useState<Asset | null>(null);
  const [image, setImage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('derivativeImage') || null;
    }
    return null;
  });
  const [description, setDescription] = useState(() => localStorage.getItem('derivativeDescription') || '');
  const [attributes, setAttributes] = useState<{ key: string; value: string }[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('derivativeAttributes') || '[{ "key": "", "value": "" }]');
    }
    return [{ key: '', value: '' }];
  });
  const [tags, setTags] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('derivativeTags') || '[]');
    }
    return [];
  });
  const [currentTag, setCurrentTag] = useState('')
  const [name, setName] = useState(() => localStorage.getItem('derivativeName') || '');
  const [derivativeType, setDerivativeType] = useState(() => localStorage.getItem('derivativeType') || '');
  const [proposedTerms, setProposedTerms] = useState(() => localStorage.getItem('proposedTerms') || '');

  const router = useRouter()

  useEffect(() => {
    const fetchOriginalAsset = async () => {
      try {
        const assetDoc = await getDoc(doc(db, 'IPA', id));
        if (assetDoc.exists()) {
          const data = assetDoc.data();
          setOriginalAsset({
            id: assetDoc.id,
            title: String(data.title || ''),
            description: String(data.description || ''),
            imageURL: String(data.imageURL || ''),
            creator: String(data.creator_name || ''),
            price: Number(data.price || 0),
            license: data.license
          });
        }
      } catch (error) {
        console.error('Error fetching original asset:', error);
      }
    };

    fetchOriginalAsset();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('derivativeImage', image || '');
    localStorage.setItem('derivativeName', name);
    localStorage.setItem('derivativeDescription', description);
    localStorage.setItem('derivativeAttributes', JSON.stringify(attributes));
    localStorage.setItem('derivativeTags', JSON.stringify(tags));
    localStorage.setItem('derivativeType', derivativeType);
    localStorage.setItem('proposedTerms', proposedTerms);
  }, [image, name, description, attributes, tags, derivativeType, proposedTerms]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const newAttributes = [...attributes]
    newAttributes[index][field] = value
    setAttributes(newAttributes)
  }

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }])
  }

  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index)
    setAttributes(newAttributes)
  }

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !image || !derivativeType) {
      alert('Please fill in all required fields')
      return
    }

    if (!wallet?.account?.address) {
      alert('Failed to create derivative, because there is no wallet connected');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const imageId = uuidv4();
      const imageRef = ref(storage, `derivative_assets/${imageId}/${Date.now()}`);
      await uploadString(imageRef, image, 'data_url');
      const imageUrl = await getDownloadURL(imageRef);

      // Create new derivative document
      const derivativeData = {
        title: name,
        description: description,
        imageURL: imageUrl,
        attributes: attributes.filter(attr => attr.key && attr.value),
        tags: tags,
        createdAt: new Date().toISOString(),
        derivativeType: derivativeType,
        proposedTerms: proposedTerms,
        //originalAsset: doc(db, 'IPA', id),
        parent: id,
        creator_address: wallet.account.address,
        status: 'pending', // Status can be: pending, approved, rejected
        remix: 0,
        royalty: 0,
      };

      const derivativeRef = await addDoc(collection(db, 'Derivatives'), derivativeData);
      console.log("New derivative created with ID:", derivativeRef.id);

      // Update the original asset's derivatives array
      const originalAssetRef = doc(db, 'IPA', id);
      await updateDoc(originalAssetRef, {
        derivatives: arrayUnion(doc(db, 'Derivatives', derivativeRef.id))
      });

      // Update user's derivatives array - find user by wallet address
      const usersSnapshot = await getDocs(query(
        collection(db, 'Users'),
        where('wallet_address', '==', wallet.account.address)
      ));

      if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0];
        await updateDoc(userDoc.ref, {
          derivatives: arrayUnion(doc(db, 'Derivatives', derivativeRef.id))
        });
      } else {
        console.error('User document not found for wallet address:', wallet.account.address);
      }

      // Clear localStorage
      localStorage.removeItem('derivativeImage');
      localStorage.removeItem('derivativeName');
      localStorage.removeItem('derivativeDescription');
      localStorage.removeItem('derivativeAttributes');
      localStorage.removeItem('derivativeTags');
      localStorage.removeItem('derivativeType');
      localStorage.removeItem('proposedTerms');

      router.push('/collaboration-hub');

    } catch (error) {
      console.error('Error creating derivative:', error);
      alert('Failed to create derivative. Please try again.');
    }
  }

  const clearForm = () => {
    setImage(null);
    setName('');
    setDescription('');
    setAttributes([{ key: '', value: '' }]);
    setTags([]);
    setCurrentTag('');
    setDerivativeType('');
    setProposedTerms('');
    
    // Clear localStorage
    localStorage.removeItem('derivativeImage');
    localStorage.removeItem('derivativeName');
    localStorage.removeItem('derivativeDescription');
    localStorage.removeItem('derivativeAttributes');
    localStorage.removeItem('derivativeTags');
    localStorage.removeItem('derivativeType');
    localStorage.removeItem('proposedTerms');
  };

  if (!originalAsset) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading original asset...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg w-full">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={originalAsset.imageURL}
              alt={originalAsset.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold truncate">{originalAsset.title}</h3>
            <p className="text-sm text-gray-600">by "Creator Name"</p>
            <p className="text-sm text-gray-700 line-clamp-2">{originalAsset.description}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Title *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter derivative work name..."
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Upload Derivative Work *</Label>
            <div className="space-y-2">
              {image ? (
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setImage(null)}>
                    Remove
                  </Button>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline">
                      Change Image
                    </Button>
                  </div>
                </div>
              ) : (
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  required 
                />
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="derivativeType">Type of Derivative Work (Optional)</Label>
            <Input
              id="derivativeType"
              value={derivativeType}
              onChange={(e) => setDerivativeType(e.target.value)}
              placeholder="e.g., Manga Adaptation, Musical Remix, etc."
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your derivative work..."
            />
          </div>

          {/* <div>
            <Label htmlFor="proposedTerms">Proposed Terms *</Label>
            <Textarea
              id="proposedTerms"
              value={proposedTerms}
              onChange={(e) => setProposedTerms(e.target.value)}
              placeholder="Describe your proposed terms (e.g., revenue sharing, attribution, timeline)..."
              required
            />
          </div> */}

          <div>
            <Label>Attributes (Optional)</Label>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  placeholder="Key"
                  value={attr.key}
                  onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                />
                <Input
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                />
                <Button type="button" variant="outline" onClick={() => removeAttribute(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addAttribute} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Attribute
            </Button>
          </div>

          <div>
            <Label htmlFor="tags">Tags (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag..."
              />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 text-primary-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={clearForm}>
              Clear
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {image && (
                <div className="aspect-square w-full relative mb-4">
                  <img src={image} alt="Preview" className="object-cover rounded-lg" />
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{name || 'Untitled'}</h2>
              <p className="text-sm text-gray-500 mb-2">{derivativeType || 'Type of derivative work'}</p>
              <p className="text-sm text-gray-500 mb-4">{description || '###'}</p>
              
              {proposedTerms && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Proposed Terms</h3>
                  <p className="text-sm text-gray-700">{proposedTerms}</p>
                </div>
              )}

              {attributes.length > 0 && attributes[0].key && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Attributes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {attributes.map((attr, index) => (
                      attr.key && (
                        <div key={index} className="bg-secondary p-2 rounded">
                          <span className="font-medium">{attr.key}:</span> {attr.value}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              
              {tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 