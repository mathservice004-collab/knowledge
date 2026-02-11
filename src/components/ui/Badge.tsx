'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
        success: 'bg-[var(--accent-success)]/10 text-[var(--accent-success)]',
        warning: 'bg-[var(--accent-warning)]/10 text-[var(--accent-warning)]',
        error: 'bg-[var(--accent-error)]/10 text-[var(--accent-error)]',
        info: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
