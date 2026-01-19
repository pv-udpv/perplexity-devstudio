import { showPanel, EditorView } from '@codemirror/view';
import { undo, redo } from '@codemirror/commands';
import { beautifyCode } from '../utils/beautify';
import { openInStackBlitz } from '../services/stackblitz';

export const toolbarExtension = (onAIRequest?: (text: string) => void) => {
  return showPanel.of(view => {
    const dom = document.createElement('div');
    dom.className = 'cm-devstudio-toolbar';
    
    const createBtn = (label: string, icon: string, handler: () => void) => {
      const btn = document.createElement('button');
      btn.innerHTML = `<span>${icon}</span> ${label}`;
      btn.onclick = e => {
        e.preventDefault();
        handler();
        view.focus();
      };
      return btn;
    };
    
    dom.appendChild(createBtn('Undo', '↩️', () => undo(view)));
    dom.appendChild(createBtn('Redo', '↪️', () => redo(view)));
    
    dom.appendChild(createBtn('Format', '✨', async () => {
      const doc = view.state.doc.toString();
      const formatted = await beautifyCode(doc);
      if (formatted) {
        view.dispatch({
          changes: { from: 0, to: doc.length, insert: formatted }
        });
      }
    }));
    
    dom.appendChild(createBtn('Explain', '🧠', () => {
      const { from, to } = view.state.selection.main;
      const selectedText = view.state.sliceDoc(from, to) || view.state.doc.toString();
      onAIRequest?.(selectedText);
    }));
    
    dom.appendChild(createBtn('StackBlitz', '⚡', () => {
      const code = view.state.doc.toString();
      openInStackBlitz(code);
    }));
    
    return { dom, top: true };
  });
};
