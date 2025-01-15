import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Collabr. All rights reserved.
            </p>
          </div>
          
          <nav className="flex gap-6">
            <Link 
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/terms-of-use"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
