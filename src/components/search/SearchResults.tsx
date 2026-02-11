'use client';

import { useSearchStore } from '@/store/search';
import { formatRelativeTime, getPlatformName, getContextTypeName } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Calendar, FileText, Lightbulb, ExternalLink, Sparkles } from 'lucide-react';
import { Context } from '@/types';

function getContextIcon(type: string) {
    switch (type) {
        case 'event':
            return <Calendar size={20} />;
        case 'artifact':
            return <FileText size={20} />;
        case 'insight':
            return <Lightbulb size={20} />;
        default:
            return <FileText size={20} />;
    }
}

function getMatchTypeBadge(matchType: string) {
    const labels: Record<string, string> = {
        keyword: '키워드',
        semantic: '의미',
        hybrid: '하이브리드',
    };

    return (
        <Badge variant="info" className="text-xs">
            <Sparkles size={12} className="mr-1" />
            {labels[matchType] || matchType}
        </Badge>
    );
}

export default function SearchResults() {
    const { results, isSearching, query } = useSearchStore();

    if (isSearching) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="skeleton h-32">
                        <div />
                    </Card>
                ))}
            </div>
        );
    }

    if (!query && results.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--bg-secondary)] mb-4">
                    <FileText size={32} className="text-[var(--text-tertiary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    검색을 시작하세요
                </h3>
                <p className="text-[var(--text-secondary)]">
                    키워드, 의미, 하이브리드 검색을 통해 필요한 정보를 찾아보세요
                </p>
            </div>
        );
    }

    if (query && results.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--bg-secondary)] mb-4">
                    <FileText size={32} className="text-[var(--text-tertiary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    검색 결과가 없습니다
                </h3>
                <p className="text-[var(--text-secondary)]">
                    다른 검색어를 시도해보세요
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--text-primary)]">{results.length}</span>개의 결과를 찾았습니다
                </p>
            </div>

            <div className="space-y-4">
                {results.map((result, index) => (
                    <Card
                        key={result.context.id}
                        hover
                        className="fade-in cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white flex-shrink-0">
                                {getContextIcon(result.context.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
                                        {result.context.title}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {getMatchTypeBadge(result.matchType)}
                                        <span className="text-sm text-[var(--text-tertiary)]">
                                            {Math.round(result.score * 100)}%
                                        </span>
                                    </div>
                                </div>

                                {'description' in result.context && result.context.description && (
                                    <p className="text-[var(--text-secondary)] mb-3 line-clamp-2">
                                        {result.context.description}
                                    </p>
                                )}

                                {'content' in result.context && (
                                    <p className="text-[var(--text-secondary)] mb-3 line-clamp-2">
                                        {result.context.content}
                                    </p>
                                )}

                                {/* 하이라이트 */}
                                {result.highlights.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {result.highlights.map((highlight, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-sm"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* 메타 정보 */}
                                <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                                    <Badge variant="default">{getContextTypeName(result.context.type)}</Badge>
                                    <span>{getPlatformName(result.context.platform)}</span>
                                    <span>•</span>
                                    <span>{formatRelativeTime(result.context.createdAt)}</span>
                                    {result.context.tags.length > 0 && (
                                        <>
                                            <span>•</span>
                                            <div className="flex gap-1">
                                                {result.context.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag}>#{tag}</span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <a
                                href={result.context.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex-shrink-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={18} className="text-[var(--text-tertiary)]" />
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
