// Helper functions for Playwright tests
class ExtensionTestHelper {
  constructor(page) {
    this.page = page;
  }

  async loadTestPage() {
    await this.page.goto('http://localhost:8080/test-page.html');
    await this.page.waitForTimeout(1000);
  }

  async enableExtension() {
    await this.page.evaluate(() => {
      // Simulate enabling from popup
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    // Wait for button to appear
    await this.page.waitForSelector('.read-aloud-button', {
      state: 'visible',
      timeout: 10000,
    });
  }

  async disableExtension() {
    await this.page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: false,
        },
        '*'
      );
    });

    // Wait for button to disappear
    await this.page.waitForSelector('.read-aloud-button', {
      state: 'detached',
      timeout: 10000,
    });
  }

  async mockSpeechSynthesis() {
    await this.page.evaluate(() => {
      window.speechLog = [];
      window.speechSynthesis = window.speechSynthesis || {};

      // Mock speak
      window.speechSynthesis.speak = function (utterance) {
        window.speechLog.push({
          text: utterance.text,
          rate: utterance.rate,
          lang: utterance.lang,
          timestamp: Date.now(),
        });

        // Trigger events
        if (utterance.onstart) utterance.onstart();
        if (utterance.onend) setTimeout(() => utterance.onend(), 100);
      };

      // Mock cancel
      window.speechSynthesis.cancel = function () {
        window.cancelCalled = true;
      };

      // Mock getVoices
      window.speechSynthesis.getVoices = function () {
        return [
          { name: 'Test English', lang: 'en-US', localService: true, default: true },
          { name: 'Test Spanish', lang: 'es-ES', localService: true },
        ];
      };

      // Mock SpeechSynthesisUtterance
      window.SpeechSynthesisUtterance = function (text) {
        this.text = text;
        this.rate = 1.0;
        this.lang = 'en-US';
        this.voice = null;
        this.onstart = null;
        this.onend = null;
        this.onerror = null;
      };
    });
  }

  async getSpeechLog() {
    return await this.page.evaluate(() => window.speechLog || []);
  }

  async clearSpeechLog() {
    await this.page.evaluate(() => {
      window.speechLog = [];
      window.cancelCalled = false;
    });
  }

  async waitForSpeech(timeout = 2000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const log = await this.getSpeechLog();
      if (log.length > 0) return log;
      await this.page.waitForTimeout(100);
    }
    throw new Error('Speech timeout - no speech detected');
  }
}

module.exports = { ExtensionTestHelper };
