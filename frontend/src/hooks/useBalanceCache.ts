'use client';

import { useEffect, useState } from 'react';

interface BalanceCache {
  [address: string]: {
    [token: string]: {
      balance: string;
      timestamp: number;
    };
  };
}

const CACHE_DURATION = 30000; // 30秒

export function useBalanceCache() {
  const [cache, setCache] = useState<BalanceCache>({});

  useEffect(() => {
    // ローカルストレージからキャッシュを読み込み
    const stored = localStorage.getItem('balance_cache');
    if (stored) {
      try {
        setCache(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse balance cache:', error);
      }
    }
  }, []);

  const getCachedBalance = (address: string, token: string): string | null => {
    const userCache = cache[address];
    if (!userCache) return null;

    const tokenCache = userCache[token];
    if (!tokenCache) return null;

    // キャッシュが古い場合は無効
    if (Date.now() - tokenCache.timestamp > CACHE_DURATION) {
      return null;
    }

    return tokenCache.balance;
  };

  const setCachedBalance = (address: string, token: string, balance: string) => {
    const newCache = {
      ...cache,
      [address]: {
        ...cache[address],
        [token]: {
          balance,
          timestamp: Date.now(),
        },
      },
    };

    setCache(newCache);
    localStorage.setItem('balance_cache', JSON.stringify(newCache));
  };

  const clearCache = () => {
    setCache({});
    localStorage.removeItem('balance_cache');
  };

  return {
    getCachedBalance,
    setCachedBalance,
    clearCache,
  };
}
