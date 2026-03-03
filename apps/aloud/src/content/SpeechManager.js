import { log } from './utils.js';

export class SpeechManager {
  constructor(languageDetector) {
    this.languageDetector = languageDetector;
    this.utterance = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.rate = 1.0;
    this.voices = [];
    this.currentLanguage = 'en';
    this.currentLanguageName = 'English';
    this.onStart = null;
    this.onEnd = null;
    this.onError = null;
    this.onVoiceUnavailable = null;

    this.loadVoices();

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  loadVoices() {
    this.voices = window.speechSynthesis.getVoices();
    log(
      'Available voices:',
      this.voices.map((v) => `${v.name} (${v.lang})`)
    );
  }

  setRate(rate) {
    this.rate = rate;
  }

  findVoiceForLanguage(langCode) {
    const voiceCode = this.languageDetector.getVoiceCode(langCode);

    // Try to find exact match first
    let voice = this.voices.find((v) => v.lang === voiceCode && v.localService === true);

    // If no exact match, try any voice with matching language prefix
    if (!voice) {
      const langPrefix = voiceCode.split('-')[0];
      voice = this.voices.find((v) => v.lang.startsWith(langPrefix) && v.localService === true);
    }

    // If still no match, try any voice with matching language
    if (!voice) {
      const langPrefix = voiceCode.split('-')[0];
      voice = this.voices.find((v) => v.lang.startsWith(langPrefix));
    }

    return voice; // Return null if no voice found
  }

  speak(text) {
    if (!text) {
      log('No text to speak');
      return null;
    }

    log(`Speaking text: "${text.substring(0, 50)}..."`);

    // Cancel any ongoing speech
    if (this.isSpeaking) {
      log('Cancelling previous speech');
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
    }

    // Detect language from text
    this.currentLanguage = this.languageDetector.detectLanguage(text);
    this.currentLanguageName = this.languageDetector.getLanguageName(this.currentLanguage);
    log(`Detected language: ${this.currentLanguage} (${this.currentLanguageName})`);

    // Find appropriate voice
    const selectedVoice = this.findVoiceForLanguage(this.currentLanguage);

    // If no voice found for the detected language, don't speak at all
    if (!selectedVoice) {
      log(`❌ No voice available for ${this.currentLanguageName} - not speaking`);

      // Trigger voice unavailable feedback
      if (this.onVoiceUnavailable) {
        this.onVoiceUnavailable(this.currentLanguageName);
      }

      return {
        language: this.currentLanguage,
        languageName: this.currentLanguageName,
        voiceFound: false,
        spoken: false,
      };
    }

    this.utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      this.utterance.voice = selectedVoice;
      this.utterance.lang = selectedVoice.lang;
      log(`🔊 Using voice: ${selectedVoice.name} for ${this.currentLanguageName}`);
    }

    this.utterance.rate = this.rate;

    this.utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStart) this.onStart(this.currentLanguageName);
    };

    this.utterance.onend = () => {
      this.isSpeaking = false;
      if (this.onEnd) this.onEnd();
    };

    this.utterance.onerror = (event) => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.error('Speech error:', event);
      } else {
        log(`Speech ${event.error}`);
      }
      this.isSpeaking = false;
      if (this.onError) this.onError(event);
    };

    this.isSpeaking = true;
    this.isPaused = false;

    try {
      window.speechSynthesis.speak(this.utterance);
      log('Speech synthesis started');
    } catch (error) {
      console.error('Failed to start speech:', error);
      this.isSpeaking = false;
    }

    return {
      language: this.currentLanguage,
      languageName: this.currentLanguageName,
      voiceFound: true,
      spoken: true,
    };
  }

  pauseResume() {
    if (this.isSpeaking) {
      if (this.isPaused) {
        window.speechSynthesis.resume();
        this.isPaused = false;
      } else {
        window.speechSynthesis.pause();
        this.isPaused = true;
      }
    }
  }

  cancel() {
    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
    }
  }
}
