<script lang="ts">
  import { onMount } from "svelte";

  let utterance: SpeechSynthesisUtterance;
  let isSpeaking = false;
  let isPaused = false;
  let text = "";
  let voices = [];
  let rate = 1.0;
  let isModalOpen = false;
  let isSpeakingMode = false;
  let hoverTimeout: NodeJS.Timeout;
  let currentHoverElement: HTMLElement | null = null;
  let clickTimeout: NodeJS.Timeout;
  let lastClickTarget: EventTarget | null = null;
  const DOUBLE_CLICK_DELAY = 300; // ms

  // Language detection
  let currentLanguage = "en";
  let detectedLanguageName = "English";

  // Common words and patterns for better language detection
  import languagePatterns from "$lib/utils/languagePatterns";

  // Map languages to common voice language codes
  const languageToVoiceCode = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
    ru: "ru-RU",
    ja: "ja-JP",
    zh: "zh-CN",
    ar: "ar-SA",
    hi: "hi-IN",
    ko: "ko-KR",
    el: "el-GR",
    he: "he-IL",
    th: "th-TH",
    tr: "tr-TR",
    nl: "nl-NL",
    sv: "sv-SE",
    da: "da-DK",
    no: "no-NO",
    fi: "fi-FI",
    pl: "pl-PL",
    cs: "cs-CZ",
    hu: "hu-HU",
    ro: "ro-RO"
  };

  onMount(() => {
    text = document.body.innerText;
    loadVoices();

    // Ensure voices are loaded
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  });

  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    // console.log(
    //   "Available voices:",
    //   voices.map((v) => `${v.name} (${v.lang})`)
    // );
  }

  // Detect language from text
  function detectLanguage(text: string): string {
    if (!text || text.trim().length === 0) return "en";

    const sample = text.substring(0, 300); // Check first 300 chars for better accuracy
    let scores = {};
    let scriptScores = {};

    // Initialize scores
    Object.keys(languagePatterns).forEach((lang) => {
      scores[lang] = 0;
      scriptScores[lang] = 0;
    });

    // First, detect script type (CJK, Cyrillic, Arabic, etc.)
    let hasCJK = /[一-龯ぁ-んァ-ン가-힣]/.test(sample);
    let hasCyrillic = /[а-яА-Я]/.test(sample);
    let hasArabic = /[\u0600-\u06FF]/.test(sample);
    let hasDevanagari = /[\u0900-\u097F]/.test(sample);
    let hasGreek = /[α-ωΑ-Ω]/.test(sample);
    let hasHebrew = /[\u0590-\u05FF]/.test(sample);
    let hasThai = /[ก-๙]/.test(sample);

    // Split into words for better analysis
    const words = sample
      .split(/\s+/)
      .filter((w) => w.length > 1);

    // Check each language pattern
    for (let [lang, config] of Object.entries(
      languagePatterns
    )) {
      let patternMatches = 0;
      let totalPatterns = config.patterns.length;

      // Check each pattern
      for (let pattern of config.patterns) {
        const matches = (sample.match(pattern) || [])
          .length;
        patternMatches += matches * (config.weight || 1.0);
      }

      // Special handling for CJK languages
      if (config.script === "cjk") {
        if (lang === "ja") {
          // Japanese should have some hiragana/katakana
          if (hasCJK && /[ぁ-んァ-ン]/.test(sample)) {
            patternMatches += 10;
          }
          // Check for Japanese particles
          if (/[はがをにへでと]/.test(sample)) {
            patternMatches += 5;
          }
        } else if (lang === "zh") {
          // Chinese should have more Hanzi and no kana
          if (hasCJK && !/[ぁ-んァ-ン]/.test(sample)) {
            patternMatches += 10;
          }
          // Check for Chinese punctuation
          if (/[，。、《》]/.test(sample)) {
            patternMatches += 3;
          }
        } else if (lang === "ko") {
          // Korean should have Hangul
          if (/[가-힣]/.test(sample)) {
            patternMatches += 10;
          }
        }
      }

      // Check word boundaries for Latin languages
      if (
        !hasCJK &&
        !hasCyrillic &&
        !hasArabic &&
        !hasDevanagari
      ) {
        // Count matches in actual words
        for (let word of words) {
          for (let pattern of config.patterns) {
            if (pattern.test(word)) {
              patternMatches += 2; // Bonus for matching whole words
            }
          }
        }
      }

      scores[lang] = patternMatches;
    }

    // Find language with highest score
    let detectedLang = "en";
    let highestScore = 0;
    let secondHighestScore = 0;
    let secondLang = "en";

    for (let [lang, score] of Object.entries(scores)) {
      if (score > highestScore) {
        secondHighestScore = highestScore;
        secondLang = detectedLang;
        highestScore = score;
        detectedLang = lang;
      } else if (score > secondHighestScore) {
        secondHighestScore = score;
        secondLang = lang;
      }
    }

    // If scores are too close, use additional heuristics
    if (
      highestScore > 0 &&
      highestScore - secondHighestScore < 3
    ) {
      console.log(
        `Close match between ${detectedLang} (${highestScore}) and ${secondLang} (${secondHighestScore})`
      );

      // Special handling for common confusions
      if (detectedLang === "en" && secondLang === "es") {
        // Check for Spanish-specific words
        if (
          /[¿¡]/.test(sample) ||
          /\b(como|donde|cuando|porque)\b/i.test(sample)
        ) {
          detectedLang = "es";
        }
      } else if (
        detectedLang === "en" &&
        secondLang === "fr"
      ) {
        // Check for French-specific patterns
        if (
          /[àâäéèêëïîôöùûüÿç]/.test(sample) ||
          /\b(c'est|quand|où|mais)\b/i.test(sample)
        ) {
          detectedLang = "fr";
        }
      } else if (
        detectedLang === "ja" &&
        secondLang === "zh"
      ) {
        // Check for Japanese-specific patterns
        if (/[ぁ-んァ-ン]/.test(sample)) {
          detectedLang = "ja";
        } else {
          detectedLang = "zh";
        }
      }
    }

    // Fallback for Latin script with no strong matches
    if (highestScore === 0 && /[a-zA-Z]/.test(sample)) {
      // Try to detect by common words
      const lowerSample = sample.toLowerCase();
      if (/\b(the|and|of|to)\b/.test(lowerSample))
        detectedLang = "en";
      else if (/\b(el|la|los|y|de)\b/.test(lowerSample))
        detectedLang = "es";
      else if (/\b(le|la|les|et|de)\b/.test(lowerSample))
        detectedLang = "fr";
      else if (/\b(der|die|das|und|zu)\b/.test(lowerSample))
        detectedLang = "de";
      else if (/\b(il|la|i|gli|di|a)\b/.test(lowerSample))
        detectedLang = "it";
      else if (/\b(o|a|os|as|de|do)\b/.test(lowerSample))
        detectedLang = "pt";
    }

    // Update language name
    detectedLanguageName =
      languagePatterns[detectedLang]?.name || "Unknown";
    console.log(
      "Detected language:",
      detectedLang,
      detectedLanguageName,
      "scores:",
      scores
    );

    return detectedLang;
  }

  // Find best voice for detected language
  function findVoiceForLanguage(
    langCode: string
  ): SpeechSynthesisVoice | null {
    const voiceCode =
      languageToVoiceCode[langCode] || "en-US";

    // Try to find exact match first
    let voice = voices.find(
      (v) => v.lang === voiceCode && v.localService === true
    );

    // If no exact match, try any voice with matching language prefix
    if (!voice) {
      const langPrefix = voiceCode.split("-")[0];
      voice = voices.find(
        (v) =>
          v.lang.startsWith(langPrefix) &&
          v.localService === true
      );
    }

    // If still no match, try any voice with matching language
    if (!voice) {
      const langPrefix = voiceCode.split("-")[0];
      voice = voices.find((v) =>
        v.lang.startsWith(langPrefix)
      );
    }

    // Last resort: default voice
    if (!voice) {
      voice =
        voices.find((v) => v.default) || voices[0] || null;
    }

    return voice;
  }

  function speak() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      isPaused = false;
    } else {
      // Detect language from text
      currentLanguage = detectLanguage(text);

      // Find appropriate voice
      const selectedVoice =
        findVoiceForLanguage(currentLanguage);

      utterance = new SpeechSynthesisUtterance(text);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
        console.log(
          "Using voice:",
          selectedVoice.name,
          "for language:",
          currentLanguage,
          detectedLanguageName
        );
      } else {
        console.log(
          "No specific voice found, using default"
        );
      }

      utterance.rate = rate;

      utterance.onend = () => {
        isSpeaking = false;
      };

      utterance.onerror = (event) => {
        console.error("Speech error:", event);
        isSpeaking = false;
      };

      isSpeaking = true;
      isPaused = false;
      window.speechSynthesis.speak(utterance);
    }
  }

  function pauseResume() {
    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
      } else {
        window.speechSynthesis.pause();
        isPaused = true;
      }
    }
  }

  // Function to get the word under cursor
  function getWordUnderCursor(
    event: MouseEvent
  ): string | null {
    const target = event.target as HTMLElement;

    // Only handle paragraph and text-containing elements
    if (
      !target ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A"
    ) {
      return null;
    }

    // Create a range at the cursor position
    const range = document.caretRangeFromPoint(
      event.clientX,
      event.clientY
    );

    if (!range) return null;

    // Get the text node and offset
    const textNode = range.startContainer;
    const offset = range.startOffset;

    // If we're not in a text node, return null
    if (textNode.nodeType !== Node.TEXT_NODE) {
      return null;
    }

    const text = textNode.textContent || "";

    // Find word boundaries around the offset
    let start = offset;
    let end = offset;

    // Find the start of the word
    while (start > 0 && !/\s/.test(text[start - 1])) {
      start--;
    }

    // Find the end of the word
    while (end < text.length && !/\s/.test(text[end])) {
      end++;
    }

    // Extract the word
    const word = text.substring(start, end).trim();

    return word || null;
  }

  // Function to get the entire line from an element
  function getLineFromElement(
    element: HTMLElement
  ): string | null {
    // Get all text content from the element
    const fullText = element.innerText || "";

    // For paragraph elements, return the whole text
    return fullText.trim() || null;
  }

  // Handle single click - reads the line
  function handleSingleClick(event: MouseEvent) {
    // Don't trigger on interactive elements or if modal is open
    if (isModalOpen) {
      return;
    }

    // Check if clicking on modal or interactive elements
    const target = event.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A" ||
      target.closest(".modal-content")
    ) {
      return;
    }

    // Check for text selection first
    let selectedText = document.getSelection()?.toString();
    if (selectedText && selectedText.trim()) {
      text = selectedText;
      console.log(
        "Selected text (single click):",
        selectedText.substring(0, 50) +
          (selectedText.length > 50 ? "..." : "")
      );
    } else {
      // Get the line from the clicked element
      const lineText = getLineFromElement(target);
      if (lineText) {
        text = lineText;
        console.log(
          "Reading line (single click):",
          lineText.substring(0, 50) +
            (lineText.length > 50 ? "..." : "")
        );
      } else {
        return; // No text to read
      }
    }

    if (isSpeakingMode) {
      // Cancel any ongoing speech
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
      speak();
    }
  }

  // Handle double click - reads the word
  function handleDoubleClick(event: MouseEvent) {
    // Don't trigger on interactive elements or if modal is open
    if (isModalOpen) {
      return;
    }

    // Check if clicking on modal or interactive elements
    const target = event.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A" ||
      target.closest(".modal-content")
    ) {
      return;
    }

    // Check for text selection first
    let selectedText = document.getSelection()?.toString();
    if (selectedText && selectedText.trim()) {
      text = selectedText;
      console.log(
        "Selected text (double click):",
        selectedText
      );
    } else {
      // Get word under cursor
      const word = getWordUnderCursor(event);
      if (word) {
        text = word;
        console.log("Reading word (double click):", word);
      } else {
        // Fallback to element text if word detection fails
        const elementText = (
          event.target as HTMLElement
        ).innerText?.trim();
        if (elementText) {
          text = elementText;
          console.log(
            "Element text (double click):",
            elementText.substring(0, 50) +
              (elementText.length > 50 ? "..." : "")
          );
        } else {
          return; // No text to read
        }
      }
    }

    if (isSpeakingMode) {
      // Cancel any ongoing speech
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
      speak();
    }
  }

  // Unified click handler to distinguish between single and double click
  function handleClick(event: MouseEvent) {
    // Clear any existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    // Check if this is a double click
    if (lastClickTarget === event.target) {
      // This is a double click
      lastClickTarget = null;
      handleDoubleClick(event);
    } else {
      // This might be a single click, wait to see if it becomes a double click
      lastClickTarget = event.target;

      clickTimeout = setTimeout(() => {
        // If no double click occurred, handle as single click
        if (lastClickTarget === event.target) {
          handleSingleClick(event);
        }
        lastClickTarget = null;
        clickTimeout = null;
      }, DOUBLE_CLICK_DELAY);
    }
  }

  // Hover handler - reads the entire line after 500ms
  function handleLineHover(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Don't trigger on interactive elements or if modal is open
    if (
      isModalOpen ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A" ||
      target.closest(".modal-content")
    ) {
      return;
    }

    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Store the current hover element
    currentHoverElement = target;

    // Set new timeout to read the line
    hoverTimeout = setTimeout(() => {
      if (
        currentHoverElement === target &&
        isSpeakingMode
      ) {
        // Get the line from the hovered element
        const lineText = getLineFromElement(target);

        if (lineText) {
          // Cancel any ongoing speech
          if (isSpeaking) {
            window.speechSynthesis.cancel();
          }

          text = lineText;
          console.log(
            "Reading line (hover):",
            lineText.substring(0, 50) +
              (lineText.length > 50 ? "..." : "")
          );
          speak();
        }
      }
    }, 500); // 500ms delay before reading
  }

  // Clear hover timeout when mouse leaves
  function handleMouseLeave(event: MouseEvent) {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    currentHoverElement = null;
  }

  function toggleReadAloud() {
    isSpeakingMode = !isSpeakingMode;
    isModalOpen = isSpeakingMode; // Open modal when activated

    // Clear any pending timeouts when toggling mode
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
    }
    lastClickTarget = null;

    console.log(
      "Read Aloud:",
      isSpeakingMode ? "Activated" : "Deactivated"
    );
  }

  function closeModal(event) {
    if (event.target.classList.contains("modal-backdrop")) {
      isModalOpen = false;
      // Don't deactivate speaking mode when closing modal
      // isSpeakingMode remains true
    }
  }
