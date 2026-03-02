import logging
from typing import Any, Dict, List, Optional, Tuple

from deep_translator import GoogleTranslator
from kiwipiepy import Token  # Import Token type for better type hints
from kiwipiepy import Kiwi

logger = logging.getLogger(__name__)


class KoreanSentenceAnalyzer:
    def __init__(self):
        # Initialize Kiwi for morphological analysis
        try:
            self.kiwi = Kiwi()
            logger.info("Successfully initialized Kiwi analyzer")
        except Exception as e:
            logger.error(f"Failed to initialize Kiwi: {e}")
            self.kiwi = None

        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="ko", target="en")
            logger.info("Successfully initialized Korean translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Translation cache
        self.translation_cache = {}

        # Korean consonants (자음) for romanization fallback
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

        # Korean vowels (모음) for romanization fallback
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

        # Korean final consonants (받침) for romanization fallback
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

    def analyze_sentence(self, sentence: str) -> List[Dict[str, Any]]:
        """Analyze Korean sentence with full syntactic information"""
        result = []

        if not self.kiwi:
            logger.error("Kiwi analyzer not available")
            return result

        try:
            # Analyze with Kiwi - returns list of tuples (tokens, score)
            analyses = self.kiwi.analyze(sentence)

            if not analyses:
                logger.warning("No analysis results returned")
                return result

            # Get the first analysis result (highest probability)
            # Each analysis is a tuple: (list_of_tokens, score)
            tokens_list, score = analyses[0]

            logger.debug(
                f"Analysis score: {score}, number of tokens: {len(tokens_list)}"
            )

            for token in tokens_list:
                # Kiwi Token objects have form, tag, start, end attributes
                word = token.form
                pos_tag = token.tag

                # Skip empty tokens
                if not word or word.isspace():
                    continue

                # Get translation
                translation = self._get_translation(word)

                # Determine syntax role based on POS tag
                syntax_role = self._map_pos_to_role(pos_tag)

                # Determine semantic category
                semantic_category = self._get_semantic_category(word)

                # Detect particles (for Korean)
                particle_info = self._detect_particle(word, pos_tag)

                # Get romanization
                transliteration = self._romanize(word)

                # Get morphological details
                morph_info = self._get_morphological_info(word, pos_tag)

                result.append(
                    {
                        "word": word,
                        "transliteration": transliteration,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": self._get_main_pos(pos_tag),
                        "detailed_pos": pos_tag,
                        "particle_type": (
                            particle_info.get("type", "NONE")
                            if particle_info
                            else "NONE"
                        ),
                        "particle": (
                            particle_info.get("particle", "") if particle_info else ""
                        ),
                        "verb_form": self._get_verb_form(word, pos_tag),
                        "honorific_level": self._get_honorific_level(word, pos_tag),
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                        "morphological_analysis": morph_info,
                        "start_position": token.start,
                        "end_position": token.end,
                    }
                )

        except Exception as e:
            logger.error(f"Error analyzing sentence: {e}", exc_info=True)

        # If no tokens were found, try a simple space-based split as fallback
        if not result:
            logger.warning("Kiwi analysis returned no tokens, using fallback splitting")
            result = self._fallback_analyze(sentence)

        return result

    def _fallback_analyze(self, sentence: str) -> List[Dict[str, Any]]:
        """Fallback analysis when Kiwi fails"""
        result = []
        words = sentence.split()

        for word in words:
            result.append(
                {
                    "word": word,
                    "transliteration": self._romanize(word),
                    "translation": self._get_translation(word),
                    "syntax_role": "UNKNOWN",
                    "part_of_speech": "UNKNOWN",
                    "detailed_pos": "UNKNOWN",
                    "particle_type": "NONE",
                    "particle": "",
                    "verb_form": "NONE",
                    "honorific_level": "PLAIN",
                    "is_punctuation": False,
                    "semantic_category": self._get_semantic_category(word),
                    "morphological_analysis": {
                        "morphemes": [],
                        "has_complex_tag": False,
                        "original_tag": "UNKNOWN",
                    },
                    "start_position": 0,
                    "end_position": 0,
                }
            )

        return result

    def _get_main_pos(self, pos_tag: str) -> str:
        """Extract main POS category from detailed tag"""
        if not pos_tag or pos_tag == "UNKNOWN":
            return "UNKNOWN"

        if "+" in pos_tag:
            # Handle combined tags like NNP+JKS
            main_tags = []
            for tag in pos_tag.split("+"):
                if tag.startswith(("NNG", "NNP", "NNB")):
                    main_tags.append("NOUN")
                elif tag.startswith(("VV", "VA")):
                    main_tags.append("VERB" if tag.startswith("VV") else "ADJECTIVE")
                elif tag.startswith("MAG"):
                    main_tags.append("ADVERB")
                elif tag.startswith("JKS"):
                    main_tags.append("PARTICLE")
                else:
                    main_tags.append(tag[:2])
            return "+".join(main_tags)

        # Single tag mapping
        if pos_tag.startswith(("NNG", "NNP", "NNB")):
            return "NOUN"
        elif pos_tag.startswith(("NP",)):
            return "PRONOUN"
        elif pos_tag.startswith(("NR",)):
            return "NUMERAL"
        elif pos_tag.startswith(("VV",)):
            return "VERB"
        elif pos_tag.startswith(("VA",)):
            return "ADJECTIVE"
        elif pos_tag.startswith(("MM", "MD")):
            return "DETERMINER"
        elif pos_tag.startswith(("MAG", "MAJ")):
            return "ADVERB"
        elif pos_tag.startswith(("IC",)):
            return "INTERJECTION"
        elif pos_tag.startswith(("JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ")):
            return "PARTICLE"
        elif pos_tag.startswith(("JC",)):
            return "CONJUNCTION"
        elif pos_tag.startswith(("EP", "EF", "EC", "ETN", "ETM")):
            return "ENDING"
        elif pos_tag.startswith(("XPN", "XSN", "XSV", "XSA")):
            return "AFFIX"
        else:
            return pos_tag[:2]

    def _map_pos_to_role(self, pos_tag: str) -> str:
        """Map Kiwi POS tag to syntax role"""
        if not pos_tag:
            return "OTHER"

        if pos_tag.startswith(("NNG", "NNP", "NNB")):
            return "NOUN"
        elif pos_tag.startswith(("NP", "NR")):
            return "PRONOUN" if pos_tag.startswith("NP") else "NUMERAL"
        elif pos_tag.startswith(("VV", "VA", "VX")):
            return "VERB" if pos_tag.startswith("VV") else "ADJECTIVE"
        elif pos_tag.startswith(("MM", "MD")):
            return "DETERMINER"
        elif pos_tag.startswith(("MAG", "MAJ")):
            return "ADVERB"
        elif pos_tag.startswith(("IC",)):
            return "INTERJECTION"
        elif pos_tag.startswith(("JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ")):
            return "PARTICLE"
        elif pos_tag.startswith(("JC",)):
            return "CONJUNCTION"
        else:
            return "OTHER"

    def _detect_particle(self, word: str, pos_tag: str) -> Optional[Dict[str, str]]:
        """Extract particle information from POS tag"""
        particle_mapping = {
            "JKS": "SUBJECT",
            "JKC": "COMPLEMENT",
            "JKG": "POSSESSIVE",
            "JKO": "OBJECT",
            "JKB": "ADVERBIAL",
            "JKV": "VOCATIVE",
            "JKQ": "QUOTATIVE",
            "JC": "CONJUNCTION",
            "JX": "AUXILIARY",
        }

        if "+" in pos_tag:
            # Check each part of combined tag
            for tag in pos_tag.split("+"):
                for josa_code, particle_type in particle_mapping.items():
                    if josa_code in tag:
                        # Extract the particle (usually the last character)
                        particle = word[-1] if len(word) > 1 else word
                        return {
                            "type": particle_type,
                            "particle": particle,
                            "code": josa_code,
                        }
        else:
            # Single tag
            for josa_code, particle_type in particle_mapping.items():
                if josa_code == pos_tag:
                    particle = word[-1] if len(word) > 1 else word
                    return {
                        "type": particle_type,
                        "particle": particle,
                        "code": josa_code,
                    }
        return None

    def _get_morphological_info(self, word: str, pos_tag: str) -> Dict[str, Any]:
        """Get detailed morphological information"""
        morphemes = []

        if "+" in pos_tag:
            tags = pos_tag.split("+")
            for tag in tags:
                morphemes.append({"tag": tag})

        return {
            "morphemes": morphemes,
            "has_complex_tag": "+" in pos_tag,
            "original_tag": pos_tag,
        }

    def _get_verb_form(self, word: str, pos_tag: str) -> str:
        """Determine verb form"""
        if "VV" in pos_tag or "VA" in pos_tag:
            if "EP" in pos_tag:
                if "았" in word or "었" in word:
                    return "PAST"
                elif "겠" in word:
                    return "FUTURE"
                else:
                    return "PROCESSIVE"
            elif "EF" in pos_tag:
                if "다" in word:
                    return "DICTIONARY"
                else:
                    return "CONJUGATED"
            elif "EC" in pos_tag:
                return "CONNECTIVE"
        return "NONE"

    def _get_honorific_level(self, word: str, pos_tag: str) -> str:
        """Determine honorific level"""
        if "SH" in pos_tag:  # Subject honorific suffix
            return "HONORIFIC"
        elif word.endswith("습니다") or word.endswith("ㅂ니다"):
            return "FORMAL_POLITE"
        elif word.endswith("요"):
            return "INFORMAL_POLITE"
        elif word in ["저", "제", "저희"]:
            return "HUMBLE"
        return "PLAIN"

    def _get_translation(self, word: str) -> str:
        """Get word translation with caching"""
        if not word or word.isspace():
            return ""

        if word in self.translation_cache:
            return self.translation_cache[word]

        if self.translator:
            try:
                translation = self.translator.translate(word)
                if translation and translation != word:
                    self.translation_cache[word] = translation
                    return translation
            except Exception as e:
                logger.debug(f"Translation error for '{word}': {e}")

        return ""

    def _romanize(self, word: str) -> str:
        """Romanize Korean text using decomposition fallback"""
        try:
            result = []
            for char in word:
                if self.is_hangul(char):
                    decomposed = self.decompose_hangul(char)
                    initial = self.consonants.get(decomposed["initial"], "")
                    medial = self.vowels.get(decomposed["medial"], "")
                    final = self.final_consonants.get(decomposed["final"], "")

                    romanized = initial + medial
                    if final:
                        romanized += final
                    result.append(romanized)
                else:
                    result.append(char)
            return " ".join(result)
        except Exception as e:
            logger.debug(f"Romanization error: {e}")
            return word

    def _get_semantic_category(self, word: str) -> str:
        """Determine semantic category based on word"""
        if not word:
            return "GENERAL"

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

    def translate_sentence(self, sentence: str) -> str:
        """Translate entire sentence"""
        if self.translator:
            try:
                return self.translator.translate(sentence)
            except Exception as e:
                logger.error(f"Sentence translation error: {e}")
        return ""
