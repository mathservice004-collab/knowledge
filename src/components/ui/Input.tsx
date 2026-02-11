'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, label, id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-2.5 rounded-lg',
                        'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
                        'border border-[var(--border-primary)]',
                        'placeholder:text-[var(--text-tertiary)]',
                        'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent',
                        'transition-all duration-200',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        error && 'border-[var(--accent-error)] focus:ring-[var(--accent-error)]',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-[var(--accent-error)]">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
