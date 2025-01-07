'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateAssetPage() {
  const [image, setImage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('assetImage') || null;
    }
    return null;
  });
  const [description, setDescription] = useState(() => localStorage.getItem('assetDescription') || '');
  const [attributes, setAttributes] = useState<{ key: string; value: string }[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('assetAttributes') || '[{ "key": "", "value": "" }]');
    }
    return [{ key: '', value: '' }];
  });
  const [tags, setTags] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('assetTags') || '[]');
    }
    return [];
  });
  const [currentTag, setCurrentTag] = useState('')
  const [name, setName] = useState(() => localStorage.getItem('assetName') || '');

  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('assetImage', image || '');
    localStorage.setItem('assetName', name);
    localStorage.setItem('assetDescription', description);
    localStorage.setItem('assetAttributes', JSON.stringify(attributes));
    localStorage.setItem('assetTags', JSON.stringify(tags));
  }, [image, name, description, attributes, tags]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !image) {
      alert('Asset name and file upload are required')
      return
    }
    // Here you would typically send the data to your backend
    console.log({ image, name, description, attributes, tags })
    // Navigate to the attach-license page
    router.push('/create/attach-license')
  }

  const clearForm = () => {
    setImage(null);
    setName('');
    setDescription('');
    setAttributes([{ key: '', value: '' }]);
    setTags([]);
    setCurrentTag('');
    
    // Clear localStorage
    localStorage.removeItem('assetImage');
    localStorage.removeItem('assetName');
    localStorage.removeItem('assetDescription');
    localStorage.removeItem('assetAttributes');
    localStorage.removeItem('assetTags');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Asset Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter asset name..."
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Upload File *</Label>
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
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your asset..."
            />
          </div>

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
            <Button type="submit">Next</Button>
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
              <p className="text-sm text-gray-500 mb-4">{description || '###'}</p>
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

