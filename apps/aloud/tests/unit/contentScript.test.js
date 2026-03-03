import { SpeechManager } from '../../src/content/SpeechManager';
import { LanguageDetector } from '../../src/content/LanguageDetector';
import { EventHandler } from '../../src/content/EventHandler';
import { UIManager } from '../../src/content/UIManager';
import { getWordUnderCursor } from '../../src/content/utils';

// Mock language patterns
const mockLanguagePatterns = {
  en: { name: 'English', patterns: [] },
  es: { name: 'Spanish', patterns: [] },
  ru: { name: 'Russian', patterns: [] },
  zh: { name: 'Chinese', patterns: [] },
};

describe('SpeechManager', () => {
  let speechManager;
  let languageDetector;

  beforeEach(() => {
    languageDetector = new LanguageDetector(mockLanguagePatterns);
    speechManager = new SpeechManager(languageDetector);

    // Mock speech synthesis methods
    window.speechSynthesis.speak.mockClear();
    window.speechSynthesis.cancel.mockClear();
  });

  test('loads voices', () => {
    expect(speechManager.voices.length).toBeGreaterThan(0);
  });

  test('sets rate correctly', () => {
    speechManager.setRate(1.5);
    expect(speechManager.rate).toBe(1.5);
  });

  test('finds voice for language', () => {
    const voice = speechManager.findVoiceForLanguage('en');
    expect(voice).toBeTruthy();
    expect(voice.lang).toBe('en-US');
  });

  test('speak method creates utterance', () => {
    const result = speechManager.speak('Hello world');
    expect(result).toBeTruthy();
    expect(result.language).toBe('en');
    expect(result.languageName).toBe('English');
    expect(speechManager.utterance).toBeTruthy();
    expect(speechManager.utterance.text).toBe('Hello world');
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  test('cancel stops speaking', () => {
    speechManager.isSpeaking = true;
    speechManager.cancel();
    expect(speechManager.isSpeaking).toBe(false);
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  test('pauseResume toggles pause state', () => {
    speechManager.isSpeaking = true;

    speechManager.pauseResume();
    expect(speechManager.isPaused).toBe(true);
    expect(window.speechSynthesis.pause).toHaveBeenCalled();

    speechManager.pauseResume();
    expect(speechManager.isPaused).toBe(false);
    expect(window.speechSynthesis.resume).toHaveBeenCalled();
  });
});

describe('EventHandler', () => {
  let speechManager;
  let languageDetector;
  let eventHandler;
  let mockOnLanguageDetected;
  let speakSpy;

  beforeEach(() => {
    languageDetector = new LanguageDetector(mockLanguagePatterns);
    speechManager = new SpeechManager(languageDetector);
    mockOnLanguageDetected = jest.fn();
    eventHandler = new EventHandler(speechManager, mockOnLanguageDetected);

    // Create spy on speechManager.speak
    speakSpy = jest.spyOn(speechManager, 'speak');

    document.body.innerHTML = `
      <div id="test">Test text content here</div>
      <div id="test2">Another test div</div>
      <button id="test-button">Click me</button>
      <input id="test-input" value="test">
    `;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('setEnabled toggles functionality', () => {
    expect(eventHandler.isEnabled).toBe(false);
    eventHandler.setEnabled(true);
    expect(eventHandler.isEnabled).toBe(true);
  });

  test('clearTimeouts clears all timeouts', () => {
    eventHandler.hoverTimeout = setTimeout(() => {}, 100);
    eventHandler.clickTimeout = setTimeout(() => {}, 100);
    eventHandler.clearTimeouts();
    expect(eventHandler.hoverTimeout).toBeNull();
    expect(eventHandler.clickTimeout).toBeNull();
  });

  test('getWordUnderCursor returns word (using imported function)', () => {
    const mockEvent = {
      target: document.getElementById('test'),
      clientX: 10,
      clientY: 10,
    };
    // Mock caretRangeFromPoint to return a proper range
    document.caretRangeFromPoint = jest.fn(() => ({
      startContainer: {
        nodeType: Node.TEXT_NODE,
        textContent: 'Test text content here',
      },
      startOffset: 5,
    }));

    const word = getWordUnderCursor(mockEvent);
    expect(word).toBe('text');
  });

  // test('handleSingleClick reads line', () => {
  //   eventHandler.setEnabled(true);

  //   const mockEvent = {
  //     target: document.getElementById('test'),
  //   };

  //   // Clear any previous calls
  //   speakSpy.mockClear();

  //   eventHandler.handleSingleClick(mockEvent);

  //   expect(speakSpy).toHaveBeenCalledTimes(1);
  //   expect(speakSpy.mock.calls[0][0]).toContain('Test text');
  // });

  test('handleSingleClick reads selected text if available', () => {
    eventHandler.setEnabled(true);

    // Mock window.getSelection
    const mockSelection = {
      toString: () => 'selected text',
    };
    const selectionSpy = jest.spyOn(window, 'getSelection').mockReturnValue(mockSelection);

    const mockEvent = {
      target: document.getElementById('test'),
    };

    speakSpy.mockClear();
    eventHandler.handleSingleClick(mockEvent);

    expect(speakSpy).toHaveBeenCalledTimes(1);
    expect(speakSpy.mock.calls[0][0]).toBe('selected text');

    selectionSpy.mockRestore();
  });

  test('handleSingleClick ignores buttons', () => {
    eventHandler.setEnabled(true);

    const mockEvent = {
      target: document.getElementById('test-button'),
    };

    speakSpy.mockClear();
    eventHandler.handleSingleClick(mockEvent);
    expect(speakSpy).not.toHaveBeenCalled();
  });

  test('handleDoubleClick reads word', () => {
    eventHandler.setEnabled(true);

    // Mock caretRangeFromPoint
    document.caretRangeFromPoint = jest.fn(() => ({
      startContainer: {
        nodeType: Node.TEXT_NODE,
        textContent: 'Test text content here',
      },
      startOffset: 5,
    }));

    const mockEvent = {
      target: document.getElementById('test'),
      clientX: 10,
      clientY: 10,
    };

    speakSpy.mockClear();
    eventHandler.handleDoubleClick(mockEvent);

    expect(speakSpy).toHaveBeenCalledTimes(1);
    // Should read a word (shorter than full line)
    expect(speakSpy.mock.calls[0][0].length).toBeLessThan(10);
  });

  test('handleDoubleClick reads selected text if available', () => {
    eventHandler.setEnabled(true);

    // Mock window.getSelection
    const mockSelection = {
      toString: () => 'selected word',
    };
    const selectionSpy = jest.spyOn(window, 'getSelection').mockReturnValue(mockSelection);

    const mockEvent = {
      target: document.getElementById('test'),
      clientX: 10,
      clientY: 10,
    };

    speakSpy.mockClear();
    eventHandler.handleDoubleClick(mockEvent);

    expect(speakSpy).toHaveBeenCalledTimes(1);
    expect(speakSpy.mock.calls[0][0]).toBe('selected word');

    selectionSpy.mockRestore();
  });

  // test('handleHover triggers after delay', () => {
  //   jest.useFakeTimers();
  //   eventHandler.setEnabled(true);

  //   const mockEvent = {
  //     target: document.getElementById('test'),
  //   };

  //   speakSpy.mockClear();
  //   eventHandler.handleHover(mockEvent);

  //   // Should not have called immediately
  //   expect(speakSpy).not.toHaveBeenCalled();

  //   // Advance timers
  //   jest.advanceTimersByTime(500);

  //   // Should have called after delay
  //   expect(speakSpy).toHaveBeenCalledTimes(1);
  //   expect(speakSpy.mock.calls[0][0]).toContain('Test text');
  // });

  test('handleHover does not trigger if disabled', () => {
    jest.useFakeTimers();
    eventHandler.setEnabled(false);

    const mockEvent = {
      target: document.getElementById('test'),
    };

    speakSpy.mockClear();
    eventHandler.handleHover(mockEvent);

    jest.advanceTimersByTime(500);
    expect(speakSpy).not.toHaveBeenCalled();
  });

  test('handleMouseLeave cancels hover', () => {
    jest.useFakeTimers();
    eventHandler.setEnabled(true);

    const mockEvent = {
      target: document.getElementById('test'),
    };

    speakSpy.mockClear();
    eventHandler.handleHover(mockEvent);
    eventHandler.handleMouseLeave();

    jest.advanceTimersByTime(500);
    expect(speakSpy).not.toHaveBeenCalled();
  });

  test('handleClick distinguishes single from double click', () => {
    jest.useFakeTimers();
    const singleSpy = jest.spyOn(eventHandler, 'handleSingleClick');
    const doubleSpy = jest.spyOn(eventHandler, 'handleDoubleClick');
    eventHandler.setEnabled(true);

    const mockEvent = {
      target: document.getElementById('test'),
    };

    // First click (should be single after timeout)
    eventHandler.handleClick(mockEvent);
    jest.advanceTimersByTime(300);
    expect(singleSpy).toHaveBeenCalledTimes(1);

    // Reset mocks
    singleSpy.mockClear();
    doubleSpy.mockClear();

    // Simulate double click
    eventHandler.lastClickTarget = mockEvent.target;
    eventHandler.handleClick(mockEvent);
    expect(doubleSpy).toHaveBeenCalledTimes(1);
  });

  test('handleClick does nothing if disabled', () => {
    const singleSpy = jest.spyOn(eventHandler, 'handleSingleClick');
    eventHandler.setEnabled(false);

    const mockEvent = {
      target: document.getElementById('test'),
    };

    eventHandler.handleClick(mockEvent);
    expect(singleSpy).not.toHaveBeenCalled();
  });

  test('speakText calls speechManager.speak and onLanguageDetected', () => {
    const testText = 'Test text';
    const mockResult = { languageName: 'English' };
    speakSpy.mockReturnValue(mockResult);

    eventHandler.speakText(testText);

    expect(speakSpy).toHaveBeenCalledWith(testText);
    expect(mockOnLanguageDetected).toHaveBeenCalledWith('English');
  });

  test('attachEvents adds event listeners', () => {
    const addSpy = jest.spyOn(document, 'addEventListener');
    eventHandler.attachEvents();
    expect(addSpy).toHaveBeenCalledTimes(3);
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('mouseover', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('mouseout', expect.any(Function));
  });

  test('detachEvents removes event listeners', () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener');
    eventHandler.detachEvents();
    expect(removeSpy).toHaveBeenCalledTimes(3);
  });
});

describe('UIManager', () => {
  let uiManager;
  let mockOnToggle;

  beforeEach(() => {
    mockOnToggle = jest.fn();
    uiManager = new UIManager(mockOnToggle);
    document.body.innerHTML = '';
  });

  test('createButton adds button to DOM', () => {
    expect(document.querySelector('.read-aloud-button')).toBeNull();
    uiManager.createButton();
    expect(document.querySelector('.read-aloud-button')).toBeTruthy();
  });

  test('removeButton removes button from DOM', () => {
    uiManager.createButton();
    expect(document.querySelector('.read-aloud-button')).toBeTruthy();
    uiManager.removeButton();
    expect(document.querySelector('.read-aloud-button')).toBeNull();
  });

  test('updateButtonState updates classes', () => {
    uiManager.createButton();
    const button = document.querySelector('.read-aloud-button');

    // Active state (not speaking)
    uiManager.updateButtonState(true, false, 'English');
    expect(button.classList.contains('active')).toBe(true);
    expect(button.classList.contains('speaking')).toBe(false);
    expect(button.getAttribute('title')).toBe('Active - English');
    expect(button.getAttribute('aria-label')).toBe('Turn off Read Aloud');

    // Speaking state
    uiManager.updateButtonState(true, true, 'English');
    expect(button.classList.contains('speaking')).toBe(true);
    expect(button.getAttribute('title')).toBe('Speaking - English');

    // Inactive state
    uiManager.updateButtonState(false, false, 'English');
    expect(button.classList.contains('active')).toBe(false);
    expect(button.classList.contains('speaking')).toBe(false);
    expect(button.getAttribute('title')).toBe('Click to activate');
    expect(button.getAttribute('aria-label')).toBe('Turn on Read Aloud');
  });

  test('button has correct structure', () => {
    uiManager.createButton();
    const button = document.querySelector('.read-aloud-button');
    const iconDiv = button.querySelector('.translate-icon');
    const img = iconDiv.querySelector('img');

    expect(button.getAttribute('role')).toBe('button');
    expect(button.getAttribute('tabindex')).toBe('0');
    expect(iconDiv).toBeTruthy();
    expect(img).toBeTruthy();
    expect(img.src).toContain('icons/voice.png');
    expect(img.alt).toBe('Read Aloud');
  });

  test('toggle callback works', () => {
    uiManager.createButton();
    const button = document.querySelector('.read-aloud-button');

    // Simulate click
    button.click();
    expect(mockOnToggle).toHaveBeenCalledTimes(1);

    // Simulate keypress
    const keyEvent = new KeyboardEvent('keypress', { key: 'Enter' });
    button.dispatchEvent(keyEvent);
    expect(mockOnToggle).toHaveBeenCalledTimes(2);
  });

  test('updateButtonState handles null button gracefully', () => {
    expect(() => {
      uiManager.updateButtonState(true, false, 'English');
    }).not.toThrow();
  });
});
