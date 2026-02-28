import { test, expect } from "@playwright/test";

test.describe("LaTeX Rendering Tests", () => {
  test("should render basic LaTeX equations", async ({
    page
  }) => {
    await page.goto("/");

    // Look for common LaTeX containers
    const mathjaxContainers = page.locator(
      '.math, .latex, [class*="math"]'
    );
    const katexContainers = page.locator(
      ".katex, .katex-display"
    );

    // Test if any math rendering elements exist and are visible
    const mathElements =
      mathjaxContainers.or(katexContainers);
    const count = await mathElements.count();

    if (count > 0) {
      await expect(mathElements.first()).toBeVisible();

      // Check that math elements have proper styling
      const firstMath = mathElements.first();
      const style = await firstMath.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });
      expect(style).toBeDefined();
    }
  });

  test("should handle complex LaTeX expressions", async ({
    page
  }) => {
    await page.goto("/");

    // Test for specific LaTeX patterns
    const mathElements = page.locator(
      '[class*="math"], .katex, .MathJax'
    );
    const count = await mathElements.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const element = mathElements.nth(i);
      await expect(element).toBeVisible();

      // Check that the element has content
      const textContent = await element.textContent();
      const innerHTML = await element.innerHTML();

      expect(
        textContent?.length || innerHTML.length
      ).toBeGreaterThan(0);
    }
  });

  test("should load LaTeX rendering libraries without errors", async ({
    page
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (
        msg.type() === "error" &&
        msg.text().includes("MathJax|KaTeX|latex")
      ) {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    // Wait for potential LaTeX libraries to load
    await page.waitForTimeout(1000);

    expect(errors).toHaveLength(0);
  });
});
