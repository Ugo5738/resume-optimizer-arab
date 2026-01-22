
import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, isLoading, className = '', variant = 'primary', ...props }, ref) => {
        const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
        const variantClasses = variant === 'primary'
            ? 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
            : 'text-slate-200 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500';

        return (
            <button ref={ref} className={`${baseClasses} ${variantClasses} ${className}`} disabled={isLoading || props.disabled} {...props}>
                {isLoading ? <Spinner /> : children}
            </button>
        );
    }
);
