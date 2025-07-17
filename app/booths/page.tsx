"use client";

import Button from '../../components/common/Button';

export default function BoothsPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">🎪 Booths</h1>
          <Button variant="primary" size="sm">
            View Events
          </Button>
        </div>
      </header>
      <div className="flex flex-col gap-4">
        {/* Circus tent card */}
        <div className="bg-white dark:bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-6xl mb-2">🎪</div>
          <h2 className="text-xl font-semibold text-orange-500 mb-1">Booths Layouts Coming Soon</h2>
          <p className="text-sm text-gray-600 mb-2">Estimated: v0.7.0 (see roadmap)</p>
        </div>
        {/* Booth Planning Tips card */}
        <div className="bg-yellow-50 rounded-xl shadow p-4 mt-4">
          <h3 className="text-lg font-semibold text-orange-600 mb-2">Booth Planning Tips</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Bring extra signage and lighting</li>
            <li>Plan your table layout for easy browsing</li>
            <li>Have a backup for payment methods</li>
            <li>Pack snacks and water</li>
            <li>Engage with visitors and collect feedback</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
