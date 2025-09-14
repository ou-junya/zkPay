'use client';

import { Shield, Lock, Zap, Code, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">zkPay</span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/wallet" className="text-gray-300 hover:text-white transition-colors">
            ウォレット
          </Link>
          <Link href="/send" className="text-gray-300 hover:text-white transition-colors">
            送金
          </Link>
          <Link href="/about" className="text-purple-400 font-semibold">
            について
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">zkPayについて</h1>
          <p className="text-xl text-gray-300">
            ゼロ知識証明技術を活用した次世代プライベート決済システム
          </p>
        </div>

        {/* Technology Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">技術概要</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">zk-SNARKs</h3>
              </div>
              <p className="text-gray-300">
                ゼロ知識簡潔非対話的知識論証（zk-SNARKs）により、取引の詳細を秘匿しながら、
                その妥当性を数学的に証明します。送金者、受信者、金額の情報が完全に保護されます。
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">RAILGUN Protocol</h3>
              </div>
              <p className="text-gray-300">
                RAILGUNプロトコルを基盤として、Ethereumおよび互換チェーン上で
                プライベート取引を実現。既存のDeFiエコシステムとの互換性を保ちながら、
                プライバシーを提供します。
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">主な機能</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">完全なプライバシー保護</h3>
                <p className="text-gray-300">
                  取引金額、送信者アドレス、受信者アドレスの全てがブロックチェーン上で秘匿されます。
                  第三者があなたの取引履歴や残高を追跡することは不可能です。
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">シールドプール</h3>
                <p className="text-gray-300">
                  通常のERC-20トークンをプライベートな「シールドプール」に預けることで、
                  匿名性を獲得。いつでもアンシールドして通常の取引に戻すことも可能です。
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">高速・低コスト</h3>
                <p className="text-gray-300">
                  効率的な証明生成により、従来のプライベート取引ソリューションと比較して
                  大幅に高速化。ガス費用も最適化されています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">セキュリティ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">監査済みコントラクト</h3>
              <p className="text-gray-300 mb-4">
                すべてのスマートコントラクトは複数のセキュリティ会社による
                厳格な監査を受けています。
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• トレイル・オブ・ビッツ監査済み</li>
                <li>• Halborn監査済み</li>
                <li>• オープンソース実装</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">暗号学的証明</h3>
              <p className="text-gray-300 mb-4">
                数学的に証明可能なセキュリティモデルを採用。
                プライバシーと検証可能性を両立します。
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• グロス16証明システム</li>
                <li>• 信頼できるセットアップ</li>
                <li>• 量子耐性アルゴリズム</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">法的コンプライアンス</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              zkPayは、プライバシーの権利を尊重しながら、適用される法的要件に準拠するよう設計されています。
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                <strong>重要:</strong> 本システムは合法的な目的でのみ使用してください。
                マネーロンダリングやその他の違法行為には使用しないでください。
                各地域の法律および規制を遵守する責任はユーザーにあります。
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">リンク・リソース</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <a
                href="https://github.com/Railgun-Community"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>RAILGUN GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://docs.railgun.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Code className="h-5 w-5" />
                <span>技術ドキュメント</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              <a
                href="https://railgun.org/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Shield className="h-5 w-5" />
                <span>RAILGUN 公式サイト</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://www.jpyc.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Zap className="h-5 w-5" />
                <span>JPYC について</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center">
          <Link
            href="/wallet"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            <Shield className="h-5 w-5" />
            <span>プライベートウォレットを開始</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
