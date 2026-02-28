import { json } from "@sveltejs/kit";
const SERVERS = [
  "https://translate.argosopentech.com",
  "https://libretranslate.com",
  "https://translate.terraprint.co"
];
const LANGUAGE_MAPPING = {
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
const POST = async ({ request }) => {
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
          error: "Missing required fields: text, sourceLang, targetLang"
        },
        { status: 400 }
      );
    }
    const source = LANGUAGE_MAPPING[sourceLang] || sourceLang;
    const target = LANGUAGE_MAPPING[targetLang] || targetLang;
    if (source === target) {
      return json({
        success: true,
        translation: text,
        source: text,
        sourceLang: source,
        targetLang: target
      });
    }
    let lastError = null;
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
        lastError = error;
        console.warn(`Server ${server} failed:`, error);
        continue;
      }
    }
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
async function translateWithServer(server, text, source, target) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    1e4
  );
  try {
    const response = await fetch(`${server}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        q: text,
        source,
        target,
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
const GET = async ({ url }) => {
  const text = url.searchParams.get("text");
  const sourceLang = url.searchParams.get("source");
  const targetLang = url.searchParams.get("target");
  if (!text || !sourceLang || !targetLang) {
    return json(
      {
        success: false,
        error: "Missing query parameters: text, source, target"
      },
      { status: 400 }
    );
  }
  return POST({
    request: new Request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sourceLang, targetLang })
    })
  });
};
export {
  GET,
  POST
};
