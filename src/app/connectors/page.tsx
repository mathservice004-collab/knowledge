'use client';

import ConnectorList from '@/components/connectors/ConnectorList';

export default function ConnectorsPage() {
    return (
        <div className="space-y-8">
            <div className="fade-in">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    플랫폼 커넥터
                </h1>
                <p className="text-[var(--text-secondary)]">
                    Slack, Notion, Google Drive 등 다양한 플랫폼을 연결하고 관리하세요
                </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '100ms' }}>
                <ConnectorList />
            </div>
        </div>
    );
}
