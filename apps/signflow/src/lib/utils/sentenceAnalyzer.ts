// src/lib/utils/sentenceAnalyzer.ts

// Simple tokenizer for different languages
export function tokenizeSentence(
  sentence: string,
  language: string
): string[] {
  if (!sentence) return [];

  // Remove punctuation and split by spaces
  const clean = sentence
    .replace(/[.,!?;:()\[\]{}'"`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Handle different language tokenization rules
  switch (language) {
    case "ch": // Chinese - split by characters
      return clean.split("").filter((char) => char.trim());
    case "ja": // Japanese - split by characters (could use mecab for better tokenization)
      return clean.split("").filter((char) => char.trim());
    case "ko": // Korean - split by spaces, but keep 한글 together
      return clean.split(" ").filter((word) => word);
    default: // Most languages - split by spaces
      return clean.split(" ").filter((word) => word);
  }
}

// Calculate similarity between sentences (for grouping translations)
export function calculateSimilarity(
  str1: string,
  str2: string
): number {
  const set1 = new Set(str1.toLowerCase().split(/\s+/));
  const set2 = new Set(str2.toLowerCase().split(/\s+/));

  const intersection = new Set(
    [...set1].filter((x) => set2.has(x))
  );
  const union = new Set([...set1, ...set2]);

  return union.size === 0
    ? 0
    : intersection.size / union.size;
}

// Group sentences by meaning/similarity
export function groupSentencesByMeaning(
  sentences: any[],
  threshold = 0.3
): any[][] {
  const groups: any[][] = [];
  const used = new Set<number>();

  sentences.forEach((sentence, i) => {
    if (used.has(i)) return;

    const group = [sentence];
    used.add(i);

    sentences.forEach((other, j) => {
      if (i === j || used.has(j)) return;

      let maxSimilarity = 0;
      // Compare across all language fields
      Object.keys(sentence).forEach((key) => {
        if (key !== "id" && sentence[key] && other[key]) {
          const similarity = calculateSimilarity(
            String(sentence[key]),
            String(other[key])
          );
          maxSimilarity = Math.max(
            maxSimilarity,
            similarity
          );
        }
      });

      if (maxSimilarity > threshold) {
        group.push(other);
        used.add(j);
      }
    });

    groups.push(group);
  });

  return groups;
}
