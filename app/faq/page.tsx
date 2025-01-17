'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <ChevronDownIcon 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const generalFAQs = [
    {
      question: "What is Collabr?",
      answer: "Collabr is a marketplace that enables NFT owners to license their assets for derivative works. It allows creators to specify terms for remixing, monetization, and creation of derivative works, with all business logic automated on-chain."
    },
    {
      question: "How does Collabr work?",
      answer: (
        <>
          1. Create or upload your NFT assets to Collabr<br/>
          2. Set up a license specifying terms for derivative works<br/>
          3. Allow others to remix your work under your terms<br/>
          4. Share the derivative and earn royalties from sales
        </>
      )
    },
    {
      question: "How does Collabr make money?",
      answer: "Collabr takes a 2.5% commission fee from each sale. All other terms, including royalty rates, are set by the original asset creator in their license terms."
    },
    {
        question: "How is Collabr different from SuperRare, Foundation, Objkt, and similar platforms?",
        answer: "Collabr enables NFT owners to license their assets for derivative works, creating value beyond trading purposes and fostering collaboration between creators."
      }
  ];

  const creatorFAQs = [
    {
      question: "How do I protect my intellectual property?",
      answer: "When you create a license on Collabr, you specify exactly how your work can be used. These terms are enforced through smart contracts, ensuring your IP rights are protected while allowing for authorized derivative works."
    },
    {
      question: "Can I control how my work is used?",
      answer: "Yes! You have full control over your license terms, including who can create derivatives, what types of derivatives are allowed, and what royalty rates apply to sales."
    }
  ];

  const remixerFAQs = [
    {
      question: "How do I start remixing?",
      answer: "Browse the marketplace for assets with licenses that match your needs. Once you find an asset, you can review the license terms and begin creating derivative works within those terms."
    },
    {
      question: "What can I create?",
      answer: "Depending on the license terms, you can create both physical and digital derivative works - from merchandise like T-shirts to digital art and animations. Each asset's license will specify what types of derivatives are allowed."
    }
  ];

  return (
    <main className="min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          {/* General Questions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">General</h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200 rounded-lg bg-white">
              {generalFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>

          {/* Creator Questions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">For Creators/NFT Owners</h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200 rounded-lg bg-white">
              {creatorFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>

          {/* Remixer Questions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">For Remixers</h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200 rounded-lg bg-white">
              {remixerFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>

          {/* Support Section */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-4">
              Send an email to{' '}
              <a href="mailto:founders@collabr.xyz" className="text-blue-500 hover:text-blue-600">
                founders@collabr.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 