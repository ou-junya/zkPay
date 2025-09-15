'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { railgunWalletService } from '@/lib/railgun/walletService';
import { RAILGUN_CONFIG } from '@/lib/railgun/config';
import jpycAbi from '@/lib/contracts/jpyc-abi.json';
import railgunAbi from '@/lib/contracts/railgun-smart-wallet-abi.json';

export function useShieldTokens() {
  const { address } = useAccount();
  const [isShielding, setIsShielding] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastShieldResult, setLastShieldResult] = useState<any>(null);
  const [approvalCompleted, setApprovalCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'approving' | 'approved' | 'shielding' | 'completed'>('idle');
  const [currentAmount, setCurrentAmount] = useState<string>('0');

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // 承認完了の監視
  useEffect(() => {
    if (isConfirmed && hash && isApproving) {
      setApprovalCompleted(true);
      setIsApproving(false);
      setCurrentStep('approved');
      console.log('Approval transaction confirmed:', hash);
    }
  }, [isConfirmed, hash, isApproving]);

  const shieldJPYC = async (amount: string) => {
    if (!address) {
      throw new Error('ウォレットが接続されていません');
    }

    if (!approvalCompleted) {
      throw new Error('承認が完了していません');
    }

    setIsShielding(true);
    setCurrentStep('shielding');
    setCurrentAmount(String(amount));
    setError(null);

    try {
      const amountWei = parseUnits(amount, RAILGUN_CONFIG.JPYC_TOKEN.decimals);
      
      console.log('Starting shield operation for amount:', amount, 'JPYC');
      console.log('Amount in wei:', amountWei.toString());

      // Railgunコントラクトのshield関数を呼び出し
      writeContract({
        address: RAILGUN_CONFIG.RAILGUN_SMART_WALLET_ADDRESS as `0x${string}`,
        abi: railgunAbi,
        functionName: 'shield',
        args: [RAILGUN_CONFIG.JPYC_TOKEN.address, amountWei],
      });

      // トランザクションハッシュを待つ
      // 実際の処理はuseWaitForTransactionReceiptで監視される

    } catch (err: any) {
      const errorMessage = err.message || 'シールド操作に失敗しました';
      setError(errorMessage);
      console.error('Shield operation failed:', err);
      setCurrentStep('idle');
      setIsShielding(false);
      throw new Error(errorMessage);
    }
  };

  // 依存配列の安定化のためにcurrentAmountを文字列として保証
  const stableCurrentAmount = useMemo(() => String(currentAmount), [currentAmount]);

  // シールドトランザクションの完了監視
  useEffect(() => {
    if (isConfirmed && hash && isShielding && currentStep === 'shielding') {
      // シールド成功時の処理
      setLastShieldResult({ txHash: hash, amount: stableCurrentAmount });
      setIsShielding(false);
      setCurrentStep('completed');
      setApprovalCompleted(false); // 次回のために状態をリセット
      console.log('Shield transaction confirmed:', hash);
      
      // Railgun Walletサービスで残高を更新
      const amountWei = parseUnits(stableCurrentAmount, RAILGUN_CONFIG.JPYC_TOKEN.decimals);
      railgunWalletService.shieldTokens(
        RAILGUN_CONFIG.JPYC_TOKEN.address,
        amountWei.toString(),
        address!
      ).catch(console.error);
    }
  }, [isConfirmed, hash, isShielding, currentStep, stableCurrentAmount, address]);

  const approveJPYC = async (amount: string) => {
    if (!address) {
      throw new Error('ウォレットが接続されていません');
    }

    setIsApproving(true);
    setCurrentStep('approving');
    setError(null);
    setApprovalCompleted(false);

    try {
      const amountWei = parseUnits(amount, RAILGUN_CONFIG.JPYC_TOKEN.decimals);
      
      console.log('Starting approval for amount:', amount, 'JPYC');
      console.log('Approving to Railgun contract:', RAILGUN_CONFIG.RAILGUN_SMART_WALLET_ADDRESS);
      
      // JPYCトークンの承認
      writeContract({
        address: RAILGUN_CONFIG.JPYC_TOKEN.address as `0x${string}`,
        abi: jpycAbi,
        functionName: 'approve',
        args: [RAILGUN_CONFIG.RAILGUN_SMART_WALLET_ADDRESS, amountWei],
      });

    } catch (err: any) {
      const errorMessage = err.message || '承認に失敗しました';
      setError(errorMessage);
      setIsApproving(false);
      setCurrentStep('idle');
      throw new Error(errorMessage);
    }
  };

  return {
    shieldJPYC,
    approveJPYC,
    isShielding,
    isApproving,
    isConfirming,
    approvalCompleted,
    currentStep,
    error,
    lastShieldResult,
    approvalHash: hash,
    clearError: () => setError(null),
  };
}

export function useUnshieldTokens() {
  const { address } = useAccount();
  const [isUnshielding, setIsUnshielding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUnshieldResult, setLastUnshieldResult] = useState<any>(null);

  const unshieldJPYC = async (amount: string, recipientAddress?: string) => {
    if (!address) {
      throw new Error('ウォレットが接続されていません');
    }

    setIsUnshielding(true);
    setError(null);

    try {
      const amountWei = parseUnits(amount, RAILGUN_CONFIG.JPYC_TOKEN.decimals);
      const recipient = recipientAddress || address;
      
      console.log('Starting unshield operation for amount:', amount, 'JPYC');

      const unshieldResult = await railgunWalletService.unshieldTokens(
        RAILGUN_CONFIG.JPYC_TOKEN.address,
        amountWei.toString(),
        recipient
      );

      setLastUnshieldResult(unshieldResult);
      console.log('Unshield operation successful:', unshieldResult);

      return unshieldResult;

    } catch (err: any) {
      const errorMessage = err.message || 'アンシールド操作に失敗しました';
      setError(errorMessage);
      console.error('Unshield operation failed:', err);
      throw new Error(errorMessage);
    } finally {
      setIsUnshielding(false);
    }
  };

  return {
    unshieldJPYC,
    isUnshielding,
    error,
    lastUnshieldResult,
    clearError: () => setError(null),
  };
}
