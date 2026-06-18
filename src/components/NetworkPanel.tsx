import React from 'react';
import { useNetworkLogs } from '../services/network-interceptor';

export const NetworkPanel: React.FC = () => {
  const logs = useNetworkLogs();

  return (
    <div style={{ width: '100%', height: '100%', background: '#21252b', color: '#d7dae0' }}>
      <div style={{ padding: '15px', borderBottom: '1px solid #181a1f', fontWeight: 'bold' }}>
        Network Activity ({logs.length} requests)
      </div>
      <div style={{ overflow: 'auto', height: 'calc(100% - 50px)' }}>
        {logs.map(log => (
          <div key={log.id} style={{ 
            padding: '12px 15px', 
            borderBottom: '1px solid #282c34',
            display: 'flex',
            gap: '15px',
            fontSize: '13px'
          }}>
            <div style={{ width: '50px', color: log.status === 200 ? '#98c379' : '#e06c75', fontWeight: 'bold' }}>
              {log.status}
            </div>
            <div style={{ width: '60px', color: '#61afef' }}>{log.method}</div>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {log.url}
            </div>
            <div style={{ width: '60px', textAlign: 'right', color: '#5c6370' }}>
              {log.duration ? `${Math.round(log.duration)}ms` : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
