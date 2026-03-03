const { test, expect } = require('@playwright/test');
const { ExtensionTestHelper } = require('./helpers/extension-helper');

test.describe('User Interactions', () => {
  let helper;

  test.beforeEach(async ({ page }) => {
    helper = new ExtensionTestHelper(page);
    await helper.loadTestPage();
    await helper.mockSpeechSynthesis();
  });

  test('user can toggle extension on/off via popup', async ({ page }) => {
    // Initially button should not exist
    let buttonCount = await page.locator('.read-aloud-button').count();
    expect(buttonCount).toBe(0);

    // Enable via popup
    await helper.enableExtension();

    // Button should now be visible
    buttonCount = await page.locator('.read-aloud-button').count();
    expect(buttonCount).toBe(1);

    // Disable via popup
    await helper.disableExtension();

    // Button should be gone
    buttonCount = await page.locator('.read-aloud-button').count();
    expect(buttonCount).toBe(0);
  });

  test('user can adjust speed via popup', async ({ page }) => {
    await helper.enableExtension();

    // Set rate via storage (simulating popup)
    await page.evaluate(() => {
      chrome.storage.local.set({ rate: 2.0 });

      // Simulate rate update message
      window.postMessage(
        {
          action: 'updateRate',
          rate: 2.0,
        },
        '*'
      );
    });

    // Click to trigger speech
    await page.click('#english-text');
    await helper.waitForSpeech();

    const speechLog = await helper.getSpeechLog();
    expect(speechLog[0].rate).toBe(2.0);
  });

  test('selected text takes priority over click', async ({ page }) => {
    await helper.enableExtension();

    // Select specific text
    await page.evaluate(() => {
      const range = document.createRange();
      const element = document.querySelector('#english-text');
      const textNode = element.firstChild;
      range.setStart(textNode, 10);
      range.setEnd(textNode, 30);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });

    // Click (should read selected text)
    await page.click('#english-text');
    await helper.waitForSpeech();

    const speechLog = await helper.getSpeechLog();
    expect(speechLog[0].text.length).toBeLessThan(100);
  });

  test('interactive elements do not trigger reading', async ({ page }) => {
    await helper.enableExtension();

    // Click on button
    await page.click('#test-button');
    await page.waitForTimeout(500);

    // Click on input
    await page.click('#test-input');
    await page.waitForTimeout(500);

    // Click on link
    await page.click('#test-link');
    await page.waitForTimeout(500);

    const speechLog = await helper.getSpeechLog();
    expect(speechLog.length).toBe(0);
  });

  test('hover timer resets when moving between elements', async ({ page }) => {
    await helper.enableExtension();

    // Hover over first element
    await page.hover('#english-text');
    await page.waitForTimeout(300); // Half of hover delay

    // Move to second element before timer completes
    await page.hover('#spanish-text');
    await page.waitForTimeout(300);

    // Move to third element
    await page.hover('#french-text');
    await page.waitForTimeout(600); // Wait for full hover delay

    const speechLog = await helper.getSpeechLog();
    expect(speechLog.length).toBe(1); // Only the last hover should trigger
  });

  test('double click reads word, single click reads line', async ({ page }) => {
    await helper.enableExtension();

    // Single click
    await page.click('#english-text');
    await helper.waitForSpeech();
    await helper.clearSpeechLog();

    // Double click
    await page.dblclick('#english-text', { position: { x: 50, y: 10 } });
    await helper.waitForSpeech();

    const speechLog = await helper.getSpeechLog();
    expect(speechLog.length).toBe(1);

    // The double click should read a word (short text)
    expect(speechLog[0].text.split(' ').length).toBeLessThan(5);
  });
});
