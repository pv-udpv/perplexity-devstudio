import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { toolbarExtension } from '../extensions/toolbar';
import { customTheme } from '../extensions/theme';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (code: string) => void;
  onAIRequest?: (text: string) => void;
}

const langMap: Record<string, any> = {
  javascript: javascript(),
  json: json(),
  css: css(),
  html: html()
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  language, 
  onChange,
  onAIRequest
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  
  useEffect(() => {
    if (!editorRef.current) return;
    
    const view = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        langMap[language] || javascript(),
        oneDark,
        customTheme,
        toolbarExtension(onAIRequest),
        EditorView.updateListener.of(update => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
        })
      ],
      parent: editorRef.current
    });
    
    viewRef.current = view;
    
    return () => view.destroy();
  }, [language]);
  
  return <div ref={editorRef} style={{ height: '100%' }} />;
};
