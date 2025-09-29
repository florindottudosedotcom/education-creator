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