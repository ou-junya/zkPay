'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  localhost,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'zkPay',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || 'zkpay-demo-project',
  // Add localhost for connecting to a local Hardhat/Anvil node
  chains: [mainnet, polygon, optimism, arbitrum, base, localhost],
  // Ensure Wagmi knows how to talk to the local node
  transports: {
    [localhost.id]: http(process.env.NEXT_PUBLIC_LOCAL_RPC || 'http://127.0.0.1:8545'),
  },
  ssr: true, // Enable SSR for better performance
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
