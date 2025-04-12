export interface ChainConfig {
  name: string;
  explorer: string;
  chainId: number;
  apiUrl: string;
}

export const chains: ChainConfig[] = [
  {
    name: "Ethereum Mainnet",
    explorer: "Etherscan",
    chainId: 1,
    apiUrl: "https://api.etherscan.io"
  },
  {
    name: "Goerli Testnet",
    explorer: "Goerli Etherscan",
    chainId: 5,
    apiUrl: "https://api-goerli.etherscan.io"
  },
  {
    name: "Sepolia Testnet",
    explorer: "Sepolia Etherscan",
    chainId: 11155111,
    apiUrl: "https://api-sepolia.etherscan.io"
  },
  {
    name: "Holesky Testnet",
    explorer: "Holesky Etherscan",
    chainId: 17000,
    apiUrl: "https://api-holesky.etherscan.io"
  },
  {
    name: "BNB Smart Chain",
    explorer: "BscScan",
    chainId: 56,
    apiUrl: "https://api.bscscan.com"
  },
  {
    name: "BNB Testnet",
    explorer: "Testnet BscScan",
    chainId: 97,
    apiUrl: "https://api-testnet.bscscan.com"
  },
  {
    name: "opBNB",
    explorer: "opBNB BscScan",
    chainId: 204,
    apiUrl: "https://api-opbnb.bscscan.com"
  },
  {
    name: "opBNB Testnet",
    explorer: "Testnet opBNB BscScan",
    chainId: 5611,
    apiUrl: "https://api-opbnb-testnet.bscscan.com"
  },
  {
    name: "Optimism",
    explorer: "Optimistic Etherscan",
    chainId: 10,
    apiUrl: "https://api-optimistic.etherscan.io"
  },
  {
    name: "Optimism Goerli",
    explorer: "Goerli Optimistic Etherscan",
    chainId: 420,
    apiUrl: "https://api-goerli-optimistic.etherscan.io"
  },
  {
    name: "Optimism Sepolia",
    explorer: "Sepolia Optimistic Etherscan",
    chainId: 11155420,
    apiUrl: "https://api-sepolia-optimistic.etherscan.io"
  },
  {
    name: "Arbitrum One",
    explorer: "Arbiscan",
    chainId: 42161,
    apiUrl: "https://api.arbiscan.io"
  },
  {
    name: "Arbitrum Sepolia",
    explorer: "Sepolia Arbiscan",
    chainId: 421614,
    apiUrl: "https://api-sepolia.arbiscan.io"
  },
  {
    name: "Arbitrum Nova",
    explorer: "Nova Arbiscan",
    chainId: 42170,
    apiUrl: "https://api-nova.arbiscan.io"
  },
  {
    name: "Base",
    explorer: "BaseScan",
    chainId: 8453,
    apiUrl: "https://api.basescan.org"
  },
  {
    name: "Base Sepolia",
    explorer: "Sepolia BaseScan",
    chainId: 84532,
    apiUrl: "https://api-sepolia.basescan.org"
  },
  {
    name: "Linea",
    explorer: "LineaScan",
    chainId: 59144,
    apiUrl: "https://api.lineascan.build"
  },
  {
    name: "Linea Testnet",
    explorer: "Testnet LineaScan",
    chainId: 59140,
    apiUrl: "https://api-testnet.lineascan.build"
  },
  {
    name: "Scroll",
    explorer: "ScrollScan",
    chainId: 534352,
    apiUrl: "https://api.scrollscan.com"
  },
  {
    name: "Scroll Sepolia",
    explorer: "Testnet ScrollScan",
    chainId: 534351,
    apiUrl: "https://api-sepolia.scrollscan.com"
  },
  {
    name: "Polygon",
    explorer: "PolygonScan",
    chainId: 137,
    apiUrl: "https://api.polygonscan.com"
  },
  {
    name: "Polygon zkEVM",
    explorer: "zkEVM PolygonScan",
    chainId: 1101,
    apiUrl: "https://api-zkevm.polygonscan.com"
  },
  {
    name: "Fantom",
    explorer: "FTMScan",
    chainId: 250,
    apiUrl: "https://api.ftmscan.com"
  },
  {
    name: "Fantom Testnet",
    explorer: "Testnet FTMScan",
    chainId: 4002,
    apiUrl: "https://api-testnet.ftmscan.com"
  },
  {
    name: "Moonbeam",
    explorer: "Moonbeam Moonscan",
    chainId: 1284,
    apiUrl: "https://api-moonbeam.moonscan.io"
  },
  {
    name: "Moonbase Alpha",
    explorer: "Moonbase Moonscan",
    chainId: 1287,
    apiUrl: "https://api-moonbase.moonscan.io"
  },
  {
    name: "Moonriver",
    explorer: "Moonriver Moonscan",
    chainId: 1285,
    apiUrl: "https://api-moonriver.moonscan.io"
  },
  {
    name: "BitTorrent Chain",
    explorer: "BTTCScan",
    chainId: 199,
    apiUrl: "https://api.bttcscan.com"
  },
  {
    name: "BitTorrent Testnet",
    explorer: "Donau BTTCScan",
    chainId: 1028,
    apiUrl: "https://api-testnet.bttcscan.com"
  },
  {
    name: "Celo",
    explorer: "CeloScan",
    chainId: 42220,
    apiUrl: "https://api.celoscan.io"
  },
  {
    name: "Celo Alfajores",
    explorer: "Alfajores CeloScan",
    chainId: 44787,
    apiUrl: "https://api-alfajores.celoscan.io"
  },
  {
    name: "Gnosis",
    explorer: "GnosisScan",
    chainId: 100,
    apiUrl: "https://api.gnosisscan.io"
  },
  {
    name: "Wemix",
    explorer: "WemixScan",
    chainId: 1111,
    apiUrl: "https://api.wemixscan.com"
  },
  {
    name: "Wemix Testnet",
    explorer: "Testnet WemixScan",
    chainId: 1112,
    apiUrl: "https://api-testnet.wemixscan.com"
  },
  {
    name: "Kroma",
    explorer: "KromaScan",
    chainId: 255,
    apiUrl: "https://api.kromascan.com"
  },
  {
    name: "Kroma Testnet",
    explorer: "Testnet KromaScan",
    chainId: 2358,
    apiUrl: "https://api-sepolia.kromascan.com"
  },
  {
    name: "Frax",
    explorer: "Fraxscan",
    chainId: 252,
    apiUrl: "https://api.fraxscan.com"
  },
  {
    name: "Frax Testnet",
    explorer: "Testnet Fraxscan",
    chainId: 2522,
    apiUrl: "https://api-testnet.fraxscan.com"
  },
  {
    name: "Avalanche",
    explorer: "SnowScan",
    chainId: 43114,
    apiUrl: "https://api.snowscan.xyz"
  },
  {
    name: "Avalanche Fuji",
    explorer: "Fuji SnowScan",
    chainId: 43113,
    apiUrl: "https://api-testnet.snowscan.xyz"
  },
  {
    name: "Blast",
    explorer: "BlastScan",
    chainId: 81457,
    apiUrl: "https://api.blastscan.io"
  },
  {
    name: "Blast Testnet",
    explorer: "Testnet BlastScan",
    chainId: 23888,
    apiUrl: "https://api-testnet.blastscan.io"
  },
  {
    name: "Unichain Testnet",
    explorer: "Testnet Unichain",
    chainId: 1301,
    apiUrl: "https://api-testnet.uniscan.org"
  }
];

export function getChainByChainId(chainId: number): ChainConfig | undefined {
  return chains.find(chain => chain.chainId === chainId);
}

/**
 * Get chain configuration by chain name or ID
 * @param chainIdentifier The name or ID of the chain to get configuration for
 * @returns ChainConfig | undefined
 */
export function getChainConfig(chainIdentifier: string): ChainConfig | undefined {
  // Try to parse as chain ID first
  const chainId = parseInt(chainIdentifier, 10);
  if (!isNaN(chainId)) {
    return chains.find(chain => chain.chainId === chainId);
  }
  
  // If not a valid number, try matching by name
  return chains.find(chain => 
    chain.name.toLowerCase() === chainIdentifier.toLowerCase() ||
    chain.name.toLowerCase().replace(/\s+/g, '') === chainIdentifier.toLowerCase()
  );
} 