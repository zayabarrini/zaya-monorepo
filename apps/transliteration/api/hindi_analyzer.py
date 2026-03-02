import logging
import re
import unicodedata
from typing import Any, Dict, List, Optional

import indic_transliteration

# Hindi processing libraries
from deep_translator import GoogleTranslator
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

logger = logging.getLogger(__name__)


class HindiSentenceAnalyzer:
    def __init__(self):
        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="hi", target="en")
            logger.info("Successfully initialized Hindi translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Translation cache
        self.translation_cache = {}

        # Hindi punctuation
        self.punctuation_chars = {
            " ",
            ".",
            ",",
            "!",
            "?",
            ";",
            ":",
            "।",
            "॥",
            "‘",
            "’",
            '"',
            "'",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "-",
            "—",
            "…",
            "\n",
            "\r",
            "\t",
        }

        # Hindi vowels (स्वर)
        self.vowels = {
            "अ": "a",
            "आ": "ā",
            "इ": "i",
            "ई": "ī",
            "उ": "u",
            "ऊ": "ū",
            "ऋ": "ṛ",
            "ए": "e",
            "ऐ": "ai",
            "ओ": "o",
            "औ": "au",
            "अं": "ṃ",
            "अः": "ḥ",
        }

        # Hindi consonants (व्यंजन)
        self.consonants = {
            "क": "ka",
            "ख": "kha",
            "ग": "ga",
            "घ": "gha",
            "ङ": "ṅa",
            "च": "ca",
            "छ": "cha",
            "ज": "ja",
            "झ": "jha",
            "ञ": "ña",
            "ट": "ṭa",
            "ठ": "ṭha",
            "ड": "ḍa",
            "ढ": "ḍha",
            "ण": "ṇa",
            "त": "ta",
            "थ": "tha",
            "द": "da",
            "ध": "dha",
            "न": "na",
            "प": "pa",
            "फ": "pha",
            "ब": "ba",
            "भ": "bha",
            "म": "ma",
            "य": "ya",
            "र": "ra",
            "ल": "la",
            "व": "va",
            "श": "śa",
            "ष": "ṣa",
            "स": "sa",
            "ह": "ha",
            "ड़": "ṛa",
            "ढ़": "ṛha",
            "क्ष": "kṣa",
            "त्र": "tra",
            "ज्ञ": "jña",
        }

        # Hindi matras (vowel signs)
        self.matras = {
            "ा": "ā",
            "ि": "i",
            "ी": "ī",
            "ु": "u",
            "ू": "ū",
            "ृ": "ṛ",
            "े": "e",
            "ै": "ai",
            "ो": "o",
            "ौ": "au",
            "ं": "ṃ",
            "ः": "ḥ",
            "्": "",
        }

        # Hindi diacritics
        self.diacritics = set(self.matras.keys())

        # Hindi numbers
        self.numbers = {
            "०": "0",
            "१": "1",
            "२": "2",
            "३": "3",
            "४": "4",
            "५": "5",
            "६": "6",
            "७": "7",
            "८": "8",
            "९": "9",
        }

        # Common Hindi words translation map
        self.translation_map = {
            # Pronouns
            "मैं": "I",
            "तू": "you",
            "तुम": "you",
            "आप": "you (formal)",
            "वह": "he/she/it",
            "यह": "this",
            "हम": "we",
            "वे": "they",
            "ये": "these",
            # Common verbs
            "है": "is",
            "हैं": "are",
            "था": "was",
            "थे": "were",
            "होगा": "will be",
            "करना": "to do",
            "किया": "did",
            "करता": "does",
            "जाना": "to go",
            "गया": "went",
            "आना": "to come",
            "आया": "came",
            "बोलना": "to speak",
            "बोला": "spoke",
            "देखना": "to see",
            "देखा": "saw",
            "खाना": "to eat",
            "खाया": "ate",
            "पीना": "to drink",
            "पिया": "drank",
            "सोना": "to sleep",
            "सोया": "slept",
            # Common nouns
            "आदमी": "man",
            "औरत": "woman",
            "लड़का": "boy",
            "लड़की": "girl",
            "बच्चा": "child",
            "घर": "house",
            "स्कूल": "school",
            "किताब": "book",
            "पानी": "water",
            "खाना": "food",
            "समय": "time",
            "दिन": "day",
            "रात": "night",
            "साल": "year",
            "नाम": "name",
            # Common adjectives
            "अच्छा": "good",
            "बुरा": "bad",
            "बड़ा": "big",
            "छोटा": "small",
            "गरम": "hot",
            "ठंडा": "cold",
            "नया": "new",
            "पुराना": "old",
            "सुंदर": "beautiful",
            "महंगा": "expensive",
            "सस्ता": "cheap",
            # Question words
            "क्या": "what",
            "कौन": "who",
            "कहाँ": "where",
            "कब": "when",
            "कैसे": "how",
            "क्यों": "why",
            "कितना": "how much",
            # Postpositions (similar to prepositions in Hindi)
            "में": "in",
            "पर": "on",
            "को": "to",
            "से": "from/with",
            "का": "of",
            "के": "of",
            "की": "of",
            "तक": "until",
            "लिए": "for",
            # Conjunctions
            "और": "and",
            "या": "or",
            "लेकिन": "but",
            "क्योंकि": "because",
            "अगर": "if",
            # Particles
            "भी": "also",
            "ही": "only",
            "तो": "then",
            "नहीं": "no/not",
            "हाँ": "yes",
        }

        # POS mapping
        self.pos_mapping = {
            "NOUN": "संज्ञा",
            "PRONOUN": "सर्वनाम",
            "VERB": "क्रिया",
            "ADJECTIVE": "विशेषण",
            "ADVERB": "क्रिया-विशेषण",
            "POSTPOSITION": "संबंधसूचक",
            "CONJUNCTION": "योजक",
            "INTERJECTION": "विस्मयादिबोधक",
            "NUMERAL": "संख्या",
            "PARTICLE": "निपात",
        }

        # Reverse mapping for English display
        self.pos_reverse = {v: k for k, v in self.pos_mapping.items()}

        # Gender markers
        self.masculine_endings = ["ा", "े"]
        self.feminine_endings = ["ी", "ि"]

    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        return word in self.punctuation_chars

    def has_matras(self, word: str) -> bool:
        """Check if word has matras (vowel signs)"""
        return any(char in self.diacritics for char in word)

    def remove_matras(self, word: str) -> str:
        """Remove matras from word to get base form"""
        result = []
        for char in word:
            if char not in self.diacritics:
                result.append(char)
        return "".join(result)

    def get_base_word(self, word: str) -> str:
        """Get base word without matras"""
        return self.remove_matras(word)

    def get_gender(self, word: str) -> str:
        """Guess gender of Hindi word based on ending"""
        if not word:
            return "UNKNOWN"

        # Remove matras for ending detection
        base = self.remove_matras(word)

        if base.endswith("ा"):
            return "MASCULINE"
        elif base.endswith("ी") or base.endswith("ि"):
            return "FEMININE"

        # Common gender patterns
        masculine_indicators = ["क", "ग", "ज", "ड", "द", "ब", "म", "र", "ल", "व"]
        feminine_indicators = ["या", "िया", "नी", "नी"]

        if any(base.endswith(ind) for ind in feminine_indicators):
            return "FEMININE"
        elif base[-1:] in masculine_indicators:
            return "MASCULINE"

        return "UNKNOWN"

    def get_number(self, word: str) -> str:
        """Guess number of Hindi word"""
        if not word:
            return "UNKNOWN"

        base = self.remove_matras(word)

        # Plural markers
        if base.endswith("े") or base.endswith("ों") or base.endswith("एँ"):
            return "PLURAL"

        return "SINGULAR"

    def get_person(self, verb: str) -> str:
        """Guess person for verbs"""
        if not verb:
            return "UNKNOWN"

        base = self.remove_matras(verb)

        # First person markers
        if base.endswith("ता") or base.endswith("ती") or base.endswith("ता हूँ"):
            return "FIRST"

        # Second person markers
        if base.endswith("ते हो") or base.endswith("ती हो") or base.endswith("ते"):
            return "SECOND"

        # Third person markers
        if base.endswith("ता है") or base.endswith("ती है") or base.endswith("ते हैं"):
            return "THIRD"

        return "UNKNOWN"

    def get_tense(self, verb: str) -> str:
        """Guess tense of verb"""
        if not verb:
            return "UNKNOWN"

        base = self.remove_matras(verb)

        # Present tense markers
        if "ता" in base or "ती" in base or "ते" in base:
            if "है" in base or "हूँ" in base or "हो" in base or "हैं" in base:
                return "PRESENT"

        # Past tense markers
        if "या" in base or "ये" in base or "यी" in base:
            if "था" in base or "थे" in base or "थी" in base:
                return "PAST"
            return "PERFECT"

        # Future tense markers
        if "एगा" in base or "ेगी" in base or "ेंगे" in base:
            return "FUTURE"

        return "UNKNOWN"

    def get_case(self, word: str) -> str:
        """Guess grammatical case"""
        if not word:
            return "UNKNOWN"

        # Direct case (usually no postposition)
        # Oblique case (usually with postpositions)
        if word.endswith("े") and len(word) > 2:
            return "OBLIQUE"

        return "DIRECT"

    def get_part_of_speech(self, word: str, context: Optional[str] = None) -> str:
        """Determine part of speech (simplified)"""
        base = self.remove_matras(word)

        # Common postpositions
        if base in ["में", "पर", "को", "से", "का", "के", "की", "तक", "लिए"]:
            return "POSTPOSITION"

        # Common conjunctions
        if base in ["और", "या", "लेकिन", "क्योंकि", "अगर"]:
            return "CONJUNCTION"

        # Common pronouns
        if base in ["मैं", "तू", "तुम", "आप", "वह", "यह", "हम", "वे", "ये"]:
            return "PRONOUN"

        # Common question words
        if base in ["क्या", "कौन", "कहाँ", "कब", "कैसे", "क्यों", "कितना"]:
            return "PRONOUN"

        # Verb patterns
        verb_endings = ["ना", "ता", "ती", "ते", "या", "ये", "यी", "एगा", "ेगी", "ेंगे"]
        if any(base.endswith(ending) for ending in verb_endings):
            return "VERB"

        # Adjective patterns
        adjective_endings = ["ा", "ी", "े"]
        if base.endswith(tuple(adjective_endings)) and len(base) > 2:
            return "ADJECTIVE"

        # Default to noun
        return "NOUN"

    def get_syntax_role(
        self, word: str, pos: str, index: int, sentence_length: int
    ) -> str:
        """Determine syntactic role"""
        if pos == "PRONOUN":
            if index == 0:
                return "SUBJECT"
            return "OBJECT"
        elif pos == "POSTPOSITION":
            return "POSTPOSITION"
        elif pos == "CONJUNCTION":
            return "CONJUNCTION"
        elif pos == "VERB":
            if index >= sentence_length - 2:  # Verb often at end in Hindi
                return "PREDICATE"
            return "VERB"
        elif pos == "NOUN":
            if index == 0:
                return "SUBJECT"
            elif index < sentence_length - 1:
                # Check if followed by postposition
                return "OBJECT"
            return "MODIFIER"
        elif pos == "ADJECTIVE":
            return "MODIFIER"

        return "MODIFIER"

    def get_semantic_category(self, word: str) -> str:
        """Determine semantic category"""
        base = self.remove_matras(word)

        # Time words
        time_words = ["समय", "दिन", "रात", "साल", "महीना", "हफ्ता", "घंटा", "मिनट"]
        if any(tw in base for tw in time_words):
            return "TIME"

        # Location words
        location_words = ["घर", "स्कूल", "मकान", "शहर", "गाँव", "देश", "जगह"]
        if any(lw in base for lw in location_words):
            return "LOCATION"

        # Person words
        person_words = [
            "आदमी",
            "औरत",
            "लड़का",
            "लड़की",
            "बच्चा",
            "माँ",
            "पिता",
            "भाई",
            "बहन",
        ]
        if any(pw in base for pw in person_words):
            return "PERSON"

        return "GENERAL"

    def get_transliteration(self, word: str) -> str:
        """Get transliteration using indic_transliteration"""
        if self.is_punctuation(word) or not word:
            return ""

        try:
            # Use indic_transliteration for accurate transliteration
            # Convert from Devanagari to IAST (International Alphabet of Sanskrit Transliteration)
            iast = transliterate(word, sanscript.DEVANAGARI, sanscript.IAST)
            return iast
        except Exception as e:
            logger.debug(f"Transliteration error for '{word}': {e}")

            # Fallback to simple mapping
            result = []
            i = 0
            while i < len(word):
                char = word[i]

                # Check for conjunct consonants (has virama)
                if i + 1 < len(word) and word[i + 1] == "्":
                    if char in self.consonants:
                        result.append(self.consonants[char][:-1])  # Remove inherent 'a'
                    i += 2
                # Check for consonant with matra
                elif char in self.consonants:
                    result.append(self.consonants[char])
                    i += 1
                # Check for vowels
                elif char in self.vowels:
                    result.append(self.vowels[char])
                    i += 1
                # Check for matras
                elif char in self.matras:
                    result.append(self.matras[char])
                    i += 1
                # Check for numbers
                elif char in self.numbers:
                    result.append(self.numbers[char])
                    i += 1
                else:
                    result.append(char)
                    i += 1

            return "".join(result)

    def get_word_translation(self, word: str) -> str:
        """Get translation with caching"""
        base = self.remove_matras(word)

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
        """Analyze a Hindi sentence and return detailed word information"""
        result = []

        try:
            # Clean and split text
            words = sentence.split()
            sentence_length = len(words)

            for i, word in enumerate(words):
                # Skip punctuation-only words
                if self.is_punctuation(word):
                    continue

                # Get base form (without matras)
                base = self.remove_matras(word)

                # Determine part of speech
                pos = self.get_part_of_speech(word)

                # Get morphological features
                gender = self.get_gender(word)
                number = self.get_number(word)
                grammatical_case = self.get_case(word)
                has_matras = self.has_matras(word)

                # Get syntax role
                syntax_role = self.get_syntax_role(word, pos, i, sentence_length)

                # Get semantic category
                semantic_category = self.get_semantic_category(word)

                # Get transliteration
                transliteration = self.get_transliteration(word)

                # Get translation
                translation = self.get_word_translation(word)

                # Additional verb features if applicable
                verb_form = "NONE"
                tense = "UNKNOWN"
                person = "UNKNOWN"

                if pos == "VERB":
                    tense = self.get_tense(word)
                    person = self.get_person(word)

                    # Map to verb form
                    if tense == "PRESENT":
                        verb_form = "PRESENT"
                    elif tense == "PAST":
                        verb_form = "PAST"
                    elif tense == "FUTURE":
                        verb_form = "FUTURE"
                    elif tense == "PERFECT":
                        verb_form = "PERFECT"

                # Log for debugging
                logger.debug(
                    f"Word: {word}, POS: {pos}, Base: {base}, Gender: {gender}, Number: {number}"
                )

                result.append(
                    {
                        "word": word,
                        "base": base,
                        "transliteration": transliteration,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": pos,
                        "particle_type": "NONE",
                        "verb_form": verb_form,
                        "tense": tense,
                        "person": person,
                        "honorific_level": "PLAIN",  # Hindi has honorifics (तू/तुम/आप)
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                        "gender": gender,
                        "number": number,
                        "grammatical_case": grammatical_case,
                        "has_matras": has_matras,
                    }
                )

        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)

        return result
