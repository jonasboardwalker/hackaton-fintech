export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  "2xl": 1320,
  "3xl": 1600,
  "4xl": 1850,
} as const;

export const TAILWIND_SCREENS = {
  sm: `${BREAKPOINTS.sm}px`,
  "sm-max": { max: `${BREAKPOINTS.sm}px` },
  md: `${BREAKPOINTS.md}px`,
  "md-max": { max: `${BREAKPOINTS.md}px` },
  lg: `${BREAKPOINTS.lg}px`,
  "lg-max": { max: `${BREAKPOINTS.lg}px` },
  xl: `${BREAKPOINTS.xl}px`,
  "xl-max": { max: `${BREAKPOINTS.xl}px` },
  "2xl": `${BREAKPOINTS["2xl"]}px`,
  "2xl-max": { max: `${BREAKPOINTS["2xl"]}px` },
  "3xl": `${BREAKPOINTS["3xl"]}px`,
  "3xl-max": { max: `${BREAKPOINTS["3xl"]}px` },
  "4xl": `${BREAKPOINTS["4xl"]}px`,
  "4xl-max": { max: `${BREAKPOINTS["4xl"]}px` },
} as const;
