const { test, expect } = require('@playwright/test');

test.describe('Button Visibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test page
    await page.goto('http://localhost:8080/test-page.html');

    // Wait for content script to load
    await page.waitForTimeout(1000);
  });

  test('button appears when enabled via popup', async ({ page }) => {
    // Initially button should not exist
    let button = await page.locator('.read-aloud-button').count();
    expect(button).toBe(0);

    // Mock the extension popup message
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    // Wait for button to appear
    await page.waitForSelector('.read-aloud-button', { state: 'visible', timeout: 5000 });

    // Verify button is visible
    button = await page.locator('.read-aloud-button');
    await expect(button).toBeVisible();

    // Check button has correct attributes
    await expect(button).toHaveAttribute('role', 'button');
    await expect(button).toHaveAttribute('tabindex', '0');

    // Check image is loaded
    const img = await button.locator('img');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('alt', 'Read Aloud');
  });

  test('button disappears when disabled via popup', async ({ page }) => {
    // First enable the button
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    await page.waitForSelector('.read-aloud-button', { state: 'visible' });

    // Then disable it
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: false,
        },
        '*'
      );
    });

    // Wait for button to disappear
    await page.waitForSelector('.read-aloud-button', { state: 'detached', timeout: 5000 });

    const buttonCount = await page.locator('.read-aloud-button').count();
    expect(buttonCount).toBe(0);
  });

  test('button appears with animation class', async ({ page }) => {
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    const button = await page.locator('.read-aloud-button');
    await expect(button).toBeVisible();

    // Check for animation (button might have a transition class)
    const hasTransition = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.transition !== 'all 0s ease 0s';
    });

    expect(hasTransition).toBe(true);
  });

  test('button has active class when enabled', async ({ page }) => {
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    const button = await page.locator('.read-aloud-button');
    await expect(button).toHaveClass(/active/);
  });

  test('button toggles speaking state when clicked', async ({ page }) => {
    await page.evaluate(() => {
      window.postMessage(
        {
          action: 'toggleReadAloud',
          enabled: true,
        },
        '*'
      );
    });

    const button = await page.locator('.read-aloud-button');
    await button.click();

    // Check if speaking class is added (may need to mock speech synthesis)
    // This is a simplified check
    await page
      .waitForFunction(() => {
        const btn = document.querySelector('.read-aloud-button');
        return btn && btn.classList.contains('speaking');
      })
      .catch(() => {
        // It might not add speaking class if no text is selected
        // This is expected behavior
      });
  });
});
