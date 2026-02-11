'use client';

import { Search, Bell, User } from 'lucide-react';
import Input from '@/components/ui/Input';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 w-full bg-[var(--bg-elevated)]/80 backdrop-blur-md border-b border-[var(--border-primary)]">
            <div className="flex items-center justify-between h-16 px-6">
                {/* 검색바 */}
                <div className="flex-1 max-w-2xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={18} />
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요 (Ctrl+K)"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all"
                        />
                    </div>
                </div>

                {/* 우측 액션 */}
                <div className="flex items-center gap-4 ml-6">
                    {/* 알림 */}
                    <button className="relative p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                        <Bell size={20} className="text-[var(--text-secondary)]" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-error)] rounded-full"></span>
                    </button>

                    {/* 프로필 */}
                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
