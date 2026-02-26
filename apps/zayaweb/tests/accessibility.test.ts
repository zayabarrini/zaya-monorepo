import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test("should not have accessibility violations", async ({
    page
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({
      page
    })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa"
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper semantic HTML", async ({
    page
  }) => {
    await page.goto("/");

    // Check for proper heading structure
    const headings = page.locator("h1, h2, h3, h4, h5, h6");
    const headingCount = await headings.count();

    if (headingCount > 0) {
      // Should have at least one h1
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBeGreaterThanOrEqual(1);

      // Headings should be in order
      const headingLevels = await headings.evaluateAll(
        (els) => els.map((el) => parseInt(el.tagName[1]))
      );

      let currentLevel = headingLevels[0];
      for (let i = 1; i < headingLevels.length; i++) {
        // Allow same level or one level deeper
        expect(headingLevels[i]).toBeLessThanOrEqual(
          currentLevel + 1
        );
        currentLevel = headingLevels[i];
      }
    }
  });
});
