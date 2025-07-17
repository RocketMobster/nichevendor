"use client";

import { useState } from 'react';
import { APP_VERSION } from '../../config/appConfig';

export default function SettingsPage() {
  const [theme, setTheme] = useState('system');
  
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-orange-500">⚙️ Settings</h1>
        <p className="text-sm opacity-70">Customize your NicheVendor experience</p>
      </header>
      
      <div className="bg-white dark:bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="font-semibold mb-3 pb-2 border-b dark:border-gray-700">Appearance</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              className={`p-2 rounded-lg border ${theme === 'light' ? 'bg-orange-100 border-orange-300' : 'bg-gray-50 border-gray-200'}`}
              onClick={() => setTheme('light')}
            >
              <span className="block text-center mb-1">☀️</span>
              <span className="text-xs">Light</span>
            </button>
            
            <button 
              className={`p-2 rounded-lg border ${theme === 'dark' ? 'bg-orange-100 border-orange-300' : 'bg-gray-50 border-gray-200'}`}
              onClick={() => setTheme('dark')}
            >
              <span className="block text-center mb-1">🌙</span>
              <span className="text-xs">Dark</span>
            </button>
            
            <button 
              className={`p-2 rounded-lg border ${theme === 'system' ? 'bg-orange-100 border-orange-300' : 'bg-gray-50 border-gray-200'}`}
              onClick={() => setTheme('system')}
            >
              <span className="block text-center mb-1">🖥️</span>
              <span className="text-xs">System</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="font-semibold mb-3 pb-2 border-b dark:border-gray-700">Data</h2>
        
        <div className="space-y-3">
          <button className="w-full p-2 bg-gray-100 dark:bg-gray-100 rounded-lg text-sm text-left">
            Export Data
          </button>
          <button className="w-full p-2 bg-gray-100 dark:bg-gray-100 rounded-lg text-sm text-left">
            Import Data
          </button>
          <button className="w-full p-2 bg-red-50 dark:bg-red-100 text-red-600 dark:text-red-700 rounded-lg text-sm text-left">
            Reset All Data
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">Version {APP_VERSION}</p>
        <p className="text-xs text-gray-500 mt-1">Made with ♥ by RocketMobster Software</p>
      </div>
    </main>
  );
}
