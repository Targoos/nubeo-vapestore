/**
 * NUBEO Design Tokens
 * Single source of truth for all visual decisions
 * Dark tech premium aesthetic
 */

const designTokens = {
  // ============================================
  // COLORS
  // ============================================
  colors: {
    // Core palette
    background: {
      primary: "#080808",      // Main page background
      surface: "#0d0d0d",      // Cards, elevated surfaces
      elevated: "#0a0a0a",     // Product image areas, slightly elevated
    },
    
    foreground: {
      primary: "#ffffff",      // Main text, headings
      secondary: "#444444",    // Muted text, labels, descriptions
      muted: "#444444",        // Same as secondary, for consistency
    },
    
    accent: {
      primary: "#00D4FF",      // Cyan - CTAs, prices, active states, highlights
      primaryHover: "#00D4FF",  // Same, with opacity adjustments
      primaryMuted: "rgba(0, 212, 255, 0.1)",  // Badge backgrounds, subtle highlights
      primaryBorder: "rgba(0, 212, 255, 0.3)", // Badge borders, subtle accents
    },
    
    border: {
      default: "#1a1a1a",      // Default borders
      hover: "rgba(0, 212, 255, 0.5)",  // Hover state borders
      active: "#00D4FF",       // Active/selected state borders
    },
    
    // Interactive states
    states: {
      hover: {
        background: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.4)",
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.6)",  // Product card quick-add overlay
      },
    },
    
    // Scrollbar
    scrollbar: {
      track: "#080808",
      thumb: "#1a1a1a",
      thumbHover: "#00D4FF",
    },
    
    // Selection
    selection: {
      background: "#00D4FF",
      text: "#000000",
    },
  },

  // ============================================
  // TYPOGRAPHY
  // ============================================
  typography: {
    // Font families
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", "Monaco", "Consolas", monospace',
    },
    
    // Font sizes (in rem/px)
    fontSize: {
      xs: "0.75rem",    // 12px - labels, badges, product counts
      sm: "0.875rem",   // 14px - body text, nav links, product names
      base: "1rem",     // 16px - default
      lg: "1.125rem",   // 18px - subtitles, descriptions
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px - stat values
      "3xl": "1.875rem", // 30px - section headings (mobile)
      "4xl": "2.25rem", // 36px - section headings (desktop)
      "5xl": "3rem",    // 48px - hero headline (mobile)
      "6xl": "3.75rem", // 60px - hero headline (tablet)
      "7xl": "4.5rem",  // 72px - hero headline (desktop)
    },
    
    // Font weights
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    
    // Letter spacing (tracking)
    letterSpacing: {
      tight: "-0.025em",  // Tight tracking for large headlines
      normal: "0",
      wide: "0.1em",      // Buttons, CTAs
      wider: "0.15em",    // Nav links, category names, labels
      widest: "0.2em",    // Logo, section labels
    },
    
    // Line heights
    lineHeight: {
      none: "1",
      tight: "1.1",      // Hero headlines
      snug: "1.25",
      normal: "1.5",
      relaxed: "1.625",  // Body text, descriptions
    },
    
    // Text transforms
    textTransform: {
      uppercase: "uppercase",  // Used extensively for nav, labels, headings
      none: "none",
    },
  },

  // ============================================
  // SPACING
  // ============================================
  spacing: {
    // Base spacing scale (in rem)
    0: "0",
    1: "0.25rem",   // 4px
    2: "0.5rem",    // 8px
    3: "0.75rem",   // 12px
    4: "1rem",      // 16px
    5: "1.25rem",   // 20px
    6: "1.5rem",    // 24px
    8: "2rem",      // 32px
    10: "2.5rem",   // 40px
    12: "3rem",     // 48px
    16: "4rem",     // 64px
    24: "6rem",     // 96px
    
    // Semantic spacing
    section: {
      paddingY: "6rem",       // py-24
      paddingX: "1.5rem",     // px-6
      paddingXLg: "2rem",     // lg:px-8
    },
    
    container: {
      maxWidth: "80rem",      // max-w-7xl (1280px)
    },
    
    card: {
      padding: "1.5rem",      // p-6
      gap: "1rem",            // gap-4
    },
    
    navbar: {
      height: "4rem",         // h-16
    },
  },

  // ============================================
  // BORDERS
  // ============================================
  borders: {
    width: {
      default: "1px",
      medium: "1.5px",        // Icon strokes
    },
    
    radius: {
      none: "0",
      sm: "0.25rem",          // 4px
      default: "0.375rem",    // 6px - most cards, inputs
      md: "0.5rem",           // 8px - larger cards
      lg: "0.5rem",           // 8px
      full: "9999px",         // Badges, pills
    },
  },

  // ============================================
  // SHADOWS
  // ============================================
  shadows: {
    none: "none",
    // This design uses no drop shadows - relies on borders and color contrast
  },

  // ============================================
  // BUTTONS
  // ============================================
  buttons: {
    // Primary button (filled cyan)
    primary: {
      background: "#00D4FF",
      backgroundHover: "rgba(0, 212, 255, 0.9)",
      text: "#000000",
      border: "none",
      fontSize: "0.75rem",      // text-xs
      fontWeight: "600",        // font-semibold
      letterSpacing: "0.1em",   // tracking-[0.1em]
      textTransform: "uppercase",
      paddingX: "2rem",         // px-8
      paddingY: "0.875rem",     // py-3.5
      borderRadius: "0.375rem", // rounded-md
    },
    
    // Secondary button (outline white)
    secondary: {
      background: "transparent",
      backgroundHover: "rgba(255, 255, 255, 0.05)",
      text: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderHover: "1px solid rgba(255, 255, 255, 0.4)",
      fontSize: "0.75rem",
      fontWeight: "600",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      paddingX: "2rem",
      paddingY: "0.875rem",
      borderRadius: "0.375rem",
    },
    
    // Ghost button (used for cart, icons)
    ghost: {
      background: "transparent",
      backgroundHover: "rgba(0, 212, 255, 0.1)",
      text: "#ffffff",
      border: "1px solid #00D4FF",
      fontSize: "0.75rem",
      fontWeight: "500",
      paddingX: "1rem",
      paddingY: "0.5rem",
      borderRadius: "0.375rem",
    },
    
    // Icon button
    icon: {
      background: "transparent",
      text: "#444444",
      textHover: "#ffffff",
      padding: "0.5rem",
    },
    
    // Small/compact button (add to cart on product cards)
    compact: {
      background: "#00D4FF",
      backgroundHover: "rgba(0, 212, 255, 0.9)",
      text: "#000000",
      fontSize: "0.75rem",
      fontWeight: "600",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      paddingX: "1.5rem",
      paddingY: "0.625rem",
      borderRadius: "0.375rem",
    },
  },

  // ============================================
  // CARDS
  // ============================================
  cards: {
    // Category card
    category: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderActive: "1px solid #00D4FF",
      borderHover: "1px solid rgba(0, 212, 255, 0.5)",
      borderRadius: "0.5rem",   // rounded-lg
      padding: "1.5rem",        // p-6
    },
    
    // Product card
    product: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderHover: "1px solid rgba(0, 212, 255, 0.27)", // #00D4FF44
      borderRadius: "0.5rem",
      imageBackground: "#0a0a0a",
      hoverTranslateY: "-4px",  // hover:-translate-y-1
    },
    
    // Surface card (generic)
    surface: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderRadius: "0.5rem",
      padding: "1.5rem",
    },
  },

  // ============================================
  // BADGES
  // ============================================
  badges: {
    // Label badge (used in hero)
    label: {
      background: "rgba(0, 212, 255, 0.1)",
      border: "1px solid rgba(0, 212, 255, 0.3)",
      text: "#00D4FF",
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      paddingX: "0.75rem",
      paddingY: "0.25rem",
      borderRadius: "9999px",   // rounded-full
      dotSize: "0.375rem",      // w-1.5 h-1.5
      dotColor: "#00D4FF",
    },
    
    // Count badge (cart count)
    count: {
      background: "transparent",
      text: "#00D4FF",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
  },

  // ============================================
  // INPUTS (for future forms)
  // ============================================
  inputs: {
    // Text input
    text: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderFocus: "1px solid #00D4FF",
      borderRadius: "0.375rem",
      text: "#ffffff",
      placeholder: "#444444",
      fontSize: "0.875rem",
      paddingX: "1rem",
      paddingY: "0.75rem",
    },
    
    // Search input
    search: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderFocus: "1px solid #00D4FF",
      borderRadius: "0.375rem",
      text: "#ffffff",
      placeholder: "#444444",
      fontSize: "0.875rem",
      paddingX: "1rem",
      paddingY: "0.625rem",
      iconColor: "#444444",
    },
    
    // Select/dropdown
    select: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderFocus: "1px solid #00D4FF",
      borderRadius: "0.375rem",
      text: "#ffffff",
      fontSize: "0.875rem",
      paddingX: "1rem",
      paddingY: "0.75rem",
      chevronColor: "#444444",
    },
    
    // Checkbox
    checkbox: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderChecked: "1px solid #00D4FF",
      backgroundChecked: "#00D4FF",
      checkColor: "#000000",
      size: "1.25rem",
      borderRadius: "0.25rem",
    },
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  animations: {
    // Durations
    duration: {
      instant: "0ms",
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
      slower: "600ms",
      countUp: "1500ms",
    },
    
    // Easing functions
    easing: {
      default: "ease-out",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",  // Used for count-up
    },
    
    // Keyframe animations
    keyframes: {
      fadeInUp: {
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    
    // Stagger delays (for sequential animations)
    stagger: {
      base: 100,  // 100ms between each item
      delays: [100, 200, 300, 400, 500, 600],
    },
    
    // Intersection observer thresholds
    observerThreshold: {
      default: 0.2,
      stats: 0.5,
    },
  },

  // ============================================
  // ICONS
  // ============================================
  icons: {
    // Stroke styling
    stroke: {
      width: "1.5",
      lineCap: "round" as const,
      lineJoin: "round" as const,
    },
    
    // Common sizes
    size: {
      xs: "14",
      sm: "16",
      md: "18",
      lg: "24",
      xl: "32",
    },
  },

  // ============================================
  // NAVBAR
  // ============================================
  navbar: {
    background: "rgba(8, 8, 8, 0.95)",
    backdropBlur: "blur(4px)",   // backdrop-blur-sm
    border: "1px solid #1a1a1a",
    height: "4rem",
    
    logo: {
      fontSize: "1.125rem",     // text-lg
      fontWeight: "600",
      letterSpacing: "0.2em",
      color: "#ffffff",
    },
    
    link: {
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.15em",
      color: "#444444",
      colorActive: "#00D4FF",
      colorHover: "#ffffff",
      underlineColor: "#00D4FF",
      underlineHeight: "1px",
    },
    
    linkGap: "2.5rem",          // gap-10
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    background: "#080808",
    border: "1px solid #1a1a1a",
    paddingY: "4rem",           // py-16
    
    heading: {
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.15em",
      color: "#ffffff",
    },
    
    link: {
      fontSize: "0.875rem",
      color: "#444444",
      colorHover: "#ffffff",
    },
    
    copyright: {
      fontSize: "0.75rem",
      color: "#444444",
    },
    
    socialIcon: {
      color: "#444444",
      colorHover: "#00D4FF",
      padding: "0.5rem",
    },
  },

  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // ============================================
  // Z-INDEX
  // ============================================
  zIndex: {
    base: "0",
    dropdown: "10",
    sticky: "20",
    fixed: "30",
    modalBackdrop: "40",
    modal: "50",
    navbar: "50",
    tooltip: "60",
  },
} as const;

export default designTokens;

// Type exports for TypeScript consumers
export type DesignTokens = typeof designTokens;
export type Colors = typeof designTokens.colors;
export type Typography = typeof designTokens.typography;
export type Spacing = typeof designTokens.spacing;
export type Buttons = typeof designTokens.buttons;
export type Cards = typeof designTokens.cards;
export type Animations = typeof designTokens.animations;