</script>

<!-- Floating Button - Simple on/off toggle -->
<div
  class="translate-icon floating-share {isSpeakingMode
    ? 'active'
    : ''}"
  id="translate-icon"
  on:click={toggleReadAloud}
  on:keypress={toggleReadAloud}
  aria-label={isSpeakingMode
    ? "Deactivate Read Aloud"
    : "Activate Read Aloud"}
  role="button"
  tabindex="0"
>
  <img
    src="/icons/voice.png"
    alt="Read Aloud Automatically Language Detection"
  />
  <span class="status-indicator"
    >{isSpeakingMode ? "ON-a" : "OFF-a"}</span
  >
</div>

<!-- Modal Backdrop - Only shows controls when activated -->
{#if isModalOpen}
  <div
    class="modal-backdrop"
    on:click={closeModal}
    on:keydown={closeModal}
    aria-label="modal overlay"
    role="button"
    tabindex="0"
  >
    <div class="modal-content">
      <!-- Interaction hints for reading gestures -->
      <div class="interaction-hints">
        <span
          class="hint"
          title="Click anywhere on the text"
        >
          <span class="hint-icon">👆</span>
          <span class="hint-text"
            >One click: reads entire line</span
          >
        </span>
        <span class="hint" title="Double-click any word">
          <span class="hint-icon">👆👆</span>
          <span class="hint-text"
            >Two clicks over a word: reads the word</span
          >
        </span>
      </div>

      <div class="floating-controls">
        <div
          class="language-indicator"
          title="Automatically detected"
        >
          🌐 {detectedLanguageName} ({currentLanguage.toUpperCase()})
        </div>

        <button
          on:click={speak}
          class="control-button primary"
        >
          <span class="button-icon"
            >{isSpeaking ? "⏹️" : "🔊"}</span
          >
          {isSpeaking ? "Stop" : "Read Aloud"}
        </button>
        <button
          on:click={pauseResume}
          disabled={!isSpeaking}
          class="control-button"
        >
          <span class="button-icon"
            >{isPaused ? "▶️" : "⏸️"}</span
          >
          {isPaused ? "Resume" : "Pause"}
        </button>

        <div class="speed-control">
          <label for="speed" class="speed-label">
            <span class="speed-icon">⚡</span> Speed
          </label>
          <input
            id="speed"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            bind:value={rate}
            class="speed-slider"
          />
          <span class="speed-value">{rate}x</span>
        </div>

        <div
          class="voice-info"
          title="Auto-selected based on language"
        >
          <span class="voice-icon">🎤</span>
          <span class="voice-text"
            >Auto Voice ({detectedLanguageName})</span
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<svelte:window on:click={handleClick} />

<style>
  /* Interaction hints styling */
  .interaction-hints {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    padding: 16px;
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    border-radius: 16px;
    color: white;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hint {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    backdrop-filter: blur(4px);
    transition:
      transform 0.2s,
      background 0.2s;
    cursor: help;
  }

  .hint:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.3);
  }

  .hint-icon {
    font-size: 24px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .hint-text {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  /* Floating Button */
  .floating-share {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 40px;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;
    z-index: 1000;
    font-size: 24px;
    line-height: 1;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .floating-share.active {
    background: #4caf50; /* Green when active */
    box-shadow: 0 0 15px #4caf50;
  }

  .floating-share:hover {
    background: var(--hover-background-color, #333);
  }

  .floating-share.active:hover {
    background: #45a049;
  }

  #translate-icon img {
    width: 24px;
    height: 24px;
    filter: var(--icon-filter, none);
  }

  .status-indicator {
    font-size: 10px;
    font-weight: bold;
  }

  /* Modal Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Modal Content */
  .modal-content {
    background: var(--background-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 250px;
  }

  .floating-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .language-indicator {
    text-align: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    font-weight: bold;
    font-size: 14px;
  }

  .voice-info {
    text-align: center;
    padding: 5px;
    color: #666;
    font-size: 12px;
    font-style: italic;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.2s;
  }

  button:hover {
    background: #0056b3;
  }

  button:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  select,
  input {
    width: 100%;
    padding: 5px;
    background: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 3px;
  }
</style>
