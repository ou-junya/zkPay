# ウォレット接続の設定

zkPayアプリでウォレット接続を有効にするには、以下の手順を実行してください：

## 1. WalletConnect Project IDの取得

1. [Reown Cloud](https://cloud.reown.com) (旧WalletConnect Cloud) にアクセス
2. アカウントを作成またはログイン
3. 新しいプロジェクトを作成
4. プロジェクトIDをコピー

## 2. 環境変数の設定

`.env.local` ファイルの `NEXT_PUBLIC_PROJECT_ID` を実際のプロジェクトIDに置き換えてください：

```env
NEXT_PUBLIC_PROJECT_ID=your-actual-project-id-here
```

## 3. 対応ウォレット

現在、以下のウォレットに対応しています：
- MetaMask
- WalletConnect対応ウォレット
- Coinbase Wallet
- Rainbow Wallet
- その他のEIP-1193対応ウォレット

## 4. 対応ネットワーク

以下のネットワークがサポートされています：
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base

## 5. 機能

- ✅ ウォレット接続・切断
- ✅ ネットワーク切り替え
- ✅ アカウント表示
- ✅ 残高表示
- ✅ レスポンシブデザイン

## 開発サーバーの起動

```bash
cd frontend
npm run dev
```

サーバーは http://localhost:3001 で起動します。
