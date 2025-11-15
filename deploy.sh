#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration (can be overridden by environment variables)
PROJECT_ID=${GCP_PROJECT_ID:-""}
REGION=${GCP_REGION:-"us-central1"}
SERVICE_NAME=${SERVICE_NAME:-"vite-react-tailwind-starter"}
IMAGE_NAME=${IMAGE_NAME:-"gcr.io/${PROJECT_ID}/${SERVICE_NAME}"}
ARTIFACT_REGISTRY=${ARTIFACT_REGISTRY:-"${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}-repo/${SERVICE_NAME}"}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed.${NC}"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed.${NC}"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Get project ID if not set
if [ -z "$PROJECT_ID" ]; then
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    if [ -z "$PROJECT_ID" ]; then
        echo -e "${RED}Error: GCP_PROJECT_ID is not set and no default project is configured.${NC}"
        echo "Please set GCP_PROJECT_ID environment variable or run: gcloud config set project YOUR_PROJECT_ID"
        exit 1
    fi
    echo -e "${YELLOW}Using project: ${PROJECT_ID}${NC}"
fi

# Update IMAGE_NAME with actual project ID
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
ARTIFACT_REGISTRY="${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}-repo/${SERVICE_NAME}"

echo -e "${GREEN}Starting deployment to Google Cloud Run...${NC}"
echo "Project ID: ${PROJECT_ID}"
echo "Region: ${REGION}"
echo "Service Name: ${SERVICE_NAME}"
echo "Image: ${ARTIFACT_REGISTRY}"
echo ""

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}Not authenticated. Running gcloud auth login...${NC}"
    gcloud auth login
fi

# Enable required APIs
echo -e "${GREEN}Enabling required APIs...${NC}"
gcloud services enable run.googleapis.com artifactregistry.googleapis.com --project=${PROJECT_ID} --quiet 2>/dev/null || true

# Configure Docker to use gcloud as a credential helper
echo -e "${GREEN}Configuring Docker credentials...${NC}"
gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet

# Create Artifact Registry repository if it doesn't exist
echo -e "${GREEN}Checking Artifact Registry repository...${NC}"
if ! gcloud artifacts repositories describe ${SERVICE_NAME}-repo --location=${REGION} --format="value(name)" 2>/dev/null | grep -q .; then
    echo -e "${YELLOW}Creating Artifact Registry repository...${NC}"
    gcloud artifacts repositories create ${SERVICE_NAME}-repo \
        --repository-format=docker \
        --location=${REGION} \
        --description="Docker repository for ${SERVICE_NAME}" \
        --quiet
fi

# Build Docker image
echo -e "${GREEN}Building Docker image...${NC}"
docker build -t ${ARTIFACT_REGISTRY}:latest .

# Tag image with timestamp for versioning
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag ${ARTIFACT_REGISTRY}:latest ${ARTIFACT_REGISTRY}:${TIMESTAMP}

# Push image to Artifact Registry
echo -e "${GREEN}Pushing image to Artifact Registry...${NC}"
docker push ${ARTIFACT_REGISTRY}:latest
docker push ${ARTIFACT_REGISTRY}:${TIMESTAMP}

# Deploy to Cloud Run
echo -e "${GREEN}Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
    --image ${ARTIFACT_REGISTRY}:latest \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300 \
    --quiet

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format="value(status.url)")

echo ""
echo -e "${GREEN}✓ Deployment successful!${NC}"
echo -e "${GREEN}Service URL: ${SERVICE_URL}${NC}"
echo ""
echo "To update the deployment, run this script again."
echo "To view logs: gcloud run services logs read ${SERVICE_NAME} --region=${REGION}"

