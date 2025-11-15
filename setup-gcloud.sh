#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Google Cloud Run deployment dependencies...${NC}"
echo ""

# Check OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     OS_TYPE=linux;;
    Darwin*)    OS_TYPE=macos;;
    *)          OS_TYPE=unknown;;
esac

# Check if gcloud is installed
if command -v gcloud &> /dev/null; then
    echo -e "${GREEN}✓ gcloud CLI is already installed${NC}"
    gcloud --version
else
    echo -e "${YELLOW}✗ gcloud CLI is not installed${NC}"
    
    if [ "$OS_TYPE" == "macos" ]; then
        if command -v brew &> /dev/null; then
            echo -e "${BLUE}Installing gcloud CLI using Homebrew...${NC}"
            brew install google-cloud-sdk
        else
            echo -e "${RED}Homebrew is not installed.${NC}"
            echo "Please install Homebrew first: https://brew.sh"
            echo "Or install gcloud CLI manually: https://cloud.google.com/sdk/docs/install"
            exit 1
        fi
    elif [ "$OS_TYPE" == "linux" ]; then
        echo -e "${YELLOW}Please install gcloud CLI manually for Linux:${NC}"
        echo "Visit: https://cloud.google.com/sdk/docs/install"
        exit 1
    else
        echo -e "${RED}Unsupported OS. Please install gcloud CLI manually:${NC}"
        echo "Visit: https://cloud.google.com/sdk/docs/install"
        exit 1
    fi
fi

echo ""

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker is already installed${NC}"
    docker --version
else
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ All dependencies are installed!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Authenticate with Google Cloud:"
echo "   ${YELLOW}gcloud auth login${NC}"
echo ""
echo "2. Set your project:"
echo "   ${YELLOW}gcloud config set project YOUR_PROJECT_ID${NC}"
echo ""
echo "3. Enable required APIs:"
echo "   ${YELLOW}gcloud services enable run.googleapis.com artifactregistry.googleapis.com${NC}"
echo ""
echo "4. Test Docker build locally (optional):"
echo "   ${YELLOW}pnpm test:docker${NC}"
echo ""
echo "5. Deploy to Cloud Run:"
echo "   ${YELLOW}pnpm deploy${NC}"
echo "   or"
echo "   ${YELLOW}./deploy.sh${NC}"

