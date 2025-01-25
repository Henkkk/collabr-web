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
      
      const userEmail = user?.verifiedCredentials?.[0]?.email;
      console.log('User email:', userEmail);

      if (primaryWallet?.address || userEmail) {
        // Check if user exists
        const usersRef = collection(db, "Users");
        const q = primaryWallet?.address
          ? query(usersRef, where("wallet_address", "==", primaryWallet.address))
          : query(usersRef, where("email", "==", userEmail));
          
        console.log('Querying with:', primaryWallet?.address || userEmail);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No user found, redirecting to setup');
          router.push('/setup-profile');
        } else {
          console.log('User found, redirecting to profile');
          router.push('/profile');
        }
      } else {
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