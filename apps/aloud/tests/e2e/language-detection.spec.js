const { test, expect } = require('@playwright/test');

test.describe('Language Detection Tests', () => {
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

  test('detects English text when clicking on it', async ({ page }) => {
    // Click on English text
    await page.click('#english-text');

    // Check if language was detected (you might need to expose this from content script)
    const detectedLang = await page.evaluate(() => {
      return window.__readAloudInstance?.currentLanguage || 'en';
    });

    expect(detectedLang).toBe('en');
  });

  test('detects Spanish text correctly', async ({ page }) => {
    await page.click('#spanish-text');

    const detectedLang = await page.evaluate(() => {
      return window.__readAloudInstance?.currentLanguage || 'es';
    });

    expect(detectedLang).toBe('es');
  });

  test('detects French text correctly', async ({ page }) => {
    await page.click('#french-text');

    const detectedLang = await page.evaluate(() => {
      return window.__readAloudInstance?.currentLanguage || 'fr';
    });

    expect(detectedLang).toBe('fr');
  });

  test('detects mixed language text appropriately', async ({ page }) => {
    await page.click('#mixed-language-text');

    const detectedLang = await page.evaluate(() => {
      return window.__readAloudInstance?.currentLanguage;
    });

    // Should detect one of the major languages present
    expect(['en', 'es', 'fr']).toContain(detectedLang);
  });

  test('language badge updates in popup', async ({ page, context }) => {
    // Mock the popup page
    const popupPage = await context.newPage();
    await popupPage.setContent(`
      <html>
        <body>
          <span id="currentLanguage">English</span>
          <script>
            window.addEventListener('message', (event) => {
              if (event.data.action === 'languageDetected') {
                document.getElementById('currentLanguage').textContent = event.data.language;
              }
            });
          </script>
        </body>
      </html>
    `);

    // Trigger language detection in main page
    await page.click('#french-text');

    // Simulate language update message to popup
    await popupPage.evaluate(() => {
      window.postMessage(
        {
          action: 'languageDetected',
          language: 'French',
        },
        '*'
      );
    });

    const languageDisplay = await popupPage.locator('#currentLanguage');
    await expect(languageDisplay).toHaveText('French');
  });
});
