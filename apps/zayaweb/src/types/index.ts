import type { ComponentType } from "svelte";

export type MarkdownPost = {
  metadata: {
    title: string;
    imgUrl: string;
    youtubeId?: string;
    publishedAt: string;
    updatedAt?: string;
    summary: string;
  };
  default: ComponentType;
};

export type MarkdownPostMetadataAndSlug = {
  slug: string;
  metadata: MarkdownPost["metadata"];
};

export type PostForRecommendation = {
  slug: string;
  title: string;
  summary: string;
  content?: string;
  publishedAt: string;
  updatedAt?: string;
};

export type RecommendationResult = {
  post: PostForRecommendation;
  score: number;
  matchingKeywords: string[];
};

// types.ts
export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  items: ProductItem[];
  gradientClass: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon?: string;
}

export interface ConsultingService {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  price: string;
  deliverables: string[];
  idealClients: string[];
  outcomes: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  challenge: string;
  solution: string;
  impact: string[];
  tools: string[];
}

export interface FeministDesignPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
  applications: string[];
}
