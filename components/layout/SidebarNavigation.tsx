"use client";
import React, { createContext, useContext, useState } from 'react';
// Sidebar context for global open/close state
const SidebarContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

// ...existing code...
import Link from 'next/link';
import {
  HomeModernIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { href: '/', label: 'Home', icon: HomeModernIcon },
  { href: '/inventory', label: 'Inventory', icon: ShoppingCartIcon },
  { href: '/events', label: 'Events', icon: CalendarDaysIcon },
  { href: '/booths', label: 'Booths', icon: BuildingStorefrontIcon },
  { href: '/orders', label: 'Orders', icon: ClipboardDocumentListIcon },
  { href: '/sales', label: 'Sales', icon: UsersIcon },
  { href: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function SidebarNavigation() {
  const { open, setOpen } = useSidebar();
  React.useEffect(() => {
    console.log('Sidebar open state:', open);
  }, [open]);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-[100] transition-transform duration-300 w-44 flex flex-col pt-8 pb-4 border-r border-orange-200 ${open ? 'translate-x-0' : '-translate-x-full'} pointer-events-auto`}
        aria-label="Sidebar Navigation"
        style={{ willChange: 'transform', backgroundClip: 'padding-box', background: open ? '#FFEDD5' : 'transparent' }}
      >
        <nav className="flex flex-col gap-2 px-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-colors group ${open ? 'hover:bg-orange-100 focus:bg-orange-200' : 'opacity-0'} pointer-events-auto`}
              tabIndex={open ? 0 : -1}
              style={{ background: 'none' }}
            >
              <Icon className={`h-5 w-5 ${open ? 'text-orange-500 group-hover:text-orange-700' : 'text-orange-200'}`} aria-hidden="true" />
              <span className={`text-sm font-medium ${open ? 'text-gray-800' : 'text-orange-200'}`}>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Handle/Ribbon */}
      <button
        className={`fixed top-1/2 left-0 z-[101] -translate-y-1/2 bg-orange-500 text-white rounded-r-full shadow-lg px-3 py-2 flex items-center transition-transform duration-300 ${open ? 'translate-x-44' : 'translate-x-0'}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        style={{ pointerEvents: 'auto', top: '50%', transform: `${open ? 'translateX(11rem) translateY(-50%)' : 'translateX(0) translateY(-50%)'}` }}
      >
        <svg
          className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
}
