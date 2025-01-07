"use client";
import { http, createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import AppProvider from "@/lib/context/AppContext";
import { PropsWithChildren, useEffect, useState } from "react";
import { createWalletClient, type Chain } from "viem";

export const odyssey = {
  id: 1516,
  name: "Story Network Testnet",
  nativeCurrency: {
    name: "Collabr",
    symbol: "CLBR",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.odyssey.storyrpc.io"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://odyssey-testnet-explorer.storyscan.xyz/" },
  },
  testnet: true,
} as const satisfies Chain;

const config = createConfig({
  chains: [odyssey],
  multiInjectedProviderDiscovery: false,
  transports: {
    [odyssey.id]: http(),
  },
});

const queryClient = new QueryClient();

const evmNetworks = [
  {
    blockExplorerUrls: ["https://odyssey-testnet-explorer.storyscan.xyz/"],
    chainId: 1516,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/story.svg"],
    name: "Story Network Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Testnet IP",
      symbol: "IP",
    },
    networkId: 1516,
    rpcUrls: ["https://rpc.odyssey.storyrpc.io"],
    vanityName: "Odyseey",
  },
];

function ClientProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicContextProvider
        theme='dark'
        settings={{
          appName: "Collabr",
          environmentId: "c78637eb-1176-40f1-9d5a-71d9993f77b6",
          networkValidationMode: "always",
          walletConnectors: [EthereumWalletConnectors],
          overrides: { evmNetworks }
        }}
      >
        <DynamicWagmiConnector>
          <AppProvider>{children}</AppProvider>
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </QueryClientProvider>
  );
}

export default function Web3Providers({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <ClientProviders>{children}</ClientProviders>
    </WagmiProvider>
  );
}
