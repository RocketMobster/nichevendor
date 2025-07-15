"use client";

/**
 * @file SelectField.tsx
 * @description Modern styled select field component with orange accents
 */

import { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  required?: boolean;
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  emptyOption?: string | null;
  className?: string;
  labelPosition?: 'top' | 'left';
}

/**
 * Modern styled select field with orange accents
 */
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      error,
      helpText,
      fullWidth = true,
      required = false,
      options,
      emptyOption = 'Select an option',
      className = '',
      labelPosition = 'top',
      ...props
    },
    ref
  ) => {
    // Base classes for the select element
    const selectClasses = `
      bg-white 
      border 
      rounded-lg
      transition-colors 
      p-3
      appearance-none 
      pr-10
      text-sm
      ${error ? 'border-red-500' : 'border-neutral-200 focus:border-orange-400 focus:ring-orange-100'} 
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

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
          <select
            ref={ref}
            className={selectClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${props.id}-error` : helpText ? `${props.id}-help` : undefined
            }
            {...props}
          >
            {emptyOption && (
              <option value="">{emptyOption}</option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown icon */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

SelectField.displayName = 'SelectField';

export default SelectField;
