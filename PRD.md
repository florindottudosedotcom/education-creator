# Product Requirements Document: Emotions for Engineers

## 1. Project Overview

### 1.1 Platform Description
**Emotions for Engineers** is a comprehensive Universal Course Platform that combines AI-powered content creation with automated publishing capabilities. The platform serves dual purposes:

1. **AI Creator Hub**: Modern browser-based tools for generating courses and presentations using various AI providers
2. **MkDocs Publishing Platform**: Automatically builds and deploys multi-language course websites from Markdown content

### 1.2 Core Value Proposition
- **End-to-End Workflow**: Complete lifecycle management from AI-generated content creation to published course websites
- **Multi-Provider AI Integration**: Support for cloud, browser-based, and local AI models
- **Professional Output**: Production-ready courses with multi-language support and modern web presentation
- **Zero-Config Publishing**: Automated deployment to GitHub Pages with professional theming

### 1.3 Target Users
- **Educators and Trainers**: Creating structured learning content
- **Content Creators**: Generating educational materials and presentations
- **Organizations**: Developing training programs and documentation
- **Technical Writers**: Creating comprehensive guides and tutorials

---

## 2. Implementation Strategy

### 2.1 Phased Development Approach

This PRD is organized into **5 sequential implementation phases**. Each phase:
- **Builds incrementally** on previous phases
- **Is fully functional** before moving to the next phase
- **Can be committed and deployed** independently
- **Includes verification checkpoints** for quality assurance

### 2.2 Phase Overview

| Phase | Focus | Deliverable | Commit Point |
|-------|-------|-------------|--------------|
| **Phase 1** | Core Infrastructure | HTML skeleton, CSS architecture, icon system | Functional static pages |
| **Phase 2** | Single Provider Implementation | OpenRouter course creator (complete workflow) | End-to-end course generation |
| **Phase 3** | Multi-Provider Support | WebLLM, Ollama, Puter integration | All providers functional |
| **Phase 4** | Advanced Features | Multi-language, slides creator, visual editing | Feature-complete platform |
| **Phase 5** | Polish & Deployment | Testing, optimization, CI/CD automation | Production-ready system |

---

## 3. Phase 1: Core Infrastructure

### 3.1 Objectives
Establish the foundation for the entire platform with:
- HTML page structure and navigation
- CSS architecture following CLAUDE.md guidelines
- Lucide icon system integration
- Responsive design framework
- Basic routing and navigation

### 3.2 Deliverables

#### 3.2.1 Directory Structure
```
creator/
├── index.html                 # Main entry point
├── course.html                # Course creator launcher
├── slides.html                # Slides creator launcher
├── assets/
│   ├── css/
│   │   ├── core/
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   └── typography.css
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── forms.css
│   │   │   ├── cards.css
│   │   │   └── tabs.css
│   │   ├── layouts/
│   │   │   ├── grid.css
│   │   │   └── containers.css
│   │   └── themes/
│   │       └── minimal-theme.css
│   └── js/
│       ├── lucide/
│       │   └── lucide.min.js
│       └── core/
│           ├── router.js
│           └── icons.js
```

#### 3.2.2 Main Entry Point (`creator/index.html`)

**Purpose**: Central launcher for all creation tools

**UI Structure**:
```html
<header>
  <h1>
    <i data-lucide="settings"></i>
    AI Creator Hub
  </h1>
  <p>Create courses and presentations using AI. Choose what you want to create:</p>
</header>

<main class="creator-cards">
  <!-- Course Creator Card -->
  <div class="creator-card">
    <i data-lucide="book-open" class="card-icon"></i>
    <h2>Course Creator</h2>
    <p>Generate complete multi-chapter courses</p>
    <a href="course.html" class="btn-primary">
      Get Started <i data-lucide="arrow-right"></i>
    </a>
  </div>

  <!-- Slides Creator Card -->
  <div class="creator-card">
    <i data-lucide="presentation" class="card-icon"></i>
    <h2>Slides Creator</h2>
    <p>Create beautiful AI-powered presentations</p>
    <a href="slides.html" class="btn-primary">
      Get Started <i data-lucide="arrow-right"></i>
    </a>
  </div>
</main>

<section class="provider-preview">
  <h2>AI Providers Available</h2>
  <div class="provider-cards">
    <!-- OpenRouter Preview -->
    <div class="provider-card">
      <i data-lucide="globe"></i>
      <h3>OpenRouter</h3>
      <p>Professional cloud AI with 200+ models (GPT-4o, Claude, Gemini). Transparent pricing and usage analytics.</p>
    </div>

    <!-- WebLLM Preview -->
    <div class="provider-card">
      <i data-lucide="cpu"></i>
      <h3>WebLLM</h3>
      <p>Run AI models directly in your browser. 100% private, no server required, completely free.</p>
    </div>

    <!-- Ollama Preview -->
    <div class="provider-card">
      <i data-lucide="server"></i>
      <h3>Ollama</h3>
      <p>Connect to your local Ollama server. Complete privacy and control, unlimited usage.</p>
    </div>

    <!-- Puter Preview -->
    <div class="provider-card">
      <i data-lucide="cloud"></i>
      <h3>Puter</h3>
      <p>Free access to multiple AI providers. No API key required, perfect for getting started.</p>
    </div>
  </div>
</section>
```

#### 3.2.3 CSS Architecture

**File: `creator/assets/css/core/variables.css`**
```css
:root {
  /* Spacing system (8px grid) */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* Typography scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Color palette - Light theme */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-secondary: #64748B;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Surface colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --border-primary: #E2E8F0;
  --border-secondary: #CBD5E1;

  /* Elevation (shadows) */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0F172A;
    --bg-secondary: #1E293B;
    --bg-tertiary: #334155;
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --text-tertiary: #94A3B8;
    --border-primary: #334155;
    --border-secondary: #475569;
  }
}
```

**File: `creator/assets/css/components/buttons.css`**
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-danger {
  background-color: var(--color-error);
  color: white;
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
}

