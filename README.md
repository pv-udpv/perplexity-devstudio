# 🔧 Perplexity DevStudio

> Full-featured code IDE overlay with AI assistant, Storage Explorer, and Network Inspector for Perplexity.ai and raw code files.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)

## ✨ Features

### 🖥️ Desktop Mode
- **Full CodeMirror 6 Editor** with syntax highlighting (JS/JSON/CSS/HTML)
- **AI Assistant Panel** powered by Perplexity streaming API
- **Network Inspector** with request/response tracking
- **One-Click Actions**: Format (Prettier), Explain, Debug, Export to StackBlitz
- **Custom Toolbar** integrated into editor UI

### 📱 Mobile Mode (iOS/Android)
- **Touch-Optimized Inspector** with large tap targets
- **Collapsible JSON Viewer** with react-json-view-lite
- **Sticky Toolbar** above keyboard for quick actions
- **AI Analysis** on-demand for network requests
- **Responsive Layout** adapts to screen size

### 🌐 Dual Operating Modes

#### 1. Overlay Mode (on Perplexity.ai)
- Floating button to toggle DevStudio
- Network request interception
- Analyze live API traffic with AI

#### 2. Raw File Viewer Mode
- Automatically takes over `.js`, `.json`, `.css`, `.html` files
- Transforms plain text view into full IDE
- Works on any domain

## 🚀 Installation

### For Safari (macOS/iOS)

1. Install [**Userscripts**](https://apps.apple.com/us/app/userscripts/id1463298887) (App Store)
2. Download the built userscript:
   ```bash
   # Clone and build
   git clone https://github.com/pv-udpv/perplexity-devstudio.git
   cd perplexity-devstudio
   npm install
   npm run build
   ```
3. Copy `dist/perplexity-devstudio.user.js` to Userscripts app
4. Enable the script

### For Chrome/Edge/Firefox

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Follow build steps above
3. Open Tampermonkey Dashboard → Utilities → Install from file
4. Select the built `.user.js` file

## 📖 Usage

### On Perplexity.ai

1. Navigate to `https://www.perplexity.ai`
2. Click the floating 🔧 button (bottom-right)
3. DevStudio overlay opens
4. **Code Tab**: Paste/edit code, use AI to explain
5. **Network Tab**: View intercepted requests

### On Raw Files

1. Open any `.js` URL (e.g., `https://cdn.example.com/app.js`)
2. DevStudio automatically replaces browser's plain text view
3. Code is syntax-highlighted and editable
4. Use toolbar: **Format** → **Explain** → **StackBlitz**

### Toolbar Actions

| Button | Action | Shortcut |
|--------|--------|----------|
| ↩️ Undo | Undo last edit | - |
| ↪️ Redo | Redo edit | - |
| ✨ Format | Auto-format with Prettier | - |
| 🧠 Explain | Ask AI to explain selected code | - |
| ⚡ StackBlitz | Open code in live sandbox | - |

## 🛠️ Development

### Project Structure

```
perplexity-devstudio/
├── src/
│   ├── main.tsx                 # Entry point
│   ├── components/
│   │   ├── DevStudio.tsx        # Main IDE component
│   │   ├── CodeEditor.tsx       # CodeMirror wrapper
│   │   ├── AIPanel.tsx          # AI chat interface
│   │   ├── MobileInspector.tsx  # Mobile UI
│   │   └── NetworkPanel.tsx     # Network logs
│   ├── extensions/
│   │   ├── toolbar.ts           # CM6 toolbar extension
│   │   └── theme.ts             # One Dark theme
│   ├── services/
│   │   ├── pplx-api.ts          # Perplexity SSE client
│   │   ├── network-interceptor.ts
│   │   └── stackblitz.ts
│   ├── utils/
│   │   ├── beautify.ts          # Prettier wrapper
│   │   └── detector.ts          # Language detection
│   └── styles/
│       └── global.css
├── vite.config.ts
├── package.json
└── README.md
```

### Build Commands

```bash
# Install dependencies
npm install

# Development mode with hot reload
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 🧩 Tech Stack

- **Vite** - Build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **CodeMirror 6** - Code editor
- **Prettier** - Code formatting
- **StackBlitz SDK** - Live sandbox export
- **vite-plugin-monkey** - Userscript bundling

## 🔒 Privacy & Security

- **No external servers**: All processing happens locally or on Perplexity.ai
- **No analytics**: Zero tracking
- **Open source**: Full code transparency
- **Scoped permissions**: Only granted APIs are `GM.xmlHttpRequest`, `GM.setValue/getValue`

## 📋 Roadmap

- [ ] IndexedDB/Cache Storage explorer
- [ ] Eruda integration
- [ ] GitHub Gist export
- [ ] Multi-file project support
- [ ] Diff view for AI suggestions
- [ ] Custom themes
- [ ] Keyboard shortcuts

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first.

## 📄 License

MIT © [pv-udpv](https://github.com/pv-udpv)

## 🙏 Acknowledgments

- [CodeMirror](https://codemirror.net/) - Excellent editor framework
- [Perplexity AI](https://www.perplexity.ai/) - Powerful search and reasoning
- [Replit](https://blog.replit.com/codemirror-mobile) - Mobile CodeMirror inspiration
