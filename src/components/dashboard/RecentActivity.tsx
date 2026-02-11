'use client';

import { formatRelativeTime, getPlatformName } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Calendar, FileText, Lightbulb, ExternalLink } from 'lucide-react';
import { Context } from '@/types';

const mockRecentActivities: Context[] = [
    {
        id: '1',
        type: 'event',
        title: '2024 Q1 제품 기획 회의',
        description: '신규 기능 우선순위 논의 및 로드맵 수립',
        participants: ['김철수', '이영희', '박민수'],
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
        platform: 'slack',
        sourceUrl: 'https://slack.com/archives/C123456/p1234567890',
        sourceId: 'C123456',
        tags: ['기획', '제품'],
        relatedArtifacts: [],
        relatedInsights: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
        id: '2',
        type: 'artifact',
        title: 'Q1 제품 로드맵 문서',
        content: '2024년 1분기 제품 개발 로드맵...',
        contentType: 'markdown',
        platform: 'notion',
        sourceUrl: 'https://notion.so/roadmap',
        sourceId: 'abc123',
        author: '김철수',
        tags: ['로드맵', 'Q1'],
        relatedEvents: [],
        relatedInsights: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
        id: '3',
        type: 'insight',
        category: 'decision',
        title: 'AI 검색 기능 우선 개발 결정',
        content: '사용자 피드백을 바탕으로 AI 기반 검색 기능을 최우선 과제로 선정',
        priority: 'high',
        status: 'in-progress',
        sourceContext: '1',
        platform: 'slack',
        sourceUrl: 'https://slack.com/archives/C123456/p1234567890',
        tags: ['AI', '검색'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    },
];

function getContextIcon(type: string) {
    switch (type) {
        case 'event':
            return <Calendar size={18} />;
        case 'artifact':
            return <FileText size={18} />;
        case 'insight':
            return <Lightbulb size={18} />;
        default:
            return <FileText size={18} />;
    }
}

function getContextTypeBadge(type: string) {
    const variants: Record<string, 'default' | 'info' | 'success'> = {
        event: 'info',
        artifact: 'default',
        insight: 'success',
    };
    return variants[type] || 'default';
}

export default function RecentActivity() {
    return (
        <Card className="fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">최근 활동</h2>
                <button className="text-sm text-[var(--accent-primary)] hover:underline">
                    전체 보기
                </button>
            </div>

            <div className="space-y-4">
                {mockRecentActivities.map((activity, index) => (
                    <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer group"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-colors">
                            {getContextIcon(activity.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                    {activity.title}
                                </h3>
                                <Badge variant={getContextTypeBadge(activity.type)}>
                                    {activity.type === 'event' ? '이벤트' : activity.type === 'artifact' ? '문서' : '인사이트'}
                                </Badge>
                            </div>

                            {'description' in activity && activity.description && (
                                <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-1">
                                    {activity.description}
                                </p>
                            )}

                            <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-tertiary)]">
                                <span>{getPlatformName(activity.platform)}</span>
                                <span>•</span>
                                <span>{formatRelativeTime(activity.createdAt)}</span>
                                {activity.tags.length > 0 && (
                                    <>
                                        <span>•</span>
                                        <div className="flex gap-1">
                                            {activity.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)]">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-[var(--bg-tertiary)] rounded-lg">
                            <ExternalLink size={16} className="text-[var(--text-tertiary)]" />
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );
}
