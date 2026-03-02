# /home/zaya/Downloads/Zayas/zaya-monorepo/apps/transliteration/api/chinese_analyzer.py

import logging
import re
import time
from typing import Any, Dict, List, Optional

# Chinese processing libraries
import jieba
import jieba.posseg as pseg
from deep_translator import GoogleTranslator
from pypinyin import Style, pinyin

logger = logging.getLogger(__name__)

class ChineseSentenceAnalyzer:
    def __init__(self):
        # Initialize jieba
        try:
            # Load custom dictionary if needed
            # jieba.load_userdict("dict.txt")
            logger.info("Successfully initialized jieba")
        except Exception as e:
            logger.error(f"Failed to initialize jieba: {e}")
        
        # Initialize translator
        try:
            self.translator = GoogleTranslator(source='zh-CN', target='en')
            logger.info("Successfully initialized translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None
        
        # Translation cache
        self.translation_cache = {}
        
        # Punctuation set
        self.punctuation_chars = {
            " ", ".", "·", ",", "!", "?", "。", "，", "！", "？", "、", "「", "」", 
            "『", "』", "（", "）", "《", "》", "“", "”", "‘", "’", "…", "—", 
            "：", ":", "；", ";", "～", "°", "º", "\n", "\r", "\t"
        }
        
        # POS mapping for Chinese
        self.pos_mapping = {
            'n': 'NOUN',      # 名词
            'nr': 'NOUN',     # 人名
            'ns': 'NOUN',     # 地名
            'nt': 'NOUN',     # 机构名
            'nz': 'NOUN',     # 其他专名
            'v': 'VERB',      # 动词
            'vd': 'VERB',     # 副动词
            'vn': 'VERB',     # 名动词
            'a': 'ADJECTIVE', # 形容词
            'ad': 'ADJECTIVE',# 副形词
            'an': 'ADJECTIVE',# 名形词
            'd': 'ADVERB',    # 副词
            'p': 'PREPOSITION', # 介词
            'c': 'CONJUNCTION', # 连词
            'u': 'AUXILIARY',   # 助词
            'y': 'PARTICLE',    # 语气词
            'e': 'INTERJECTION',# 叹词
            'o': 'ONOMATOPOEIA',# 拟声词
            'r': 'PRONOUN',     # 代词
            'm': 'NUMERAL',      # 数词
            'q': 'QUANTIFIER',   # 量词
            't': 'TIME',         # 时间词
            's': 'LOCATION',     # 处所词
            'f': 'DIRECTION',    # 方位词
            'b': 'PREFIX',       # 区别词
            'z': 'STATUS',       # 状态词
            'x': 'UNKNOWN'       # 非语素字
        }
        
        # Syntax role mapping based on POS
        self.syntax_roles = {
            'r': 'SUBJECT',      # Pronouns often subjects
            'nr': 'SUBJECT',     # Names often subjects
            'n': 'SUBJECT',      # Nouns can be subjects
            'v': 'VERB',         # Verbs
            'p': 'PREPOSITION',  # Prepositions
            'c': 'CONJUNCTION',  # Conjunctions
            'd': 'MODIFIER',     # Adverbs as modifiers
            'a': 'MODIFIER',     # Adjectives as modifiers
            'm': 'QUANTIFIER',   # Numbers as quantifiers
            'q': 'QUANTIFIER',   # Measure words
            'u': 'PARTICLE',     # Particles
            'y': 'PARTICLE',     # Modal particles
        }
        
        # Translation dictionary for common words
        self.translation_map = {
            # Pronouns
            '我': 'I/me', '你': 'you', '他': 'he', '她': 'she', '它': 'it',
            '我们': 'we', '你们': 'you (pl)', '他们': 'they', '她们': 'they (f)',
            '这': 'this', '那': 'that', '这些': 'these', '那些': 'those',
            
            # Common verbs
            '是': 'is/am/are', '在': 'at/in', '有': 'have/has', '能': 'can',
            '会': 'will/can', '要': 'want/will', '想': 'want/think', '说': 'say/speak',
            '看': 'see/look', '听': 'listen', '吃': 'eat', '喝': 'drink',
            '来': 'come', '去': 'go', '到': 'arrive', '给': 'give',
            
            # Common nouns
            '人': 'person', '时间': 'time', '年': 'year', '月': 'month', '日': 'day',
            '天': 'day', '今天': 'today', '明天': 'tomorrow', '昨天': 'yesterday',
            '家': 'home', '学校': 'school', '工作': 'work', '朋友': 'friend',
            '名字': 'name', '问题': 'question', '答案': 'answer',
            
            # Question words
            '什么': 'what', '谁': 'who', '哪里': 'where', '什么时候': 'when',
            '为什么': 'why', '怎么': 'how', '多少': 'how many/much',
            
            # Particles
            '的': '(possessive)', '了': '(past)', '着': '(progressive)',
            '过': '(experiential)', '吧': '(suggestion)', '吗': '(question)',
            '呢': '(question)', '啊': '(exclamation)',
        }
    
    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        return word in self.punctuation_chars
    
    def get_part_of_speech(self, pos_tag: str) -> str:
        """Convert jieba POS to simplified categories"""
        if not pos_tag:
            return "UNKNOWN"
        
        # Extract base POS (first character)
        base_pos = pos_tag[0] if pos_tag else ''
        return self.pos_mapping.get(base_pos, 'UNKNOWN')
    
    def get_syntax_role(self, word: str, pos_tag: str, index: int, sentence_length: int) -> str:
        """Determine syntactic role based on POS and position"""
        base_pos = pos_tag[0] if pos_tag else ''
        
        # Use mapping for known POS
        if base_pos in self.syntax_roles:
            role = self.syntax_roles[base_pos]
            
            # Special cases based on position
            if role == 'SUBJECT' and index > 0:
                # If not first word, might be object
                return 'OBJECT'
            return role
        
        # Default roles based on POS
        if pos_tag.startswith('n'):
            return 'SUBJECT' if index == 0 else 'OBJECT'
        elif pos_tag.startswith('v'):
            return 'VERB'
        elif pos_tag.startswith('p'):
            return 'PREPOSITION'
        elif pos_tag.startswith('c'):
            return 'CONJUNCTION'
        elif pos_tag.startswith('d') or pos_tag.startswith('a'):
            return 'MODIFIER'
        
        return 'MODIFIER'
    
    def get_semantic_category(self, word: str, pos_tag: str) -> str:
        """Determine semantic category"""
        base_pos = pos_tag[0] if pos_tag else ''
        
        if base_pos == 't':
            return "TIME"
        elif base_pos in ['s', 'f']:
            return "LOCATION"
        elif pos_tag in ['nr', 'r']:
            return "PERSON"
        elif base_pos == 'v':
            return "ACTION"
        elif base_pos in ['a', 'z']:
            return "DESCRIPTION"
        elif base_pos == 'n':
            return "OBJECT"
        
        return "GENERAL"
    
    def get_word_translation(self, word: str, target_language: str = 'en') -> str:
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
    
    def get_transliteration(self, word: str) -> str:
        """Get pinyin transliteration with tone marks"""
        if self.is_punctuation(word) or not word:
            return ""
        
        try:
            # Get pinyin with tone marks
            pinyin_list = pinyin(word, style=Style.TONE)
            # Join with spaces
            return ' '.join([p[0] for p in pinyin_list])
        except Exception as e:
            logger.debug(f"Pinyin error for '{word}': {e}")
            return ""
    
    def translate_sentence(self, sentence: str, target_lang: str = 'en') -> str:
        """Translate entire sentence"""
        try:
            if target_lang != 'en':
                self.translator.target = target_lang
            return self.translator.translate(sentence)
        except Exception as e:
            logger.error(f"Sentence translation error: {e}")
            return ""
    
    def analyze_sentence(self, sentence: str, target_language: str = 'en') -> List[Dict[str, Any]]:
        """Analyze a Chinese sentence and return detailed word information"""
        result = []
        
        try:
            # Remove extra whitespace
            processed_text = ' '.join(sentence.split())
            
            # Use jieba for word segmentation and POS tagging
            words = list(pseg.cut(processed_text))
            sentence_length = len(words)
            
            for i, (word, pos_tag) in enumerate(words):
                # Skip punctuation
                if self.is_punctuation(word):
                    continue
                
                # Get analysis
                part_of_speech = self.get_part_of_speech(pos_tag)
                syntax_role = self.get_syntax_role(word, pos_tag, i, sentence_length)
                semantic_category = self.get_semantic_category(word, pos_tag)
                transliteration = self.get_transliteration(word)
                translation = self.get_word_translation(word, target_language)
                
                # Debug log
                logger.debug(f"Word: {word}, POS: {pos_tag}, Role: {syntax_role}, Pinyin: {transliteration}")
                
                result.append({
                    "word": word,
                    "transliteration": transliteration,
                    "translation": translation,
                    "syntax_role": syntax_role,
                    "part_of_speech": part_of_speech,
                    "particle_type": "NONE",  # Chinese doesn't have particles like Japanese
                    "verb_form": "NONE",       # Chinese doesn't conjugate verbs
                    "honorific_level": "PLAIN", # Chinese has limited honorifics
                    "is_punctuation": False,
                    "semantic_category": semantic_category,
                    "pos_tag": pos_tag  # Keep original POS tag for debugging
                })
            
        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)
        
        return result