/**
 * WebLLM Page Controller
 * Coordinates UI and business logic for browser-based AI
 */

import { WebLLMProvider } from '../providers/webllm.js';
import { CourseManager } from '../core/course-manager.js';
import { FileGenerator } from '../core/file-generator.js';
import { iconManager } from '../core/icons.js';

class WebLLMPage {
  constructor() {
    this.provider = new WebLLMProvider();
    this.courseManager = new CourseManager();
    this.fileGenerator = new FileGenerator();
    this.editors = [];
    this.generatedZip = null;

    this.init();
  }

  init() {
    // Load saved state
    this.courseManager.loadState();

    // Bind UI events
    this.bindAuthEvents();
    this.bindGenerationEvents();
    this.bindLanguageEvents();
    this.bindExportEvents();

    // Listen for model loading progress
    window.addEventListener('webllm-progress', (e) => {
      this.updateLoadingProgress(e.detail);
    });

    // Restore UI state
    this.restoreUIState();
  }

  bindAuthEvents() {
    const connectBtn = document.getElementById('connect-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');
    const modelSelect = document.getElementById('model-select');

    connectBtn?.addEventListener('click', async () => {
      this.setLoading(connectBtn, true);
      this.showLoadingProgress('Loading model... This may take a few minutes.');

      const success = await this.provider.connect();
      this.setLoading(connectBtn, false);
      this.hideLoadingProgress();

      if (success) {
        this.showSuccess('WebLLM initialized successfully!');
        this.updateConnectionUI(true);
      } else {
        this.showError('Failed to initialize WebLLM.');
      }
    });

    disconnectBtn?.addEventListener('click', () => {
      this.provider.disconnect();
      this.updateConnectionUI(false);
      this.showSuccess('Disconnected from WebLLM');
    });

    modelSelect?.addEventListener('change', (e) => {
      this.provider.selectedModel = e.target.value;
    });
  }

  bindGenerationEvents() {
    const generateBtn = document.getElementById('generate-course-btn');
    const enhanceBtn = document.getElementById('enhance-prompt-btn');
    const clearBtn = document.getElementById('clear-form-btn');

    generateBtn?.addEventListener('click', () => this.generateCourse());
    enhanceBtn?.addEventListener('click', () => this.enhancePrompt());
    clearBtn?.addEventListener('click', () => this.confirmClear());
  }

  async enhancePrompt() {
    const promptEl = document.getElementById('master-prompt');
    const prompt = promptEl.value.trim();

    if (!prompt) {
      this.showError('Please enter a course description first');
      return;
    }

    if (!this.provider.isConnected()) {
      this.showError('Please initialize WebLLM first');
      return;
    }

    const enhanceBtn = document.getElementById('enhance-prompt-btn');
    this.setLoading(enhanceBtn, true);

    try {
      const enhanced = await this.provider.enhancePrompt(prompt);
      promptEl.value = enhanced;
      this.showSuccess('Prompt enhanced successfully!');
    } catch (error) {
      this.showError(`Enhancement failed: ${error.message}`);
    } finally {
      this.setLoading(enhanceBtn, false);
    }
  }

