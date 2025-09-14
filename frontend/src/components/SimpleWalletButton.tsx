'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function SimpleWalletButton() {
  return (
    <div className="wallet-connect-button">
      <style jsx>{`
        .wallet-connect-button :global(button) {
          background: rgb(147 51 234) !important;
          color: white !important;
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
          padding: 0.5rem 1rem !important;
          font-size: 0.875rem !important;
          transition: background-color 0.2s !important;
        }
        
        .wallet-connect-button :global(button:hover) {
          background: rgb(126 34 206) !important;
        }
        
        .wallet-connect-button :global([data-testid="connect-button"]) {
          background: rgb(147 51 234) !important;
        }
      `}</style>
      <ConnectButton />
    </div>
  );
}
