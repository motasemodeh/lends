#!/usr/bin/env node
const cp = require('child_process');

// Remove --production=true or --production=false from arguments
const args = process.argv.slice(2).filter(arg => !arg.startsWith('--production'));

// We set YARN_IGNORE_PATH=1 so that the real yarn doesn't call this wrapper again.
const env = { ...process.env, YARN_IGNORE_PATH: '1' };

const child = cp.spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', args, { stdio: 'inherit', env, shell: process.platform === 'win32' });

child.on('exit', code => process.exit(code));
child.on('error', err => {
  console.error('Wrapper error:', err);
  process.exit(1);
});