.btn-icon-only {
  padding: var(--spacing-3);
  aspect-ratio: 1;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### 3.2.4 Lucide Icons Integration

**File: `creator/assets/js/core/icons.js`**
```javascript
/**
 * Icon System Manager
 * Handles Lucide icon initialization and dynamic updates
 */

class IconManager {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize all Lucide icons on the page
   */
  init() {
    if (typeof lucide === 'undefined') {
      console.error('Lucide library not loaded');
      return;
    }

    lucide.createIcons();
    this.initialized = true;
  }

  /**
   * Refresh icons after DOM changes
   * @param {HTMLElement} container - Optional container to refresh
   */
  refresh(container = document.body) {
    if (typeof lucide === 'undefined') return;

    lucide.createIcons({
      attrs: {
        'stroke-width': 2,
        width: 20,
        height: 20
      },
      nameAttr: 'data-lucide'
    });
  }

  /**
   * Create a new icon element
   * @param {string} iconName - Lucide icon name
   * @returns {HTMLElement} Icon element
   */
  createIcon(iconName) {
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', iconName);
    return icon;
  }
}

// Export singleton instance
export const iconManager = new IconManager();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => iconManager.init());
} else {
  iconManager.init();
}
```

### 3.3 Icon Reference Guide

All UI elements must use Lucide icons with semantic names:

| Use Case | Icon Name | HTML Example |
|----------|-----------|--------------|
| Course creation | `book-open` | `<i data-lucide="book-open"></i>` |
| Slides/Presentations | `presentation` | `<i data-lucide="presentation"></i>` |
| Settings/Configuration | `settings` | `<i data-lucide="settings"></i>` |
| Cloud/API services | `globe` | `<i data-lucide="globe"></i>` |
| Browser/Local AI | `cpu` | `<i data-lucide="cpu"></i>` |
| Local server | `server` | `<i data-lucide="server"></i>` |
| Cloud storage | `cloud` | `<i data-lucide="cloud"></i>` |
| Generate/Action | `zap` | `<i data-lucide="zap"></i>` |
| Refresh/Loading | `refresh-cw` | `<i data-lucide="refresh-cw"></i>` |
| Enhance/AI features | `sparkles` | `<i data-lucide="sparkles"></i>` |
| Outline content | `clipboard-list` | `<i data-lucide="clipboard-list"></i>` |
| Brief content | `file-text` | `<i data-lucide="file-text"></i>` |
| Standard content | `book` | `<i data-lucide="book"></i>` |
| Detailed content | `book-open` | `<i data-lucide="book-open"></i>` |
| Comprehensive | `library` | `<i data-lucide="library"></i>` |
| Featured/Primary | `star` | `<i data-lucide="star"></i>` |
| Confirm | `check` | `<i data-lucide="check"></i>` |
| Cancel | `x` | `<i data-lucide="x"></i>` |
| Reset/Clear | `rotate-ccw` | `<i data-lucide="rotate-ccw"></i>` |
| Create/Generate files | `file-plus` | `<i data-lucide="file-plus"></i>` |
| Download | `download` | `<i data-lucide="download"></i>` |
| Upload | `upload` | `<i data-lucide="upload"></i>` |
| Edit | `edit` | `<i data-lucide="edit"></i>` |
| Delete | `trash-2` | `<i data-lucide="trash-2"></i>` |
| Search | `search` | `<i data-lucide="search"></i>` |
| Filter | `filter` | `<i data-lucide="filter"></i>` |
| Navigation forward | `arrow-right` | `<i data-lucide="arrow-right"></i>` |
| Navigation back | `arrow-left` | `<i data-lucide="arrow-left"></i>` |
| Help | `help-circle` | `<i data-lucide="help-circle"></i>` |
| Info | `info` | `<i data-lucide="info"></i>` |
| Warning | `alert-triangle` | `<i data-lucide="alert-triangle"></i>` |
| Error | `alert-circle` | `<i data-lucide="alert-circle"></i>` |

### 3.4 Responsive Design Requirements

**Breakpoints**:
```css
/* Mobile first approach */
:root {
  --breakpoint-sm: 640px;   /* Small devices */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
}
```

**Touch Targets**: Minimum 44px for all interactive elements

**Grid System**: CSS Grid with flexible columns
```css
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
}
```

### 3.5 Phase 1 Verification Checklist

- [ ] All HTML pages load without errors
- [ ] Lucide icons render correctly on all pages
- [ ] CSS variables are properly defined and applied
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] Dark mode switches automatically based on system preference
- [ ] Navigation between pages works correctly
- [ ] All buttons and cards have proper hover states
- [ ] Touch targets meet 44px minimum requirement
- [ ] No console errors in browser developer tools
- [ ] Pages pass HTML validation

### 3.6 Phase 1 Commit Point

**Commit Message**:
```
Phase 1: Implement core infrastructure and UI foundation

- Add HTML page structure (index, course, slides)
- Implement CSS architecture with variables, components, layouts
- Integrate Lucide icon system with IconManager
- Add responsive design with mobile-first approach
- Implement dark mode support via CSS variables
- Create reusable button and card components
```

---

## 4. Phase 2: Single Provider Implementation (OpenRouter)

### 4.1 Objectives
Build a **complete, end-to-end course creation workflow** using OpenRouter as the reference implementation. This phase establishes:
- AI provider connection and authentication
- Course generation UI and logic
- Content editing with rich text editor
- File generation and download functionality
- State management for form data

### 4.2 Prerequisites
- Phase 1 must be completed and committed
- OpenRouter API key available for testing
- ToastUI Editor library integrated

### 4.3 Deliverables

#### 4.3.1 Provider-Specific Pages

**File: `creator/openrouter.html`**

Complete course creator interface with:

1. **Authentication Section**
   - API key input (password type)
   - Model selection dropdown
   - Connect/Disconnect buttons
   - Connection status indicator

2. **Course Generation Section**
   - Master prompt textarea
   - Prompt enhancement button (`sparkles` icon)
   - Course depth selector (5 levels)
   - Chapter count selector (1-10)
   - "Generate Entire Course" button (`zap` icon)
   - Generation progress indicator

3. **Course Details Form**
   - Course name input (auto-filled by AI)
   - Course description textarea (auto-filled by AI)
   - Manual editing capability

4. **Chapter Management**
   - Dynamic chapter tabs
   - ToastUI Editor integration for each chapter
   - Tab navigation with keyboard support
   - Chapter content editing

5. **Language Selection**
   - Multi-select language checkboxes
   - 11 supported languages (English featured by default)
   - Language codes: en, de, fr, hi, it, ja, pt, ro, ru, es, zh

6. **File Generation & Download**
   - "Generate Course Files" button (`file-plus` icon)
   - ZIP file creation with MkDocs structure
   - Download button (`download` icon)
   - Generation status display

7. **Modal Dialogs**
   - Overwrite confirmation modal
   - Error display modal
   - Success notification modal

#### 4.3.2 JavaScript Modules

**File: `creator/assets/js/providers/openrouter.js`**
```javascript
/**
 * OpenRouter Provider Implementation
 * Handles API communication and content generation
 */

export class OpenRouterProvider {
  constructor() {
    this.apiKey = null;
    this.baseURL = 'https://openrouter.ai/api/v1';
    this.selectedModel = 'openai/gpt-4o';
    this.connected = false;
  }

  /**
   * Authenticate with OpenRouter API
   * @param {string} apiKey - OpenRouter API key
   * @returns {Promise<boolean>} Connection success
   */
  async connect(apiKey) {
    this.apiKey = apiKey;

    try {
      const response = await fetch(`${this.baseURL}/auth/key`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Emotions for Engineers Course Creator'
        }
      });

      if (response.ok) {
        this.connected = true;
        this.saveCredentials();
        return true;
      }

      throw new Error('Invalid API key');
    } catch (error) {
      console.error('Connection error:', error);
      this.connected = false;
      return false;
    }
  }

  /**
   * Generate course content using AI
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generated course data
   */
  async generateCourse(options) {
    if (!this.connected) {
      throw new Error('Not connected to OpenRouter');
    }

    const { prompt, depth, chapters } = options;

    const systemPrompt = this.buildSystemPrompt(depth, chapters);

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Emotions for Engineers Course Creator'
        },
        body: JSON.stringify({
          model: this.selectedModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseCourseResponse(data);

    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }

  /**
   * Build system prompt based on course parameters
   * @private
   */
  buildSystemPrompt(depth, chapters) {
    const depthGuide = {
      outline: '50-100 words per chapter',
      brief: '200-400 words per chapter',
      standard: '500-800 words per chapter',
      detailed: '1000-1500 words per chapter',
      comprehensive: '2000+ words per chapter'
    };

    return `You are an expert educational content creator. Generate a structured course with ${chapters} chapters.

