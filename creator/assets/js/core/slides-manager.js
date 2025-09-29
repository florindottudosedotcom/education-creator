/**
 * Slides Manager
 * Handles presentation data and visual editing with Konva.js
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
  async initKonva(container) {
    // Load Konva if not already loaded
    if (typeof window.Konva === 'undefined') {
      await this.loadKonva();
    }

    this.stage = new window.Konva.Stage({
      container: container.id,
      width: container.offsetWidth || 800,
      height: 600
    });

    this.layer = new window.Konva.Layer();
    this.stage.add(this.layer);
  }

  /**
   * Load Konva library dynamically
   * @private
   */
  async loadKonva() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '../assets/js/konva/konva.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Load presentation from AI-generated data
   * @param {Object} presentationData - AI-generated presentation
   */
  loadPresentation(presentationData) {
    this.presentationName = presentationData.presentationName;
    this.slides = presentationData.slides.map((slide, index) => ({
      id: index,
      title: slide.title,
      content: slide.content,
      markdown: this.generateSlideMarkdown(slide.title, slide.content),
      visualElements: []
    }));

    this.saveState();
  }

  /**
   * Generate markdown for a single slide
   * @param {string} title - Slide title
   * @param {string} content - Slide content
   * @returns {string} Pandoc-compatible markdown
   * @private
   */
  generateSlideMarkdown(title, content) {
    return `# ${title}\n\n${content}\n\n---\n`;
  }

  /**
   * Render current slide in Konva
   */
  async renderSlide() {
    if (!this.layer) return;

    this.layer.destroyChildren();

    const slide = this.slides[this.currentSlide];
    if (!slide) return;

    const Konva = window.Konva;

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
   * Update slide content
   * @param {number} slideIndex - Slide index
   * @param {Object} updates - Updates to apply
   */
  updateSlide(slideIndex, updates) {
    if (this.slides[slideIndex]) {
      Object.assign(this.slides[slideIndex], updates);

      // Regenerate markdown if title or content changed
      if (updates.title || updates.content) {
        this.slides[slideIndex].markdown = this.generateSlideMarkdown(
          this.slides[slideIndex].title,
          this.slides[slideIndex].content
        );
      }

      this.saveState();
    }
  }

  /**
   * Switch to different slide
   * @param {number} slideIndex - Slide index
   */
  switchSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < this.slides.length) {
      this.currentSlide = slideIndex;
      this.renderSlide();
    }
  }

  /**
   * Export all slides as single Pandoc-compatible markdown file
   * @returns {string} Markdown content
   */
  exportMarkdown() {
    let markdown = `---\ntitle: ${this.presentationName}\nauthor: Generated with AI Creator Hub\ndate: ${new Date().toISOString().split('T')[0]}\n---\n\n`;

    markdown += this.slides.map(slide => slide.markdown || this.generateSlideMarkdown(slide.title, slide.content)).join('\n');

    return markdown;
  }

  /**
   * Export slides as PDF using canvas rendering
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
      await this.renderSlide();

      const dataURL = this.stage.toDataURL();
      pdf.addImage(dataURL, 'PNG', 0, 0, 800, 600);
    }

    return pdf.output('blob');
  }

  /**
   * Export markdown file for external conversion
   * Note: User can convert with pandoc locally:
   * pandoc slides.md -o slides.pdf --pdf-engine=xelatex -t beamer
   * pandoc slides.md -o slides.pptx
   * @returns {Blob} Markdown file blob
   */
  exportMarkdownFile() {
    const markdown = this.exportMarkdown();
    return new Blob([markdown], { type: 'text/markdown' });
  }

  /**
   * Export slides as PowerPoint
   * @returns {Promise<Blob>} PPTX blob
   */
  async exportPPTX() {
    const PptxGenJS = (await import('https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/+esm')).default;
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.presentationName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background: #0F172A;
      color: #F8FAFC;
      overflow: hidden;
    }
    .slide {
      width: 100vw;
      height: 100vh;
      padding: 50px;
      display: none;
      flex-direction: column;
      justify-content: center;
    }
    .slide.active {
      display: flex;
    }
    .slide h1 {
      font-size: 3rem;
      color: #F8FAFC;
      margin-bottom: 2rem;
    }
    .slide p {
      font-size: 1.5rem;
      color: #CBD5E1;
      line-height: 1.6;
    }
    .controls {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
    }
    button {
      padding: 10px 20px;
      background: #2563EB;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #1D4ED8;
    }
  </style>
</head>
<body>
  ${this.slides.map((slide, index) => `
  <div class="slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
    <h1>${slide.title}</h1>
    <p>${slide.content}</p>
  </div>
  `).join('\n')}

  <div class="controls">
    <button onclick="previousSlide()">← Previous</button>
    <button onclick="nextSlide()">Next →</button>
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    function previousSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') previousSlide();
    });
  </script>
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

  /**
   * Save state to sessionStorage
   */
  saveState() {
    const state = {
      presentationName: this.presentationName,
      slides: this.slides,
      currentSlide: this.currentSlide,
      timestamp: Date.now()
    };

    sessionStorage.setItem('slides_state', JSON.stringify(state));
  }

  /**
   * Load state from sessionStorage
   */
  loadState() {
    const saved = sessionStorage.getItem('slides_state');
    if (saved) {
      const state = JSON.parse(saved);
      Object.assign(this, state);
      return true;
    }
    return false;
  }

  /**
   * Clear all presentation data
   */
  clear() {
    this.presentationName = '';
    this.slides = [];
    this.currentSlide = 0;
    sessionStorage.removeItem('slides_state');
  }
}