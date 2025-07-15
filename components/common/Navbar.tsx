"use client";

/**
 * @file Navbar.tsx
 * @description Mobile-first navigation bar that appears at the bottom of the screen.
 * Provides the main navigation points for the application with visual indicators for active routes.
 */

import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Interface representing a navigation item in the Navbar
 * @interface NavItem
 * @property {string} path - The route path for navigation
 * @property {string} label - Text label to display for the navigation item
 * @property {string} icon - Emoji or icon character to display for the navigation item
 */
interface NavItem {
  path: string;
  label: string;
  icon: string;
}

/**
 * Bottom navigation bar component for mobile-first design.
 * Handles route matching to highlight the active navigation item.
 * @returns {JSX.Element} Navigation bar component
 */
const Navbar = () => {
  // Get the current path to determine which nav item is active
  const pathname = usePathname();
  
  /**
   * Navigation items configuration
   * Includes path, label, and icon for each main navigation point
   */
  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/events', label: 'Events', icon: '📅' },
    { path: '/sales', label: 'Sales', icon: '💸' },
  ];
  
  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-2 border-2 border-orange-400 z-40 max-w-lg mx-auto">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              href={item.path} 
              key={item.path}
              className={`p-2 flex flex-col items-center transition-colors ${
                isActive 
                  ? 'text-orange-500 font-medium' 
                  : 'text-neutral-600 hover:text-orange-400'
              }`}
            >
              <div className={`text-xl mb-1 ${
                isActive 
                  ? 'bg-orange-100 p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm' 
                  : ''
              }`}>
                {item.icon}
              </div>
              <span className="text-xs">{item.label}</span>
              {isActive && <div className="h-1 w-12 bg-orange-500 rounded-full mt-1"></div>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
