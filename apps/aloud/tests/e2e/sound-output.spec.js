const { test, expect } = require('@playwright/test');

test.describe('Sound Output Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/test-page.html');
    await page.waitForTimeout(1000);

    // Enable the extension
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    await page.waitForSelector('.read-aloud-button');
  });

  test('speaks when single clicking on text', async ({ page }) => {
    // Mock the speech synthesis
    await page.evaluate(() => {
      window.speechLog = [];

      // Mock speech synthesis
      const originalSpeak = window.speechSynthesis.speak;
      window.speechSynthesis.speak = function (utterance) {
        window.speechLog.push({
          text: utterance.text,
          rate: utterance.rate,
          lang: utterance.lang,
          voice: utterance.voice?.name,
        });
        // Call original to actually speak (optional - can be commented out for silent tests)
        // originalSpeak.call(this, utterance);
      };
    });

    // Click on English text
    await page.click('#english-text');
    await page.waitForTimeout(500); // Wait for speech to be triggered

    // Check speech log
    const speechLog = await page.evaluate(() => window.speechLog);
    expect(speechLog.length).toBe(1);
    expect(speechLog[0].text).toContain('quick brown fox');
    expect(speechLog[0].rate).toBe(1.0);
  });

  test('speaks word on double click', async ({ page }) => {
    await page.evaluate(() => {
      window.speechLog = [];

      window.speechSynthesis.speak = function (utterance) {
        window.speechLog.push({
          text: utterance.text,
          rate: utterance.rate,
        });
      };
    });

    // Double click on a specific word
    await page.dblclick('#english-text', { position: { x: 50, y: 10 } });
    await page.waitForTimeout(500);

    const speechLog = await page.evaluate(() => window.speechLog);
    expect(speechLog.length).toBe(1);
    expect(speechLog[0].text.split(' ').length).toBeLessThan(5); // Should be a word or short phrase
  });

  test('speaks line on hover after delay', async ({ page }) => {
    await page.evaluate(() => {
      window.speechLog = [];

      window.speechSynthesis.speak = function (utterance) {
        window.speechLog.push({
          text: utterance.text,
          rate: utterance.rate,
        });
      };
    });

    // Hover over text
    await page.hover('#spanish-text');

    // Wait for hover delay (500ms) plus a bit
    await page.waitForTimeout(800);

    const speechLog = await page.evaluate(() => window.speechLog);
    expect(speechLog.length).toBe(1);
    expect(speechLog[0].text).toContain('rápido zorro');
  });

  test('cancels previous speech when new text is triggered', async ({ page }) => {
    await page.evaluate(() => {
      window.speechLog = [];
      window.cancelCount = 0;

      const originalCancel = window.speechSynthesis.cancel;
      window.speechSynthesis.cancel = function () {
        window.cancelCount++;
        originalCancel.call(this);
      };

      window.speechSynthesis.speak = function (utterance) {
        window.speechLog.push({
          text: utterance.text,
          rate: utterance.rate,
        });
      };
    });

    // Trigger first speech
    await page.click('#english-text');
    await page.waitForTimeout(100);

    // Trigger second speech immediately
    await page.click('#spanish-text');
    await page.waitForTimeout(500);

    const cancelCount = await page.evaluate(() => window.cancelCount);
    const speechLog = await page.evaluate(() => window.speechLog);

    expect(cancelCount).toBeGreaterThan(0);
    expect(speechLog.length).toBe(2); // Should have both attempts
  });

  test('respects rate setting', async ({ page }) => {
    // Set rate to 1.5 via popup
    await page.evaluate(() => {
      chrome.storage.local.set({ rate: 1.5 });

      window.speechLog = [];
      window.speechSynthesis.speak = function (utterance) {
        window.speechLog.push({
          text: utterance.text,
          rate: utterance.rate,
        });
      };
    });

    // Reload to apply new rate
    await page.reload();
    await page.waitForTimeout(1000);

    // Re-enable
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    await page.waitForSelector('.read-aloud-button');

    // Trigger speech
    await page.click('#english-text');
    await page.waitForTimeout(500);

    const speechLog = await page.evaluate(() => window.speechLog);
    expect(speechLog.length).toBe(1);
    expect(speechLog[0].rate).toBe(1.5);
  });
});
