import logging
import re
import unicodedata
from typing import Any, Dict, List, Optional

import transliterate

# Russian processing libraries
from deep_translator import GoogleTranslator

logger = logging.getLogger(__name__)


class RussianSentenceAnalyzer:
    def __init__(self):
        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="ru", target="en")
            logger.info("Successfully initialized Russian translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Translation cache
        self.translation_cache = {}

        # Russian punctuation
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
            "\n",
            "\r",
            "\t",
        }

        # Russian vowels (гласные)
        self.vowels = {
            "а",
            "е",
            "ё",
            "и",
            "о",
            "у",
            "ы",
            "э",
            "ю",
            "я",
            "А",
            "Е",
            "Ё",
            "И",
            "О",
            "У",
            "Ы",
            "Э",
            "Ю",
            "Я",
        }

        # Russian consonants (согласные)
        self.consonants = {
            "б",
            "в",
            "г",
            "д",
            "ж",
            "з",
            "й",
            "к",
            "л",
            "м",
            "н",
            "п",
            "р",
            "с",
            "т",
            "ф",
            "х",
            "ц",
            "ч",
            "ш",
            "щ",
            "Б",
            "В",
            "Г",
            "Д",
            "Ж",
            "З",
            "Й",
            "К",
            "Л",
            "М",
            "Н",
            "П",
            "Р",
            "С",
            "Т",
            "Ф",
            "Х",
            "Ц",
            "Ч",
            "Ш",
            "Щ",
        }

        # Hard and soft signs
        self.signs = {"ъ", "ь", "Ъ", "Ь"}

        # Russian noun cases
        self.cases = {
            "nominative": "Именительный",
            "genitive": "Родительный",
            "dative": "Дательный",
            "accusative": "Винительный",
            "instrumental": "Творительный",
            "prepositional": "Предложный",
        }

        # Case endings (simplified)
        self.case_endings = {
            "masculine": {
                "nominative": ["", "й", "ь"],
                "genitive": ["а", "я"],
                "dative": ["у", "ю"],
                "accusative": ["", "а", "я"],
                "instrumental": ["ом", "ем"],
                "prepositional": ["е"],
            },
            "feminine": {
                "nominative": ["а", "я", "ь"],
                "genitive": ["ы", "и"],
                "dative": ["е"],
                "accusative": ["у", "ю", "ь"],
                "instrumental": ["ой", "ей", "ью"],
                "prepositional": ["е"],
            },
            "neuter": {
                "nominative": ["о", "е"],
                "genitive": ["а", "я"],
                "dative": ["у", "ю"],
                "accusative": ["о", "е"],
                "instrumental": ["ом", "ем"],
                "prepositional": ["е"],
            },
        }

        # Verb conjugation endings (simplified)
        self.verb_endings = {
            "present": {
                "1sg": ["ю", "у"],
                "2sg": ["ешь", "ишь"],
                "3sg": ["ет", "ит"],
                "1pl": ["ем", "им"],
                "2pl": ["ете", "ите"],
                "3pl": ["ют", "ут", "ят", "ат"],
            },
            "past": {
                "masculine": ["л"],
                "feminine": ["ла"],
                "neuter": ["ло"],
                "plural": ["ли"],
            },
            "future": {
                "perfective": [
                    "ет",
                    "ит",
                    "ут",
                    "ют",
                ],  # Same as present for perfective
                "imperfective": ["буду", "будешь", "будет", "будем", "будете", "будут"],
            },
        }

        # Common Russian words translation map
        self.translation_map = {
            # Pronouns
            "я": "I",
            "ты": "you (informal)",
            "вы": "you (formal/plural)",
            "он": "he",
            "она": "she",
            "оно": "it",
            "мы": "we",
            "они": "they",
            "мой": "my",
            "твой": "your",
            "его": "his",
            "её": "her",
            "наш": "our",
            "ваш": "your",
            "их": "their",
            "этот": "this",
            "тот": "that",
            # Common verbs
            "быть": "to be",
            "есть": "is/are (there is)",
            "был": "was",
            "была": "was (f)",
            "было": "was (n)",
            "были": "were",
            "будет": "will be",
            "сказать": "to say",
            "сказал": "said",
            "говорить": "to speak",
            "говорил": "spoke",
            "идти": "to go",
            "пошёл": "went",
            "ходить": "to walk",
            "видеть": "to see",
            "увидел": "saw",
            "смотреть": "to watch",
            "посмотрел": "watched",
            "делать": "to do",
            "сделал": "did",
            "работать": "to work",
            "работал": "worked",
            "жить": "to live",
            "жил": "lived",
            "любить": "to love",
            "любил": "loved",
            "знать": "to know",
            "знал": "knew",
            "понимать": "to understand",
            "понял": "understood",
            "хотеть": "to want",
            "хотел": "wanted",
            "мочь": "can",
            "мог": "could",
            "думать": "to think",
            "думал": "thought",
            # Common nouns
            "человек": "person",
            "мужчина": "man",
            "женщина": "woman",
            "мальчик": "boy",
            "девочка": "girl",
            "ребёнок": "child",
            "дом": "house",
            "квартира": "apartment",
            "школа": "school",
            "университет": "university",
            "работа": "work",
            "книга": "book",
            "вода": "water",
            "еда": "food",
            "время": "time",
            "день": "day",
            "ночь": "night",
            "год": "year",
            "имя": "name",
            "город": "city",
            "страна": "country",
            "мир": "world",
            "жизнь": "life",
            # Common adjectives
            "хороший": "good",
            "плохой": "bad",
            "большой": "big",
            "маленький": "small",
            "новый": "new",
            "старый": "old",
            "красивый": "beautiful",
            "умный": "smart",
            "интересный": "interesting",
            "трудный": "difficult",
            "лёгкий": "easy",
            "дорогой": "expensive",
            "дешёвый": "cheap",
            "горячий": "hot",
            "холодный": "cold",
            # Question words
            "что": "what",
            "кто": "who",
            "где": "where",
            "когда": "when",
            "как": "how",
            "почему": "why",
            "зачем": "what for",
            "сколько": "how many/much",
            "какой": "which",
            # Prepositions
            "в": "in",
            "на": "on",
            "под": "under",
            "над": "above",
            "у": "at/near",
            "около": "near",
            "между": "between",
            "с": "with",
            "без": "without",
            "для": "for",
            "о": "about",
            "про": "about",
            "через": "through",
            "после": "after",
            "до": "before/until",
            "из": "from",
            "от": "from",
            "к": "to/towards",
            # Conjunctions
            "и": "and",
            "или": "or",
            "но": "but",
            "а": "and/but",
            "потому что": "because",
            "если": "if",
            "когда": "when",
            "что": "that",
            # Particles
            "не": "not",
            "ни": "not any",
            "же": "same/emphatic",
            "ли": "whether",
            "бы": "would",
            "да": "yes",
            "нет": "no",
        }

        # POS mapping
        self.pos_mapping = {
            "NOUN": "существительное",
            "PRONOUN": "местоимение",
            "VERB": "глагол",
            "ADJECTIVE": "прилагательное",
            "ADVERB": "наречие",
            "PREPOSITION": "предлог",
            "CONJUNCTION": "союз",
            "PARTICLE": "частица",
            "INTERJECTION": "междометие",
            "NUMERAL": "числительное",
        }

        # Reverse mapping for English display
        self.pos_reverse = {v: k for k, v in self.pos_mapping.items()}

        # Gender markers
        self.masculine_endings = ["", "й", "ь"]
        self.feminine_endings = ["а", "я", "ь"]
        self.neuter_endings = ["о", "е"]

    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        return word in self.punctuation_chars

    def get_gender(self, word: str) -> str:
        """Guess gender of Russian noun/adjective"""
        if not word:
            return "UNKNOWN"

        word_lower = word.lower()

        # Check common gender patterns
        if word_lower.endswith(("а", "я")):
            return "FEMININE"
        elif word_lower.endswith(("о", "е")):
            return "NEUTER"
        elif word_lower.endswith(("й", "ь")) or (word_lower[-1] in self.consonants):
            return "MASCULINE"

        # Special cases for soft sign
        if word_lower.endswith("ь"):
            # Could be masculine or feminine, need context
            return "UNKNOWN"

        return "UNKNOWN"

    def get_number(self, word: str) -> str:
        """Guess number of Russian word"""
        if not word:
            return "UNKNOWN"

        word_lower = word.lower()

        # Plural endings
        plural_endings = ["ы", "и", "а", "я", "е"]
        if any(word_lower.endswith(ending) for ending in plural_endings):
            # Check if it's genitive singular vs nominative plural
            if len(word_lower) > 2 and word_lower[-2] in self.vowels:
                return "PLURAL"

        return "SINGULAR"

    def get_case(self, word: str, pos: str) -> str:
        """Guess grammatical case of Russian noun/adjective"""
        if pos not in ["NOUN", "ADJECTIVE", "PRONOUN"]:
            return "UNKNOWN"

        word_lower = word.lower()
        gender = self.get_gender(word)

        # Simplified case detection based on endings
        if gender == "MASCULINE":
            if word_lower.endswith(("а", "я")):
                return "GENITIVE"
            elif word_lower.endswith(("у", "ю")):
                return "DATIVE"
            elif word_lower.endswith(("ом", "ем")):
                return "INSTRUMENTAL"
            elif word_lower.endswith("е"):
                return "PREPOSITIONAL"

        elif gender == "FEMININE":
            if word_lower.endswith(("ы", "и")):
                return "GENITIVE"
            elif word_lower.endswith("е"):
                return "DATIVE"
            elif word_lower.endswith(("у", "ю")):
                return "ACCUSATIVE"
            elif word_lower.endswith(("ой", "ей", "ью")):
                return "INSTRUMENTAL"

        elif gender == "NEUTER":
            if word_lower.endswith(("а", "я")):
                return "GENITIVE"
            elif word_lower.endswith(("у", "ю")):
                return "DATIVE"
            elif word_lower.endswith(("ом", "ем")):
                return "INSTRUMENTAL"
            elif word_lower.endswith("е"):
                return "PREPOSITIONAL"

        return "NOMINATIVE"  # Default

    def get_tense(self, verb: str) -> str:
        """Guess tense of Russian verb"""
        if not verb:
            return "UNKNOWN"

        verb_lower = verb.lower()

        # Past tense markers
        if verb_lower.endswith(("л", "ла", "ло", "ли")):
            return "PAST"

        # Future tense with быть
        future_helpers = ["буду", "будешь", "будет", "будем", "будете", "будут"]
        if any(helper in verb_lower.split() for helper in future_helpers):
            return "FUTURE"

        # Present/Future (perfective present = future)
        # This is simplified - would need aspect detection for accuracy
        present_endings = [
            "ю",
            "ешь",
            "ет",
            "ем",
            "ете",
            "ют",
            "у",
            "ишь",
            "ит",
            "им",
            "ите",
            "ат",
            "ят",
        ]
        if any(verb_lower.endswith(ending) for ending in present_endings):
            return "PRESENT"  # Could be future if perfective

        return "UNKNOWN"

    def get_aspect(self, verb: str) -> str:
        """Guess aspect of Russian verb (perfective/imperfective)"""
        if not verb:
            return "UNKNOWN"

        verb_lower = verb.lower()

        # Perfective often has prefixes
        perfective_prefixes = ["по", "при", "у", "вы", "за", "на", "с", "от"]
        if any(verb_lower.startswith(prefix) for prefix in perfective_prefixes):
            # But not always - need more sophisticated detection
            return "PERFECTIVE"

        return "IMPERFECTIVE"

    def get_person(self, verb: str) -> str:
        """Guess person of Russian verb"""
        if not verb:
            return "UNKNOWN"

        verb_lower = verb.lower()
        tense = self.get_tense(verb)

        if tense == "PAST":
            return "N/A"  # Past tense doesn't distinguish person

        # Present/Future person markers
        if verb_lower.endswith(("ю", "у")):
            return "FIRST"
        elif verb_lower.endswith(("ешь", "ишь")):
            return "SECOND"
        elif verb_lower.endswith(("ет", "ит")):
            return "THIRD"

        return "UNKNOWN"

    def get_part_of_speech(self, word: str, context: Optional[str] = None) -> str:
        """Determine part of speech (simplified)"""
        word_lower = word.lower()

        # Common prepositions
        prepositions = [
            "в",
            "на",
            "под",
            "над",
            "у",
            "около",
            "между",
            "с",
            "без",
            "для",
            "о",
            "про",
            "через",
            "после",
            "до",
            "из",
            "от",
            "к",
        ]
        if word_lower in prepositions:
            return "PREPOSITION"

        # Common conjunctions
        conjunctions = ["и", "или", "но", "а", "если", "чтобы", "что"]
        if word_lower in conjunctions:
            return "CONJUNCTION"

        # Common pronouns
        pronouns = [
            "я",
            "ты",
            "вы",
            "он",
            "она",
            "оно",
            "мы",
            "они",
            "мой",
            "твой",
            "его",
            "её",
            "наш",
            "ваш",
            "их",
            "этот",
            "тот",
        ]
        if word_lower in pronouns:
            return "PRONOUN"

        # Question words
        questions = [
            "что",
            "кто",
            "где",
            "когда",
            "как",
            "почему",
            "зачем",
            "сколько",
            "какой",
        ]
        if word_lower in questions:
            return "PRONOUN"

        # Verb patterns
        verb_endings = [
            "ть",
            "ти",
            "чь",
            "л",
            "ла",
            "ло",
            "ли",
            "ю",
            "ешь",
            "ет",
            "ем",
            "ете",
            "ют",
            "у",
            "ишь",
            "ит",
            "им",
            "ите",
            "ат",
            "ят",
        ]
        if any(word_lower.endswith(ending) for ending in verb_endings):
            return "VERB"

        # Adjective patterns
        adjective_endings = ["ый", "ий", "ой", "ая", "яя", "ое", "ее", "ые", "ие"]
        if any(word_lower.endswith(ending) for ending in adjective_endings):
            return "ADJECTIVE"

        # Noun patterns - most common
        if word_lower[-1] in self.vowels | self.consonants | self.signs:
            return "NOUN"

        return "NOUN"  # Default

    def get_syntax_role(
        self, word: str, pos: str, case: str, index: int, sentence_length: int
    ) -> str:
        """Determine syntactic role"""
        if pos == "PRONOUN":
            if case == "NOMINATIVE" or index == 0:
                return "SUBJECT"
            return "OBJECT"
        elif pos == "PREPOSITION":
            return "PREPOSITION"
        elif pos == "CONJUNCTION":
            return "CONJUNCTION"
        elif pos == "VERB":
            if index >= sentence_length - 2:  # Verb often near end in Russian
                return "PREDICATE"
            return "VERB"
        elif pos == "NOUN":
            if case == "NOMINATIVE" and index < sentence_length / 2:
                return "SUBJECT"
            elif case in ["ACCUSATIVE", "DATIVE", "GENITIVE"]:
                return "OBJECT"
            elif case == "INSTRUMENTAL":
                return "INSTRUMENT"
            elif case == "PREPOSITIONAL":
                return "LOCATION"
            return "MODIFIER"
        elif pos == "ADJECTIVE":
            return "MODIFIER"
        elif pos == "ADVERB":
            return "MODIFIER"

        return "MODIFIER"

    def get_semantic_category(self, word: str) -> str:
        """Determine semantic category"""
        word_lower = word.lower()

        # Time words
        time_words = [
            "время",
            "день",
            "ночь",
            "год",
            "месяц",
            "неделя",
            "час",
            "минута",
            "секунда",
            "утро",
            "вечер",
        ]
        if any(tw in word_lower for tw in time_words):
            return "TIME"

        # Location words
        location_words = [
            "дом",
            "город",
            "страна",
            "мир",
            "место",
            "улица",
            "площадь",
            "здание",
            "комната",
        ]
        if any(lw in word_lower for lw in location_words):
            return "LOCATION"

        # Person words
        person_words = [
            "человек",
            "мужчина",
            "женщина",
            "мальчик",
            "девочка",
            "ребёнок",
            "мать",
            "отец",
            "брат",
            "сестра",
        ]
        if any(pw in word_lower for pw in person_words):
            return "PERSON"

        return "GENERAL"

    def get_transliteration(self, word: str) -> str:
        """Get transliteration using transliterate library"""
        if self.is_punctuation(word) or not word:
            return ""

        try:
            # Use transliterate library for accurate transliteration
            # Convert from Cyrillic to Latin
            latin = transliterate.translit(word, "ru", reversed=True)
            return latin
        except Exception as e:
            logger.debug(f"Transliteration error for '{word}': {e}")

            # Fallback to simple character mapping
            translit_map = {
                "а": "a",
                "б": "b",
                "в": "v",
                "г": "g",
                "д": "d",
                "е": "e",
                "ё": "yo",
                "ж": "zh",
                "з": "z",
                "и": "i",
                "й": "y",
                "к": "k",
                "л": "l",
                "м": "m",
                "н": "n",
                "о": "o",
                "п": "p",
                "р": "r",
                "с": "s",
                "т": "t",
                "у": "u",
                "ф": "f",
                "х": "kh",
                "ц": "ts",
                "ч": "ch",
                "ш": "sh",
                "щ": "sch",
                "ъ": "",
                "ы": "y",
                "ь": "",
                "э": "e",
                "ю": "yu",
                "я": "ya",
                "А": "A",
                "Б": "B",
                "В": "V",
                "Г": "G",
                "Д": "D",
                "Е": "E",
                "Ё": "Yo",
                "Ж": "Zh",
                "З": "Z",
                "И": "I",
                "Й": "Y",
                "К": "K",
                "Л": "L",
                "М": "M",
                "Н": "N",
                "О": "O",
                "П": "P",
                "Р": "R",
                "С": "S",
                "Т": "T",
                "У": "U",
                "Ф": "F",
                "Х": "Kh",
                "Ц": "Ts",
                "Ч": "Ch",
                "Ш": "Sh",
                "Щ": "Sch",
                "Ъ": "",
                "Ы": "Y",
                "Ь": "",
                "Э": "E",
                "Ю": "Yu",
                "Я": "Ya",
            }

            result = []
            for char in word:
                if char in translit_map:
                    result.append(translit_map[char])
                else:
                    result.append(char)

            return "".join(result)

    def get_word_translation(self, word: str) -> str:
        """Get translation with caching"""
        word_lower = word.lower()

        # Check translation map
        if word_lower in self.translation_map:
            return self.translation_map[word_lower]

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
        """Analyze a Russian sentence and return detailed word information"""
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

                # Get morphological features
                gender = (
                    self.get_gender(word)
                    if pos in ["NOUN", "ADJECTIVE", "PRONOUN"]
                    else "UNKNOWN"
                )
                number = (
                    self.get_number(word)
                    if pos in ["NOUN", "ADJECTIVE", "VERB", "PRONOUN"]
                    else "UNKNOWN"
                )
                grammatical_case = (
                    self.get_case(word, pos)
                    if pos in ["NOUN", "ADJECTIVE", "PRONOUN"]
                    else "UNKNOWN"
                )

                # Verb-specific features
                tense = "UNKNOWN"
                aspect = "UNKNOWN"
                person = "UNKNOWN"

                if pos == "VERB":
                    tense = self.get_tense(word)
                    aspect = self.get_aspect(word)
                    person = self.get_person(word)

                # Get syntax role
                syntax_role = self.get_syntax_role(
                    word, pos, grammatical_case, i, sentence_length
                )

                # Get semantic category
                semantic_category = self.get_semantic_category(word)

                # Get transliteration
                transliteration = self.get_transliteration(word)

                # Get translation
                translation = self.get_word_translation(word)

                # Log for debugging
                logger.debug(
                    f"Word: {word}, POS: {pos}, Gender: {gender}, Case: {grammatical_case}, Tense: {tense}"
                )

                result.append(
                    {
                        "word": word,
                        "transliteration": transliteration,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": pos,
                        "particle_type": "NONE",
                        "verb_form": tense if tense != "UNKNOWN" else "NONE",
                        "aspect": aspect if aspect != "UNKNOWN" else "NONE",
                        "person": person if person != "UNKNOWN" else "NONE",
                        "honorific_level": "PLAIN",  # Russian has ты/вы distinction
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                        "gender": gender,
                        "number": number,
                        "grammatical_case": grammatical_case,
                        "tense": tense if tense != "UNKNOWN" else "NONE",
                    }
                )

        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)

        return result
