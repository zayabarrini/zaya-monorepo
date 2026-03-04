import logging
import re
import unicodedata
from typing import Any, Dict, List, Optional

# Thai processing libraries
from deep_translator import GoogleTranslator

logger = logging.getLogger(__name__)


class ThaiSentenceAnalyzer:
    def __init__(self):
        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="th", target="en")
            logger.info("Successfully initialized Thai translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Translation cache
        self.translation_cache = {}

        # Thai punctuation
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
            "ฯ",
            "ฯลฯ",
            "ๆ",
            "ฯ",
            "\n",
            "\r",
            "\t",
        }

        # Thai consonants (พยัญชนะ)
        self.consonants = {
            "ก": "k",
            "ข": "kh",
            "ฃ": "kh",
            "ค": "kh",
            "ฅ": "kh",
            "ฆ": "kh",
            "ง": "ng",
            "จ": "ch",
            "ฉ": "ch",
            "ช": "ch",
            "ซ": "s",
            "ฌ": "ch",
            "ญ": "y",
            "ฎ": "d",
            "ฏ": "t",
            "ฐ": "th",
            "ฑ": "th",
            "ฒ": "th",
            "ณ": "n",
            "ด": "d",
            "ต": "t",
            "ถ": "th",
            "ท": "th",
            "ธ": "th",
            "น": "n",
            "บ": "b",
            "ป": "p",
            "ผ": "ph",
            "ฝ": "f",
            "พ": "ph",
            "ฟ": "f",
            "ภ": "ph",
            "ม": "m",
            "ย": "y",
            "ร": "r",
            "ล": "l",
            "ว": "w",
            "ศ": "s",
            "ษ": "s",
            "ส": "s",
            "ห": "h",
            "ฬ": "l",
            "อ": "a",
            "ฮ": "h",
        }

        # Thai vowels (สระ)
        self.vowels = {
            "ะ": "a",
            "ั": "a",
            "า": "a",
            "ำ": "am",
            "ิ": "i",
            "ี": "i",
            "ึ": "ue",
            "ื": "ue",
            "ุ": "u",
            "ู": "u",
            "เ": "e",
            "แ": "ae",
            "โ": "o",
            "ใ": "ai",
            "ไ": "ai",
            "ฤ": "rue",
            "ฤๅ": "rue",
            "ฦ": "lue",
            "ฦๅ": "lue",
            "ๅ": "a",
        }

        # Thai tone marks (วรรณยุกต์)
        self.tones = {
            "่": "low",  # ไม้เอก
            "้": "falling",  # ไม้โท
            "๊": "high",  # ไม้ตรี
            "๋": "rising",  # ไม้จัตวา
            "ั": "mid",  # ไม้หันอากาศ (also a vowel)
        }

        # Thai diacritics
        self.diacritics = set(self.tones.keys()) | {
            "ฺ",
            "์",
        }  # ฺ = phinthu, ์ = thanthakhat

        # Thai numerals
        self.numerals = {
            "๐": "0",
            "๑": "1",
            "๒": "2",
            "๓": "3",
            "๔": "4",
            "๕": "5",
            "๖": "6",
            "๗": "7",
            "๘": "8",
            "๙": "9",
        }

        # Thai classifiers (ลักษณนาม)
        self.classifiers = {
            "คน": "person",
            "ตัว": "animal",
            "ใบ": "leaf/flat object",
            "เล่ม": "book",
            "คัน": "vehicle",
            "เครื่อง": "machine",
            "อัน": "general object",
            "ชิ้น": "piece",
            "แห่ง": "place",
            "รายการ": "item",
            "เรื่อง": "story",
            "ครั้ง": "time/occasion",
            "ปี": "year",
        }

        # Common Thai words translation map
        self.translation_map = {
            # Pronouns
            "ฉัน": "I (female)",
            "ผม": "I (male)",
            "ดิฉัน": "I (female formal)",
            "คุณ": "you",
            "เธอ": "you (informal)",
            "ท่าน": "you (formal)",
            "เขา": "he/she",
            "มัน": "it",
            "เรา": "we",
            "พวกเรา": "we",
            "พวกเขา": "they",
            "พี่": "older sibling",
            "น้อง": "younger sibling",
            "เพื่อน": "friend",
            # Common verbs
            "เป็น": "to be",
            "คือ": "to be (definition)",
            "มี": "to have",
            "อยู่": "to be (location)",
            "ไป": "to go",
            "มา": "to come",
            "ทำ": "to do/make",
            "กิน": "to eat",
            "ดื่ม": "to drink",
            "พูด": "to speak",
            "บอก": "to tell",
            "ดู": "to see/watch",
            "ฟัง": "to listen",
            "อ่าน": "to read",
            "เขียน": "to write",
            "เรียน": "to study",
            "ทำงาน": "to work",
            "เล่น": "to play",
            "ซื้อ": "to buy",
            "ขาย": "to sell",
            "ให้": "to give",
            "รับ": "to receive",
            "รู้": "to know",
            "เข้าใจ": "to understand",
            "คิด": "to think",
            "รัก": "to love",
            "ชอบ": "to like",
            "ต้องการ": "to want",
            "ได้": "can/get",
            "ช่วย": "to help",
            # Common nouns
            "คน": "person",
            "ผู้ชาย": "man",
            "ผู้หญิง": "woman",
            "เด็ก": "child",
            "เด็กชาย": "boy",
            "เด็กหญิง": "girl",
            "บ้าน": "house",
            "โรงเรียน": "school",
            "มหาวิทยาลัย": "university",
            "ที่ทำงาน": "workplace",
            "เมือง": "city",
            "ประเทศ": "country",
            "โลก": "world",
            "น้ำ": "water",
            "อาหาร": "food",
            "เวลา": "time",
            "วัน": "day",
            "คืน": "night",
            "ปี": "year",
            "ชื่อ": "name",
            "ภาษา": "language",
            "หนังสือ": "book",
            "งาน": "work",
            "ชีวิต": "life",
            # Common adjectives
            "ดี": "good",
            "ไม่ดี": "bad",
            "ใหญ่": "big",
            "เล็ก": "small",
            "ใหม่": "new",
            "เก่า": "old",
            "สวย": "beautiful",
            "หล่อ": "handsome",
            "ฉลาด": "smart",
            "น่าสนใจ": "interesting",
            "ยาก": "difficult",
            "ง่าย": "easy",
            "แพง": "expensive",
            "ถูก": "cheap",
            "ร้อน": "hot",
            "เย็น": "cold",
            "มาก": "many/much",
            "น้อย": "few/little",
            # Question words
            "อะไร": "what",
            "ใคร": "who",
            "ที่ไหน": "where",
            "เมื่อไหร่": "when",
            "อย่างไร": "how",
            "ทำไม": "why",
            "เท่าไหร่": "how much/many",
            "กี่": "how many",
            "ไหน": "which",
            # Prepositions and particles
            "ใน": "in",
            "บน": "on",
            "ใต้": "under",
            "ข้าง": "side",
            "ใกล้": "near",
            "ระหว่าง": "between",
            "กับ": "with",
            "และ": "and",
            "หรือ": "or",
            "แต่": "but",
            "เพราะ": "because",
            "ถ้า": "if",
            "ว่า": "that",
            "คะ": "polite (female)",
            "ครับ": "polite (male)",
            "นะ": "softening particle",
            "สิ": "emphasis",
            "เหรอ": "question particle",
        }

        # POS mapping
        self.pos_mapping = {
            "NOUN": "คำนาม",
            "PRONOUN": "คำสรรพนาม",
            "VERB": "คำกริยา",
            "ADJECTIVE": "คำคุณศัพท์",
            "ADVERB": "คำวิเศษณ์",
            "PREPOSITION": "คำบุพบท",
            "CONJUNCTION": "คำสันธาน",
            "PARTICLE": "คำอนุภาค",
            "INTERJECTION": "คำอุทาน",
            "NUMERAL": "ตัวเลข",
            "CLASSIFIER": "ลักษณนาม",
        }

        # Reverse mapping for English display
        self.pos_reverse = {v: k for k, v in self.pos_mapping.items()}

    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        return word in self.punctuation_chars or word in ["ๆ", "ฯ", "ฯลฯ"]

    def is_thai_char(self, char: str) -> bool:
        """Check if character is Thai"""
        if not char:
            return False
        code = ord(char)
        # Thai script range: 0x0E00 - 0x0E7F
        return 0x0E00 <= code <= 0x0E7F

    def has_tones(self, word: str) -> bool:
        """Check if word has tone marks"""
        return any(char in self.tones for char in word)

    def get_tone(self, syllable: str) -> str:
        """Get tone of a syllable"""
        for char in syllable:
            if char in self.tones:
                return self.tones[char]
        return "mid"  # Default tone

    def detect_classifier(self, word: str) -> Optional[str]:
        """Detect if word is a classifier"""
        if word in self.classifiers:
            return self.classifiers[word]
        return None

    def get_word_type(self, word: str) -> str:
        """Determine basic word type"""
        if word in self.classifiers:
            return "CLASSIFIER"

        # Check for common patterns
        if word.endswith("การ") or word.endswith("ความ"):
            return "NOUN"  # Nominalized verb/adjective

        return "NOUN"  # Default

    def get_part_of_speech(self, word: str, context: Optional[str] = None) -> str:
        """Determine part of speech (simplified)"""
        # Check for classifiers
        if word in self.classifiers:
            return "CLASSIFIER"

        # Check for pronouns
        pronouns = [
            "ฉัน",
            "ผม",
            "ดิฉัน",
            "คุณ",
            "เธอ",
            "ท่าน",
            "เขา",
            "มัน",
            "เรา",
            "พวกเรา",
            "พวกเขา",
        ]
        if word in pronouns:
            return "PRONOUN"

        # Check for question words
        question_words = [
            "อะไร",
            "ใคร",
            "ที่ไหน",
            "เมื่อไหร่",
            "อย่างไร",
            "ทำไม",
            "เท่าไหร่",
            "กี่",
            "ไหน",
        ]
        if word in question_words:
            return "PRONOUN"

        # Check for particles
        particles = ["คะ", "ครับ", "นะ", "สิ", "เหรอ"]
        if word in particles:
            return "PARTICLE"

        # Check for prepositions
        prepositions = ["ใน", "บน", "ใต้", "ข้าง", "ใกล้", "ระหว่าง", "กับ"]
        if word in prepositions:
            return "PREPOSITION"

        # Check for conjunctions
        conjunctions = ["และ", "หรือ", "แต่", "เพราะ", "ถ้า"]
        if word in conjunctions:
            return "CONJUNCTION"

        # Check for common verbs
        common_verbs = [
            "เป็น",
            "คือ",
            "มี",
            "อยู่",
            "ไป",
            "มา",
            "ทำ",
            "กิน",
            "ดื่ม",
            "พูด",
            "บอก",
        ]
        if word in common_verbs:
            return "VERB"

        # Verb patterns (often end with า, ิ, etc.)
        if any(word.endswith(v) for v in ["า", "ิ", "ี", "ุ", "ู"]) and len(word) <= 3:
            return "VERB"

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
        elif pos == "PREPOSITION":
            return "PREPOSITION"
        elif pos == "CONJUNCTION":
            return "CONJUNCTION"
        elif pos == "PARTICLE":
            return "PARTICLE"
        elif pos == "CLASSIFIER":
            return "CLASSIFIER"
        elif pos == "VERB":
            if index >= sentence_length - 2:
                return "PREDICATE"
            return "VERB"
        elif pos == "NOUN":
            if index == 0:
                return "SUBJECT"
            elif index < sentence_length - 1:
                return "OBJECT"
            return "MODIFIER"
        elif pos == "ADJECTIVE":
            return "MODIFIER"
        elif pos == "ADVERB":
            return "MODIFIER"

        return "MODIFIER"

    def get_semantic_category(self, word: str) -> str:
        """Determine semantic category"""
        # Time words
        time_words = [
            "เวลา",
            "วัน",
            "คืน",
            "ปี",
            "เดือน",
            "สัปดาห์",
            "ชั่วโมง",
            "นาที",
            "วินาที",
            "เช้า",
            "เย็น",
        ]
        if any(tw in word for tw in time_words):
            return "TIME"

        # Location words
        location_words = [
            "บ้าน",
            "เมือง",
            "ประเทศ",
            "โลก",
            "ที่",
            "สถานที่",
            "ร้าน",
            "โรงเรียน",
        ]
        if any(lw in word for lw in location_words):
            return "LOCATION"

        # Person words
        person_words = [
            "คน",
            "ผู้ชาย",
            "ผู้หญิง",
            "เด็ก",
            "เพื่อน",
            "ครอบครัว",
            "พ่อ",
            "แม่",
            "พี่",
            "น้อง",
        ]
        if any(pw in word for pw in person_words):
            return "PERSON"

        return "GENERAL"

    def get_transliteration(self, word: str) -> str:
        """Get RTGS (Royal Thai General System) transliteration"""
        if self.is_punctuation(word) or not word:
            return ""

        try:
            # Simple RTGS-based transliteration
            result = []
            i = 0
            while i < len(word):
                char = word[i]

                # Handle consonants
                if char in self.consonants:
                    # Check for tone marks after consonant
                    if i + 1 < len(word) and word[i + 1] in self.tones:
                        result.append(self.consonants[char])
                        i += 2
                    else:
                        result.append(self.consonants[char])
                        i += 1

                # Handle vowels
                elif char in self.vowels:
                    result.append(self.vowels[char])
                    i += 1

                # Handle tone marks (should be processed with consonants)
                elif char in self.tones:
                    i += 1

                # Handle numerals
                elif char in self.numerals:
                    result.append(self.numerals[char])
                    i += 1

                else:
                    result.append(char)
                    i += 1

            return "".join(result)

        except Exception as e:
            logger.debug(f"Transliteration error for '{word}': {e}")
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
        """Analyze a Thai sentence and return detailed word information"""
        result = []

        try:
            # Thai doesn't use spaces between words consistently
            # For now, split by spaces (common in subtitles/transcriptions)
            words = sentence.split()
            sentence_length = len(words)

            for i, word in enumerate(words):
                # Skip punctuation-only words
                if self.is_punctuation(word):
                    continue

                # Determine part of speech
                pos = self.get_part_of_speech(word)
                word_type = self.get_word_type(word)

                # Check for classifier
                classifier = self.detect_classifier(word)

                # Get tone information
                has_tone = self.has_tones(word)
                tones = []
                for char in word:
                    if char in self.tones:
                        tones.append({"character": char, "tone": self.tones[char]})

                # Get syntax role
                syntax_role = self.get_syntax_role(word, pos, i, sentence_length)

                # Get semantic category
                semantic_category = self.get_semantic_category(word)

                # Get transliteration
                transliteration = self.get_transliteration(word)

                # Get translation
                translation = self.get_word_translation(word)

                # Log for debugging
                logger.debug(
                    f"Word: {word}, POS: {pos}, Type: {word_type}, Tones: {tones}"
                )

                result.append(
                    {
                        "word": word,
                        "transliteration": transliteration,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": pos,
                        "particle_type": "NONE",
                        "verb_form": "NONE",
                        "honorific_level": "PLAIN",  # Thai has polite particles (ครับ/คะ)
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                        "word_type": word_type,
                        "classifier": classifier if classifier else "NONE",
                        "has_tone": has_tone,
                        "tones": tones,
                    }
                )

        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)

        return result
