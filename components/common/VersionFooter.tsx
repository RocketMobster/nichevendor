"use client";

import { APP_VERSION, APP_NAME, COPYRIGHT_YEAR, COMPANY_NAME } from '../../config/appConfig';

interface VersionFooterProps {
  className?: string;
}

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
