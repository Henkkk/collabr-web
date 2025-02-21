import collabr_logo from "@/media/Collabr_Logo.png"
import ConnectWallet from "./connect-wallet"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Landing3() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check for existing dark mode preference
        if (document.documentElement.classList.contains('dark')) {
            setIsDarkMode(true)
        }
    }, [])

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-2 sm:px-4 py-12 sm:py-20">
            {/* Animated Background - Updated for dark mode */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
            </div>

            {/* Company Logo and Navigation */}
            <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50">
                <div className="flex items-center">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <img 
                            src={collabr_logo.src} 
                            alt="Collabr logo" 
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                        <span className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 font-display">
                            Collabr
                        </span>
                    </div>
                    <button 
                        onClick={() => router.push('/about')}
                        className="ml-6 px-4 py-1.5 text-base sm:text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-lg border border-transparent hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium"
                    >
                        About
                    </button>
                </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 flex gap-2 sm:gap-3 items-center">
                <button 
                    onClick={toggleDarkMode}
                    className="p-2 sm:p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    {isDarkMode ? (
                        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>

                {/* Connect Wallet Button */}
                <ConnectWallet />
            </div>

            <div className="max-w-6xl space-y-8 sm:space-y-12 py-40 sm:py-80 mt-8 sm:mt-16 relative z-10">
                <div className="space-y-8 sm:space-y-12">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white leading-[1.07] animate-fade-in-up font-heading">
                        Unleashing the Full Potential of Creative Works
                        <br className="hidden md:block"/> 
                    </h1>
                </div>


                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button 
                        onClick={() => router.push('/create/create-asset')}
                        className="bg-[#008CFF] dark:bg-[#008CFF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-mono font-medium tracking-wide hover:bg-[#0070CC] dark:hover:bg-[#0070CC] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Create a listing 
                    </button>
                    <button 
                        onClick={() => router.push('/discover')}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-mono font-medium tracking-wide hover:border-blue-500 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        Explore assets
                    </button>
                </div>

                {/* Social links - Updated icon colors */}
                <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50">
                    <div className="flex flex-row space-x-3 sm:space-x-4 font-mono">
                        <a href="https://x.com/collabrxyz" className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                            </svg>
                        </a>
                        <a href="https://github.com/Henkkk/collabr-web" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                            </svg>
                        </a>
                        <a href="https://discord.gg/gf2Q8BZQC8" className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}