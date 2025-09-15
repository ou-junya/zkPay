'use client';

import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import jpycAbi from '@/lib/contracts/jpyc-abi.json';

// JPYCトークンの設定
export const JPYC_TOKEN = {
  symbol: 'JPYC',
  name: 'JPY Coin',
  decimals: 18,
  // 指定されたJPYCコントラクトのアドレス
  address: '0x276C216D241856199A83bf27b2286659e5b877D3' as `0x${string}`,
  icon: '🇯🇵',
} as const;

export function useJPYCBalance() {
  const { address, isConnected } = useAccount();
  const [formattedBalance, setFormattedBalance] = useState('0.00');

  // JPYCの残高を取得
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: JPYC_TOKEN.address,
    abi: jpycAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isConnected),
      refetchInterval: 30000, // 30秒ごとに更新
    },
  });

  // 残高をフォーマット
  useEffect(() => {
    if (balance) {
      const balanceInEther = Number(balance) / Math.pow(10, JPYC_TOKEN.decimals);
      setFormattedBalance(balanceInEther.toLocaleString('ja-JP', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }));
    } else {
      setFormattedBalance('0.00');
    }
  }, [balance]);

  return {
    balance: balance || BigInt(0),
    formattedBalance,
    isLoading,
    error,
    refetch,
    isConnected,
    address,
  };
}

export function useTokenBalances() {
  const jpycBalance = useJPYCBalance();

  const balances = [{
    ...JPYC_TOKEN,
    balance: jpycBalance.balance,
    formatted: jpycBalance.formattedBalance,
    isLoading: jpycBalance.isLoading,
    error: jpycBalance.error,
  }];

  return {
    balances,
    isLoading: jpycBalance.isLoading,
    error: jpycBalance.error,
    isConnected: jpycBalance.isConnected,
    address: jpycBalance.address,
    refetch: jpycBalance.refetch,
  };
}

export type TokenBalance = ReturnType<typeof useTokenBalances>['balances'][0];