Content depth: ${depthGuide[depth]}

Output format (JSON):
{
  "courseName": "Course Title",
  "courseDescription": "Brief overview",
  "chapters": [
    {
      "title": "Chapter Title",
      "content": "Markdown formatted content"
    }
  ]
}

Guidelines:
- Use clear, engaging language
- Include practical examples
- Structure content with headings (##, ###)
- Use markdown formatting
- Ensure logical progression between chapters`;
  }

  /**
   * Parse AI response into course structure
   * @private
   */
  parseCourseResponse(response) {
    const content = response.choices[0].message.content;

    try {
      // Try parsing as JSON first
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback: parse markdown structure
      return this.parseMarkdownCourse(content);

    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse course content');
    }
  }

  /**
   * Save credentials to localStorage
   * @private
   */
  saveCredentials() {
    localStorage.setItem('openrouter_api_key', this.apiKey);
    localStorage.setItem('openrouter_model', this.selectedModel);
  }

  /**
   * Load credentials from localStorage
   */
  loadCredentials() {
    this.apiKey = localStorage.getItem('openrouter_api_key');
    this.selectedModel = localStorage.getItem('openrouter_model') || 'openai/gpt-4o';
    this.connected = !!this.apiKey;
  }

  /**
   * Disconnect and clear credentials
   */
  disconnect() {
    this.apiKey = null;
    this.connected = false;
    localStorage.removeItem('openrouter_api_key');
  }
}
```

**File: `creator/assets/js/core/course-manager.js`**
```javascript
/**
 * Course Manager
 * Handles course data, chapters, and state management
 */

export class CourseManager {
  constructor() {
    this.courseName = '';
    this.courseDescription = '';
    this.chapters = [];
    this.selectedLanguages = ['en'];
    this.currentChapter = 0;
  }

  /**
   * Initialize course with generated data
   * @param {Object} courseData - AI-generated course data
   */
  loadCourse(courseData) {
    this.courseName = courseData.courseName;
    this.courseDescription = courseData.courseDescription;
    this.chapters = courseData.chapters.map((ch, index) => ({
      id: index,
      title: ch.title,
      content: ch.content,
      edited: false
    }));
  }

  /**
   * Update chapter content
   * @param {number} chapterIndex - Chapter index
   * @param {string} content - New content
   */
  updateChapter(chapterIndex, content) {
    if (this.chapters[chapterIndex]) {
      this.chapters[chapterIndex].content = content;
      this.chapters[chapterIndex].edited = true;
      this.saveState();
    }
  }

  /**
   * Add language for translation
   * @param {string} langCode - Language code (e.g., 'de', 'fr')
   */
  addLanguage(langCode) {
    if (!this.selectedLanguages.includes(langCode)) {
      this.selectedLanguages.push(langCode);
      this.saveState();
    }
  }

  /**
   * Remove language from translation list
   * @param {string} langCode - Language code
   */
  removeLanguage(langCode) {
    this.selectedLanguages = this.selectedLanguages.filter(l => l !== langCode);
    this.saveState();
  }

  /**
   * Save state to sessionStorage
   */
  saveState() {
    const state = {
      courseName: this.courseName,
      courseDescription: this.courseDescription,
      chapters: this.chapters,
      selectedLanguages: this.selectedLanguages,
      currentChapter: this.currentChapter,
      timestamp: Date.now()
    };

    sessionStorage.setItem('course_state', JSON.stringify(state));
  }

  /**
   * Load state from sessionStorage
   */
  loadState() {
    const saved = sessionStorage.getItem('course_state');
    if (saved) {
      const state = JSON.parse(saved);
      Object.assign(this, state);
      return true;
    }
    return false;
  }

  /**
   * Clear all course data
   */
  clear() {
    this.courseName = '';
    this.courseDescription = '';
    this.chapters = [];
    this.selectedLanguages = ['en'];
    this.currentChapter = 0;
    sessionStorage.removeItem('course_state');
  }

  /**
   * Export course as MkDocs-compatible structure
   * @returns {Object} File structure for ZIP generation
   */
  exportForMkDocs() {
    const files = {};

    // Generate index files for each language
    this.selectedLanguages.forEach(lang => {
      files[`docs/index.${lang}.md`] = this.generateIndexPage(lang);

      // Generate chapter files
      this.chapters.forEach((chapter, index) => {
        const filename = `docs/chapter-${index + 1}.${lang}.md`;
        files[filename] = chapter.content;
      });
    });

    // Add mkdocs.yml configuration
    files['mkdocs.yml'] = this.generateMkDocsConfig();

    return files;
  }

  /**
   * Generate index page content
   * @private
   */
  generateIndexPage(lang) {
    return `# ${this.courseName}

${this.courseDescription}

## Course Structure

${this.chapters.map((ch, i) => `${i + 1}. [${ch.title}](chapter-${i + 1}.${lang}.md)`).join('\n')}
`;
  }

  /**
   * Generate MkDocs configuration
   * @private
   */
  generateMkDocsConfig() {
    return `site_name: ${this.courseName}
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - toc.integrate
    - search.suggest

plugins:
  - search
  - i18n:
      default_language: en
      languages:
${this.selectedLanguages.map(lang => `        ${lang}: ${this.getLanguageName(lang)}`).join('\n')}

nav:
  - Home: index.md
${this.chapters.map((ch, i) => `  - ${ch.title}: chapter-${i + 1}.md`).join('\n')}
`;
  }

  /**
   * Get full language name from code
   * @private
   */
  getLanguageName(code) {
    const names = {
      en: 'English', de: 'Deutsch', fr: 'Français',
      hi: 'हिन्दी', it: 'Italiano', ja: '日本語',
      pt: 'Português', ro: 'Română', ru: 'Русский',
      es: 'Español', zh: '中文'
    };
    return names[code] || code;
  }
}
```

**File: `creator/assets/js/core/file-generator.js`**
```javascript
/**
 * File Generator
 * Creates ZIP archives with course content
 */

import JSZip from 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm';

export class FileGenerator {
  constructor() {
    this.zip = null;
  }

  /**
   * Generate ZIP file from course data
   * @param {Object} fileStructure - File paths and contents
   * @param {string} courseName - Course name for filename
   * @returns {Promise<Blob>} ZIP file blob
   */
  async generateZip(fileStructure, courseName) {
    this.zip = new JSZip();

    // Add all files to ZIP
    for (const [path, content] of Object.entries(fileStructure)) {
      this.zip.file(path, content);
    }

    // Generate ZIP blob
    const blob = await this.zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    return blob;
  }

  /**
   * Trigger download of ZIP file
   * @param {Blob} blob - ZIP file blob
   * @param {string} filename - Download filename
   */
  downloadZip(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.zip`;
    link.click();

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}
```

#### 4.3.3 UI Integration Script

**File: `creator/assets/js/pages/openrouter-page.js`**
```javascript
/**
 * OpenRouter Page Controller
 * Coordinates UI and business logic
 */

import { OpenRouterProvider } from '../providers/openrouter.js';
import { CourseManager } from '../core/course-manager.js';
import { FileGenerator } from '../core/file-generator.js';
import { iconManager } from '../core/icons.js';

class OpenRouterPage {
  constructor() {
    this.provider = new OpenRouterProvider();
    this.courseManager = new CourseManager();
    this.fileGenerator = new FileGenerator();
    this.editors = [];

    this.init();
  }

