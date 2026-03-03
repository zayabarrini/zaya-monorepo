// SyntaxAnalysis.js - Main syntax analysis module

import { detectSyntaxLanguage } from '../lib/languagePatternsSyntax.js';
import { SyntaxModal } from './SyntaxModal.js';
import { SyntaxRenderer } from './SyntaxRenderer.js';

export class SyntaxAnalysis {
  constructor() {
    this.apiBaseUrl = 'https://transliteration-two.vercel.app';
    this.modal = new SyntaxModal();
    this.renderer = new SyntaxRenderer();
    this.isEnabled = true;
    this.currentSelection = null;
    
    console.log('🔧 [SyntaxAnalysis] Constructor called, isEnabled:', this.isEnabled);
    
    // Bind methods
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    // this.analyzeSelection = this.analyzeSelection.bind(this);
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
    
    const url = `${this.apiBaseUrl}${endpoints[languageCode]}`;
    console.log('🔧 [SyntaxAnalysis] API URL for', languageCode, ':', url);
    return url;
  }

  async analyzeSelection(text, languageInfo) {
    console.log('🔧 [SyntaxAnalysis] analyzeSelection called, isEnabled:', this.isEnabled);
    console.log('🔧 [SyntaxAnalysis] Text:', text ? text.substring(0, 50) : '(empty)');
    
    if (!this.isEnabled) {
      console.log('🔧 [SyntaxAnalysis] Analysis disabled, returning');
      return;
    }
    
    // Ignore very short selections
    if (!text || text.length < 2) {
      console.log('🔧 [SyntaxAnalysis] Text too short, ignoring');
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
      const detected = detectSyntaxLanguage(text);
      console.log('🔧 [SyntaxAnalysis] Detection result:', detected);
      
      if (!detected || detected.confidence < 0.3) {
        console.log('❌ Could not detect language with sufficient confidence');
        return;
      }
      languageCode = detected.code;
      languageName = detected.name;
    }
    
    console.log(`🔍 Analyzing ${languageName} text:`, text.substring(0, 50));
    
    try {
      console.log('🔧 [SyntaxAnalysis] Showing loading modal');
      this.modal.showLoading({ name: languageName, code: languageCode });
      
      const apiUrl = this.getApiUrl(languageCode);
      console.log('🔧 [SyntaxAnalysis] Fetching from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });
      
      console.log('🔧 [SyntaxAnalysis] Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText} (${response.status})`);
      }
      
      const data = await response.json();
      console.log('🔧 [SyntaxAnalysis] Response data received, success:', data.success);
      
      if (data.success) {
        const rendered = this.renderer.render(data, languageCode);
        console.log('🔧 [SyntaxAnalysis] Rendered content length:', rendered.length);
        this.modal.show(text, languageCode, rendered);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
      
    } catch (error) {
      console.error('❌ Syntax analysis error:', error);
      this.modal.showError(`Failed to analyze: ${error.message}`);
    }
  }

  destroy() {
    console.log('🔧 [SyntaxAnalysis] destroy called');
    this.modal.destroy();
  }
}