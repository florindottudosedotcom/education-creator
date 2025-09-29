# Product Requirements Document: Emotions for Engineers

## 1. Project Overview

### 1.1 Platform Description
**Emotions for Engineers** is a comprehensive Universal Course Platform that combines AI-powered content creation with automated publishing capabilities. The platform serves dual purposes:

1. **AI Creator Hub**: Modern browser-based tools for generating courses and presentations using various AI providers
2. **MkDocs Publishing Platform**: Automatically builds and deploys multi-language course websites from Markdown content

### 1.2 Core Value Proposition
- **End-to-End Workflow**: Complete lifecycle management from AI-generated content creation to published course websites
- **Multi-Provider AI Integration**: Support for cloud, browser-based, and local AI models
- **Professional Output**: Production-ready courses with multi-language support and modern web presentation
- **Zero-Config Publishing**: Automated deployment to GitHub Pages with professional theming

### 1.3 Target Users
- **Educators and Trainers**: Creating structured learning content
- **Content Creators**: Generating educational materials and presentations
- **Organizations**: Developing training programs and documentation
- **Technical Writers**: Creating comprehensive guides and tutorials

---

## 2. AI Creator Hub - Main Interface

### 2.1 Application Entry Point (`index.html`)
**Purpose**: Central launcher for all creation tools

#### UI Elements:
- **Page Title**: "AI Creator Hub" with gear icon
- **Description**: "Create courses and presentations using AI. Choose what you want to create:"

#### Primary Actions:
1. **Course Creator Button**
   - **Icon**: 📖 book-open (Lucide)
   - **Label**: "Course Creator"
   - **Description**: "Generate complete multi-chapter courses"
   - **Action**: Navigates to `course.html`

2. **Slides Creator Button**
   - **Icon**: 📊 presentation (Lucide)
   - **Label**: "Slides Creator"
   - **Description**: "Create beautiful AI-powered presentations"
   - **Action**: Navigates to `slides.html`

#### Information Section:
**AI Providers Available** - Preview cards for:
1. **OpenRouter**
   - **Icon**: 🌐 globe (Lucide)
   - **Description**: "Professional cloud AI with 200+ models (GPT-4o, Claude, Gemini). Transparent pricing and usage analytics."

2. **WebLLM**
   - **Icon**: 🖥️ cpu (Lucide)
   - **Description**: "Run AI models directly in your browser. 100% private, no server required, completely free."

3. **Ollama**
   - **Icon**: 🖥️ server (Lucide)
   - **Description**: "Connect to your local Ollama server. Complete privacy and control, unlimited usage."

---

## 3. Course Creator Workflow

### 3.1 Provider Selection Interface (`course.html`)
**Purpose**: AI provider selection and course creation container

#### Navigation Elements:
- **Back Button**: "← Back to Creator Hub" (returns to index.html)

#### Provider Tabs:
1. **OpenRouter Tab**
   - **Icon**: 🌐 globe (Lucide)
   - **Label**: "OpenRouter"
   - **Loads**: `openrouter.html` in iframe

2. **WebLLM Tab**
   - **Icon**: 🖥️ cpu (Lucide)
   - **Label**: "WebLLM"
   - **Loads**: `webllm.html` in iframe

3. **Ollama Tab**
   - **Icon**: 🖥️ server (Lucide)
   - **Label**: "Ollama"
   - **Loads**: `ollama.html` in iframe

#### Functionality:
- **Persistent Selection**: Remembers last used provider in localStorage
- **Dynamic Loading**: Iframe-based content loading with auto-resize
- **Responsive Design**: Stacked layout on mobile devices

### 3.2 OpenRouter Provider Interface (`openrouter.html`)

#### 3.2.1 Authentication Section
**Provider Information Display**:
- **Title**: "OpenRouter Provider"
- **Description**: "Professional cloud AI with 200+ models and transparent billing"

**API Key Configuration**:
- **API Key Input Field**
  - **Placeholder**: "Enter your OpenRouter API key"
  - **Type**: Password (hidden input)
  - **Required**: Yes for functionality

**Model Selection Dropdown**:
- **Default**: "GPT-4o (Balanced performance & speed)"
- **Options Include**:
  - GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
  - Claude 3.5 Sonnet, Claude 3 Opus
  - Gemini Pro, Gemini Flash
  - Llama models, Mistral models

**Action Buttons**:
- **Connect Button**: "🔗 Connect to OpenRouter"
- **Disconnect Button**: "❌ Disconnect" (when connected)

