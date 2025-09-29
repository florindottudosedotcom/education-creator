# AI Creator Hub - Universal Course & Presentation Platform

A comprehensive platform combining AI-powered content creation with automated publishing capabilities. Create courses and presentations using multiple AI providers, then export to professional formats.

## Features

### 🎓 Course Creator
- **Multi-Provider AI**: Choose from OpenRouter, WebLLM, Ollama, or Puter
- **AI-Powered Generation**: Generate complete multi-chapter courses from prompts
- **Rich Text Editing**: ToastUI Editor integration for content refinement
- **Multi-Language Support**: Translate to 11 languages with AI
- **MkDocs Export**: Download ready-to-deploy documentation sites

### 📊 Slides Creator
- **Presentation Generation**: Create 4-12 slide presentations from topics
- **Visual Editing**: Konva.js canvas with draggable elements
- **Multiple Export Formats**:
  - Markdown (Pandoc-ready for Beamer/PPTX conversion)
  - PDF (canvas-based rendering)
  - PowerPoint (native PPTX)
  - HTML (standalone presentations)
  - JSON (data backup)

### 🤖 AI Provider Support

| Provider | Type | Requirements |
|----------|------|--------------|
| **OpenRouter** | Cloud API | API key from [openrouter.ai](https://openrouter.ai/keys) |
| **WebLLM** | Browser-based | Modern browser, downloads models locally |
| **Ollama** | Local server | [Ollama](https://ollama.ai) running on localhost:11434 |
| **Puter** | Free cloud | No API key required |

## Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Python 3.11+ (for MkDocs publishing)
- Node.js (optional, for screenshot automation)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/florindottudosedotcom/education-creator.git
   cd education-creator
   ```

2. **Start the creator interface**
   ```bash
   # On macOS/Linux:
   ./start_course_creator.sh

   # On Windows:
   ./start_course_creator.bat
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000/creator/`
   - Select Course Creator or Slides Creator
   - Choose your AI provider and start creating!

### MkDocs Publishing

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Build the site**
   ```bash
   python build_site.py
   mkdocs build
   ```

3. **Preview locally**
   ```bash
   mkdocs serve
   ```
   Visit `http://127.0.0.1:8000`

## Usage

### Creating a Course

1. **Select AI Provider**: Choose from the available providers
2. **Connect**: Enter API key (if required) and connect
3. **Generate**: Describe your course and select depth/chapters
4. **Edit**: Refine content using the visual editor
5. **Translate** (optional): Select target languages for translation
6. **Export**: Download MkDocs-compatible ZIP file

### Creating Presentations

1. **Select AI Provider**: Choose your preferred provider
2. **Connect**: Authenticate (if required)
3. **Generate**: Enter topic and select slide count (4-12)
4. **Visual Edit**: Use Konva canvas to adjust slides
5. **Export**: Choose format (Markdown, PDF, PPTX, HTML, JSON)

### Pandoc Conversion

After exporting Markdown slides, convert locally:

```bash
# Convert to PDF (Beamer)
pandoc slides.md -o slides.pdf --pdf-engine=xelatex -t beamer

# Convert to PowerPoint
pandoc slides.md -o slides.pptx
```

## Project Structure

```
/
├── creator/                  # Creator interface
│   ├── index.html           # Main entry point
│   ├── course.html          # Course creator launcher
│   ├── slides.html          # Slides creator launcher
│   ├── assets/
│   │   ├── css/             # CSS architecture
│   │   │   ├── core/        # Variables, typography, reset
│   │   │   ├── components/  # Buttons, cards, forms, tabs
│   │   │   ├── layouts/     # Grid, containers
│   │   │   └── themes/      # Minimal theme
│   │   └── js/
│   │       ├── core/        # Core modules
│   │       ├── providers/   # AI provider implementations
│   │       └── pages/       # Page controllers
│   ├── slides/              # Slides provider pages
│   └── tests/               # Functional test suite
├── docs/                    # Published course content
├── .github/
│   └── workflows/
│       └── deploy.yml       # Automated GitHub Pages deployment
└── build_site.py            # Site generation script
```

## CSS-First Architecture

This project follows a strict CSS-first architecture:

- **No inline styles** in HTML
- **No CSS-in-JS** - all styling via CSS classes
- **CSS variables** for theming and consistency
- **Mobile-first** responsive design
- **Dark mode** via system preferences

All styling is defined in CSS files and applied through class manipulation.

## Testing

### Functional Tests
Open `creator/tests/functional-tests.html` in a browser to run the test suite.

Tests cover:
- Page loading
- CSS architecture compliance
- Icon system integration
- Provider implementations
- State management

### Manual Testing Checklist
- [ ] All provider pages load without errors
- [ ] Course generation works for each provider
- [ ] Slides generation works for each provider
- [ ] Export functionality produces valid files
- [ ] Multi-language translation generates content
- [ ] State persists across page reloads
- [ ] Mobile responsiveness on real devices
- [ ] Dark mode switches correctly

## Deployment

### GitHub Pages (Automated)

The platform includes GitHub Actions workflow for automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds MkDocs site
3. Deploys to GitHub Pages automatically

### Manual Deployment

```bash
# Build site
python build_site.py
mkdocs build

# Deploy contents of ./site directory to your hosting
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires ES6+ module support, CSS Grid/Flexbox, and localStorage/sessionStorage.

## Dependencies

### Core Libraries
- Lucide Icons (v0.263.1) - Icon system
- ToastUI Editor (v3.2.2) - Rich text editing
- JSZip (v3.10.1) - File compression
- Konva.js (v9.2.0) - Canvas manipulation
- jsPDF (v2.5.1) - PDF generation
- PptxGenJS (v3.12.0) - PowerPoint generation

### AI Provider SDKs
- WebLLM (@mlc-ai/web-llm) - Browser AI
- Puter SDK (js.puter.com/v2/) - Cloud AI

All libraries are loaded dynamically from CDN - no build step required for the creator interface.

## Security

### API Keys
- Never commit API keys to the repository
- API keys are stored in browser localStorage (client-side only)
- Clear localStorage to remove stored credentials

### Content Security Policy
The platform includes CSP headers to prevent XSS and other attacks. Trusted sources:
- Self
- CDN libraries (unpkg.com, cdn.jsdelivr.net, esm.run)
- AI provider APIs (openrouter.ai, localhost:11434, js.puter.com)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the CSS-first architecture guidelines
4. Run tests before committing
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Maintain CSS-first architecture (no inline styles)
- Use Lucide icons (no emojis)
- Follow existing code patterns
- Test on multiple browsers
- Ensure mobile responsiveness

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check existing documentation in `/docs`
- Review the PRD.md for implementation details

## Roadmap

- [x] Phase 1: Core infrastructure
- [x] Phase 2: OpenRouter course creator
- [x] Phase 3: Multi-provider support
- [x] Phase 4: Advanced features (translation, slides)
- [x] Phase 5: Testing & deployment
- [ ] Future: Visual theme customization
- [ ] Future: Collaborative editing
- [ ] Future: Template library

---

**Built with AI-powered education tools** 🤖

Generated with [Claude Code](https://claude.com/claude-code)
