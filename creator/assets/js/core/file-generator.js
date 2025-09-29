/**
 * File Generator
 * Creates ZIP archives with course content
 */

export class FileGenerator {
  constructor() {
    this.zip = null;
  }

  /**
   * Generate ZIP file from course data
   * @param {Object} fileStructure - File paths and contents
   * @param {string} courseName - Course name for filename
   * @returns {Promise<Blob>} ZIP file blob
   */
  async generateZip(fileStructure, courseName) {
    // Dynamically import JSZip
    const JSZip = (await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm')).default;
    this.zip = new JSZip();

    // Add all files to ZIP
    for (const [path, content] of Object.entries(fileStructure)) {
      this.zip.file(path, content);
    }

    // Generate ZIP blob
    const blob = await this.zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    return blob;
  }

  /**
   * Trigger download of ZIP file
   * @param {Blob} blob - ZIP file blob
   * @param {string} filename - Download filename
   */
  downloadZip(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.sanitizeFilename(filename)}.zip`;
    link.click();

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  /**
   * Sanitize filename for safe downloads
   * @private
   */
  sanitizeFilename(filename) {
    return filename
      .replace(/[^a-z0-9_\-]/gi, '_')
      .replace(/_+/g, '_')
      .toLowerCase();
  }
}