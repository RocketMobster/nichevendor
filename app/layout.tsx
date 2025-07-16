/**
 * @file layout.tsx
 * @description Root layout component that wraps all pages in the application.
 * Provides common UI elements and the AppData context to all pages.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Import Tailwind-enabled global styles
import { AppDataProvider } from '../context/AppDataContext';
import { ThemeProvider } from '../context/ThemeContext'; // Import our ThemeProvider
import Navbar from '../components/common/Navbar';
import Breadcrumbs from '../components/common/Breadcrumbs';
import FooterWithNavigation from '../components/layout/FooterWithNavigation';
import ModernStyle from '../components/common/ModernStyle'; // Import ModernStyle component
import GlobalStyles from '../components/common/GlobalStyles'; // Import our GlobalStyles component
import { APP_NAME } from '../config/appConfig';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'A mobile-first app for artists, crafters, and small business vendors',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

/**
 * Root layout component that sets up the application structure
 * Includes the AppDataProvider context, navigation, and common UI elements
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render within the layout
 * @returns {JSX.Element} The complete application layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <html lang="en">
      <head>
        {/* Include mobile fixes CSS with dynamic assetPrefix */}
        <link rel="stylesheet" href={`${assetPrefix}/mobile-fixes.css`} />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <AppDataProvider>
            {/* Apply modern styling to the entire app */}
            <ModernStyle />
            <GlobalStyles />
            
            <div className="flex flex-col min-h-screen">
              <Breadcrumbs />
              <main className="flex-grow px-4 py-4 md:px-6 md:py-6 pb-20 mb-16 overflow-x-hidden">
                {children}
              </main>
            </div>
            <FooterWithNavigation />
            <Navbar />
            
            {/* Include mobile fixes JavaScript with dynamic assetPrefix */}
            <Script src={`${assetPrefix}/mobile-fixes.js`} strategy="lazyOnload" />
          </AppDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
