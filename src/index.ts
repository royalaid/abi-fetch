import { getChainConfig, chains } from "./config/chains";
import type { ChainConfig } from "./config/chains";
import { validateAddress } from "./utils/validation";
import logger, { LogLevel } from "./utils/logger";
import { saveToJsonFile, promptUserChoice } from "./utils/fileUtils";

// Configure logger
logger.setPrefix("ABI-Fetch");
logger.setLevel(LogLevel.INFO);

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || ETHERSCAN_API_KEY;

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

interface ContractSourceCode {
  SourceCode: string;
  ABI: string;
  ContractName: string;
  CompilerVersion: string;
  OptimizationUsed: string;
  Runs: string;
  ConstructorArguments: string;
  Library: string;
  LicenseType: string;
  Proxy: string;
  Implementation: string;
  SwarmSource: string;
}

interface SourceCodeResponse {
  status: string;
  message: string;
  result: ContractSourceCode[];
}

interface ChainResult {
  chainName: string;
  contractName?: string;
  abi?: string;
  error?: string;
}

async function fetchContractName(chain: ChainConfig, address: string): Promise<string | undefined> {
  try {
    const apiKey = chain.name === "Base" ? BASESCAN_API_KEY : ETHERSCAN_API_KEY;
    const url = `${chain.apiUrl}/api?module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`;
    logger.debug(`Fetching contract name from: ${url}`);

    const response = await fetch(url);
    const data = (await response.json()) as SourceCodeResponse;

    if (data.status === "1" && data.result?.[0]?.ContractName) {
      return data.result[0].ContractName;
    }
    return undefined;
  } catch (error) {
    logger.debug(`Failed to fetch contract name: ${error instanceof Error ? error.message : "Unknown error"}`);
    return undefined;
  }
}

async function fetchABIForChain(chain: ChainConfig): Promise<ChainResult> {
  try {
    logger.debug(`Checking ${chain.name}...`);
    // Use Base-specific API key for Base chain
    const apiKey = chain.name === "Base" ? BASESCAN_API_KEY : ETHERSCAN_API_KEY;
    const url = `${chain.apiUrl}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = (await response.json()) as EtherscanResponse;

    logger.debug(`Response from ${chain.name}:`, data);

    // Handle API key errors explicitly
    if (
      data.message &&
      (data.message.toLowerCase().includes("invalid api key") || data.message.toLowerCase().includes("too many invalid api key attempts"))
    ) {
      return {
        chainName: chain.name,
        error: `API key error for ${chain.name}: ${data.message}. You may need to set a specific API key for ${chain.name} (${chain.explorer})`,
      };
    }

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

      if (Array.isArray(parsedData)) {
        abi = JSON.stringify(parsedData, null, 2);
      } else if (parsedData.ABI) {
        abi = JSON.stringify(parsedData.ABI, null, 2);
      } else {
        abi = JSON.stringify(parsedData, null, 2);
      }

      // If we have a successful ABI, try to fetch the contract name
      if (abi) {
        contractName = await fetchContractName(chain, address);
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

async function saveABI(result: ChainResult): Promise<void> {
  if (!result.abi) {
    logger.error(`No ABI found for ${result.chainName}`);
    return;
  }

  try {
    // Parse the ABI string to get a proper JSON object
    const abiData = JSON.parse(result.abi);

    // Create a filename based on the contract name or address
    const filename = result.contractName || `contract_${address.slice(2, 8)}`;

    // Save to a file
    const filePath = saveToJsonFile(abiData, filename);
    logger.info(`ABI saved to ${filePath}`);
  } catch (error) {
    logger.error(`Failed to save ABI: ${error instanceof Error ? error.message : "Unknown error"}`);
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
    logger.info("-".repeat(80));
  });

  // If multiple chains found, prompt the user to choose one
  if (successfulResults.length > 1) {
    logger.info("Multiple chains found. Please select which chain to save the ABI from:");

    // Create a list of options for the user to choose from
    const options = successfulResults.map((result) => ({
      chainName: result.chainName,
      contractName: result.contractName || "Unknown",
      abi: result.abi,
    }));

    // Prompt the user to choose
    const selected = await promptUserChoice(options, "Select a chain to save the ABI from:");

    // Find the full result object that matches the selection
    const selectedResult = successfulResults.find((result) => result.chainName === selected.chainName);

    if (selectedResult) {
      await saveABI(selectedResult);
    } else {
      logger.error("Selected chain not found in results");
    }
  } else {
    // If only one chain found, save it automatically
    await saveABI(successfulResults[0]!);
  }
}

fetchABIFromAllChains();
