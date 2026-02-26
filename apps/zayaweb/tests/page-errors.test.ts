import { test, expect } from "@playwright/test";

test.describe("Page Error Tests", () => {
  test("should not have console errors", async ({
    page
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto("/");

    expect(errors).toHaveLength(0);
  });

  test("should handle 404 pages gracefully", async ({
    page
  }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);

    // Check if custom 404 page is shown
    const notFoundText = page.locator(
      "text=404|Not Found|Page not found"
    );
    await expect(notFoundText).toBeVisible();
  });

  test("should have valid HTML structure", async ({
    page
  }) => {
    await page.goto("/");

    // Check for essential HTML elements
    await expect(page.locator("html")).toBeVisible();
    await expect(page.locator("head")).toBeVisible();
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("title")).not.toBeEmpty();

    // Check for viewport meta tag
    const viewportMeta = page.locator(
      'meta[name="viewport"]'
    );
    await expect(viewportMeta).toHaveAttribute(
      "content",
      /width=device-width/
    );
  });

  test("should have no broken images", async ({ page }) => {
    await page.goto("/");

    const brokenImages = await page.$$eval(
      "img",
      (imgs) => {
        return imgs.filter(
          (img) => !img.complete || img.naturalHeight === 0
        );
      }
    );

    expect(brokenImages).toHaveLength(0);
  });
});
