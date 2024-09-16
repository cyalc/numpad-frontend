import React from 'react';

interface ConnectionStatusProps {
    status: 'connected' | 'disconnected' | 'error';
    errorMessage?: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, errorMessage }) => {

    const getStatusColor = () => {
        switch (status) {
            case 'connected':
                return 'bg-green-500';
            case 'disconnected':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
        }
    }

    return (
        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor()} text-white`}>
            {status === 'connected' && 'Connected'}
            {status === 'disconnected' && 'Disconnected'}
            {status === 'error' && (
                <>
                    Error: {errorMessage || 'Unknown error'}
                </>
            )}
        </div>
    );
};

export default ConnectionStatus;