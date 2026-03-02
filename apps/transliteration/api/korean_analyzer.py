import logging
import re
import unicodedata
from typing import Any, Dict, List, Optional

import hangul_romanize

# Korean processing libraries
from deep_translator import GoogleTranslator
from hangul_romanize import Transliter

logger = logging.getLogger(__name__)


class KoreanSentenceAnalyzer:
    def __init__(self):
        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="ko", target="en")
            logger.info("Successfully initialized Korean translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Initialize Hangul romanizer
        try:
            self.romanizer = Transliter()
            logger.info("Successfully initialized Hangul romanizer")
        except Exception as e:
            logger.error(f"Failed to initialize Hangul romanizer: {e}")
            self.romanizer = None

        # Translation cache
        self.translation_cache = {}

        # Korean punctuation
        self.punctuation_chars = {
            " ",
            ".",
            ",",
            "!",
            "?",
            ";",
            ":",
            "-",
            "—",
            "…",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            '"',
            "'",
            "«",
            "»",
            "·",
            "※",
            "∼",
            "～",
            "\n",
            "\r",
            "\t",
        }

        # Korean consonants (자음)
        self.consonants = {
            "ㄱ": "g",
            "ㄲ": "kk",
            "ㄴ": "n",
            "ㄷ": "d",
            "ㄸ": "tt",
            "ㄹ": "r/l",
            "ㅁ": "m",
            "ㅂ": "b",
            "ㅃ": "pp",
            "ㅅ": "s",
            "ㅆ": "ss",
            "ㅇ": "ng",
            "ㅈ": "j",
            "ㅉ": "jj",
            "ㅊ": "ch",
            "ㅋ": "k",
            "ㅌ": "t",
            "ㅍ": "p",
            "ㅎ": "h",
        }

        # Korean vowels (모음)
        self.vowels = {
            "ㅏ": "a",
            "ㅐ": "ae",
            "ㅑ": "ya",
            "ㅒ": "yae",
            "ㅓ": "eo",
            "ㅔ": "e",
            "ㅕ": "yeo",
            "ㅖ": "ye",
            "ㅗ": "o",
            "ㅘ": "wa",
            "ㅙ": "wae",
            "ㅚ": "oe",
            "ㅛ": "yo",
            "ㅜ": "u",
            "ㅝ": "wo",
            "ㅞ": "we",
            "ㅟ": "wi",
            "ㅠ": "yu",
            "ㅡ": "eu",
            "ㅢ": "ui",
            "ㅣ": "i",
        }

        # Korean final consonants (받침)
        self.final_consonants = {
            "ㄱ": "k",
            "ㄲ": "k",
            "ㄳ": "ks",
            "ㄴ": "n",
            "ㄵ": "nj",
            "ㄶ": "nh",
            "ㄷ": "t",
            "ㄸ": "t",
            "ㄹ": "l",
            "ㄺ": "lg",
            "ㄻ": "lm",
            "ㄼ": "lb",
            "ㄽ": "ls",
            "ㄾ": "lt",
            "ㄿ": "lp",
            "ㅀ": "lh",
            "ㅁ": "m",
            "ㅂ": "p",
            "ㅄ": "ps",
            "ㅅ": "t",
            "ㅆ": "t",
            "ㅇ": "ng",
            "ㅈ": "t",
            "ㅊ": "t",
            "ㅋ": "k",
            "ㅌ": "t",
            "ㅍ": "p",
            "ㅎ": "t",
        }

        # Korean particles (조사) - subject, topic, object markers
        self.particles = {
            "은": "TOPIC",
            "는": "TOPIC",
            "이": "SUBJECT",
            "가": "SUBJECT",
            "을": "OBJECT",
            "를": "OBJECT",
            "에": "LOCATION/TIME",
            "에서": "LOCATION",
            "으로": "DIRECTION",
            "로": "DIRECTION",
            "와": "AND",
            "과": "AND",
            "하고": "AND",
            "도": "ALSO",
            "만": "ONLY",
            "처럼": "LIKE",
            "보다": "THAN",
            "의": "POSSESSIVE",
            "께": "HONORIFIC_TO",
            "에게": "TO",
            "한테": "TO",
            "께서": "HONORIFIC_SUBJECT",
        }

        # Korean verb endings (어미)
        self.verb_endings = {
            "다": "DICTIONARY",
            "습니다": "FORMAL_POLITE",
            "ㅂ니다": "FORMAL_POLITE",
            "요": "INFORMAL_POLITE",
            "아요": "INFORMAL_POLITE",
            "어요": "INFORMAL_POLITE",
            "여요": "INFORMAL_POLITE",
            "았다": "PAST",
            "었다": "PAST",
            "였다": "PAST",
            "았어요": "PAST_POLITE",
            "었어요": "PAST_POLITE",
            "였어요": "PAST_POLITE",
            "겠": "FUTURE",
            "ㄹ": "FUTURE",
            "을": "FUTURE",
            "고": "AND",
            "면": "IF",
            "서": "SO/THEN",
            "니까": "BECAUSE",
            "지만": "BUT",
            "는데": "BUT/WHILE",
            "려고": "INTENTION",
            "러": "INTENTION",
        }

        # Common Korean words translation map
        self.translation_map = {
            # Pronouns
            "저": "I (humble)",
            "나": "I",
            "제": "my (humble)",
            "내": "my",
            "너": "you",
            "당신": "you",
            "그": "he",
            "그녀": "she",
            "우리": "we",
            "저희": "we (humble)",
            "너희": "you (plural)",
            "그들": "they",
            "이것": "this",
            "그것": "that",
            "저것": "that (over there)",
            "여기": "here",
            "거기": "there",
            "저기": "over there",
            # Common verbs
            "이다": "to be",
            "아니다": "to not be",
            "있다": "to exist/have",
            "없다": "to not exist",
            "하다": "to do",
            "되다": "to become",
            "가다": "to go",
            "오다": "to come",
            "먹다": "to eat",
            "마시다": "to drink",
            "보다": "to see/watch",
            "듣다": "to listen",
            "말하다": "to speak",
            "읽다": "to read",
            "쓰다": "to write/use",
            "배우다": "to learn",
            "알다": "to know",
            "모르다": "to not know",
            "생각하다": "to think",
            "좋아하다": "to like",
            "사랑하다": "to love",
            "주다": "to give",
            "받다": "to receive",
            "만나다": "to meet",
            "살다": "to live",
            "일하다": "to work",
            "공부하다": "to study",
            # Common nouns
            "사람": "person",
            "남자": "man",
            "여자": "woman",
            "아이": "child",
            "소년": "boy",
            "소녀": "girl",
            "집": "house",
            "학교": "school",
            "회사": "company",
            "일": "work",
            "책": "book",
            "물": "water",
            "음식": "food",
            "시간": "time",
            "날": "day",
            "밤": "night",
            "년": "year",
            "이름": "name",
            "도시": "city",
            "나라": "country",
            "세계": "world",
            "인생": "life",
            # Common adjectives
            "좋다": "good",
            "나쁘다": "bad",
            "크다": "big",
            "작다": "small",
            "새롭다": "new",
            "낡다": "old",
            "아름답다": "beautiful",
            "똑똑하다": "smart",
            "재미있다": "interesting",
            "어렵다": "difficult",
            "쉽다": "easy",
            "비싸다": "expensive",
            "싸다": "cheap",
            "덥다": "hot",
            "춥다": "cold",
            "많다": "many",
            "적다": "few",
            # Question words
            "무엇": "what",
            "누구": "who",
            "어디": "where",
            "언제": "when",
            "어떻게": "how",
            "왜": "why",
            "몇": "how many",
            "얼마": "how much",
            "어느": "which",
            # Adverbs
            "아주": "very",
            "매우": "very",
            "조금": "a little",
            "많이": "a lot",
            "자주": "often",
            "항상": "always",
            "가끔": "sometimes",
            "절대": "never",
            "빨리": "quickly",
            "천천히": "slowly",
            "같이": "together",
            "함께": "together",
            # Conjunctions
            "그리고": "and",
            "또는": "or",
            "하지만": "but",
            "그러나": "however",
            "왜냐하면": "because",
            "그래서": "so/therefore",
            "그런데": "but/however",
            "만약": "if",
            # Particles (for reference)
            "은": "(topic)",
            "는": "(topic)",
            "이": "(subject)",
            "가": "(subject)",
            "을": "(object)",
            "를": "(object)",
            "에": "at/to",
            "에서": "at/in/from",
            "으로": "to/toward",
            "와": "and/with",
            "과": "and/with",
            "도": "also/too",
            "만": "only",
            "의": "of",
        }

        # POS mapping
        self.pos_mapping = {
            "NOUN": "명사",
            "PRONOUN": "대명사",
            "VERB": "동사",
            "ADJECTIVE": "형용사",
            "ADVERB": "부사",
            "PARTICLE": "조사",
            "CONJUNCTION": "접속사",
            "INTERJECTION": "감탄사",
            "NUMERAL": "수사",
            "DETERMINER": "관형사",
            "SUFFIX": "접미사",
            "ROOT": "어근",
        }

        # Reverse mapping for English display
        self.pos_reverse = {v: k for k, v in self.pos_mapping.items()}

    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        return word in self.punctuation_chars

    def is_hangul(self, char: str) -> bool:
        """Check if character is Hangul"""
        if not char:
            return False
        code = ord(char)
        return 0xAC00 <= code <= 0xD7A3 or 0x3131 <= code <= 0x318E

    def decompose_hangul(self, syllable: str) -> Dict[str, str]:
        """Decompose a Hangul syllable into initial, medial, final"""
        if not syllable or not self.is_hangul(syllable):
            return {"initial": "", "medial": "", "final": ""}

        code = ord(syllable) - 0xAC00
        if code < 0:
            return {"initial": "", "medial": "", "final": ""}

        final = code % 28
        medial = ((code - final) // 28) % 21
        initial = ((code - final) // 28) // 21

        # Jamo mappings
        initials = [
            "ㄱ",
            "ㄲ",
            "ㄴ",
            "ㄷ",
            "ㄸ",
            "ㄹ",
            "ㅁ",
            "ㅂ",
            "ㅃ",
            "ㅅ",
            "ㅆ",
            "ㅇ",
            "ㅈ",
            "ㅉ",
            "ㅊ",
            "ㅋ",
            "ㅌ",
            "ㅍ",
            "ㅎ",
        ]
        medials = [
            "ㅏ",
            "ㅐ",
            "ㅑ",
            "ㅒ",
            "ㅓ",
            "ㅔ",
            "ㅕ",
            "ㅖ",
            "ㅗ",
            "ㅘ",
            "ㅙ",
            "ㅚ",
            "ㅛ",
            "ㅜ",
            "ㅝ",
            "ㅞ",
            "ㅟ",
            "ㅠ",
            "ㅡ",
            "ㅢ",
            "ㅣ",
        ]
        finals = [
            "",
            "ㄱ",
            "ㄲ",
            "ㄳ",
            "ㄴ",
            "ㄵ",
            "ㄶ",
            "ㄷ",
            "ㄹ",
            "ㄺ",
            "ㄻ",
            "ㄼ",
            "ㄽ",
            "ㄾ",
            "ㄿ",
            "ㅀ",
            "ㅁ",
            "ㅂ",
            "ㅄ",
            "ㅅ",
            "ㅆ",
            "ㅇ",
            "ㅈ",
            "ㅊ",
            "ㅋ",
            "ㅌ",
            "ㅍ",
            "ㅎ",
        ]

        return {
            "initial": initials[initial],
            "medial": medials[medial],
            "final": finals[final],
        }

    def detect_particle(self, word: str) -> Optional[str]:
        """Detect if word is a particle"""
        if word in self.particles:
            return self.particles[word]
        return None

    def get_verb_form(self, word: str) -> str:
        """Detect verb ending form"""
        for ending, form in self.verb_endings.items():
            if word.endswith(ending):
                return form
        return "DICTIONARY"

    def get_honorific_level(self, word: str, pos: str) -> str:
        """Determine honorific level in Korean"""
        if pos in ["VERB", "ADJECTIVE"]:
            if word.endswith(("습니다", "ㅂ니다")):
                return "FORMAL_POLITE"
            elif word.endswith("요"):
                return "INFORMAL_POLITE"
            elif "시" in word or "으시" in word:
                return "HONORIFIC"

        # Check for humble pronouns
        if word in ["저", "제", "저희"]:
            return "HUMBLE"

        return "PLAIN"

    def get_part_of_speech(self, word: str, context: Optional[str] = None) -> str:
        """Determine part of speech (simplified)"""
        # Check if it's a particle
        if word in self.particles:
            return "PARTICLE"

        # Check common patterns
        if word in self.translation_map:
            # Could be noun, verb, etc. - will refine later
            pass

        # Verb patterns (ends with 다 or has verb endings)
        if word.endswith("다") or any(
            word.endswith(ending) for ending in self.verb_endings
        ):
            # Check if it's adjective (often ends with 다 but descriptive)
            if word.endswith(("하다", "스럽다", "롭다")):
                return "ADJECTIVE"
            return "VERB"

        # Check for question words
        question_words = [
            "무엇",
            "누구",
            "어디",
            "언제",
            "어떻게",
            "왜",
            "몇",
            "얼마",
            "어느",
        ]
        if any(qw in word for qw in question_words):
            return "PRONOUN"

        # Default to noun
        return "NOUN"

    def get_syntax_role(
        self,
        word: str,
        pos: str,
        particle: Optional[str],
        index: int,
        sentence_length: int,
    ) -> str:
        """Determine syntactic role based on particle and position"""
        if particle:
            if particle in ["TOPIC"]:
                return "TOPIC"
            elif particle in ["SUBJECT"]:
                return "SUBJECT"
            elif particle in ["OBJECT"]:
                return "OBJECT"
            elif particle in ["LOCATION/TIME", "LOCATION"]:
                return "LOCATION"
            elif particle in ["DIRECTION"]:
                return "DIRECTION"
            elif particle in ["POSSESSIVE"]:
                return "POSSESSOR"
            elif particle in ["AND"]:
                return "CONJUNCTION"
            elif particle in ["ALSO", "ONLY"]:
                return "PARTICLE"
            return "MODIFIER"

        if pos == "VERB":
            if index >= sentence_length - 2:  # Verb often at end in Korean
                return "PREDICATE"
            return "VERB"
        elif pos == "ADJECTIVE":
            return "MODIFIER"
        elif pos == "ADVERB":
            return "MODIFIER"
        elif pos == "CONJUNCTION":
            return "CONJUNCTION"
        elif pos == "PRONOUN":
            if index == 0:
                return "SUBJECT"
            return "OBJECT"
        elif pos == "NOUN":
            if index == 0:
                return "SUBJECT"
            return "OBJECT"

        return "MODIFIER"

    def get_semantic_category(self, word: str) -> str:
        """Determine semantic category"""
        # Time words
        time_words = [
            "시간",
            "날",
            "밤",
            "년",
            "월",
            "일",
            "시",
            "분",
            "초",
            "아침",
            "저녁",
            "오늘",
            "내일",
            "어제",
        ]
        if any(tw in word for tw in time_words):
            return "TIME"

        # Location words
        location_words = [
            "집",
            "학교",
            "회사",
            "도시",
            "나라",
            "곳",
            "위치",
            "앞",
            "뒤",
            "옆",
            "안",
            "밖",
        ]
        if any(lw in word for lw in location_words):
            return "LOCATION"

        # Person words
        person_words = [
            "사람",
            "남자",
            "여자",
            "아이",
            "소년",
            "소녀",
            "어른",
            "친구",
            "가족",
            "엄마",
            "아빠",
        ]
        if any(pw in word for pw in person_words):
            return "PERSON"

        return "GENERAL"

    def get_transliteration(self, word: str) -> str:
        """Get romanization using hangul_romanize"""
        if self.is_punctuation(word) or not word:
            return ""

        try:
            if self.romanizer:
                # Try different possible method names for Transliter
                if hasattr(self.romanizer, "translit"):
                    return self.romanizer.translit(word)
                elif hasattr(self.romanizer, "romanize"):
                    return self.romanizer.romanize(word)
                elif hasattr(self.romanizer, "translate"):
                    return self.romanizer.translate(word)
                else:
                    # If no suitable method found, use fallback
                    logger.debug(f"No romanization method found, using fallback")
                    return self._fallback_romanization(word)
            else:
                # Fallback to simple decomposition
                return self._fallback_romanization(word)
        except Exception as e:
            logger.debug(f"Transliteration error for '{word}': {e}")
            return self._fallback_romanization(word)

    def _fallback_romanization(self, word: str) -> str:
        """Fallback romanization method using decomposition"""
        try:
            result = []
            for char in word:
                if self.is_hangul(char):
                    decomposed = self.decompose_hangul(char)
                    initial = self.consonants.get(decomposed["initial"], "")
                    medial = self.vowels.get(decomposed["medial"], "")
                    final = self.final_consonants.get(decomposed["final"], "")

                    # Combine with proper formatting
                    romanized = initial + medial
                    if final:
                        romanized += final
                    result.append(romanized)
                else:
                    result.append(char)
            return " ".join(result)
        except Exception as e:
            logger.debug(f"Fallback romanization error: {e}")
            return word

    def get_word_translation(self, word: str) -> str:
        """Get translation with caching"""
        # Check translation map
        if word in self.translation_map:
            return self.translation_map[word]

        # Check cache
        if word in self.translation_cache:
            return self.translation_cache[word]

        # Skip punctuation
        if self.is_punctuation(word):
            return ""

        # Use Google Translate
        if self.translator:
            try:
                translated = self.translator.translate(word)
                if translated and translated != word:
                    self.translation_cache[word] = translated
                    return translated
            except Exception as e:
                logger.debug(f"Translation error for '{word}': {e}")

        return ""

    def translate_sentence(self, sentence: str) -> str:
        """Translate entire sentence"""
        try:
            return self.translator.translate(sentence)
        except Exception as e:
            logger.error(f"Sentence translation error: {e}")
            return ""

    def analyze_sentence(self, sentence: str) -> List[Dict[str, Any]]:
        """Analyze a Korean sentence and return detailed word information"""
        result = []

        try:
            # Clean and split text
            words = sentence.split()
            sentence_length = len(words)

            for i, word in enumerate(words):
                # Skip punctuation-only words
                if self.is_punctuation(word):
                    continue

                # Determine part of speech
                pos = self.get_part_of_speech(word)

                # Check for particle
                particle_type = "NONE"
                particle = self.detect_particle(word)
                if particle:
                    particle_type = particle

                # Get verb form if applicable
                verb_form = "NONE"
                if pos in ["VERB", "ADJECTIVE"]:
                    verb_form = self.get_verb_form(word)

                # Get honorific level
                honorific_level = self.get_honorific_level(word, pos)

                # Get syntax role
                syntax_role = self.get_syntax_role(
                    word, pos, particle, i, sentence_length
                )

                # Get semantic category
                semantic_category = self.get_semantic_category(word)

                # Get transliteration
                transliteration = self.get_transliteration(word)

                # Get translation
                translation = self.get_word_translation(word)

                # Decompose Hangul for additional info
                decomposition = {}
                if any(self.is_hangul(char) for char in word):
                    for char in word:
                        if self.is_hangul(char):
                            decomposition[char] = self.decompose_hangul(char)

                # Log for debugging
                logger.debug(
                    f"Word: {word}, POS: {pos}, Particle: {particle}, Verb Form: {verb_form}"
                )

                result.append(
                    {
                        "word": word,
                        "transliteration": transliteration,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": pos,
                        "particle_type": particle_type,
                        "verb_form": verb_form,
                        "honorific_level": honorific_level,
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                        "decomposition": decomposition,
                    }
                )

        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)

        return result
