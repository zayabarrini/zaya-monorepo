// __tests__/SyntaxAnalysis.test.js
import { SyntaxAnalysis, detectSyntaxLanguage } from '../../src/content/SyntaxAnalysis.js';
import languagePatterns from '../../src/lib/languagePatterns.js';

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods to reduce noise
global.console.log = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Track failing tests
const failingLanguages = new Set();
const failedApiCalls = new Set();

// Mock successful API response for each language
const mockApiResponses = {
  es: {
    success: true,
    analysis: [
      { word: 'El', translation: 'The', part_of_speech: 'article' },
      { word: 'rápido', translation: 'fast', part_of_speech: 'adjective' },
      { word: 'zorro', translation: 'fox', part_of_speech: 'noun' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  fr: {
    success: true,
    analysis: [
      { word: 'Le', translation: 'The', part_of_speech: 'article' },
      { word: 'renard', translation: 'fox', part_of_speech: 'noun' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  de: {
    success: true,
    analysis: [
      { word: 'Der', translation: 'The', part_of_speech: 'article' },
      { word: 'schnelle', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  it: {
    success: true,
    analysis: [
      { word: 'La', translation: 'The', part_of_speech: 'article' },
      { word: 'veloce', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  pt: {
    success: true,
    analysis: [
      { word: 'A', translation: 'The', part_of_speech: 'article' },
      { word: 'rápida', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  nl: {
    success: true,
    analysis: [
      { word: 'De', translation: 'The', part_of_speech: 'article' },
      { word: 'snelle', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  sv: {
    success: true,
    analysis: [
      { word: 'Den', translation: 'The', part_of_speech: 'article' },
      { word: 'snabba', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  da: {
    success: true,
    analysis: [
      { word: 'Den', translation: 'The', part_of_speech: 'article' },
      { word: 'hurtige', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  no: {
    success: true,
    analysis: [
      { word: 'Den', translation: 'The', part_of_speech: 'article' },
      { word: 'raske', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  fi: {
    success: true,
    analysis: [
      { word: 'Nopea', translation: 'fast', part_of_speech: 'adjective' },
      { word: 'ruskea', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  pl: {
    success: true,
    analysis: [
      { word: 'Szybki', translation: 'fast', part_of_speech: 'adjective' },
      { word: 'brązowy', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  cs: {
    success: true,
    analysis: [
      { word: 'Rychlá', translation: 'fast', part_of_speech: 'adjective' },
      { word: 'hnědá', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  hu: {
    success: true,
    analysis: [
      { word: 'A', translation: 'The', part_of_speech: 'article' },
      { word: 'gyors', translation: 'fast', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  ro: {
    success: true,
    analysis: [
      { word: 'Vulpea', translation: 'fox', part_of_speech: 'noun' },
      { word: 'maro', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  tr: {
    success: true,
    analysis: [
      { word: 'Hızlı', translation: 'fast', part_of_speech: 'adjective' },
      { word: 'kahverengi', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  ru: {
    success: true,
    analysis: [
      { word: 'Быстрая', translation: 'fast', part_of_speech: 'adjective' },
      { word: 'коричневая', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  ja: {
    success: true,
    analysis: [
      { word: '素早い', translation: 'fast', part_of_speech: 'adjective' },
      { word: '茶色の', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  zh: {
    success: true,
    analysis: [
      { word: '敏捷的', translation: 'fast', part_of_speech: 'adjective' },
      { word: '棕色', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  },
  ko: {
    success: true,
    analysis: [
      { word: '재빠른', translation: 'fast', part_of_speech: 'adjective' },
      { word: '갈색', translation: 'brown', part_of_speech: 'adjective' }
    ],
    full_translation: 'The fast brown fox jumps over the lazy dog.'
  }
};

describe('SyntaxAnalysis', () => {
  let syntaxAnalysis;

  beforeEach(() => {
    syntaxAnalysis = new SyntaxAnalysis();
    jest.clearAllMocks();
    
    // Default mock fetch implementation
    global.fetch.mockImplementation((url, options) => {
      // Extract language code from URL
      const match = url.match(/\/(chinese|japanese|korean|arabic|russian|hindi|thai)$/);
      if (match) {
        const endpoint = match[1];
        const languageMap = {
          'chinese': 'zh',
          'japanese': 'ja',
          'korean': 'ko',
          'arabic': 'ar',
          'russian': 'ru',
          'hindi': 'hi',
          'thai': 'th'
        };
        const langCode = languageMap[endpoint];
        
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockApiResponses[langCode] || { success: true, analysis: [] })
        });
      }
      return Promise.reject(new Error('Invalid URL'));
    });
  });

  afterEach(function() {
    if (this.currentTest && this.currentTest.state === 'failed') {
      const testName = this.currentTest.title;
      // Extract language name from test title
      const languageMatch = testName.match(/for\s+(\w+)/i);
      if (languageMatch) {
        failingLanguages.add(languageMatch[1]);
      }
      if (testName.includes('API call')) {
        const apiMatch = testName.match(/for\s+(\w+)/i);
        if (apiMatch) {
          failedApiCalls.add(apiMatch[1]);
        }
      }
    }
  });

  afterAll(() => {
    if (failingLanguages.size > 0 || failedApiCalls.size > 0) {
      console.log('\n' + '='.repeat(70));
      console.log('📋 TEST FAILURE SUMMARY:');
      console.log('='.repeat(70));
      
      if (failingLanguages.size > 0) {
        console.log('\n❌ Language Detection Failures:');
        failingLanguages.forEach(lang => console.log(`   • ${lang}`));
      }
      
      if (failedApiCalls.size > 0) {
        console.log('\n🌐 API Call Failures:');
        failedApiCalls.forEach(lang => console.log(`   • ${lang}`));
      }
      
      console.log('\n💡 Debug Tips:');
      console.log('   • Check language patterns in src/lib/languagePatterns.js');
      console.log('   • Verify API endpoint is responding correctly');
      console.log('   • Run with DEBUG=true for more details');
      console.log('='.repeat(70));
    }
  });

  // ==================== LANGUAGE DETECTION TESTS ====================

  describe('Language Detection', () => {
    test('detects Spanish text correctly', () => {
      const text = 'El rápido zorro marrón salta sobre el perro perezoso. Esta es una frase simple en español para pruebas.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('es');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects French text correctly', () => {
      const text = 'Le renard brun rapide saute par-dessus le chien paresseux. Ceci est une phrase simple en français pour les tests.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('fr');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects German text correctly', () => {
      const text = 'Der schnelle braune Fuchs springt über den faulen Hund. Dies ist ein einfacher deutscher Satz zum Testen.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('de');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Italian text correctly', () => {
      const text = 'La veloce volpe marrone salta sopra il cane pigro. Questa è una semplice frase italiana per test.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('it');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Portuguese text correctly', () => {
      const text = 'A rápida raposa marrom salta sobre o cão preguiçoso. Esta é uma frase simples em português para teste.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('pt');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Dutch text correctly', () => {
      const text = 'De snelle bruine vos springt over de luie hond. Dit is een eenvoudige Nederlandse zin om te testen.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('nl');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Swedish text correctly', () => {
      const text = 'Den snabba bruna räven hoppar över den lata hunden. Detta är en enkel svensk mening för testning.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('sv');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Danish text correctly', () => {
      const text = 'Den hurtige brune ræv hopper over den dovne hund. Dette er en simpel dansk sætning til test.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('da');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Norwegian text correctly', () => {
      const text = 'Den raske brune reven hopper over den late hunden. Dette er en enkel norsk setning for testing.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('no');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Finnish text correctly', () => {
      const text = 'Nopea ruskea kettu hyppää laiska koiran yli. Tämä on yksinkertainen suomalainen testilause.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('fi');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Polish text correctly', () => {
      const text = 'Szybki brązowy lis przeskakuje nad leniwym psem. To jest proste polskie zdanie do testowania.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('pl');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Czech text correctly', () => {
      const text = 'Rychlá hnědá liška skáče přes líného psa. Toto je jednoduchá česká věta pro testování.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('cs');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Hungarian text correctly', () => {
      const text = 'A gyors barna róka átugrik a lusta kutya fölött. Ez egy egyszerű magyar mondat a teszteléshez.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('hu');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Romanian text correctly', () => {
      const text = 'Vulpea maro rapidă sare peste câinele leneș. Aceasta este o propoziție simplă în limba română pentru testare.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('ro');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Turkish text correctly', () => {
      const text = 'Hızlı kahverengi tilki tembel köpeğin üzerinden atlar. Bu test için basit bir Türkçe cümledir.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('tr');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Russian text correctly', () => {
      const text = 'Быстрая коричневая лиса прыгает через ленивую собаку. Это простое русское предложение для тестирования.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('ru');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Japanese text correctly', () => {
      const text = '素早い茶色のキツネが怠け者の犬を飛び越えます。これはテスト用の簡単な日本語の文です。';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('ja');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Chinese text correctly', () => {
      const text = '敏捷的棕色狐狸跳过懒狗。这是一个用于测试的简单中文句子。';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('zh');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('detects Korean text correctly', () => {
      const text = '재빠른 갈색 여우가 게으른 개를 뛰어넘습니다. 이것은 테스트를 위한 간단한 한국어 문장입니다.';
      const result = detectSyntaxLanguage(text);
      expect(result.code).toBe('ko');
      expect(result.confidence).toBeGreaterThan(0.5);
    });
  });

  // ==================== API INTEGRATION TESTS ====================

  describe('API Integration', () => {
    test('successfully makes API call for Spanish text', async () => {
      const text = 'El rápido zorro marrón salta sobre el perro perezoso.';
      const languageInfo = { code: 'es', name: 'Spanish' };
      
      // Mock the modal methods
      syntaxAnalysis.modal.showLoading = jest.fn();
      syntaxAnalysis.modal.show = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(text, languageInfo);
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/analyze/chinese'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        })
      );
      expect(syntaxAnalysis.modal.show).toHaveBeenCalled();
    });

    test('handles API error gracefully', async () => {
      // Mock fetch to return error
      global.fetch.mockImplementationOnce(() => 
        Promise.reject(new Error('Network error'))
      );
      
      const text = 'Test text';
      const languageInfo = { code: 'es', name: 'Spanish' };
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      syntaxAnalysis.modal.showError = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(text, languageInfo);
      
      expect(syntaxAnalysis.modal.showError).toHaveBeenCalledWith(
        expect.stringContaining('Failed to analyze')
      );
    });

    test('handles CORS error with specific message', async () => {
      // Mock CORS error
      global.fetch.mockImplementationOnce(() => 
        Promise.reject(new TypeError('Failed to fetch'))
      );
      
      const text = 'Test text';
      const languageInfo = { code: 'es', name: 'Spanish' };
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      syntaxAnalysis.modal.showError = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(text, languageInfo);
      
      expect(syntaxAnalysis.modal.showError).toHaveBeenCalledWith(
        expect.stringContaining('CORS issue')
      );
    });

    test('handles non-200 response', async () => {
      global.fetch.mockImplementationOnce(() => 
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error'
        })
      );
      
      const text = 'Test text';
      const languageInfo = { code: 'es', name: 'Spanish' };
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      syntaxAnalysis.modal.showError = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(text, languageInfo);
      
      expect(syntaxAnalysis.modal.showError).toHaveBeenCalledWith(
        expect.stringContaining('API error')
      );
    });
  });

  // ==================== END-TO-END TESTS ====================

  describe('End-to-End Integration', () => {
    test('complete flow: detect language -> API call -> render', async () => {
      const text = 'El rápido zorro marrón salta sobre el perro perezoso.';
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      syntaxAnalysis.modal.show = jest.fn();
      syntaxAnalysis.renderer.render = jest.fn().mockReturnValue('<div>Rendered content</div>');
      
      await syntaxAnalysis.analyzeSelection(text);
      
      // Should have detected Spanish
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/analyze/chinese'),
        expect.any(Object)
      );
      expect(syntaxAnalysis.renderer.render).toHaveBeenCalled();
      expect(syntaxAnalysis.modal.show).toHaveBeenCalled();
    });

    test('respects enabled/disabled state', async () => {
      syntaxAnalysis.setEnabled(false);
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      
      await syntaxAnalysis.analyzeSelection('Some text');
      
      expect(fetch).not.toHaveBeenCalled();
      expect(syntaxAnalysis.modal.showLoading).not.toHaveBeenCalled();
    });

    test('ignores duplicate selections', async () => {
      const text = 'Same text';
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      
      // First call
      await syntaxAnalysis.analyzeSelection(text);
      
      // Second call with same text
      await syntaxAnalysis.analyzeSelection(text);
      
      // fetch should only be called once
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('ignores very short text', async () => {
      syntaxAnalysis.modal.showLoading = jest.fn();
      
      await syntaxAnalysis.analyzeSelection('a');
      
      expect(fetch).not.toHaveBeenCalled();
      expect(syntaxAnalysis.modal.showLoading).not.toHaveBeenCalled();
    });

    test('handles language detection failure', async () => {
      const text = '1234567890'; // Non-language text
      
      syntaxAnalysis.modal.showError = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(text);
      
      expect(syntaxAnalysis.modal.showError).toHaveBeenCalledWith(
        expect.stringContaining('Could not detect language')
      );
    });
  });

  // ==================== EDGE CASES ====================

  describe('Edge Cases', () => {
    test('handles null/undefined text', async () => {
      syntaxAnalysis.modal.showLoading = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(null);
      await syntaxAnalysis.analyzeSelection(undefined);
      
      expect(fetch).not.toHaveBeenCalled();
    });

    test('handles missing API endpoint for language', async () => {
      const text = 'Some text';
      const languageInfo = { code: 'xx', name: 'Unknown' };
      
      syntaxAnalysis.modal.showLoading = jest.fn();
      syntaxAnalysis.modal.showError = jest.fn();
      
      await syntaxAnalysis.analyzeSelection(text, languageInfo);
      
      expect(syntaxAnalysis.modal.showError).toHaveBeenCalledWith(
        expect.stringContaining('No API endpoint configured')
      );
    });

    test('destroy method cleans up modal', () => {
      syntaxAnalysis.modal.destroy = jest.fn();
      
      syntaxAnalysis.destroy();
      
      expect(syntaxAnalysis.modal.destroy).toHaveBeenCalled();
    });
  });
});