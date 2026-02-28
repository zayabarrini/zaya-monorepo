// src/routes/api/translate/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// Public LibreTranslate servers
const SERVERS = [
  "https://translate.argosopentech.com",
  "https://libretranslate.com",
  "https://translate.terraprint.co"
];

// Language code mapping
const LANGUAGE_MAPPING: Record<string, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
  pt: "pt",
  ru: "ru",
  ar: "ar",
  hi: "hi",
  zh: "zh",
  ja: "ja",
  ko: "ko",
  pl: "pl",
  el: "el",
  he: "he"
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const {
      text,
      sourceLang,
      targetLang,
      type = "word"
    } = await request.json();

    if (!text || !sourceLang || !targetLang) {
      return json(
        {
          success: false,
          error:
            "Missing required fields: text, sourceLang, targetLang"
        },
        { status: 400 }
      );
    }

    // Map language codes
    const source =
      LANGUAGE_MAPPING[sourceLang] || sourceLang;
    const target =
      LANGUAGE_MAPPING[targetLang] || targetLang;

    if (source === target) {
      return json({
        success: true,
        translation: text,
        source: text,
        sourceLang: source,
        targetLang: target
      });
    }

    // Try each server until one works
    let lastError: Error | null = null;

    for (const server of SERVERS) {
      try {
        const translation = await translateWithServer(
          server,
          text,
          source,
          target
        );

        return json({
          success: true,
          translation,
          source: text,
          sourceLang: source,
          targetLang: target,
          server,
          type
        });
      } catch (error) {
        lastError = error as Error;
        console.warn(`Server ${server} failed:`, error);
        continue;
      }
    }

    // All servers failed
    return json(
      {
        success: false,
        error: `All translation servers failed: ${lastError?.message}`,
        source: text,
        sourceLang: source,
        targetLang: target
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Translation API error:", error);
    return json(
      {
        success: false,
        error: "Internal server error"
      },
      { status: 500 }
    );
  }
};

async function translateWithServer(
  server: string,
  text: string,
  source: string,
  target: string
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    10000
  ); // 10 second timeout

  try {
    const response = await fetch(`${server}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: source,
        target: target,
        format: "text",
        api_key: ""
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${await response.text()}`
      );
    }

    const data = await response.json();

    if (data.translatedText) {
      return data.translatedText;
    } else {
      throw new Error("No translation in response");
    }
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

// Also support GET for simple translations
export const GET: RequestHandler = async ({ url }) => {
  const text = url.searchParams.get("text");
  const sourceLang = url.searchParams.get("source");
  const targetLang = url.searchParams.get("target");

  if (!text || !sourceLang || !targetLang) {
    return json(
      {
        success: false,
        error:
          "Missing query parameters: text, source, target"
      },
      { status: 400 }
    );
  }

  // Use POST handler logic
  return POST({
    request: new Request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sourceLang, targetLang })
    })
  } as any);
};
