const { test, expect } = require('@playwright/test');
const { ExtensionTestHelper } = require('./helpers/extension-helper');

test.describe('Visual Feedback Tests', () => {
  let helper;

  test.beforeEach(async ({ page }) => {
    helper = new ExtensionTestHelper(page);
    await helper.loadTestPage();
    await helper.mockSpeechSynthesis();
  });

  test('popup shows correct button status', async ({ page, context }) => {
    // Mock chrome.storage for popup
    await page.evaluate(() => {
      window.chrome = window.chrome || {};
      window.chrome.storage = {
        local: {
          get: (keys, callback) => callback({ isSpeakingMode: true }),
        },
      };
    });

    await helper.enableExtension();

    // Check button has active class
    const button = await page.locator('.read-aloud-button');
    await expect(button).toHaveClass(/active/);

    // Check title attribute
    const title = await button.getAttribute('title');
    expect(title).toContain('Active');
  });

  test('button has smooth transition animation', async ({ page }) => {
    await helper.enableExtension();

    const button = await page.locator('.read-aloud-button');
    await expect(button).toBeVisible();

    // Check CSS transition
    const transition = await button.evaluate((el) => {
      return window.getComputedStyle(el).transition;
    });

    expect(transition).toContain('0.3s');
  });

  test('button has speaking animation when reading', async ({ page }) => {
    await helper.enableExtension();

    // Click to start speaking
    await page.click('#english-text');
    await helper.waitForSpeech();

    // Check for speaking class
    const button = await page.locator('.read-aloud-button');
    await expect(button).toHaveClass(/speaking/);
  });

  test('tooltip shows correct language when hovering', async ({ page }) => {
    await helper.enableExtension();

    // Click on Spanish text to set language
    await page.click('#spanish-text');
    await helper.waitForSpeech();

    // Hover over button
    const button = await page.locator('.read-aloud-button');
    await button.hover();

    // Check tooltip contains language
    const title = await button.getAttribute('title');
    expect(title.toLowerCase()).toContain('spanish');
  });
});
