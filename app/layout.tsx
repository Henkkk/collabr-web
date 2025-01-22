import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Web3Providers from "./Web3Providers";
import { OnboardingProvider } from "@/components/ui/onboarding-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collabr",
  description: "Marketplace for licensing your NFTs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Web3Providers>
            <Navbar />
            <main className="flex-grow">
              {children}
              <Analytics />
            </main>
            <Footer />
        </Web3Providers>
      </body>
    </html>
  );
}
