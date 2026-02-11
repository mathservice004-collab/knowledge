import { create } from 'zustand';
import { SearchQuery, SearchResponse, SearchResult, Context } from '@/types';

interface SearchStore {
    query: string;
    results: SearchResult[];
    isSearching: boolean;
    error: string | null;
    recentSearches: string[];

    // Actions
    setQuery: (query: string) => void;
    search: (searchQuery: SearchQuery) => Promise<void>;
    clearResults: () => void;
    addRecentSearch: (query: string) => void;
}

// Mock 검색 결과 데이터
const mockSearchResults: SearchResult[] = [
    {
        context: {
            id: '1',
            type: 'event',
            title: '2024 Q1 제품 기획 회의',
            description: '신규 기능 우선순위 논의 및 로드맵 수립',
            participants: ['김철수', '이영희', '박민수'],
            startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            platform: 'slack',
            sourceUrl: 'https://slack.com/archives/C123456/p1234567890',
            sourceId: 'C123456-p1234567890',
            tags: ['기획', '제품', 'Q1'],
            relatedArtifacts: ['2', '3'],
            relatedInsights: ['4'],
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        score: 0.95,
        highlights: ['제품 기획', '우선순위', '로드맵'],
        matchType: 'hybrid',
    },
    {
        context: {
            id: '2',
            type: 'artifact',
            title: 'Q1 제품 로드맵 문서',
            content: '2024년 1분기 제품 개발 로드맵 및 주요 마일스톤...',
            contentType: 'markdown',
            platform: 'notion',
            sourceUrl: 'https://notion.so/Q1-Roadmap-abc123',
            sourceId: 'abc123',
            author: '김철수',
            tags: ['로드맵', '제품', 'Q1'],
            relatedEvents: ['1'],
            relatedInsights: ['4'],
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        },
        score: 0.88,
        highlights: ['제품 로드맵', 'Q1', '마일스톤'],
        matchType: 'semantic',
    },
    {
        context: {
            id: '4',
            type: 'insight',
            category: 'decision',
            title: 'AI 검색 기능 우선 개발 결정',
            content: '사용자 피드백을 바탕으로 AI 기반 검색 기능을 Q1의 최우선 과제로 선정',
            priority: 'high',
            status: 'in-progress',
            sourceContext: '1',
            platform: 'slack',
            sourceUrl: 'https://slack.com/archives/C123456/p1234567890',
            tags: ['AI', '검색', '우선순위'],
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        },
        score: 0.82,
        highlights: ['AI 검색', '우선 개발'],
        matchType: 'keyword',
    },
];

export const useSearchStore = create<SearchStore>((set, get) => ({
    query: '',
    results: [],
    isSearching: false,
    error: null,
    recentSearches: [],

    setQuery: (query) => set({ query }),

    search: async (searchQuery) => {
        set({ isSearching: true, error: null });

        try {
            // Mock API 호출 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 800));

            // 실제로는 API 호출
            // const response = await fetch('/api/search', {
            //   method: 'POST',
            //   body: JSON.stringify(searchQuery),
            // });
            // const data: SearchResponse = await response.json();

            // Mock 데이터 필터링
            const filtered = mockSearchResults.filter((result) =>
                result.context.title.toLowerCase().includes(searchQuery.query.toLowerCase()) ||
                ('description' in result.context && result.context.description?.toLowerCase().includes(searchQuery.query.toLowerCase())) ||
                ('content' in result.context && result.context.content.toLowerCase().includes(searchQuery.query.toLowerCase()))
            );

            set({
                results: filtered.length > 0 ? filtered : mockSearchResults,
                isSearching: false,
            });

            // 최근 검색어 추가
            get().addRecentSearch(searchQuery.query);
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '검색에 실패했습니다.',
                isSearching: false,
                results: [],
            });
        }
    },

    clearResults: () => set({ results: [], query: '' }),

    addRecentSearch: (query) => {
        const { recentSearches } = get();
        const updated = [query, ...recentSearches.filter((q) => q !== query)].slice(0, 5);
        set({ recentSearches: updated });
    },
}));
