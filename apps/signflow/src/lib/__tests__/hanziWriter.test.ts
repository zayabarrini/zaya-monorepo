// src/lib/__tests__/hanziWriter.test.ts
/**
 * @vitest-environment jsdom
 */
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from "vitest";

describe("HanziWriter API Investigation", () => {
  let mockContainer: HTMLDivElement;
  let HanziWriter: any;

  beforeEach(async () => {
    // Setup DOM container
    mockContainer = document.createElement("div");
    mockContainer.id = "test-container";
    document.body.appendChild(mockContainer);

    // Clear module cache
    vi.resetModules();

    // Import HanziWriter
    const module = await import("hanzi-writer");
    HanziWriter = module.default;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("should load HanziWriter module", () => {
    expect(HanziWriter).toBeDefined();
    expect(typeof HanziWriter.create).toBe("function");
  });

  it("should create a writer with just character string", () => {
    const writer = HanziWriter.create(
      "test-container",
      "你",
      {
        width: 100,
        height: 100
      }
    );

    expect(writer).toBeDefined();
    expect(typeof writer.animateCharacter).toBe("function");
    expect(typeof writer.showCharacter).toBe("function");
    expect(typeof writer.hideCharacter).toBe("function");

    // Log available methods for debugging
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(writer)
    ).filter(
      (name) =>
        typeof writer[name] === "function" &&
        name !== "constructor"
    );
    console.log("Available writer methods:", methods);

    // Check if SVG was created
    const svg = document.querySelector(
      "#test-container svg"
    );
    expect(svg).toBeTruthy();
  });

  it("should test different initialization patterns", async () => {
    const mockCharData = {
      strokes: Array(7).fill({}),
      medians: Array(7).fill([]),
      radStrokes: []
    };

    const results: Record<string, any> = {};

    // Pattern 1: Character string with built-in data
    try {
      const writer = HanziWriter.create(
        "test-container",
        "你",
        {
          width: 100,
          height: 100
        }
      );
      results.pattern1 = {
        success: true,
        svgCreated: !!document.querySelector(
          "#test-container svg"
        )
      };
    } catch (e) {
      results.pattern1 = {
        success: false,
        error: String(e)
      };
    }

    // Clear container
    document.getElementById("test-container")!.innerHTML =
      "";

    // Pattern 2: charDataLoader
    try {
      const writer = HanziWriter.create(
        "test-container",
        "你",
        {
          width: 100,
          height: 100,
          charDataLoader: (
            char: string,
            onLoad: Function
          ) => {
            onLoad(mockCharData);
          }
        }
      );
      results.pattern2 = {
        success: true,
        svgCreated: !!document.querySelector(
          "#test-container svg"
        )
      };

      // Try to animate
      try {
        writer.animateCharacter();
        results.pattern2.animateSuccess = true;
      } catch (e) {
        results.pattern2.animateSuccess = false;
        results.pattern2.animateError = String(e);
      }
    } catch (e) {
      results.pattern2 = {
        success: false,
        error: String(e)
      };
    }

    // Clear container
    document.getElementById("test-container")!.innerHTML =
      "";

    // Pattern 3: Object parameter
    try {
      const writer = HanziWriter.create(
        "test-container",
        {
          character: "你",
          data: mockCharData
        },
        {
          width: 100,
          height: 100
        }
      );
      results.pattern3 = {
        success: true,
        svgCreated: !!document.querySelector(
          "#test-container svg"
        )
      };
    } catch (e) {
      results.pattern3 = {
        success: false,
        error: String(e)
      };
    }

    console.log("Test results:", results);
    expect(
      Object.values(results).some(
        (r) => r.success && r.svgCreated
      )
    ).toBe(true);
  });

  it("should inspect HanziWriter version and capabilities", () => {
    // Try to get version
    const version = HanziWriter.VERSION || "unknown";
    console.log("HanziWriter version:", version);

    // Inspect the create method signature
    const createSignature = HanziWriter.create.toString();
    console.log(
      "Create method signature:",
      createSignature.substring(0, 200)
    );

    // Create a writer to inspect its prototype
    const writer = HanziWriter.create(
      "test-container",
      "你",
      { width: 50, height: 50 }
    );
    const proto = Object.getPrototypeOf(writer);
    const methods = Object.getOwnPropertyNames(
      proto
    ).filter(
      (name) =>
        typeof writer[name] === "function" &&
        name !== "constructor"
    );

    console.log("All writer methods:", methods);

    // Check if SVG was created
    const svg = document.querySelector(
      "#test-container svg"
    );
    console.log("SVG created:", !!svg);

    // Check for specific methods
    expect(methods).toContain("animateCharacter");
    expect(methods).toContain("showCharacter");
  });
});
