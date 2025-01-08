'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ComingSoon } from '@/components/ui/coming-soon'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import sampleNFT1 from '@/media/nft_soccer.jpeg'
import sampleNFT2 from '@/media/nft_scifi.jpeg'
import sampleNFT3 from '@/media/nft_dragon.jpeg'
import sampleNFT4 from '@/media/nft_yosemite.jpeg'

const featuredNFTs = [
  { id: 1, name: "Cosmic Voyage #42", creator: "StarGazer", price: "0.5 ETH", image: sampleNFT1 },
  { id: 2, name: "Digital Dreamscape", creator: "PixelPioneer", price: "0.8 ETH", image: sampleNFT2 },
  { id: 3, name: "Neon Nebula", creator: "CyberArtist", price: "0.6 ETH", image: sampleNFT3 },
  { id: 4, name: "Quantum Quill", creator: "ByteBard", price: "0.7 ETH", image: sampleNFT4 },
  { id: 5, name: "Ethereal Echo", creator: "SonicSculptor", price: "0.9 ETH", image: "/placeholder.svg?height=400&width=400" },
  { id: 6, name: "Pixel Phoenix", creator: "DigitalPhoenix", price: "1.2 ETH", image: "/placeholder.svg?height=400&width=400" },
]

const topEarningNFTs = [
  { id: 7, name: "Golden Meme #1", creator: "MemeKing", earnings: "100 ETH", percentageChange: 12.5, image: sampleNFT1 },
  { id: 8, name: "Crypto Kitty #42", creator: "BlockchainBreeder", earnings: "75 ETH", percentageChange: -5.2, image: sampleNFT2 },
  { id: 9, name: "Bored Ape #007", creator: "ApeMaster", earnings: "50 ETH", percentageChange: 8.7, image: sampleNFT3 },
  { id: 10, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
  { id: 11, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
  { id: 12, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
  { id: 13, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
  { id: 14, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
  { id: 15, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
  { id: 16, name: "Decentraland Plot #X", creator: "VirtualRealtor", earnings: "40 ETH", percentageChange: -2.3, image: sampleNFT4 },
]

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <ComingSoon />
    // <div className="container mx-auto px-4 py-8">
    //   <section className="mb-16">
    //     <div className="relative">
    //       <Button 
    //         variant="outline" 
    //         size="icon" 
    //         className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
    //         onClick={() => scroll('left')}
    //       >
    //         <ChevronLeft className="h-4 w-4" />
    //       </Button>
    //       <div 
    //         ref={scrollContainerRef}
    //         className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
    //         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    //       >
    //         {featuredNFTs.map((nft) => (
    //           <Card key={nft.id} className="w-72 h-96 flex-shrink-0 relative overflow-hidden">
    //             {typeof nft.image === 'string' ? (
    //               <img src={nft.image} alt={nft.name} className="absolute inset-0 w-full h-full object-cover" />
    //             ) : (
    //               <Image 
    //                 src={nft.image} 
    //                 alt={nft.name} 
    //                 width={400} 
    //                 height={400} 
    //                 className="absolute inset-0 w-full h-full object-cover"
    //               />
    //             )}
    //             <div className="absolute bottom-0 left-0 right-0 z-10 text-white bg-black/20 backdrop-blur-sm">
    //               <CardHeader className="pb-2">
    //                 <CardTitle className="truncate">{nft.name}</CardTitle>
    //               </CardHeader>
    //               <CardContent>
    //                 <p className="truncate">Creator: {nft.creator}</p>
    //               </CardContent>
    //             </div>
    //           </Card>
    //         ))}
    //       </div>
    //       <Button 
    //         variant="outline" 
    //         size="icon" 
    //         className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
    //         onClick={() => scroll('right')}
    //       >
    //         <ChevronRight className="h-4 w-4" />
    //       </Button>
    //     </div>
    //   </section>

    //   <section className="mb-16">
    //     <h2 className="text-3xl font-bold mb-8">Top Earning NFTs</h2>
    //     <div className="grid gap-6">
    //       <div className="flex items-center p-4 text-sm font-semibold text-gray-500">
    //         <div className="flex-shrink-0 mr-4 w-16">Rank</div>
    //         <div className="flex-grow">Asset</div>
    //         <div className="text-right w-24">Earnings</div>
    //       </div>
          
    //       {topEarningNFTs.map((nft, index) => (
    //         <Card key={nft.id} className="flex items-center p-4">
    //           <div className="flex-shrink-0 mr-4 w-16">
    //             <span className="text-2xl font-bold">{index + 1}</span>
    //           </div>
    //           <div className="flex flex-grow items-center">
    //             <div className="w-16 h-16 relative flex-shrink-0 mr-4">
    //               {typeof nft.image === 'string' ? (
    //                 <img 
    //                   src={nft.image} 
    //                   alt={nft.name} 
    //                   className="absolute inset-0 w-full h-full object-cover rounded-md" 
    //                 />
    //               ) : (
    //                 <Image 
    //                   src={nft.image} 
    //                   alt={nft.name} 
    //                   fill
    //                   className="object-cover rounded-md"
    //                 />
    //               )}
    //             </div>
    //             <div className="flex-grow">
    //               <h3 className="font-semibold truncate">{nft.name}</h3>
    //               <p className="text-sm text-gray-500 truncate">Creator: {nft.creator}</p>
    //             </div>
    //           </div>
    //           <div className="text-right w-24">
    //             <p className="font-semibold">{nft.earnings}</p>
    //             <p className={`text-sm font-semibold ${nft.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
    //               {nft.percentageChange >= 0 ? '+' : ''}{nft.percentageChange}%
    //             </p>
    //           </div>
    //         </Card>
    //       ))}
    //     </div>
    //   </section>

    //   <section className="mb-16">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //       <div>
    //         <h3 className="text-xl font-semibold mb-4">Top Earning Artists</h3>
    //         <div className="grid gap-4">
    //           <div className="flex items-center p-4 text-sm font-semibold text-gray-500">
    //             <div className="flex-shrink-0 mr-4 w-8">Rank</div>
    //             <div className="flex-grow">Artist</div>
    //             <div className="text-right w-24">Earnings</div>
    //           </div>
    //           {[
    //             { id: 1, name: "PixelPioneer", earnings: "250 ETH", percentageChange: 15.2, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 2, name: "CyberArtist", earnings: "180 ETH", percentageChange: 8.7, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 3, name: "StarGazer", earnings: "150 ETH", percentageChange: -3.4, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 4, name: "ByteBard", earnings: "120 ETH", percentageChange: 5.6, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 5, name: "SonicSculptor", earnings: "90 ETH", percentageChange: 12.1, image: "/placeholder.svg?height=100&width=100" },
    //           ].map((artist, index) => (
    //             <Card key={artist.id} className="flex items-center p-4">
    //               <div className="flex-shrink-0 mr-4 w-8">
    //                 <span className="text-lg font-bold">{index + 1}</span>
    //               </div>
    //               <div className="flex flex-grow items-center">
    //                 <div className="w-10 h-10 relative flex-shrink-0 mr-4">
    //                   <img
    //                     src={artist.image}
    //                     alt={artist.name}
    //                     className="rounded-full object-cover"
    //                   />
    //                 </div>
    //                 <div className="flex-grow">
    //                   <h4 className="font-semibold">{artist.name}</h4>
    //                 </div>
    //               </div>
    //               <div className="text-right w-24">
    //                 <p className="font-semibold">{artist.earnings}</p>
    //                 <p className={`text-sm font-semibold ${artist.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
    //                   {artist.percentageChange >= 0 ? '+' : ''}{artist.percentageChange}%
    //                 </p>
    //               </div>
    //             </Card>
    //           ))}
    //         </div>
    //       </div>

    //       <div>
    //         <h3 className="text-xl font-semibold mb-4">Top Earning Remixers</h3>
    //         <div className="grid gap-4">
    //           <div className="flex items-center p-4 text-sm font-semibold text-gray-500">
    //             <div className="flex-shrink-0 mr-4 w-8">Rank</div>
    //             <div className="flex-grow">Remixer</div>
    //             <div className="text-right w-24">Earnings</div>
    //           </div>
    //           {[
    //             { id: 1, name: "RemixMaster", earnings: "120 ETH", percentageChange: 20.5, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 2, name: "ArtAlchemist", earnings: "95 ETH", percentageChange: 15.8, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 3, name: "DigitalBlender", earnings: "80 ETH", percentageChange: -2.3, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 4, name: "NFTFusion", earnings: "65 ETH", percentageChange: 8.9, image: "/placeholder.svg?height=100&width=100" },
    //             { id: 5, name: "MixedReality", earnings: "50 ETH", percentageChange: 4.2, image: "/placeholder.svg?height=100&width=100" },
    //           ].map((remixer, index) => (
    //             <Card key={remixer.id} className="flex items-center p-4">
    //               <div className="flex-shrink-0 mr-4 w-8">
    //                 <span className="text-lg font-bold">{index + 1}</span>
    //               </div>
    //               <div className="flex flex-grow items-center">
    //                 <div className="w-10 h-10 relative flex-shrink-0 mr-4">
    //                   <img
    //                     src={remixer.image}
    //                     alt={remixer.name}
    //                     className="rounded-full object-cover"
    //                   />
    //                 </div>
    //                 <div className="flex-grow">
    //                   <h4 className="font-semibold">{remixer.name}</h4>
    //                 </div>
    //               </div>
    //               <div className="text-right w-24">
    //                 <p className="font-semibold">{remixer.earnings}</p>
    //                 <p className={`text-sm font-semibold ${remixer.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
    //                   {remixer.percentageChange >= 0 ? '+' : ''}{remixer.percentageChange}%
    //                 </p>
    //               </div>
    //             </Card>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  )
}

