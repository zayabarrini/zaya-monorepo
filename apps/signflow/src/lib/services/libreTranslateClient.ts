// Create a new file: src/lib/services/libreTranslateClient.ts
export class LibreTranslateClient {
  private servers = [
    "https://translate.argosopentech.com",
    "https://libretranslate.de",
    "https://translate.fortaleza.ifce.edu.br",
    "https://lt.vern.cc"
  ];

  private languageMap: Record<string, string> = {
    en: "en",
    eng: "en",
    de: "de",
    ger: "de",
    fr: "fr",
    fre: "fr",
    es: "es",
    spa: "es",
    it: "it",
    ita: "it",
    pt: "pt",
    por: "pt",
    ru: "ru",
    rus: "ru",
    ar: "ar",
    ara: "ar",
    hi: "hi",
    hin: "hi",
    zh: "zh",
    zho: "zh",
    ch: "zh",
    chi: "zh",
    ja: "ja",
    jpn: "ja",
    ko: "ko",
    kor: "ko",
    pl: "pl",
    pol: "pl",
    po: "pl",
    el: "el",
    ell: "el",
    gr: "el",
    gre: "el",
    he: "he",
    heb: "he",
    hb: "he",
    nl: "nl",
    nld: "nl",
    sv: "sv",
    swe: "sv",
    da: "da",
    dan: "da",
    fi: "fi",
    fin: "fi",
    no: "no",
    nor: "no",
    tr: "tr",
    tur: "tr"
  };

  private cache = new Map<string, string>();

  async translate(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<string> {
    // Normalize language codes
    const source = this.normalizeLanguageCode(sourceLang);
    const target = this.normalizeLanguageCode(targetLang);

    console.log(
      `Normalized: ${sourceLang} -> ${source}, ${targetLang} -> ${target}`
    );

    if (source === target) {
      console.log(
        "Languages are the same, returning original"
      );
      return text;
    }

    const cacheKey = `${text}_${source}_${target}`;
    if (this.cache.has(cacheKey)) {
      console.log("Using cached translation");
      return this.cache.get(cacheKey)!;
    }

    // Try each server
    for (const server of this.servers) {
      try {
        console.log(`Trying server: ${server}`);
        const result = await this.tryServer(
          server,
          text,
          source,
          target
        );
        this.cache.set(cacheKey, result);
        console.log(`Success from ${server}:`, result);
        return result;
      } catch (error) {
        console.warn(`Server ${server} failed:`, error);
        continue;
      }
    }

    throw new Error("All LibreTranslate servers failed");
  }

  private normalizeLanguageCode(code: string): string {
    const normalized = this.languageMap[code.toLowerCase()];
    if (!normalized) {
      console.warn(
        `Unknown language code: ${code}, defaulting to English`
      );
      return "en";
    }
    return normalized;
  }

  private async tryServer(
    server: string,
    text: string,
    source: string,
    target: string
  ): Promise<string> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      8000
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
          source: source,
          target: target,
          format: "text",
          api_key: "",
          alternatives: 0
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${errorText}`
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

  async detectLanguage(text: string): Promise<string> {
    for (const server of this.servers) {
      try {
        const response = await fetch(`${server}/detect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            q: text
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data[0]?.language || "en";
        }
      } catch (error) {
        continue;
      }
    }
    return "en";
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Singleton instance
export const libreTranslate = new LibreTranslateClient();
