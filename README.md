# React + TypeScript + Vite + Tailwind

This template provides a minimal setup to get React working in Vite, TypeScript, and Tailwind.

## Getting Started 🚀

1. Clone the repo.
2. Install dependencies: `pnpm install`
3. Start the dev server: `pnpm dev`

### Or

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoinulmoin%2Fvite-react-tailwind-starter)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Deploying to Google Cloud Run 🚀

This project includes scripts and configuration for deploying to Google Cloud Run.

### Prerequisites

1. **Run the setup script** (automatically installs dependencies)
   ```bash
   ./setup-gcloud.sh
   # or
   pnpm setup:gcloud
   ```

   This will check and install:
   - Google Cloud SDK (gcloud CLI)
   - Docker

2. **Authenticate with Google Cloud**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Enable required APIs**
   ```bash
   gcloud services enable run.googleapis.com artifactregistry.googleapis.com
   ```

### Deployment

1. **Set environment variables (optional)**
   ```bash
   export GCP_PROJECT_ID="your-project-id"
   export GCP_REGION="us-central1"  # or your preferred region
   export SERVICE_NAME="vite-react-tailwind-starter"  # optional, defaults to this
   ```

2. **Run the deployment script**
   ```bash
   ./deploy.sh
   ```

   The script will:
   - Build your Docker image
   - Push it to Google Artifact Registry
   - Deploy to Cloud Run
   - Provide you with the service URL

3. **Alternative: Use npm scripts**
   ```bash
   pnpm deploy
   ```

### Manual Deployment Steps

If you prefer to deploy manually:

```bash
# Build the Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/vite-react-tailwind-starter .

# Push to Artifact Registry
docker push gcr.io/YOUR_PROJECT_ID/vite-react-tailwind-starter

# Deploy to Cloud Run
gcloud run deploy vite-react-tailwind-starter \
  --image gcr.io/YOUR_PROJECT_ID/vite-react-tailwind-starter \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Configuration

The deployment uses:
- **Port**: 8080 (Cloud Run default)
- **Memory**: 512Mi
- **CPU**: 1
- **Min instances**: 0 (scales to zero)
- **Max instances**: 10
- **Timeout**: 300 seconds

You can modify these settings in `deploy.sh` or by updating the Cloud Run service after deployment.

## License 📄

[MIT License](https://github.com/moinulmoin/vite-react-tailwind-starter/blob/master/LICENSE)
