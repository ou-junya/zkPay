'use client';

import { Shield, Zap, Eye, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative z-10 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              プライベートな
              <span className="text-purple-400"> 暗号決済</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              zk-SNARKsとRAILGUN技術を活用した、完全にプライベートで検証可能な暗号通貨決済システム。
              あなたの取引履歴とバランスを秘匿しながら、安全な送金を実現します。
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/wallet"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 flex items-center space-x-2"
              >
                <span>ウォレット</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                詳細を見る <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">特徴</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            次世代のプライベート決済
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <Lock className="h-5 w-5 flex-none text-purple-400" />
                完全なプライバシー
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">
                  zk-SNARKs技術により、取引金額、送信者、受信者の情報を完全に秘匿。
                  ブロックチェーン上では検証可能でありながらプライベートな取引を実現。
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <Zap className="h-5 w-5 flex-none text-purple-400" />
                高速処理
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">
                  RAILGUN プロトコルによる効率的な証明生成と検証。
                  複数の取引をバッチ処理することで、高速かつ低コストな決済を提供。
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <Eye className="h-5 w-5 flex-none text-purple-400" />
                透明性と検証
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">
                  オープンソースのスマートコントラクト。
                  ゼロ知識証明により、プライバシーを保護しながら取引の妥当性を検証可能。
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
