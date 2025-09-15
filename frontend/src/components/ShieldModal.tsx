'use client';

import { useState, useEffect, useCallback } from 'react';
import { Shield, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useShieldTokens } from '@/hooks/useShieldOperations';
import { useTokenBalances } from '@/hooks/useTokenBalances';

interface ShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ShieldModal({ isOpen, onClose, onSuccess }: ShieldModalProps) {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'input' | 'approve' | 'shield' | 'success'>('input');
  
  const { isConnected } = useAccount();
  const { balances, isLoading: balancesLoading } = useTokenBalances();
  const { 
    shieldJPYC, 
    approveJPYC, 
    isShielding, 
    isApproving,
    isConfirming,
    approvalCompleted,
    currentStep,
    error, 
    clearError 
  } = useShieldTokens();

  const jpycBalance = balances.find(token => token.symbol === 'JPYC');
  // 生の残高データから正しい金額を計算（フォーマットされた文字列は使わない）
  const maxAmount = jpycBalance ? Number(jpycBalance.balance) / Math.pow(10, 18) : 0;

  console.log('ShieldModal - balances:', balances);
  console.log('ShieldModal - jpycBalance:', jpycBalance);
  console.log('ShieldModal - maxAmount:', maxAmount);
  console.log('ShieldModal - isConnected:', isConnected);
  console.log('ShieldModal - approvalCompleted:', approvalCompleted);
  console.log('ShieldModal - currentStep:', currentStep);
  console.log('ShieldModal - step:', step);

  const handleShield = useCallback(async () => {
    try {
      clearError();
      await shieldJPYC(amount);
      // 成功処理はuseShieldTokensのuseEffectで処理される
    } catch (err) {
      console.error('Shield failed:', err);
      setStep('input');
    }
  }, [amount, clearError, shieldJPYC]);

  // 承認が完了したらシールドステップに進む
  useEffect(() => {
    if (approvalCompleted && step === 'approve') {
      console.log('Approval completed, moving to shield step');
      setStep('shield');
      // 自動的にシールド処理を開始
      handleShield();
    }
  }, [approvalCompleted, step, handleShield]);

  // シールド完了の監視
  useEffect(() => {
    if (currentStep === 'completed' && step === 'shield') {
      console.log('Shield completed successfully');
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep('input');
        setAmount('');
      }, 3000);
    }
  }, [currentStep, step, onSuccess, onClose]);

  if (!isOpen) return null;

  const handleMaxClick = () => {
    if (jpycBalance && maxAmount > 0) {
      // 小数点以下2桁まで表示して設定
      const formattedMax = maxAmount.toFixed(2);
      setAmount(formattedMax);
    }
  };

  const handleApprove = async () => {
    try {
      clearError();
      setStep('approve');
      await approveJPYC(amount);
      // 承認完了の監視はuseEffectで行う
    } catch (err) {
      console.error('Approval failed:', err);
      setStep('input');
    }
  };

  const handleClose = () => {
    if (!isShielding && !isApproving && !isConfirming) {
      onClose();
      setStep('input');
      setAmount('');
      clearError();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <span>シールド操作</span>
          </h2>
          <button
            onClick={handleClose}
            disabled={isShielding || isApproving || isConfirming}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {step === 'input' && (
          <div>
            <p className="text-gray-300 text-sm mb-4">
              パブリック残高からプライベート残高に資金を移動します。
            </p>
            
            <div className="bg-slate-700 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">パブリック残高</span>
                <span className="text-white font-semibold">
                  {balancesLoading ? (
                    <span className="text-gray-400">読み込み中...</span>
                  ) : jpycBalance ? (
                    `${jpycBalance.formatted} JPYC`
                  ) : (
                    <span className="text-gray-400">0.00 JPYC</span>
                  )}
                </span>
              </div>
              {maxAmount > 0 && (
                <div className="text-xs text-gray-500">
                  利用可能: {maxAmount.toLocaleString('ja-JP', { maximumFractionDigits: 2 })} JPYC
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  シールドする金額
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-700 text-white rounded-lg p-3 pr-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    max={maxAmount}
                    min="0"
                    step="0.01"
                    disabled={balancesLoading || maxAmount === 0}
                  />
                  <button
                    onClick={handleMaxClick}
                    disabled={balancesLoading || maxAmount === 0}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    MAX
                  </button>
                </div>
                {amount && parseFloat(amount) > maxAmount && maxAmount > 0 && (
                  <p className="text-red-400 text-sm mt-1">
                    残高が不足しています（最大: {maxAmount.toFixed(2)} JPYC）
                  </p>
                )}
                {amount && parseFloat(amount) <= 0 && (
                  <p className="text-red-400 text-sm mt-1">
                    金額は0より大きい必要があります
                  </p>
                )}
                {maxAmount === 0 && !balancesLoading && (
                  <p className="text-yellow-400 text-sm mt-1">
                    シールドするJPYCの残高がありません
                  </p>
                )}
                {!isConnected && (
                  <p className="text-yellow-400 text-sm mt-1">
                    ウォレットを接続してください
                  </p>
                )}
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-600 p-2 rounded-full">
                    <ArrowRight className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">プライベート残高に移動</p>
                    <p className="text-gray-400 text-sm">zk-SNARKsで保護されます</p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-3 mt-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleApprove}
                disabled={
                  !isConnected ||
                  !amount || 
                  parseFloat(amount) <= 0 || 
                  parseFloat(amount) > maxAmount || 
                  maxAmount === 0 ||
                  balancesLoading ||
                  isShielding ||
                  isApproving ||
                  isConfirming
                }
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {!isConnected ? 'ウォレットを接続' : 
                 balancesLoading ? '残高確認中...' : 
                 isApproving || isConfirming ? '処理中...' :
                 'シールド開始'}
              </button>
            </div>
          </div>
        )}

        {step === 'approve' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h3 className="text-white font-semibold mb-2">
              {isConfirming ? 'トランザクション確認中...' : '承認中...'}
            </h3>
            <p className="text-gray-400 text-sm">
              {isConfirming 
                ? 'ブロックチェーンでの確認を待っています'
                : 'ウォレットでトランザクションを承認してください'
              }
            </p>
          </div>
        )}

        {step === 'shield' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h3 className="text-white font-semibold mb-2">
              {isConfirming ? 'トランザクション確認中...' : 'シールド処理中...'}
            </h3>
            <p className="text-gray-400 text-sm">
              {isConfirming 
                ? 'ブロックチェーンでシールドトランザクションの確認を待っています'
                : `${amount} JPYC をRailgunコントラクトに送金しています`
              }
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="bg-green-900 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">シールド完了！</h3>
            <p className="text-gray-400 text-sm">
              {amount} JPYC がRailgunコントラクトに正常に送金され、プライベート残高に反映されました
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
