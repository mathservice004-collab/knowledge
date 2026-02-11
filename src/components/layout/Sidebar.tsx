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
        <aside className="sticky top-0 h-screen bg-[var(--bg-elevated)] border-r border-[var(--border-primary)] flex flex-col z-50">
            {/* 로고 */}
            <div className="px-6 py-12">
                <h1 className="text-3xl font-black bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent tracking-tighter leading-[0.9]">
                    KNOWLEDGE<br />
                    HUB
                </h1>
                <div className="w-10 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full mt-6" />
                <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] mt-8 leading-none">
                    Intelligence Hub
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
