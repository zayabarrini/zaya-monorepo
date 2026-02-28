#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting ZayaWeb Test Suite...\n');

try {
  // Run unit tests
  console.log('📝 Running Unit Tests...');
  execSync('npm run test', { stdio: 'inherit' });
  
  // Run E2E tests
  console.log('🌐 Running E2E Tests...');
  execSync('npx playwright test', { stdio: 'inherit' });
  
  // Run accessibility tests
  console.log('♿ Running Accessibility Tests...');
  execSync('npx playwright test tests/accessibility.test.ts', { stdio: 'inherit' });
  
  console.log('✅ All tests completed successfully!');
} catch (error) {
  console.error('❌ Tests failed:', error.message);
  process.exit(1);
}