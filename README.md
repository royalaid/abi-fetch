Before we start, a warning. This is was vibecoded in like 30 minutes. It probably doesn't work for every chain. I will make fixes as I encounter bugs. Its still useful IMO so do with it what you will.

# ABI Fetch

A simple CLI tool to fetch contract ABIs from various blockchain explorers.

## Features

- Support for multiple EVM-compatible networks
- Fetch contract ABIs by address
- Automatic contract name extraction
- Simple command-line interface

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/abi-fetch.git
cd abi-fetch
```

2. Install dependencies:
```bash
bun install
```

## Usage

### Setting up your API keys

You need to set your API keys as environment variables. You can get API keys from the respective block explorers:

- [Etherscan](https://etherscan.io/apis)
- [BscScan](https://bscscan.com/apis)
- [PolygonScan](https://polygonscan.com/apis)
- [BaseScan](https://basescan.org/apis)
- And others...

Set your API keys in the `.env` file:
```
ETHERSCAN_API_KEY=your_api_key
# Optional: Use a separate API key for Base chain
BASESCAN_API_KEY=your_basescan_api_key
```

Or set them directly in your shell:
```bash
export ETHERSCAN_API_KEY=your_api_key
export BASESCAN_API_KEY=your_basescan_api_key  # Optional
```

### Running the application

Fetch an ABI by providing just the contract address. The tool will automatically check all supported chains:

```bash
bun run src/index.ts 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
```

The tool will search across all supported chains and display the contract name for each instance found. If the contract is found on multiple chains, you'll be prompted to choose which chain to save the ABI from.

The ABI will be automatically saved to a JSON file named after the contract (or the address if the contract name is not available).

### Logging

The application uses a configurable logging system. You can control the log level using the `LOG_LEVEL` environment variable:

```bash
# Set log level to DEBUG for more verbose output
LOG_LEVEL=DEBUG bun run src/index.ts 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

# Set log level to ERROR to only show errors
LOG_LEVEL=ERROR bun run src/index.ts 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
```

Available log levels:
- `DEBUG`: Detailed information for debugging
- `INFO`: General information about the application's progress
- `WARN`: Warning messages for potentially harmful situations
- `ERROR`: Error messages for serious problems
- `NONE`: Disable all logging

### Available Networks

The tool supports many EVM-compatible networks, including:
- Ethereum Mainnet
- Base
- Optimism
- Arbitrum
- Polygon
- BNB Smart Chain
- And many more testnets

Run the application without arguments to see a list of available networks:

```bash
bun run src/index.ts
```

## Development

Run in development mode with hot reloading:
```bash
bun run dev
```

Build the application:
```bash
bun run build
```

## License

MIT
