import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: 'Perplexity DevStudio',
        namespace: 'pplx.devstudio',
        version: '0.1.0',
        description: 'Full-featured code IDE overlay with AI assistant, Storage Explorer, Network Inspector for Perplexity.ai and raw files',
        author: 'pv-udpv',
        match: [
          'https://www.perplexity.ai/*',
          '*://*/*.js',
          '*://*/*.json',
          '*://*/*.css',
          '*://*/*.html'
        ],
        grant: [
          'GM.xmlHttpRequest',
          'GM.setValue',
          'GM.getValue',
          'unsafeWindow'
        ],
        connect: [
          'localhost',
          '127.0.0.1',
          '*.ngrok-free.app'
        ],
        runAt: 'document-idle',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🔧</text></svg>'
      },
      build: {
        externalGlobals: {
          prettier: ['prettier', (version) => `https://unpkg.com/prettier@${version}/standalone.js`],
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
  },
});
