"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Navbar = () => {
  const pathname = usePathname();
  
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
            <Link href={item.path} key={item.path}>
              <div className={`p-2 flex flex-col items-center ${
                isActive ? 'text-orange-500' : ''
              }`}>
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
