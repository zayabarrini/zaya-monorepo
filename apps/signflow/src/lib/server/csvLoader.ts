// src/lib/server/csvLoader.ts
import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { join } from "path";

const CSV_CACHE = new Map<string, any[]>();

export async function loadMultilingualCSVServer(
  filePath: string,
  options: { useCache?: boolean } = {}
): Promise<any[]> {
  const { useCache = true } = options;

  if (useCache && CSV_CACHE.has(filePath)) {
    return CSV_CACHE.get(filePath)!;
  }

  try {
    // In development AND in server context, use fs directly
    const absolutePath = join(process.cwd(), filePath);

    if (!readFileSync) {
      throw new Error("File system access not available");
    }

    const csvContent = readFileSync(absolutePath, "utf-8");

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true
    });

    // Add IDs
    const processed = records.map(
      (record: any, index: number) => ({
        id: index + 1,
        ...record
      })
    );

    CSV_CACHE.set(filePath, processed);
    return processed;
  } catch (error) {
    console.error(`Error loading CSV ${filePath}:`, error);
    throw new Error(`Failed to load CSV: ${filePath}`);
  }
}
