import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { AIPanel } from './AIPanel';
import { NetworkPanel } from './NetworkPanel';

interface DevStudioProps {
  initialCode?: string;
  language?: string;
  mode?: 'fullscreen' | 'overlay';
  filename?: string;
}

export const DevStudio: React.FC<DevStudioProps> = ({ 
  initialCode = '', 
  language = 'javascript',
  mode = 'overlay',
  filename = 'untitled.js'
}) => {
  const [code, setCode] = useState(initialCode);
  const [aiContext, setAiContext] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'code' | 'network'>('code');
  
  const containerStyle: React.CSSProperties = mode === 'fullscreen' 
    ? { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }
    : { 
        width: '90vw', 
        height: '85vh', 
        maxWidth: '1400px',
        background: '#282c34', 
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      };
  
  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{
        background: '#21252b',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #181a1f'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🔧</span>
          <h2 style={{ margin: 0, color: '#abb2bf', fontSize: '16px' }}>
            Perplexity DevStudio
          </h2>
          <span style={{ color: '#5c6370', fontSize: '14px' }}>• {filename}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('code')}
            style={{
              background: activeTab === 'code' ? '#3e4451' : 'transparent',
              color: '#abb2bf',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Code
          </button>
          <button 
            onClick={() => setActiveTab('network')}
            style={{
              background: activeTab === 'network' ? '#3e4451' : 'transparent',
              color: '#abb2bf',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Network
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden'
      }}>
        {activeTab === 'code' && (
          <>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <CodeEditor 
                code={code}
                language={language}
                onChange={setCode}
                onAIRequest={setAiContext}
              />
            </div>
            <div style={{ 
              width: '400px', 
              borderLeft: '1px solid #181a1f',
              overflow: 'auto'
            }}>
              <AIPanel context={aiContext} code={code} />
            </div>
          </>
        )}
        
        {activeTab === 'network' && (
          <NetworkPanel />
        )}
      </div>
    </div>
  );
};
