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
    /* syntax-modal.css - Beautiful modal styles with nature-inspired palette */

/* Import fonts for better typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Main Modal Container */
.syntax-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483647;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.syntax-modal.visible {
  opacity: 1;
  visibility: visible;
}

/* Modal Content Card */
.syntax-modal-content {
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  max-height: calc(100vh - 2rem);
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  transform: translateY(20px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: modalSlideIn 0.3s ease forwards;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Modal Header with Gradient */
.syntax-modal-header {
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, var(--lime-cream, #d9ed92) 0%, var(--light-green, #b5e48c) 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.syntax-modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--yale-blue, #184e77);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.syntax-modal-header h2::before {
  content: '🔍';
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Close Button */
.syntax-modal-close {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: var(--yale-blue, #184e77);
  font-size: 1.75rem;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.2s ease;
  line-height: 1;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.syntax-modal-close:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: rotate(90deg);
}

/* Modal Body */
.syntax-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  flex: 1;
}

/* Modal Footer */
.syntax-modal-footer {
  padding: 1rem 1.5rem;
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

/* Cancel Button */
.syntax-modal-cancel {
  padding: 0.625rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--ocean-mist, #52b69a) 0%, var(--tropical-teal, #34a0a4) 100%);
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  letter-spacing: 0.01em;
}

.syntax-modal-cancel:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, var(--tropical-teal, #34a0a4) 0%, var(--bondi-blue, #168aad) 100%);
}

.syntax-modal-cancel:active {
  transform: translateY(0);
}

/* Syntax Analysis Container */
.syntax-analysis {
  font-size: 0.95rem;
  animation: contentFadeIn 0.5s ease;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header with Full Translation */
.syntax-header {
  margin-bottom: 1.5rem;
}

.full-translation {
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 16px;
  border-left: 4px solid var(--tropical-teal, #34a0a4);
  color: var(--baltic-blue, #1e6091);
  font-style: italic;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 1.1rem;
  line-height: 1.5;
  position: relative;
  background: linear-gradient(to right, white, #f8fafc);
}

.full-translation::before {
  content: '📖';
  margin-right: 0.75rem;
  opacity: 0.8;
}

/* Word Grid */
.syntax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

/* Word Card */
.syntax-word-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.syntax-word-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--lime-cream, #d9ed92), var(--tropical-teal, #34a0a4));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.syntax-word-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.syntax-word-card:hover::before {
  opacity: 1;
}

/* Main Word Display */
.word-main {
  font-size: 2rem;
  font-weight: 700;
  color: var(--yale-blue, #184e77);
  text-align: center;
  margin-bottom: 0.25rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Transliteration */
.word-translit {
  font-size: 0.9rem;
  color: var(--baltic-blue, #1e6091);
  text-align: center;
  font-style: italic;
  border-bottom: 1px dashed var(--ocean-mist, #52b69a);
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 400;
  opacity: 0.9;
}

/* Details Container */
.word-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

/* Detail Items with Color Coding */
.detail-item {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.detail-item:hover {
  transform: scale(1.05);
}

/* Translation - Emerald Theme */
.detail-item.translation {
  background: linear-gradient(135deg, var(--emerald, #76c893), var(--ocean-mist, #52b69a));
  color: white;
  box-shadow: 0 2px 4px rgba(82, 182, 154, 0.3);
}

/* Part of Speech - Lime Theme */
.detail-item.pos {
  background: linear-gradient(135deg, var(--lime-cream, #d9ed92), var(--light-green-2, #99d98c));
  color: var(--yale-blue, #184e77);
}

/* Syntax Role - Teal Theme */
.detail-item.role {
  background: linear-gradient(135deg, var(--tropical-teal, #34a0a4), var(--bondi-blue, #168aad));
  color: white;
}

/* Particle - Cerulean Theme */
.detail-item.particle {
  background: linear-gradient(135deg, var(--cerulean, #1a759f), var(--baltic-blue, #1e6091));
  color: white;
}

/* Verb Form - Blue Theme */
.detail-item.verb {
  background: linear-gradient(135deg, var(--bondi-blue, #168aad), var(--yale-blue, #184e77));
  color: white;
}

/* Honorific - Purple Accent (complementary) */
.detail-item.honorific {
  background: linear-gradient(135deg, #9d65c9, #7b4b9a);
  color: white;
}

/* Semantic Category - Mint Theme */
.detail-item.semantic {
  background: linear-gradient(135deg, var(--light-green, #b5e48c), var(--emerald, #76c893));
  color: var(--yale-blue, #184e77);
}

/* Gender - Soft Pink */
.detail-item.gender {
  background: linear-gradient(135deg, #f9c7d3, #f3a5b7);
  color: #9b2c4d;
}

/* Number - Light Blue */
.detail-item.number {
  background: linear-gradient(135deg, #b8e1ff, #8ac4ff);
  color: #003f5c;
}

/* Grammatical Case - Peach */
.detail-item.case {
  background: linear-gradient(135deg, #ffd5b5, #ffb68b);
  color: #a5542c;
}

/* Tense - Lavender */
.detail-item.tense {
  background: linear-gradient(135deg, #e0c9ff, #c7aaff);
  color: #4a1d6d;
}

/* Aspect - Mint */
.detail-item.aspect {
  background: linear-gradient(135deg, #c1f2e0, #a0e6cc);
  color: #166b54;
}

/* Person - Coral */
.detail-item.person {
  background: linear-gradient(135deg, #ffb6b6, #ff9494);
  color: #a13333;
}

/* POS Tag - Light Gray */
.detail-item.pos-tag {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
  color: #2d3748;
}

/* Definite - Gold */
.detail-item.definite {
  background: linear-gradient(135deg, #fed7aa, #fdb47e);
  color: #92400e;
}

/* Language-specific font families */
.syntax-analysis.arabic .word-main {
  font-family: 'Amiri', 'Traditional Arabic', 'Noto Naskh Arabic', serif;
  font-size: 2.2rem;
}

.syntax-analysis.japanese .word-main {
  font-family: 'Hiragino Sans', 'Meiryo', 'MS Gothic', sans-serif;
}

.syntax-analysis.chinese .word-main {
  font-family: 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.syntax-analysis.korean .word-main {
  font-family: 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
}

.syntax-analysis.russian .word-main {
  font-family: 'Noto Sans', 'Segoe UI', 'Arial', sans-serif;
}

.syntax-analysis.hindi .word-main {
  font-family: 'Noto Sans Devanagari', 'Nirmala UI', 'Mangal', sans-serif;
}

/* Loading State */
.syntax-loading {
  text-align: center;
  padding: 3rem;
  color: var(--baltic-blue, #1e6091);
}

.syntax-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(82, 182, 154, 0.1);
  border-top: 3px solid var(--tropical-teal, #34a0a4);
  border-right: 3px solid var(--ocean-mist, #52b69a);
  border-bottom: 3px solid var(--emerald, #76c893);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.syntax-loading p {
  font-size: 1.1rem;
  font-weight: 500;
  background: linear-gradient(135deg, var(--yale-blue, #184e77), var(--tropical-teal, #34a0a4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 1.5s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Error State */
.syntax-error {
  text-align: center;
  padding: 3rem;
  color: #ef4444;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.syntax-error p {
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 400px;
  margin: 0 auto;
}

/* Scrollbar Styling */
.syntax-modal-body::-webkit-scrollbar {
  width: 8px;
}

.syntax-modal-body::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.syntax-modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--ocean-mist, #52b69a), var(--tropical-teal, #34a0a4));
  border-radius: 4px;
}

.syntax-modal-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, var(--tropical-teal, #34a0a4), var(--bondi-blue, #168aad));
}

/* Responsive Design */
@media (max-width: 768px) {
  .syntax-modal-content {
    max-width: 95%;
    border-radius: 20px;
  }
  
  .syntax-modal-header {
    padding: 1rem 1.25rem;
  }
  
  .syntax-modal-header h2 {
    font-size: 1.25rem;
  }
  
  .syntax-modal-body {
    padding: 1rem;
  }
  
  .syntax-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .syntax-word-card {
    padding: 1rem;
  }
  
  .word-main {
    font-size: 1.75rem;
  }
  
  .full-translation {
    font-size: 1rem;
    padding: 0.875rem 1rem;
  }
}

@media (max-width: 480px) {
  .syntax-modal-content {
    max-height: 95vh;
  }
  
  .syntax-modal-header {
    padding: 0.875rem 1rem;
  }
  
  .syntax-modal-header h2 {
    font-size: 1.1rem;
  }
  
  .syntax-modal-close {
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
  }
  
  .syntax-modal-footer {
    padding: 0.875rem 1rem;
  }
  
  .syntax-modal-cancel {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
  }
  
  .word-details {
    gap: 0.375rem;
  }
  
  .detail-item {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
}

/* Print Styles */
@media print {
  .syntax-modal {
    position: absolute;
    background: none;
    backdrop-filter: none;
  }
  
  .syntax-modal-content {
    box-shadow: none;
    border: 1px solid #ddd;
  }
  
  .syntax-modal-header {
    background: #f5f5f5;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  
  .detail-item {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .syntax-modal-content {
    background: #1a1e2b;
  }
  
  .syntax-modal-body {
    background: linear-gradient(135deg, #1e2434, #161b28);
  }
  
  .syntax-modal-footer {
    background: #1a1e2b;
    border-top-color: #2d3349;
  }
  
  .full-translation {
    background: #242a3a;
    color: #b8e1ff;
    border-left-color: var(--tropical-teal, #34a0a4);
  }
  
  .syntax-word-card {
    background: #242a3a;
    border-color: #2d3349;
  }
  
  .word-main {
    color: var(--lime-cream, #d9ed92);
  }
  
  .word-translit {
    color: #a0b3d9;
    border-bottom-color: #2d3349;
  }
}`
    
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