// SyntaxAnalysis.js - Main syntax analysis module with integrated Modal, Renderer, and Language Detection

// Import language patterns from lib
import languagePatterns from '../lib/languagePatterns.js';

// ==================== LANGUAGE DETECTION ====================

/**
 * Detect language from text using language patterns
 * @param {string} text - Text to detect language for
 * @returns {Object|null} Detected language info or null
 */
function detectSyntaxLanguage(text) {
  // Guard clauses
  if (!text || typeof text !== 'string' || text.length < 2) return null;
  
  // Ensure languagePatterns exists and is an object
  if (!languagePatterns || typeof languagePatterns !== 'object') {
    console.error('❌ languagePatterns is not available');
    return null;
  }
  
  const scores = {};
  
  // Get only the language codes (filter out any non-language properties)
  try {
    const languageCodes = Object.keys(languagePatterns).filter(
      key => typeof languagePatterns[key] === 'object' && 
             languagePatterns[key] !== null &&
             languagePatterns[key].patterns &&
             Array.isArray(languagePatterns[key].patterns)
    );
    
    if (!languageCodes || languageCodes.length === 0) {
      console.error('❌ No language patterns found');
      return null;
    }
    
    for (const code of languageCodes) {
      const config = languagePatterns[code];
      
      if (!config || !config.patterns || !Array.isArray(config.patterns)) {
        continue;
      }
      
      let score = 0;
      for (const pattern of config.patterns) {
        if (!pattern) continue;
        
        try {
          const matches = text.match(pattern);
          if (matches) {
            score += matches.length * (config.weight || 1.0);
          }
        } catch (regexError) {
          // Silently ignore regex errors
        }
      }
      
      if (score > 0) {
        scores[code] = {
          code,
          name: config.name,
          weight: config.weight || 1.0,
          script: config.script,
          rtl: config.rtl,
          score
        };
      }
    }
  } catch (error) {
    console.error('❌ Error during language detection:', error);
    return null;
  }
  
  // Return the language with highest score
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [code, data] of Object.entries(scores)) {
    if (data.score > highestScore) {
      highestScore = data.score;
      bestMatch = data;
    }
  }
  
  // Calculate confidence based on script type
  if (bestMatch) {
    // Different confidence calculation for CJK languages
    if (bestMatch.script === 'cjk') {
      // For CJK languages, each character can count as a match
      // So confidence can be higher
      bestMatch.confidence = Math.min(highestScore / (text.length * 2), 1);
    } else {
      // For other languages, use standard calculation
      bestMatch.confidence = Math.min(highestScore / text.length, 1);
    }
    return bestMatch;
  }
  
  return null;
}

// ==================== SYNTAX RENDERER ====================

class SyntaxRenderer {
  constructor() {
    this.renderers = {
      'ja': this.renderJapanese.bind(this),
      'zh': this.renderChinese.bind(this),
      'ko': this.renderKorean.bind(this),
      'ar': this.renderArabic.bind(this),
      'ru': this.renderRussian.bind(this),
      'hi': this.renderHindi.bind(this)
    };
  }

  render(analysis, language) {
    const renderer = this.renderers[language] || this.renderGeneric.bind(this);
    return renderer(analysis);
  }

