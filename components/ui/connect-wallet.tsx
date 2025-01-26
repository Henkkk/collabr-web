"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DynamicWidget,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

function WalletConnectWrapper() {
  const { primaryWallet, user } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    const handleWalletConnection = async () => {
      console.log('Dynamic user:', user);
      console.log('Primary wallet:', primaryWallet);
      
      // Only redirect if the user state has actually changed
      if (user && window.location.pathname === '/') {
        if (user.newUser) {
          console.log('New user, redirecting to setup');
          router.push('/setup-profile');
        } else {
          console.log('Existing user, redirecting to profile');
          router.push('/profile');
        }
      } else if (!user) {
        // Cleanup when disconnected
        Object.keys(localStorage).forEach(key => {
          if (key.toLowerCase().includes('walletconnect')) {
            localStorage.removeItem(key);
          }
        });
      }
    };

    handleWalletConnection();
  }, [primaryWallet, user, router]);

  return (
    <div>
      <DynamicWidget />
    </div>
  );
}

export default function Wallet() {
  return (
    <WalletConnectWrapper />
  );
}