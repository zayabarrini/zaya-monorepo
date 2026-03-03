const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 60000, // Increase timeout
  fullyParallel: false, // Run tests sequentially for extension testing
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1, // Use single worker for extension tests

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
        },
      },
    },
    // Temporarily disable Firefox and WebKit for debugging
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: {
    command: 'npx http-server ./tests/fixtures -p 8080',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
