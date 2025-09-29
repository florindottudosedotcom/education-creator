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

  async enhancePrompt(prompt) {
    if (!this.isConnected()) {
      throw new Error('WebLLM not initialized');
    }

    const systemPrompt = `You are an expert educational content designer. Enhance the following course prompt to be more detailed and structured while maintaining the user's intent. Add specific learning objectives, target audience, and key topics to cover.`;

    try {
      const response = await this.engine.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      return response.choices[0].message.content;

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

  onModelLoadProgress(progress) {
    // Emit custom event for UI updates
    window.dispatchEvent(new CustomEvent('webllm-progress', {
      detail: progress
    }));
  }
}