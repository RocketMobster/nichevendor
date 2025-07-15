"use client";

/**
 * @file GlobalStyles.tsx
 * @description Applies global styling based on our theme to the entire application
 */

import { theme } from '../../styles/theme';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      :root {
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
      }

      /* Animations */
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
        }
        70% {
          box-shadow: 0 0 0 6px rgba(249, 115, 22, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
        }
      }

      /* Base styling */
      body {
        font-family: ${theme.typography.fontFamily.sans};
        background-color: ${theme.colors.background.alt};
        color: ${theme.colors.neutral[800]};
        line-height: 1.5;
      }

      h1, h2, h3, h4, h5, h6 {
        color: ${theme.colors.neutral[900]};
        font-weight: ${theme.typography.fontWeight.bold};
        margin-bottom: ${theme.spacing.sm};
      }

      h1 { font-size: 1.875rem; } /* text-3xl */
      h2 { font-size: 1.5rem; }   /* text-2xl */
      h3 { font-size: 1.25rem; }  /* text-xl */
      h4 { font-size: 1.125rem; } /* text-lg */

      a {
        color: ${theme.colors.primary[500]};
        text-decoration: none;
        transition: color 0.2s ease-in-out;
      }
      
      a:hover {
        color: ${theme.colors.primary[600]};
      }

      /* Form elements */
      input, select, textarea {
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.neutral[200]};
        border-radius: ${theme.borders.radius.lg};
        padding: 0.5rem 0.75rem;
        color: ${theme.colors.neutral[800]};
        transition: all 0.2s ease-in-out;
      }
      
      input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: ${theme.colors.primary[400]};
        box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
      }
      
      button {
        cursor: pointer;
        border: none;
        border-radius: ${theme.borders.radius.lg};
        padding: 0.5rem 1rem;
        font-weight: ${theme.typography.fontWeight.medium};
        transition: all 0.2s ease-in-out;
      }
      
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      /* Tables */
      table {
        width: 100%;
        border-collapse: collapse;
      }
      
      th {
        background-color: ${theme.colors.neutral[50]};
        text-align: left;
        color: ${theme.colors.neutral[600]};
        font-weight: ${theme.typography.fontWeight.medium};
        padding: 0.75rem 1.5rem;
        border-bottom: 1px solid ${theme.colors.neutral[200]};
      }
      
      td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid ${theme.colors.neutral[100]};
      }
      
      tr:last-child td {
        border-bottom: none;
      }
      
      tr:hover {
        background-color: ${theme.colors.primary[50]};
      }
      
      /* Cards */
      .card {
        background-color: ${theme.colors.white};
        border-radius: ${theme.borders.radius.xl};
        box-shadow: ${theme.shadows.md};
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: ${theme.colors.neutral[100]};
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.primary[300]};
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.primary[400]};
      }
    `}</style>
  );
};

export default GlobalStyles;
