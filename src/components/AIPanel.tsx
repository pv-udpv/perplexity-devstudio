import React, { useState, useEffect, useRef } from 'react';
import { pplxAskStream } from '../services/pplx-api';
import ReactMarkdown from 'react-markdown';

interface AIPanelProps {
  context: string;
  code: string;
}

export const AIPanel: React.FC<AIPanelProps> = ({ context, code }) => {
  const [messages, setMessages] = useState<Array<{role: 'user'|'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context) {
      handleAsk(`Explain this code snippet:\n\`\`\`\n${context}\n\`\`\``);
    }
  }, [context]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = async (query: string) => {
    if (!query.trim()) return;
    
    const newMsgs = [...messages, { role: 'user', content: query }];
    setMessages(newMsgs as any);
    setIsLoading(true);
    setInput('');
    
    try {
      let currentAnswer = '';
      setMessages([...newMsgs, { role: 'assistant', content: '' }] as any);
      
      await pplxAskStream(query, (chunk) => {
        currentAnswer += chunk;
        setMessages([...newMsgs, { role: 'assistant', content: currentAnswer }] as any);
      });
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `❌ Error: ${err}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#21252b' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px', color: '#d7dae0' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#5c6370' }}>
            <h3>🤖 AI Assistant</h3>
            <p>Select code and click "Explain" or type below.</p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            marginBottom: '16px',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%'
          }}>
            <div style={{
              background: msg.role === 'user' ? '#4d78cc' : '#282c34',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '12px', borderTop: '1px solid #181a1f' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk(input)}
            placeholder="Ask anything about the code..."
            style={{
              flex: 1,
              background: '#282c34',
              border: '1px solid #181a1f',
              color: '#abb2bf',
              padding: '8px 12px',
              borderRadius: '4px',
              outline: 'none'
            }}
          />
          <button 
            onClick={() => handleAsk(input)}
            disabled={isLoading}
            style={{
              background: '#4d78cc',
              border: 'none',
              color: 'white',
              padding: '0 16px',
              borderRadius: '4px',
              cursor: isLoading ? 'wait' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};
