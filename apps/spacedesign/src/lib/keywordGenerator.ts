import { stemmer } from "stemmer";
import type { PostForRecommendation } from "$types";

export interface KeywordExtractionOptions {
  maxKeywords?: number;
  minWordLength?: number;
  includeThemes?: boolean;
}

export interface KeywordResult {
  original: string;
  stemmed: string;
  frequency: number;
}

export class KeywordGenerator {
  private stopWords: Set<string>;
  private thematicWords: Record<string, string[]>;

  constructor() {
    this.stopWords = new Set([
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "as",
      "is",
      "was",
      "are",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "must",
      "can"
    ]);

    this.thematicWords = {
      psychoanalysis: [
        "psychoanalysis",
        "lacan",
        "freud",
        "unconscious",
        "desire",
        "subject",
        "clinical",
        "analysis"
      ],
      cinema: [
        "cinema",
        "film",
        "movie",
        "screen",
        "gaze",
        "narrative",
        "director",
        "cinematic"
      ],
      art: [
        "art",
        "artist",
        "creation",
        "aesthetic",
        "style",
        "painting",
        "performance"
      ],
      technology: [
        "algorithm",
        "machine",
        "digital",
        "code",
        "software",
        "hardware",
        "programming"
      ],
      philosophy: [
        "philosophy",
        "enlightenment",
        "dialectic",
        "consciousness",
        "kant",
        "hegel"
      ],
      clinic: [
        "clinic",
        "therapy",
        "treatment",
        "analysis",
        "supervision",
        "patient"
      ],
      topology: [
        "topology",
        "structure",
        "schema",
        "graph",
        "node",
        "borromean"
      ],
      gender: [
        "gender",
        "trans",
        "queer",
        "sexuality",
        "feminism",
        "lgbtq",
        "identity"
      ],
      dystopia: [
        "dystopia",
        "black mirror",
        "future",
        "technology",
        "society"
      ],
      international: [
        "arabic",
        "chinese",
        "russian",
        "german",
        "japanese",
        "korean",
        "hindi"
      ]
    };
  }

  extractKeywords(
    text: string,
    options: KeywordExtractionOptions = {}
  ): KeywordResult[] {
    const { maxKeywords = 10, minWordLength = 2 } = options;

    if (!text) return [];

    // Clean and tokenize text - preserve hyphens and special characters in words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, " ") // Keep hyphens, remove other punctuation
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > minWordLength &&
          !this.stopWords.has(word) &&
          !/^\d+$/.test(word) &&
          // Keep hyphenated words like "trans-torsion", "electronic-psychoanalytic"
          (word.includes("-") || /^[a-z]/.test(word)) // Allow hyphenated words and regular words
      );

    // Count frequencies with both original and stemmed versions
    const wordFreq: Record<
      string,
      {
        original: string;
        stemmed: string;
        frequency: number;
      }
    > = {};

    words.forEach((originalWord) => {
      // For hyphenated words, don't stem them - keep them as is
      let stemmed: string;
      if (originalWord.includes("-")) {
        stemmed = originalWord; // Keep hyphenated words intact
      } else {
        stemmed = stemmer(originalWord);
      }

      const key = stemmed; // Use stemmed as key for grouping

      if (!wordFreq[key]) {
        wordFreq[key] = {
          original: originalWord,
          stemmed,
          frequency: 0
        };
      }
      wordFreq[key].frequency++;
    });

