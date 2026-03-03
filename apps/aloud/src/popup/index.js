document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleReadAloud');
  const speedRange = document.getElementById('speedRange');
  const speedValue = document.getElementById('speedValue');
  const currentLanguage = document.getElementById('currentLanguage');
  const buttonStatus = document.getElementById('buttonStatus');
  const statusPanel = document.getElementById('statusPanel');
  const readingModeStatus = document.getElementById('readingModeStatus');

  // Request state from background
  chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    if (response) {
      toggle.checked = response.isExtensionEnabled || false;
      speedRange.value = response.rate || 1.0;
      speedValue.textContent = (response.rate || 1.0).toFixed(1) + 'x';
      currentLanguage.textContent = response.detectedLanguage || 'English';
      updateButtonStatus(response.isExtensionEnabled || false, response.isReadingMode || false);
    }
  });

  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;

    chrome.runtime.sendMessage({
      action: 'toggleExtension',
      enabled: isEnabled,
    });

    updateButtonStatus(isEnabled, false);
  });

  speedRange.addEventListener('input', () => {
    const value = parseFloat(speedRange.value);
    speedValue.textContent = value.toFixed(1) + 'x';

    chrome.runtime.sendMessage({
      action: 'updateRate',
      rate: value,
    });
  });

  // Listen for updates from background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'syncState') {
      currentLanguage.textContent = message.detectedLanguage || 'English';
      updateButtonStatus(message.isExtensionEnabled, message.isReadingMode);
    }
  });

  function updateButtonStatus(extensionEnabled, readingModeEnabled) {
    if (buttonStatus) {
      if (!extensionEnabled) {
        buttonStatus.textContent = 'Extension disabled - Button hidden';
        buttonStatus.style.color = '#f44336';
      } else if (readingModeEnabled) {
        buttonStatus.textContent = 'Reading mode ON - Button active';
        buttonStatus.style.color = '#4CAF50';
      } else {
        buttonStatus.textContent = 'Reading mode OFF - Button visible';
        buttonStatus.style.color = '#ff9800';
      }
    }

    if (readingModeStatus) {
      readingModeStatus.textContent = readingModeEnabled ? 'ON' : 'OFF';
    }

    if (statusPanel) {
      if (extensionEnabled && readingModeEnabled) {
        statusPanel.classList.add('active');
      } else {
        statusPanel.classList.remove('active');
      }
    }
  }
});
