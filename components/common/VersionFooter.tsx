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
    <footer className={`w-full py-2 px-4 text-xs text-gray-500 text-center bg-white border-t border-orange-100 shadow ${className}`} role="contentinfo">
      <div className="flex items-center justify-center gap-2">
        <span>{APP_NAME} v{APP_VERSION}</span>
        <span>&copy; {COPYRIGHT_YEAR} {COMPANY_NAME}</span>
        {showBackButton && (
          <button
            className="ml-2 px-2 py-1 text-orange-500 border border-orange-200 rounded"
            onClick={onBackClick}
          >
            Back
          </button>
        )}
      </div>
    </footer>
  );
};

export default VersionFooter;
