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
    <nav className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              href={item.path} 
              key={item.path}
              className={`p-2 flex flex-col items-center transition-colors ${
                isActive ? 'text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:text-orange-400 dark:hover:text-orange-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
