import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
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
        <input
          ref={ref}
          className={clsx(
            'block w-full px-4 py-3 border-2 border-blue-200 rounded-xl',
            'focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100',
            'transition-all duration-300 hover:border-maroon-300 shadow-sm hover:shadow-md',
            'bg-white/80 backdrop-blur-sm',
            error && 'border-error-500 focus:ring-error-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-error-600 font-semibold" role="alert">
            ⚠️ {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-blue-600">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
