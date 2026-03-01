#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start transliteration API
const api = spawn('npm', ['run', 'dev:transliteration'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'pipe',
  shell: true
});

api.stdout.on('data', (data) => {
  console.log(`[API] ${data.toString().trim()}`);
});

api.stderr.on('data', (data) => {
  console.error(`[API Error] ${data.toString().trim()}`);
});

// Start spacedesign
const spacedesign = spawn('npm', ['run', 'dev:spacedesign'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'pipe',
  shell: true
});

spacedesign.stdout.on('data', (data) => {
  console.log(`[Spacedesign] ${data.toString().trim()}`);
});

spacedesign.stderr.on('data', (data) => {
  console.error(`[Spacedesign Error] ${data.toString().trim()}`);
});

// Handle cleanup
process.on('SIGINT', () => {
  api.kill();
  spacedesign.kill();
  process.exit();
});