'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Database, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: '대시보드', href: '/', icon: Home },
    { name: '검색', href: '/search', icon: Search },
    { name: '커넥터', href: '/connectors', icon: Database },
    { name: '설정', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[var(--bg-elevated)] border-r border-[var(--border-primary)] flex flex-col">
            {/* 로고 */}
            <div className="p-6 border-b border-[var(--border-primary)]">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                    Knowledge Hub
                </h1>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                    통합 지식 관리 시스템
                </p>
            </div>

            {/* 네비게이션 */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                'hover:bg-[var(--bg-secondary)]',
                                isActive && 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]'
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* 하단 정보 */}
            <div className="p-4 border-t border-[var(--border-primary)]">
                <div className="text-xs text-[var(--text-tertiary)]">
                    <p>Version 1.0.0 (MVP)</p>
                    <p className="mt-1">© 2024 Knowledge Hub</p>
                </div>
            </div>
        </aside>
    );
}
