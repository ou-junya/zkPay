'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WalletConnectButton } from './WalletConnectButton';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`relative z-10 flex items-center justify-between p-6 lg:px-8 ${className}`}>
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/jpyc.svg" alt="JPYC" width={32} height={32} className="text-purple-400" />
        <span className="text-2xl font-bold text-white">zkPay</span>
      </Link>
      
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex space-x-6">
          <Link href="/wallet" className="text-gray-300 hover:text-white transition-colors">
            Wallet
          </Link>
          <Link href="/send" className="text-gray-300 hover:text-white transition-colors">
            Send
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            Abount
          </Link>
        </div>
        <WalletConnectButton />
      </div>
    </nav>
  );
}
