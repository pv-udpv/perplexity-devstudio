import sdk from '@stackblitz/sdk';

export function openInStackBlitz(code: string, filename: string = 'index.js') {
  sdk.openProject({
    title: 'Perplexity DevStudio Export',
    template: 'javascript',
    files: {
      [filename]: code,
      'package.json': JSON.stringify({
        name: 'devstudio-export',
        version: '1.0.0',
        scripts: { start: 'node ' + filename }
      }, null, 2)
    }
  }, { 
    openFile: filename,
    newWindow: true 
  });
}
