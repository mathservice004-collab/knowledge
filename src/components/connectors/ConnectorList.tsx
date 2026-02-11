'use client';

import { useEffect } from 'react';
import { useConnectorStore } from '@/store/connectors';
import { formatRelativeTime, getPlatformName } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Slack, FileText, HardDrive, RefreshCw, Trash2, CheckCircle, XCircle, Loader } from 'lucide-react';
import { PlatformType, ConnectionStatus } from '@/types';

function getPlatformIcon(platform: PlatformType) {
    switch (platform) {
        case 'slack':
            return <Slack size={24} />;
        case 'notion':
            return <FileText size={24} />;
        case 'google-drive':
            return <HardDrive size={24} />;
        default:
            return <FileText size={24} />;
    }
}

function getStatusBadge(status: ConnectionStatus) {
    switch (status) {
        case 'connected':
            return <Badge variant="success">연결됨</Badge>;
        case 'disconnected':
            return <Badge variant="error">연결 끊김</Badge>;
        case 'syncing':
            return <Badge variant="info">동기화 중</Badge>;
        case 'error':
            return <Badge variant="error">오류</Badge>;
        default:
            return <Badge>알 수 없음</Badge>;
    }
}

function getStatusIcon(status: ConnectionStatus) {
    switch (status) {
        case 'connected':
            return <CheckCircle size={16} className="text-[var(--accent-success)]" />;
        case 'disconnected':
            return <XCircle size={16} className="text-[var(--accent-error)]" />;
        case 'syncing':
            return <Loader size={16} className="text-[var(--accent-primary)] animate-spin" />;
        case 'error':
            return <XCircle size={16} className="text-[var(--accent-error)]" />;
        default:
            return null;
    }
}

export default function ConnectorList() {
    const { connectors, isLoading, fetchConnectors, syncConnector, removeConnector } = useConnectorStore();

    useEffect(() => {
        fetchConnectors();
    }, [fetchConnectors]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <Card key={i} className="skeleton h-48">
                        <div />
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">연결된 플랫폼</h2>
                    <p className="text-[var(--text-secondary)] mt-1">
                        {connectors.length}개의 플랫폼이 연결되어 있습니다
                    </p>
                </div>
                <Button variant="primary">
                    + 새 플랫폼 연결
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {connectors.map((connector, index) => (
                    <Card
                        key={connector.id}
                        className="fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white">
                                    {getPlatformIcon(connector.platform)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)]">
                                        {getPlatformName(connector.platform)}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {connector.accountName}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(connector.status)}
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">계정</span>
                                <span className="text-[var(--text-primary)]">{connector.accountEmail}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">마지막 동기화</span>
                                <span className="text-[var(--text-primary)]">
                                    {connector.lastSyncedAt ? formatRelativeTime(connector.lastSyncedAt) : '없음'}
                                </span>
                            </div>
                            {connector.status === 'syncing' && connector.syncProgress !== undefined && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-[var(--text-secondary)]">동기화 진행률</span>
                                        <span className="text-[var(--text-primary)]">{connector.syncProgress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-300"
                                            style={{ width: `${connector.syncProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex-1"
                                onClick={() => syncConnector(connector.id)}
                                disabled={connector.status === 'syncing'}
                                isLoading={connector.status === 'syncing'}
                            >
                                <RefreshCw size={16} className="mr-2" />
                                동기화
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    if (confirm('정말 이 커넥터를 삭제하시겠습니까?')) {
                                        removeConnector(connector.id);
                                    }
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
