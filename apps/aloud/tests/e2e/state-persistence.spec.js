const { test, expect } = require('@playwright/test');
const { ExtensionTestHelper } = require('./helpers/extension-helper');

test.describe('State Persistence Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto('http://localhost:8080/test-page.html');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (chrome?.storage?.local) {
          chrome.storage.local.clear(resolve);
        } else {
          // Mock storage for test environment
          window.localStorage.clear();
          resolve();
        }
      });
    });
  });

  test('remembers enabled state after page reload', async ({ page }) => {
    const helper = new ExtensionTestHelper(page);
    await helper.loadTestPage();

    // Set enabled state
    await page.evaluate(() => {
      chrome.storage.local.set({ isSpeakingMode: true });
    });

    // Reload page
    await page.reload();
    await page.waitForTimeout(2000); // Wait for content script to load

    // Check if button appears (should be created from stored state)
    const button = await page.locator('.read-aloud-button');
    await expect(button).toBeVisible({ timeout: 10000 });
  });

  test('remembers disabled state after page reload', async ({ page }) => {
    const helper = new ExtensionTestHelper(page);
    await helper.loadTestPage();

    // Set disabled state
    await page.evaluate(() => {
      chrome.storage.local.set({ isSpeakingMode: false });
    });

    // Reload page
    await page.reload();
    await page.waitForTimeout(2000);

    // Button should not be visible
    const buttonCount = await page.locator('.read-aloud-button').count();
    expect(buttonCount).toBe(0);
  });

  test('remembers speed setting after page reload', async ({ page }) => {
    const helper = new ExtensionTestHelper(page);
    await helper.loadTestPage();

    // Set custom speed
    await page.evaluate(() => {
      chrome.storage.local.set({ rate: 1.8 });
    });

    // Reload and enable
    await page.reload();
    await page.waitForTimeout(2000);
    await helper.enableExtension();

    // Mock speech to check rate
    await helper.mockSpeechSynthesis();

    // Click to trigger speech
    await page.click('#english-text');
    await helper.waitForSpeech();

    const speechLog = await helper.getSpeechLog();
    expect(speechLog[0].rate).toBe(1.8);
  });

  test('state persists across different tabs', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    const helper1 = new ExtensionTestHelper(page1);
    const helper2 = new ExtensionTestHelper(page2);

    // Enable on first page
    await helper1.loadTestPage();
    await helper1.enableExtension();

    // Open second page - should have button visible from stored state
    await helper2.loadTestPage();
    await page2.waitForTimeout(2000); // Wait for content script to load

    const button = await page2.locator('.read-aloud-button');
    await expect(button).toBeVisible({ timeout: 10000 });
  });

  test('state persists after browser restart (simulated)', async ({ browser }) => {
    // Create first context and enable
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const helper1 = new ExtensionTestHelper(page1);

    await helper1.loadTestPage();
    await helper1.enableExtension();

    // Save the storage state
    const storageState = await context1.storageState();
    await context1.close();

    // Create new context with preserved storage
    const context2 = await browser.newContext({ storageState });
    const page2 = await context2.newPage();
    const helper2 = new ExtensionTestHelper(page2);

    await helper2.loadTestPage();
    await page2.waitForTimeout(2000);

    const button = await page2.locator('.read-aloud-button');
    await expect(button).toBeVisible({ timeout: 10000 });

    await context2.close();
  });
});
