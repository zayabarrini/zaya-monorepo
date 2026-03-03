import { UIManager } from './UIManager.js';
import { SpeechManager } from './SpeechManager.js';
import { LanguageDetector } from './LanguageDetector.js';
import { EventHandler } from './EventHandler.js';
import { log } from './utils.js';

export class ReadAloud {
  constructor(languagePatterns) {
    this.languageDetector = new LanguageDetector(languagePatterns);
    this.speechManager = new SpeechManager(this.languageDetector);
    this.uiManager = new UIManager();
    this.eventHandler = new EventHandler(this.speechManager, (languageName) =>
      this.onLanguageDetected(languageName)
    );

    this.isExtensionEnabled = false;
    this.isReadingMode = false;
    this.messageListener = null;

    // Set up speech callbacks
    this.speechManager.onStart = (languageName) => {
      log(`Speech started in ${languageName}`);
      this.uiManager.updateButtonState(true, languageName, this.isReadingMode);
    };

    this.speechManager.onEnd = () => {
      log('Speech ended');
      this.uiManager.updateButtonState(
        false,
        this.languageDetector.getLanguageName(this.speechManager.currentLanguage),
        this.isReadingMode
      );
    };

    this.speechManager.onVoiceUnavailable = (languageName) => {
      this.showVoiceUnavailableFeedback(languageName);
    };

    // Connect UI callbacks
    this.uiManager.setReadingToggleCallback(() => this.toggleReadingMode());

    this.init();
  }

  async init() {
    await this.requestInitialSync();
    this.eventHandler.attachEvents();
    this.setupMessageListener();
  }

  async requestInitialSync() {
    return new Promise((resolve) => {
      try {
        chrome.runtime
          .sendMessage({ action: 'requestSync' }, (response) => {
            if (response) {
              this.isExtensionEnabled = response.isExtensionEnabled || false;
              this.isReadingMode = response.isReadingMode || false;
              this.speechManager.setRate(response.rate || 1.0);

              this.updateUI();
            }
            resolve();
          })
          .catch(() => {
            this.loadFromLocalStorage().then(resolve);
          });
      } catch (error) {
        log('Failed to request sync:', error);
        this.loadFromLocalStorage().then(resolve);
      }
    });
  }

  async loadFromLocalStorage() {
    return new Promise((resolve) => {
      try {
        chrome.storage.local.get(['isExtensionEnabled', 'isReadingMode', 'rate'], (result) => {
          this.isExtensionEnabled = result.isExtensionEnabled || false;
          this.isReadingMode = result.isReadingMode || false;
          this.speechManager.setRate(result.rate || 1.0);

          this.updateUI();
          resolve();
        });
      } catch (error) {
        log('Failed to load from storage:', error);
        resolve();
      }
    });
  }

  updateUI() {
    if (this.isExtensionEnabled) {
      this.uiManager.createButton();
    } else {
      this.uiManager.removeButton();
    }

    this.eventHandler.setEnabled(this.isReadingMode);

    const languageName = this.languageDetector.getLanguageName(this.speechManager.currentLanguage);
    this.uiManager.updateButtonState(
      this.speechManager.isSpeaking,
      languageName,
      this.isReadingMode
    );

    log('UI updated - Extension:', this.isExtensionEnabled, 'Reading Mode:', this.isReadingMode);
  }

  toggleReadingMode() {
    if (!this.isExtensionEnabled) return;

    this.isReadingMode = !this.isReadingMode;

    if (this.isReadingMode) {
      log('📢 Reading mode activated - Visual feedback ON');
    } else {
      this.speechManager.cancel();
      log('⏸️ Reading mode deactivated - Visual feedback OFF');
    }

    this.eventHandler.setEnabled(this.isReadingMode);

    const languageName = this.languageDetector.getLanguageName(this.speechManager.currentLanguage);
    this.uiManager.updateButtonState(
      this.speechManager.isSpeaking,
      languageName,
      this.isReadingMode
    );

    try {
      chrome.runtime
        .sendMessage({
          action: 'toggleReadingMode',
          enabled: this.isReadingMode,
        })
        .catch(() => {});
    } catch (error) {
      log('Failed to notify background:', error);
    }
  }

  showVoiceUnavailableFeedback(languageName) {
    if (!this.isReadingMode) return;

    const feedback = document.createElement('div');
    feedback.className = 'read-aloud-feedback';
    feedback.textContent = `🔊 Cannot read ${languageName}: No voice available for this language.`;

    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.classList.add('fade-out');
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 300);
    }, 3000);
  }

  onLanguageDetected(languageName) {
    this.uiManager.updateButtonState(
      this.speechManager.isSpeaking,
      languageName,
      this.isReadingMode
    );

    try {
      chrome.runtime
        .sendMessage({
          action: 'updateLanguage',
          language: languageName,
        })
        .catch(() => {});
    } catch (error) {
      // Ignore
    }
  }

  setupMessageListener() {
    if (this.messageListener) {
      chrome.runtime.onMessage.removeListener(this.messageListener);
    }

    this.messageListener = (message, sender, sendResponse) => {
      try {
        if (message.action === 'syncState') {
          this.isExtensionEnabled = message.isExtensionEnabled;
          this.isReadingMode = message.isReadingMode;
          this.speechManager.setRate(message.rate);

          this.updateUI();
          sendResponse({ success: true });
        }
      } catch (error) {
        log('Error handling message:', error);
        sendResponse({ success: false, error: error.message });
      }

      return true;
    };

    chrome.runtime.onMessage.addListener(this.messageListener);
  }

  destroy() {
    if (this.messageListener) {
      chrome.runtime.onMessage.removeListener(this.messageListener);
    }
    this.eventHandler.detachEvents();
    this.speechManager.cancel();
    this.uiManager.removeButton();
  }
}
