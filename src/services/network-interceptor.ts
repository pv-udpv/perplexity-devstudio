import React from 'react';

export interface NetworkLog {
  id: string;
  url: string;
  method: string;
  status?: number;
  startTime: number;
  duration?: number;
  responseBody?: string;
  requestBody?: string;
  type: 'fetch' | 'xhr';
}

const logs: NetworkLog[] = [];
const listeners: ((logs: NetworkLog[]) => void)[] = [];

export function initNetworkInterceptor() {
  const origFetch = window.fetch;
  
  window.fetch = async (...args) => {
    const [resource, config] = args;
    const id = Math.random().toString(36).substr(2, 9);
    const startTime = performance.now();
    const url = typeof resource === 'string' ? resource : (resource as Request).url;
    
    const log: NetworkLog = {
      id,
      url,
      method: config?.method || 'GET',
      startTime,
      type: 'fetch',
      requestBody: typeof config?.body === 'string' ? config.body : undefined
    };
    
    logs.unshift(log);
    notify();
    
    try {
      const response = await origFetch(...args);
      const clone = response.clone();
      
      log.status = response.status;
      log.duration = performance.now() - startTime;
      
      clone.text().then(text => {
        log.responseBody = text.slice(0, 100000);
        notify();
      });
      
      return response;
    } catch (err) {
      log.status = 0;
      notify();
      throw err;
    }
  };
}

function notify() {
  listeners.forEach(cb => cb([...logs]));
}

export function useNetworkLogs() {
  const [data, setData] = React.useState<NetworkLog[]>(logs);
  React.useEffect(() => {
    listeners.push(setData);
    return () => {
      const idx = listeners.indexOf(setData);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);
  return data;
}
