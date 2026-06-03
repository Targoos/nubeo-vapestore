const designTokens = {
  colors: {
    background: {
      primary: "#080808",
      surface: "#0d0d0d",
      elevated: "#0a0a0a",
    },

    foreground: {
      primary: "#ffffff",
      secondary: "#444444",
      muted: "#444444",
    },

    accent: {
      primary: "#00D4FF",
      primaryHover: "#00D4FF",
      primaryMuted: "rgba(0, 212, 255, 0.1)",
      primaryBorder: "rgba(0, 212, 255, 0.3)",
    },

    border: {
      default: "#1a1a1a",
      hover: "rgba(0, 212, 255, 0.5)",
      active: "#00D4FF",
    },

    states: {
      hover: {
        background: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.4)",
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.6)",
      },
    },

    scrollbar: {
      track: "#080808",
      thumb: "#1a1a1a",
      thumbHover: "#00D4FF",
    },

    selection: {
      background: "#00D4FF",
      text: "#000000",
    },
  },

  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", "Monaco", "Consolas", monospace',
    },

    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
    },

    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },

    letterSpacing: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.1em",
      wider: "0.15em",
      widest: "0.2em",
    },

    lineHeight: {
      none: "1",
      tight: "1.1",
      snug: "1.25",
      normal: "1.5",
      relaxed: "1.625",
    },

    textTransform: {
      uppercase: "uppercase",
      none: "none",
    },
  },

  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",

    section: {
      paddingY: "6rem",
      paddingX: "1.5rem",
      paddingXLg: "2rem",
    },

    container: {
      maxWidth: "80rem",
    },

    card: {
      padding: "1.5rem",
      gap: "1rem",
    },

    navbar: {
      height: "4rem",
    },
  },

  borders: {
    width: {
      default: "1px",
      medium: "1.5px",
    },

    radius: {
      none: "0",
      sm: "0.25rem",
      default: "0.375rem",
      md: "0.5rem",
      lg: "0.5rem",
      full: "9999px",
    },
  },

  shadows: {
    none: "none",
  },

  buttons: {
    primary: {
      background: "#00D4FF",
      backgroundHover: "rgba(0, 212, 255, 0.9)",
      text: "#000000",
      border: "none",
      fontSize: "0.75rem",
      fontWeight: "600",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      paddingX: "2rem",
      paddingY: "0.875rem",
      borderRadius: "0.375rem",
    },

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

    icon: {
      background: "transparent",
      text: "#444444",
      textHover: "#ffffff",
      padding: "0.5rem",
    },

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

  cards: {
    category: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderActive: "1px solid #00D4FF",
      borderHover: "1px solid rgba(0, 212, 255, 0.5)",
      borderRadius: "0.5rem",
      padding: "1.5rem",
    },

    product: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderHover: "1px solid rgba(0, 212, 255, 0.27)",
      borderRadius: "0.5rem",
      imageBackground: "#0a0a0a",
      hoverTranslateY: "-4px",
    },

    surface: {
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderRadius: "0.5rem",
      padding: "1.5rem",
    },
  },

  badges: {
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
      borderRadius: "9999px",
      dotSize: "0.375rem",
      dotColor: "#00D4FF",
    },

    count: {
      background: "transparent",
      text: "#00D4FF",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
  },

  inputs: {
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

  animations: {
    duration: {
      instant: "0ms",
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
      slower: "600ms",
      countUp: "1500ms",
    },

    easing: {
      default: "ease-out",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
    },

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

    stagger: {
      base: 100,
      delays: [100, 200, 300, 400, 500, 600],
    },

    observerThreshold: {
      default: 0.2,
      stats: 0.5,
    },
  },

  icons: {
    stroke: {
      width: "1.5",
      lineCap: "round" as const,
      lineJoin: "round" as const,
    },

    size: {
      xs: "14",
      sm: "16",
      md: "18",
      lg: "24",
      xl: "32",
    },
  },

  navbar: {
    background: "rgba(8, 8, 8, 0.95)",
    backdropBlur: "blur(4px)",
    border: "1px solid #1a1a1a",
    height: "4rem",

    logo: {
      fontSize: "1.125rem",
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

    linkGap: "2.5rem",
  },

  footer: {
    background: "#080808",
    border: "1px solid #1a1a1a",
    paddingY: "4rem",

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

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

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

export type DesignTokens = typeof designTokens;
export type Colors = typeof designTokens.colors;
export type Typography = typeof designTokens.typography;
export type Spacing = typeof designTokens.spacing;
export type Buttons = typeof designTokens.buttons;
export type Cards = typeof designTokens.cards;
export type Animations = typeof designTokens.animations;
