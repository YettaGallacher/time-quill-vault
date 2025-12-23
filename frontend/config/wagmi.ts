import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { defineChain } from 'viem';
import { http } from 'wagmi';

// WalletConnect projectId
// Note: Using a placeholder projectId will cause API warnings but won't affect wallet connection functionality
// To get a real projectId (optional for local development), visit https://cloud.walletconnect.com
// Then set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in your .env.local file
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'e08e99d213c331aa0fd00f625de06e66';

// Define localhost chain with chainId 31337 to match Hardhat
const localhostChain = defineChain({
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
});

export const config = getDefaultConfig({
  appName: 'Inheritance Rule Check',
  projectId,
  chains: [sepolia, localhostChain],
  ssr: false,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/'),
    [localhostChain.id]: http('http://127.0.0.1:8545'),
  },
});

// Custom RPC URLs can be set via environment variables:
// NEXT_PUBLIC_SEPOLIA_RPC_URL - Custom Sepolia RPC endpoint
// NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID - WalletConnect project ID

