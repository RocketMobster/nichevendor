"use client";

/**
 * @file Card.tsx
 * @description A styled card component for content grouping
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string | ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  borderAccent?: boolean;
}

/**
 * Modern card component for grouping content
 */
const Card = ({
  children,
  title,
  subtitle,
  icon,
  actions,
  footer,
  className = '',
  variant = 'default',
  borderAccent = false
}: CardProps) => {
  // Base classes for all variants
  const baseClasses = 'rounded-xl overflow-hidden';
  
  // Variant-specific classes
  const variantClasses = {
    default: 'bg-white',
    outlined: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-md',
  };
  
  // Accent border styling
  const accentBorderClass = borderAccent ? 'border-t-4 border-t-orange-500' : '';
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${accentBorderClass} ${className}`}>
      {/* Card header */}
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-orange-500">{icon}</div>}
            <div>
              {typeof title === 'string' ? (
                <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
              ) : (
                title
              )}
              {subtitle && <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      {/* Card content */}
      <div className="px-6 py-5">{children}</div>
      
      {/* Card footer */}
      {footer && (
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
