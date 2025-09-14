'use client';

import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Shield, Wallet, RefreshCw, AlertTriangle } from 'lucide-react';
import { useTokenBalances } from '@/hooks/useTokenBalances';

export function WalletStatus() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { balances, isLoading, error } = useTokenBalances();

  if (!isConnected) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
        <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">ウォレットを接続してください</h3>
        <p className="text-gray-400 mb-6">
          zkPayを使用するには、まずウォレットを接続する必要があります。
        </p>
        <button
          onClick={openConnectModal}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          ウォレット接続
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Wallet className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">接続済みウォレット</h3>
        </div>
        {isLoading && (
          <RefreshCw className="h-5 w-5 text-purple-400 animate-spin" />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm">アドレス</p>
          <p className="text-white font-mono text-sm">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
          </p>
        </div>

        {/* トークン残高一覧 */}
        <div>
          <p className="text-gray-400 text-sm mb-3">残高</p>
          <div className="space-y-3">
            {balances.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{token.icon}</span>
                  <div>
                    <p className="text-white font-semibold">{token.symbol}</p>
                    <p className="text-gray-400 text-sm">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  {token.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
                      <span className="text-gray-400 text-sm">読み込み中...</span>
                    </div>
                  ) : token.error ? (
                    <div className="flex items-center space-x-2 text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">エラー</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white font-semibold">
                        {token.formatted}
                      </p>
                      <p className="text-gray-400 text-sm">{token.symbol}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 全体のエラー表示 */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <p className="text-red-400 text-sm">残高の取得に失敗しました</p>
          </div>
        )}
      </div>
    </div>
  );
}
