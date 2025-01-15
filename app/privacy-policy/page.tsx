import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Collabr",
  description: "Privacy Policy for Collabr - Learn about how we collect, use, and protect your data",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-sm md:text-base">
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to Collabr. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              This policy applies to all users of our platform, including creators, collectors, and visitors. By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Identity Data:</span> Full name, username, profile picture, and digital identity verification information</li>
              <li><span className="font-medium">Contact Data:</span> Email address, social media handles, and any communication preferences</li>
              <li><span className="font-medium">Technical Data:</span> IP address, browser type and version, time zone setting, operating system, platform, device information, and other technology identifiers on the devices you use to access our platform</li>
              <li><span className="font-medium">Usage Data:</span> Information about how you use our website, including browsing patterns, clicked links, and interactions with features</li>
              <li><span className="font-medium">Blockchain Data:</span> Wallet addresses, transaction history, smart contract interactions, and NFT ownership details</li>
              <li><span className="font-medium">Content Data:</span> Any content you create, upload, or share on our platform, including artwork, descriptions, and comments</li>
              <li><span className="font-medium">Financial Data:</span> Transaction amounts, payment methods (excluding actual payment details), and purchase history</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">3. How We Collect Your Data</h2>
            <p>We collect data through various methods:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Direct Interactions:</span> Information you provide when creating an account, uploading content, or communicating with us</li>
              <li><span className="font-medium">Automated Technologies:</span> Cookies, server logs, and similar technologies</li>
              <li><span className="font-medium">Blockchain Information:</span> Public blockchain data related to your wallet and transactions</li>
              <li><span className="font-medium">Third Parties:</span> Analytics providers, advertising networks, and blockchain data providers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">4. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Service Provision:</span> To operate our platform, process transactions, and maintain your account</li>
              <li><span className="font-medium">Communication:</span> To notify you about changes, updates, and important information</li>
              <li><span className="font-medium">Feature Access:</span> To enable participation in interactive features, marketplace activities, and community engagement</li>
              <li><span className="font-medium">Support Services:</span> To provide customer support and resolve technical issues</li>
              <li><span className="font-medium">Platform Improvement:</span> To analyze usage patterns and enhance our services</li>
              <li><span className="font-medium">Legal Compliance:</span> To comply with legal obligations and prevent fraudulent activities</li>
              <li><span className="font-medium">Marketing:</span> To send relevant updates about our services (with your consent)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">5. Data Security</h2>
            <p>
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Our security measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data at rest and in transit</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular backup procedures and disaster recovery plans</li>
              <li>Employee training on data protection and security practices</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">6. Your Rights</h2>
            <p>Under data protection laws, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Access:</span> Request access to your personal data</li>
              <li><span className="font-medium">Rectification:</span> Request correction of inaccurate data</li>
              <li><span className="font-medium">Erasure:</span> Request deletion of your data in certain circumstances</li>
              <li><span className="font-medium">Restriction:</span> Limit the processing of your data</li>
              <li><span className="font-medium">Portability:</span> Receive your data in a structured, commonly used format</li>
              <li><span className="font-medium">Objection:</span> Object to processing of your data</li>
              <li><span className="font-medium">Consent Withdrawal:</span> Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">7. International Transfers</h2>
            <p>
              We may transfer your personal data to countries outside your jurisdiction. When we do, we ensure appropriate safeguards are in place through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard contractual clauses</li>
              <li>Data protection agreements</li>
              <li>Compliance with international data protection frameworks</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">8. Retention Period</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes we collected it for, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Meeting legal and regulatory requirements</li>
              <li>Resolving disputes</li>
              <li>Enforcing our agreements</li>
              <li>Maintaining platform security and integrity</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer at:{" "}
              <a href="mailto:privacy@collabr.io" className="text-primary hover:underline">
                founders@collabr.xyz
              </a>
            </p>
            <p>
              For urgent matters, you can reach us at:{" "}
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (628) 224-0789
              </a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">10. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "last updated" date</li>
              <li>Sending an email notification for significant changes</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
