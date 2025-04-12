# ABI Fetch

A simple CLI tool to fetch contract ABIs from various blockchain explorers.

## Features

- Support for multiple EVM-compatible networks
- Fetch contract ABIs by address
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

### Setting up your API key

You need to set your API key as an environment variable. You can get API keys from the respective block explorers:

- [Etherscan](https://etherscan.io/apis)
- [BscScan](https://bscscan.com/apis)
- [PolygonScan](https://polygonscan.com/apis)
- And others...

Set your API key:
```bash
export API_KEY=your_api_key
```

### Running the application

Fetch an ABI by chain ID:
```bash
bun run src/index.ts 1 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
```

Or by chain name:
```bash
bun run src/index.ts "Ethereum Mainnet" 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
```

### Available Networks

The tool supports many EVM-compatible networks. Run the application without arguments to see a list of available networks:

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
