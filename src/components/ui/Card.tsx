'use client';

import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
    style?: CSSProperties;
}

export default function Card({ children, className, hover = false, glass = false, style }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-lg p-6 transition-all duration-200',
                glass ? 'glass' : 'card',
                hover && 'cursor-pointer',
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
}
