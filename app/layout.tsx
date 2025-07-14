/**
 * @file layout.tsx
 * @description Root layout component that wraps all pages in the application.
 * Provides common UI elements and the AppData context to all pages.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppDataProvider } from '../context/AppDataContext';
import Navbar from '../components/common/Navbar';
import Breadcrumbs from '../components/common/Breadcrumbs';
import VersionDisplay from '../components/common/VersionDisplay';
import { APP_NAME } from '../config/appConfig';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'A mobile-first app for artists, crafters, and small business vendors',
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
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppDataProvider>
          <Breadcrumbs />
          <main className="px-4">
            {children}
          </main>
          <div className="pb-16">
            <VersionDisplay showCopyright={false} />
          </div>
          <Navbar />
        </AppDataProvider>
      </body>
    </html>
  );
}
