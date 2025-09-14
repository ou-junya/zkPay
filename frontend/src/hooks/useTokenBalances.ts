'use client';

import { useAccount } from 'wagmi';
import { useMemo } from 'react';

// JPYCトークンの設定
export const JPYC_TOKEN = {
  symbol: 'JPYC',
  name: 'JPY Coin',
  decimals: 18,
  address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB' as `0x${string}`, // JPYC address (ダミー)
  icon: '🇯🇵',
} as const;

export function useTokenBalances() {
  const { address, isConnected } = useAccount();

  // 現在はダミーデータを返す（実際のプロジェクトではRAILGUNやトークンコントラクトから取得）
  const balances = useMemo(() => {
    if (!isConnected || !address) return [];

    // ダミーのJPYC残高データ
    const balanceAmount = BigInt(150000); // 150,000 JPYC
    const decimals = BigInt(10) ** BigInt(18); // 10^18
    const fullBalance = balanceAmount * decimals;
    
    return [{
      ...JPYC_TOKEN,
      balance: fullBalance,
      formatted: '150,000.00',
      isLoading: false,
      error: null,
    }];
  }, [isConnected, address]);

  return {
    balances,
    isLoading: false,
    error: null,
    isConnected,
    address,
  };
}

export type TokenBalance = ReturnType<typeof useTokenBalances>['balances'][0];