  init() {
    // Load saved credentials
    this.provider.loadCredentials();
    this.courseManager.loadState();

    // Bind UI events
    this.bindAuthEvents();
    this.bindGenerationEvents();
    this.bindLanguageEvents();
    this.bindExportEvents();

    // Restore UI state
    this.restoreUIState();
  }

  bindAuthEvents() {
    const connectBtn = document.getElementById('connect-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');
    const apiKeyInput = document.getElementById('api-key');
    const modelSelect = document.getElementById('model-select');

    connectBtn?.addEventListener('click', async () => {
      const apiKey = apiKeyInput.value.trim();
      if (!apiKey) {
        this.showError('Please enter an API key');
        return;
      }

      this.setLoading(connectBtn, true);
      const success = await this.provider.connect(apiKey);
      this.setLoading(connectBtn, false);

      if (success) {
        this.showSuccess('Connected to OpenRouter');
        this.updateConnectionUI(true);
      } else {
        this.showError('Failed to connect. Check your API key.');
      }
    });

    disconnectBtn?.addEventListener('click', () => {
      this.provider.disconnect();
      this.updateConnectionUI(false);
      this.showSuccess('Disconnected from OpenRouter');
    });

    modelSelect?.addEventListener('change', (e) => {
      this.provider.selectedModel = e.target.value;
    });
  }

  bindGenerationEvents() {
    const generateBtn = document.getElementById('generate-course-btn');
    const enhanceBtn = document.getElementById('enhance-prompt-btn');

    generateBtn?.addEventListener('click', () => this.generateCourse());
    enhanceBtn?.addEventListener('click', () => this.enhancePrompt());
  }

  async generateCourse() {
    if (!this.provider.connected) {
      this.showError('Please connect to OpenRouter first');
      return;
    }

    const prompt = document.getElementById('master-prompt').value.trim();
    if (!prompt) {
      this.showError('Please enter a course description');
      return;
    }

    const depth = document.getElementById('course-depth').value;
    const chapters = parseInt(document.getElementById('chapter-count').value);

    // Check for existing content
    if (this.courseManager.chapters.length > 0) {
      const overwrite = await this.confirmOverwrite();
      if (!overwrite) return;
      this.courseManager.clear();
    }

    // Show progress
    this.showGenerationProgress();

    try {
      const courseData = await this.provider.generateCourse({
        prompt,
        depth,
        chapters
      });

      this.courseManager.loadCourse(courseData);
      this.renderCourse();
      this.showSuccess('Course generated successfully!');

    } catch (error) {
      this.showError(`Generation failed: ${error.message}`);
    } finally {
      this.hideGenerationProgress();
    }
  }

  renderCourse() {
    // Update course details form
    document.getElementById('course-name').value = this.courseManager.courseName;
    document.getElementById('course-description').value = this.courseManager.courseDescription;

    // Render chapter tabs
    this.renderChapterTabs();

    // Initialize editors
    this.initializeEditors();

    // Refresh icons
    iconManager.refresh();
  }

  renderChapterTabs() {
    const container = document.getElementById('chapter-tabs-container');
    container.innerHTML = '';

    this.courseManager.chapters.forEach((chapter, index) => {
      const tab = document.createElement('button');
      tab.className = 'chapter-tab';
      tab.dataset.chapter = index;
      tab.textContent = chapter.title;

      if (index === this.courseManager.currentChapter) {
        tab.classList.add('active');
      }

      tab.addEventListener('click', () => {
        this.switchChapter(index);
      });

      container.appendChild(tab);
    });
  }

  initializeEditors() {
    const editorContainer = document.getElementById('chapter-editors-container');
    editorContainer.innerHTML = '';

    this.editors = [];

    this.courseManager.chapters.forEach((chapter, index) => {
      const editorDiv = document.createElement('div');
      editorDiv.id = `editor-${index}`;
      editorDiv.className = 'editor-instance';
      editorDiv.style.display = index === 0 ? 'block' : 'none';
      editorContainer.appendChild(editorDiv);

      const editor = new toastui.Editor({
        el: editorDiv,
        height: '500px',
        initialEditType: 'wysiwyg',
        initialValue: chapter.content,
        previewStyle: 'vertical'
      });

      editor.on('change', () => {
        const content = editor.getMarkdown();
        this.courseManager.updateChapter(index, content);
      });

      this.editors.push(editor);
    });
  }

  switchChapter(index) {
    this.courseManager.currentChapter = index;

    // Update tabs
    document.querySelectorAll('.chapter-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    // Update editors
    document.querySelectorAll('.editor-instance').forEach((editor, i) => {
      editor.style.display = i === index ? 'block' : 'none';
    });
  }

  bindLanguageEvents() {
    const checkboxes = document.querySelectorAll('.language-checkbox');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const langCode = e.target.value;

        if (e.target.checked) {
          this.courseManager.addLanguage(langCode);
        } else {
          this.courseManager.removeLanguage(langCode);
        }
      });
    });
  }

  bindExportEvents() {
    const generateFilesBtn = document.getElementById('generate-files-btn');
    const downloadBtn = document.getElementById('download-btn');

    generateFilesBtn?.addEventListener('click', () => this.generateFiles());
    downloadBtn?.addEventListener('click', () => this.downloadFiles());
  }

  async generateFiles() {
    if (this.courseManager.chapters.length === 0) {
      this.showError('No course content to export');
      return;
    }

    this.showFileGenerationProgress();

    try {
      const fileStructure = this.courseManager.exportForMkDocs();

      const zipBlob = await this.fileGenerator.generateZip(
        fileStructure,
        this.courseManager.courseName
      );

      this.generatedZip = zipBlob;
      this.showDownloadSection();
      this.showSuccess('Files generated successfully!');

    } catch (error) {
      this.showError(`File generation failed: ${error.message}`);
    } finally {
      this.hideFileGenerationProgress();
    }
  }

  downloadFiles() {
    if (!this.generatedZip) {
      this.showError('No files to download. Generate files first.');
      return;
    }

    this.fileGenerator.downloadZip(
      this.generatedZip,
      this.courseManager.courseName
    );

    this.showSuccess('Download started!');
  }

  // UI Helper Methods
  updateConnectionUI(connected) {
    document.getElementById('connect-section')?.classList.toggle('hidden', connected);
    document.getElementById('connected-section')?.classList.toggle('hidden', !connected);
    document.getElementById('generation-section')?.classList.toggle('disabled', !connected);
  }

  showError(message) {
    // Implement error notification
    alert(message); // Temporary
  }

  showSuccess(message) {
    // Implement success notification
    console.log(message);
  }

  setLoading(button, loading) {
    button.disabled = loading;
    button.classList.toggle('loading', loading);
  }

  async confirmOverwrite() {
    return confirm('There are chapters with content present. Do you want to remove them before generating new content?');
  }

  showGenerationProgress() {
    document.getElementById('generation-status')?.classList.remove('hidden');
  }

  hideGenerationProgress() {
    document.getElementById('generation-status')?.classList.add('hidden');
  }

  showFileGenerationProgress() {
    document.getElementById('file-generation-status')?.classList.remove('hidden');
  }

  hideFileGenerationProgress() {
    document.getElementById('file-generation-status')?.classList.add('hidden');
  }

  showDownloadSection() {
    document.getElementById('download-section')?.classList.remove('hidden');
  }

  restoreUIState() {
    if (this.provider.connected) {
      this.updateConnectionUI(true);
    }

    if (this.courseManager.chapters.length > 0) {
      this.renderCourse();
    }
  }
}

