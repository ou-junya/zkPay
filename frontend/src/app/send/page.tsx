'use client';

import { useState } from 'react';
import { Shield, ArrowRight, AlertCircle, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SendPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('JPYC');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: confirm, 3: processing, 4: success

  const tokens = [
    { symbol: 'JPYC', name: 'JPY Coin', balance: '75,000' },
    { symbol: 'USDC', name: 'USD Coin', balance: '850.25' },
    { symbol: 'ETH', name: 'Ethereum', balance: '1.8' },
  ];

  const handleSend = async () => {
    setStep(3);
    setIsLoading(true);
    
    // Simulate proof generation and transaction
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 3000);
  };

  const resetForm = () => {
    setStep(1);
    setRecipient('');
    setAmount('');
    setSelectedToken('JPYC');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/jpyc.svg" alt="JPYC" width={32} height={32} className="text-purple-400" />
          <span className="text-2xl font-bold text-white">zkPay</span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/wallet" className="text-gray-300 hover:text-white transition-colors">
            ウォレット
          </Link>
          <Link href="/send" className="text-purple-400 font-semibold">
            送金
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            について
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">プライベート送金</h1>
          <p className="text-gray-400">zk-SNARKsで保護された匿名送金</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-400'
                }`}>
                  {step > stepNum ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-purple-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          {/* Step 1: Form */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  送金先アドレス
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0zk1qyqszqgpqyqszqgpqyqszqgp..."
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    トークン
                  </label>
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol} className="bg-slate-800">
                        {token.symbol} (残高: {token.balance})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    金額
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="text-yellow-200 text-sm">
                    <p className="font-medium mb-1">プライバシー保護について</p>
                    <p>この送金は zk-SNARKs により完全に匿名化されます。送金者、受信者、金額の情報がブロックチェーン上で秘匿されます。</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!recipient || !amount}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>内容を確認</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">送金内容の確認</h3>
              
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">送金先</p>
                  <p className="text-white font-mono break-all">{recipient}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">金額</p>
                  <p className="text-white text-xl font-semibold">{amount} {selectedToken}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">プライバシーレベル</p>
                  <p className="text-green-400 font-medium">完全匿名 (zk-SNARKs)</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={handleSend}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  送金実行
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">証明生成中...</h3>
                <p className="text-gray-400">zk-SNARK証明を生成しています。しばらくお待ちください。</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  現在、あなたの取引のプライバシーを保護するための暗号学的証明を生成しています。
                  この処理には数秒から数分かかる場合があります。
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">送金完了！</h3>
                <p className="text-gray-400">プライベート送金が正常に完了しました。</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 text-sm">
                  取引ID: 0x1234...5678 (証明により保護)
                  <br />
                  あなたの送金は完全に匿名化されブロックチェーンに記録されました。
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/wallet"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  ウォレットに戻る
                </Link>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  新しい送金
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
