// Mock chrome API
global.chrome = {
  runtime: {
    id: 'test-extension-id',
    getURL: jest.fn((path) => `chrome-extension://test/${path}`),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    sendMessage: jest.fn(),
    connect: jest.fn(() => ({
      onDisconnect: {
        addListener: jest.fn(),
      },
    })),
  },
  storage: {
    local: {
      get: jest.fn((keys, callback) => {
        callback({
          isSpeakingMode: false,
          rate: 1.0,
          detectedLanguage: 'English',
        });
      }),
      set: jest.fn((items, callback) => {
        if (callback) callback();
      }),
    },
  },
  tabs: {
    query: jest.fn((query, callback) => {
      callback([{ id: 123, url: 'http://localhost:8080/test-page.html' }]);
    }),
    sendMessage: jest.fn(),
  },
};

// Mock Speech Synthesis
global.window = global.window || {};

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = class MockSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
    this.rate = 1.0;
    this.lang = 'en-US';
    this.voice = null;
    this.volume = 1;
    this.pitch = 1;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
    this.onpause = null;
    this.onresume = null;
  }
};

// Mock speechSynthesis
global.speechSynthesis = {
  getVoices: jest.fn(() => [
    { name: 'Google US English', lang: 'en-US', localService: true, default: true },
    { name: 'Google UK English', lang: 'en-GB', localService: true },
    { name: 'Google русский', lang: 'ru-RU', localService: true },
    { name: 'Google 普通话（中国大陆）', lang: 'zh-CN', localService: true },
    { name: 'Google 日本語', lang: 'ja-JP', localService: true },
    { name: 'Google 한국어', lang: 'ko-KR', localService: true },
    { name: 'Google Español', lang: 'es-ES', localService: true },
    { name: 'Google Français', lang: 'fr-FR', localService: true },
    { name: 'Google Deutsch', lang: 'de-DE', localService: true },
  ]),
  cancel: jest.fn(),
  speak: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  onvoiceschanged: null,
};

// Mock document methods
document.caretRangeFromPoint = jest.fn(() => ({
  startContainer: {
    nodeType: Node.TEXT_NODE,
    textContent: 'test text',
  },
  startOffset: 2,
}));

// Mock fetch for language patterns
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('export default {};'),
  })
);

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
