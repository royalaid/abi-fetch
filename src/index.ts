import { getChainConfig, chains } from "./config/chains";
import type { ChainConfig } from "./config/chains";
import { validateAddress } from "./utils/validation";
import logger, { LogLevel } from "./utils/logger";

// Configure logger
logger.setPrefix("ABI-Fetch");
logger.setLevel(LogLevel.INFO);

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ETHERSCAN_API_KEY) {
  logger.error("ETHERSCAN_API_KEY environment variable is required");
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  logger.error("Usage: npm start <address>");
  logger.error("Example: npm start 0x1234...");
  process.exit(1);
}

const address = args[0] || "";

if (!validateAddress(address)) {
  logger.error("Invalid Ethereum address format");
  logger.error("Address must start with 0x and be 42 characters long");
  process.exit(1);
}

interface EtherscanResponse {
  status: string;
  message: string;
  result: string;
}

interface ChainResult {
  chainName: string;
  contractName?: string;
  abi?: string;
  error?: string;
}

async function fetchABIForChain(chain: ChainConfig): Promise<ChainResult> {
  try {
    logger.debug(`Checking ${chain.name}...`);
    const response = await fetch(`${chain.apiUrl}/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`);
    const data = (await response.json()) as EtherscanResponse;

    if (data.status === "0") {
      return {
        chainName: chain.name,
        error: `API Error: ${data.message} - ${data.result}`,
      };
    }

    try {
      // Try to parse the response
      const parsedData = JSON.parse(data.result);

      // Extract contract name and ABI
      let contractName: string | undefined;
      let abi: string | undefined;

      if (parsedData.ContractName) {
        contractName = parsedData.ContractName;
      }

      if (Array.isArray(parsedData)) {
        abi = JSON.stringify(parsedData, null, 2);
      } else if (parsedData.ABI) {
        abi = JSON.stringify(parsedData.ABI, null, 2);
      } else {
        abi = JSON.stringify(parsedData, null, 2);
      }

      return {
        chainName: chain.name,
        contractName,
        abi,
      };
    } catch (e) {
      // If parsing fails, return the raw result
      return {
        chainName: chain.name,
        abi: data.result,
      };
    }
  } catch (error) {
    return {
      chainName: chain.name,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function fetchABIFromAllChains() {
  logger.info(`Searching for contract at address ${address} across all chains...`);

  // Create an array of promises for all chains
  const results = await Promise.all(chains.map((chain) => fetchABIForChain(chain)));

  // Filter out chains with errors
  const successfulResults = results.filter((result) => !result.error);

  if (successfulResults.length === 0) {
    logger.info("No contract found on any chain.");
    return;
  }

  logger.info(`Found contract on ${successfulResults.length} chain(s):`);

  // Display results for each chain
  successfulResults.forEach((result, index) => {
    logger.info(`[${index + 1}] ${result.chainName}`);
    if (result.contractName) {
      logger.info(`    Contract Name: ${result.contractName}`);
    }
    logger.info(`    ABI:`);
    logger.info(result.abi || "");
    logger.info("-".repeat(80));
  });
}

fetchABIFromAllChains();
