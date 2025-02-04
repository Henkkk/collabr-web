'use client'
import React, { useState, useEffect } from 'react';
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
                        <a 
                            href="https://www.story.foundation/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 text-lg"
                        >
                            Powered by Story Protocol
                        </a>
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
                    className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.a 
                        href="/learn"
                        onClick={() => track('tutorial_video_click')}
                        className="group relative inline-flex items-center justify-center px-8 py-4 w-64 bg-gradient-to-r from-[#008CFF] to-[#0070CC] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-500/25 hover:shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="mr-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        Watch Tutorial
                    </motion.a>
                    <motion.a 
                        href="https://cal.com/henry-yeung/15min"
                        onClick={() => track('book_call_click')}
                        className="group relative inline-flex items-center justify-center px-8 py-4 w-64 border-2 border-[#008CFF] text-[#008CFF] dark:text-white font-semibold rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="mr-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        Book a Call
                    </motion.a>
                </motion.div>
            </section>

            {/* New Promotion Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div 
                    className="group relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl shadow-2xl shadow-blue-500/20 dark:shadow-blue-900/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute inset-0 pattern-dots pattern-blue-500/10 pattern-size-4 pattern-opacity-100 dark:pattern-blue-900/10" />
                    
                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 p-8 lg:p-12">
                        {/* Left Content */}
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full border border-white/20">
                                <span className="text-2xl">🎉</span>
                                <span className="font-semibold text-[#008CFF]">Limited Offer</span>
                                <div className="h-4 w-px bg-white/20" />
                                <CountdownTimer />
                            </div>
                            
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#008CFF]">
                                First Mint Free<br />
                                <span className="text-xl lg:text-2xl font-medium text-[#008CFF]/80">For New Creators This Week</span>
                            </h2>
                            
                            <ul className="flex flex-col gap-3 text-[#008CFF] text-lg">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Login with your email, no wallet required.
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Create your first IP on Story Protocol
                                </li>
                            </ul>
                        </div>

                        {/* Right Content */}
                        <div className="relative w-full lg:w-auto flex flex-col items-center gap-6">
                            <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl" />
                                <div className="relative z-10 flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl">
                                    <div className="text-center space-y-2">
                                        <div className="text-6xl lg:text-7xl">🎁</div>
                                        <div className="text-sm font-semibold text-white/90">FREE MINT</div>
                                        {/* <div className="text-xstext-[#008CFF]">Value: $50+</div> */}
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                onClick={() => {
                                    router.push('/create/create-asset');
                                    track('free_mint_click');
                                }}
                                className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[#008CFF] font-bold rounded-xl transition-all duration-300 hover:gap-3 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Claim Your Free Mint
                                <svg 
                                    className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </motion.button>
                        </div>
                    </div>

                    {/* Animated floating elements */}
                    <motion.div 
                        className="absolute top-0 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div 
                        className="absolute bottom-4 right-8 w-16 h-16 bg-purple-500/10 rounded-full blur-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </motion.div>
            </section>
        </div>
    );
}

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date('2025-02-09T23:59:59');
        
        const timer = setInterval(() => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-1 text-sm text-[#008CFF]">
            <span>{timeLeft.days}d</span>
            <span>:</span>
            <span>{formatTime(timeLeft.hours)}h</span>
            <span>:</span>
            <span>{formatTime(timeLeft.minutes)}m</span>
            <span>:</span>
            <span>{formatTime(timeLeft.seconds)}s</span>
        </div>
    );
}

