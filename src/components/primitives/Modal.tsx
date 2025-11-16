import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-maroon-900/40 via-burgundy-900/30 to-maroon-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={clsx(
          'relative w-full bg-white rounded-2xl shadow-2xl animate-bounce-in transform-3d border-2 border-maroon-200',
          sizeStyles[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b-2 border-maroon-100 bg-gradient-to-r from-maroon-50 to-burgundy-50">
          <div>
            <h2
              id="modal-title"
              className="text-2xl font-bold text-gradient-maroon"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-description"
                className="mt-2 text-sm text-maroon-600 font-medium"
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-maroon-400 hover:text-maroon-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-maroon-500 rounded-lg p-1 hover:bg-maroon-100 hover:scale-110 hover:rotate-90"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-gradient-to-br from-white via-maroon-50/20 to-burgundy-50/20">{children}</div>
      </div>
    </div>
  );
};
