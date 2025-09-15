'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { railgunWalletService } from '@/lib/railgun/walletService';
import { RAILGUN_CONFIG, formatRailgunBalance } from '@/lib/railgun/config';

export function useRailgunShieldedBalance() {
  const { address, isConnected } = useAccount();
  const [shieldedBalance, setShieldedBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  // Railgun Wallet Serviceの初期化
  useEffect(() => {
    const initializeService = async () => {
      if (!isInitialized) {
        try {
          await railgunWalletService.initialize();
          await railgunWalletService.createOrLoadWallet();
          setIsInitialized(true);
          console.log('Railgun service initialized successfully');
        } catch (err) {
          console.error('Failed to initialize Railgun service:', err);
          setError('Railgun サービスの初期化に失敗しました');
        }
      }
    };
    
    initializeService();
  }, [isInitialized]);

  // シールド残高を取得
  const fetchShieldedBalance = async () => {
    if (!address || !isConnected || !isInitialized) {
      setShieldedBalance('0');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // ウォレットが初期化されていない場合は作成/読み込み
      if (!railgunWalletService.isWalletInitialized()) {
        await railgunWalletService.createOrLoadWallet();
      }

      // JPYC トークンの残高を取得
      const balance = await railgunWalletService.getTokenBalance(
        RAILGUN_CONFIG.JPYC_TOKEN.address
      );
      
      setShieldedBalance(balance);
      setLastUpdateTime(Date.now());
      console.log('Railgun shielded balance fetched:', balance);
      
    } catch (err: any) {
      console.error('Failed to fetch shielded balance:', err);
      setError(err.message || 'シールド残高の取得に失敗しました');
      // エラーの場合も0に設定
      setShieldedBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  // アドレスが変更されたら残高を再取得
  useEffect(() => {
    if (isInitialized && address && isConnected) {
      fetchShieldedBalance();
    }
  }, [address, isConnected, isInitialized]);

  // 定期的な残高更新（60秒ごと）
  useEffect(() => {
    if (!isInitialized || !address || !isConnected) return;

    const interval = setInterval(() => {
      fetchShieldedBalance();
    }, 60000);

    return () => clearInterval(interval);
  }, [isInitialized, address, isConnected]);

  // フォーマットされた残高
  const formattedBalance = formatRailgunBalance(shieldedBalance, RAILGUN_CONFIG.JPYC_TOKEN.decimals);

  return {
    shieldedBalance,
    formattedBalance,
    isLoading,
    error,
    refetch: fetchShieldedBalance,
    isInitialized,
    lastUpdateTime,
    hasBalance: parseFloat(shieldedBalance) > 0,
  };
}

// 将来的な拡張のためのユーティリティ関数
export const initializeRailgunWallet = async (walletId: string, encryptionKey: string) => {
  return await railgunWalletService.createOrLoadWallet(undefined, encryptionKey);
};

export const getRailgunBalance = async (walletId: string, tokenAddress: string) => {
  return await railgunWalletService.getTokenBalance(tokenAddress);
};
