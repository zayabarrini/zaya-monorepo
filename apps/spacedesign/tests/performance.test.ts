import { test, expect } from "@playwright/test";

test.describe("Performance Tests", () => {
  test("should load within performance budget", async ({
    page
  }) => {
    await page.goto("/");

    const performanceTiming = await page.evaluate(() =>
      JSON.stringify(performance.timing)
    );

    const timing = JSON.parse(performanceTiming);
    const loadTime =
      timing.loadEventEnd - timing.navigationStart;

    // Budget: 3 seconds for load time
    expect(loadTime).toBeLessThan(3000);
  });

  test("should have optimized assets", async ({ page }) => {
    await page.goto("/");

    const resources = await page.evaluate(() =>
      performance.getEntriesByType("resource").map((r) => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize || 0
      }))
    );

    // Check for large resources
    const largeResources = resources.filter(
      (r) => r.size > 500000
    ); // 500KB
    expect(largeResources).toHaveLength(0);
  });
});
