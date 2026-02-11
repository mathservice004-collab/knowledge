'use client';

import { Search, Bell, User } from 'lucide-react';
import Input from '@/components/ui/Input';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/70 backdrop-blur-2xl border-b border-[var(--border-primary)]/20">
            <div className="flex items-center justify-between h-16 px-8 lg:px-10">
                {/* 검색바 */}
                <div className="flex-1 max-w-2xl">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-[var(--accent-primary)] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="찾고 싶은 내용을 검색하세요 (Ctrl+K)"
                            className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-[var(--bg-secondary)]/50 border border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:bg-[var(--bg-elevated)] focus:border-[var(--accent-primary)]/30 transition-all text-sm"
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
