// src/lib/utils/typography.ts

export const typography = {
  heading: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "-0.02em"
  },
  body: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "normal"
  },
  mono: {
    fontFamily:
      '"JetBrains Mono", "Courier New", monospace',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "normal"
  }
};

// Playful variations
export const typographyPlayful = {
  // Elegant & Classic
  elegant: {
    heading: {
      ...typography.heading,
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 700,
      fontStyle: "italic",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    },
    body: {
      ...typography.body,
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      lineHeight: 1.8
    }
  },

  // Modern & Bold
  modern: {
    heading: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "-0.03em",
      lineHeight: 1.1
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.7
    },
    mono: {
      ...typography.mono,
      fontSize: "0.9em"
    }
  },

  // Playful & Quirky
  playful: {
    heading: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      fontStyle: "italic",
      textTransform: "lowercase",
      letterSpacing: "0.02em",
      lineHeight: 1.3,
      "&::first-letter": {
        fontSize: "1.5em",
        fontWeight: 800
      }
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 350,
      lineHeight: 1.8,
      fontSize: "1.1em"
    }
  },

  // Vintage & Romantic
  vintage: {
    heading: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 500,
      fontStyle: "normal",
      textTransform: "none",
      letterSpacing: "0.03em",
      lineHeight: 1.2,
      textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
    },
    body: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 400,
      lineHeight: 1.8,
      fontSize: "1.1em"
    }
  },

  // Tech & Code
  tech: {
    heading: {
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      lineHeight: 1.2
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6
    },
    mono: {
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: "0.9em"
    }
  },

  // Minimal & Clean
  minimal: {
    heading: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      textTransform: "none",
      letterSpacing: "-0.02em",
      lineHeight: 1.2
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 350,
      lineHeight: 1.7,
      color: "#4a4a4a"
    }
  },

  // Editorial & Journal
  editorial: {
    heading: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      fontStyle: "normal",
      textTransform: "none",
      letterSpacing: "-0.01em",
      lineHeight: 1.1
    },
    body: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
      lineHeight: 1.8,
      fontSize: "1.1em"
    }
  },

  // Futuristic & Light
  futuristic: {
    heading: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 200,
      textTransform: "uppercase",
      letterSpacing: "0.2em",
      lineHeight: 1.1
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      lineHeight: 1.8,
      letterSpacing: "0.02em"
    }
  },

  // Bold & Dramatic
  dramatic: {
    heading: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 900,
      fontStyle: "italic",
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      lineHeight: 1,
      textShadow: "4px 4px 0 rgba(0,0,0,0.1)"
    },
    body: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      lineHeight: 1.7
    }
  }
};

// Helper function to get a specific style set
export const getTypography = (
  style: keyof typeof typographyPlayful = "elegant"
) => {
  return typographyPlayful[style];
};

// Export individual styles for convenience
export const {
  elegant,
  modern,
  playful,
  vintage,
  tech,
  minimal,
  editorial,
  futuristic,
  dramatic
} = typographyPlayful;

// Default export
export default typography;
