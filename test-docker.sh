#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Testing Docker build locally...${NC}"

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t vite-react-tailwind-starter:test .

# Run the container
echo -e "${YELLOW}Starting container on port 8080...${NC}"
echo -e "${GREEN}Container is running!${NC}"
echo "Visit http://localhost:8080 to test your application"
echo "Press Ctrl+C to stop the container"
echo ""

docker run -p 8080:8080 vite-react-tailwind-starter:test

