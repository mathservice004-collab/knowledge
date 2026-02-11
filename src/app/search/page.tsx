'use client';

import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';

export default function SearchPage() {
    return (
        <div className="space-y-8">
            <div className="fade-in">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    통합 검색
                </h1>
                <p className="text-[var(--text-secondary)]">
                    키워드, 의미, 하이브리드 검색으로 필요한 정보를 찾아보세요
                </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '100ms' }}>
                <SearchBar />
            </div>

            <div className="fade-in" style={{ animationDelay: '200ms' }}>
                <SearchResults />
            </div>
        </div>
    );
}
