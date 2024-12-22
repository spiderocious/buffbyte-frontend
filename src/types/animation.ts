// Animation types for Framer Motion

// Define custom easing function as a 4-element tuple
export type CustomEasing = [number, number, number, number];

// Common easing presets used throughout the app
export const EASING = {
  // Smooth, modern easing for general UI animations
  smooth: [0.16, 1, 0.3, 1] as CustomEasing,
  
  // Alternative smooth easing for welcome animations
  welcome: [0.25, 0.1, 0.25, 1] as CustomEasing,
  
  // Standard easeInOut for simple animations
  easeInOut: "easeInOut" as const
} as const;