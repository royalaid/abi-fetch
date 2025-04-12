#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example..."
  cp .env.example .env
  echo "Please edit the .env file and add your API key."
else
  echo ".env file already exists."
fi

# Install dependencies
echo "Installing dependencies..."
bun install

echo "Setup complete! You can now run the application with:"
echo "bun run src/index.ts <chain_id_or_name> <contract_address>" 