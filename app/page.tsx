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
import Card from '../components/ui/Card';
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
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6 bg-neutral-50">
      <header className="w-full max-w-5xl mb-8">
        <h1 className="text-3xl font-bold text-orange-600 flex items-center">
          <span className="text-3xl mr-2">🚀</span>
          NicheVendor CRM
        </h1>
        <p className="text-neutral-600">Mobile-first vendor management for creators</p>
      </header>
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="md:col-span-2 space-y-6">
          {/* Next Event Card */}
          <Link href="/events" className="block">
            <Card 
              variant="elevated" 
              borderAccent
              className="hover:shadow-lg transition-shadow duration-200"
              title="Next Event"
              icon="📅"
              subtitle={formatDate(nextEvent.startDate, 'short') + ' - ' + formatDate(nextEvent.endDate, 'short')}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 text-lg">
                  🗓️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800">{nextEvent.name}</h3>
                  <p className="text-neutral-600">{nextEvent.location}</p>
                </div>
              </div>
            </Card>
          </Link>
          
          {/* Event Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <DashboardCard
              title={`Last Event: ${salesSnapshot.event}`}
              value={formatCurrency(salesSnapshot.total)}
              icon="💰"
              className="h-full"
            />
            <DashboardCard
              title="Top Product"
              value={salesSnapshot.topProduct}
              icon="⭐"
              className="h-full"
            />
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Alerts Card */}
          <Card 
            variant="elevated"
            title="Alerts"
            icon="🔔"
            className="bg-white"
          >
            <ul className="divide-y divide-neutral-100">
              {alerts.map((alert) => (
                <li key={alert.id} className="py-2 flex justify-between items-center">
                  <span className="text-neutral-700">{alert.message}</span>
                  <Link href={alert.id === '1' ? '/inventory' : '/orders'}>
                    <Button variant="text" size="xs">
                      View &rarr;
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          
          {/* Quick Access Navigation */}
          <Card
            variant="elevated"
            title="Quick Access"
            icon="⚡"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link href={item.path} key={item.path} className="block">
                  <Button 
                    variant="outline"
                    fullWidth
                    className="py-3 flex flex-col items-center justify-center h-20"
                    icon={<span className="text-2xl mb-1">{item.icon}</span>}
                  >
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
