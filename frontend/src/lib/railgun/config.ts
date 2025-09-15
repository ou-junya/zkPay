// Railgun設定定数
export const RAILGUN_CONFIG = {
  // ネットワーク設定
  NETWORK_NAME: 'ethereum',
  CHAIN_ID: 1,
  
  // Railgun Contract アドレス（メインネット）
  RAILGUN_SMART_WALLET_ADDRESS: '0xFA7093CDD9EE6932B4eb2c9e1cde7CE00B1FA4b9',
  
  // JPYC Token設定
  JPYC_TOKEN: {
    address: '0x276C216D241856199A83bf27b2286659e5b877D3',
    tokenType: 0, // ERC20
    tokenSubID: '0x00',
    decimals: 18,
    symbol: 'JPYC',
    name: 'JPY Coin',
  },
  
  // Railgun Engine設定
  ENGINE_CONFIG: {
    shouldDebug: process.env.NODE_ENV === 'development',
    useNativeArtifacts: true,
    skipMerkletreeScans: false,
    pollingInterval: 15000, // 15秒
  },
  
  // デフォルトウォレット設定
  DEFAULT_WALLET_CONFIG: {
    creationBlockNumbers: {
      [1]: 15725700, // Ethereum Mainnet
    },
  },
} as const;

// ネットワーク別設定
export const NETWORK_CONFIGS = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrls: [
      'https://eth-mainnet.alchemyapi.io/v2/your-api-key',
      'https://mainnet.infura.io/v3/your-project-id',
    ],
    railgunContractAddress: '0xFA7093CDD9EE6932B4eb2c9e1cde7CE00B1FA4b9',
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrls: [
      'https://polygon-mainnet.alchemyapi.io/v2/your-api-key',
      'https://polygon-rpc.com',
    ],
    railgunContractAddress: '0x92C9453C43D5aaa685b35F56C2d6BA37Cf87764A',
  },
} as const;

// Railgun token type enum
export enum RailgunTokenType {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2,
}

// Railgun transaction type enum
export enum RailgunTransactionType {
  SHIELD = 'shield',
  UNSHIELD = 'unshield',
  TRANSFER = 'transfer',
}

// エラータイプ
export class RailgunError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'RailgunError';
  }
}

// ユーティリティ関数
export const formatRailgunBalance = (balance: string, decimals: number = 18): string => {
  const numBalance = Number(balance) / Math.pow(10, decimals);
  return numBalance.toLocaleString('ja-JP', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const parseRailgunTokenAddress = (tokenAddress: string, tokenType: RailgunTokenType, tokenSubID: string = '0x00') => {
  return {
    tokenAddress: tokenAddress.toLowerCase(),
    tokenType,
    tokenSubID,
  };
};
