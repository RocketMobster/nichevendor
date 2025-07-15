"use client";

/**
 * @file VersionFooter.tsx
 * @description A footer component that displays version information and copyright notice.
 * Used at the bottom of pages or modals to provide application versioning information.
 */

import { APP_VERSION, APP_NAME, COPYRIGHT_YEAR, COMPANY_NAME } from '../../config/appConfig';

/**
 * Props interface for the VersionFooter component
 * @interface VersionFooterProps
 * @property {string} [className] - Optional CSS class names to apply to the footer
 * @property {boolean} [showBackButton] - Whether to display a back button
 * @property {() => void} [onBackClick] - Optional callback for back button click
 */
interface VersionFooterProps {
  className?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

/**
 * A modern footer component that displays version information and copyright.
 * @param {VersionFooterProps} props - Component props
 * @returns {JSX.Element} Footer with version and copyright information
 */
const VersionFooter = ({ className = '', showBackButton = false, onBackClick }: VersionFooterProps) => {
  return (
    <footer 
      className={`text-center text-xs py-3 w-full ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center space-x-1">
          {showBackButton && (
            <button 
              onClick={onBackClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '0.75rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                backgroundColor: '#F97316', /* orange-500 */
                color: 'white',
                boxShadow: '0 2px 4px rgba(249, 115, 22, 0.4), 0 0 0 3px rgba(249, 115, 22, 0.2)',
                transition: 'all 0.2s',
                animation: 'pulse 2s infinite',
                minWidth: '80px',
                justifyContent: 'center',
                minHeight: '40px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#EA580C'; /* orange-600 */
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(249, 115, 22, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#F97316'; /* orange-500 */
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(249, 115, 22, 0.4)';
              }}
              aria-label="Go back"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                style={{ width: '1rem', height: '1rem', color: 'white' }}
              >
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
              <span style={{ 
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginLeft: '0.3rem',
                textShadow: '0 1px 1px rgba(0,0,0,0.2)'
              }}>Back</span>
            </button>
          )}
          <span className="inline-block w-2 h-2 bg-orange-400 rounded-full"></span>
          <span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
          <span className="inline-block w-2 h-2 bg-orange-600 rounded-full"></span>
          <p className="px-2 text-orange-600 font-medium">
            {APP_NAME} <span className="text-neutral-500 font-normal">v{APP_VERSION}</span>
          </p>
          <span className="text-neutral-400">&copy; {COPYRIGHT_YEAR} {COMPANY_NAME}</span>
        </div>
      </div>
    </footer>
  );
};

export default VersionFooter;