#### 3.2.2 Course Generation Section
**Header**:
- **Title**: "Course Generation"
- **Description**: "Describe your course and let AI create the structure"

**Prompt Enhancement**:
- **Enhance Prompt Button**
  - **Icon**: ✨ sparkles (Lucide)
  - **Label**: "Enhance Prompt"
  - **Tooltip**: "Enhance and expand your prompt with AI assistance"

**Content Input**:
- **Master Prompt Textarea**
  - **Placeholder**: "Course Prompt - e.g., 'Create a comprehensive course about the history of ancient Rome, from its founding to the fall of the Western Empire.'"
  - **Size**: Large textarea for detailed input

**Course Configuration**:
1. **Course Depth Dropdown**
   - **Outline**: 📋 clipboard-list (Lucide) - "50-100 words/chapter"
   - **Brief**: 📝 file-text (Lucide) - "200-400 words/chapter"
   - **Standard**: 📚 book (Lucide) - "500-800 words/chapter" (default)
   - **Detailed**: 📖 book-open (Lucide) - "1000-1500 words/chapter"
   - **Comprehensive**: 📚📚 library (Lucide) - "2000+ words/chapter"

2. **Number of Chapters Dropdown**
   - **Range**: 1-10 chapters
   - **Default**: 5 chapters

**Generation Actions**:
- **Generate Entire Course Button**
  - **Icon**: ⚡ zap (Lucide)
  - **Label**: "Generate Entire Course"
  - **Function**: AI-powered full course generation

**Status Display**:
- **Generation Status Area**: Shows progress, errors, and completion status

#### 3.2.3 Course Details Form
**Section Header**:
- **Title**: "Course Details"
- **Description**: "Basic information about your course"

**Form Fields**:
1. **Course Name Input**
   - **Label**: "Course Name"
   - **Placeholder**: "Course Name (Generated by AI)"
   - **Required**: Yes

2. **Course Description Textarea**
   - **Label**: "Course Description"
   - **Placeholder**: "Course Description - Brief overview for the main landing page (Generated by AI)"
   - **Required**: Yes

#### 3.2.4 Chapter Content Management
**Section Header**:
- **Title**: "Chapter Content"
- **Description**: "Edit and organize your course chapters"

**Interface Elements**:
- **Chapter Tabs Container**: Dynamic tabs for each chapter
- **Chapter Content Container**: Rich text editor for chapter content
- **Clear Form Button**
  - **Icon**: 🔄 rotate-ccw (Lucide)
  - **Label**: "Clear Form & Start New"
  - **Style**: Danger (red)
  - **Position**: Right-aligned

#### 3.2.5 Language Selection Section
**Purpose**: Multi-language content generation

**Supported Languages** (with flag icons):
- 🌟 **English** (featured/default)
- 🇩🇪 **German** (Deutsch)
- 🇫🇷 **French** (Français)
- 🇮🇳 **Hindi** (हिन्दी)
- 🇮🇹 **Italian** (Italiano)
- 🇯🇵 **Japanese** (日本語)
- 🇵🇹 **Portuguese** (Português)
- 🇷🇴 **Romanian** (Română)
- 🇷🇺 **Russian** (Русский)
- 🇪🇸 **Spanish** (Español)
- 🇨🇳 **Chinese** (中文)

**Selection Method**: Multi-select checkboxes for translation languages

#### 3.2.6 Generate & Download Section
**Section Header**:
- **Title**: "Generate & Download"
- **Description**: "Create and download your course files"

**Primary Action**:
- **Generate Course Files Button**
  - **Icon**: 📄 file-plus (Lucide)
  - **Label**: "Generate Course Files"
  - **Style**: Primary (large, prominent)

**Status Display**:
- **File Generation Status**: Progress and completion indicators

**Download Section**:
- **Section Title**: "Downloads"
- **Description**: "Your files have been generated. Download them below."
- **Download Button**
  - **Icon**: ⬇️ download (Lucide)
  - **Label**: "Download Course Files (.zip)"
  - **Style**: Primary (large)

#### 3.2.7 Modal Dialogs
**Overwrite Confirmation Modal**:
- **Title**: "Overwrite Existing Content?"
- **Message**: "There are chapters with content present. Do you want to remove them before generating new content?"
- **Actions**:
  - **Yes Button**: ✅ check (Lucide) "Yes, Overwrite"
  - **Cancel Button**: ❌ x (Lucide) "Cancel"

