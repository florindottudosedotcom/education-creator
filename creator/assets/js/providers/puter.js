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

  async enhancePrompt(prompt) {
    if (!this.isConnected()) {
      throw new Error('Not connected to Puter');
    }

    const systemPrompt = `You are an expert educational content designer. Enhance the following course prompt to be more detailed and structured while maintaining the user's intent. Add specific learning objectives, target audience, and key topics to cover.`;

    try {
      const response = await this.puter.ai.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ], {
        model: this.selectedModel,
        temperature: 0.8,
        max_tokens: 500
      });

      return response;

    } catch (error) {
      console.error('Prompt enhancement error:', error);
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

IMPORTANT: You must respond with ONLY valid JSON in this exact format:
{
  "courseName": "Course Title",
  "courseDescription": "Brief overview (2-3 sentences)",
  "chapters": [
    {
      "title": "Chapter Title",
      "content": "Markdown formatted content with ## headings, paragraphs, lists, and code blocks"
    }
  ]
}

Guidelines:
- Use clear, engaging language appropriate for the target audience
- Include practical examples and real-world applications
- Structure content with markdown headings (##, ###)
- Use markdown formatting (bold, italic, lists, code blocks)
- Ensure logical progression between chapters
- Each chapter should be complete and self-contained
- NO additional text outside the JSON structure`;
  }

  parseCourseResponse(content) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const courseData = JSON.parse(jsonMatch[0]);

        if (!courseData.courseName || !courseData.courseDescription || !Array.isArray(courseData.chapters)) {
          throw new Error('Invalid course data structure');
        }

        return courseData;
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse course content. Please try again.');
    }
  }
}