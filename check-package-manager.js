const used = process.env.npm_execpath;

if (!used || !used.includes('yarn')) {
  console.error(`
❌ Please use Yarn to install dependencies for this project.

Detected: ${used || 'unknown'}
Required: Yarn (https://classic.yarnpkg.com or https://yarnpkg.com)

`);
  process.exit(1);
}
