#!/usr/bin/env node
const cp = require('child_process');

// Remove Heroku's legacy flags that crash Yarn 4
const invalidFlags = ['--production', '--ignore-engines', '--prefer-offline'];
let args = process.argv.slice(2).filter(arg => !invalidFlags.some(f => arg.startsWith(f)));

// Map frozen-lockfile to immutable
args = args.map(arg => arg === '--frozen-lockfile' ? '--immutable' : arg);

// We set YARN_IGNORE_PATH=1 so that the real yarn doesn't call this wrapper again.
const env = { ...process.env, YARN_IGNORE_PATH: '1' };

const child = cp.spawn(process.platform === 'win32' ? 'corepack.cmd' : 'corepack', ['yarn', ...args], { stdio: 'inherit', env, shell: process.platform === 'win32' });

child.on('exit', code => process.exit(code));
child.on('error', err => {
  console.error('Wrapper error:', err);
  process.exit(1);
});
