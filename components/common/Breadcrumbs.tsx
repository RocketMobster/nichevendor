"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;
  
  // Split the pathname into segments and create breadcrumb items
  const pathSegments = pathname
    .split('/')
    .filter(segment => segment !== '');
  
  // Capitalize the segment name and replace dashes with spaces
  const formatSegmentName = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Create breadcrumb paths
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        name: formatSegmentName(segment),
        path,
      };
    }),
  ];

  return (
    <div className="flex items-center text-sm py-3 px-4 text-gray-600 dark:text-gray-400 overflow-x-auto">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center whitespace-nowrap">
          {index > 0 && <span className="mx-2">/</span>}
          
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-gray-200">
              {breadcrumb.name}
            </span>
          ) : (
            <Link
              href={breadcrumb.path}
              className="hover:text-orange-500 transition-colors"
            >
              {breadcrumb.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
