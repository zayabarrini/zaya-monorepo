import { KeywordGenerator } from "./keywordGenerator.js";
import type {
  PostForRecommendation,
  RecommendationResult
} from "$types";

interface RecommendationIndex {
  keywordToPosts: Map<string, Set<string>>;
  postKeywords: Map<string, string[]>; // This will now contain stemmed keywords
  postThemes: Map<string, string[]>;
}

export interface RecommendationOptions {
  limit?: number;
  minScore?: number;
  includeContentBased?: boolean;
  weights?: {
    keywords?: number;
    themes?: number;
    category?: number;
    recency?: number;
  };
}

export class RecommendationGenerator {
  private posts: PostForRecommendation[];
  private keywordGenerator: KeywordGenerator;
  private index: RecommendationIndex;

  constructor(posts: PostForRecommendation[]) {
    this.posts = posts;
    this.keywordGenerator = new KeywordGenerator();
    console.log(
      "RecommendationGenerator - Total posts:",
      posts.length
    );
    this.index = this.buildIndex();
  }

  private buildIndex(): RecommendationIndex {
    console.log("Building recommendation index...");
    const index: RecommendationIndex = {
      keywordToPosts: new Map(),
      postKeywords: new Map(),
      postThemes: new Map()
    };

    this.posts.forEach((post) => {
      // Generate stemmed keywords for each post (for matching)
      const stemmedKeywords =
        this.keywordGenerator.generateStemmedKeywords(post);
      const themes =
        this.keywordGenerator.extractThematicKeywords(post);

      index.postKeywords.set(post.slug, stemmedKeywords);
      index.postThemes.set(post.slug, themes);

      // Add to keyword index
      stemmedKeywords.forEach((keyword) => {
        if (!index.keywordToPosts.has(keyword)) {
          index.keywordToPosts.set(keyword, new Set());
        }
        index.keywordToPosts.get(keyword)!.add(post.slug);
      });
    });

    console.log("Index built:", {
      totalKeywords: index.keywordToPosts.size,
      totalPostsWithKeywords: index.postKeywords.size,
      totalPostsWithThemes: index.postThemes.size
    });

    return index;
  }

  findSimilarPosts(
    currentPostSlug: string,
    options: RecommendationOptions = {}
  ): RecommendationResult[] {
    const {
      limit = 5,
      minScore = 0.1,
      weights = {
        keywords: 0.4,
        themes: 0.3,
        category: 0.2,
        recency: 0.1
      }
    } = options;

    console.log(
      `Finding similar posts for: ${currentPostSlug}`
    );
    console.log("Options:", options);

    const currentPost = this.posts.find(
      (p) => p.slug === currentPostSlug
    );
    if (!currentPost) {
      console.log(
        "Current post not found:",
        currentPostSlug
      );
      return [];
    }

    console.log("Current post found:", currentPost.title);

    const currentKeywords =
      this.index.postKeywords.get(currentPostSlug) || [];
    const currentThemes =
      this.index.postThemes.get(currentPostSlug) || [];
    const thematicWeights =
      this.keywordGenerator.getThematicWeights();

    console.log("Current post keywords:", currentKeywords);
    console.log("Current post themes:", currentThemes);

    const scores = new Map<
      string,
      { score: number; matchingKeywords: string[] }
    >();

    this.posts.forEach((post) => {
      if (post.slug === currentPostSlug) return;

      let score = 0;
      const postKeywords =
        this.index.postKeywords.get(post.slug) || [];
      const postThemes =
        this.index.postThemes.get(post.slug) || [];
      const matchingKeywords: string[] = [];

      // Keyword overlap
      const keywordOverlap = currentKeywords.filter(
        (kw) => {
          if (postKeywords.includes(kw)) {
            matchingKeywords.push(kw);
            return true;
          }
          return false;
        }
      ).length;

      score +=
        (keywordOverlap /
          Math.max(currentKeywords.length, 1)) *
        weights.keywords!;

      // Theme overlap with thematic weights
      const themeOverlap = currentThemes.filter((theme) => {
        if (postThemes.includes(theme)) {
          const themeWeight = thematicWeights[theme] || 1.0;
          score += themeWeight * 0.05; // Bonus for thematic matches
          return true;
        }
        return false;
      }).length;

      score +=
        (themeOverlap / Math.max(currentThemes.length, 1)) *
        weights.themes!;

      // Category similarity
      const currentCategory =
        this.keywordGenerator.extractCategoryFromSlug(
          currentPostSlug
        );
      const postCategory =
        this.keywordGenerator.extractCategoryFromSlug(
          post.slug
        );
      if (
        currentCategory &&
        postCategory &&
        currentCategory === postCategory
      ) {
        score += weights.category!;
      }

      // Recency bonus
      const currentDate = new Date(currentPost.publishedAt);
      const postDate = new Date(post.publishedAt);
      const timeDiff = Math.abs(
        currentDate.getTime() - postDate.getTime()
      );
      const recency = Math.max(
        0,
        1 - timeDiff / (30 * 24 * 60 * 60 * 1000)
      ); // 30 days
      score += recency * weights.recency!;

      if (score >= minScore) {
        scores.set(post.slug, { score, matchingKeywords });
      }
    });

    console.log(
      `Found ${scores.size} posts with scores above ${minScore}`
    );

    // Sort by score and return top posts
    const results = Array.from(scores.entries())
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, limit)
      .map(([slug, { score, matchingKeywords }]) => {
        const post = this.posts.find(
          (p) => p.slug === slug
        );
        return post
          ? {
              post: { ...post },
              score,
              matchingKeywords
            }
          : null;
      })
      .filter(
        (result): result is RecommendationResult =>
          result !== null
      );

    console.log(
      "Final recommendations:",
      results.map((r) => ({
        title: r.post.title,
        score: r.score,
        keywords: r.matchingKeywords
      }))
    );

    return results;
  }

  // Get hybrid recommendations
  getRecommendations(
    currentPostSlug: string,
    options: RecommendationOptions = {}
  ): RecommendationResult[] {
    console.log(
      "Getting hybrid recommendations for:",
      currentPostSlug
    );

    const { limit = 5, includeContentBased = true } =
      options;

    const keywordBased = this.findSimilarPosts(
      currentPostSlug,
      { ...options, limit: limit * 2 }
    );

    let allRecommendations = [...keywordBased];

    if (
      includeContentBased &&
      keywordBased.length < limit
    ) {
      console.log("Adding content-based recommendations");
      // Simple content-based fallback
      const currentPost = this.posts.find(
        (p) => p.slug === currentPostSlug
      );
      if (currentPost) {
        const contentBased = this.posts
          .filter((p) => p.slug !== currentPostSlug)
          .slice(0, limit)
          .map((post) => ({
            post: { ...post },
            score: 0.1, // Low score for fallback
            matchingKeywords: []
          }));
        allRecommendations = [
          ...allRecommendations,
          ...contentBased
        ];
      }
    }

    // Deduplicate and combine
    const uniqueRecommendations: RecommendationResult[] =
      [];
    const seenSlugs = new Set<string>([currentPostSlug]);

    allRecommendations.forEach((result) => {
      if (!seenSlugs.has(result.post.slug)) {
        seenSlugs.add(result.post.slug);
        uniqueRecommendations.push(result);
      }
    });

    // Sort by combined score and return
    const finalResults = uniqueRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    console.log(
      "Final hybrid recommendations:",
      finalResults.length
    );

    return finalResults;
  }
}
