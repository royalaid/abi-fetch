#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# Check if ETHERSCAN_API_KEY is set
if [ -z "$ETHERSCAN_API_KEY" ]; then
  echo "Error: ETHERSCAN_API_KEY environment variable is not set in .env file"
  echo "Please add your API key to the .env file: ETHERSCAN_API_KEY=your_api_key"
  exit 1
fi

# Test with Ethereum Mainnet
echo "Testing with Ethereum Mainnet..."
ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY bun run src/index.ts 1 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

# Test with chain name
echo -e "\nTesting with chain name..."
ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY bun run src/index.ts "Ethereum Mainnet" 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

# Test with invalid address
echo -e "\nTesting with invalid address..."
ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY bun run src/index.ts 1 0xinvalid

# Test with invalid chain
echo -e "\nTesting with invalid chain..."
ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY bun run src/index.ts 999999 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

echo -e "\nAll tests completed!" 