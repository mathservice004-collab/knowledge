'use client';

import { useEffect, useState } from 'react';
import { FileText, Calendar, Lightbulb, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
    return (
        <Card className="fade-in group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{value}</h3>
                    {change && (
                        <p className={`text-sm mt-3 flex items-center gap-1.5 font-medium ${trend === 'up' ? 'text-[var(--accent-success)]' : 'text-[var(--accent-error)]'
                            }`}>
                            <span className={cn(
                                "flex items-center justify-center w-5 h-5 rounded-full",
                                trend === 'up' ? "bg-[var(--accent-success)]/10" : "bg-[var(--accent-error)]/10"
                            )}>
                                <TrendingUp size={12} className={trend === 'down' ? 'rotate-180' : ''} />
                            </span>
                            {change}
                        </p>
                    )}
                </div>
                <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
            </div>
        </Card>
    );
}

export default function StatsOverview() {
    const [stats, setStats] = useState({
        totalContexts: 0,
        events: 0,
        artifacts: 0,
        insights: 0,
    });

    useEffect(() => {
        // Mock 데이터 로딩 애니메이션
        const timer = setTimeout(() => {
            setStats({
                totalContexts: 1247,
                events: 342,
                artifacts: 689,
                insights: 216,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="전체 컨텍스트"
                value={stats.totalContexts.toLocaleString()}
                change="+12% 이번 주"
                trend="up"
                icon={<FileText size={24} className="text-white" />}
            />
            <StatCard
                title="이벤트"
                value={stats.events.toLocaleString()}
                change="+8% 이번 주"
                trend="up"
                icon={<Calendar size={24} className="text-white" />}
            />
            <StatCard
                title="문서"
                value={stats.artifacts.toLocaleString()}
                change="+15% 이번 주"
                trend="up"
                icon={<FileText size={24} className="text-white" />}
            />
            <StatCard
                title="인사이트"
                value={stats.insights.toLocaleString()}
                change="+5% 이번 주"
                trend="up"
                icon={<Lightbulb size={24} className="text-white" />}
            />
        </div>
    );
}
