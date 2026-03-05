// /home/zaya/Downloads/Zayas/zaya-monorepo/apps/spacedesign/src/lib/utils/background.ts

export type BackgroundType =
  | "blobs"
  | "waves"
  | "grid"
  | "dots"
  | "noise"
  | "circuit"
  | "topography"
  | "aurora"
  | "stripe"
  | "vignette"
  | "morph"
  | "liquid";

export interface BackgroundConfig {
  type: BackgroundType;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  intensity?: number; // 0-1
  speed?: number; // for animations
  blendMode?: string;
}

// Color palette with opacity variations
export const colorWithOpacity = (
  color: string,
  opacity: number
): string => {
  // Convert hex to rgba
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Generate blob background
export const blobBackground = (
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
  },
  intensity: number = 0.35
): string => {
  const opacities = {
    primary: intensity,
    secondary: intensity * 0.9,
    tertiary: intensity * 0.8
  };

  return `
    radial-gradient(
      800px at 15% 25%,
      ${colorWithOpacity(colors.primary, opacities.primary)},
      transparent 70%
    ),
    radial-gradient(
      700px at 85% 30%,
      ${colorWithOpacity(colors.secondary, opacities.secondary)},
      transparent 65%
    ),
    radial-gradient(
      600px at 45% 75%,
      ${colorWithOpacity(colors.tertiary, opacities.tertiary)},
      transparent 75%
    ),
    radial-gradient(
      500px at 70% 15%,
      ${colorWithOpacity(colors.primary, opacities.primary * 0.8)},
      transparent 70%
    ),
    radial-gradient(
      550px at 30% 85%,
      ${colorWithOpacity(colors.secondary, opacities.secondary * 0.8)},
      transparent 65%
    ),
    ${colors.background}
  `;
};

// Generate wave background
export const waveBackground = (
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
  intensity: number = 0.2
): string => {
  return `
    repeating-linear-gradient(
      transparent,
      transparent 100px,
      ${colorWithOpacity(colors.primary, intensity)} 100px,
      ${colorWithOpacity(colors.primary, intensity)} 200px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 150px,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 150px,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 300px
    ),
    ${colors.background}
  `;
};

// Generate grid background
export const gridBackground = (
  colors: {
    primary: string;
    background: string;
  },
  intensity: number = 0.1,
  size: number = 50
): string => {
  return `
    linear-gradient(
      90deg,
      ${colorWithOpacity(colors.primary, intensity)} 1px,
      transparent 1px
    ),
    linear-gradient(
      0deg,
      ${colorWithOpacity(colors.primary, intensity)} 1px,
      transparent 1px
    ),
    ${colors.background}
  `;
};

// Generate dots background
export const dotsBackground = (
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
  intensity: number = 0.15,
  size: number = 2
): string => {
  return `
    radial-gradient(
      ${size}px ${size}px at 20px 30px,
      ${colorWithOpacity(colors.primary, intensity)},
      transparent
    ),
    radial-gradient(
      ${size}px ${size}px at 40px 70px,
      ${colorWithOpacity(colors.secondary, intensity)},
      transparent
    ),
    radial-gradient(
      ${size}px ${size}px at 80px 20px,
      ${colorWithOpacity(colors.primary, intensity * 0.8)},
      transparent
    ),
    radial-gradient(
      ${size}px ${size}px at 10px 90px,
      ${colorWithOpacity(colors.secondary, intensity * 0.8)},
      transparent
    ),
    ${colors.background}
  `;
};

// Generate noise texture
export const noiseBackground = (
  colors: {
    primary: string;
    background: string;
  },
  intensity: number = 0.05
): string => {
  return `
    repeating-conic-gradient(
      ${colors.background} 0% 25%,
      ${colorWithOpacity(colors.primary, intensity)} 0% 50%
    ) 50% / 20px 20px,
    ${colors.background}
  `;
};

// Generate circuit board pattern
export const circuitBackground = (
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
  intensity: number = 0.15
): string => {
  return `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      ${colorWithOpacity(colors.primary, intensity)} 10px,
      ${colorWithOpacity(colors.primary, intensity)} 12px
    ),
    repeating-linear-gradient(
      135deg,
      transparent,
      transparent 15px,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 15px,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 17px
    ),
    ${colors.background}
  `;
};

// Generate topography lines
export const topographyBackground = (
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
  intensity: number = 0.1
): string => {
  return `
    repeating-radial-gradient(
      circle at 50% 50%,
      transparent 0,
      transparent 10px,
      ${colorWithOpacity(colors.primary, intensity)} 11px,
      ${colorWithOpacity(colors.primary, intensity)} 12px
    ),
    repeating-radial-gradient(
      circle at 30% 70%,
      transparent 0,
      transparent 20px,
      ${colorWithOpacity(colors.secondary, intensity * 0.8)} 21px,
      ${colorWithOpacity(colors.secondary, intensity * 0.8)} 22px
    ),
    ${colors.background}
  `;
};

// Generate aurora borealis effect
export const auroraBackground = (
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
  },
  intensity: number = 0.3
): string => {
  return `
    repeating-linear-gradient(
      120deg,
      ${colorWithOpacity(colors.primary, intensity)} 0%,
      ${colorWithOpacity(colors.secondary, intensity * 0.8)} 25%,
      ${colorWithOpacity(colors.tertiary, intensity * 0.6)} 50%,
      ${colorWithOpacity(colors.primary, intensity * 0.5)} 75%,
      ${colorWithOpacity(colors.secondary, intensity)} 100%
    ),
    radial-gradient(
      circle at 30% 40%,
      ${colorWithOpacity(colors.primary, intensity * 0.4)},
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 60%,
      ${colorWithOpacity(colors.secondary, intensity * 0.4)},
      transparent 60%
    ),
    ${colors.background}
  `;
};

