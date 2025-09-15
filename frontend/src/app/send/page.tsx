'use client';

import { useState } from 'react';
import { Shield, ArrowRight, AlertCircle, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { useTokenBalances } from '@/hooks/useTokenBalances';
import { useRailgunShieldedBalance } from '@/hooks/useRailgunBalance';

export default function SendPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('JPYC');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: confirm, 3: processing, 4: success
  const { balances, isConnected } = useTokenBalances();
  
  // シールド残高を取得
  const { 
    formattedBalance: jpycShieldedBalance, 
    shieldedBalance: jpycShieldedBalanceRaw,
    isLoading: isShieldedLoading, 
    error: shieldedError,
    hasBalance
  } = useRailgunShieldedBalance();

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

  const selectedTokenBalance = jpycShieldedBalance;
  const selectedTokenData = balances.find(token => token.symbol === selectedToken);
  
  // 送金可能かチェック
  const canSend = recipient && amount && parseFloat(amount) > 0 && 
                  parseFloat(jpycShieldedBalanceRaw) >= parseFloat(amount) && 
                  hasBalance;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 pb-24 pt-32">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <Shield className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">ウォレットを接続してください</h2>
            <p className="text-gray-400 mb-6">送金機能を使用するには、まずウォレットを接続する必要があります。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

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
                    {balances.map((token) => (
                      <option key={token.symbol} value={token.symbol} className="bg-slate-800">
                        {token.symbol} (シールド残高: {isShieldedLoading ? '読み込み中...' : jpycShieldedBalance})
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

              <div className="bg-black/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">使用可能残高:</span>
                  <span className="text-white font-semibold">
                    {isShieldedLoading ? (
                      <span className="text-gray-400">読み込み中...</span>
                    ) : shieldedError ? (
                      <span className="text-red-400">エラー</span>
                    ) : (
                      `${selectedTokenBalance} ${selectedToken}`
                    )}
                  </span>
                </div>
                {selectedTokenData && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400">パブリック残高:</span>
                    <span className="text-white">
                      {selectedTokenData.formatted} {selectedToken}
                    </span>
                  </div>
                )}
                {!hasBalance && !isShieldedLoading && (
                  <div className="mt-2 p-2 bg-yellow-900/20 border border-yellow-700/30 rounded text-yellow-400 text-sm">
                    シールド残高がありません。まず資金をシールドしてください。
                  </div>
                )}
                {amount && parseFloat(amount) > parseFloat(jpycShieldedBalanceRaw) && (
                  <div className="mt-2 p-2 bg-red-900/20 border border-red-700/30 rounded text-red-400 text-sm">
                    残高が不足しています（最大: {selectedTokenBalance} {selectedToken}）
                  </div>
                )}
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="text-yellow-200 text-sm">
                    <p className="font-medium mb-1">プライバシー保護について</p>
                    <p className="mb-2">この送金は zk-SNARKs により完全に匿名化されます。送金者、受信者、金額の情報がブロックチェーン上で秘匿されます。</p>
                    <p className="text-xs text-yellow-300">
                      ※ プライベート送金は「シールド残高」から行われます。パブリック残高（ウォレット残高）は変更されません。
                      パブリック残高を変更するには、シールド/アンシールド操作を使用してください。
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canSend || isShieldedLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>
                  {isShieldedLoading ? '残高確認中...' : 
                   !hasBalance ? 'シールド残高がありません' :
                   !canSend ? '内容を確認' : '内容を確認'}
                </span>
                {!isShieldedLoading && canSend && <ArrowRight className="h-5 w-5" />}
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
                <p className="text-gray-400 mb-4">プライベート送金が正常に完了しました。</p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm text-blue-200">
                  <p className="font-medium mb-1">💡 残高について</p>
                  <p>
                    プライベート送金では「シールド残高」から送金されます。
                    あなたのパブリック残高（ウォレット残高）は変更されません。
                    これはRailgunのプライバシー保護機能の正常な動作です。
                  </p>
                </div>
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
