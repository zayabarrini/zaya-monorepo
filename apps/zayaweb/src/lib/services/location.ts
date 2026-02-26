export interface GeoInfo {
  country: string;
  city?: string;
  region?: string;
  timezone?: string;
}

export class LocationService {
  private static instance: LocationService;
  private cachedGeo: GeoInfo | null = null;
  private cacheExpiry = 0;
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async detectCountry(): Promise<string> {
    // Check cache first
    if (this.cachedGeo && Date.now() < this.cacheExpiry) {
      return this.cachedGeo.country;
    }

    try {
      // Try multiple detection methods
      const geo = await Promise.any([
        this.detectByGeoIP(),
        this.detectByAcceptLanguage(),
        this.detectByTimeZone()
      ]);

      if (geo) {
        this.cachedGeo = geo;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        return geo.country;
      }
    } catch (error) {
      console.warn("Location detection failed:", error);
    }

    return "US"; // Default fallback
  }

  private async detectByGeoIP(): Promise<GeoInfo | null> {
    try {
      const response = await fetch("/api/geo");
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  private detectByAcceptLanguage(): GeoInfo | null {
    if (typeof window === "undefined") return null;

    const languages = navigator.languages || [
      navigator.language
    ];
    const countryMap: Record<string, string> = {
      "de-CH": "CH",
      "fr-CH": "CH",
      "it-CH": "CH",
      "en-GB": "GB",
      "en-US": "US",
      "en-AU": "AU",
      "hi-IN": "IN",
      "ta-IN": "IN",
      "te-IN": "IN",
      "ja-JP": "JP",
      "ko-KR": "KR",
      "zh-CN": "CN"
    };

    for (const lang of languages) {
      if (countryMap[lang]) {
        return { country: countryMap[lang] };
      }
    }

    return null;
  }

  private detectByTimeZone(): GeoInfo | null {
    if (typeof Intl === "undefined") return null;

    const tz =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzCountryMap: Record<string, string> = {
      "Europe/Zurich": "CH",
      "Asia/Kolkata": "IN",
      "Asia/Tokyo": "JP",
      "Australia/Sydney": "AU",
      "America/New_York": "US",
      "Europe/London": "GB",
      "Europe/Berlin": "DE",
      "Europe/Paris": "FR"
    };

    const country = tzCountryMap[tz];
    return country ? { country, timezone: tz } : null;
  }

  async getCurrencyForCountry(
    country: string
  ): Promise<string> {
    const currencyMap: Record<string, string> = {
      CH: "CHF",
      IN: "INR",
      JP: "JPY",
      GB: "GBP",
      AU: "AUD",
      CA: "CAD",
      CN: "CNY",
      KR: "KRW",
      BR: "BRL",
      MX: "MXN",
      EU: "EUR",
      US: "USD"
    };

    return currencyMap[country] || "USD";
  }

  getCountryName(countryCode: string): string {
    const names = new Intl.DisplayNames(["en"], {
      type: "region"
    });
    try {
      return names.of(countryCode) || countryCode;
    } catch {
      return countryCode;
    }
  }
}
