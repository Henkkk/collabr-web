"use client"
import Link from "next/link"
import ConnectWallet from "./connect-wallet"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import logo from "@/media/Collabr_Logo.png"
import Image from "next/image"

export default function Navbar(){
    const { primaryWallet } = useDynamicContext();

    return (
    <nav className="bg-white text-black shadow-sm sticky top-0 z-50">
        <div className="container mx-auto">
            <div className="flex items-center content-center justify-between h-16">
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                        <Image 
                            src={logo}
                            alt="Collabr logo"
                            width={32}
                            height={32}
                        />
                        Collabr
                    </Link>
                </div>

                <div className="flex-shrink-0 flex items-center">
                    <ConnectWallet/>
                    {primaryWallet && (
                        <>
                            <Link href="/create/create-asset">
                                <button className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-black">
                                    Create
                                </button>
                            </Link>
                            <Link href="/profile" className="ml-4 p-2 rounded-full text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-black">
                                <span className="sr-only">View profile</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>
    )
}