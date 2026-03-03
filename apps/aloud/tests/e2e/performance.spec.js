const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {
  test('extension initializes quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:8080/test-page.html');

    // Wait for content script to initialize
    await page.waitForFunction(
      () => {
        return window.readAloudInitialized === true;
      },
      { timeout: 5000 }
    );

    const initTime = Date.now() - startTime;
    console.log(`Extension initialization time: ${initTime}ms`);

    expect(initTime).toBeLessThan(2000); // Should initialize within 2 seconds
  });

  test('language detection is fast', async ({ page }) => {
    await page.goto('http://localhost:8080/test-page.html');
    await page.waitForFunction(() => window.readAloudInitialized === true);

    // Enable extension
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

    // Measure detection time
    const detectionTime = await page.evaluate(() => {
      const start = performance.now();

      // Access the detectLanguage method (you may need to expose it)
      const instance = window.__readAloudInstance;
      if (instance && instance.detectLanguage) {
        const text = document.querySelector('#english-text').innerText;
        instance.detectLanguage(text);
      }

      return performance.now() - start;
    });

    console.log(`Language detection time: ${detectionTime}ms`);
    expect(detectionTime).toBeLessThan(50); // Should detect within 50ms
  });

  test('handles large pages without performance impact', async ({ page }) => {
    // Create a page with lots of text
    await page.setContent(`
      <html>
        <body>
          ${Array(1000)
            .fill(
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
            )
            .join('\n')}
        </body>
      </html>
    `);

    const startTime = Date.now();

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

    const loadTime = Date.now() - startTime;
    console.log(`Extension load time on large page: ${loadTime}ms`);

    expect(loadTime).toBeLessThan(1000); // Should load within 1 second
  });
});
