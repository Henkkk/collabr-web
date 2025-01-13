export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Content Sections */}
        <p className="mb-6">
          Collabr is a marketplace where you can list your NFTs and allow others to create derivative works.
          These derivative works can include both physical and digital products — from a T-shirt to another piece of digital art.
          We make this possible by enabling you to create licenses for your NFTs. These licenses include simple terms that allow you 
          to specify who can remix, monetize, and create derivatives of your NFTs, as well as set the associated costs.
          We put the business logic on-chain to automate & enforce those terms.
        </p>

        <p className="mb-6">
          We understand that as an artist or creator, you may have little time to promote or market your work.
          That's why we connect you with others who are interested in marketing and business, helping you grow your community, and we call them "remixer".
        </p>

        <p className="mb-6">
          How do we make money? We take 2.5% commission fees from each sales.
        </p>

        <p className="mb-6">
          We're excited to see how you use Collabr to grow your community and continue to create amazing works.
        </p>

        <p className="mb-6">
          Connect with us on X <a href="https://x.com/wingfungyeung" className="text-blue-500 hover:text-blue-600">@wingfungyeung</a>, 
          <a href="https://x.com/DavidSlakter" className="text-blue-500 hover:text-blue-600">@DavidSlakter
          </a>
        </p>

        <p>
          Henry Yeung & David Slakter
        </p>

        <p className="mb-6">
          @Founders of Collabr
        </p>

        <div className="grid gap-12">
          {/* How it Works Section */}
          {/* <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold text-xl">1</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create an asset</h3>
                <p className="text-gray-600">
                  Create or upload existing NFTs to Collabr, and set up a license for your asset.
                </p>
              </div>
              <div>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold text-xl">2</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Starting Remixing</h3>
                <p className="text-gray-600">
                  Allow others to remix your asset and review the derivative works.
                </p>
              </div>
              <div>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold text-xl">3</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Collaborating</h3>
                <p className="text-gray-600">
                  Share derivative works with your fans on social media and earn royalties from sales.
                </p>
              </div>
            </div>
          </section> */}

          {/* Team/Values Section */}
          {/* <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-600 mb-4">
                Collabr was founded by two NYU alumni who are passionate about working at the intersection of Web3 and creative arts.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/wingfungyeung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Henry Yeung
                </a>
                <a
                  href="https://x.com/DavidSlakter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  David Slakter
                </a>
              </div>
            </div>
          </section> */}

          {/* Contact Section */}
          {/* <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              We'd love to hear from you. Reach out to us to learn more about our work
              or discuss potential collaborations.
            </p>
            <p className="text-gray-600 mb-4">
              Email: founders@collabr.xyz
            </p>
            <div className="flex items-center">
              <a
                href="https://discord.gg/SrkpaJAG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join our Discord community
              </a>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
}