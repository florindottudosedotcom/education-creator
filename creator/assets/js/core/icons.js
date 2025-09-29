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