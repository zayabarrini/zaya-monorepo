// Background script - Manages global state across all tabs
let globalState = {
  isExtensionEnabled: false,
  isReadingMode: false,
  rate: 1.0,
  detectedLanguage: 'English',
};

// Load initial state
chrome.storage.local.get(
  ['isExtensionEnabled', 'isReadingMode', 'rate', 'detectedLanguage'],
  (result) => {
    globalState = {
      isExtensionEnabled: result.isExtensionEnabled || false,
      isReadingMode: result.isReadingMode || false,
      rate: result.rate || 1.0,
      detectedLanguage: result.detectedLanguage || 'English',
    };
    console.log('✅ Background loaded with state:', globalState);
  }
);

chrome.runtime.onInstalled.addListener(() => {
  console.log('✅ ReadAloud extension installed');
  chrome.storage.local.set({
    isExtensionEnabled: false,
    isReadingMode: false,
    rate: 1.0,
    detectedLanguage: 'English',
  });
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    // Popup requests state
    if (message.action === 'getState') {
      sendResponse(globalState);
      return true;
    }

    // Popup toggles extension
    if (message.action === 'toggleExtension') {
      globalState.isExtensionEnabled = message.enabled;
      // When extension is disabled, also disable reading mode
      if (!globalState.isExtensionEnabled) {
        globalState.isReadingMode = false;
      }

      chrome.storage.local.set({
        isExtensionEnabled: globalState.isExtensionEnabled,
        isReadingMode: globalState.isReadingMode,
      });

      // Broadcast to all tabs
      broadcastToAllTabs({
        action: 'syncState',
        ...globalState,
      });

      sendResponse({ success: true });
      return true;
    }

    // Content script toggles reading mode
    if (message.action === 'toggleReadingMode') {
      globalState.isReadingMode = message.enabled;

      chrome.storage.local.set({
        isReadingMode: globalState.isReadingMode,
      });

      // Broadcast to all tabs
      broadcastToAllTabs({
        action: 'syncState',
        ...globalState,
      });

      sendResponse({ success: true });
      return true;
    }

    // Update rate
    if (message.action === 'updateRate') {
      globalState.rate = message.rate;

      chrome.storage.local.set({
        rate: globalState.rate,
      });

      // Broadcast to all tabs
      broadcastToAllTabs({
        action: 'syncState',
        ...globalState,
      });

      sendResponse({ success: true });
      return true;
    }

    // Update detected language
    if (message.action === 'updateLanguage') {
      globalState.detectedLanguage = message.language;

      chrome.storage.local.set({
        detectedLanguage: globalState.detectedLanguage,
      });

      // No need to broadcast language to all tabs
      sendResponse({ success: true });
      return true;
    }

    // Content script requests initial sync
    if (message.action === 'requestSync') {
      sendResponse(globalState);
      return true;
    }
  } catch (error) {
    console.error('Error in background script:', error);
    sendResponse({ error: error.message });
  }

  return true;
});

// Broadcast message to all tabs
function broadcastToAllTabs(message) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {
        // Ignore errors - tab might not have content script loaded
      });
    });
  });
}

// When a new tab is created or updated, sync state to it
chrome.tabs.onCreated.addListener((tab) => {
  setTimeout(() => {
    chrome.tabs
      .sendMessage(tab.id, {
        action: 'syncState',
        ...globalState,
      })
      .catch(() => {});
  }, 1000); // Wait for content script to load
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    setTimeout(() => {
      chrome.tabs
        .sendMessage(tabId, {
          action: 'syncState',
          ...globalState,
        })
        .catch(() => {});
    }, 500);
  }
});

// Keep service worker alive
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepAlive') {
    port.onDisconnect.addListener(() => {
      console.log('Keep-alive port disconnected');
    });
  }
});
