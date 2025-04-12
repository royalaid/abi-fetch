import { getChainByChainId, getChainByName, chains, type ChainConfig } from './config/chains';
import { AbiService } from './services/abiService';

// Get API key from environment variable
const API_KEY = process.env.API_KEY || '';

if (!API_KEY) {
  console.error('Error: API_KEY environment variable is not set.');
  console.error('Please set your API key using: export API_KEY=your_api_key');
  process.exit(1);
}

const abiService = new AbiService(API_KEY);

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    printUsage();
    process.exit(1);
  }
  
  // We've already checked args.length >= 2, so these are safe to use
  const chainIdentifier = args[0]!;
  const address = args[1]!;
  
  // Validate address format
  if (!isValidAddress(address)) {
    console.error('Error: Invalid Ethereum address format');
    process.exit(1);
  }
  
  // Get chain configuration
  let chain: ChainConfig | undefined;
  
  // Check if chain identifier is a number (chain ID) or string (chain name)
  if (/^\d+$/.test(chainIdentifier)) {
    chain = getChainByChainId(parseInt(chainIdentifier, 10));
  } else {
    chain = getChainByName(chainIdentifier);
  }
  
  if (!chain) {
    console.error(`Error: Chain not found: ${chainIdentifier}`);
    console.error('Available chains:');
    printAvailableChains();
    process.exit(1);
  }
  
  try {
    console.log(`Fetching ABI for ${address} on ${chain.name}...`);
    const abi = await abiService.fetchAbi(chain, address);
    console.log('ABI:');
    console.log(abi);
  } catch (error) {
    console.error('Error fetching ABI:', error);
    process.exit(1);
  }
}

function isValidAddress(address: string): boolean {
  // Simple Ethereum address validation (0x followed by 40 hex characters)
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function printUsage() {
  console.log('Usage: bun run src/index.ts <chain_id_or_name> <contract_address>');
  console.log('Example: bun run src/index.ts 1 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
  console.log('Example: bun run src/index.ts "Ethereum Mainnet" 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
  console.log('\nAvailable chains:');
  printAvailableChains();
}

function printAvailableChains() {
  chains.forEach((chain: ChainConfig) => {
    console.log(`  ${chain.chainId}: ${chain.name}`);
  });
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 