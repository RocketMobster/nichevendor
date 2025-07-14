"use client";

import { APP_VERSION, APP_NAME, COPYRIGHT_YEAR, COMPANY_NAME } from '../../config/appConfig';

type VersionDisplayProps = {
  showAppName?: boolean;
  showCopyright?: boolean;
};

const VersionDisplay = ({ 
  showAppName = false, 
  showCopyright = false 
}: VersionDisplayProps) => {
  return (
    <div className="text-xs text-gray-500 text-center py-2">
      {showAppName && <span>{APP_NAME} </span>}
      <span>v{APP_VERSION}</span>
      {showCopyright && (
        <span className="block mt-1">
          © {COPYRIGHT_YEAR} {COMPANY_NAME}
        </span>
      )}
    </div>
  );
};

export default VersionDisplay;
