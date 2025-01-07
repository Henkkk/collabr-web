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

function WalletConnectWrapper() {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    // Cleanup when wallet is disconnected
    if (!primaryWallet) {
      // Clear any WalletConnect related items from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.toLowerCase().includes('walletconnect')) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [primaryWallet]);

  return (
    <div>
      <DynamicWidget/>
    </div>
  );
}

export default function Waller() {
  return (
    <WalletConnectWrapper />
  );
}