### 3.3 WebLLM Provider Interface (`webllm.html`)
**Similar structure to OpenRouter with specific differences**:

#### Provider-Specific Features:
- **Browser AI Information**: Explanation of local browser-based inference
- **Model Download Progress**: Progress bars for first-time model downloads
- **No API Key Required**: Direct browser-based execution
- **Privacy Emphasis**: "100% private, no server required"

**Model Loading Interface**:
- **Model Status Display**: Shows download progress for WebLLM models
- **Progress Bar**: Visual indication of model loading
- **First-Time Setup**: Guidance for initial model download

### 3.4 Ollama Provider Interface (`ollama.html`)
**Similar structure with local server integration**:

#### Provider-Specific Features:
- **Local Server Connection**: Connection to localhost:11434
- **Server Status Check**: Verification of Ollama service availability
- **Private Processing**: Emphasis on local, private AI processing
- **Setup Instructions**: Guidance for Ollama server configuration

---

## 4. Slides Creator Workflow

### 4.1 Slides Provider Selection (`slides.html`)
**Purpose**: AI provider selection for presentation creation

#### Navigation:
- **Back Button**: "← Back to Creator Hub"

#### Interface Header:
- **Title**: "🎨 AI Slides Creator"
- **Description**: "Create beautiful, AI-powered presentations with visual elements. Choose your preferred AI provider below:"

#### Provider Tabs:
1. **OpenRouter**: Cloud AI for presentations
2. **WebLLM**: Browser-based presentation generation
3. **Ollama**: Local AI for presentations

### 4.2 Slides WebLLM Interface (`slides_webllm.html`)

#### 4.2.1 Provider Information
**WebLLM Info Section**:
- **Title**: "🖥️ Browser AI (WebLLM)"
- **Description**: "AI models run directly in your browser for maximum privacy. First-time use requires downloading model files (~1-4GB)."
- **Model Loading Progress**: Progress bar for model downloads

#### 4.2.2 Presentation Generator
**Section Header**:
- **Title**: "Presentation Generator"
- **Description**: "Create visual presentations with browser-based AI"

**Content Input**:
- **Presentation Topic Textarea**
  - **Placeholder**: "Presentation Topic - e.g., 'The Future of Artificial Intelligence in Healthcare'"
  - **Required**: Yes

**Presentation Configuration**:
- **Number of Slides Dropdown**
  - **Options**: 1, 2, 3, 4, 5, 6, 8 (default), 10, 12, 15 slides
  - **Default**: 8 slides

**Generation Action**:
- **Generate Presentation Button**
  - **Icon**: ⚡ zap (Lucide)
  - **Label**: "Generate Presentation"

#### 4.2.3 Visual Editor
**Section Header**:
- **Title**: "Visual Editor"
- **Description**: "Edit your slides with visual tools"

**Editor Container**:
- **Konva Editor Integration**: Advanced visual editing canvas
- **Slide Editing Tools**: Text, shapes, images, formatting options
- **Accordion Interface**: Collapsible tool panels

#### 4.2.4 Export Options
**Section Header**:
- **Title**: "Export & Download"
- **Description**: "Export your presentation with automatic translation to selected languages"

**Export Buttons**:
1. **Export as PDF**
   - **Icon**: 📄 "⟄ Export as PDF"
   - **Style**: Primary

2. **Export as PowerPoint**
   - **Icon**: 📊 "⟐ Export as PowerPoint"
   - **Style**: Primary

3. **Export as HTML**
   - **Icon**: 🌐 "◰ Export as HTML"
   - **Style**: Secondary

4. **Export Data**
   - **Icon**: 📁 "{} Export Data"
   - **Style**: Outline
   - **Format**: JSON data export

**Status Display**:
- **Export Status Area**: Progress and completion indicators

---

## 5. Testing Interface

### 5.1 Functional Tests Page (`tests/functional-tests.html`)
**Purpose**: Comprehensive testing suite for all platform features

#### Test Interface:
- **Title**: "🧪 Creator Functionality Test Suite"
- **Description**: "Comprehensive tests to ensure all functionality is preserved after refactoring"

#### Control Buttons:
1. **Run All Tests**
   - **Icon**: ▶️ play (Lucide)
   - **Function**: Execute all test suites

2. **Reset Tests**
   - **Icon**: 🔄 refresh-cw (Lucide)
   - **Function**: Reset all test states

