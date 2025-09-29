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
    this.availableModels = [];
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

  async enhancePrompt(prompt) {
    if (!this.isConnected()) {
      throw new Error('Not connected to Ollama');
    }

    const systemPrompt = `You are an expert educational content designer. Enhance the following course prompt to be more detailed and structured while maintaining the user's intent. Add specific learning objectives, target audience, and key topics to cover.`;

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
            temperature: 0.8,
            num_predict: 500
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;

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