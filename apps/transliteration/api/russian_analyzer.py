import logging
import re
import unicodedata
from typing import Any, Dict, List, Optional

# Arabic processing libraries
import arabic_reshaper
import pyarabic.araby as araby
from bidi.algorithm import get_display
from deep_translator import GoogleTranslator
from pyarabic import araby

logger = logging.getLogger(__name__)


class ArabicSentenceAnalyzer:
    def __init__(self):
        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="ar", target="en")
            logger.info("Successfully initialized Arabic translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Translation cache
        self.translation_cache = {}

        # Arabic punctuation
        self.punctuation_chars = {
            " ",
            ".",
            ",",
            "!",
            "?",
            ";",
            ":",
            "،",
            "؛",
            "؟",
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
            "-",
            "—",
            "…",
            "\n",
            "\r",
            "\t",
        }

        # Arabic diacritics (Harakat)
        self.diacritics = {
            "َ": "FATHA",
            "ِ": "KASRA",
            "ُ": "DAMMA",
            "ْ": "SUKUN",
            "ً": "FATHATAN",
            "ٍ": "KASRATAN",
            "ٌ": "DAMMATAN",
            "ّ": "SHADDA",
        }

        # Arabic letter groups
        self.sun_letters = set("ت ث د ذ ر ز س ش ص ض ط ظ ل ن")
        self.moon_letters = set("ا ب ج ح خ ع غ ف ق ك م ه و ي")

        # Common Arabic words translation map
        self.translation_map = {
            # Pronouns
            "أنا": "I",
            "أنت": "you (m)",
            "أنتِ": "you (f)",
            "هو": "he",
            "هي": "she",
            "نحن": "we",
            "أنتم": "you (pl)",
            "هم": "they",
            "هذا": "this",
            "هذه": "this (f)",
            "ذلك": "that",
            "تلك": "that (f)",
            # Common verbs
            "كان": "was",
            "يكون": "is",
            "أصبح": "became",
            "قال": "said",
            "ذهب": "went",
            "جاء": "came",
            "رأى": "saw",
            "عمل": "worked",
            "قرأ": "read",
            "كتب": "wrote",
            "تكلم": "spoke",
            "فهم": "understood",
            "أكل": "ate",
            "شرب": "drank",
            # Common nouns
            "رجل": "man",
            "امرأة": "woman",
            "طفل": "child",
            "بنت": "girl",
            "ولد": "boy",
            "بيت": "house",
            "مدرسة": "school",
            "جامعة": "university",
            "كتاب": "book",
            "قلم": "pen",
            "ماء": "water",
            "طعام": "food",
            "وقت": "time",
            "يوم": "day",
            "ليلة": "night",
            "ساعة": "hour",
            "دقيقة": "minute",
            # Prepositions
            "في": "in",
            "على": "on",
            "إلى": "to",
            "من": "from",
            "عن": "about",
            "مع": "with",
            "بين": "between",
            "تحت": "under",
            "فوق": "above",
            "أمام": "in front of",
            "خلف": "behind",
            "بجانب": "beside",
            # Question words
            "ماذا": "what",
            "من": "who",
            "أين": "where",
            "متى": "when",
            "كيف": "how",
            "لماذا": "why",
            "كم": "how much/many",
            # Common particles
            "ال": "the",
            "و": "and",
            "ف": "then/so",
            "ثم": "then",
            "أو": "or",
            "لكن": "but",
            "إن": "if",
            "أن": "that",
            "قد": "may/might",
            "سوف": "will",
            "لم": "did not",
            "لن": "will not",
            "لا": "no/not",
            "نعم": "yes",
        }

        # POS mapping (simplified Arabic parts of speech)
        self.pos_mapping = {
            "NOUN": "اسم",
            "VERB": "فعل",
            "PRONOUN": "ضمير",
            "ADJECTIVE": "صفة",
            "ADVERB": "ظرف",
            "PREPOSITION": "حرف جر",
            "CONJUNCTION": "حرف عطف",
            "PARTICLE": "حرف",
            "INTERJECTION": "أداة تعجب",
            "NUMERAL": "عدد",
        }

        # Reverse mapping for English display
        self.pos_reverse = {v: k for k, v in self.pos_mapping.items()}

    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        return word in self.punctuation_chars

    def has_diacritics(self, word: str) -> bool:
        """Check if word has Arabic diacritics"""
        return any(char in self.diacritics for char in word)

    def remove_diacritics(self, word: str) -> str:
        """Remove Arabic diacritics from word"""
        return araby.strip_diacritics(word)

    def get_base_word(self, word: str) -> str:
        """Get base word without diacritics"""
        return self.remove_diacritics(word)

    def detect_alef_lam(self, word: str) -> Optional[str]:
        """Detect if word starts with definite article ال"""
        if word.startswith("ال"):
            return "DEFINITE"
        elif word.startswith("لل"):
            return "DEFINITE_PLUS"
        return None

    def get_word_type(self, word: str) -> str:
        """Determine basic word type in Arabic"""
        base = self.remove_diacritics(word)

        # Check for definite article
        if base.startswith("ال"):
            return "DEFINITE_NOUN"

        # Check for common patterns
        if len(base) >= 3:
            # Verb patterns (simplified)
            if base[0] in "أي" and base[-1] in "وا":
                return "VERB"
            if base.endswith("وا"):
                return "PLURAL_VERB"

        return "NOUN"  # Default

    def get_gender(self, word: str) -> str:
        """Guess gender of Arabic word"""
        base = self.remove_diacritics(word)
        if base.endswith("ة") or base.endswith("ه"):
            return "FEMININE"
        return "MASCULINE"

    def get_number(self, word: str) -> str:
        """Guess number of Arabic word"""
        base = self.remove_diacritics(word)
        if base.endswith("ون") or base.endswith("ين"):
            return "PLURAL"
        if base.endswith("ان"):
            return "DUAL"
        return "SINGULAR"

    def get_grammatical_case(self, word: str) -> str:
        """Guess grammatical case based on ending"""
        base = self.remove_diacritics(word)
        if base.endswith("ٌ") or base.endswith("ُ"):
            return "NOMINATIVE"
        elif base.endswith("ٍ") or base.endswith("ِ"):
            return "GENITIVE"
        elif base.endswith("ً") or base.endswith("َ"):
            return "ACCUSATIVE"
        return "UNKNOWN"

    def get_part_of_speech(self, word: str, context: Optional[str] = None) -> str:
        """Determine part of speech (simplified)"""
        base = self.remove_diacritics(word)

        # Common patterns
        if base in ["في", "على", "إلى", "من", "عن", "مع", "بين"]:
            return "PREPOSITION"
        elif base in ["و", "ف", "ثم", "أو", "لكن"]:
            return "CONJUNCTION"
        elif base in ["هل", "أ", "ماذا", "من", "أين", "متى", "كيف", "لماذا"]:
            return "QUESTION"
        elif base in ["لم", "لن", "لا", "ما", "إن"]:
            return "PARTICLE"
        elif base in ["أنا", "أنت", "هو", "هي", "نحن", "أنتم", "هم"]:
            return "PRONOUN"

        # Check for verb patterns
        if len(base) >= 3:
            if base[0] in "أي" and base[-1] in "ا":
                return "VERB"
            if base[-2:] in ["وا", "تن"]:
                return "VERB"

        # Default to noun
        return "NOUN"

    def get_syntax_role(
        self, word: str, pos: str, index: int, sentence_length: int
    ) -> str:
        """Determine syntactic role"""
        # Basic role assignment based on position and POS
        if pos == "PRONOUN":
            if index == 0:
                return "SUBJECT"
            return "OBJECT"
        elif pos == "PREPOSITION":
            return "PREPOSITION"
        elif pos == "CONJUNCTION":
            return "CONJUNCTION"
        elif pos == "VERB":
            if index < sentence_length / 2:
                return "PREDICATE"
            return "VERB"
        elif pos == "NOUN":
            if index == 0:
                return "SUBJECT"
            elif index < sentence_length - 1:
                return "OBJECT"
            return "MODIFIER"
        elif pos == "QUESTION":
            return "QUESTION"

        return "MODIFIER"

    def get_semantic_category(self, word: str) -> str:
        """Determine semantic category"""
        base = self.remove_diacritics(word)

        # Time words
        time_words = [
            "وقت",
            "يوم",
            "ليلة",
            "ساعة",
            "دقيقة",
            "ثانية",
            "شهر",
            "سنة",
            "عام",
        ]
        if any(tw in base for tw in time_words):
            return "TIME"

        # Location words
        location_words = [
            "مكان",
            "بيت",
            "مدرسة",
            "جامعة",
            "مسجد",
            "شارع",
            "مدينة",
            "قرية",
        ]
        if any(lw in base for lw in location_words):
            return "LOCATION"

        # Person words
        person_words = ["رجل", "امرأة", "طفل", "بنت", "ولد", "أم", "أب", "أخ", "أخت"]
        if any(pw in base for pw in person_words):
            return "PERSON"

        return "GENERAL"

    def get_transliteration(self, word: str) -> str:
        """Get transliteration (simplified romanization)"""
        if self.is_punctuation(word) or not word:
            return ""

        # Simple character mapping for transliteration
        translit_map = {
            "ا": "a",
            "ب": "b",
            "ت": "t",
            "ث": "th",
            "ج": "j",
            "ح": "ḥ",
            "خ": "kh",
            "د": "d",
            "ذ": "dh",
            "ر": "r",
            "ز": "z",
            "س": "s",
            "ش": "sh",
            "ص": "ṣ",
            "ض": "ḍ",
            "ط": "ṭ",
            "ظ": "ẓ",
            "ع": "ʿ",
            "غ": "gh",
            "ف": "f",
            "ق": "q",
            "ك": "k",
            "ل": "l",
            "م": "m",
            "ن": "n",
            "ه": "h",
            "و": "w",
            "ي": "y",
            "ء": "'",
            "آ": "ā",
            "ة": "t",
            "ى": "ā",
            "لا": "lā",
            "َ": "a",
            "ِ": "i",
            "ُ": "u",
            "ْ": "",
            "ً": "an",
            "ٍ": "in",
            "ٌ": "un",
            "ّ": "",
            "٠": "0",
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
        }

        result = []
        for char in word:
            if char in translit_map:
                result.append(translit_map[char])
            else:
                result.append(char)

        return "".join(result)

    def reshape_for_display(self, text: str) -> str:
        """Reshape Arabic text for proper display"""
        try:
            reshaped = arabic_reshaper.reshape(text)
            bidi_text = get_display(reshaped)
            return bidi_text
        except:
            return text

    def get_word_translation(self, word: str) -> str:
        """Get translation with caching"""
        base = self.remove_diacritics(word)

        # Check translation map
        if base in self.translation_map:
            return self.translation_map[base]

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
        """Analyze an Arabic sentence and return detailed word information"""
        result = []

        try:
            # Clean and normalize text
            # Remove extra spaces but keep words
            words = sentence.split()
            sentence_length = len(words)

            for i, word in enumerate(words):
                # Skip punctuation-only words
                if self.is_punctuation(word):
                    continue

                # Get base form (without diacritics)
                base = self.remove_diacritics(word)

                # Determine part of speech
                pos = self.get_part_of_speech(word)

                # Get additional morphological features
                word_type = self.get_word_type(word)
                gender = self.get_gender(base)
                number = self.get_number(base)
                grammatical_case = self.get_grammatical_case(word)
                has_diacritics = self.has_diacritics(word)
                definite = self.detect_alef_lam(base)

                # Get syntax role
                syntax_role = self.get_syntax_role(word, pos, i, sentence_length)

                # Get semantic category
                semantic_category = self.get_semantic_category(word)

                # Get transliteration
                transliteration = self.get_transliteration(word)

                # Get display form (reshaped for proper RTL display)
                display_form = self.reshape_for_display(word)

                # Get translation
                translation = self.get_word_translation(word)

                # Log for debugging
                logger.debug(
                    f"Word: {word}, POS: {pos}, Base: {base}, Gender: {gender}, Number: {number}"
                )

                result.append(
                    {
                        "word": word,
                        "base": base,
                        "display": display_form,
                        "transliteration": transliteration,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": pos,
                        "particle_type": "NONE",  # Arabic doesn't have particles like Japanese
                        "verb_form": "NONE",  # Will add verb forms later
                        "honorific_level": "PLAIN",
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                        "gender": gender,
                        "number": number,
                        "grammatical_case": grammatical_case,
                        "has_diacritics": has_diacritics,
                        "definite": definite if definite else "INDEFINITE",
                    }
                )

        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)

        return result
