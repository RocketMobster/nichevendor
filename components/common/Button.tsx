"use client";

/**
 * @file Button.tsx
 * @description A reusable, customizable button component with different variants and sizes.
 * Used throughout the application for consistent styling of interactive elements.
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props interface for the Button component
 * Extends standard HTML button attributes with custom styling options
 * 
 * @interface ButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 * @property {ReactNode} children - Content to display inside the button
 * @property {'primary' | 'secondary' | 'outline'} [variant='primary'] - Visual style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Button size
 * @property {boolean} [fullWidth=false] - Whether the button should take full width
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * A customizable button component with different styling variants
 * @param {ButtonProps} props - Button properties
 * @returns {JSX.Element} - Rendered button
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-xl font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-orange-500 text-orange-500 hover:bg-orange-50',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
