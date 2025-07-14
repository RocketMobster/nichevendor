"use client";

/**
 * @file page.tsx
 * @description Main dashboard/home page component for the NicheVendor CRM application.
 * Shows an overview of upcoming events, alerts, recent sales, and provides
 * quick navigation to main sections of the application.
 */

import Link from 'next/link';
import DashboardCard from '../components/dashboard/DashboardCard';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/dateUtils';

/**
 * Home/Dashboard page component
 * Serves as the entry point and overview screen for the application
 * @returns {JSX.Element} The dashboard page
 */
export default function Home() {
  /**
   * Mock data for initial display
   * In production, this would be fetched from context/API/database
   */
  
  // Next upcoming event information
  const nextEvent = {
    name: 'BlipCon',
    location: 'Miami Expo Center',
    startDate: new Date('2025-07-19'),
    endDate: new Date('2025-07-20'),
  };
  
  // Alerts requiring user attention
  const alerts = [
    { id: '1', message: '4 products low on stock' },
    { id: '2', message: '2 custom orders pending' },
  ];
  
  // Recent sales summary
  const salesSnapshot = {
    total: 428,
    event: 'ArtFest',
    topProduct: 'Ghost Pins',
  };
  
  const navItems = [
    { icon: '📦', label: 'Inventory', path: '/inventory' },
    { icon: '📅', label: 'Events', path: '/events' },
    { icon: '💸', label: 'Sales', path: '/sales' },
    { icon: '📝', label: 'Orders', path: '/orders' },
    { icon: '🧰', label: 'Booth', path: '/booth' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6">
      <header className="w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold text-orange-500">🚀 NicheVendor CRM</h1>
        <p className="text-sm opacity-70">Mobile-first vendor management</p>
      </header>
      
      <Link href="/events" className="block w-full max-w-md">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <h2 className="text-lg font-semibold">📅 Next Event</h2>
          <p className="text-sm">{nextEvent.name} - {nextEvent.location}</p>
          <p className="text-xs opacity-70">
            {formatDate(nextEvent.startDate, 'short')} - {formatDate(nextEvent.endDate, 'short')}
          </p>
        </section>
      </Link>

      <section className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
        <h2 className="text-lg font-semibold">🔔 Alerts</h2>
        <ul className="text-sm">
          {alerts.map((alert) => (
            <li key={alert.id} className="py-1 flex justify-between items-center">
              <span>{alert.message}</span>
              <Link href={alert.id === '1' ? '/inventory' : '/orders'}>
                <span className="text-orange-500 text-xs">View &rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full max-w-md mb-4">
        <DashboardCard
          title={`Last Event: ${salesSnapshot.event}`}
          value={formatCurrency(salesSnapshot.total)}
          icon="💰"
        />
        <p className="text-sm mt-1">Top Product: "{salesSnapshot.topProduct}"</p>
      </section>

      <nav className="w-full max-w-md grid grid-cols-3 gap-2">
        {navItems.map((item) => (
          <Link href={item.path} key={item.path} className="block">
            <Button 
              variant="primary"
              className="p-3 flex flex-col items-center w-full"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </main>
  );
}
