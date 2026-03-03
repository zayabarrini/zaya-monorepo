// Import language patterns
const languagePatterns = require('../../src/lib/languagePatterns.js');
const { LanguageDetector } = require('../../src/content/LanguageDetector.js');
const failingLanguages = new Set();

describe('Language Detection', () => {
  let languageDetector;

  beforeEach(() => {
    languageDetector = new LanguageDetector(languagePatterns);
  });

  // Track failing tests
  afterEach(function () {
    if (this.currentTest && this.currentTest.state === 'failed') {
      const testName = this.currentTest.title;
      if (testName.includes('Spanish')) failingLanguages.add('Spanish');
      if (testName.includes('German')) failingLanguages.add('German');
      if (testName.includes('Italian')) failingLanguages.add('Italian');
      if (testName.includes('Portuguese')) failingLanguages.add('Portuguese');
      if (testName.includes('Norwegian')) failingLanguages.add('Norwegian');
      if (testName.includes('Finnish')) failingLanguages.add('Finnish');
    }
  });

  // Helper function to test with conditional debugging
  const testLanguage = (text, expectedLang, langName) => {
    const shouldDebug = failingLanguages.has(langName);
    const result = languageDetector.detectLanguage(text, shouldDebug);

    if (result !== expectedLang && !shouldDebug) {
      // If it fails and we weren't debugging, show minimal failure info
      console.log(`\n❌ ${langName} detection failed (expected ${expectedLang}, got ${result})`);
      console.log('   Run with DEBUG=1 to see full analysis');
    }

    expect(result).toBe(expectedLang);
  };

  test('detects Spanish text correctly', () => {
    const spanishText =
      'El rápido zorro marrón salta sobre el perro perezoso. Esta es una frase simple en español para pruebas.';
    testLanguage(spanishText, 'es', 'Spanish');
  });

  test('detects French text correctly', () => {
    const frenchText =
      'Le renard brun rapide saute par-dessus le chien paresseux. Ceci est une phrase simple en français pour les tests.';
    testLanguage(frenchText, 'fr', 'French');
  });

  test('detects German text correctly', () => {
    const germanText =
      'Der schnelle braune Fuchs springt über den faulen Hund. Dies ist ein einfacher deutscher Satz zum Testen.';
    testLanguage(germanText, 'de', 'German');
  });

  test('detects Italian text correctly', () => {
    const italianText =
      'La veloce volpe marrone salta sopra il cane pigro. Questa è una semplice frase italiana per test.';
    testLanguage(italianText, 'it', 'Italian');
  });

  test('detects Portuguese text correctly', () => {
    const portugueseText =
      'A rápida raposa marrom salta sobre o cão preguiçoso. Esta é uma frase simples em português para teste.';
    testLanguage(portugueseText, 'pt', 'Portuguese');
  });

  test('detects Dutch text correctly', () => {
    const dutchText =
      'De snelle bruine vos springt over de luie hond. Dit is een eenvoudige Nederlandse zin om te testen.';
    testLanguage(dutchText, 'nl', 'Dutch');
  });

  test('detects Swedish text correctly', () => {
    const swedishText =
      'Den snabba bruna räven hoppar över den lata hunden. Detta är en enkel svensk mening för testning.';
    testLanguage(swedishText, 'sv', 'Swedish');
  });

  test('detects Danish text correctly', () => {
    const danishText =
      'Den hurtige brune ræv hopper over den dovne hund. Dette er en simpel dansk sætning til test.';
    testLanguage(danishText, 'da', 'Danish');
  });

  test('detects Norwegian text correctly', () => {
    const norwegianText =
      'Den raske brune reven hopper over den late hunden. Dette er en enkel norsk setning for testing.';
    testLanguage(norwegianText, 'no', 'Norwegian');
  });

  test('detects Finnish text correctly', () => {
    const finnishText =
      'Nopea ruskea kettu hyppää laiska koiran yli. Tämä on yksinkertainen suomalainen testilause.';
    testLanguage(finnishText, 'fi', 'Finnish');
  });

  test('detects Polish text correctly', () => {
    const polishText =
      'Szybki brązowy lis przeskakuje nad leniwym psem. To jest proste polskie zdanie do testowania.';
    testLanguage(polishText, 'pl', 'Polish');
  });

  test('detects Czech text correctly', () => {
    const czechText =
      'Rychlá hnědá liška skáče přes líného psa. Toto je jednoduchá česká věta pro testování.';
    testLanguage(czechText, 'cs', 'Czech');
  });

  test('detects Hungarian text correctly', () => {
    const hungarianText =
      'A gyors barna róka átugrik a lusta kutya fölött. Ez egy egyszerű magyar mondat a teszteléshez.';
    testLanguage(hungarianText, 'hu', 'Hungarian');
  });

  test('detects Romanian text correctly', () => {
    const romanianText =
      'Vulpea maro rapidă sare peste câinele leneș. Aceasta este o propoziție simplă în limba română pentru testare.';
    testLanguage(romanianText, 'ro', 'Romanian');
  });

  test('detects Turkish text correctly', () => {
    const turkishText =
      'Hızlı kahverengi tilki tembel köpeğin üzerinden atlar. Bu test için basit bir Türkçe cümledir.';
    testLanguage(turkishText, 'tr', 'Turkish');
  });

  test('detects Russian text correctly', () => {
    const russianText =
      'Быстрая коричневая лиса прыгает через ленивую собаку. Это простое русское предложение для тестирования.';
    testLanguage(russianText, 'ru', 'Russian');
  });

  test('detects Japanese text correctly', () => {
    const japaneseText =
      '素早い茶色のキツネが怠け者の犬を飛び越えます。これはテスト用の簡単な日本語の文です。';
    testLanguage(japaneseText, 'ja', 'Japanese');
  });

  test('detects Chinese text correctly', () => {
    const chineseText = '敏捷的棕色狐狸跳过懒狗。这是一个用于测试的简单中文句子。';
    testLanguage(chineseText, 'zh', 'Chinese');
  });

  test('detects Korean text correctly', () => {
    const koreanText =
      '재빠른 갈색 여우가 게으른 개를 뛰어넘습니다. 이것은 테스트를 위한 간단한 한국어 문장입니다.';
    testLanguage(koreanText, 'ko', 'Korean');
  });

  test('handles empty text gracefully', () => {
    expect(languageDetector.detectLanguage('')).toBe('en');
    expect(languageDetector.detectLanguage(null)).toBe('en');
    expect(languageDetector.detectLanguage(undefined)).toBe('en');
  });

  // Summary after all tests
  afterAll(() => {
    if (failingLanguages.size > 0) {
      console.log('\n' + '='.repeat(60));
      console.log('📋 FAILURE SUMMARY:');
      console.log('='.repeat(60));
      console.log(`The following languages failed detection:`);
      failingLanguages.forEach((lang) => console.log(`  ❌ ${lang}`));
      console.log('\n💡 To debug a specific failure, set debug=true in the detectLanguage call.');
      console.log('='.repeat(60));
    }
  });
});
