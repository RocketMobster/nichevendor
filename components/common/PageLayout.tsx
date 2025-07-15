"use client";

/**
 * @file PageLayout.tsx
 * @description A modern page layout component with orange-themed styling
 */

import { ReactNode } from 'react';
import VersionFooter from './VersionFooter';
import Link from 'next/link';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
  actions?: ReactNode;
  contentClassName?: string;
}

/**
 * Modern page layout with orange-themed styling
 */
const PageLayout = ({
  children,
  title,
  description,
  backLink,
  actions,
  contentClassName = ''
}: PageLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              {backLink && (
                <div className="mb-2">
                  <Link 
                    href={backLink.href} 
                    className="inline-flex items-center text-white hover:text-orange-100 text-sm font-medium"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-1.5"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    {backLink.label}
                  </Link>
                </div>
              )}
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {description && (
                <p className="text-orange-100 mt-1">{description}</p>
              )}
            </div>
            
            {actions && (
              <div className="flex space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content with card styling */}
      <div className="flex-grow p-4 sm:p-6 max-w-7xl w-full mx-auto">
        <div className={`bg-white rounded-xl shadow-sm p-6 mb-6 ${contentClassName}`}>
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <VersionFooter className="bg-white border-t border-neutral-200" />
    </main>
  );
};

export default PageLayout;
