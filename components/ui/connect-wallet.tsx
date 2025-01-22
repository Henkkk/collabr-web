"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DynamicEmbeddedWidget,
  useDynamicContext,
  DynamicWidget
} from "@dynamic-labs/sdk-react-core";
import { useWalletClient } from "wagmi";
import Loading from "./loading";
import { storeUserData } from '@/lib/firebase';

function WalletConnectWrapper() {
  const { primaryWallet } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (primaryWallet?.address) {
        // Store user data when wallet is connected
        await storeUserData(primaryWallet.address);
        router.push('/profile');
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

export default function Waller() {
  return (
    <WalletConnectWrapper />
  );
}