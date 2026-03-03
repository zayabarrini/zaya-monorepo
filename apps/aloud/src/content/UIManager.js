import { log } from './utils.js';

export class UIManager {
  constructor() {
    this.button = null;
    this.onToggleReading = null;
  }

  setReadingToggleCallback(callback) {
    this.onToggleReading = callback;
  }

  createButton() {
    if (this.button) return;

    const button = document.createElement('div');
    button.className = 'read-aloud-button';
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');

    const iconDiv = document.createElement('div');
    iconDiv.className = 'translate-icon floating-share';
    iconDiv.id = 'translate-icon';

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('icons/voice.png');
    img.alt = 'Read Aloud';

    iconDiv.appendChild(img);
    button.appendChild(iconDiv);

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.onToggleReading) {
        this.onToggleReading();
      }
    });

    button.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
        if (this.onToggleReading) {
          this.onToggleReading();
        }
      }
    });

    document.body.appendChild(button);
    this.button = button;
  }

  removeButton() {
    if (this.button && this.button.parentNode) {
      this.button.parentNode.removeChild(this.button);
      this.button = null;
    }
  }

  updateButtonState(isSpeaking, languageName, isReadingMode) {
    if (!this.button) return;

    // Update classes for visual feedback
    if (isReadingMode) {
      this.button.classList.add('reading-mode');
      this.button.classList.add('active'); // Add active class for visual feedback
    } else {
      this.button.classList.remove('reading-mode');
      this.button.classList.remove('active');
    }

    if (isSpeaking) {
      this.button.classList.add('speaking');
    } else {
      this.button.classList.remove('speaking');
    }

    // Update tooltip with emoji indicators
    if (isSpeaking) {
      this.button.setAttribute('title', `🔊 Speaking ${languageName} - Click to stop`);
    } else if (isReadingMode) {
      this.button.setAttribute('title', `✅ Reading mode ON - Click to turn off`);
    } else {
      this.button.setAttribute('title', `⭕ Reading mode OFF - Click to turn on`);
    }

    // Update aria label
    this.button.setAttribute(
      'aria-label',
      isReadingMode
        ? 'Reading mode is on. Click to turn off.'
        : 'Reading mode is off. Click to turn on.'
    );
  }
}
