import { create } from 'zustand';
import { Connector, PlatformType } from '@/types';

interface ConnectorStore {
    connectors: Connector[];
    isLoading: boolean;
    error: string | null;

    // Actions
    addConnector: (connector: Connector) => void;
    removeConnector: (id: string) => void;
    updateConnector: (id: string, updates: Partial<Connector>) => void;
    syncConnector: (id: string) => Promise<void>;
    fetchConnectors: () => Promise<void>;
}

// Mock 데이터 (실제로는 API에서 가져옴)
const mockConnectors: Connector[] = [
    {
        id: '1',
        platform: 'slack',
        accountName: 'My Workspace',
        accountEmail: 'user@example.com',
        status: 'connected',
        lastSyncedAt: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7일 전
    },
    {
        id: '2',
        platform: 'notion',
        accountName: 'Personal Workspace',
        accountEmail: 'user@example.com',
        status: 'connected',
        lastSyncedAt: new Date(Date.now() - 1000 * 60 * 15), // 15분 전
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14일 전
    },
];

export const useConnectorStore = create<ConnectorStore>((set, get) => ({
    connectors: [],
    isLoading: false,
    error: null,

    addConnector: (connector) =>
        set((state) => ({
            connectors: [...state.connectors, connector],
        })),

    removeConnector: (id) =>
        set((state) => ({
            connectors: state.connectors.filter((c) => c.id !== id),
        })),

    updateConnector: (id, updates) =>
        set((state) => ({
            connectors: state.connectors.map((c) =>
                c.id === id ? { ...c, ...updates } : c
            ),
        })),

    syncConnector: async (id) => {
        const { updateConnector } = get();

        // 동기화 시작
        updateConnector(id, { status: 'syncing', syncProgress: 0 });

        // Mock 동기화 프로세스
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            updateConnector(id, { syncProgress: i });
        }

        // 동기화 완료
        updateConnector(id, {
            status: 'connected',
            lastSyncedAt: new Date(),
            syncProgress: undefined,
        });
    },

    fetchConnectors: async () => {
        set({ isLoading: true, error: null });

        try {
            // Mock API 호출
            await new Promise((resolve) => setTimeout(resolve, 500));
            set({ connectors: mockConnectors, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '커넥터를 불러오는데 실패했습니다.',
                isLoading: false,
            });
        }
    },
}));