// Initialize page
new OpenRouterPage();
```

### 4.4 Phase 2 Verification Checklist

- [ ] OpenRouter API connection works with valid API key
- [ ] Course generation produces valid JSON/Markdown output
- [ ] All course depth levels generate appropriate content
- [ ] Chapter tabs render correctly
- [ ] ToastUI Editor loads and edits content
- [ ] Chapter switching preserves edited content
- [ ] Language selection checkboxes work
- [ ] File generation creates valid MkDocs structure
- [ ] ZIP download triggers successfully
- [ ] Generated ZIP contains all expected files
- [ ] State persists across page reloads
- [ ] Error handling displays appropriate messages
- [ ] Loading states show during async operations
- [ ] Disconnect clears saved credentials

### 4.5 Phase 2 Commit Point

**Commit Message**:
```
Phase 2: Implement OpenRouter course creator (complete workflow)

- Add OpenRouter provider with API authentication
- Implement AI-powered course generation
- Add ToastUI Editor integration for chapter editing
- Implement chapter tab navigation and management
- Add multi-language selection UI
- Implement MkDocs file structure generation
- Add ZIP creation and download functionality
- Implement state management with sessionStorage
- Add error handling and loading states
```

---

## 5. Phase 3: Multi-Provider Support

### 5.1 Objectives
Extend the platform to support **all AI providers** with consistent UX:
- WebLLM (browser-based AI)
- Ollama (local server)
- Puter (free cloud access)

Each provider follows the same UI pattern established in Phase 2.

### 5.2 Prerequisites
- Phase 2 must be completed and committed
- Provider-specific libraries tested (WebLLM SDK, Ollama API)

### 5.3 Deliverables

#### 5.3.1 Provider Abstraction Layer

**File: `creator/assets/js/core/provider-interface.js`**
```javascript
/**
 * Abstract AI Provider Interface
 * All providers must implement this interface
 */

export class AIProviderInterface {
  constructor() {
    if (new.target === AIProviderInterface) {
      throw new TypeError('Cannot instantiate abstract class');
    }
  }

  /**
   * Connect to the AI provider
   * @param {Object} config - Provider-specific configuration
   * @returns {Promise<boolean>} Connection success
   */
  async connect(config) {
    throw new Error('Method not implemented');
  }

  /**
   * Disconnect from the provider
   */
  disconnect() {
    throw new Error('Method not implemented');
  }

  /**
   * Check if provider is connected
   * @returns {boolean} Connection status
   */
  isConnected() {
    throw new Error('Method not implemented');
  }

  /**
   * Generate course content
   * @param {Object} options - Generation parameters
   * @returns {Promise<Object>} Course data
   */
  async generateCourse(options) {
    throw new Error('Method not implemented');
  }

  /**
   * Enhance user prompt with AI
   * @param {string} prompt - Original prompt
   * @returns {Promise<string>} Enhanced prompt
   */
  async enhancePrompt(prompt) {
    throw new Error('Method not implemented');
  }

  /**
   * Get provider display name
   * @returns {string} Provider name
   */
  getName() {
    throw new Error('Method not implemented');
  }

  /**
   * Get provider icon (Lucide icon name)
   * @returns {string} Icon name
   */
  getIcon() {
    throw new Error('Method not implemented');
  }
}
```

#### 5.3.2 WebLLM Provider

**File: `creator/assets/js/providers/webllm.js`**
```javascript
/**
 * WebLLM Provider Implementation
 * Browser-based AI inference
 */

import { AIProviderInterface } from '../core/provider-interface.js';

export class WebLLMProvider extends AIProviderInterface {
  constructor() {
    super();
    this.engine = null;
    this.selectedModel = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';
    this.modelLoaded = false;
  }

  getName() {
    return 'WebLLM';
  }

  getIcon() {
    return 'cpu';
  }

  async connect(config = {}) {
    try {
      // Import WebLLM dynamically
      const { CreateMLCEngine } = await import('https://esm.run/@mlc-ai/web-llm');

      // Create engine with progress callback
      this.engine = await CreateMLCEngine(
        this.selectedModel,
        {
          initProgressCallback: (progress) => {
            this.onModelLoadProgress(progress);
          }
        }
      );

      this.modelLoaded = true;
      return true;

    } catch (error) {
      console.error('WebLLM connection error:', error);
      return false;
    }
  }

  disconnect() {
    this.engine = null;
    this.modelLoaded = false;
  }

  isConnected() {
    return this.modelLoaded && this.engine !== null;
  }

  async generateCourse(options) {
    if (!this.isConnected()) {
      throw new Error('WebLLM not initialized');
    }

    const { prompt, depth, chapters } = options;
    const systemPrompt = this.buildSystemPrompt(depth, chapters);

    try {
      const response = await this.engine.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      const content = response.choices[0].message.content;
      return this.parseCourseResponse(content);

    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }

  buildSystemPrompt(depth, chapters) {
    const depthGuide = {
      outline: '50-100 words per chapter',
      brief: '200-400 words per chapter',
      standard: '500-800 words per chapter',
      detailed: '1000-1500 words per chapter',
      comprehensive: '2000+ words per chapter'
    };

    return `You are an expert educational content creator. Generate a structured course with ${chapters} chapters.

Content depth: ${depthGuide[depth]}

Output format (JSON):
{
  "courseName": "Course Title",
  "courseDescription": "Brief overview",
  "chapters": [
    {
      "title": "Chapter Title",
      "content": "Markdown formatted content"
    }
  ]
}

Guidelines:
- Use clear, engaging language
- Include practical examples
- Structure content with headings (##, ###)
- Use markdown formatting
- Ensure logical progression between chapters`;
  }

  parseCourseResponse(content) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse course content');
    }
  }

  onModelLoadProgress(progress) {
    // Emit custom event for UI updates
    window.dispatchEvent(new CustomEvent('webllm-progress', {
      detail: progress
    }));
  }
}
```

#### 5.3.3 Ollama Provider

**File: `creator/assets/js/providers/ollama.js`**
```javascript
/**
 * Ollama Provider Implementation
 * Local server integration
 */

import { AIProviderInterface } from '../core/provider-interface.js';

export class OllamaProvider extends AIProviderInterface {
  constructor() {
    super();
    this.baseURL = 'http://localhost:11434';
    this.selectedModel = 'llama3.1';
    this.connected = false;
  }

  getName() {
    return 'Ollama';
  }

  getIcon() {
    return 'server';
  }

  async connect(config = {}) {
    if (config.url) {
      this.baseURL = config.url;
    }

    try {
      // Check if Ollama server is running
      const response = await fetch(`${this.baseURL}/api/tags`);

      if (response.ok) {
        const data = await response.json();
        this.availableModels = data.models || [];
        this.connected = true;
        return true;
      }

      return false;

    } catch (error) {
      console.error('Ollama connection error:', error);
      return false;
    }
  }

  disconnect() {
    this.connected = false;
  }

  isConnected() {
    return this.connected;
  }

