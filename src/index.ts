import { getChainConfig } from "./config/chains";
import { validateAddress } from "./utils/validation";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ETHERSCAN_API_KEY) {
  console.error("Error: ETHERSCAN_API_KEY environment variable is required");
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("Usage: npm start <chain> <address>");
  console.error("Example: npm start ethereum 0x1234...");
  process.exit(1);
}

const [chainName, address] = args as [string, string];

if (!validateAddress(address)) {
  console.error("Error: Invalid Ethereum address format");
  console.error("Address must start with 0x and be 42 characters long");
  process.exit(1);
}

const chainConfig = getChainConfig(chainName);
if (!chainConfig) {
  console.error(`Error: Unsupported chain "${chainName}"`);
  console.error("Please use either:");
  console.error('1. Chain ID (e.g., "1" for Ethereum Mainnet)');
  console.error('2. Chain name (e.g., "Ethereum Mainnet" or "ethereummainnet")');
  process.exit(1);
}

// Since we've validated chainConfig exists above, we can safely assert its type
const config = chainConfig as NonNullable<typeof chainConfig>;

interface EtherscanResponse {
  status: string;
  message: string;
  result: string;
}

async function fetchABI() {
  try {
    // Debug logging for API key (masked)
    const maskedKey = ETHERSCAN_API_KEY ? `${ETHERSCAN_API_KEY.slice(0, 4)}...${ETHERSCAN_API_KEY.slice(-4)}` : "undefined";
    console.log("Debug: API Key (masked):", maskedKey);
    console.log("Debug: API Key length:", ETHERSCAN_API_KEY?.length || 0);

    console.log(`Fetching ABI from: ${config.apiUrl}/api?module=contract&action=getabi&address=${address}`);
    const response = await fetch(`${config.apiUrl}/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`);
    const data = (await response.json()) as EtherscanResponse;

    if (data.status === "0") {
      console.error("API Error Details:");
      console.error("Status:", data.status);
      console.error("Message:", data.message);
      console.error("Result:", data.result);
      throw new Error(`API Error: ${data.message} - ${data.result}`);
    }

    try {
      // Try to parse the response
      const parsedData = JSON.parse(data.result);

      // If we have a contract name, display it
      if (parsedData.ContractName) {
        console.log("\nContract Name:", parsedData.ContractName);
      }

      // Try to parse and pretty print the ABI
      const abi = Array.isArray(parsedData) ? parsedData : parsedData.ABI || parsedData;
      console.log("\nABI:");
      console.log(JSON.stringify(abi, null, 2));
    } catch (e) {
      // If parsing fails, output the raw result
      console.log("\nRaw ABI:");
      console.log(data.result);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching ABI:");
      console.error("Message:", error.message);
      if (error.cause) {
        console.error("Cause:", error.cause);
      }
      console.error("Stack:", error.stack);
    } else {
      console.error("Unknown error:", error);
    }
    process.exit(1);
  }
}

fetchABI();
