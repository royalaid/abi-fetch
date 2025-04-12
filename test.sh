#!/bin/bash

# Check if API_KEY is set
if [ -z "$API_KEY" ]; then
  echo "Error: API_KEY environment variable is not set."
  echo "Please set your API key using: export API_KEY=your_api_key"
  exit 1
fi

# Test with Ethereum Mainnet
echo "Testing with Ethereum Mainnet..."
bun run src/index.ts 1 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

# Test with chain name
echo -e "\nTesting with chain name..."
bun run src/index.ts "Ethereum Mainnet" 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

# Test with invalid address
echo -e "\nTesting with invalid address..."
bun run src/index.ts 1 0xinvalid

# Test with invalid chain
echo -e "\nTesting with invalid chain..."
bun run src/index.ts 999999 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

echo -e "\nAll tests completed!" 