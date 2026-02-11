import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (format === 'relative') {
        return formatRelativeTime(d);
    }

    const options: Intl.DateTimeFormatOptions =
        format === 'long'
            ? { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
            : { year: 'numeric', month: 'short', day: 'numeric' };

    return new Intl.DateTimeFormat('ko-KR', options).format(d);
}

/**
 * 상대 시간 포맷팅 (예: "3분 전", "2시간 전")
 */
export function formatRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}주 전`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
    return `${Math.floor(diffInSeconds / 31536000)}년 전`;
}

/**
 * 플랫폼 이름 한글화
 */
export function getPlatformName(platform: string): string {
    const names: Record<string, string> = {
        'slack': 'Slack',
        'notion': 'Notion',
        'google-drive': 'Google Drive',
    };
    return names[platform] || platform;
}

/**
 * 컨텍스트 타입 한글화
 */
export function getContextTypeName(type: string): string {
    const names: Record<string, string> = {
        'event': '이벤트',
        'artifact': '문서',
        'insight': '인사이트',
    };
    return names[type] || type;
}

/**
 * 인사이트 카테고리 한글화
 */
export function getInsightCategoryName(category: string): string {
    const names: Record<string, string> = {
        'decision': '결정사항',
        'idea': '아이디어',
        'todo': '할 일',
        'question': '질문',
    };
    return names[category] || category;
}

/**
 * 텍스트 하이라이트
 */
export function highlightText(text: string, query: string): string {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 텍스트 요약 (최대 길이로 자르기)
 */
export function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 로컬 스토리지 유틸리티
 */
export const storage = {
    get: <T>(key: string, defaultValue: T): T => {
        if (typeof window === 'undefined') return defaultValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return;

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },

    remove: (key: string): void => {
        if (typeof window === 'undefined') return;

        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    },
};

/**
 * 색상 생성 (태그, 카테고리 등에 사용)
 */
export function generateColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
}
