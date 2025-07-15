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
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  loading?: boolean;
}

/**
 * A modern, customizable button component with different styling variants
 * @param {ButtonProps} props - Button properties
 * @returns {JSX.Element} - Rendered button
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  rounded = false,
  loading = false,
  className = '',
  ...props
}: ButtonProps) => {
  // Base styling
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    ${rounded ? 'rounded-full' : 'rounded-lg'}
  `;
  
  // Variant specific classes
  const variantClasses = {
    primary: `bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white focus:ring-orange-300`,
    secondary: `bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 focus:ring-neutral-200`,
    outline: `bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50 active:bg-orange-100 focus:ring-orange-200`,
    text: `bg-transparent text-orange-500 hover:bg-orange-50 active:bg-orange-100 focus:ring-orange-200`,
    danger: `bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-300`,
    success: `bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-300`,
  };
  
  // Size specific classes
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-base',
  };
  
  // Additional spacing for buttons with icons
  const iconSpacing = icon ? (iconPosition === 'left' ? 'pl-2.5' : 'pr-2.5') : '';
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${widthClass} ${iconSpacing} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
