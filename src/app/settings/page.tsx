import Card from '@/components/ui/Card';

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div className="fade-in">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    설정
                </h1>
                <p className="text-[var(--text-secondary)]">
                    시스템 설정 및 개인화 옵션을 관리하세요
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="fade-in">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                        일반 설정
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                언어
                            </label>
                            <select className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)]">
                                <option>한국어</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                테마
                            </label>
                            <select className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)]">
                                <option>다크 모드</option>
                                <option>라이트 모드</option>
                                <option>시스템 설정 따르기</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="fade-in" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                        검색 설정
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-[var(--text-primary)]">
                                    의미 검색 활성화
                                </div>
                                <div className="text-sm text-[var(--text-secondary)]">
                                    AI 기반 의미 검색 사용
                                </div>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-[var(--text-primary)]">
                                    검색 기록 저장
                                </div>
                                <div className="text-sm text-[var(--text-secondary)]">
                                    최근 검색어 기록
                                </div>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </div>
                    </div>
                </Card>

                <Card className="fade-in" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                        동기화 설정
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                자동 동기화 간격
                            </label>
                            <select className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)]">
                                <option>15분</option>
                                <option>30분</option>
                                <option>1시간</option>
                                <option>수동</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="fade-in" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                        프라이버시
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-[var(--text-primary)]">
                                    데이터 암호화
                                </div>
                                <div className="text-sm text-[var(--text-secondary)]">
                                    로컬 데이터 암호화
                                </div>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-[var(--text-primary)]">
                                    분석 데이터 수집
                                </div>
                                <div className="text-sm text-[var(--text-secondary)]">
                                    서비스 개선을 위한 익명 데이터
                                </div>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
