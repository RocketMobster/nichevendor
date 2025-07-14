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
 */
interface VersionFooterProps {
  className?: string;
}

/**
 * A footer component that displays version information and copyright.
 * @param {VersionFooterProps} props - Component props
 * @returns {JSX.Element} Footer with version and copyright information
 */
const VersionFooter = ({ className = '' }: VersionFooterProps) => {
  return (
    <footer className={`text-center text-xs text-gray-500 mt-4 py-2 ${className}`}>
      <p>
        {APP_NAME} v{APP_VERSION} &copy; {COPYRIGHT_YEAR} {COMPANY_NAME}
      </p>
    </footer>
  );
};

export default VersionFooter;
