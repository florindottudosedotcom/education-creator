/**
 * OpenRouter Slides Page Controller
 * Coordinates UI and business logic for presentation creation
 */

import { OpenRouterProvider } from '../providers/openrouter.js';
import { SlidesManager } from '../core/slides-manager.js';
import { iconManager } from '../core/icons.js';

class OpenRouterSlidesPage {
  constructor() {
    this.provider = new OpenRouterProvider();
    this.slidesManager = new SlidesManager();
    this.konvaInitialized = false;

    this.init();
  }

  init() {
    // Load saved credentials
    this.provider.loadCredentials();
    this.slidesManager.loadState();

    // Bind UI events
    this.bindAuthEvents();
    this.bindGenerationEvents();
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
        this.showSuccess('Connected to OpenRouter successfully!');
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
      this.provider.saveCredentials();
    });
  }

  bindGenerationEvents() {
    const generateBtn = document.getElementById('generate-presentation-btn');
    const enhanceBtn = document.getElementById('enhance-topic-btn');
    const clearBtn = document.getElementById('clear-form-btn');

    generateBtn?.addEventListener('click', () => this.generatePresentation());
    enhanceBtn?.addEventListener('click', () => this.enhanceTopic());
    clearBtn?.addEventListener('click', () => this.confirmClear());
  }

  async enhanceTopic() {
    const topicEl = document.getElementById('presentation-topic');
    const topic = topicEl.value.trim();

    if (!topic) {
      this.showError('Please enter a presentation topic first');
      return;
    }

    if (!this.provider.connected) {
      this.showError('Please connect to OpenRouter first');
      return;
    }

    const enhanceBtn = document.getElementById('enhance-topic-btn');
    this.setLoading(enhanceBtn, true);

    try {
      const enhanced = await this.provider.enhancePrompt(
        `Enhance this presentation topic to be more detailed and engaging: "${topic}"`
      );
      topicEl.value = enhanced;
      this.showSuccess('Topic enhanced successfully!');
    } catch (error) {
      this.showError(`Enhancement failed: ${error.message}`);
    } finally {
      this.setLoading(enhanceBtn, false);
    }
  }

  async generatePresentation() {
    if (!this.provider.connected) {
      this.showError('Please connect to OpenRouter first');
      return;
    }

    const topic = document.getElementById('presentation-topic').value.trim();
    if (!topic) {
      this.showError('Please enter a presentation topic');
      return;
    }

    const slideCount = parseInt(document.getElementById('slide-count').value);

    // Check for existing content
    if (this.slidesManager.slides.length > 0) {
      const overwrite = await this.confirmOverwrite();
      if (!overwrite) return;
      this.slidesManager.clear();
    }

    // Show progress
    this.showGenerationProgress('Generating presentation... This may take a moment.');

    try {
      const presentationData = await this.generatePresentationWithAI(topic, slideCount);

      this.slidesManager.loadPresentation(presentationData);
      await this.renderPresentation();
      this.showSuccess('Presentation generated successfully!');

    } catch (error) {
      this.showError(`Generation failed: ${error.message}`);
    } finally {
      this.hideGenerationProgress();
    }
  }

  async generatePresentationWithAI(topic, slideCount) {
    const systemPrompt = `You are an expert presentation designer. Create a structured presentation with ${slideCount} slides about: "${topic}"

IMPORTANT: Respond with ONLY valid JSON in this exact format:
{
  "presentationName": "Presentation Title",
  "slides": [
    {
      "title": "Slide Title",
      "content": "Slide content with bullet points or paragraphs. Keep it concise and impactful."
    }
  ]
}

Guidelines:
- First slide should be a title slide with the presentation name
- Each slide should have a clear, focused message
- Use concise bullet points or short paragraphs
- Include a conclusion slide at the end
- Keep content visual and engaging
- NO additional text outside the JSON structure`;

    const response = await this.provider.generateCourse({
      prompt: topic,
      depth: 'brief',
      chapters: slideCount
    });

    // Adapt course response to presentation format
    return {
      presentationName: response.courseName || topic,
      slides: response.chapters.map(chapter => ({
        title: chapter.title,
        content: chapter.content.substring(0, 300) // Limit content length for slides
      }))
    };
  }

  async renderPresentation() {
    // Show sections
    document.getElementById('presentation-details-section')?.classList.remove('hidden');
    document.getElementById('slides-section')?.classList.remove('hidden');
    document.getElementById('export-section')?.classList.remove('hidden');

    // Update presentation details
    document.getElementById('presentation-name').value = this.slidesManager.presentationName;

    // Render slide tabs
    this.renderSlideTabs();

    // Initialize Konva
    await this.initializeKonva();

    // Refresh icons
    iconManager.refresh();
  }

  renderSlideTabs() {
    const container = document.getElementById('slide-tabs-container');
    container.innerHTML = '';

    this.slidesManager.slides.forEach((slide, index) => {
      const tab = document.createElement('button');
      tab.className = 'slide-tab';
      tab.dataset.slide = index;
      tab.textContent = `${index + 1}. ${slide.title}`;

      if (index === this.slidesManager.currentSlide) {
        tab.classList.add('active');
      }

      tab.addEventListener('click', () => {
        this.switchSlide(index);
      });

      container.appendChild(tab);
    });
  }

  async initializeKonva() {
    if (this.konvaInitialized) {
      await this.slidesManager.renderSlide();
      return;
    }

    const container = document.getElementById('konva-container');
    if (!container) return;

    await this.slidesManager.initKonva(container);
    await this.slidesManager.renderSlide();
    this.konvaInitialized = true;
  }

  switchSlide(index) {
    this.slidesManager.switchSlide(index);

    // Update tabs
    document.querySelectorAll('.slide-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
  }

  bindExportEvents() {
    const exportMarkdownBtn = document.getElementById('export-markdown-btn');
    const exportPDFBtn = document.getElementById('export-pdf-btn');
    const exportPPTXBtn = document.getElementById('export-pptx-btn');
    const exportHTMLBtn = document.getElementById('export-html-btn');
    const exportJSONBtn = document.getElementById('export-json-btn');

    exportMarkdownBtn?.addEventListener('click', () => this.exportMarkdown());
    exportPDFBtn?.addEventListener('click', () => this.exportPDF());
    exportPPTXBtn?.addEventListener('click', () => this.exportPPTX());
    exportHTMLBtn?.addEventListener('click', () => this.exportHTML());
    exportJSONBtn?.addEventListener('click', () => this.exportJSON());
  }

  exportMarkdown() {
    if (this.slidesManager.slides.length === 0) {
      this.showExportError('No slides to export');
      return;
    }

    const blob = this.slidesManager.exportMarkdownFile();
    this.downloadFile(blob, 'slides.md');
    this.showExportSuccess('Markdown file downloaded! Use pandoc to convert to PDF or PPTX.');
  }

  async exportPDF() {
    if (this.slidesManager.slides.length === 0) {
      this.showExportError('No slides to export');
      return;
    }

    this.showExportProgress('Generating PDF...');

    try {
      const blob = await this.slidesManager.exportPDF();
      this.downloadFile(blob, `${this.slidesManager.presentationName}.pdf`);
      this.showExportSuccess('PDF exported successfully!');
    } catch (error) {
      this.showExportError(`PDF export failed: ${error.message}`);
    } finally {
      this.hideExportProgress();
    }
  }

  async exportPPTX() {
    if (this.slidesManager.slides.length === 0) {
      this.showExportError('No slides to export');
      return;
    }

    this.showExportProgress('Generating PowerPoint...');

    try {
      const blob = await this.slidesManager.exportPPTX();
      this.downloadFile(blob, `${this.slidesManager.presentationName}.pptx`);
      this.showExportSuccess('PowerPoint exported successfully!');
    } catch (error) {
      this.showExportError(`PowerPoint export failed: ${error.message}`);
    } finally {
      this.hideExportProgress();
    }
  }

  exportHTML() {
    if (this.slidesManager.slides.length === 0) {
      this.showExportError('No slides to export');
      return;
    }

    const html = this.slidesManager.exportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    this.downloadFile(blob, `${this.slidesManager.presentationName}.html`);
    this.showExportSuccess('HTML presentation exported successfully!');
  }

  exportJSON() {
    if (this.slidesManager.slides.length === 0) {
      this.showExportError('No slides to export');
      return;
    }

    const json = this.slidesManager.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    this.downloadFile(blob, `${this.slidesManager.presentationName}.json`);
    this.showExportSuccess('JSON data exported successfully!');
  }

  downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  confirmClear() {
    if (confirm('This will clear all presentation data. Are you sure?')) {
      this.slidesManager.clear();
      location.reload();
    }
  }

  // UI Helper Methods
  updateConnectionUI(connected) {
    const connectBtn = document.getElementById('connect-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');
    const apiKeyInput = document.getElementById('api-key');
    const generationSection = document.getElementById('generation-section');

    if (connected) {
      connectBtn?.classList.add('hidden');
      disconnectBtn?.classList.remove('hidden');
      apiKeyInput.disabled = true;
      generationSection?.classList.remove('hidden');
    } else {
      connectBtn?.classList.remove('hidden');
      disconnectBtn?.classList.add('hidden');
      apiKeyInput.disabled = false;
      generationSection?.classList.add('hidden');
    }
  }

  showError(message) {
    this.showStatus('connection-status', message, 'error');
  }

  showSuccess(message) {
    this.showStatus('connection-status', message, 'success');
  }

  showExportError(message) {
    this.showStatus('export-status', message, 'error');
  }

  showExportSuccess(message) {
    this.showStatus('export-status', message, 'success');
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

  showExportProgress(message = 'Exporting...') {
    this.showStatus('export-status', message, 'info');
  }

  hideExportProgress() {
    document.getElementById('export-status')?.classList.add('hidden');
  }

  restoreUIState() {
    // Restore model selection
    const modelSelect = document.getElementById('model-select');
    if (modelSelect && this.provider.selectedModel) {
      modelSelect.value = this.provider.selectedModel;
    }

    // Restore connection state
    if (this.provider.connected) {
      this.updateConnectionUI(true);
      document.getElementById('api-key').value = '••••••••••••••••';
    }

    // Restore presentation data if exists
    if (this.slidesManager.slides.length > 0) {
      this.renderPresentation();
    }
  }
}

// Initialize page
new OpenRouterSlidesPage();