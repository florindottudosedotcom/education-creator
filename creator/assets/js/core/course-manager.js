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

    // Add requirements.txt
    files['requirements.txt'] = this.generateRequirementsTxt();

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
site_description: ${this.courseDescription}

theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - toc.integrate
    - search.suggest
    - search.highlight
    - content.code.copy
  palette:
    # Light mode
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    # Dark mode
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode

plugins:
  - search
  - i18n:
      default_language: en
      languages:
${this.selectedLanguages.map(lang => `        ${lang}:
          name: ${this.getLanguageName(lang)}
          build: true`).join('\n')}

nav:
  - Home: index.md
${this.chapters.map((ch, i) => `  - ${ch.title}: chapter-${i + 1}.md`).join('\n')}

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - admonition
  - pymdownx.details
  - pymdownx.tabbed:
      alternate_style: true
  - attr_list
  - md_in_html
`;
  }

  /**
   * Generate requirements.txt for MkDocs
   * @private
   */
  generateRequirementsTxt() {
    return `mkdocs>=1.5.0
mkdocs-material>=9.4.0
mkdocs-static-i18n>=1.0.0
`;
  }

  /**
   * Get full language name from code
   * @private
   */
  getLanguageName(code) {
    const names = {
      en: 'English',
      de: 'Deutsch',
      fr: 'Français',
      hi: 'हिन्दी',
      it: 'Italiano',
      ja: '日本語',
      pt: 'Português',
      ro: 'Română',
      ru: 'Русский',
      es: 'Español',
      zh: '中文'
    };
    return names[code] || code;
  }
}