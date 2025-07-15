"use client";

import { useRouter, usePathname } from 'next/navigation';
import VersionFooter from '../common/VersionFooter';

/**
 * Client component wrapper for VersionFooter that adds navigation capabilities
 * Automatically adds a back button for all pages except the home page
 * @returns {JSX.Element} Enhanced VersionFooter with back navigation
 */
export default function FooterWithNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine if current page is home
  const isHomePage = pathname === '/' || pathname === '/home';
  
  const handleBackClick = () => {
    try {
      router.back();
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback: If router.back() fails, try window.history
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 50,
      backgroundColor: 'white',
      borderTop: '1px solid #FED7AA', /* orange-100 */
      width: '100%'
    }}>
      <VersionFooter 
        showBackButton={!isHomePage} 
        onBackClick={handleBackClick}
      />
    </div>
  );
}
