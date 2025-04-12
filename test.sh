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

# Set log level for tests
export LOG_LEVEL=DEBUG

# Create a test directory for output files
TEST_DIR="test_output"
mkdir -p $TEST_DIR

# Test with a known contract address
echo "Testing with a known contract address..."
ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY bun run src/index.ts 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

# Check if ABI file was created
echo -e "\nChecking for ABI file..."
ls -la *.json 2>/dev/null || echo "No ABI file found"

# Test with invalid address
echo -e "\nTesting with invalid address..."
ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY bun run src/index.ts 0xinvalid

echo -e "\nAll tests completed!" 