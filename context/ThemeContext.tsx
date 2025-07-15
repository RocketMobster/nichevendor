"use client";

/**
 * @file ThemeContext.tsx
 * @description Application theme provider that ensures consistent styling across the app
 */

import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define theme colors
export const themeColors = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
};

// Define theme context
interface ThemeContextProps {
  colors: typeof themeColors;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Theme provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    colors: themeColors,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {/* Apply global theme styles */}
      <style jsx global>{`
        :root {
          --color-primary-50: ${themeColors.primary[50]};
          --color-primary-100: ${themeColors.primary[100]};
          --color-primary-200: ${themeColors.primary[200]};
          --color-primary-300: ${themeColors.primary[300]};
          --color-primary-400: ${themeColors.primary[400]};
          --color-primary-500: ${themeColors.primary[500]};
          --color-primary-600: ${themeColors.primary[600]};
          --color-primary-700: ${themeColors.primary[700]};
          --color-primary-800: ${themeColors.primary[800]};
          --color-primary-900: ${themeColors.primary[900]};
          
          --color-neutral-50: ${themeColors.neutral[50]};
          --color-neutral-100: ${themeColors.neutral[100]};
          --color-neutral-200: ${themeColors.neutral[200]};
          --color-neutral-300: ${themeColors.neutral[300]};
          --color-neutral-400: ${themeColors.neutral[400]};
          --color-neutral-500: ${themeColors.neutral[500]};
          --color-neutral-600: ${themeColors.neutral[600]};
          --color-neutral-700: ${themeColors.neutral[700]};
          --color-neutral-800: ${themeColors.neutral[800]};
          --color-neutral-900: ${themeColors.neutral[900]};
        }

        body {
          background-color: ${isDarkMode ? themeColors.neutral[900] : themeColors.neutral[50]};
          color: ${isDarkMode ? themeColors.neutral[100] : themeColors.neutral[800]};
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