  async generateCourse(options) {
    if (!this.isConnected()) {
      throw new Error('Not connected to Ollama');
    }

    const { prompt, depth, chapters } = options;
    const systemPrompt = this.buildSystemPrompt(depth, chapters);

    try {
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.selectedModel,
          prompt: `${systemPrompt}\n\n${prompt}`,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 4000
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseCourseResponse(data.response);

    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }

  buildSystemPrompt(depth, chapters) {
    const depthGuide = {
      outline: '50-100 words per chapter',
      brief: '200-400 words per chapter',
      standard: '500-800 words per chapter',
      detailed: '1000-1500 words per chapter',
      comprehensive: '2000+ words per chapter'
    };

    return `You are an expert educational content creator. Generate a structured course with ${chapters} chapters.

Content depth: ${depthGuide[depth]}

Output format (JSON):
{
  "courseName": "Course Title",
  "courseDescription": "Brief overview",
  "chapters": [
    {
      "title": "Chapter Title",
      "content": "Markdown formatted content"
    }
  ]
}

Guidelines:
- Use clear, engaging language
- Include practical examples
- Structure content with headings (##, ###)
- Use markdown formatting
- Ensure logical progression between chapters`;
  }

  parseCourseResponse(content) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse course content');
    }
  }
}
```

#### 5.3.4 Puter Provider

**File: `creator/assets/js/providers/puter.js`**
```javascript
/**
 * Puter Provider Implementation
 * Free cloud AI access
 */

import { AIProviderInterface } from '../core/provider-interface.js';

export class PuterProvider extends AIProviderInterface {
  constructor() {
    super();
    this.puter = null;
    this.selectedModel = 'claude-3-5-sonnet';
    this.connected = false;
  }

  getName() {
    return 'Puter';
  }

  getIcon() {
    return 'cloud';
  }

  async connect(config = {}) {
    try {
      // Import Puter SDK
      if (typeof puter === 'undefined') {
        await this.loadPuterSDK();
      }

      this.puter = window.puter;
      this.connected = true;
      return true;

    } catch (error) {
      console.error('Puter connection error:', error);
      return false;
    }
  }

  async loadPuterSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  disconnect() {
    this.connected = false;
  }

  isConnected() {
    return this.connected && this.puter !== null;
  }

  async generateCourse(options) {
    if (!this.isConnected()) {
      throw new Error('Not connected to Puter');
    }

    const { prompt, depth, chapters } = options;
    const systemPrompt = this.buildSystemPrompt(depth, chapters);

    try {
      const response = await this.puter.ai.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ], {
        model: this.selectedModel,
        temperature: 0.7,
        max_tokens: 4000
      });

      return this.parseCourseResponse(response);

    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }

  buildSystemPrompt(depth, chapters) {
    const depthGuide = {
      outline: '50-100 words per chapter',
      brief: '200-400 words per chapter',
      standard: '500-800 words per chapter',
      detailed: '1000-1500 words per chapter',
      comprehensive: '2000+ words per chapter'
    };

    return `You are an expert educational content creator. Generate a structured course with ${chapters} chapters.

Content depth: ${depthGuide[depth]}

Output format (JSON):
{
  "courseName": "Course Title",
  "courseDescription": "Brief overview",
  "chapters": [
    {
      "title": "Chapter Title",
      "content": "Markdown formatted content"
    }
  ]
}

Guidelines:
- Use clear, engaging language
- Include practical examples
- Structure content with headings (##, ###)
- Use markdown formatting
- Ensure logical progression between chapters`;
  }

  parseCourseResponse(content) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse course content');
    }
  }
}
```

#### 5.3.5 Provider Tab System

**File: `creator/course.html`** (Updated)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Creator - Emotions for Engineers</title>
  <link rel="stylesheet" href="assets/css/core/variables.css">
  <link rel="stylesheet" href="assets/css/components/tabs.css">
  <script src="assets/js/lucide/lucide.min.js"></script>
</head>
<body>
  <header>
    <a href="index.html" class="back-btn">
      <i data-lucide="arrow-left"></i>
      Back to Creator Hub
    </a>
    <h1>
      <i data-lucide="book-open"></i>
      Course Creator
    </h1>
  </header>

  <div class="provider-tabs">
    <button class="tab-btn active" data-provider="openrouter">
      <i data-lucide="globe"></i>
      OpenRouter
    </button>
    <button class="tab-btn" data-provider="webllm">
      <i data-lucide="cpu"></i>
      WebLLM
    </button>
    <button class="tab-btn" data-provider="ollama">
      <i data-lucide="server"></i>
      Ollama
    </button>
    <button class="tab-btn" data-provider="puter">
      <i data-lucide="cloud"></i>
      Puter
    </button>
  </div>

  <div class="provider-content">
    <iframe id="provider-iframe" src="openrouter.html"></iframe>
  </div>

  <script type="module" src="assets/js/pages/course-page.js"></script>
  <script>lucide.createIcons();</script>
</body>
</html>
```

**File: `creator/assets/js/pages/course-page.js`**
```javascript
/**
 * Course Page Controller
 * Manages provider tab switching
 */

import { iconManager } from '../core/icons.js';

class CoursePage {
  constructor() {
    this.currentProvider = 'openrouter';
    this.init();
  }

  init() {
    this.loadSavedProvider();
    this.bindTabEvents();
  }

  bindTabEvents() {
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const provider = tab.dataset.provider;
        this.switchProvider(provider);
      });
    });
  }

  switchProvider(provider) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.provider === provider);
    });

    // Load provider iframe
    const iframe = document.getElementById('provider-iframe');
    iframe.src = `${provider}.html`;

    // Save preference
    this.currentProvider = provider;
    localStorage.setItem('selected_provider', provider);
  }

  loadSavedProvider() {
    const saved = localStorage.getItem('selected_provider');
    if (saved) {
      this.switchProvider(saved);
    }
  }
}

new CoursePage();
```

### 5.4 Phase 3 Verification Checklist

- [ ] All provider tabs switch correctly
- [ ] OpenRouter integration still works
- [ ] WebLLM model downloads and generates content
- [ ] Ollama connects to local server
- [ ] Puter SDK loads and authenticates
- [ ] All providers follow same UI pattern
- [ ] Provider selection persists across reloads
- [ ] Icons render correctly on all provider pages
- [ ] Error handling works for each provider
- [ ] Course generation works with all providers

### 5.5 Phase 3 Commit Point

**Commit Message**:
```
Phase 3: Add multi-provider support (WebLLM, Ollama, Puter)

- Implement AIProviderInterface abstraction layer
- Add WebLLM provider with browser-based inference
- Add Ollama provider with local server integration
- Add Puter provider with free cloud access
- Implement provider tab switching system
- Add provider selection persistence
- Ensure consistent UI across all providers
```

---

## 6. Phase 4: Advanced Features

### 6.1 Objectives
Complete the platform with:
- Multi-language translation system
- Slides/presentation creator
- Visual editing with Konva.js
- Export to multiple formats (PDF, PPTX, HTML)

### 6.2 Prerequisites
- Phase 3 must be completed and committed
- Konva.js library integrated
- Export libraries tested (jsPDF, PptxGenJS)

### 6.3 Deliverables

#### 6.3.1 Multi-Language Translation

