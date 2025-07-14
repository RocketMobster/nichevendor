"use client";

import Button from '../../components/common/Button';
import Link from 'next/link';

export default function BoothPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">🧰 Booth Planner</h1>
          <Button variant="primary" size="sm">
            + New Layout
          </Button>
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow p-8 mb-4 text-center">
        <div className="text-5xl mb-4">🎪</div>
        <h2 className="text-xl font-bold mb-2">Booth Layouts Coming Soon</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          This feature will allow you to design and save booth layouts for different events.
        </p>
        <p className="text-xs text-orange-500 mb-4">
          (Part of Version 0.4.0 on our roadmap)
        </p>
        <Link href="/events">
          <Button variant="primary">View Events</Button>
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-orange-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
        <h3 className="font-medium mb-2">💡 Booth Planning Tips</h3>
        <ul className="text-sm space-y-2 list-disc pl-4">
          <li>Keep track of different table sizes at events</li>
          <li>Plan product placement for maximum visibility</li>
          <li>Optimize traffic flow in your booth space</li>
          <li>Take photos of successful layouts for future reference</li>
        </ul>
      </div>
    </main>
  );
}
