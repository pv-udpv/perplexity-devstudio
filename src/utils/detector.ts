export function detectLanguage(url: string, code?: string): string {
  const ext = url.split('.').pop()?.toLowerCase();
  
  const extMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'javascript',
    'tsx': 'javascript',
    'json': 'json',
    'css': 'css',
    'scss': 'css',
    'less': 'css',
    'html': 'html',
    'htm': 'html'
  };
  
  if (ext && extMap[ext]) return extMap[ext];
  
  // Fallback: try to detect from content
  if (code) {
    if (code.trim().startsWith('{') || code.trim().startsWith('[')) return 'json';
    if (code.includes('<!DOCTYPE') || code.includes('<html')) return 'html';
    if (code.includes('function') || code.includes('const ') || code.includes('let ')) return 'javascript';
  }
  
  return 'javascript';
}
