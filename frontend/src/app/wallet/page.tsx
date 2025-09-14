'use client';

import { useState } from 'react';
import { Shield, Wallet, Copy, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function WalletPage() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedToken, setSelectedToken] = useState('JPYC');

  // Mock data - in real app this would come from RAILGUN
  const tokens = [
    { symbol: 'JPYC', name: 'JPY Coin', balance: '150,000', shieldedBalance: '75,000' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,250.50', shieldedBalance: '850.25' },
    { symbol: 'ETH', name: 'Ethereum', balance: '2.5', shieldedBalance: '1.8' },
  ];

  const transactions = [
    {
      id: '1',
      type: 'shield',
      amount: '10,000 JPYC',
      status: 'confirmed',
      timestamp: '2024-01-15 14:30',
    },
    {
      id: '2',
      type: 'send',
      amount: '5,000 JPYC',
      status: 'confirmed',
      timestamp: '2024-01-15 12:15',
    },
    {
      id: '3',
      type: 'receive',
      amount: '25,000 JPYC',
      status: 'confirmed',
      timestamp: '2024-01-14 09:45',
    },
  ];

  const selectedTokenData = tokens.find(token => token.symbol === selectedToken);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/jpyc.svg" alt="JPYC" width={32} height={32} className="text-purple-400" />
          <span className="text-2xl font-bold text-white">zkPay</span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/wallet" className="text-purple-400 font-semibold">
            ウォレット
          </Link>
          <Link href="/send" className="text-gray-300 hover:text-white transition-colors">
            送金
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            について
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        {/* Wallet Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">プライベートウォレット</h1>
          <p className="text-gray-400">zk-SNARKs で保護された残高と取引履歴</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">シールド残高</h2>
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
            {tokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token.symbol)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedToken === token.symbol
                    ? 'border-purple-400 bg-purple-400/10'
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                <div className="text-left">
                  <p className="text-white font-semibold">{token.symbol}</p>
                  <p className="text-gray-400 text-sm">{token.name}</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {isBalanceVisible ? token.shieldedBalance : '***'}
                  </p>
                </div>
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
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
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
    </div>
  );
}
