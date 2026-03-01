# /home/zaya/Downloads/Zayas/zaya-monorepo/apps/transliteration/api/japanese_analyzer.py

import logging
import time
import re
import unicodedata
import os
from typing import List, Dict, Any, Optional, Tuple

# Japanese processing libraries
from fugashi import Tagger
import pykakasi
from deep_translator import GoogleTranslator

logger = logging.getLogger(__name__)


class JapaneseSentenceAnalyzer:
    def __init__(self):
        # Initialize fugashi with unidic
        try:
            # Try different dictionary paths for unidic
            dic_paths = [
                os.path.expanduser("~/.local/share/unidic"),  # User installed
                "/usr/local/lib/mecab/dic/unidic",  # System installed
                "/usr/lib/mecab/dic/unidic",  # Alternative system path
                "/usr/lib/x86_64-linux-gnu/mecab/dic/unidic",  # Debian/Ubuntu path
            ]

            self.tagger = None
            for dic_path in dic_paths:
                if os.path.exists(dic_path):
                    try:
                        self.tagger = Tagger(f"-d {dic_path}")
                        logger.info(
                            f"Successfully initialized fugashi with dictionary: {dic_path}"
                        )
                        break
                    except Exception as e:
                        logger.warning(
                            f"Failed to load dictionary from {dic_path}: {e}"
                        )

            # If no dictionary found, try without specifying path
            if self.tagger is None:
                self.tagger = Tagger()
                logger.info("Successfully initialized fugashi with default dictionary")

        except Exception as e:
            logger.error(f"Failed to initialize fugashi: {e}")
            self.tagger = None

        # Initialize pykakasi
        try:
            self.kakasi = pykakasi.kakasi()
            logger.info("Successfully initialized pykakasi")
        except Exception as e:
            logger.error(f"Failed to initialize pykakasi: {e}")
            self.kakasi = None

        # Initialize translator
        try:
            self.translator = GoogleTranslator(source="ja", target="en")
            logger.info("Successfully initialized translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None

        # Common word cache for translations to avoid rate limiting
        self.translation_cache = {}

        # POS mapping (matching your MeCab version)
        self.pos_mapping = {
            "名詞": "NOUN",
            "代名詞": "PRONOUN",
            "動詞": "VERB",
            "形容詞": "ADJECTIVE_I",
            "形状詞": "ADJECTIVE_NA",
            "副詞": "ADVERB",
            "連体詞": "PRENOUN_ADJECTIVE",
            "接続詞": "CONJUNCTION",
            "感動詞": "INTERJECTION",
            "助詞": "PARTICLE",
            "助動詞": "AUXILIARY_VERB",
            "接頭辞": "PREFIX",
            "接尾辞": "SUFFIX",
            "記号": "SYMBOL",
            "補助記号": "PUNCTUATION",
        }

        # Particle type mapping (matching your MeCab version)
        self.particle_mapping = {
            "は": "CASE_WA",
            "が": "CASE_GA",
            "を": "CASE_O",
            "に": "CASE_NI",
            "で": "CASE_DE",
            "へ": "CASE_E",
            "と": "CASE_TO",
            "から": "CASE_KARA",
            "より": "CASE_YORI",
            "まで": "CASE_MADE",
            "の": "CASE_NO",
            "て": "CONNECTIVE_TE",
            "で": "CONNECTIVE_DE",
            "ば": "CONNECTIVE_BA",
            "か": "FINAL_KA",
            "ね": "FINAL_NE",
            "よ": "FINAL_YO",
            "わ": "FINAL_WA",
            "も": "CASE_MO",
            "や": "CASE_YA",
            "とか": "CASE_TOKA",
            "など": "CASE_NADO",
        }

        # Verb form mapping (matching your MeCab version)
        self.verb_form_mapping = {
            "基本形": "DICTIONARY",
            "未然形": "NAI_FORM",
            "連用形": "STEM",
            "終止形": "DICTIONARY",
            "連体形": "ATTRIBUTIVE",
            "仮定形": "CONDITIONAL_BA",
            "命令形": "IMPERATIVE",
            "音便形": "EUPHONIC",
            "タ系": "TA_FORM",
            "テ系": "TE_FORM",
        }

        # Enhanced translation dictionary for common words
        self.translation_map = {
            # Pronouns
            "私": "I",
            "わたし": "I",
            "僕": "I",
            "俺": "I",
            "わたくし": "I",
            "あなた": "you",
            "君": "you",
            "お前": "you",
            "貴方": "you",
            "彼": "he",
            "彼女": "she",
            "これ": "this",
            "それ": "that",
            "あれ": "that (over there)",
            "ここ": "here",
            "そこ": "there",
            "あそこ": "over there",
            # Common nouns
            "人": "person",
            "先生": "teacher",
            "学生": "student",
            "學校": "school",
            "本": "book",
            "水": "water",
            "食べ物": "food",
            "家": "house",
            "車": "car",
            "猫": "cat",
            "犬": "dog",
            "魚": "fish",
            "仕事": "work",
            "会社": "company",
            "時間": "time",
            "友達": "friend",
            "子供": "child",
            "大人": "adult",
            "男": "man",
            "女": "woman",
            "奥様": "ma'am",
            "旦那様": "sir",
            # Verbs
            "行く": "go",
            "来る": "come",
            "見る": "see",
            "食べる": "eat",
            "飲む": "drink",
            "読む": "read",
            "書く": "write",
            "話す": "speak",
            "聞く": "hear",
            "する": "do",
            "なる": "become",
            "ある": "exist (inanimate)",
            "いる": "exist (animate)",
            "買う": "buy",
            "売る": "sell",
            "作る": "make",
            "使う": "use",
            "分かる": "understand",
            "知る": "know",
            "思う": "think",
            "言う": "say",
            "来る": "come",
            "行く": "go",
            # Adjectives
            "大きい": "big",
            "小さい": "small",
            "良い": "good",
            "悪い": "bad",
            "美味しい": "delicious",
            "高い": "high/expensive",
            "安い": "cheap",
            "暑い": "hot",
            "寒い": "cold",
            "新しい": "new",
            "古い": "old",
            "難しい": "difficult",
            "易しい": "easy",
            "嬉しい": "happy",
            "悲しい": "sad",
            # Adverbs and others
            "とても": "very",
            "少し": "a little",
            "たくさん": "many",
            "すぐに": "immediately",
            "ゆっくり": "slowly",
            "早く": "quickly",
            # Question words
            "何": "what",
            "誰": "who",
            "どこ": "where",
            "いつ": "when",
            "なぜ": "why",
            "どう": "how",
            "どの": "which",
            # Numbers
            "一": "one",
            "二": "two",
            "三": "three",
            "四": "four",
            "五": "five",
            "六": "six",
            "七": "seven",
            "八": "eight",
            "九": "nine",
            "十": "ten",
            # Common particles (for context, though we usually skip translation)
            "は": "topic",
            "が": "subject",
            "を": "object",
            "に": "to/at",
            "で": "at/in",
            "へ": "toward",
            "から": "from",
            "まで": "until",
            "の": "of",
            "と": "and/with",
            "か": "?",
            "ね": "isn't it",
            "よ": "I tell you",
            # Auxiliary verbs
            "ます": "polite",
            "ました": "polite past",
            "ません": "polite negative",
            "です": "is",
            "でした": "was",
            "でしょう": "probably",
            "たい": "want to",
            "たくない": "don't want to",
            "られる": "can/passive",
            "させる": "make/cause",
        }

    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation (matching your MeCab version)"""
        punctuation_chars = [
            "。",
            "、",
            "！",
            "？",
            "・",
            "「",
            "」",
            "『",
            "』",
            "（",
            "）",
            "【",
            "】",
            "…",
            "‥",
            "〃",
            "´",
            "～",
        ]
        return word in punctuation_chars

    def get_part_of_speech(self, pos_info: str) -> str:
        """Extract part of speech from MeCab output (matching your version)"""
        if not pos_info:
            return "UNKNOWN"

        # Extract main POS (first part before comma)
        pos_info = pos_info.split(",")[0]

        return self.pos_mapping.get(pos_info, "UNKNOWN")

    def get_particle_type(
        self, word: str, pos: str, sub_pos: Optional[str] = None
    ) -> str:
        """Determine specific particle type (matching your version)"""
        if pos != "PARTICLE":
            return "None"

        return self.particle_mapping.get(word, "PARTICLE_GENERIC")

    def get_verb_form(
        self, word: str, pos: str, conjugation: Optional[str] = None
    ) -> str:
        """Determine verb conjugation form (matching your version)"""
        if pos not in ["VERB", "AUXILIARY_VERB"]:
            return "None"

        # Simple form detection based on endings
        if word.endswith("ます"):
            return "MASU_PRESENT"
        elif word.endswith("ました"):
            return "MASU_PAST"
        elif word.endswith("ません"):
            return "MASU_NEGATIVE"
        elif word.endswith("て"):
            return "TE_FORM"
        elif word.endswith("た") or word.endswith("だ"):
            return "TA_FORM"
        elif word.endswith("ない"):
            return "NAI_FORM"
        elif word.endswith("ば"):
            return "CONDITIONAL_BA"
        elif word.endswith("よう"):
            return "VOLITIONAL"
        elif word.endswith("られる") or word.endswith("える"):
            return "POTENTIAL"
        elif word.endswith("させる"):
            return "CAUSATIVE"
        elif word.endswith("ろ") or word.endswith("よ"):
            return "IMPERATIVE"

        # If we have conjugation info from fugashi
        if conjugation and conjugation in self.verb_form_mapping:
            return self.verb_form_mapping[conjugation]

        return "DICTIONARY"

    def get_honorific_level(self, word: str, pos: str) -> str:
        """Determine honorific/politeness level (matching your version)"""
        if pos == "VERB" or pos == "AUXILIARY_VERB":
            if "ます" in word or "です" in word or "ました" in word:
                return "POLITE"
            elif any(honorific in word for honorific in ["お", "ご", "いたし", "申し"]):
                return "HUMBLE"
            elif any(respectful in word for respectful in ["れる", "られる", "なさる"]):
                return "RESPECTFUL"

        return "PLAIN"

    def get_semantic_category(self, word: str, pos: str) -> str:
        """Determine semantic category (matching your version)"""
        if pos == "NOUN":
            # Simple semantic categorization
            time_words = [
                "時",
                "時間",
                "日",
                "月",
                "年",
                "分",
                "秒",
                "朝",
                "晩",
                "夜",
                "今日",
                "昨日",
                "明日",
            ]
            location_words = [
                "場所",
                "所",
                "地点",
                "位置",
                "家",
                "学校",
                "店",
                "駅",
                "空港",
                "ここ",
                "そこ",
                "あそこ",
            ]
            person_words = [
                "人",
                "先生",
                "学生",
                "私",
                "あなた",
                "彼",
                "彼女",
                "子供",
                "大人",
                "奥様",
                "旦那様",
            ]

            if any(time in word for time in time_words):
                return "TIME"
            elif any(loc in word for loc in location_words):
                return "LOCATION"
            elif any(person in word for person in person_words):
                return "PERSON"
            else:
                return "OBJECT"

        elif pos == "VERB":
            return "ACTION"
        elif pos in ["ADJECTIVE_I", "ADJECTIVE_NA"]:
            return "DESCRIPTION"
        elif pos == "ADVERB":
            return "DESCRIPTION"
        elif pos == "PARTICLE":
            return "GRAMMAR"

        return "GENERAL"

    def get_syntax_role(
        self, word: str, pos: str, particle_type: str, index: int, sentence_length: int
    ) -> str:
        """Determine syntactic role in sentence (matching your version)"""
        if particle_type != "None":
            if particle_type in ["CASE_WA"]:
                return "TOPIC"
            elif particle_type in ["CASE_GA"]:
                return "SUBJECT"
            elif particle_type in ["CASE_O"]:
                return "DIRECT_OBJECT"
            elif particle_type in ["CASE_NI"]:
                return "INDIRECT_OBJECT"
            elif particle_type in ["CASE_DE"]:
                return "LOCATION"
            elif particle_type in ["CASE_E"]:
                return "DIRECTION"
            elif particle_type in ["CASE_KARA"]:
                return "SOURCE"
            elif particle_type in ["CASE_MADE"]:
                return "DESTINATION"
            elif particle_type in ["CASE_NO"]:
                return "POSSESSOR"
            elif particle_type in ["FINAL_KA", "FINAL_NE", "FINAL_YO"]:
                return "SENTENCE_ENDER"

        if pos == "VERB" and index >= sentence_length - 3:  # Usually verb is near end
            return "VERB"
        elif pos in ["ADJECTIVE_I", "ADJECTIVE_NA"] and index >= sentence_length - 3:
            return "PREDICATE"

        return "MODIFIER"

    def get_word_translation(
        self, word: str, pos: str, target_language: str = "en"
    ) -> str:
        """Get translation for individual words using translation map or Google Translate"""
        # Skip translation for particles, punctuation, and some grammatical elements
        if pos in ["PARTICLE", "PUNCTUATION", "SYMBOL", "AUXILIARY_VERB"]:
            return ""

        # Check translation map first
        if word in self.translation_map:
            return self.translation_map[word]

        # Check cache
        if word in self.translation_cache:
            return self.translation_cache[word]

        # Fall back to Google Translate
        if self.translator:
            try:
                translated = self.translator.translate(word)
                if translated and translated != word:
                    self.translation_cache[word] = translated
                    return translated
            except Exception as e:
                logger.debug(f"Word translation error for '{word}': {e}")

        return ""

    def get_transliteration(self, word: str) -> str:
        """Get romaji transliteration using pykakasi"""
        if self.is_punctuation(word):
            return ""
        try:
            result = self.kakasi.convert(word)
            return result[0]["hepburn"] if result else word
        except Exception as e:
            logger.debug(f"Transliteration error for '{word}': {e}")
            return word

    def translate_sentence(self, sentence: str, target_lang: str = "en") -> str:
        """Translate entire sentence using Google Translate"""
        try:
            if target_lang != "en":
                self.translator.target = target_lang
            return self.translator.translate(sentence)
        except Exception as e:
            logger.error(f"Sentence translation error: {e}")
            return ""

    def analyze_sentence(
        self, sentence: str, target_language: str = "en"
    ) -> List[Dict[str, Any]]:
        """Analyze a Japanese sentence and return detailed word information"""
        result = []

        if not self.tagger:
            logger.error("No tagger available")
            return result

        try:
            # Parse with fugashi
            words = self.tagger(sentence)

            # Collect all words first to get sentence length
            word_list = []
            for word in words:
                if word.surface and not word.surface.isspace():
                    word_list.append(word)

            sentence_length = len(word_list)

            # Analyze each word
            for i, word in enumerate(word_list):
                # Skip punctuation entirely
                if self.is_punctuation(word.surface):
                    continue

                # Get features
                features = word.feature

                # Get basic POS
                pos = self.get_part_of_speech(
                    features.pos if hasattr(features, "pos") else ""
                )

                # Skip if it's punctuation POS
                if pos == "PUNCTUATION":
                    continue

                # Get sub POS for particle type
                sub_pos = (
                    features.pos_detail[1]
                    if hasattr(features, "pos_detail") and len(features.pos_detail) > 1
                    else ""
                )

                # Get particle type
                particle_type = self.get_particle_type(word.surface, pos, sub_pos)

                # Get conjugation form
                conjugation = (
                    features.katsuyoukei if hasattr(features, "katsuyoukei") else None
                )

                # Get verb form
                verb_form = self.get_verb_form(word.surface, pos, conjugation)

                # Get honorific level
                honorific_level = self.get_honorific_level(word.surface, pos)

                # Get semantic category
                semantic_category = self.get_semantic_category(word.surface, pos)

                # Get syntax role
                syntax_role = self.get_syntax_role(
                    word.surface, pos, particle_type, i, sentence_length
                )

                # Get transliteration
                romaji_word = self.get_transliteration(word.surface)

                # Get translation
                translation = self.get_word_translation(
                    word.surface, pos, target_language
                )

                print(
                    f"Word: {word.surface}, POS: {pos}, Particle Type: {particle_type}, Verb Form: {verb_form}, Honorific Level: {honorific_level}, Semantic Category: {semantic_category}, Syntax Role: {syntax_role}, Transliteration: {romaji_word}, Translation: {translation}"
                )

                result.append(
                    {
                        "word": word.surface,
                        "transliteration": romaji_word,
                        "translation": translation,
                        "syntax_role": syntax_role,
                        "part_of_speech": pos,
                        "particle_type": particle_type,
                        "verb_form": verb_form,
                        "honorific_level": honorific_level,
                        "is_punctuation": False,
                        "semantic_category": semantic_category,
                    }
                )

        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)

        return result
