import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="fade-in space-y-3">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter">
          인사이트 대시보드
        </h1>
        <p className="text-lg font-medium text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          지식 베이스의 실시간 통합 현황과 지능형 인사이트를 한눈에 관리하세요
        </p>
      </div>

      <StatsOverview />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
        <div className="xl:col-span-2 space-y-10">
          <RecentActivity />
        </div>

        <div className="space-y-8">
          {/* 빠른 액션 */}
          <div className="card fade-in overflow-hidden border-none shadow-xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-secondary)]" style={{ animationDelay: '200ms' }}>
            <div className="p-8">
              <h3 className="text-sm font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-6">
                빠른 액션
              </h3>
              <div className="space-y-4">
                <a
                  href="/search"
                  className="group block p-4 rounded-2xl bg-[var(--bg-primary)]/50 hover:bg-[var(--accent-primary)] transition-all duration-300 shadow-sm"
                >
                  <div className="font-bold text-[var(--text-primary)] group-hover:text-white transition-colors">통합 검색</div>
                  <div className="text-xs text-[var(--text-secondary)] group-hover:text-white/80 transition-colors mt-1">
                    지식 베이스 전역 탐색
                  </div>
                </a>
                <a
                  href="/connectors"
                  className="group block p-4 rounded-2xl bg-[var(--bg-primary)]/50 hover:bg-[var(--accent-primary)] transition-all duration-300 shadow-sm"
                >
                  <div className="font-bold text-[var(--text-primary)] group-hover:text-white transition-colors">커넥터 관리</div>
                  <div className="text-xs text-[var(--text-secondary)] group-hover:text-white/80 transition-colors mt-1">
                    외부 플랫폼 연결 및 제어
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="card fade-in border-none shadow-xl bg-[var(--bg-elevated)]" style={{ animationDelay: '300ms' }}>
            <div className="p-8">
              <h3 className="text-sm font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-6">
                시스템 상태
              </h3>
              <div className="space-y-6">
                {[
                  { label: '검색 엔진', status: '정상' },
                  { label: '데이터 동기화', status: '정상' },
                  { label: 'LLM 분석 서비스', status: '정상' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--text-secondary)]">{item.label}</span>
                    <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--accent-success)]/10 text-[var(--accent-success)] text-xs font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-success)] animate-pulse"></span>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