  async generateCourse() {
    if (!this.provider.isConnected()) {
      this.showError('Please initialize WebLLM first');
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
    this.showGenerationProgress('Generating course content... This may take a moment.');

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
    // Show sections
    document.getElementById('course-details-section')?.classList.remove('hidden');
    document.getElementById('chapter-content-section')?.classList.remove('hidden');
    document.getElementById('language-section')?.classList.remove('hidden');
    document.getElementById('export-section')?.classList.remove('hidden');

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
      tab.textContent = `${index + 1}. ${chapter.title}`;

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
      if (index === 0) {
        editorDiv.classList.add('active');
      }
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
      editor.classList.toggle('active', i === index);
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

    // Update course name and description from form
    this.courseManager.courseName = document.getElementById('course-name').value;
    this.courseManager.courseDescription = document.getElementById('course-description').value;

    this.showFileGenerationProgress('Generating files...');

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

  confirmClear() {
    if (confirm('This will clear all course data. Are you sure?')) {
      this.courseManager.clear();
      location.reload();
    }
  }

  // UI Helper Methods
  updateConnectionUI(connected) {
    const connectBtn = document.getElementById('connect-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');

    if (connected) {
      connectBtn?.classList.add('hidden');
      disconnectBtn?.classList.remove('hidden');
    } else {
      connectBtn?.classList.remove('hidden');
      disconnectBtn?.classList.add('hidden');
    }
  }

  updateLoadingProgress(progress) {
    const progressEl = document.getElementById('loading-progress');
    if (progressEl && progress.text) {
      progressEl.textContent = progress.text;
    }
  }

  showLoadingProgress(message) {
    this.showStatus('connection-status', message, 'info');
    const progressEl = document.getElementById('loading-progress');
    if (progressEl) {
      progressEl.classList.remove('hidden');
    }
  }

  hideLoadingProgress() {
    const progressEl = document.getElementById('loading-progress');
    if (progressEl) {
      progressEl.classList.add('hidden');
    }
  }

  showError(message) {
    this.showStatus('connection-status', message, 'error');
  }

  showSuccess(message) {
    this.showStatus('connection-status', message, 'success');
  }

  showStatus(elementId, message, type = 'info') {
    const statusEl = document.getElementById(elementId);
    if (statusEl) {
      statusEl.className = `status-display ${type}`;
      statusEl.textContent = message;
      statusEl.classList.remove('hidden');

      // Auto-hide success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          statusEl.classList.add('hidden');
        }, 5000);
      }
    }
  }

  setLoading(button, loading) {
    button.disabled = loading;
    button.classList.toggle('loading', loading);
  }

  async confirmOverwrite() {
    return new Promise((resolve) => {
      const modal = document.getElementById('overwrite-modal');
      const confirmBtn = document.getElementById('modal-confirm-btn');
      const cancelBtn = document.getElementById('modal-cancel-btn');

      modal?.classList.remove('hidden');

      const handleConfirm = () => {
        modal?.classList.add('hidden');
        cleanup();
        resolve(true);
      };

      const handleCancel = () => {
        modal?.classList.add('hidden');
        cleanup();
        resolve(false);
      };

      const cleanup = () => {
        confirmBtn?.removeEventListener('click', handleConfirm);
        cancelBtn?.removeEventListener('click', handleCancel);
      };

      confirmBtn?.addEventListener('click', handleConfirm);
      cancelBtn?.addEventListener('click', handleCancel);
    });
  }

  showGenerationProgress(message = 'Generating...') {
    this.showStatus('generation-status', message, 'info');
  }

  hideGenerationProgress() {
    document.getElementById('generation-status')?.classList.add('hidden');
  }

  showFileGenerationProgress(message = 'Generating files...') {
    this.showStatus('file-generation-status', message, 'info');
  }

  hideFileGenerationProgress() {
    document.getElementById('file-generation-status')?.classList.add('hidden');
  }

  showDownloadSection() {
    document.getElementById('download-section')?.classList.remove('hidden');
  }

  restoreUIState() {
    // Restore model selection
    const modelSelect = document.getElementById('model-select');
    if (modelSelect && this.provider.selectedModel) {
      modelSelect.value = this.provider.selectedModel;
    }

    // Restore connection state
    if (this.provider.isConnected()) {
      this.updateConnectionUI(true);
    }

    // Restore course data if exists
    if (this.courseManager.chapters.length > 0) {
      this.renderCourse();

      // Restore language selections
      this.courseManager.selectedLanguages.forEach(lang => {
        const checkbox = document.getElementById(`lang-${lang}`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }
  }
}

// Initialize page
new WebLLMPage();