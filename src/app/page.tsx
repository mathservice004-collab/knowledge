import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="fade-in">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          대시보드
        </h1>
        <p className="text-[var(--text-secondary)]">
          통합 지식 관리 시스템의 현황을 한눈에 확인하세요
        </p>
      </div>

      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <div className="space-y-6">
          {/* 빠른 액션 */}
          <div className="card fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              빠른 액션
            </h3>
            <div className="space-y-2">
              <a
                href="/search"
                className="block p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <div className="font-medium text-[var(--text-primary)]">검색</div>
                <div className="text-sm text-[var(--text-secondary)]">
                  지식 베이스 검색
                </div>
              </a>
              <a
                href="/connectors"
                className="block p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <div className="font-medium text-[var(--text-primary)]">커넥터 관리</div>
                <div className="text-sm text-[var(--text-secondary)]">
                  플랫폼 연결 관리
                </div>
              </a>
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="card fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              시스템 상태
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">검색 엔진</span>
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-success)]"></span>
                  정상
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">동기화</span>
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-success)]"></span>
                  정상
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">LLM 서비스</span>
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-success)]"></span>
                  정상
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

