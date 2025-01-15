import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms of Use | Collabr",
  description: "Terms of Use for Collabr - Understanding your rights and responsibilities when using our platform",
};

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Use</h1>
        <div className="space-y-6 text-sm md:text-base">
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">1. Agreement to Terms</h2>
            <p>
              Welcome to Collabr. These Terms of Use constitute a legally binding agreement made between you and Collabr ("we," "us," or "our"), concerning your access to and use of our website and services.
            </p>
            <p>
              By accessing or using our platform, you agree that you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these terms, you are prohibited from using the platform and must discontinue use immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the platform (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            <div className="space-y-2">
              <p className="font-medium">2.1 User Content License</p>
              <p>
                When you create, upload, or share content on our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute it across our platform and promotional materials.
              </p>
              <p className="font-medium mt-4">2.2 NFT and Digital Asset Rights</p>
              <p>
                Ownership of a Collabr NFT does not grant you any rights in Collabr's intellectual property. Your purchase of a Collabr NFT entitles you to ownership of the underlying digital asset as specified in the associated smart contract and license agreement.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">3. User Representations</h2>
            <p>By using the platform, you represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You have the legal capacity and agree to comply with these Terms of Use</li>
              <li>You are not under the age of 18</li>
              <li>You will not access the platform through automated or non-human means</li>
              <li>You will not use the platform for any illegal or unauthorized purpose</li>
              <li>Your use of the platform will not violate any applicable law or regulation</li>
              <li>You have the necessary rights to create, upload, or sell any content or NFTs on our platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">4. User Registration</h2>
            <p>
              You may need to register an account to access certain features of the platform. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly notify us of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">5. Prohibited Activities</h2>
            <p>You may not access or use the platform for any purpose other than that for which we make it available. Prohibited activities include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Systematic retrieval of data to create a collection or database</li>
              <li>Circumventing or disabling platform security features</li>
              <li>Engaging in unauthorized framing or linking</li>
              <li>Uploading or transmitting viruses or malicious code</li>
              <li>Impersonating another user or person</li>
              <li>Interfering with or manipulating blockchain transactions</li>
              <li>Attempting to manipulate platform rankings or metrics</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">6. Digital Assets and Transactions</h2>
            <div className="space-y-2">
              <p className="font-medium">6.1 NFT Transactions</p>
              <p>
                All NFT transactions are facilitated through smart contracts on the blockchain. You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Blockchain transactions are irreversible</li>
                <li>You are responsible for the security of your wallet</li>
                <li>Transaction fees (gas fees) are your responsibility</li>
                <li>NFT prices and values can be highly volatile</li>
              </ul>

              <p className="font-medium mt-4">6.2 Marketplace Rules</p>
              <p>
                When participating in our marketplace, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only list NFTs that you own or have the right to sell</li>
                <li>Accurately describe listed items</li>
                <li>Honor successful sales and transactions</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">7. Disclaimers</h2>
            <p>
              THE PLATFORM IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. YOU AGREE THAT YOUR USE OF THE PLATFORM AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE PLATFORM.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not guarantee the accuracy or completeness of any information on the platform</li>
              <li>We are not responsible for the actions of other users or third parties</li>
              <li>We do not guarantee the value or transferability of any NFTs</li>
              <li>We are not responsible for any loss of digital assets or cryptocurrency</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">8. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the United States. Collabr and yourself irrevocably consent that the courts of California shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">11. Contact Information</h2>
            <p>
              For any questions about these Terms of Use, please contact us at:{" "}
              <a href="mailto:founders@collabr.xyz" className="text-primary hover:underline">
                founders@collabr.xyz
              </a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">12. Changes to Terms</h2>
            <p>
              We reserve the right to make changes or modifications to these Terms of Use at any time and for any reason. We will notify you about any changes by updating the "Last updated" date of these Terms of Use, and you waive any right to receive specific notice of each such change.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
} 