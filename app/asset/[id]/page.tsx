import Image from 'next/image'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import WaitlistButton from '@/components/ui/waitlistButton'
import AssetImage from '@/components/AssetImage'

interface Asset {
  id: string;
  title: string;
  ipid: string;
  description: string;
  imageURL: string;
  creator: string;
  mintingFee: number;
  chain: string;
  attributes: { key: string; value: string }[];
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

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const { id } = params
  return {
    title: `Asset ${id}`,
  }
}

export default async function AssetPage(props: Props) {
  const params = await props.params
  const { id } = params
  let asset: Asset | null = null

  try {
    const assetDoc = await getDoc(doc(db, 'IPA', id))
    if (assetDoc.exists()) {
      const data = assetDoc.data()

      //console.log("data", data);

      asset = {
        id: assetDoc.id,
        title: String(data.title || ''),
        ipid: String(data.ipId || ''),
        description: String(data.description || 'N/A'),
        imageURL: String(data.imageURL || ''),
        creator: String(data.creator_name || ''),
        mintingFee: Number(data.license?.terms?.defaultMintingFee || 0),
        chain: String(data.chain || ''),
        attributes: Array.isArray(data.attributes) ? data.attributes : [],
        license: {
          terms: {
            commercialUse: data.license?.terms?.commercialUse || false,
            commercialAttribution: data.license?.terms?.commercialAttribution || false,
            commercialRevShare: data.license?.terms?.commercialRevShare || 0,
            derivativesAllowed: data.license?.terms?.derivativesAllowed || false,
            derivativesAttribution: data.license?.terms?.derivativesAttribution || false,
            derivativesReciprocal: data.license?.terms?.derivativesReciprocal || false,
            transferable: data.license?.terms?.transferable || false,
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching asset:', error)
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Asset not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Media & Basic Info */}
          <div className="flex flex-col gap-6 h-full">
            <div className="relative aspect-auto w-full flex-shrink-0">
              <AssetImage
                src={asset.imageURL}
                alt={asset.title}
              />
            </div>
            
            {/* Quick Details Card */}
            <div className="bg-gray-50 p-4 rounded-lg flex-1 min-h-0">
              <h2 className="text-xl font-semibold mb-3">Quick Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Chain:</span>
                  <span className="font-medium">{asset.chain || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Royalty Fee:</span>
                  <span className="font-bold">${asset.mintingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IPID:</span>
                  <a 
                    href={`https://explorer.story.foundation/ipa/${asset.ipid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 inline-flex items-center"
                  >
                    {asset.ipid}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="space-y-6">
            {/* Title and Actions */}
            <div className="border-b pb-4">
              <h1 className="text-3xl font-bold mb-2">{asset.title}</h1>
              {asset.license.terms.derivativesAllowed && (
                <a
                  href={`/asset/${asset.id}/create-derivative`}
                  className="bg-[#008CFF] hover:bg-[#0070CC] text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Derivative
                </a>
              )}
            </div>

            {/* Description Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{asset.description}</p>
            </div>

            {/* Attributes Grid */}
            {asset.attributes && asset.attributes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Attributes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {asset.attributes.map((attr, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 uppercase">{attr.key}</p>
                      <p className="font-medium">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* License Terms */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-2">License Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Commercial Use Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Commercial Use</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Allowed</span>
                      <span>
                        {asset.license.terms.commercialUse ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {asset.license.terms.commercialUse && (
                      <>
                        <div className="flex justify-between items-center">
                          <span>Attribution Required</span>
                          <span>
                            {asset.license.terms.commercialAttribution ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Revenue Share</span>
                          <span className="font-medium">
                            {asset.license.terms.commercialRevShare}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Derivatives Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Derivatives</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Allowed</span>
                      <span>
                        {asset.license.terms.derivativesAllowed ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {asset.license.terms.derivativesAllowed && (
                      <>
                        <div className="flex justify-between items-center">
                          <span>Attribution Required</span>
                          <span>
                            {asset.license.terms.derivativesAttribution ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Reciprocal License</span>
                          <span>
                            {asset.license.terms.derivativesReciprocal ? 'Required' : 'Not Required'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Minting Fee</span>
                          <span className="font-medium">${asset.mintingFee}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Transferability Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Transferability</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>License Transfer</span>
                    <span>
                      {asset.license.terms.transferable ? 'Allowed' : 'Restricted'}
                    </span>
                  </div>
                </div>

                {/* License Summary */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">License Summary</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {asset.license.terms.commercialUse ? 'Allows commercial use' : 'Non-commercial use only'}{asset.license.terms.commercialRevShare > 0 && ` with ${asset.license.terms.commercialRevShare}% revenue share`}. 
                    Derivatives are {asset.license.terms.derivativesAllowed ? 'permitted' : 'not allowed'}{asset.license.terms.derivativesAllowed && ` with ${asset.license.terms.derivativesAttribution ? 'required attribution' : 'no attribution required'}`}. 
                    Asset is {asset.license.terms.transferable ? 'transferable' : 'non-transferable'}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
