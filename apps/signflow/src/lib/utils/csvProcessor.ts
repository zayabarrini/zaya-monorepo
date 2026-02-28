// src/lib/utils/csvProcessor.ts
import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync";

export async function loadMultilingualCSV(
  filePath: string,
  options: { useCache?: boolean } = {}
): Promise<any[]> {
  const { useCache = true } = options;

  // Cache implementation
  const cache = new Map<
    string,
    { data: any[]; timestamp: number }
  >();
  const cacheKey = filePath;
  const cacheDuration = 5 * 60 * 1000; // 5 minutes

  if (useCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (Date.now() - cached.timestamp < cacheDuration) {
      return cached.data;
    }
  }

  try {
    console.log(`Attempting to load CSV: ${filePath}`);

    // Try multiple possible locations in order
    const possiblePaths = [
      // If filePath is already absolute
      filePath,
      // In static directory with given path
      path.join(process.cwd(), "static", filePath),
      // Just filename in static directory
      path.join(
        process.cwd(),
        "static",
        path.basename(filePath)
      ),
      // With static/ prefix removed if present
      filePath.startsWith("static/")
        ? path.join(process.cwd(), filePath)
        : null,
      // Just in project root (for development)
      path.join(process.cwd(), filePath)
    ].filter(Boolean) as string[];

    console.log("Trying paths:", possiblePaths);

    let absolutePath = "";
    let fileContent = "";

    // Try each possible path
    for (const possiblePath of possiblePaths) {
      try {
        await fs.access(possiblePath);
        absolutePath = possiblePath;
        fileContent = await fs.readFile(
          absolutePath,
          "utf-8"
        );
        console.log(`Found file at: ${absolutePath}`);
        break;
      } catch (err) {
        // Continue to next path
        continue;
      }
    }

    if (!fileContent) {
      throw new Error(
        `Could not find CSV file. Tried: ${possiblePaths.join(", ")}`
      );
    }

    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    // Add id to each record
    const recordsWithId = records.map(
      (record: any, index: number) => ({
        ...record,
        id: index + 1
      })
    );

    if (useCache) {
      cache.set(cacheKey, {
        data: recordsWithId,
        timestamp: Date.now()
      });
    }

    console.log(
      `Successfully loaded ${recordsWithId.length} records`
    );
    return recordsWithId;
  } catch (error) {
    console.error(`Error loading CSV ${filePath}:`, error);

    // Provide more helpful error
    const projectRoot = process.cwd();
    throw new Error(
      `Failed to load CSV: ${filePath}\n` +
        `Project root: ${projectRoot}\n` +
        `Static directory: ${path.join(projectRoot, "static")}\n` +
        `Make sure the file exists in static/ directory.`
    );
  }
}
