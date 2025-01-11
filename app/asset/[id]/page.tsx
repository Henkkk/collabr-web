import Image from 'next/image'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import WaitlistButton from '@/components/ui/waitlistButton'

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

      console.log("data", data);

      asset = {
        id: assetDoc.id,
        title: String(data.title || ''),
        description: String(data.description || 'N/A'),
        imageURL: String(data.imageURL || ''),
        creator: String(data.creator_name || ''),
        price: Number(data.price || 0),
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
        <div className="relative">
          {/* Create Derivative Button - Positioned Absolutely */}
          {asset.license.terms.derivativesAllowed && (
            <div className="absolute top-0 right-0">
              <a
                href={`/asset/${asset.id}/create-derivative`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Derivative
              </a>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Asset Image */}
            <div className="relative aspect-square w-full">
              {asset.imageURL ? (
                <Image
                  src={asset.imageURL}
                  alt={asset.title}
                  fill
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <p>No image available</p>
                </div>
              )}
            </div>

            {/* Asset Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{asset.title}</h1>
                {/* <p className="text-gray-600">Asset owner: {asset.creator}</p> */}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{asset.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Royalty</h2>
                <p className="text-2xl font-bold">${asset.price}</p>
                <WaitlistButton assetId={asset.id} />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">License Terms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Commercial Usage Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Commercial Usage</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className={`mr-2 ${asset.license.terms.commercialUse ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.license.terms.commercialUse ? '✓' : '✕'}
                        </span>
                        <span>Commercial Use {asset.license.terms.commercialUse ? 'Permitted' : 'Not Permitted'}</span>
                      </div>
                      {asset.license.terms.commercialUse && (
                        <>
                          <div className="flex items-center">
                            <span className={`mr-2 ${asset.license.terms.commercialAttribution ? 'text-green-600' : 'text-red-600'}`}>
                              {asset.license.terms.commercialAttribution ? '✓' : '✕'}
                            </span>
                            <span>Attribution Required</span>
                          </div>
                          {asset.license.terms.commercialRevShare > 0 && (
                            <div className="flex items-center">
                              <span className="mr-2 text-blue-600">↗</span>
                              <span>{asset.license.terms.commercialRevShare}% Revenue Share Required</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Derivatives Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Derivative Works</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className={`mr-2 ${asset.license.terms.derivativesAllowed ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.license.terms.derivativesAllowed ? '✓' : '✕'}
                        </span>
                        <span>Derivatives {asset.license.terms.derivativesAllowed ? 'Permitted' : 'Not Permitted'}</span>
                      </div>
                      {asset.license.terms.derivativesAllowed && (
                        <>
                          <div className="flex items-center">
                            <span className={`mr-2 ${asset.license.terms.derivativesAttribution ? 'text-green-600' : 'text-red-600'}`}>
                              {asset.license.terms.derivativesAttribution ? '✓' : '✕'}
                            </span>
                            <span>Attribution Required</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`mr-2 ${asset.license.terms.derivativesReciprocal ? 'text-green-600' : 'text-red-600'}`}>
                              {asset.license.terms.derivativesReciprocal ? '✓' : '✕'}
                            </span>
                            <span>Reciprocal License Required</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Transferability Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Transferability</h3>
                    <div className="flex items-center">
                      <span className={`mr-2 ${asset.license.terms.transferable ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.license.terms.transferable ? '✓' : '✕'}
                      </span>
                      <span>License is {asset.license.terms.transferable ? 'Transferable' : 'Non-Transferable'}</span>
                    </div>
                  </div>

                  {/* License Summary Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Quick Summary</h3>
                    <p className="text-sm text-gray-600">
                      This license {asset.license.terms.commercialUse ? 'allows' : 'does not allow'} commercial use
                      {asset.license.terms.commercialUse && asset.license.terms.commercialRevShare > 0 && ` with ${asset.license.terms.commercialRevShare}% revenue share`}.
                      Derivative works are {asset.license.terms.derivativesAllowed ? 'permitted' : 'not permitted'}
                      {asset.license.terms.derivativesAllowed && asset.license.terms.derivativesAttribution && ' with attribution required'}.
                      The license is {asset.license.terms.transferable ? 'transferable' : 'non-transferable'}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Derivative Works Section */}
              {/* <div>
                <h2 className="text-xl font-semibold mb-4">Highlighted Derivative Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="relative aspect-video w-full">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">Preview Image</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">Derivative Title</h3>
                      <p className="text-sm text-gray-600 mb-2">by Creator Name</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-3">Created: Jan 1, 2024</span>
                        <span>License: Commercial</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Add more asset details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
