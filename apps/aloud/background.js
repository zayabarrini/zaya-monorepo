// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Initialize default settings
  chrome.storage.local.set({
    isSpeakingMode: false,
    rate: 1.0,
    detectedLanguage: 'English',
  });
});

// Handle messages from popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getState') {
    chrome.storage.local.get(['isSpeakingMode', 'rate', 'detectedLanguage'], (result) => {
      sendResponse(result);
    });
    return true; // Required for async response
  }

  if (message.action === 'updateLanguage') {
    chrome.storage.local.set({ detectedLanguage: message.language });
  }
});

// When a tab is updated, ensure content script has the correct state
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get(['isSpeakingMode', 'rate'], (result) => {
      // Send state to the content script
      chrome.tabs
        .sendMessage(tabId, {
          action: 'syncState',
          enabled: result.isSpeakingMode || false,
          rate: result.rate || 1.0,
        })
        .catch(() => {
          // Content script might not be ready yet, that's ok
        });
    });
  }
});

// Optional: Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-read-aloud') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.storage.local.get(['isSpeakingMode'], (result) => {
        const newState = !result.isSpeakingMode;
        chrome.storage.local.set({ isSpeakingMode: newState });

        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: 'toggleReadAloud',
            enabled: newState,
          })
          .catch(console.error);
      });
    });
  }
});
