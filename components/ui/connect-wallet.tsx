"use client"
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DynamicWidget,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

function WalletConnectWrapper() {
  const { primaryWallet, user } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    const handleWalletConnection = async () => {
      //console.log("user info: ", user?.verifiedCredentials);
      if (user && window.location.pathname === '/') {
        const userEmail = user.verifiedCredentials?.at(-1)?.email;

        // Check if a user with this email already exists
        if (userEmail) {
          const usersRef = collection(db, "Users");
          const q = query(usersRef, where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // User exists - update their wallet address
            const userDoc = querySnapshot.docs[0];
            await updateDoc(doc(db, "Users", userDoc.id), {
              wallet_address: primaryWallet?.address || null
            });
            //console.log('Updated existing user with wallet');
            //router.push('/profile');
            return;
          }
          else {
            // No existing user found - proceed with normal flow
            if (user.newUser) {
              console.log('New user, redirecting to setup');
              router.push('/setup-profile');
            } else {
              // console.log('Existing user, redirecting to profile');
              // router.push('/profile');
            }
          }
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