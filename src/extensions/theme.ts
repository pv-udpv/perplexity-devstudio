import { EditorView } from '@codemirror/view';

export const customTheme = EditorView.theme({
  '.cm-devstudio-toolbar': {
    display: 'flex',
    gap: '8px',
    padding: '8px 12px',
    background: '#21252b',
    borderBottom: '2px solid #181a1f',
    overflowX: 'auto',
    whiteSpace: 'nowrap'
  },
  
  '.cm-devstudio-toolbar button': {
    background: 'linear-gradient(180deg, #4b5363 0%, #3e4451 100%)',
    border: '1px solid #181a1f',
    borderRadius: '4px',
    color: '#d7dae0',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    whiteSpace: 'nowrap'
  },
  
  '.cm-devstudio-toolbar button:hover': {
    background: 'linear-gradient(180deg, #5c6370 0%, #4b5363 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
  },
  
  '.cm-devstudio-toolbar button:active': {
    transform: 'translateY(0)',
    boxShadow: 'none'
  },
  
  '.cm-devstudio-toolbar button span': {
    fontSize: '16px',
    lineHeight: '1'
  },
  
  '@media (max-width: 768px)': {
    '.cm-devstudio-toolbar button': {
      padding: '8px 10px',
      fontSize: '15px'
    }
  }
}, { dark: true });
