# Knowledge Hub - 통합 지식 관리 시스템

여러 플랫폼(Slack, Notion, Google Drive 등)의 업무 기록과 문서를 하나의 지식 그래프로 통합하는 웹 서비스입니다.

## 🎯 핵심 기능

### 1. 멀티 플랫폼 통합
- **지원 플랫폼**: Slack, Notion, Google Drive (MVP)
- **OAuth 기반 인증**: 안전한 계정 연결
- **증분 동기화**: 변경된 데이터만 효율적으로 동기화
- **다계정 지원**: 플랫폼별 여러 계정 연결 가능

### 2. 지능형 검색
- **키워드 검색**: 전통적인 BM25 기반 검색
- **의미 검색**: AI 기반 시맨틱 검색
- **하이브리드 검색**: 키워드 + 의미 검색 결합
- **실시간 검색 제안**: 최근 검색어 기반 자동완성

### 3. 컨텍스트 관리
- **이벤트**: 회의, 대화 세션
- **아티팩트**: 문서, 메모, 파일
- **인사이트**: 결정사항, 아이디어, TODO

### 4. 프리미엄 UX/UI
- **다크/라이트 모드**: 자동 전환 및 수동 선택
- **Glassmorphism**: 현대적인 유리 효과
- **부드러운 애니메이션**: 마이크로 인터랙션
- **반응형 디자인**: 모든 디바이스 지원

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

개발 서버가 실행되면 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

## 📁 프로젝트 구조

```
knowledge-hub/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx           # 대시보드 (홈)
│   │   ├── search/            # 검색 페이지
│   │   ├── connectors/        # 커넥터 관리 페이지
│   │   ├── settings/          # 설정 페이지
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── globals.css        # 글로벌 스타일 (디자인 시스템)
│   │
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── dashboard/        # 대시보드 컴포넌트
│   │   │   ├── StatsOverview.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── search/           # 검색 컴포넌트
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchResults.tsx
│   │   └── connectors/       # 커넥터 컴포넌트
│   │       └── ConnectorList.tsx
│   │
│   ├── store/                # Zustand 상태 관리
│   │   ├── theme.ts          # 테마 스토어
│   │   ├── connectors.ts     # 커넥터 스토어
│   │   └── search.ts         # 검색 스토어
│   │
│   ├── types/                # TypeScript 타입 정의
│   │   └── index.ts
│   │
│   └── lib/                  # 유틸리티 함수
│       └── utils.ts
│
├── public/                   # 정적 파일
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue (#3b82f6 / #60a5fa)
- **Secondary**: Purple (#8b5cf6 / #a78bfa)
- **Success**: Green (#10b981 / #34d399)
- **Warning**: Amber (#f59e0b / #fbbf24)
- **Error**: Red (#ef4444 / #f87171)

### 타이포그래피
- **폰트**: Pretendard (한글), System Fonts (영문)
- **크기**: 16px 기본, 반응형 스케일

### 컴포넌트
- **Card**: 기본 카드 컴포넌트, Glassmorphism 옵션
- **Button**: Primary, Secondary, Ghost, Danger 변형
- **Input**: 라벨, 에러 상태 지원
- **Badge**: 상태 표시용 배지

## 🔧 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + CSS Variables
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: date-fns

### 향후 Backend (계획)
- **API**: GraphQL + REST
- **Database**: PostgreSQL
- **Search**: OpenSearch / Weaviate
- **Vector Store**: FAISS / Milvus
- **LLM**: Self-hosted Open-source (LLaMA, Mistral, Qwen)

## 📊 주요 페이지

### 1. 대시보드 (`/`)
- 전체 컨텍스트 통계
- 최근 활동 피드
- 빠른 액션 메뉴
- 시스템 상태 모니터링

### 2. 검색 (`/search`)
- 통합 검색바
- 실시간 검색 제안
- 검색 결과 (관련도 점수, 하이라이트)
- 필터링 옵션

### 3. 커넥터 (`/connectors`)
- 연결된 플랫폼 목록
- 동기화 상태 및 진행률
- 새 플랫폼 연결
- 커넥터 관리 (동기화, 삭제)

### 4. 설정 (`/settings`)
- 일반 설정 (언어, 테마)
- 검색 설정
- 동기화 설정
- 프라이버시 설정

## 🎯 MVP 범위

현재 버전(v1.0.0)은 MVP로 다음 기능을 포함합니다:

✅ **완료된 기능**
- 프리미엄 디자인 시스템 (다크/라이트 모드)
- 대시보드 UI
- 검색 인터페이스
- 커넥터 관리 UI
- 상태 관리 (Zustand)
- Mock 데이터 기반 데모

🚧 **Phase 2 계획**
- 실제 API 연동
- OAuth 인증 구현
- 실시간 동기화
- LLM 기반 요약
- 고급 필터링
- 그래프 시각화

## 🔒 보안 및 프라이버시

- **데이터 암호화**: 로컬 데이터 암호화 옵션
- **OAuth 인증**: 안전한 플랫폼 연결
- **Read-only 접근**: 원본 데이터 훼손 방지
- **데이터 분리**: 계정별 완전 격리
- **오픈소스 LLM**: 프라이버시 친화적 AI

## 📈 성공 지표

- **검색 성공률**: 사용자가 원하는 정보를 찾는 비율
- **재방문률**: DAU/WAU 비율
- **동기화 안정성**: 실패율 < 0.1%
- **렌더링 에러**: 발생률 < 0.1%

## 🤝 기여하기

이 프로젝트는 현재 개발 중입니다. 기여를 환영합니다!

## 📝 라이선스

MIT License

## 📧 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**Knowledge Hub** - 기억은 사람이 아니라 시스템이 한다
