// SyntaxRenderer.js - Renders the analysis data for different languages

export class SyntaxRenderer {
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