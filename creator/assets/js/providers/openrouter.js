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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseCourseResponse(data);

    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }

  /**
   * Enhance user prompt with AI
   * @param {string} prompt - Original prompt
   * @returns {Promise<string>} Enhanced prompt
   */
  async enhancePrompt(prompt) {
    if (!this.connected) {
      throw new Error('Not connected to OpenRouter');
    }

    const systemPrompt = `You are an expert educational content designer. Enhance the following course prompt to be more detailed and structured while maintaining the user's intent. Add specific learning objectives, target audience, and key topics to cover.`;

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
          temperature: 0.8,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('Prompt enhancement error:', error);
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
        const courseData = JSON.parse(jsonMatch[0]);

        // Validate structure
        if (!courseData.courseName || !courseData.courseDescription || !Array.isArray(courseData.chapters)) {
          throw new Error('Invalid course data structure');
        }

        return courseData;
      }

      // Fallback: parse markdown structure
      return this.parseMarkdownCourse(content);

    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse course content. Please try again.');
    }
  }

  /**
   * Fallback parser for markdown-formatted responses
   * @private
   */
  parseMarkdownCourse(content) {
    const lines = content.split('\n');
    const chapters = [];
    let currentChapter = null;
    let courseName = 'Untitled Course';
    let courseDescription = 'Course description not available.';

    for (const line of lines) {
      // Extract course name from first H1
      if (line.startsWith('# ') && courseName === 'Untitled Course') {
        courseName = line.substring(2).trim();
        continue;
      }

      // Chapter starts with ##
      if (line.startsWith('## ')) {
        if (currentChapter) {
          chapters.push(currentChapter);
        }
        currentChapter = {
          title: line.substring(3).trim(),
          content: ''
        };
      } else if (currentChapter) {
        currentChapter.content += line + '\n';
      } else if (!courseDescription || courseDescription === 'Course description not available.') {
        // Capture first paragraph as description
        if (line.trim() && !line.startsWith('#')) {
          courseDescription = line.trim();
        }
      }
    }

    if (currentChapter) {
      chapters.push(currentChapter);
    }

    return {
      courseName,
      courseDescription,
      chapters
    };
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