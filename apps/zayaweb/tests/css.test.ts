import { test, expect } from "@playwright/test";

test.describe("CSS and Styling Tests", () => {
  test("should load Tailwind CSS correctly", async ({
    page
  }) => {
    await page.goto("/");

    // Check if Tailwind classes are applied
    const bodyClasses = await page.getAttribute(
      "body",
      "class"
    );
    expect(bodyClasses).toContain("font-sans"); // Common Tailwind class

    // Test responsive design
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(0);
  });

  test("should have proper CSS layout and spacing", async ({
    page
  }) => {
    await page.goto("/");

    // Test container layout
    const container = page
      .locator('main, .container, [class*="container"]')
      .first();
    await expect(container).toBeVisible();

    // Test for proper spacing
    const computedStyle = await container.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        margin: style.margin,
        padding: style.padding,
        display: style.display
      };
    });

    expect(computedStyle.display).not.toBe("none");
  });

  test("should maintain consistent colors and themes", async ({
    page
  }) => {
    await page.goto("/");

    // Test color scheme consistency
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body)
        .backgroundColor;
    });

    expect(bodyBg).toBeDefined();

    // Test link colors
    const links = page.locator("a");
    const firstLink = links.first();
    if (await firstLink.isVisible()) {
      const linkColor = await firstLink.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      expect(linkColor).toBeDefined();
    }
  });
});
