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
  const { primaryWallet } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (primaryWallet?.address) {
        // Check if user exists
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("wallet_address", "==", primaryWallet.address));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Redirect new users to profile setup
          router.push('/setup-profile');
        } else {
          // Existing user, redirect to profile
          router.push('/profile');
        }
      } else {
        // Cleanup when wallet is disconnected
        Object.keys(localStorage).forEach(key => {
          if (key.toLowerCase().includes('walletconnect')) {
            localStorage.removeItem(key);
          }
        });
      }
    };

    handleWalletConnection();
  }, [primaryWallet, router]);

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