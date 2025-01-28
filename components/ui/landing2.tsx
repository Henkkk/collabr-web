'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import azuki_sample from '@/media/azuki_sample.png'
import azuki_derivative from '@/media/IPD.png'
import azuki_share from '@/media/share.png'
import { useRouter } from 'next/navigation';
import story_protocol from '@/media/story-favicon.png'
import { track } from '@vercel/analytics';

export default function Landing2() {
    const router = useRouter();
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                <div className="absolute top-1/3 -right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 relative">
                <motion.div 
                    className="text-center max-w-3xl mx-auto space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl font-bold from-blue-600">
                        Maximize the earning potential of your NFTs
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        The place for artists and creators to monetize their NFTs through collaborative remixing and sharing in the Web3 space.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button 
                            onClick={() => router.push('/profile')}
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-[#008CFF] to-[#0070CC] hover:from-[#0080E6] hover:to-[#0066B8] text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                        >
                            Set Up Your Profile
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Story Protocol Banner */}
            <section className="container mx-auto px-4 pb-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            src={story_protocol}
                            alt="Story Protocol Logo"
                            width={24}
                            height={24}
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Powered by Story Protocol
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* How it Works Section */}
            <section className="container mx-auto px-4 py-20 relative">
                <motion.h2 
                    className="text-4xl font-bold text-center mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    How Collabr Works
                </motion.h2>
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Animated Vertical Line */}
                        <motion.div 
                            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        />

                        {/* Step 1 */}
                        <motion.div 
                            className="relative pl-24 pb-24"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute left-4 w-8 h-8 bg-gradient-to-r from-[#008CFF] to-[#0070CC] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                1
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/20">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-xl font-semibold mb-3">Create an asset (For Example: Azuki #7854)</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                        Create or upload your NFT, define its license—including who can remix, monetize, or create derivatives, 
                                        and the associated costs—and let on-chain business logic automate and enforce these terms.
                                        </p>
                                    </div>
                                    <div className="w-40 h-40 relative">
                                        <Image
                                            src={azuki_sample}
                                            alt="Original NFT"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div 
                            className="relative pl-24 pb-24"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="absolute left-4 w-8 h-8 bg-gradient-to-r from-[#008CFF] to-[#0070CC] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                2
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/20">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-semibold mb-3">Enable Remixing</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            If your works are open for remixing, you will receive remixing requests from other creators. You can view these requests in the "Collaboration Hub" tab. Review the requests and approve them as needed,
                                            and after your approval, the derivative works will be created and minted on-chain.
                                            
                                        </p>
                                    </div>
                                    <div className="w-40 h-40 relative">
                                        <Image
                                            src={azuki_derivative}
                                            alt="Remix settings"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div 
                            className="relative pl-24"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="absolute left-4 w-8 h-8 bg-gradient-to-r from-[#008CFF] to-[#0070CC] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                3
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/20">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-semibold mb-3">Share and Earn</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Share the derivative works and earn royalties from the derivative works sales.
                                        </p>
                                    </div>
                                    <div className="w-40 h-40 relative">
                                        <Image
                                            src={azuki_share}
                                            alt="Earning visualization"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div 
                    className="text-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.a 
                        href="/learn"
                        onClick={() => track('tutorial_video_click')}
                        className="inline-block w-48 px-8 py-4 bg-gradient-to-r from-[#008CFF] to-[#0070CC] hover:from-[#0080E6] hover:to-[#0066B8] text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Watch our tutorial video
                    </motion.a>
                    <motion.a 
                        href="https://cal.com/henry-yeung/15min"
                        onClick={() => track('book_call_click')}
                        className="inline-block w-48 px-8 py-4 bg-white dark:bg-gray-800 text-[#008CFF] border-2 border-[#008CFF] font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book a Call With Us
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}

