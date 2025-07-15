"use client";

/**
 * @file InputField.tsx
 * @description Modern styled input field component with orange accents
 */

import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'outline' | 'filled';
  labelPosition?: 'top' | 'left';
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

/**
 * Modern styled input field with orange accents
 */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helpText,
      fullWidth = true,
      variant = 'default',
      labelPosition = 'top',
      required = false,
      icon,
      iconPosition = 'left',
      className = '',
      ...props
    },
    ref
  ) => {
    // Generate appropriate classes for input styling
    const getInputClasses = () => {
      const baseClasses = 'transition-colors focus:outline-none';
      const sizeClasses = 'p-3 text-sm';
      const widthClasses = fullWidth ? 'w-full' : '';
      
      // Icon padding adjustment
      const iconPaddingClasses = icon 
        ? iconPosition === 'left' 
          ? 'pl-10' 
          : 'pr-10' 
        : '';
      
      // Error state
      const errorClasses = error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
        : 'border-neutral-200 focus:border-orange-400 focus:ring-orange-100';
      
      // Variant specific styling
      let variantClasses = '';
      switch (variant) {
        case 'outline':
          variantClasses = 'bg-white border-2 rounded-lg';
          break;
        case 'filled':
          variantClasses = 'bg-neutral-50 border border-neutral-100 rounded-lg hover:bg-white';
          break;
        default:
          variantClasses = 'bg-white border rounded-lg';
      }
      
      return `${baseClasses} ${sizeClasses} ${widthClasses} ${iconPaddingClasses} ${errorClasses} ${variantClasses}`;
    };
    
    const inputClasses = `${getInputClasses()} ${className}`;
    
    const labelClasses = `block text-sm font-medium ${error ? 'text-red-500' : 'text-neutral-700'} ${labelPosition === 'left' ? 'mr-3 my-auto' : 'mb-2'}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${labelPosition === 'left' ? 'flex items-center' : ''}`}>
        {label && (
          <label htmlFor={props.id} className={labelClasses}>
            {label}
            {required && <span className="text-orange-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${props.id}-error` : helpText ? `${props.id}-help` : undefined
            }
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id={`${props.id}-help`} className="mt-1 text-sm text-neutral-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
