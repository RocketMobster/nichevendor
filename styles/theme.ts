/**
 * @file theme.ts
 * @description Application theme configuration with orange-based color palette
 * This file defines the consistent color scheme and styling variables used throughout the app
 */

export const theme = {
  colors: {
    // Primary colors (orange shades)
    primary: {
      50: '#fff7ed',  // Lightest orange / off-white
      100: '#ffedd5', // Very light orange
      200: '#fed7aa', // Light orange
      300: '#fdba74', // Soft orange
      400: '#fb923c', // Medium orange
      500: '#f97316', // Base orange (primary brand color)
      600: '#ea580c', // Darker orange
      700: '#c2410c', // Deep orange
      800: '#9a3412', // Very dark orange
      900: '#7c2d12', // Darkest orange
    },
    // Neutral colors
    neutral: {
      50: '#f9fafb',  // Off-white
      100: '#f3f4f6', // Very light gray
      200: '#e5e7eb', // Light gray
      300: '#d1d5db', // Medium light gray
      400: '#9ca3af', // Medium gray
      500: '#6b7280', // Gray
      600: '#4b5563', // Medium dark gray
      700: '#374151', // Dark gray
      800: '#1f2937', // Very dark gray
      900: '#111827', // Nearly black
    },
    // Success, warning, error colors
    success: {
      light: '#dcfce7',  // Light green
      main: '#22c55e',   // Green
      dark: '#15803d',   // Dark green
    },
    warning: {
      light: '#fef3c7',  // Light yellow
      main: '#eab308',   // Yellow
      dark: '#a16207',   // Dark yellow
    },
    error: {
      light: '#fee2e2',  // Light red
      main: '#ef4444',   // Red
      dark: '#b91c1c',   // Dark red
    },
    // Base colors
    white: '#ffffff',
    black: '#000000',
    background: {
      main: '#ffffff',       // Background for main content
      alt: '#f9fafb',        // Alternative background (light gray)
      dark: '#111827',       // Dark mode background
    }
  },
  // Borders and shadows
  borders: {
    radius: {
      sm: '0.25rem',    // 4px
      md: '0.375rem',   // 6px
      lg: '0.5rem',     // 8px
      xl: '0.75rem',    // 12px
      '2xl': '1rem',    // 16px
      full: '9999px',   // Fully rounded (for buttons, avatars)
    },
    width: {
      thin: '1px',
      medium: '2px',
      thick: '3px',
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  // Typography
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  // Spacing
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem' // 40px
  },
};

// CSS Variables format for use in global styles
export const cssVariables = `
  :root {
    /* Primary colors */
    --color-primary-50: ${theme.colors.primary[50]};
    --color-primary-100: ${theme.colors.primary[100]};
    --color-primary-200: ${theme.colors.primary[200]};
    --color-primary-300: ${theme.colors.primary[300]};
    --color-primary-400: ${theme.colors.primary[400]};
    --color-primary-500: ${theme.colors.primary[500]};
    --color-primary-600: ${theme.colors.primary[600]};
    --color-primary-700: ${theme.colors.primary[700]};
    --color-primary-800: ${theme.colors.primary[800]};
    --color-primary-900: ${theme.colors.primary[900]};
    
    /* Neutral colors */
    --color-neutral-50: ${theme.colors.neutral[50]};
    --color-neutral-100: ${theme.colors.neutral[100]};
    --color-neutral-200: ${theme.colors.neutral[200]};
    --color-neutral-300: ${theme.colors.neutral[300]};
    --color-neutral-400: ${theme.colors.neutral[400]};
    --color-neutral-500: ${theme.colors.neutral[500]};
    --color-neutral-600: ${theme.colors.neutral[600]};
    --color-neutral-700: ${theme.colors.neutral[700]};
    --color-neutral-800: ${theme.colors.neutral[800]};
    --color-neutral-900: ${theme.colors.neutral[900]};
    
    /* Status colors */
    --color-success-light: ${theme.colors.success.light};
    --color-success-main: ${theme.colors.success.main};
    --color-success-dark: ${theme.colors.success.dark};
    
    --color-warning-light: ${theme.colors.warning.light};
    --color-warning-main: ${theme.colors.warning.main};
    --color-warning-dark: ${theme.colors.warning.dark};
    
    --color-error-light: ${theme.colors.error.light};
    --color-error-main: ${theme.colors.error.main};
    --color-error-dark: ${theme.colors.error.dark};
    
    /* Borders */
    --border-radius-sm: ${theme.borders.radius.sm};
    --border-radius-md: ${theme.borders.radius.md};
    --border-radius-lg: ${theme.borders.radius.lg};
    --border-radius-xl: ${theme.borders.radius.xl};
    --border-radius-2xl: ${theme.borders.radius['2xl']};
    --border-radius-full: ${theme.borders.radius.full};
  }
`;

export default theme;
