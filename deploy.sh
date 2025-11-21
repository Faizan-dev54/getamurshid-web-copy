#!/bin/bash

# Exit on error
set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Required env variables
: "${VPS_USER:?Missing VPS_USER}"
: "${VPS_IP:?Missing VPS_IP}"
: "${REMOTE_FOLDER:?Missing REMOTE_FOLDER}"

# Pull latest changes from dev branch
git pull origin dev

# Install dependencies
yarn install

# Build the frontend
echo "🔨 Building frontend..."
yarn build

# Upload dist to the server
echo "📤 Uploading dist to server..."
scp -r ./dist/* "$VPS_USER@$VPS_IP:$REMOTE_FOLDER"

echo ""
echo "✅ Frontend deployment complete."
