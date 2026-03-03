// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleReadAloud');
  const speedRange = document.getElementById('speedRange');
  const speedValue = document.getElementById('speedValue');
  const currentLanguage = document.getElementById('currentLanguage');

  // Load saved state
  chrome.storage.local.get(['isSpeakingMode', 'rate', 'detectedLanguage'], (result) => {
    toggle.checked = result.isSpeakingMode || false;
    speedRange.value = result.rate || 1.0;
    speedValue.textContent = (result.rate || 1.0).toFixed(1) + 'x';
    currentLanguage.textContent = result.detectedLanguage || 'English';
  });

  // Toggle change handler - with immediate feedback
  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;

    // Save to storage
    chrome.storage.local.set({ isSpeakingMode: isEnabled });

    // Send message to content script in the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: 'toggleReadAloud',
            enabled: isEnabled,
          })
          .catch((error) => {
            // Content script might not be loaded yet
            console.log('Could not send message to tab:', error);

            // If content script isn't loaded, reload the tab to inject it
            if (error.message.includes('Could not establish connection')) {
              chrome.tabs.reload(tabs[0].id, () => {
                // Wait for tab to load then send message again
                setTimeout(() => {
                  chrome.tabs
                    .sendMessage(tabs[0].id, {
                      action: 'toggleReadAloud',
                      enabled: isEnabled,
                    })
                    .catch(console.error);
                }, 1000);
              });
            }
          });
      }
    });

    // Update popup UI
    updatePopupStatus(isEnabled);
  });

  // Speed change handler
  speedRange.addEventListener('input', () => {
    const value = parseFloat(speedRange.value);
    speedValue.textContent = value.toFixed(1) + 'x';

    chrome.storage.local.set({ rate: value });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: 'updateRate',
            rate: value,
          })
          .catch(console.error);
      }
    });
  });

  // Listen for language updates from content script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'languageDetected') {
      currentLanguage.textContent = message.language;
    }
  });

  // Update popup status indicator
  function updatePopupStatus(enabled) {
    const statusElement = document.querySelector('.status');
    if (statusElement) {
      if (enabled) {
        statusElement.style.background = '#e8f5e8';
        statusElement.style.color = '#2e7d32';
      } else {
        statusElement.style.background = '#f5f5f5';
        statusElement.style.color = '#666';
      }
    }
  }

  // Initial status update
  updatePopupStatus(toggle.checked);
});
