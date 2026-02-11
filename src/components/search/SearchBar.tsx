'use client';

import { useState } from 'react';
import { useSearchStore } from '@/store/search';
import { Search, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SearchBar() {
    const { query, setQuery, search, recentSearches } = useSearchStore();
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        search({ query: searchQuery });
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(query);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div
                className={cn(
                    'relative transition-all duration-200',
                    isFocused && 'scale-[1.02]'
                )}
            >
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                    size={20}
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        setIsFocused(true);
                        setShowSuggestions(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    placeholder="검색어를 입력하세요... (키워드, 의미, 하이브리드 검색 지원)"
                    className={cn(
                        'w-full pl-12 pr-12 py-4 rounded-xl text-lg',
                        'bg-[var(--bg-elevated)] text-[var(--text-primary)]',
                        'border-2 border-[var(--border-primary)]',
                        'placeholder:text-[var(--text-tertiary)]',
                        'focus:outline-none focus:border-[var(--accent-primary)]',
                        'transition-all duration-200',
                        isFocused && 'shadow-lg'
                    )}
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setShowSuggestions(false);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        <X size={18} className="text-[var(--text-tertiary)]" />
                    </button>
                )}
            </div>

            {/* 최근 검색어 & 제안 */}
            {showSuggestions && recentSearches.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-[var(--bg-elevated)] border border-[var(--border-primary)] rounded-lg shadow-xl overflow-hidden z-50 fade-in">
                    <div className="p-3 border-b border-[var(--border-primary)]">
                        <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase">
                            최근 검색어
                        </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {recentSearches.map((recentQuery, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setQuery(recentQuery);
                                    handleSearch(recentQuery);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--bg-secondary)] transition-colors text-left"
                            >
                                <Clock size={16} className="text-[var(--text-tertiary)]" />
                                <span className="text-[var(--text-primary)]">{recentQuery}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