  renderJapanese(analysis) {
    if (!analysis || !analysis.analysis) return '<div class="syntax-error">No analysis available</div>';
    
    const words = analysis.analysis;
    let html = '<div class="syntax-analysis japanese">';
    html += '<div class="syntax-header">';
    html += '<h3>日本語分析</h3>';
    if (analysis.full_translation) {
      html += `<div class="full-translation">📖 ${analysis.full_translation}</div>`;
    }
    html += '</div>';
    html += '<div class="syntax-grid">';
    
    words.forEach(word => {
      html += '<div class="syntax-word-card">';
      html += `<div class="word-main">${word.word}</div>`;
      if (word.transliteration) {
        html += `<div class="word-translit">${word.transliteration}</div>`;
      }
      html += '<div class="word-details">';
      if (word.translation) {
        html += `<span class="detail-item translation">📖 ${word.translation}</span>`;
      }
      if (word.part_of_speech && word.part_of_speech !== 'UNKNOWN') {
        html += `<span class="detail-item pos">🏷️ ${word.part_of_speech.toLowerCase()}</span>`;
      }
      if (word.syntax_role && word.syntax_role !== 'UNKNOWN') {
        html += `<span class="detail-item role">🔤 ${word.syntax_role.toLowerCase()}</span>`;
      }
      if (word.particle_type && word.particle_type !== 'NONE' && word.particle_type !== 'None') {
        html += `<span class="detail-item particle">⚡ ${word.particle_type.toLowerCase()}</span>`;
      }
      if (word.verb_form && word.verb_form !== 'NONE' && word.verb_form !== 'None') {
        html += `<span class="detail-item verb">🔄 ${word.verb_form.toLowerCase()}</span>`;
      }
      if (word.honorific_level && word.honorific_level !== 'PLAIN' && word.honorific_level !== 'NEUTRAL') {
        html += `<span class="detail-item honorific">👑 ${word.honorific_level.toLowerCase()}</span>`;
      }
      if (word.semantic_category && word.semantic_category !== 'GENERAL') {
        html += `<span class="detail-item semantic">📌 ${word.semantic_category.toLowerCase()}</span>`;
      }
      html += '</div>';
      html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderChinese(analysis) {
    if (!analysis || !analysis.analysis) return '<div class="syntax-error">No analysis available</div>';
    
    const words = analysis.analysis;
    let html = '<div class="syntax-analysis chinese">';
    html += '<div class="syntax-header">';
    html += '<h3>中文分析</h3>';
    if (analysis.full_translation) {
      html += `<div class="full-translation">📖 ${analysis.full_translation}</div>`;
    }
    html += '</div>';
    html += '<div class="syntax-grid">';
    
    words.forEach(word => {
      html += '<div class="syntax-word-card">';
      html += `<div class="word-main">${word.word}</div>`;
      if (word.transliteration) {
        html += `<div class="word-translit">${word.transliteration}</div>`;
      }
      html += '<div class="word-details">';
      if (word.translation) {
        html += `<span class="detail-item translation">📖 ${word.translation}</span>`;
      }
      if (word.part_of_speech && word.part_of_speech !== 'UNKNOWN') {
        html += `<span class="detail-item pos">🏷️ ${word.part_of_speech.toLowerCase()}</span>`;
      }
      if (word.syntax_role && word.syntax_role !== 'UNKNOWN') {
        html += `<span class="detail-item role">🔤 ${word.syntax_role.toLowerCase()}</span>`;
      }
      if (word.semantic_category && word.semantic_category !== 'GENERAL') {
        html += `<span class="detail-item semantic">📌 ${word.semantic_category.toLowerCase()}</span>`;
      }
      if (word.pos_tag) {
        html += `<span class="detail-item pos-tag">🔧 ${word.pos_tag}</span>`;
      }
      html += '</div>';
      html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderKorean(analysis) {
    if (!analysis || !analysis.analysis) return '<div class="syntax-error">No analysis available</div>';
    
    const words = analysis.analysis;
    let html = '<div class="syntax-analysis korean">';
    html += '<div class="syntax-header">';
    html += '<h3>한국어 분석</h3>';
    if (analysis.full_translation) {
      html += `<div class="full-translation">📖 ${analysis.full_translation}</div>`;
    }
    html += '</div>';
    html += '<div class="syntax-grid">';
    
    words.forEach(word => {
      html += '<div class="syntax-word-card">';
      html += `<div class="word-main">${word.word}</div>`;
      if (word.transliteration) {
        html += `<div class="word-translit">${word.transliteration}</div>`;
      }
      html += '<div class="word-details">';
      if (word.translation) {
        html += `<span class="detail-item translation">📖 ${word.translation}</span>`;
      }
      if (word.part_of_speech && word.part_of_speech !== 'UNKNOWN') {
        html += `<span class="detail-item pos">🏷️ ${word.part_of_speech.toLowerCase()}</span>`;
      }
      if (word.syntax_role && word.syntax_role !== 'UNKNOWN') {
        html += `<span class="detail-item role">🔤 ${word.syntax_role.toLowerCase()}</span>`;
      }
      if (word.particle_type && word.particle_type !== 'NONE') {
        html += `<span class="detail-item particle">⚡ ${word.particle_type.toLowerCase()}</span>`;
      }
      if (word.verb_form && word.verb_form !== 'NONE') {
        html += `<span class="detail-item verb">🔄 ${word.verb_form.toLowerCase()}</span>`;
      }
      if (word.honorific_level && word.honorific_level !== 'PLAIN') {
        html += `<span class="detail-item honorific">👑 ${word.honorific_level.toLowerCase()}</span>`;
      }
      if (word.semantic_category && word.semantic_category !== 'GENERAL') {
        html += `<span class="detail-item semantic">📌 ${word.semantic_category.toLowerCase()}</span>`;
      }
      html += '</div>';
      html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderArabic(analysis) {
    if (!analysis || !analysis.analysis) return '<div class="syntax-error">No analysis available</div>';
    
    const words = analysis.analysis;
    let html = '<div class="syntax-analysis arabic" dir="rtl">';
    html += '<div class="syntax-header">';
    html += '<h3>التحليل العربي</h3>';
    if (analysis.full_translation) {
      html += `<div class="full-translation">📖 ${analysis.full_translation}</div>`;
    }
    html += '</div>';
    html += '<div class="syntax-grid" dir="ltr">'; // Grid stays LTR for layout
    
    words.forEach(word => {
      html += '<div class="syntax-word-card">';
      html += `<div class="word-main" dir="rtl">${word.display || word.word}</div>`;
      if (word.transliteration) {
        html += `<div class="word-translit">${word.transliteration}</div>`;
      }
      html += '<div class="word-details">';
      if (word.translation) {
        html += `<span class="detail-item translation">📖 ${word.translation}</span>`;
      }
      if (word.part_of_speech && word.part_of_speech !== 'UNKNOWN') {
        html += `<span class="detail-item pos">🏷️ ${word.part_of_speech.toLowerCase()}</span>`;
      }
      if (word.syntax_role && word.syntax_role !== 'UNKNOWN') {
        html += `<span class="detail-item role">🔤 ${word.syntax_role.toLowerCase()}</span>`;
      }
      if (word.gender && word.gender !== 'UNKNOWN') {
        html += `<span class="detail-item gender">⚥ ${word.gender.toLowerCase()}</span>`;
      }
      if (word.number && word.number !== 'UNKNOWN') {
        html += `<span class="detail-item number">#️⃣ ${word.number.toLowerCase()}</span>`;
      }
      if (word.grammatical_case && word.grammatical_case !== 'UNKNOWN') {
        html += `<span class="detail-item case">📊 ${word.grammatical_case.toLowerCase()}</span>`;
      }
      if (word.definite && word.definite !== 'INDEFINITE') {
        html += `<span class="detail-item definite">🔒 ${word.definite.toLowerCase()}</span>`;
      }
      if (word.semantic_category && word.semantic_category !== 'GENERAL') {
        html += `<span class="detail-item semantic">📌 ${word.semantic_category.toLowerCase()}</span>`;
      }
      html += '</div>';
      html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderRussian(analysis) {
    if (!analysis || !analysis.analysis) return '<div class="syntax-error">No analysis available</div>';
    
    const words = analysis.analysis;
    let html = '<div class="syntax-analysis russian">';
    html += '<div class="syntax-header">';
    html += '<h3>Русский анализ</h3>';
    if (analysis.full_translation) {
      html += `<div class="full-translation">📖 ${analysis.full_translation}</div>`;
    }
    html += '</div>';
    html += '<div class="syntax-grid">';
    
    words.forEach(word => {
      html += '<div class="syntax-word-card">';
      html += `<div class="word-main">${word.word}</div>`;
      if (word.transliteration) {
        html += `<div class="word-translit">${word.transliteration}</div>`;
      }
      html += '<div class="word-details">';
      if (word.translation) {
        html += `<span class="detail-item translation">📖 ${word.translation}</span>`;
      }
      if (word.part_of_speech && word.part_of_speech !== 'UNKNOWN') {
        html += `<span class="detail-item pos">🏷️ ${word.part_of_speech.toLowerCase()}</span>`;
      }
      if (word.syntax_role && word.syntax_role !== 'UNKNOWN') {
        html += `<span class="detail-item role">🔤 ${word.syntax_role.toLowerCase()}</span>`;
      }
      if (word.gender && word.gender !== 'UNKNOWN') {
        html += `<span class="detail-item gender">⚥ ${word.gender.toLowerCase()}</span>`;
      }
      if (word.number && word.number !== 'UNKNOWN') {
        html += `<span class="detail-item number">#️⃣ ${word.number.toLowerCase()}</span>`;
      }
      if (word.grammatical_case && word.grammatical_case !== 'UNKNOWN') {
        html += `<span class="detail-item case">📊 ${word.grammatical_case.toLowerCase()}</span>`;
      }
      if (word.tense && word.tense !== 'UNKNOWN' && word.tense !== 'NONE') {
        html += `<span class="detail-item tense">⏰ ${word.tense.toLowerCase()}</span>`;
      }
      if (word.aspect && word.aspect !== 'UNKNOWN' && word.aspect !== 'NONE') {
        html += `<span class="detail-item aspect">🔄 ${word.aspect.toLowerCase()}</span>`;
      }
      if (word.person && word.person !== 'UNKNOWN' && word.person !== 'NONE') {
        html += `<span class="detail-item person">👤 ${word.person.toLowerCase()}</span>`;
      }
      if (word.semantic_category && word.semantic_category !== 'GENERAL') {
        html += `<span class="detail-item semantic">📌 ${word.semantic_category.toLowerCase()}</span>`;
      }
      html += '</div>';
      html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderHindi(analysis) {
    if (!analysis || !analysis.analysis) return '<div class="syntax-error">No analysis available</div>';
    
    const words = analysis.analysis;
    let html = '<div class="syntax-analysis hindi">';
    html += '<div class="syntax-header">';
    html += '<h3>हिन्दी विश्लेषण</h3>';
    if (analysis.full_translation) {
      html += `<div class="full-translation">📖 ${analysis.full_translation}</div>`;
    }
    html += '</div>';
    html += '<div class="syntax-grid">';
    
    words.forEach(word => {
      html += '<div class="syntax-word-card">';
      html += `<div class="word-main">${word.word}</div>`;
      if (word.transliteration) {
        html += `<div class="word-translit">${word.transliteration}</div>`;
      }
      html += '<div class="word-details">';
      if (word.translation) {
        html += `<span class="detail-item translation">📖 ${word.translation}</span>`;
      }
      if (word.part_of_speech && word.part_of_speech !== 'UNKNOWN') {
        html += `<span class="detail-item pos">🏷️ ${word.part_of_speech.toLowerCase()}</span>`;
      }
      if (word.syntax_role && word.syntax_role !== 'UNKNOWN') {
        html += `<span class="detail-item role">🔤 ${word.syntax_role.toLowerCase()}</span>`;
      }
      if (word.gender && word.gender !== 'UNKNOWN') {
        html += `<span class="detail-item gender">⚥ ${word.gender.toLowerCase()}</span>`;
      }
      if (word.number && word.number !== 'UNKNOWN') {
        html += `<span class="detail-item number">#️⃣ ${word.number.toLowerCase()}</span>`;
      }
      if (word.grammatical_case && word.grammatical_case !== 'UNKNOWN') {
        html += `<span class="detail-item case">📊 ${word.grammatical_case.toLowerCase()}</span>`;
      }
      if (word.tense && word.tense !== 'UNKNOWN' && word.tense !== 'NONE') {
        html += `<span class="detail-item tense">⏰ ${word.tense.toLowerCase()}</span>`;
      }
      if (word.person && word.person !== 'UNKNOWN' && word.person !== 'NONE') {
        html += `<span class="detail-item person">👤 ${word.person.toLowerCase()}</span>`;
      }
      if (word.semantic_category && word.semantic_category !== 'GENERAL') {
        html += `<span class="detail-item semantic">📌 ${word.semantic_category.toLowerCase()}</span>`;
      }
      html += '</div>';
      html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderGeneric(analysis) {
    return '<div class="syntax-error">Syntax analysis not available for this language</div>';
  }
}

// ==================== SYNTAX MODAL ====================

// ==================== SYNTAX MODAL ====================

class SyntaxModal {
  constructor() {
    this.modal = null;
    this.isVisible = false;
    this.currentText = '';
    this.currentLanguage = '';
    this.onCloseCallback = null;
    
    // Inject styles
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('syntax-modal-styles')) {
      return;
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = 'syntax-modal-styles';
    styleEl.textContent = `
      .syntax-modal {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-color: rgba(0, 0, 0, 0.5) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 2147483647 !important;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
      
      .syntax-modal.visible {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      
      .syntax-modal-content {
        background-color: white !important;
        border-radius: 8px !important;
        max-width: 90% !important;
        max-height: 90% !important;
        width: 800px !important;
        display: flex !important;
        flex-direction: column !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        position: relative !important;
        margin: auto !important;
        overflow: hidden !important;
      }
      
      .syntax-modal-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 16px 20px !important;
        border-bottom: 1px solid #e0e0e0 !important;
        background-color: #f8f9fa !important;
        border-radius: 8px 8px 0 0 !important;
      }
      
      .syntax-modal-header h2 {
        margin: 0 !important;
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        color: #333 !important;
      }
      
      .syntax-modal-close {
        background: none !important;
        border: none !important;
        font-size: 1.5rem !important;
        cursor: pointer !important;
        color: #666 !important;
        padding: 0 !important;
        width: 32px !important;
        height: 32px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 4px !important;
        line-height: 1 !important;
      }
      
      .syntax-modal-close:hover {
        background-color: #e9ecef !important;
      }
      
      .syntax-modal-body {
        padding: 20px !important;
        overflow-y: auto !important;
        max-height: calc(70vh - 120px) !important;
        background-color: white !important;
      }
      
      .syntax-modal-footer {
        padding: 16px 20px !important;
        border-top: 1px solid #e0e0e0 !important;
        display: flex !important;
        justify-content: flex-end !important;
        background-color: #f8f9fa !important;
        border-radius: 0 0 8px 8px !important;
      }
      
      .syntax-modal-cancel {
        padding: 8px 16px !important;
        background-color: #6c757d !important;
        color: white !important;
        border: none !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        font-size: 0.875rem !important;
      }
      
      .syntax-modal-cancel:hover {
        background-color: #5a6268 !important;
      }
      
      .syntax-loading {
        text-align: center !important;
        padding: 40px 20px !important;
        color: #666 !important;
      }
      
      .syntax-spinner {
        border: 3px solid #f3f3f3 !important;
        border-top: 3px solid #007bff !important;
        border-radius: 50% !important;
        width: 40px !important;
        height: 40px !important;
        animation: syntax-spin 1s linear infinite !important;
        margin: 0 auto 16px !important;
      }
      
      @keyframes syntax-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .syntax-error {
        text-align: center !important;
        padding: 40px 20px !important;
        color: #dc3545 !important;
      }
      
      .error-icon {
        font-size: 48px !important;
        margin-bottom: 16px !important;
      }
      
      /* Word card styles */
      .syntax-grid {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
        gap: 16px !important;
      }
      
      .syntax-word-card {
        border: 1px solid #dee2e6 !important;
        border-radius: 6px !important;
        padding: 12px !important;
        background-color: #f8f9fa !important;
      }
      
      .word-main {
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        margin-bottom: 4px !important;
        color: #212529 !important;
        text-align: center !important;
      }
      
      .word-translit {
        color: #6c757d !important;
        font-size: 0.9rem !important;
        margin-bottom: 8px !important;
        font-style: italic !important;
        text-align: center !important;
      }
      
      .word-details {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 8px !important;
        justify-content: center !important;
      }
      
      .detail-item {
        font-size: 0.75rem !important;
        padding: 2px 8px !important;
        background-color: white !important;
        border-radius: 12px !important;
        border: 1px solid #dee2e6 !important;
        color: #495057 !important;
      }
      
      .full-translation {
        margin-bottom: 16px !important;
        padding: 12px !important;
        background-color: #e7f3ff !important;
        border-radius: 6px !important;
        font-style: italic !important;
        color: #0056b3 !important;
        border-left: 4px solid #007bff !important;
      }
      
      /* RTL support for Arabic */
      .syntax-analysis.arabic {
        direction: rtl !important;
      }
      
      .syntax-analysis.arabic .syntax-grid {
        direction: ltr !important;
      }
    `;
    
    document.head.appendChild(styleEl);
    console.log('🔧 [SyntaxModal] styles injected');
  }

  createModal() {
    if (this.modal) return;

    this.modal = document.createElement('div');
    this.modal.className = 'syntax-modal';
    this.modal.innerHTML = `
      <div class="syntax-modal-content">
        <div class="syntax-modal-header">
          <h2>Syntax Analysis</h2>
          <button class="syntax-modal-close">&times;</button>
        </div>
        <div class="syntax-modal-body">
          <div class="syntax-loading">Loading analysis...</div>
        </div>
        <div class="syntax-modal-footer">
          <button class="syntax-modal-cancel">Close</button>
        </div>
      </div>
    `;

    // Add event listeners
    const closeBtn = this.modal.querySelector('.syntax-modal-close');
    const cancelBtn = this.modal.querySelector('.syntax-modal-cancel');
    
    closeBtn.addEventListener('click', () => this.hide());
    cancelBtn.addEventListener('click', () => this.hide());
    
    // Close on click outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // Escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });

    document.body.appendChild(this.modal);
  }

  ensureModal() {
    if (!this.modal) {
      this.createModal();
    }
    return this.modal;
  }

  show(text, language, content) {
    console.log('🔧 [SyntaxModal] show called', { 
      textLength: text?.length, 
      language, 
      contentLength: content?.length 
    });
    
    this.currentText = text;
    this.currentLanguage = language;
    
    this.ensureModal();
    
    // Reset any inline styles that might affect positioning
    this.modal.style.cssText = '';
    
    const body = this.modal.querySelector('.syntax-modal-body');
    if (body) {
      body.innerHTML = content;
    }
    
    // Add visible class
    this.modal.classList.add('visible');
    
    this.isVisible = true;
    
    // Force a reflow to ensure proper positioning
    this.modal.offsetHeight;
    
    // Log the state after showing
    setTimeout(() => {
      const rect = this.modal.getBoundingClientRect();
      console.log('🔧 [SyntaxModal] modal position:', {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        isInViewport: rect.top >= 0 && rect.left >= 0 && 
                      rect.bottom <= window.innerHeight && 
                      rect.right <= window.innerWidth
      });
      
      // Check if modal content is visible
      const contentRect = this.modal.querySelector('.syntax-modal-content')?.getBoundingClientRect();
      console.log('🔧 [SyntaxModal] content position:', contentRect);
    }, 100);
  }

  showLoading(languageInfo) {
    if (languageInfo) {
      this.currentLanguage = languageInfo.name || languageInfo.code;
    }
    
    this.ensureModal();
    
    // Reset any inline styles
    this.modal.style.cssText = '';
    
    this.modal.classList.add('visible');
    this.isVisible = true;
    
    const body = this.modal.querySelector('.syntax-modal-body');
    if (body) {
      body.innerHTML = `
        <div class="syntax-loading">
          <div class="syntax-spinner"></div>
          <p>Analyzing ${this.currentLanguage || ''} text...</p>
        </div>
      `;
    }
  }

  showError(message) {
    this.ensureModal();
    
    // Reset any inline styles
    this.modal.style.cssText = '';
    
    this.modal.classList.add('visible');
    this.isVisible = true;
    
    const body = this.modal.querySelector('.syntax-modal-body');
    if (body) {
      body.innerHTML = `
        <div class="syntax-error">
          <div class="error-icon">⚠️</div>
          <p>${message}</p>
        </div>
      `;
    }
  }

  hide() {
    if (this.modal) {
      this.modal.classList.remove('visible');
      this.isVisible = false;
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }
    }
  }

  setOnClose(callback) {
    this.onCloseCallback = callback;
  }

  destroy() {
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
      this.modal = null;
      this.isVisible = false;
    }
  }

  debugModal() {
    console.log('🔧 [SyntaxModal] DEBUG MODE');
    console.log('Modal exists:', !!this.modal);
    
    if (!this.modal) {
      this.createModal();
    }
    
    // Log all computed styles
    const styles = window.getComputedStyle(this.modal);
    const styleProps = [
      'position', 'top', 'left', 'right', 'bottom',
      'display', 'opacity', 'visibility', 'zIndex',
      'alignItems', 'justifyContent', 'pointerEvents'
    ];
    
    console.log('Modal computed styles:');
    styleProps.forEach(prop => {
      console.log(`  ${prop}: ${styles.getPropertyValue(prop)}`);
    });
    
    // Log DOM hierarchy
    console.log('Modal parent:', this.modal.parentNode?.tagName);
    console.log('Modal children:', this.modal.children.length);
    
    // Check position
    const rect = this.modal.getBoundingClientRect();
    console.log('Modal position:', rect);
    
    // Check if any parent has transform that might affect positioning
    let element = this.modal.parentNode;
    while (element && element !== document.body) {
      const transform = window.getComputedStyle(element).transform;
      if (transform && transform !== 'none') {
        console.log(`⚠️ Parent ${element.tagName} has transform:`, transform);
      }
      element = element.parentNode;
    }
  }
}

// ==================== MAIN SYNTAX ANALYSIS CLASS ====================

export class SyntaxAnalysis {
  constructor() {
    this.apiBaseUrl = 'https://transliteration-two.vercel.app';
    this.modal = new SyntaxModal();
    this.renderer = new SyntaxRenderer();
    this.isEnabled = true;
    this.currentSelection = null;
    
    console.log('🔧 [SyntaxAnalysis] Constructor called, isEnabled:', this.isEnabled);
  }

  setEnabled(enabled) {
    console.log('🔧 [SyntaxAnalysis] setEnabled called:', enabled, 'Current:', this.isEnabled);
    this.isEnabled = enabled;
    if (!enabled) {
      this.modal.hide();
    }
  }

  getApiUrl(languageCode) {
    const endpoints = {
      'zh': '/api/analyze/chinese',
      'ja': '/api/analyze/japanese',
      'ko': '/api/analyze/korean',
      'ar': '/api/analyze/arabic',
      'ru': '/api/analyze/russian',
      'hi': '/api/analyze/hindi',
      'th': '/api/analyze/thai'
    };
    
    // If no endpoint for this language, return null
    if (!endpoints[languageCode]) {
      return null;
    }
    
    const url = `${this.apiBaseUrl}${endpoints[languageCode]}`;
    console.log('🔧 [SyntaxAnalysis] API URL for', languageCode, ':', url);
    return url;
  }

// In SyntaxAnalysis.js - Update the analyzeSelection method

async analyzeSelection(text, languageInfo) {
  console.log('🔧 [SyntaxAnalysis] analyzeSelection called, isEnabled:', this.isEnabled);
  console.log('🔧 [SyntaxAnalysis] Text:', text ? text.substring(0, 50) : '(empty)');
  
  if (!this.isEnabled) {
    console.log('🔧 [SyntaxAnalysis] Analysis disabled, returning');
    return;
  }
  
  // Ignore very short selections
  if (!text || typeof text !== 'string' || text.length < 2) {
    console.log('🔧 [SyntaxAnalysis] Text too short or invalid, ignoring');
    return;
  }
  
  // Don't re-analyze the same text
  if (this.currentSelection === text) {
    console.log('🔧 [SyntaxAnalysis] Same text, ignoring');
    return;
  }
  this.currentSelection = text;
  
  // If languageInfo has code, use it, otherwise detect
  let languageCode = languageInfo?.code;
  let languageName = languageInfo?.name;
  
  if (!languageCode) {
    console.log('🔧 [SyntaxAnalysis] No language provided, detecting...');
    
    // Wrap detection in try-catch
    let detected;
    try {
      detected = detectSyntaxLanguage(text);
    } catch (detectError) {
      console.error('❌ Language detection threw error:', detectError);
      this.modal.showError(`Language detection failed: ${detectError.message}`);
      return;
    }
    
    console.log('🔧 [SyntaxAnalysis] Detection result:', detected);
    
    if (!detected || typeof detected !== 'object') {
      console.log('❌ Could not detect language');
      this.modal.showError('Could not detect language. Please select a language manually.');
      return;
    }
    
    // Different confidence thresholds for different language types
    let confidenceThreshold = 0.3;
    
    // For CJK languages, lower threshold because they naturally have lower scores
    if (detected.script === 'cjk') {
      confidenceThreshold = 0.1; // Lower threshold for CJK
      console.log(`🔧 [SyntaxAnalysis] CJK language detected, using lower threshold: ${confidenceThreshold}`);
    }
    
    if (detected.confidence < confidenceThreshold) {
      console.log(`❌ Low confidence detection: ${detected.confidence} (threshold: ${confidenceThreshold})`);
      console.warn(`⚠️ Low confidence for ${detected.name}, but proceeding anyway`);
    }
    
    languageCode = detected.code;
    languageName = detected.name;
  }
  
  console.log(`🔍 Analyzing ${languageName} text:`, text.substring(0, 50));
  
  try {
    console.log('🔧 [SyntaxAnalysis] Showing loading modal');
    this.modal.showLoading({ name: languageName, code: languageCode });
    
    // Get the endpoint for this language
    const endpoint = this.getApiEndpoint(languageCode);
    
    if (!endpoint) {
      throw new Error(`No API endpoint configured for language: ${languageName} (${languageCode})`);
    }
    
    console.log('🔧 [SyntaxAnalysis] Sending request via background proxy for:', endpoint);
    
    // Send message to background script instead of direct fetch
    chrome.runtime.sendMessage(
      {
        type: 'FETCH_FROM_API',
        endpoint: endpoint,
        method: 'POST',
        data: { text, target_language: 'en' },
        languageCode
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('🔧 [SyntaxAnalysis] Background proxy error:', chrome.runtime.lastError);
          this.modal.showError(`Failed to connect to extension background: ${chrome.runtime.lastError.message}`);
          return;
        }
        
        console.log('🔧 [SyntaxAnalysis] Background proxy response:', response);
        
        if (!response || !response.success) {
          const errorMsg = response?.error || 'Unknown error';
          this.modal.showError(`Analysis failed: ${errorMsg}`);
          return;
        }
        
        const data = response.data;
        
        if (data.success) {
          const rendered = this.renderer.render(data, languageCode);
          console.log('🔧 [SyntaxAnalysis] Rendered content length:', rendered.length);
          this.modal.show(text, languageCode, rendered);
        } else {
          this.modal.showError(data.error || 'Analysis failed');
        }
      }
    );
    
  } catch (error) {
    console.error('❌ Syntax analysis error:', error);
    this.modal.showError(`Failed to analyze: ${error.message}`);
  }
}

// Helper method to get API endpoint
getApiEndpoint(languageCode) {
  const endpoints = {
    'zh': '/api/analyze/chinese',
    'ja': '/api/analyze/japanese',
    'ko': '/api/analyze/korean',
    'ar': '/api/analyze/arabic',
    'ru': '/api/analyze/russian',
    'hi': '/api/analyze/hindi',
    'th': '/api/analyze/thai'
  };
  
  return endpoints[languageCode] || null;
}

  destroy() {
    console.log('🔧 [SyntaxAnalysis] destroy called');
    this.modal.destroy();
  }
}

// Export the detection function for external use if needed
export { detectSyntaxLanguage };