#!/usr/bin/env node
const { spawnSync } = require('child_process');
const os = require('os');
const isWindows = os.platform() === 'win32';

function log(msg) {
  console.error(msg);
}

function commandExists(cmd) {
  try {
    if (isWindows) {
      const result = spawnSync('where', [cmd], { stdio: 'ignore' });
      return result.status === 0;
    } else {
      const result = spawnSync('sh', ['-c', `command -v "$1"`, '--', cmd], { stdio: 'ignore' });
      return result.status === 0;
    }
  } catch {
    return false;
  }
}

function getCommandOutput(cmd, args) {
  try {
    const result = spawnSync(cmd, args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'], shell: isWindows });
    return result.status === 0 ? (result.stdout || '').trim() : null;
  } catch {
    return null;
  }
}

log('Checking Vercel login status...');
const whoami = getCommandOutput('vercel', ['whoami']);

if (whoami && !whoami.includes('Error') && !whoami.includes('not logged in')) {
  log(`✅ Logged in as: ${whoami}`);
  log('\nProceeding with deployment...');
  
  log('\n========================================');
  log('Starting deployment to production...');
  log('========================================\n');
  
  const result = spawnSync('vercel', ['--prod', '--yes'], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: isWindows,
    timeout: 300000
  });
  
  if (result.status === 0) {
    log('\n✅ Deployment successful!');
  } else {
    log('\n❌ Deployment failed');
    process.exit(1);
  }
} else {
  log('❌ Not logged in to Vercel');
  log('\nPlease run: vercel login');
  log('Then try deploying again');
  process.exit(1);
}
