import collabr_logo from "@/media/Collabr_Logo.png"
import ConnectWallet from "./connect-wallet"

export default function Landing3() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-20">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
            </div>

            {/* Company Logo - Top Left */}
            <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50">
                <div className="flex items-center space-x-3">
                    <img 
                        src={collabr_logo.src} 
                        alt="Collabr logo" 
                        className="w-10 h-10 object-contain"
                    />
                    <span className="text-3xl font-bold text-gray-900">Collabr</span>
                </div>
            </div>

            {/* Connect Wallet Button - Top Right */}
            <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50">
                <ConnectWallet 
                    theme="light"
                    btnTitle="Connect Wallet"
                />
            </div>

            <div className="max-w-6xl space-y-12 py-80 mt-16 relative z-10">
                <div className="space-y-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.15] tracking-tight animate-fade-in-up">
                            Unlocking NFTs' Full Potential
                        <br className="hidden md:block"/> 
                        for Creativity <span className="whitespace-nowrap">&amp; Commerce</span>
                    </h1>
                </div>

                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-snug font-medium">
                    Empower your digital assets with our ecosystem that bridges 
                    <span className="bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent font-semibold">
                        {" "}artistic innovation{" "}
                    </span>
                    and sustainable economic models through blockchain technology.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">15M+</h3>
                        <p className="text-gray-600 font-medium">Digital Assets Traded</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">240K+</h3>
                        <p className="text-gray-600 font-medium">Creative Professionals</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">$2.8B+</h3>
                        <p className="text-gray-600 font-medium">In Creator Earnings</p>
                    </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Start Creating Free
                    </button>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:text-blue-600">
                        Explore Marketplace
                    </button>
                </div>

                {/* Social links - Bottom Left */}
                <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50">
                    <div className="flex flex-row space-x-4">
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.077.077 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0411-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923-.065-.0443-.0727-.1223-.0157-.1767.4308-.3553.8502-.7401 1.2527-1.1407.0908-.091.113-.218.0553-.3223-.4198-.7568-.7767-1.5433-1.0603-2.3537-.0522-.1512.0193-.312.1655-.3524 1.6165-.4434 3.2232-.4434 4.8297 0 .1462.0404.2177.2012.1655.3524-.2836.8104-.6405 1.597-1.0603 2.3537-.0577.1043-.0355.2313.0553.3223.4025.4006.8219.7854 1.2527 1.1407.057.0544.0493.1324-.0157.1767-.5979.3428-1.2194.6447-1.8722.8923a.076.076 0 00-.0411.1057c.353.699 1.1942 1.9592 1.226 1.9942a.076.076 0 00.0842.0276c1.9516-.6066 3.9401-1.5218 5.9929-3.0294a.077.077 0 00.0312-.0561c.4354-5.1778-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0276zM8.0637 15.3265c-1.1652 0-2.1338-1.0857-2.1338-2.4184 0-1.3327.9554-2.4184 2.1338-2.4184 1.1807 0 2.1583 1.0883 2.1338 2.4184 0 1.3327-.9531 2.4184-2.1338 2.4184zm7.8726 0c-1.1652 0-2.1338-1.0857-2.1338-2.4184 0-1.3327.9554-2.4184 2.1338-2.4184 1.1807 0 2.1583 1.0883 2.1338 2.4184 0 1.3327-.9531 2.4184-2.1338 2.4184z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}