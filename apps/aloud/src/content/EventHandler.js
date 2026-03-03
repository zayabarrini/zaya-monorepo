import { getWordUnderCursor, getLineFromElement, isInteractiveElement, log } from './utils.js';

export class EventHandler {
  constructor(speechManager, onLanguageDetected) {
    this.speechManager = speechManager;
    this.onLanguageDetected = onLanguageDetected;
    this.isEnabled = false;

    // Timeout handlers
    this.hoverTimeout = null;
    this.clickTimeout = null;
    this.lastClickTarget = null;
    this.currentHoverElement = null;

    // Constants
    this.DOUBLE_CLICK_DELAY = 300;
    this.HOVER_DELAY = 500;
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.clearTimeouts();
    }
  }

  clearTimeouts() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }
    this.lastClickTarget = null;
    this.currentHoverElement = null;
  }

  handleClick(event) {
    if (!this.isEnabled) return;

    if (this.clickTimeout) clearTimeout(this.clickTimeout);

    if (this.lastClickTarget === event.target) {
      // Double click
      this.lastClickTarget = null;
      this.handleDoubleClick(event);
    } else {
      // Single click
      this.lastClickTarget = event.target;
      this.clickTimeout = setTimeout(() => {
        if (this.lastClickTarget === event.target) {
          this.handleSingleClick(event);
        }
        this.lastClickTarget = null;
        this.clickTimeout = null;
      }, this.DOUBLE_CLICK_DELAY);
    }
  }

  handleSingleClick(event) {
    const target = event.target;
    if (isInteractiveElement(target)) return;

    let text = '';
    const selectedText = window.getSelection()?.toString();

    if (selectedText && selectedText.trim()) {
      text = selectedText;
      log('Reading selected text:', text.substring(0, 50));
    } else {
      const lineText = getLineFromElement(target);
      if (lineText) {
        text = lineText;
        log('Reading line:', text.substring(0, 50));
      } else {
        return;
      }
    }

    this.speakText(text);
  }

  handleDoubleClick(event) {
    const target = event.target;
    if (isInteractiveElement(target)) return;

    let text = '';
    const selectedText = window.getSelection()?.toString();

    if (selectedText && selectedText.trim()) {
      text = selectedText;
      log('Reading selected text:', text);
    } else {
      const word = getWordUnderCursor(event);
      if (word) {
        text = word;
        log('Reading word:', word);
      } else {
        const elementText = target.innerText?.trim();
        if (elementText) {
          text = elementText;
          log('Reading element text:', text.substring(0, 50));
        } else {
          return;
        }
      }
    }

    this.speakText(text);
  }

  handleHover(event) {
    if (!this.isEnabled) return;

    const target = event.target;
    if (isInteractiveElement(target)) return;

    if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
    this.currentHoverElement = target;

    this.hoverTimeout = setTimeout(() => {
      if (this.currentHoverElement === target && this.isEnabled) {
        const lineText = getLineFromElement(target);
        if (lineText) {
          log('Hover reading:', lineText.substring(0, 50));
          this.speakText(lineText);
        }
      }
    }, this.HOVER_DELAY);
  }

  handleMouseLeave() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    this.currentHoverElement = null;
  }

  speakText(text) {
    this.speechManager.cancel();
    const result = this.speechManager.speak(text);
    if (result && this.onLanguageDetected) {
      this.onLanguageDetected(result.languageName);
    }
  }

  attachEvents() {
    document.addEventListener('click', (e) => this.handleClick(e));
    // document.addEventListener('mouseover', (e) => this.handleHover(e));
    // document.addEventListener('mouseout', (e) => this.handleMouseLeave(e));
  }

  detachEvents() {
    document.removeEventListener('click', (e) => this.handleClick(e));
    // document.removeEventListener('mouseover', (e) => this.handleHover(e));
    // document.removeEventListener('mouseout', (e) => this.handleMouseLeave(e));
    this.clearTimeouts();
  }
}
