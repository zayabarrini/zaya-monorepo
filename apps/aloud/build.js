const fs = require('fs-extra');
const archiver = require('archiver');
const browserify = require('browserify');
const path = require('path');

async function build() {
  console.log('🔨 Building Read Aloud Extension...');

  // Clean dist folders
  await fs.emptyDir('dist/chrome');
  await fs.emptyDir('dist/firefox');

  // Build for Chrome
  console.log('📦 Building Chrome version...');
  await buildBrowser('chrome');

  // Build for Firefox
  console.log('📦 Building Firefox version...');
  await buildBrowser('firefox');

  // Create ZIP files
  await createZip('dist/chrome', 'dist/read-aloud-chrome.zip');
  await createZip('dist/firefox', 'dist/read-aloud-firefox.xpi');

  console.log('✅ Build complete!');
}

async function buildBrowser(browser) {
  const dest = `dist/${browser}`;

  // Copy manifest (handle different naming)
  const manifestFile = browser === 'chrome' ? 'manifest.chrome.json' : 'manifest.firefox.json';
  await fs.copy(manifestFile, `${dest}/manifest.json`);

  // Copy icons
  if (await fs.pathExists('src/icons')) {
    await fs.copy('src/icons', `${dest}/icons`);
  } else {
    console.warn('⚠️  Icons directory not found, creating empty directory');
    await fs.ensureDir(`${dest}/icons`);
  }

  // Copy lib files
  if (await fs.pathExists('src/lib')) {
    await fs.copy('src/lib', `${dest}/lib`);
  } else {
    console.warn('⚠️  Lib directory not found');
  }

  // Bundle content script
  await bundleJS('src/content/index.js', `${dest}/content.js`);

  // Copy background script
  if (await fs.pathExists('src/background/index.js')) {
    await bundleJS('src/background/index.js', `${dest}/background.js`);
  } else {
    console.warn('⚠️  Background script not found');
    // Create a minimal background script
    await fs.writeFile(
      `${dest}/background.js`,
      `
      chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.local.set({ isSpeakingMode: false, rate: 1.0 });
      });
    `
    );
  }

  // Copy popup files
  if (await fs.pathExists('src/popup/index.html')) {
    await fs.copy('src/popup/index.html', `${dest}/popup.html`);
  } else {
    console.error('❌ Popup HTML not found');
    process.exit(1);
  }

  if (await fs.pathExists('src/popup/index.js')) {
    await bundleJS('src/popup/index.js', `${dest}/popup.js`);
  } else {
    console.error('❌ Popup JS not found');
    process.exit(1);
  }

  // Copy styles
  if (await fs.pathExists('src/styles.css')) {
    await fs.copy('src/styles.css', `${dest}/styles.css`);
  } else {
    console.warn('⚠️  Styles not found, creating empty file');
    await fs.writeFile(`${dest}/styles.css`, '');
  }
}

async function bundleJS(input, output) {
  try {
    if (!(await fs.pathExists(input))) {
      throw new Error(`Input file not found: ${input}`);
    }

    const b = browserify();
    b.add(input);

    return new Promise((resolve, reject) => {
      b.bundle((err, buf) => {
        if (err) {
          console.error(`Error bundling ${input}:`, err);
          reject(err);
        } else {
          fs.writeFile(output, buf, resolve);
        }
      });
    });
  } catch (error) {
    console.error(`Failed to bundle ${input}:`, error);
    process.exit(1);
  }
}

function createZip(source, output) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(output);

    archive
      .directory(source, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => {
      console.log(`📦 Created ${output} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.finalize();
  });
}

build().catch(console.error);