    // Sort by frequency and return top keywords
    return Object.values(wordFreq)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, maxKeywords);
  }

  generatePostKeywords(
    post: PostForRecommendation,
    options: KeywordExtractionOptions = {}
  ): KeywordResult[] {
    // Add safety check
    if (!post || !post.title) {
      console.warn(
        "Invalid post object provided to generatePostKeywords",
        post
      );
      return [];
    }

    const allKeywords: KeywordResult[] = [];

    // Extract from title (with higher weight)
    if (post.title) {
      const titleKeywords = this.extractKeywords(
        post.title,
        { ...options, maxKeywords: 15 }
      );
      // Double the frequency for title keywords to give them more weight
      titleKeywords.forEach((kw) => {
        allKeywords.push({
          ...kw,
          frequency: kw.frequency * 2
        });
      });
    }

    // Extract from summary
    if (post.summary) {
      allKeywords.push(
        ...this.extractKeywords(post.summary, options)
      );
    }

    // Extract from content (first 1000 chars for efficiency)
    if (post.content) {
      allKeywords.push(
        ...this.extractKeywords(
          post.content.substring(0, 1000),
          options
        )
      );
    }

    // Add category/topic from URL structure as a special keyword
    const category = this.extractCategoryFromSlug(
      post.slug
    );
    if (category) {
      allKeywords.push({
        original: category,
        stemmed: category,
        frequency: 5 // Higher weight for category
      });
    }

    // Remove duplicates and sort by frequency
    const uniqueKeywords = new Map();
    allKeywords.forEach((keyword) => {
      const existing = uniqueKeywords.get(keyword.stemmed);
      if (
        !existing ||
        existing.frequency < keyword.frequency
      ) {
        uniqueKeywords.set(keyword.stemmed, keyword);
      }
    });

    // Filter out thematic words that are already covered by themes
    const thematicWordSet = new Set();
    Object.values(this.thematicWords).forEach((words) => {
      words.forEach((word) =>
        thematicWordSet.add(word.toLowerCase())
      );
    });

    const filteredKeywords = Array.from(
      uniqueKeywords.values()
    )
      .filter((keyword) => {
        // Don't include thematic words as regular keywords if they're already themes
        const isThematicWord = thematicWordSet.has(
          keyword.original.toLowerCase()
        );
        return !isThematicWord || keyword.frequency > 3; // Only keep if very frequent
      })
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, options.maxKeywords || 10);

    return filteredKeywords;
  }

  // For display purposes - get just the original words
  generateDisplayKeywords(
    post: PostForRecommendation,
    options: KeywordExtractionOptions = {}
  ): string[] {
    const keywords = this.generatePostKeywords(
      post,
      options
    );

    // Remove duplicates and ensure variety
    const uniqueKeywords = new Set<string>();
    const result: string[] = [];

    keywords.forEach((keyword) => {
      if (
        !uniqueKeywords.has(keyword.original.toLowerCase())
      ) {
        uniqueKeywords.add(keyword.original.toLowerCase());
        result.push(keyword.original);
      }
    });

    return result.slice(0, options.maxKeywords || 8);
  }

  // For recommendation purposes - get just the stemmed words
  generateStemmedKeywords(
    post: PostForRecommendation,
    options: KeywordExtractionOptions = {}
  ): string[] {
    const keywords = this.generatePostKeywords(
      post,
      options
    );
    return keywords.map((k) => k.stemmed);
  }

  extractCategoryFromSlug(slug: string): string | null {
    if (!slug) return null;

    const matches = slug.match(/^([^-]+)-/);
    return matches ? matches[1].toLowerCase() : null;
  }

  extractThematicKeywords(
    post: PostForRecommendation
  ): string[] {
    // Add safety check
    if (!post || !post.title) {
      console.warn(
        "Invalid post object provided to extractThematicKeywords",
        post
      );
      return [];
    }

    const themes = new Set<string>();

    const content =
      `${post.title} ${post.summary} ${post.content || ""}`.toLowerCase();

    Object.entries(this.thematicWords).forEach(
      ([theme, words]) => {
        const hasTheme = words.some((word) => {
          // Check for exact word matches or partial matches for longer phrases
          if (word.includes(" ")) {
            // For phrases like "black mirror"
            return content.includes(word.toLowerCase());
          } else {
            // For single words, check for word boundaries
            return new RegExp(
              `\\b${word.toLowerCase()}\\b`
            ).test(content);
          }
        });

        if (hasTheme) {
          themes.add(theme);
        }
      }
    );

    return Array.from(themes);
  }

  getThematicWeights(): Record<string, number> {
    return {
      psychoanalysis: 1.2,
      cinema: 1.1,
      clinic: 1.1,
      topology: 1.0,
      gender: 1.0,
      dystopia: 0.9,
      art: 0.9,
      philosophy: 0.8,
      technology: 0.8,
      international: 0.7
    };
  }
}
