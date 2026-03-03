// dev.js - Save this in your project root
const fs = require('fs');
const path = require('path');

console.log('👀 Watching for file changes...');
console.log('Press Ctrl+C to stop');

const filesToWatch = [
  'content.js',
  'background.js',
  'popup.js',
  'popup.html',
  'styles.css',
  'manifest.json',
  'lib/languagePatterns.js'
];

filesToWatch.forEach(file => {
  if (fs.existsSync(file)) {
    fs.watch(file, (eventType) => {
      if (eventType === 'change') {
        console.log(`📝 ${file} changed - Please reload the extension`);
      }
    });
  }
});