/**
 * Validates an Ethereum address format
 * @param address The address to validate
 * @returns boolean indicating if the address is valid
 */
export function validateAddress(address: string): boolean {
  // Simple Ethereum address validation (0x followed by 40 hex characters)
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
