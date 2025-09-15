'use client';

import { useState } from 'react';
import { Shield, Wallet, Copy, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { WalletStatus } from '@/components/WalletStatus';
import { ShieldModal } from '@/components/ShieldModal';
import { useTokenBalances } from '@/hooks/useTokenBalances';
import { useRailgunShieldedBalance } from '@/hooks/useRailgunBalance';

export default function WalletPage() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedToken, setSelectedToken] = useState('JPYC');
  const [isShieldModalOpen, setIsShieldModalOpen] = useState(false);
  const { balances, isLoading, refetch } = useTokenBalances();
  
  // シールド残高（実際の Railgun SDK を使用）
  const { 
    formattedBalance: jpycShieldedBalance, 
    isLoading: isShieldedLoading, 
    error: shieldedError, 
    refetch: refetchShielded 
  } = useRailgunShieldedBalance();

  const handleRefresh = () => {
    if (refetch) {
      refetch();
    }
    if (refetchShielded) {
      refetchShielded();
    }
  };

  const handleShieldSuccess = () => {
    // シールド成功後にすべての残高を更新
    handleRefresh();
  };

  const transactions = [
    {
      id: '1',
      type: 'shield',
      amount: '10,000 JPYC',
      status: 'confirmed',
      timestamp: '2025-09-15 16:45',
    },
    {
      id: '2',
      type: 'send',
      amount: '5,000 JPYC',
      status: 'confirmed',
      timestamp: '2025-09-15 08:30',
    },
    {
      id: '3',
      type: 'receive',
      amount: '25,000 JPYC',
      status: 'confirmed',
      timestamp: '2025-09-13 15:20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        {/* Wallet Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">プライベートウォレット</h1>
          <p className="text-gray-400">zk-SNARKs で保護された残高と取引履歴</p>
        </div>

        {/* Wallet Connection Status */}
        <div className="mb-8">
          <WalletStatus />
        </div>

        {/* Public Balance Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">パブリック残高</h2>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-400">
                通常のウォレット残高 • プライベート送金では変更されません
              </p>
              {isLoading && (
                <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
              )}
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 text-blue-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {balances.length === 0 ? (
              <div className="col-span-full p-4 rounded-xl border border-white/20 bg-black/20 text-center">
                <p className="text-gray-400">ウォレットが接続されていません</p>
              </div>
            ) : (
              balances.map((token) => (
                <div
                  key={token.symbol}
                  className="p-4 rounded-xl border border-white/20 bg-black/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{token.icon}</span>
                    <div>
                      <p className="text-white font-semibold">{token.symbol}</p>
                      <p className="text-gray-400 text-sm">{token.name}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {token.isLoading ? (
                      <span className="text-gray-400">読み込み中...</span>
                    ) : token.error ? (
                      <span className="text-red-400">エラー</span>
                    ) : (
                      token.formatted
                    )}
                  </p>
                  {token.error && (
                    <p className="text-red-400 text-xs mt-1">
                      残高の取得に失敗しました
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shielded Balance Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-semibold text-white">シールド残高</h2>
                <p className="text-xs text-gray-400">
                  プライベート送金に使用される残高 • zk-SNARKs で保護
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isBalanceVisible ? (
                <Eye className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {balances.map((token) => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token.symbol)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedToken === token.symbol
                    ? 'border-purple-400 bg-purple-400/10'
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{token.icon}</span>
                  <div className="text-left">
                    <p className="text-white font-semibold">{token.symbol}</p>
                    <p className="text-gray-400 text-sm">{token.name}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white text-left">
                  {isBalanceVisible ? (
                    isShieldedLoading ? (
                      <span className="text-gray-400">読み込み中...</span>
                    ) : shieldedError ? (
                      <span className="text-red-400">0.00</span>
                    ) : (
                      `${jpycShieldedBalance} JPYC`
                    )
                  ) : (
                    '***'
                  )}
                </p>
                {shieldedError && isBalanceVisible && (
                  <p className="text-red-400 text-xs mt-1">
                    シールド残高の取得に失敗
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-4">
            <Link
              href="/send"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowUpRight className="h-5 w-5" />
              <span>送金</span>
            </Link>
            <button 
              onClick={() => setIsShieldModalOpen(true)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowDownLeft className="h-5 w-5" />
              <span>シールド</span>
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>アンシールド</span>
            </button>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">RAILGUN アドレス</h3>
          <div className="flex items-center space-x-3 bg-black/20 rounded-lg p-4">
            <code className="flex-1 text-purple-300 font-mono text-sm break-all">
              0zk1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgp
            </code>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Copy className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-6">取引履歴</h3>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'shield' ? 'bg-blue-500/20' :
                    tx.type === 'send' ? 'bg-red-500/20' : 'bg-green-500/20'
                  }`}>
                    {tx.type === 'shield' ? (
                      <Shield className="h-5 w-5 text-blue-400" />
                    ) : tx.type === 'send' ? (
                      <ArrowUpRight className="h-5 w-5 text-red-400" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {tx.type === 'shield' ? 'シールド' :
                       tx.type === 'send' ? '送金' : '受信'}
                    </p>
                    <p className="text-gray-400 text-sm">{tx.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {tx.type === 'send' ? '-' : '+'}{tx.amount}
                  </p>
                  <p className="text-gray-400 text-sm capitalize">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shield Modal */}
      <ShieldModal
        isOpen={isShieldModalOpen}
        onClose={() => setIsShieldModalOpen(false)}
        onSuccess={handleShieldSuccess}
      />
    </div>
  );
}
