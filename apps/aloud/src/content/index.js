import { ReadAloud } from './ReadAloud.js';
import { setupKeepAlive } from './keepAlive.js';

// Enable debug mode
window.DEBUG = true;

// Load language patterns directly
import languagePatterns from '../lib/languagePatterns.js';

// Check if already initialized
if (!window.readAloudInitialized) {
  window.readAloudInitialized = true;
  window.readAloudInstance = null;

  // console.log('✅ Language patterns loaded:', Object.keys(languagePatterns));

  // Setup keep-alive
  setupKeepAlive();

  // Initialize when DOM is ready
  function initializeExtension() {
    console.log('📄 Initializing ReadAloud...');
    window.readAloudInstance = new ReadAloud(languagePatterns);
  }

  // Handle extension reload/update
  function handleExtensionReload() {
    if (window.readAloudInstance) {
      console.log('🔄 Extension reload detected, cleaning up...');
      window.readAloudInstance.destroy();
      window.readAloudInstance = null;
    }
  }

  window.addEventListener('unload', handleExtensionReload);

  // Check extension context periodically
  function checkExtensionContext() {
    try {
      if (!chrome.runtime?.id) {
        console.log('🔌 Extension context lost, cleaning up...');
        handleExtensionReload();
        return false;
      }
      return true;
    } catch (error) {
      console.log('🔌 Extension context invalid:', error.message);
      handleExtensionReload();
      return false;
    }
  }

  setInterval(checkExtensionContext, 30000);

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExtension);
  } else {
    initializeExtension();
  }
}