**Enhancement to CourseManager** (`creator/assets/js/core/course-manager.js`):
```javascript
/**
 * Translate course content to selected languages
 * @param {AIProviderInterface} provider - AI provider for translation
 * @returns {Promise<void>}
 */
async translateCourse(provider) {
  const baseLanguage = 'en';

  for (const targetLang of this.selectedLanguages) {
    if (targetLang === baseLanguage) continue;

    // Translate course metadata
    this.translations[targetLang] = {
      courseName: await this.translateText(this.courseName, targetLang, provider),
      courseDescription: await this.translateText(this.courseDescription, targetLang, provider),
      chapters: []
    };

    // Translate each chapter
    for (const chapter of this.chapters) {
      const translatedChapter = {
        title: await this.translateText(chapter.title, targetLang, provider),
        content: await this.translateText(chapter.content, targetLang, provider)
      };

      this.translations[targetLang].chapters.push(translatedChapter);
    }
  }
}

async translateText(text, targetLang, provider) {
  const prompt = `Translate the following text to ${targetLang}. Maintain markdown formatting:\n\n${text}`;

  const response = await provider.generateCourse({
    prompt,
    depth: 'standard',
    chapters: 1
  });

  return response.chapters[0].content;
}
```

#### 6.3.2 Slides Creator Interface

**File: `creator/slides/webllm.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slides Creator - WebLLM</title>
  <link rel="stylesheet" href="../assets/css/themes/minimal-theme.css">
  <script src="../assets/js/lucide/lucide.min.js"></script>
</head>
<body>
  <main class="slides-creator">
    <!-- Provider Info -->
    <section class="provider-info">
      <h2>
        <i data-lucide="cpu"></i>
        Browser AI (WebLLM)
      </h2>
      <p>AI models run directly in your browser for maximum privacy.</p>
      <div id="model-load-progress" class="progress-bar hidden"></div>
    </section>

    <!-- Presentation Generator -->
    <section class="presentation-generator">
      <h3>
        <i data-lucide="presentation"></i>
        Presentation Generator
      </h3>

      <textarea id="presentation-topic" placeholder="Presentation Topic - e.g., 'The Future of Artificial Intelligence in Healthcare'"></textarea>

      <div class="form-group">
        <label for="slide-count">Number of Slides</label>
        <select id="slide-count">
          <option value="4">4 slides</option>
          <option value="6">6 slides</option>
          <option value="8" selected>8 slides</option>
          <option value="10">10 slides</option>
          <option value="12">12 slides</option>
        </select>
      </div>

      <button id="generate-presentation-btn" class="btn-primary btn-lg">
        <i data-lucide="zap"></i>
        Generate Presentation
      </button>

      <div id="generation-status" class="status-display hidden"></div>
    </section>

    <!-- Visual Editor -->
    <section class="visual-editor">
      <h3>
        <i data-lucide="edit"></i>
        Visual Editor
      </h3>
      <div id="konva-container"></div>
    </section>

    <!-- Export Options -->
    <section class="export-options">
      <h3>
        <i data-lucide="download"></i>
        Export & Download
      </h3>

      <div class="export-buttons">
        <button id="export-pdf-btn" class="btn-primary">
          <i data-lucide="file-text"></i>
          Export as PDF
        </button>

        <button id="export-pptx-btn" class="btn-primary">
          <i data-lucide="presentation"></i>
          Export as PowerPoint
        </button>

        <button id="export-html-btn" class="btn-secondary">
          <i data-lucide="code"></i>
          Export as HTML
        </button>

        <button id="export-json-btn" class="btn-secondary">
          <i data-lucide="brackets"></i>
          Export Data (JSON)
        </button>
      </div>

      <div id="export-status" class="status-display hidden"></div>
    </section>
  </main>

  <script type="module" src="../assets/js/pages/slides-webllm-page.js"></script>
  <script>lucide.createIcons();</script>
</body>
</html>
```

#### 6.3.3 Slides Manager

**File: `creator/assets/js/core/slides-manager.js`**
```javascript
/**
 * Slides Manager
 * Handles presentation data and visual editing
 */

export class SlidesManager {
  constructor() {
    this.presentationName = '';
    this.slides = [];
    this.currentSlide = 0;
    this.stage = null;
    this.layer = null;
  }

  /**
   * Initialize Konva stage for visual editing
   * @param {HTMLElement} container - Container element
   */
  initKonva(container) {
    this.stage = new Konva.Stage({
      container: container.id,
      width: 800,
      height: 600
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  /**
   * Load slides from AI-generated data
   * @param {Object} presentationData - AI-generated presentation
   */
  loadPresentation(presentationData) {
    this.presentationName = presentationData.presentationName;
    this.slides = presentationData.slides.map((slide, index) => ({
      id: index,
      title: slide.title,
      content: slide.content,
      visualElements: []
    }));
  }

  /**
   * Render current slide in Konva
   */
  renderSlide() {
    this.layer.destroyChildren();

    const slide = this.slides[this.currentSlide];
    if (!slide) return;

    // Background
    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: '#FFFFFF'
    });
    this.layer.add(background);

    // Title
    const title = new Konva.Text({
      x: 50,
      y: 50,
      text: slide.title,
      fontSize: 32,
      fontFamily: 'Arial',
      fill: '#0F172A',
      width: 700,
      draggable: true
    });
    this.layer.add(title);

    // Content
    const content = new Konva.Text({
      x: 50,
      y: 120,
      text: slide.content,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#64748B',
      width: 700,
      draggable: true
    });
    this.layer.add(content);

    this.layer.draw();
  }

  /**
   * Export slides as PDF
   * @returns {Promise<Blob>} PDF blob
   */
  async exportPDF() {
    const { jsPDF } = await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600]
    });

    for (let i = 0; i < this.slides.length; i++) {
      if (i > 0) pdf.addPage();

      // Render slide to canvas
      this.currentSlide = i;
      this.renderSlide();

      const dataURL = this.stage.toDataURL();
      pdf.addImage(dataURL, 'PNG', 0, 0, 800, 600);
    }

    return pdf.output('blob');
  }

  /**
   * Export slides as PowerPoint
   * @returns {Promise<Blob>} PPTX blob
   */
  async exportPPTX() {
    const pptx = new PptxGenJS();

    this.slides.forEach(slide => {
      const pptxSlide = pptx.addSlide();

      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        fontSize: 32,
        bold: true,
        color: '0F172A'
      });

      pptxSlide.addText(slide.content, {
        x: 0.5,
        y: 1.5,
        fontSize: 18,
        color: '64748B',
        w: '90%'
      });
    });

    return await pptx.write({ outputType: 'blob' });
  }

  /**
   * Export slides as HTML
   * @returns {string} HTML presentation
   */
  exportHTML() {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${this.presentationName}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; }
    .slide {
      width: 100vw;
      height: 100vh;
      padding: 50px;
      box-sizing: border-box;
    }
    .slide h1 { font-size: 3rem; color: #0F172A; }
    .slide p { font-size: 1.5rem; color: #64748B; }
  </style>
</head>
<body>
  ${this.slides.map(slide => `
    <div class="slide">
      <h1>${slide.title}</h1>
      <p>${slide.content}</p>
    </div>
  `).join('\n')}
</body>
</html>`;
  }

  /**
   * Export slides data as JSON
   * @returns {string} JSON data
   */
  exportJSON() {
    return JSON.stringify({
      presentationName: this.presentationName,
      slides: this.slides
    }, null, 2);
  }
}
```

### 6.4 Phase 4 Verification Checklist

- [ ] Multi-language translation generates content for all selected languages
- [ ] Slides creator generates presentation from topic
- [ ] Konva.js visual editor loads and renders slides
- [ ] Slide elements are draggable and editable
- [ ] PDF export generates valid PDF file
- [ ] PPTX export generates valid PowerPoint file
- [ ] HTML export creates standalone presentation
- [ ] JSON export contains complete slide data
- [ ] All export formats download successfully

### 6.5 Phase 4 Commit Point

**Commit Message**:
```
Phase 4: Add advanced features (multi-language, slides creator)

