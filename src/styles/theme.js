/**
 * HireBuddy Design System
 * Centralized theme configuration
 * NO hardcoded values in components - use this theme
 */

export const theme = {
  // Brand Colors - HireBuddy Identity
  colors: {
    primary: {
      50: '#f5f7ff',
      100: '#e8eaff',
      200: '#d4d8ff',
      300: '#b8beff',
      400: '#8b9aef',
      500: '#FFD54F', // Bumble Yellow (Primary)
      600: '#E5B225',
      700: '#CC9E21',
      800: '#3a4394',
      900: '#2f3670'
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#764ba2', // Secondary brand
      600: '#5a3a7a',
      700: '#4c2f66',
      800: '#3e2454',
      900: '#321d45'
    },
    
    // Semantic Colors
    success: {
      light: '#d1fae5',
      main: '#10b981',
      dark: '#065f46'
    },
    warning: {
      light: '#fef3c7',
      main: '#f59e0b',
      dark: '#92400e'
    },
    error: {
      light: '#fee2e2',
      main: '#ef4444',
      dark: '#991b1b'
    },
    info: {
      light: '#dbeafe',
      main: '#3b82f6',
      dark: '#1e3a8a'
    },
    
    // Neutral Grays
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    
    // Special
    white: '#ffffff',
    black: '#000000',
    
    // Gradients
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      light: 'linear-gradient(135deg, #8b9aef 0%, #9b6cc4 100%)',
      dark: 'linear-gradient(135deg, #5568d3 0%, #5a3a7a 100%)',
      subtle: 'linear-gradient(135deg, #f5f7ff 0%, #faf5ff 100%)'
    }
  },
  
  // Spacing Scale (8px base)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem'      // 96px
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem'     // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.25rem', // 20px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadows (Bumble-inspired soft shadows)
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    card: '0 4px 12px rgba(102, 126, 234, 0.1)',
    cardHover: '0 12px 24px rgba(102, 126, 234, 0.2)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },
  
  // Breakpoints (Mobile-first)
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultrawide: '1536px'
  },
  
  // Z-index Scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  },
  
  // Transitions (Duration + Easing)
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  }
};

export default theme;
