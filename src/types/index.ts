// ============================================
// 핵심 데이터 타입 정의
// ============================================

/**
 * 지원하는 플랫폼 타입
 */
export type PlatformType = 'slack' | 'notion' | 'google-drive';

/**
 * 연결 상태
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

/**
 * 플랫폼 커넥터
 */
export interface Connector {
    id: string;
    platform: PlatformType;
    accountName: string;
    accountEmail: string;
    status: ConnectionStatus;
    lastSyncedAt: Date | null;
    createdAt: Date;
    syncProgress?: number; // 0-100
    errorMessage?: string;
}

/**
 * 컨텍스트 타입 (의미 단위)
 */
export type ContextType = 'event' | 'artifact' | 'insight';

/**
 * 이벤트 타입 (회의, 대화 세션)
 */
export interface Event {
    id: string;
    type: 'event';
    title: string;
    description?: string;
    participants: string[];
    startTime: Date;
    endTime?: Date;
    platform: PlatformType;
    sourceUrl: string;
    sourceId: string;
    tags: string[];
    relatedArtifacts: string[]; // Artifact IDs
    relatedInsights: string[]; // Insight IDs
    createdAt: Date;
    updatedAt: Date;
}

/**
 * 아티팩트 타입 (문서, 메모, 파일)
 */
export interface Artifact {
    id: string;
    type: 'artifact';
    title: string;
    content: string;
    contentType: 'text' | 'markdown' | 'pdf' | 'image' | 'other';
    platform: PlatformType;
    sourceUrl: string;
    sourceId: string;
    author?: string;
    tags: string[];
    relatedEvents: string[]; // Event IDs
    relatedInsights: string[]; // Insight IDs
    createdAt: Date;
    updatedAt: Date;
}

/**
 * 인사이트 타입 (결정, 아이디어, TODO)
 */
export type InsightCategory = 'decision' | 'idea' | 'todo' | 'question';

export interface Insight {
    id: string;
    type: 'insight';
    category: InsightCategory;
    title: string;
    content: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'open' | 'in-progress' | 'done' | 'archived';
    assignee?: string;
    dueDate?: Date;
    sourceContext: string; // Event or Artifact ID
    platform: PlatformType;
    sourceUrl: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

/**
 * 통합 컨텍스트 타입
 */
export type Context = Event | Artifact | Insight;

/**
 * 검색 결과 아이템
 */
export interface SearchResult {
    context: Context;
    score: number;
    highlights: string[];
    matchType: 'keyword' | 'semantic' | 'hybrid';
}

/**
 * 검색 필터
 */
export interface SearchFilter {
    platforms?: PlatformType[];
    contextTypes?: ContextType[];
    dateRange?: {
        start: Date;
        end: Date;
    };
    tags?: string[];
    authors?: string[];
}

/**
 * 검색 요청
 */
export interface SearchQuery {
    query: string;
    filters?: SearchFilter;
    limit?: number;
    offset?: number;
}

/**
 * 검색 응답
 */
export interface SearchResponse {
    results: SearchResult[];
    total: number;
    query: string;
    processingTime: number;
    suggestions?: string[];
}

/**
 * LLM 요약 응답
 */
export interface LLMSummary {
    summary: string;
    keyPoints: string[];
    relatedContexts: string[]; // Context IDs
    sources: {
        contextId: string;
        quote: string;
    }[];
    confidence: number; // 0-1
}

/**
 * 타임라인 아이템
 */
export interface TimelineItem {
    date: Date;
    contexts: Context[];
}

/**
 * 통계 데이터
 */
export interface Statistics {
    totalContexts: number;
    contextsByType: Record<ContextType, number>;
    contextsByPlatform: Record<PlatformType, number>;
    recentActivity: TimelineItem[];
    topTags: { tag: string; count: number }[];
}