3. **Export Results**
   - **Icon**: 📋 clipboard (Lucide)
   - **Function**: Export test results

#### Test Suites:
1. **🎯 Core Application Tests**
   - Application load
   - DOM elements presence
   - Theme manager initialization

2. **📚 Course Creator Tests**
   - Course form elements
   - Chapter management
   - Tab navigation
   - Editor iframes
   - Language selection

3. **💾 State Management Tests**
   - State persistence
   - State recovery
   - Session storage

4. **🎨 Theme System Tests**
   - Theme detection
   - Theme switching
   - Theme persistence

5. **📁 File Operations Tests**
   - ZIP file generation
   - Download functionality

6. **📱 Responsive Design Tests**
   - Mobile layout
   - Tablet layout
   - Desktop layout

---

## 6. Technical Implementation

### 6.1 Architecture Overview
**Modular Component System**:
- ES6 modules with clean import/export patterns
- Provider-based architecture with pluggable AI integrations
- Component-based UI with reusable elements
- Local asset management for performance and security

### 6.2 Icon System
**Lucide Icons Implementation**:
- **Local Hosting**: `creator/assets/js/lucide/lucide.min.js` (559KB)
- **Security**: No external CDN dependencies for icons
- **Initialization**: `lucide.createIcons()` after DOM changes
- **Semantic Names**: All icons use meaningful semantic identifiers

**Icon Mappings**:
- ⚡ → `zap` (generate/action buttons)
- 🔄 → `refresh-cw` (loading/refresh states)
- ✨ → `sparkles` (enhance/AI features)
- 📋 → `clipboard-list` (outline content)
- 📝 → `file-text` (brief content)
- 📚 → `book` (standard content)
- 📖 → `book-open` (detailed content)
- 📚📚 → `library` (comprehensive content)
- ⭐ → `star` (featured/primary items)
- ✅ → `check` (confirm actions)
- ❌ → `x` (cancel actions)
- 🔄 → `rotate-ccw` (reset/clear actions)
- 📄 → `file-plus` (create/generate files)
- ⬇️ → `download` (download actions)

### 6.3 Content Security Policy
**Security Headers**:
- Strict CSP policies for enhanced security
- Selective external domain allowlist
- Local asset prioritization
- Provider-specific CDN permissions where necessary

### 6.4 State Management
**Persistence Strategy**:
- localStorage for user preferences
- Session storage for temporary data
- Provider selection persistence
- Multi-language settings retention

### 6.5 Responsive Design
**Breakpoint Strategy**:
- Mobile-first approach with progressive enhancement
- Flexible grid systems
- Touch-friendly interface elements (44px minimum)
- Adaptive iframe resizing

### 6.6 Multi-Language Support
**Translation Architecture**:
- File naming convention: `filename.{lang}.md`
- MkDocs i18n plugin integration
- Automatic navigation generation per language
- AI-powered content translation

---

## 7. AI Provider Integration

### 7.1 Provider Interface Pattern
**Standardized Provider API**:
```javascript
class AIProvider {
    constructor(config)
    async generateContent(prompt, options)
    validateConfiguration()
    getTemplate()
}
```

### 7.2 OpenRouter Integration
**Features**:
- API key authentication
- 200+ model selection
- Real-time usage tracking
- Transparent pricing
- Professional cloud models (GPT-4o, Claude 3.5, Gemini Pro)

### 7.3 WebLLM Integration
**Features**:
- Browser-based inference
- No server requirements
- Complete privacy
- Model download management
- Progress tracking for initial setup

### 7.4 Ollama Integration
**Features**:
- Local server connection (localhost:11434)
- Private processing
- Unlimited usage
- Custom model support
- Server status monitoring

---

## 8. Content Generation Workflow

### 8.1 Course Creation Process
1. **Provider Selection**: Choose AI provider
2. **Authentication**: Configure API keys or connections
3. **Prompt Input**: Describe course requirements
4. **Configuration**: Set depth, chapters, languages
5. **Generation**: AI creates course structure and content
6. **Editing**: Manual refinement and customization
7. **Export**: Package as downloadable ZIP file
8. **Publishing**: Upload to MkDocs platform

### 8.2 Presentation Creation Process
1. **Provider Selection**: Choose AI provider for slides
2. **Topic Input**: Describe presentation subject
3. **Configuration**: Set slide count and format
4. **Generation**: AI creates slide content
5. **Visual Editing**: Use Konva editor for customization
6. **Export**: Multiple format options (PDF, PPTX, HTML, JSON)

