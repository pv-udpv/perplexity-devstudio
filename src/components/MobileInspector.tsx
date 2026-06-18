import React, { useState } from 'react';
import JsonView from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useNetworkLogs, NetworkLog } from '../services/network-interceptor';
import { pplxAskStream } from '../services/pplx-api';

export const MobileInspector: React.FC = () => {
  const logs = useNetworkLogs();
  const [selectedLog, setSelectedLog] = useState<NetworkLog | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  
  const analyze = async (log: NetworkLog) => {
    setAiAnalysis('Thinking...');
    let answer = '';
    await pplxAskStream(
      `Analyze this API request:\nURL: ${log.url}\nStatus: ${log.status}\nResponse: ${log.responseBody?.slice(0, 500)}`,
      chunk => {
        answer += chunk;
        setAiAnalysis(answer);
      }
    );
  };

  if (selectedLog) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1e1e1e', color: '#fff' }}>
        <div style={{ padding: '15px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => setSelectedLog(null)} style={{ background: 'none', border: 'none', fontSize: '24px', marginRight: '15px', color: '#fff' }}>←</button>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedLog.url.split('/').pop()}
          </div>
        </div>
        
        <div style={{ flex: 1, overflow: 'auto', padding: '15px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ 
              background: selectedLog.status === 200 ? '#28a745' : '#dc3545',
              padding: '4px 8px', borderRadius: '4px', fontSize: '12px' 
            }}>
              {selectedLog.method} {selectedLog.status}
            </span>
            <div style={{ marginTop: '10px', wordBreak: 'break-all', fontSize: '13px', color: '#aaa' }}>
              {selectedLog.url}
            </div>
          </div>

          <div style={{ background: '#252526', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>🤖 AI Helper</h4>
            {aiAnalysis ? (
              <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{aiAnalysis}</div>
            ) : (
              <button 
                onClick={() => analyze(selectedLog)}
                style={{ width: '100%', padding: '12px', background: '#0e639c', border: 'none', color: 'white', borderRadius: '6px', fontSize: '16px' }}
              >
                🔍 Analyze Request
              </button>
            )}
          </div>

          {selectedLog.responseBody && (
            <div style={{ background: '#252526', padding: '10px', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Response</h4>
              <JsonView 
                data={tryParse(selectedLog.responseBody)} 
                shouldInitiallyExpand={(level) => level < 1}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: '#1e1e1e', color: '#fff', overflow: 'auto' }}>
      <div style={{ padding: '15px', borderBottom: '1px solid #333', fontWeight: 'bold' }}>
        Network Logs ({logs.length})
      </div>
      {logs.map(log => (
        <div 
          key={log.id}
          onClick={() => setSelectedLog(log)}
          style={{ 
            padding: '15px', 
            borderBottom: '1px solid #2a2a2a',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ 
            width: '40px', 
            color: log.status === 200 ? '#4caf50' : '#f44336',
            fontWeight: 'bold',
            fontSize: '12px'
          }}>
            {log.status}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>
              {log.url.split('/').slice(-1)[0].split('?')[0]}
            </div>
            <div style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {log.url}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {Math.round(log.duration || 0)}ms
          </div>
        </div>
      ))}
    </div>
  );
};

function tryParse(str: string) {
  try { return JSON.parse(str); } catch { return { text: str }; }
}
