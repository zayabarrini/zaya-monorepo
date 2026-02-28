// src/lib/utils/hanziWriterTest.ts
export async function testHanziWriterInitialization(
  charData: any
) {
  // Dynamically import HanziWriter
  const HanziWriter = (await import("hanzi-writer"))
    .default;

  const results: Record<string, any> = {};

  // Test Strategy 1: Character string with built-in data
  try {
    const container = document.createElement("div");
    container.id = "test-1";
    document.body.appendChild(container);

    const writer = HanziWriter.create("test-1", "你", {
      width: 100,
      height: 100
    });

    results.strategy1 = {
      success: true,
      writer: !!writer,
      methods: Object.getOwnPropertyNames(
        Object.getPrototypeOf(writer)
      ).filter((name) => typeof writer[name] === "function")
    };

    container.remove();
  } catch (e) {
    results.strategy1 = {
      success: false,
      error: String(e)
    };
  }

  // Test Strategy 2: charDataLoader
  try {
    const container = document.createElement("div");
    container.id = "test-2";
    document.body.appendChild(container);

    const writer = HanziWriter.create("test-2", "你", {
      width: 100,
      height: 100,
      charDataLoader: (char: string, onLoad: Function) => {
        onLoad(charData);
      }
    });

    results.strategy2 = {
      success: true,
      writer: !!writer
    };

    // Try to animate
    try {
      writer.animateCharacter();
      results.strategy2.animateSuccess = true;
    } catch (e) {
      results.strategy2.animateSuccess = false;
      results.strategy2.animateError = String(e);
    }

    container.remove();
  } catch (e) {
    results.strategy2 = {
      success: false,
      error: String(e)
    };
  }

  // Test Strategy 3: Object parameter with data
  try {
    const container = document.createElement("div");
    container.id = "test-3";
    document.body.appendChild(container);

    const writer = HanziWriter.create(
      "test-3",
      {
        character: "你",
        data: charData
      },
      {
        width: 100,
        height: 100
      }
    );

    results.strategy3 = {
      success: true,
      writer: !!writer
    };

    container.remove();
  } catch (e) {
    results.strategy3 = {
      success: false,
      error: String(e)
    };
  }

  return results;
}