### 8.3 Content Export Formats
**Course Exports**:
- **ZIP Package**: Complete MkDocs-compatible structure
- **Multi-Language**: Automatic translation to selected languages
- **Markdown Files**: Industry-standard format
- **Asset Management**: Images, CSS, and configuration files

**Presentation Exports**:
- **PDF**: Print-ready format
- **PowerPoint (PPTX)**: Editable presentation format
- **HTML**: Web-compatible slides
- **JSON**: Raw data for custom processing

---

## 9. User Experience Design

### 9.1 Design Principles
- **Minimal Cognitive Load**: Clear, focused interfaces
- **Progressive Disclosure**: Advanced features available but not overwhelming
- **Consistent Iconography**: Semantic Lucide icons throughout
- **Responsive Layout**: Works on all device sizes
- **Accessibility First**: WCAG compliance and keyboard navigation

### 9.2 Navigation Patterns
- **Hub-and-Spoke**: Central launcher with specialized tools
- **Breadcrumb Navigation**: Clear path back to main interfaces
- **Provider Switching**: Seamless transitions between AI providers
- **State Persistence**: Remembers user preferences and selections

### 9.3 Status Communication
- **Real-Time Feedback**: Progress indicators during generation
- **Error Handling**: Clear, actionable error messages
- **Success States**: Confirmation of completed actions
- **Loading States**: Visual feedback during processing

---

## 10. Performance & Optimization

### 10.1 Asset Management
- **Local Icons**: 559KB Lucide library hosted locally
- **CSS Architecture**: Modular, dependency-ordered stylesheets
- **Lazy Loading**: Dynamic imports for heavy components
- **Iframe Optimization**: Auto-resizing for optimal content display

### 10.2 Caching Strategy
- **Browser Caching**: Leverage browser cache for static assets
- **State Persistence**: localStorage for user preferences
- **Model Caching**: WebLLM model persistence across sessions

### 10.3 Bundle Optimization
- **Minimal Dependencies**: Only essential external libraries
- **Component Splitting**: Load functionality on demand
- **CSS Efficiency**: Utility-first approach with minimal redundancy

---

## 11. Deployment & Publishing

### 11.1 GitHub Pages Integration
- **Automated Deployment**: GitHub Actions workflow
- **Branch Protection**: Deployment from main branch
- **Multi-Language Sites**: Automatic language detection and routing

### 11.2 Development Workflow
- **Local Development**: Script-based local server setup
- **Hot Reload**: MkDocs live-reloading for content preview
- **Provider Testing**: Local testing environment for all AI providers

### 11.3 Content Management
- **Version Control**: Git-based content versioning
- **Course Organization**: Structured directory hierarchy
- **Asset Management**: Centralized media and resource handling

---

## 12. System Requirements

### 12.1 Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript**: ES6+ module support required
- **CSS**: Grid and Flexbox support
- **Storage**: localStorage and sessionStorage

### 12.2 Network Requirements
**For OpenRouter**:
- Internet connection for API access
- API key from OpenRouter.ai

**For WebLLM**:
- Initial model download (1-4GB)
- Subsequent use offline capable

**For Ollama**:
- Local network access to Ollama server
- Ollama service running on localhost:11434

### 12.3 Local Development
- **Python 3.8+**: For MkDocs development server
- **Node.js**: For screenshot automation tools
- **Git**: For version control and deployment

---

## 13. Success Metrics

### 13.1 User Engagement
- Course creation completion rates
- Provider adoption patterns
- Multi-language usage statistics
- Export format preferences

### 13.2 Technical Performance
- Page load times
- AI generation speed
- Error rates by provider
- Mobile usage patterns

### 13.3 Content Quality
- Course structure completeness
- User editing frequency
- Export success rates
- Published course metrics

---

## Conclusion

The Emotions for Engineers platform represents a comprehensive solution for AI-powered educational content creation and publishing. With its dual architecture combining an intuitive AI Creator Hub with automated publishing capabilities, it provides a complete workflow from ideation to professional publication.

The platform's strength lies in its:
- **Flexible AI Integration**: Support for multiple AI providers catering to different user needs
- **Professional Output**: Production-ready courses with modern web presentation
- **User-Centric Design**: Intuitive interfaces with comprehensive functionality
- **Technical Excellence**: Modern web standards with security and performance optimization

This PRD serves as the definitive guide to the platform's current capabilities and implementation details, providing a foundation for future development and enhancement.