- Implement multi-language translation system
- Add slides creator with AI-powered generation
- Integrate Konva.js for visual slide editing
- Implement PDF export with jsPDF
- Implement PPTX export with PptxGenJS
- Add HTML and JSON export options
- Add slide navigation and editing controls
```

---

## 7. Phase 5: Testing, Optimization & Deployment

### 7.1 Objectives
Finalize the platform with:
- Comprehensive testing suite
- Performance optimization
- GitHub Pages deployment automation
- Documentation and user guides

### 7.2 Deliverables

#### 7.2.1 Functional Test Suite

**File: `creator/tests/functional-tests.html`**
(Implementation details matching PRD Section 5)

#### 7.2.2 Screenshot Automation

Integration with existing screenshot tools:
```bash
cd creator/tools/screenshot-automation
npm install
npm run screenshot-all
```

#### 7.2.3 GitHub Actions Workflow

**File: `.github/workflows/deploy.yml`**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt

      - name: Build site
        run: |
          python build_site.py
          mkdocs build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

#### 7.2.4 Performance Optimization

- [ ] Minify CSS and JavaScript files
- [ ] Compress images and icons
- [ ] Implement lazy loading for heavy libraries
- [ ] Add service worker for offline capability
- [ ] Optimize bundle sizes
- [ ] Enable browser caching

### 7.3 Phase 5 Verification Checklist

- [ ] All functional tests pass
- [ ] Screenshot comparisons show consistent UI
- [ ] GitHub Actions workflow deploys successfully
- [ ] Performance audit shows good scores
- [ ] Mobile responsiveness verified on real devices
- [ ] Accessibility audit passes WCAG 2.1 AA
- [ ] Cross-browser testing completed
- [ ] Documentation is complete and accurate

### 7.4 Phase 5 Commit Point

**Commit Message**:
```
Phase 5: Add testing, optimization, and deployment automation

- Implement comprehensive functional test suite
- Add screenshot automation for visual regression testing
- Configure GitHub Actions for automated deployment
- Optimize assets and bundle sizes
- Add service worker for offline capability
- Complete documentation and user guides
```

---

## 8. Technical Specifications

### 8.1 Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript**: ES6+ module support required
- **CSS**: Grid and Flexbox support
- **Storage**: localStorage and sessionStorage

### 8.2 External Dependencies

**Core Libraries**:
- **Lucide Icons** (v0.263.1) - Icon system
- **ToastUI Editor** (v3.2.2) - Rich text editing
- **JSZip** (v3.10.1) - File compression
- **Konva.js** (v9.2.0) - Canvas manipulation
- **jsPDF** (v2.5.1) - PDF generation
- **PptxGenJS** (v3.12.0) - PowerPoint generation

**AI Provider SDKs**:
- **WebLLM** (@mlc-ai/web-llm) - Browser AI
- **Puter SDK** (js.puter.com/v2/) - Cloud AI

### 8.3 Security Considerations

**Content Security Policy**:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net https://esm.run https://js.puter.com;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://openrouter.ai http://localhost:11434;
  img-src 'self' data: blob:;
">
```

**API Key Storage**:
- Use localStorage for non-sensitive preferences
- Never commit API keys to repository
- Provide clear instructions for secure key management

### 8.4 File Structure (Complete)

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── creator/
│   ├── index.html
│   ├── course.html
│   ├── slides.html
│   ├── openrouter.html
│   ├── webllm.html
│   ├── ollama.html
│   ├── puter.html
│   ├── slides/
│   │   ├── webllm.html
│   │   ├── ollama.html
│   │   └── puter.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── core/
│   │   │   │   ├── reset.css
│   │   │   │   ├── variables.css
│   │   │   │   └── typography.css
│   │   │   ├── components/
│   │   │   │   ├── buttons.css
│   │   │   │   ├── forms.css
│   │   │   │   ├── cards.css
│   │   │   │   ├── tabs.css
│   │   │   │   └── modals.css
│   │   │   ├── layouts/
│   │   │   │   ├── grid.css
│   │   │   │   └── containers.css
│   │   │   └── themes/
│   │   │       └── minimal-theme.css
│   │   └── js/
│   │       ├── lucide/
│   │       │   └── lucide.min.js
│   │       ├── core/
│   │       │   ├── icons.js
│   │       │   ├── router.js
│   │       │   ├── provider-interface.js
│   │       │   ├── course-manager.js
│   │       │   ├── slides-manager.js
│   │       │   └── file-generator.js
│   │       ├── providers/
│   │       │   ├── openrouter.js
│   │       │   ├── webllm.js
│   │       │   ├── ollama.js
│   │       │   └── puter.js
│   │       └── pages/
│   │           ├── course-page.js
│   │           ├── openrouter-page.js
│   │           ├── webllm-page.js
│   │           ├── ollama-page.js
│   │           ├── puter-page.js
│   │           └── slides-webllm-page.js
│   ├── tests/
│   │   └── functional-tests.html
│   └── tools/
│       └── screenshot-automation/
│           ├── package.json
│           ├── screenshot-simple.js
│           └── take-responsive-screenshots.js
├── docs/
│   └── (generated course content)
├── build_site.py
├── mkdocs.yml
├── requirements.txt
├── CLAUDE.md
├── PRD.md
└── README.md
```

---

## 9. Success Metrics

### 9.1 User Engagement
- Course creation completion rates > 80%
- Average time to generate course < 5 minutes
- Multi-provider adoption rates
- Multi-language usage statistics

### 9.2 Technical Performance
- Page load times < 2 seconds
- AI generation response time < 30 seconds
- Error rates < 2% across all providers
- Mobile usage > 30% of total traffic

### 9.3 Content Quality
- Course structure completeness > 95%
- User editing frequency (indicates AI quality)
- Export success rates > 98%
- Published course metrics

---

## 10. Conclusion

This Product Requirements Document provides a **comprehensive, phased implementation guide** for the Emotions for Engineers platform. Each phase:

1. **Builds incrementally** on previous work
2. **Delivers working functionality** at every commit point
3. **Maintains code quality** with verification checklists
4. **Uses modern web standards** and best practices
5. **Follows CSS-first architecture** with Lucide icons throughout

### Implementation Roadmap

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 1 | 2-3 days | Core infrastructure |
| Phase 2 | 3-5 days | Single provider (OpenRouter) |
| Phase 3 | 3-4 days | Multi-provider support |
| Phase 4 | 4-6 days | Advanced features |
| Phase 5 | 2-3 days | Testing & deployment |
| **Total** | **14-21 days** | **Production-ready platform** |

### Next Steps

1. ✅ Review and approve this PRD
2. ⏳ Begin Phase 1 implementation
3. ⏳ Commit and push after Phase 1 verification
4. ⏳ Continue through subsequent phases
5. ⏳ Launch production platform

This PRD serves as the **definitive implementation guide** for building a world-class AI-powered course creation platform with professional output quality and exceptional user experience.