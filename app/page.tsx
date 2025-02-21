'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
// import IPA1 from '@/media/IPA-001.jpeg'
// import IPA2 from '@/media/IPA-002.jpeg'
// import IPA3 from '@/media/IPA-003.jpg'
// import IPA4 from '@/media/IPA-004.jpeg'
// import IPA5 from '@/media/IPA-005.jpeg'
// import IPA6 from '@/media/IPA-006.jpeg'
// import IPD1 from '@/media/IPD-001.jpeg'
// import IPD2 from '@/media/IPD-002.jpeg'
// import IPD3 from '@/media/IPD-003.jpeg'
// import IPD4 from '@/media/IPD-004.png'
// import IPD5 from '@/media/IPD-005.png'
// import IPD6 from '@/media/IPD-006.jpeg'
// import IPD7 from '@/media/IPD-007.jpeg'
// import IPD8 from '@/media/IPD-008.jpeg'
// import IPD9 from '@/media/IPD-009.jpeg'
// import IPD10 from '@/media/IPD-010.jpeg'
//import LandingPage from '@/components/ui/landing'
import LandingPage from '@/components/ui/landing3'

// const selectedIPA = [
//   { id: 1, title: 'Rumors of Arctic Belonging - Blanket Toss, Nalukataq', image: IPA1, creator: 'Quantum-Art-Curator', price: '0.1168 ETH', URL: 'https://opensea.io/assets/ethereum/0x46ac8540d698167fcbb9e846511beb8cf8af9bd8/90073'},
//   { id: 2, title: 'outcast #246', image: IPA2, creator: 'sumgarg', price: '0.1169 ETH', URL: 'https://opensea.io/assets/base/0x73682a7f47cb707c52cb38192dbb9266d3220315/187'},
//   { id: 3, title: 'Big Fish', image: IPA3, creator: 'ArturFalcao', price: '2168.03 USDC', URL: 'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/26414233136229351194350431839875315045969147529690843074174196343275207524353'},
//   { id: 4, title: 'The Terminal', image: IPA4, creator: 'diberkato', price: '1 ETH', URL:'https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/29642'},
//   { id: 5, title: 'On Some High', image: IPA5, creator: 'Alex Mack', price: '0.0097 ETH', URL: 'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/9366421738142329838550851251409044944958925912594148577839686531771455766529'},
//   { id: 6, title: 'Donita Sparks, L7: Coconut Teazer, Los Angeles, 1990.', image: IPA6, creator: 'phosphene', price: '0 ETH', URL: 'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/24460042610638516058947371250238633898033226268786963695065259084724461109249'},
// ]

// const topSelling = [
//   { id: 1, title: 'Deysi Vinyl', image: IPD1, price: '$185', URL: 'https://www.doodles.app/shop/product/deysi-vinyl'},
//   { id: 2, title: 'Doodles x Crocs Jibbitz', image: IPD2, price: '$20', URL: 'https://www.doodles.app/shop/product/jibbitz-pack'},
//   { id: 3, title: 'Adidas Originals x Doodles Tee', image: IPD3, price: '$55', URL: 'https://www.doodles.app/shop/product/doodles-x-adidas-tee'},
//   { id: 4, title: 'Polar Bear Plushie', image: IPD4, price: '$29.99', URL: 'https://shop.pudgypenguins.com/products/polar-bear-plushie'},
//   { id: 5, title: 'PUDGY PINS (PACK OF 6)', image: IPD5, price: '$39.99', URL: 'https://shop.pudgypenguins.com/products/pins-pack-of-6'},
//   { id: 6, title: 'Kanpai Pandas - Essential Tee - Storm', image: IPD6, price: '$50', URL: 'https://wearkc.com/collections/new-items/products/copy-of-essential-tee-2'},
//   { id: 7, title: 'Sappy Seals - Custom Hoodie - Black', image: IPD7, price: '$74.99', URL: 'https://shop.sappyseals.com/products/custom-hoodie-black'},
//   { id: 8, title: 'Chugs Embroidered Beanie', image: IPD8, price: '$25.00', URL: 'https://store.coolcats.com/products/chugs-embroidered-beanie'},
//   { id: 9, title: 'Blue Cat Plush', image: IPD9, price: '$35.00', URL: 'https://store.coolcats.com/products/blue-cat-plush'},
//   { id: 10, title: 'BASTARD GAN PUNK V2 #10104', image: IPD10, price: '0.202 ETH', URL: 'https://opensea.io/assets/ethereum/0x31385d3520bced94f77aae104b406994d8f2168c/10104'},
// ]

export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
      <LandingPage/>
      {/*
      <ComingSoon/>
      <section className="relative py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {selectedIPA.map((ipa) => (
                <div key={ipa.id} className="flex-none w-80 snap-start">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                    <Link href={ipa.URL} target="_blank" rel="noopener noreferrer">
                      <div className="relative h-full cursor-pointer">
                        <Image
                          src={ipa.image}
                          alt={ipa.title}
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-semibold text-lg">{ipa.title}</h3>
                          <p className="text-sm text-gray-200">{ipa.creator}</p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black/50 hover:bg-black/75 backdrop-blur-sm text-white rounded-r-xl p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/50 hover:bg-black/75 backdrop-blur-sm text-white rounded-l-xl p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
       */}

      {/*
      <section className="px-4 py-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Selling Derivative Works</h2>
          <div className="space-y-4">
            {topSelling.map((nft, index) => (
              <Card 
                key={nft.id} 
                className="transform transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center p-4 gap-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{index + 1}</span>
                  </div>

                  <div className="flex-shrink-0">
                    <Image
                      src={nft.image}
                      alt={nft.title}
                      width={160}
                      height={160}
                      className="rounded-lg object-cover w-32 h-32 border-2 border-gray-200"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{nft.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-sm font-medium">{nft.price}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Button asChild>
                      <a href={nft.URL} target="_blank" rel="noopener noreferrer">
                        View Details
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}
    </main>
  )
}

