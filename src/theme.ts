/**
 * Bring Back House Music Fest Design Tokens & Theme
 * Updated to the Tactile Chunky Neo-Brutalist Pop & Foam Aesthetic.
 */

export const theme = {
  colors: {
    // Background & Surfaces
    background: '#fbf8fc',
    surface: '#fbf8fc',
    surfaceDim: '#dcd9dd',
    surfaceBright: '#fbf8fc',
    surfaceVariant: '#e4e1e6',
    surfaceTint: '#446900',

    // Surface Container Hierarchy
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f6f2f7',
    surfaceContainer: '#f0edf1',
    surfaceContainerHigh: '#eae7eb',
    surfaceContainerHighest: '#e4e1e6',

    // Content on surfaces
    onBackground: '#1b1b1e',
    onSurface: '#1b1b1e',
    onSurfaceVariant: '#424936',
    inverseSurface: '#303033',
    inverseOnSurface: '#f3f0f4',

    // Outlines & Borders
    outline: '#727a64',
    outlineVariant: '#c2cab0',
    border: '#18181B',

    // Primary Brand (Electric Lime Green / Chartreuse)
    primary: '#446900',
    onPrimary: '#ffffff',
    primaryContainer: '#a3e635',
    onPrimaryContainer: '#416400',
    primaryFixed: '#b2f746',
    primaryFixedDim: '#98da27',
    onPrimaryFixed: '#121f00',
    onPrimaryFixedVariant: '#334f00',
    inversePrimary: '#98da27',

    // Secondary Accent (Neon Punch / Vivid Orange)
    secondary: '#ab3500',
    onSecondary: '#ffffff',
    secondaryContainer: '#fe6a34',
    onSecondaryContainer: '#5d1900',
    secondaryFixed: '#ffdbd0',
    secondaryFixedDim: '#ffb59d',
    onSecondaryFixed: '#390c00',
    onSecondaryFixedVariant: '#832600',

    // Tertiary Accent (Hot Magenta / Acid Pink)
    tertiary: '#b4136d',
    onTertiary: '#ffffff',
    tertiaryContainer: '#ffc2d7',
    onTertiaryContainer: '#ae0a69',
    tertiaryFixed: '#ffd9e4',
    tertiaryFixedDim: '#ffb0cd',
    onTertiaryFixed: '#3e0022',
    onTertiaryFixedVariant: '#8c0053',

    // Status / Errors
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',

    // Overlays & Translucents
    overlayDark80: 'rgba(27, 27, 30, 0.8)',
    overlayDark90: 'rgba(27, 27, 30, 0.9)',
    overlayDark60: 'rgba(27, 27, 30, 0.6)',
    glowPrimary: 'rgba(163, 230, 53, 0.45)',
    glowSecondary: 'rgba(254, 106, 52, 0.45)',
  },

  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    DEFAULT: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    full: 9999,
  },

  borders: {
    thick: 2,
    color: '#18181B',
  },

  shadows: {
    sm: {
      shadowColor: '#18181B',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2,
    },
    md: {
      shadowColor: '#18181B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
    lg: {
      shadowColor: '#18181B',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
    },
    shadowSm: {
      shadowColor: '#18181B',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2,
    },
    shadowMd: {
      shadowColor: '#18181B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
    shadowLg: {
      shadowColor: '#18181B',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
    },
  },

  spacing: {
    'space-xs': 4,
    'space-sm': 8,
    'space-md': 16,
    'space-lg': 24,
    'space-xl': 40,
    'space-2xl': 64,
    marginMobile: 16,
    margin: 32,
    gutterMobile: 16,
    gutter: 24,
  },

  fonts: {
    display: 'Outfit, sans-serif',
    headline: 'Outfit, sans-serif',
    body: 'DM Sans, sans-serif',
    mono: 'monospace',
  },

  typography: {
    displayXl: {
      fontSize: 56,
      lineHeight: 60,
      letterSpacing: -1.5,
      fontWeight: '900' as const,
    },
    displayLg: {
      fontSize: 44,
      lineHeight: 48,
      letterSpacing: -1,
      fontWeight: '900' as const,
    },
    headlineXl: {
      fontSize: 36,
      lineHeight: 42,
      letterSpacing: -0.8,
      fontWeight: '800' as const,
    },
    headlineLg: {
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: -0.5,
      fontWeight: '800' as const,
    },
    headlineMd: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: -0.3,
      fontWeight: '700' as const,
    },
    headlineSm: {
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '700' as const,
    },
    bodyLg: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: -0.1,
      fontWeight: '500' as const,
    },
    bodyMd: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    bodySm: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    labelLg: {
      fontSize: 15,
      lineHeight: 18,
      letterSpacing: 0.5,
      fontWeight: '700' as const,
    },
    labelMd: {
      fontSize: 13,
      lineHeight: 16,
      letterSpacing: 0.6,
      fontWeight: '700' as const,
    },
    labelSm: {
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.7,
      fontWeight: '800' as const,
    },
  },
} as const;

export type Theme = typeof theme;
export default theme;
