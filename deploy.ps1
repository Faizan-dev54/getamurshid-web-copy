# Exit on error
$ErrorActionPreference = "Stop"

# Load environment variables from .env file if exists
if (Test-Path ".env") {
    Get-Content .env | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

# Required env variables
$VPSUser = $env:VPS_USER
$VPSIP = $env:VPS_IP
$RemoteFolder = $env:REMOTE_FOLDER

if (-not $VPSUser -or -not $VPSIP -or -not $RemoteFolder) {
    Write-Error "❌ Missing required environment variables (VPS_USER, VPS_IP, REMOTE_FOLDER)"
    exit 1
}

# Pull latest changes
git pull origin dev

# Install dependencies
yarn install

# Build the frontend
Write-Host "🔨 Building frontend..."
yarn build

# Upload dist to server
Write-Host "📤 Uploading dist to server..."
scp -r ./dist/* "$VPSUser@$VPSIP:$RemoteFolder"

Write-Host "`n✅ Frontend deployment complete."
