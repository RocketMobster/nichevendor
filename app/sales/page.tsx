"use client";

import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';

export default function SalesPage() {
  // Mock sales data
  const sales = [
    {
      id: '1',
      date: new Date('2025-06-15'),
      eventName: 'ArtFest',
      totalAmount: 428,
      itemCount: 15,
    },
    {
      id: '2',
      date: new Date('2025-05-22'),
      eventName: 'Comic Con',
      totalAmount: 315,
      itemCount: 12,
    },
    {
      id: '3',
      date: new Date('2025-04-10'),
      eventName: 'Local Market',
      totalAmount: 120,
      itemCount: 8,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">💸 Sales</h1>
          <Button variant="primary" size="sm">
            + New Sale
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="bg-white dark:bg-white border border-orange-100 rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold">Sales Summary</h2>
            <div className="flex justify-between mt-2">
              <div className="text-center">
                <p className="text-xs text-gray-600">This Month</p>
                <p className="font-bold">{formatCurrency(863)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Last Month</p>
                <p className="font-bold">{formatCurrency(1240)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Year to Date</p>
                <p className="font-bold">{formatCurrency(5420)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <h2 className="text-lg font-semibold mb-3">Recent Sales</h2>
      
      <div className="flex flex-col gap-3">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white dark:bg-white border border-orange-100 rounded-xl shadow p-4 flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl text-orange-500 mr-4">
              💸
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-neutral-800">{sale.eventName}</h3>
                  <p className="text-sm text-gray-600">{formatDate(sale.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(sale.totalAmount)}</p>
                  <p className="text-xs text-gray-600">{sale.itemCount} items</p>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
