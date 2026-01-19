import React from 'react';
import ReactDOM from 'react-dom/client';
import { DevStudio } from './components/DevStudio';
import { MobileInspector } from './components/MobileInspector';
import { initNetworkInterceptor } from './services/network-interceptor';
import { detectLanguage } from './utils/detector';
import './styles/global.css';

// Detect environment
const isRawFile = () => {
  const contentType = document.contentType || '';
  const isTextFile = contentType.includes('javascript') || 
                     contentType.includes('json') || 
                     contentType.includes('css') ||
                     contentType === 'text/plain';
  const isSinglePre = document.body.children.length === 1 && 
                     document.body.children[0]?.tagName === 'PRE';
  return isTextFile || isSinglePre;
};

const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

// Main entry
if (isRawFile()) {
  // MODE: Raw File Viewer (full takeover)
  const rawCode = document.body.innerText || document.body.textContent || '';
  const language = detectLanguage(window.location.href, rawCode);
  
  // Clear and mount
  document.head.innerHTML = '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>DevStudio - ' + document.title + '</title>';
  document.body.innerHTML = '<div id="devstudio-root"></div>';
  document.body.style.cssText = 'margin:0;padding:0;overflow:hidden;';
  
  ReactDOM.createRoot(document.getElementById('devstudio-root')!).render(
    <React.StrictMode>
      <DevStudio 
        initialCode={rawCode} 
        language={language}
        mode="fullscreen"
        filename={new URL(window.location.href).pathname.split('/').pop() || 'untitled'}
      />
    </React.StrictMode>
  );
} else {
  // MODE: Overlay on Perplexity.ai
  initNetworkInterceptor();
  
  // Create floating button
  const createTrigger = () => {
    const btn = document.createElement('div');
    btn.id = 'devstudio-trigger';
    btn.innerHTML = '🔧';
    btn.style.cssText = `
      position: fixed;
      bottom: ${isMobile ? '80px' : '20px'};
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 999999;
      transition: transform 0.2s;
    `;
    btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    btn.onclick = toggleOverlay;
    document.body.appendChild(btn);
  };
  
  let overlayRoot: ReactDOM.Root | null = null;
  
  const toggleOverlay = () => {
    let container = document.getElementById('devstudio-overlay');
    
    if (container) {
      // Close
      container.remove();
      overlayRoot = null;
    } else {
      // Open
      container = document.createElement('div');
      container.id = 'devstudio-overlay';
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 999998;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      `;
      document.body.appendChild(container);
      
      overlayRoot = ReactDOM.createRoot(container);
      overlayRoot.render(
        <React.StrictMode>
          {isMobile ? <MobileInspector /> : <DevStudio mode="overlay" />}
        </React.StrictMode>
      );
    }
  };
  
  // Wait for page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTrigger);
  } else {
    createTrigger();
  }
}
