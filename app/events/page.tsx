"use client";

import { formatDate } from '../../utils/dateUtils';
import Button from '../../components/common/Button';

export default function EventsPage() {
  // Mock data for events
  const events = [
    {
      id: '1',
      name: 'BlipCon',
      location: 'Miami Expo Center',
      startDate: new Date('2025-07-19'),
      endDate: new Date('2025-07-20'),
      boothNumber: 'A3',
    },
    {
      id: '2',
      name: 'ArtFest',
      location: 'Downtown Gallery',
      startDate: new Date('2025-08-05'),
      endDate: new Date('2025-08-07'),
      boothNumber: '42',
    },
    {
      id: '3',
      name: 'Maker Faire',
      location: 'Science Museum',
      startDate: new Date('2025-09-15'),
      endDate: new Date('2025-09-15'),
      boothNumber: 'C12',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">📅 Events</h1>
          <Button variant="primary" size="sm">
            + Add Event
          </Button>
        </div>
      </header>
      
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{event.name}</h3>
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                Table {event.boothNumber}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {event.location}
            </p>
            
            <div className="flex justify-between mt-3">
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Dates: </span>
                {formatDate(event.startDate)}
                {event.startDate.getTime() !== event.endDate.getTime() && 
                  ` - ${formatDate(event.endDate)}`}
              </div>
              
              <Button variant="outline" size="sm">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
