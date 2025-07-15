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
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-orange-700">{title}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="text-xl font-bold text-neutral-800">{value}</div>
    </div>
  );
};

export default DashboardCard;
