import type { ChainConfig } from '../config/chains';

export interface AbiResponse {
  status: string;
  message: string;
  result: string;
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
   * @returns The ABI as a string
   */
  async fetchAbi(chain: ChainConfig, address: string): Promise<string> {
    try {
      const url = new URL(`${chain.apiUrl}/api`);
      
      // Add query parameters
      url.searchParams.append('module', 'contract');
      url.searchParams.append('action', 'getsourcecode');
      url.searchParams.append('address', address);
      url.searchParams.append('apikey', this.apiKey);
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json() as AbiResponse;
      
      if (data.status === '0') {
        throw new Error(`API error: ${data.message}`);
      }
      
      return data.result;
    } catch (error) {
      console.error(`Error fetching ABI for ${address} on ${chain.name}:`, error);
      throw error;
    }
  }
} 