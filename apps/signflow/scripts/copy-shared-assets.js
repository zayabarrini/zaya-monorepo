import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../../spacedesign/static');
const targetDir = path.join(__dirname, '../static');

// List of shared asset folders to copy
const sharedFolders = [
  'icons',
  'images', 
  'screenshots',
  'css'
];

async function copySharedAssets() {
  for (const folder of sharedFolders) {
    const source = path.join(sourceDir, folder);
    const target = path.join(targetDir, folder);
    
    // Check if source exists
    if (fs.existsSync(source)) {
      console.log(`Copying ${folder}...`);
      await fs.copy(source, target, { 
        overwrite: true,
        errorOnExist: false 
      });
    } else {
      console.warn(`Warning: Source folder ${source} does not exist`);
    }
  }
  console.log('✅ Shared assets copied successfully');
}

copySharedAssets().catch(console.error);