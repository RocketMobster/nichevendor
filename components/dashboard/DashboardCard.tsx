"use client";

import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

const DashboardCard = ({ title, value, icon, className = '' }: DashboardCardProps) => {
  return (
    <div className={`rounded-xl p-4 bg-orange-100 shadow ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{value}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export default DashboardCard;