// Generate stripe pattern
export const stripeBackground = (
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
  intensity: number = 0.2,
  angle: number = 45
): string => {
  return `
    repeating-linear-gradient(
      ${angle}deg,
      transparent,
      transparent 20px,
      ${colorWithOpacity(colors.primary, intensity)} 20px,
      ${colorWithOpacity(colors.primary, intensity)} 40px
    ),
    repeating-linear-gradient(
      ${angle + 90}deg,
      transparent,
      transparent 30px,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 30px,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 60px
    ),
    ${colors.background}
  `;
};

// Generate vignette effect
export const vignetteBackground = (
  colors: {
    background: string;
  },
  intensity: number = 0.8
): string => {
  return `
    radial-gradient(
      circle at 50% 50%,
      transparent 40%,
      rgba(0, 0, 0, ${intensity * 0.5}) 80%,
      rgba(0, 0, 0, ${intensity}) 100%
    ),
    ${colors.background}
  `;
};

// Generate morphing blob pattern (good for animation)
export const morphBackground = (
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
  },
  intensity: number = 0.25
): string => {
  return `
    radial-gradient(
      600px at 30% 40%,
      ${colorWithOpacity(colors.primary, intensity)},
      transparent 70%
    ),
    radial-gradient(
      500px at 70% 30%,
      ${colorWithOpacity(colors.secondary, intensity * 0.8)},
      transparent 65%
    ),
    radial-gradient(
      550px at 45% 70%,
      ${colorWithOpacity(colors.tertiary, intensity * 0.7)},
      transparent 60%
    ),
    radial-gradient(
      450px at 80% 80%,
      ${colorWithOpacity(colors.primary, intensity * 0.6)},
      transparent 70%
    ),
    ${colors.background}
  `;
};

// Generate liquid/fluid pattern
export const liquidBackground = (
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
  intensity: number = 0.2
): string => {
  return `
    repeating-radial-gradient(
      circle at 30% 40%,
      ${colorWithOpacity(colors.primary, intensity)} 0%,
      transparent 10%,
      ${colorWithOpacity(colors.secondary, intensity * 0.8)} 20%,
      transparent 30%
    ),
    repeating-radial-gradient(
      circle at 70% 60%,
      ${colorWithOpacity(colors.secondary, intensity * 0.7)} 0%,
      transparent 15%,
      ${colorWithOpacity(colors.primary, intensity * 0.6)} 30%,
      transparent 45%
    ),
    ${colors.background}
  `;
};

// Main function to get background based on type
export const getBackground = (
  type: BackgroundType,
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
  },
  intensity: number = 0.3,
  customParams?: any
): string => {
  switch (type) {
    case "blobs":
      return blobBackground(colors, intensity);
    case "waves":
      return waveBackground(colors, intensity);
    case "grid":
      return gridBackground(
        colors,
        intensity,
        customParams?.size
      );
    case "dots":
      return dotsBackground(
        colors,
        intensity,
        customParams?.size
      );
    case "noise":
      return noiseBackground(colors, intensity);
    case "circuit":
      return circuitBackground(colors, intensity);
    case "topography":
      return topographyBackground(colors, intensity);
    case "aurora":
      return auroraBackground(colors, intensity);
    case "stripe":
      return stripeBackground(
        colors,
        intensity,
        customParams?.angle
      );
    case "vignette":
      return vignetteBackground(colors, intensity);
    case "morph":
      return morphBackground(colors, intensity);
    case "liquid":
      return liquidBackground(colors, intensity);
    default:
      return blobBackground(colors, intensity);
  }
};

// Predefined color schemes
export const colorSchemes = {
  sunset: {
    primary: "#ee9b00ff",
    secondary: "#bb3e03ff",
    tertiary: "#9b2226ff",
    background: "#001219ff"
  },
  ocean: {
    primary: "#0a9396ff",
    secondary: "#005f73ff",
    tertiary: "#94d2bdff",
    background: "#001219ff"
  },
  forest: {
    primary: "#94d2bdff",
    secondary: "#0a9396ff",
    tertiary: "#005f73ff",
    background: "#001219ff"
  },
  desert: {
    primary: "#e9d8a6ff",
    secondary: "#ee9b00ff",
    tertiary: "#ca6702ff",
    background: "#001219ff"
  },
  volcanic: {
    primary: "#ae2012ff",
    secondary: "#9b2226ff",
    tertiary: "#bb3e03ff",
    background: "#001219ff"
  },
  teal: {
    primary: "#0a9396ff",
    secondary: "#94d2bdff",
    tertiary: "#005f73ff",
    background: "#001219ff"
  },
  copper: {
    primary: "#ca6702ff",
    secondary: "#ee9b00ff",
    tertiary: "#bb3e03ff",
    background: "#001219ff"
  }
};

// Animation keyframes for backgrounds (to be used with CSS)
export const backgroundAnimations = {
  slowDrift: `
    @keyframes drift {
      0%, 100% { background-position: 0% 0%; }
      33% { background-position: 5% 5%; }
      66% { background-position: -5% -5%; }
    }
  `,
  pulse: `
    @keyframes backgroundPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  `,
  rotate: `
    @keyframes backgroundRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `
};
