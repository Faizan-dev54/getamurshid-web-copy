import { execSync } from 'child_process';
import os from 'os';

try {
  if (os.platform() === 'win32') {
    console.log('🪟 Running Windows deployment...');
    execSync('powershell -ExecutionPolicy Bypass -File ./deploy.ps1', { stdio: 'inherit' });
  } else {
    console.log('🍎 Running macOS/Linux deployment...');
    execSync('./deploy.sh', { stdio: 'inherit' });
  }
} catch (err) {
  console.error('❌ Deployment failed:', err.message);
  process.exit(1);
}
