'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        // 테마 적용
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            {children}

            {/* 플로팅 테마 토글 버튼 */}
            <button
                onClick={toggleTheme}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-[var(--accent-primary)] text-white shadow-lg hover:shadow-xl transition-all duration-200 z-50"
                aria-label="테마 변경"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </>
    );
}
