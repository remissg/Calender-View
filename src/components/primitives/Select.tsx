import React from 'react';
import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, size = 'md', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-bold text-blue-800 mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'block w-full border-2 border-blue-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300',
            'focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed hover:border-maroon-300 shadow-sm hover:shadow-md',
            error && 'border-error-500 focus:ring-error-500',
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-2 text-sm text-error-600 font-semibold" role="alert">
            ⚠️ {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
