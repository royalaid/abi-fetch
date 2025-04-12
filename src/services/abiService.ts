import type { ChainConfig } from '../config/chains';

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

interface ApiResponse {
  status: string;
  message: string;
  result: string;
}

interface AbiResult {
  abi: string;
  contractName?: string;
}

export class AbiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Fetches the ABI for a contract address on a specific chain
   * @param chain The chain configuration
   * @param address The contract address
   * @returns The ABI as a string and the contract name if available
   */
  async fetchAbi(chain: ChainConfig, address: string): Promise<AbiResult> {
    const url = `${chain.explorer}/api?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as ApiResponse;

      if (data.status !== "1") {
        throw new Error(`API error: ${data.message || "Unknown error"}`);
      }

      // The API returns the ABI in the result field as a string
      const result = data.result;
      let contractName: string | undefined;

      // Try to parse the result as JSON first
      try {
        const parsedResult = JSON.parse(result);

        // If it's already an array, it's the ABI
        if (Array.isArray(parsedResult)) {
          return { abi: result };
        }

        // If it's an object with an ABI property, use that
        if (parsedResult.ABI) {
          contractName = parsedResult.ContractName;
          return { abi: parsedResult.ABI, contractName };
        }

        // If it's a ContractSourceCode object, extract the ABI
        if (typeof parsedResult === "object") {
          const contractData = parsedResult as ContractSourceCode;
          if (contractData.ABI) {
            contractName = contractData.ContractName;
            return { abi: contractData.ABI, contractName };
          }
        }
      } catch (parseError) {
        // If parsing fails, the result might be a string containing the ABI
        // Try to extract it using regex
        const abiMatch = result.match(/\[.*\]/s);
        if (abiMatch) {
          return { abi: abiMatch[0] };
        }
      }

      // If we couldn't extract the ABI, return the raw result
      return { abi: result };
    } catch (error) {
      console.error("Error fetching ABI:", error);
      throw error;
    }
  }
}
