<script lang="ts">
  import { onMount } from "svelte";

  let utterance: SpeechSynthesisUtterance;
  let isSpeaking = false;
  let isPaused = false;
  let text = "";
  let voices = [];
  let rate = 1.0;
  let isSpeakingMode = false;
  let hoverTimeout: NodeJS.Timeout;
  let currentHoverElement: HTMLElement | null = null;
  let clickTimeout: NodeJS.Timeout;
  let lastClickTarget: EventTarget | null = null;
  const DOUBLE_CLICK_DELAY = 300; // ms

  // Language detection
  let currentLanguage = "en";
  let detectedLanguageName = "English";

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
    console.log(
      "Available voices:",
      voices.map((v) => `${v.name} (${v.lang})`)
    );
  }

  // Detect language from text
  function detectLanguage(text: string): string {
    if (!text || text.trim().length === 0) return "en";

    const sample = text.substring(0, 300);
    let scores = {};

    // Initialize scores
    Object.keys(languagePatterns).forEach((lang) => {
      scores[lang] = 0;
    });

    // First, detect script type
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

      // Check each pattern
      for (let pattern of config.patterns) {
        const matches = (sample.match(pattern) || [])
          .length;
        patternMatches += matches * (config.weight || 1.0);
      }

      // Special handling for CJK languages
      if (config.script === "cjk") {
        if (lang === "ja") {
          if (hasCJK && /[ぁ-んァ-ン]/.test(sample)) {
            patternMatches += 10;
          }
          if (/[はがをにへでと]/.test(sample)) {
            patternMatches += 5;
          }
        } else if (lang === "zh") {
          if (hasCJK && !/[ぁ-んァ-ン]/.test(sample)) {
            patternMatches += 10;
          }
          if (/[，。、《》]/.test(sample)) {
            patternMatches += 3;
          }
        } else if (lang === "ko") {
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
        for (let word of words) {
          for (let pattern of config.patterns) {
            if (pattern.test(word)) {
              patternMatches += 2;
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

      if (detectedLang === "en" && secondLang === "es") {
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
        if (/[ぁ-んァ-ン]/.test(sample)) {
          detectedLang = "ja";
        } else {
          detectedLang = "zh";
        }
      }
    }

    // Fallback for Latin script with no strong matches
    if (highestScore === 0 && /[a-zA-Z]/.test(sample)) {
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
          "🔊 Using voice:",
          selectedVoice.name,
          "for",
          detectedLanguageName
        );
      } else {
        console.log(
          "🔊 No specific voice found, using default"
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

    if (
      !target ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A"
    ) {
      return null;
    }

    const range = document.caretRangeFromPoint(
      event.clientX,
      event.clientY
    );

    if (!range) return null;

    const textNode = range.startContainer;
    const offset = range.startOffset;

    if (textNode.nodeType !== Node.TEXT_NODE) {
      return null;
    }

    const text = textNode.textContent || "";

    let start = offset;
    let end = offset;

    while (start > 0 && !/\s/.test(text[start - 1])) {
      start--;
    }

    while (end < text.length && !/\s/.test(text[end])) {
      end++;
    }

    const word = text.substring(start, end).trim();

    return word || null;
  }

  // Function to get the entire line from an element
  function getLineFromElement(
    element: HTMLElement
  ): string | null {
    const fullText = element.innerText || "";
    return fullText.trim() || null;
  }

  // Handle single click - reads the line
  function handleSingleClick(event: MouseEvent) {
    // Don't trigger if feature is off
    if (!isSpeakingMode) {
      return;
    }

    const target = event.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A"
    ) {
      return;
    }

    let selectedText = document.getSelection()?.toString();
    if (selectedText && selectedText.trim()) {
      text = selectedText;
      console.log(
        "📝 Selected text:",
        selectedText.substring(0, 50) +
          (selectedText.length > 50 ? "..." : "")
      );
    } else {
      const lineText = getLineFromElement(target);
      if (lineText) {
        text = lineText;
        console.log(
          "📖 Reading line:",
          lineText.substring(0, 50) +
            (lineText.length > 50 ? "..." : "")
        );
      } else {
        return;
      }
    }

    // Cancel any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    speak();
  }

  // Handle double click - reads the word
  function handleDoubleClick(event: MouseEvent) {
    // Don't trigger if feature is off
    if (!isSpeakingMode) {
      return;
    }

    const target = event.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A"
    ) {
      return;
    }

    let selectedText = document.getSelection()?.toString();
    if (selectedText && selectedText.trim()) {
      text = selectedText;
      console.log("📝 Selected text:", selectedText);
    } else {
      const word = getWordUnderCursor(event);
      if (word) {
        text = word;
        console.log("🔤 Reading word:", word);
      } else {
        const elementText = (
          event.target as HTMLElement
        ).innerText?.trim();
        if (elementText) {
          text = elementText;
          console.log(
            "📄 Element text:",
            elementText.substring(0, 50) +
              (elementText.length > 50 ? "..." : "")
          );
        } else {
          return;
        }
      }
    }

    // Cancel any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    speak();
  }

  // Unified click handler
  function handleClick(event: MouseEvent) {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    if (lastClickTarget === event.target) {
      lastClickTarget = null;
      handleDoubleClick(event);
    } else {
      lastClickTarget = event.target;

      clickTimeout = setTimeout(() => {
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
    // Don't trigger if feature is off
    if (!isSpeakingMode) {
      return;
    }

    const target = event.target as HTMLElement;

    if (
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A"
    ) {
      return;
    }

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    currentHoverElement = target;

    hoverTimeout = setTimeout(() => {
      if (
        currentHoverElement === target &&
        isSpeakingMode
      ) {
        const lineText = getLineFromElement(target);

        if (lineText) {
          if (isSpeaking) {
            window.speechSynthesis.cancel();
          }

          text = lineText;
          console.log(
            "👆 Hover reading:",
            lineText.substring(0, 50) +
              (lineText.length > 50 ? "..." : "")
          );
          speak();
        }
      }
    }, 500);
  }

  function handleMouseLeave() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    currentHoverElement = null;
  }

  function toggleReadAloud() {
    isSpeakingMode = !isSpeakingMode;

    // Cancel any ongoing speech when turning off
    if (!isSpeakingMode && isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      isPaused = false;
    }

    // Clear any pending timeouts
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
      "🎯 Read Aloud:",
      isSpeakingMode ? "ON" : "OFF"
    );
  }
</script>

<!-- Simple On/Off Button -->
<div
  class="read-aloud-button {isSpeakingMode ? 'active' : ''}"
  on:click={toggleReadAloud}
  on:keypress={toggleReadAloud}
  aria-label={isSpeakingMode
    ? "Turn off Read Aloud"
    : "Turn on Read Aloud"}
  role="button"
  tabindex="0"
  title={isSpeakingMode
    ? `Active - ${detectedLanguageName}`
    : "Click to activate"}
>
  <div
    class="translate-icon floating-share"
    id="translate-icon"
    aria-label="Read Aloud"
    role="button"
    tabindex="0"
  >
    <img src="/icons/voice.png" alt="Read Aloud" />
    <!-- <span class="status"
      >{isSpeakingMode ? "ON" : "OFF"}</span
    > -->
  </div>
</div>

<svelte:window on:click={handleClick} />

<style>
  .read-aloud-button {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;
    z-index: 1000;
    font-size: 24px;
    line-height: 1;
    border: none;
  }

  #translate-icon img {
    width: 24px;
    height: 24px;
    filter: var(--icon-filter, none);
    /* background: var(--background-color, #000); */
  }

  .read-aloud-button:hover {
    background: var(--hover-background-color, #333);
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  .read-aloud-button.active {
    background: #c2e8c4;
    border-color: #fff;
    box-shadow: 0 0 20px #4caf50;
  }

  .read-aloud-button.active:hover {
    background: #45a049;
  }

  .icon {
    font-size: 24px;
    gap: 8px;
  }

  .status {
    font-size: 10px;
    padding: 2px;
    font-weight: bold;
    letter-spacing: 0.5px;
    /* display: none; */
  }

  /* Optional: Add a subtle tooltip on hover */
  .read-aloud-button::after {
    content: attr(title);
    position: absolute;
    bottom: 40px;
    right: 50px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    margin-bottom: 8px;
  }

  .read-aloud-button:hover::after {
    opacity: 1;
    position: fixed;
    bottom: 40px;
    right: 50px;
  }

  /* Mobile optimization */
  @media (max-width: 768px) {
    .read-aloud-button {
      bottom: 60px;
      right: 15px;
      padding: 10px 14px;
    }

    .status {
      display: none; /* Hide text on mobile, just show icon */
    }
  }
</style>
