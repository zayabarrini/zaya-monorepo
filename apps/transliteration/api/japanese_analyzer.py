# /home/zaya/Downloads/Zayas/zaya-monorepo/apps/transliteration/api/japanese_analyzer.py

import logging
import os
import re
import time
import unicodedata
from typing import Any, Dict, List, Optional, Tuple

import pykakasi
from deep_translator import GoogleTranslator

# Japanese processing libraries
from fugashi import Tagger

logger = logging.getLogger(__name__)

class JapaneseSentenceAnalyzer:
    def __init__(self):
        # Initialize fugashi with unidic
        try:
            # Try different dictionary paths for unidic
            dic_paths = [
                os.path.expanduser('~/.local/share/unidic'),  # User installed
                '/usr/local/lib/mecab/dic/unidic',           # System installed
                '/usr/lib/mecab/dic/unidic',                 # Alternative system path
                '/usr/lib/x86_64-linux-gnu/mecab/dic/unidic', # Debian/Ubuntu path
            ]
            
            self.tagger = None
            for dic_path in dic_paths:
                if os.path.exists(dic_path):
                    try:
                        self.tagger = Tagger(f'-d {dic_path}')
                        logger.info(f"Successfully initialized fugashi with dictionary: {dic_path}")
                        break
                    except Exception as e:
                        logger.warning(f"Failed to load dictionary from {dic_path}: {e}")
            
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
            self.translator = GoogleTranslator(source='ja', target='en')
            logger.info("Successfully initialized translator")
        except Exception as e:
            logger.error(f"Failed to initialize translator: {e}")
            self.translator = None
        
        # Common word cache for translations to avoid rate limiting
        self.translation_cache = {}
        
        # POS mapping based on Unidic
        self.pos_mapping = {
            '名詞': 'NOUN',
            '代名詞': 'PRONOUN', 
            '動詞': 'VERB',
            '形容詞': 'ADJECTIVE_I',
            '形状詞': 'ADJECTIVE_NA',
            '副詞': 'ADVERB',
            '連体詞': 'PRENOUN_ADJECTIVE',
            '接続詞': 'CONJUNCTION',
            '感動詞': 'INTERJECTION',
            '助詞': 'PARTICLE',
            '助動詞': 'AUXILIARY_VERB',
            '接頭辞': 'PREFIX',
            '接尾辞': 'SUFFIX',
            '記号': 'SYMBOL',
            '補助記号': 'PUNCTUATION'
        }
        
        # Particle type mapping based on pos2
        self.particle_mapping = {
            '係助詞': 'CASE_WA',      # は、も
            '格助詞': 'CASE_GA',       # が、を、に、へ、と、から、より、で
            '接続助詞': 'CONNECTIVE',   # て、で、ば、から、ので
            '終助詞': 'FINAL',          # か、ね、よ、わ
            '副助詞': 'ADVERBIAL',      # だけ、ほど、くらい
            '準体助詞': 'NOMINAL',      # の
        }
        
        # Verb conjugation mapping
        self.verb_form_mapping = {
            '基本形': 'DICTIONARY',
            '未然形': 'NAI_FORM',
            '連用形': 'STEM',
            '終止形': 'DICTIONARY',
            '連体形': 'ATTRIBUTIVE',
            '仮定形': 'CONDITIONAL_BA',
            '命令形': 'IMPERATIVE',
            '音便形': 'EUPHONIC',
        }
        
        # Enhanced translation dictionary for common words
        self.translation_map = {
            # Pronouns
            '私': 'I', 'わたし': 'I', '僕': 'I', '俺': 'I', 'わたくし': 'I',
            'あなた': 'you', '君': 'you', 'お前': 'you', '貴方': 'you',
            '彼': 'he', '彼女': 'she', '彼等': 'they',
            'これ': 'this', 'それ': 'that', 'あれ': 'that (over there)',
            'ここ': 'here', 'そこ': 'there', 'あそこ': 'over there',
            'どこ': 'where', '誰': 'who', '何': 'what',
            'どれ': 'which one', 'どの': 'which',
            
            # Common nouns
            '人': 'person', '先生': 'teacher', '学生': 'student', '學校': 'school',
            '本': 'book', '水': 'water', '食べ物': 'food', '飲み物': 'drink',
            '家': 'house', '車': 'car', '猫': 'cat', '犬': 'dog', '魚': 'fish',
            '仕事': 'work', '会社': 'company', '時間': 'time', '友達': 'friend',
            '子供': 'child', '大人': 'adult', '男': 'man', '女': 'woman',
            '奥様': 'ma\'am', '旦那様': 'sir', '奥さん': 'wife', '旦那': 'husband',
            '方': 'person', '者': 'person', '物': 'thing', '事': 'thing',
            
            # Verbs
            '行く': 'go', '来る': 'come', '見る': 'see', '食べる': 'eat', '飲む': 'drink',
            '読む': 'read', '書く': 'write', '話す': 'speak', '聞く': 'hear',
            'する': 'do', 'なる': 'become', 'ある': 'exist (inanimate)', 'いる': 'exist (animate)',
            '買う': 'buy', '売る': 'sell', '作る': 'make', '使う': 'use',
            '分かる': 'understand', '知る': 'know', '思う': 'think',
            '言う': 'say', '上げる': 'give/raise', '下げる': 'lower',
            '立てる': 'stand', '立て続ける': 'continue standing',
            '生じる': 'arise', '出来る': 'can do',
            
            # Adjectives
            '大きい': 'big', '小さい': 'small', '良い': 'good', '悪い': 'bad',
            '美味しい': 'delicious', '高い': 'high/expensive', '安い': 'cheap',
            '暑い': 'hot', '寒い': 'cold', '新しい': 'new', '古い': 'old',
            '難しい': 'difficult', '易しい': 'easy', '嬉しい': 'happy', '悲しい': 'sad',
            '可能': 'possible',
            
            # Adverbs
            'とても': 'very', '少し': 'a little', 'たくさん': 'many', 'すぐ': 'immediately',
            'ゆっくり': 'slowly', '早く': 'quickly', 'どう': 'how', 'なぜ': 'why',
            'いつ': 'when', 'もっと': 'more',
            
            # Particles
            'は': 'topic', 'が': 'subject', 'を': 'object', 'に': 'to/at', 'で': 'at/in',
            'へ': 'toward', 'から': 'from', 'まで': 'until', 'の': 'of', 'と': 'and/with',
            'か': '?', 'ね': 'isn\'t it', 'よ': 'I tell you', 'も': 'also/too',
            
            # Auxiliary verbs
            'ます': 'polite', 'ました': 'polite past', 'ません': 'polite negative',
            'です': 'is', 'でした': 'was', 'でしょう': 'probably',
            'たい': 'want to', 'たくない': 'don\'t want to',
            'られる': 'can/passive', 'させる': 'make/cause',
            'て': 'conjunctive', 'た': 'past',
        }
    
    def is_punctuation(self, word: str) -> bool:
        """Check if word is punctuation"""
        if not word:
            return False
        punctuation_chars = ['。', '、', '！', '？', '・', '「', '」', '『', '』', '（', '）', '【', '】', '…', '‥', '〃', '´', '～', '?', '!', '.']
        return word in punctuation_chars
    
    def get_part_of_speech(self, pos1: str) -> str:
        """Extract part of speech from Unidic pos1 field"""
        if not pos1:
            return "UNKNOWN"
        
        return self.pos_mapping.get(pos1, 'UNKNOWN')
    
    def get_particle_type(self, word: str, pos1: str, pos2: str) -> str:
        """Determine specific particle type based on pos2"""
        if pos1 != '助詞':
            return "None"
        
        # Map based on pos2
        if pos2 == '係助詞':
            if word == 'は':
                return 'CASE_WA'
            elif word == 'も':
                return 'CASE_MO'
            return 'CASE_PARTICLE'
        
        elif pos2 == '格助詞':
            particle_map = {
                'が': 'CASE_GA',
                'を': 'CASE_O',
                'に': 'CASE_NI',
                'で': 'CASE_DE',
                'へ': 'CASE_E',
                'と': 'CASE_TO',
                'から': 'CASE_KARA',
                'より': 'CASE_YORI',
                'まで': 'CASE_MADE',
                'の': 'CASE_NO',
            }
            return particle_map.get(word, 'CASE_PARTICLE')
        
        elif pos2 == '接続助詞':
            connective_map = {
                'て': 'CONNECTIVE_TE',
                'で': 'CONNECTIVE_DE',
                'ば': 'CONNECTIVE_BA',
                'から': 'CONNECTIVE_KARA',
                'ので': 'CONNECTIVE_NODE',
            }
            return connective_map.get(word, 'CONNECTIVE')
        
        elif pos2 == '終助詞':
            final_map = {
                'か': 'FINAL_KA',
                'ね': 'FINAL_NE',
                'よ': 'FINAL_YO',
                'わ': 'FINAL_WA',
            }
            return final_map.get(word, 'FINAL')
        
        return 'PARTICLE_GENERIC'
    
    def get_verb_form(self, word: str, pos1: str, cForm: str) -> str:
        """Determine verb conjugation form"""
        if pos1 not in ['動詞', '助動詞']:
            return "None"
        
        # Check word endings first
        if word.endswith('ます'):
            return "MASU_PRESENT"
        elif word.endswith('ました'):
            return "MASU_PAST" 
        elif word.endswith('ません'):
            return "MASU_NEGATIVE"
        elif word.endswith('て') or word.endswith('で'):
            return "TE_FORM"
        elif word.endswith('た') or word.endswith('だ'):
            return "TA_FORM"
        elif word.endswith('ない'):
            return "NAI_FORM"
        elif word.endswith('ば'):
            return "CONDITIONAL_BA"
        elif word.endswith('よう'):
            return "VOLITIONAL"
        elif word.endswith('られる') or word.endswith('れる'):
            return "POTENTIAL"
        elif word.endswith('させる') or word.endswith('せる'):
            return "CAUSATIVE"
        elif word.endswith('ろ') or word.endswith('よ') or word.endswith('い'):
            return "IMPERATIVE"
        
        # Use cForm from Unidic
        if cForm:
            if '連用形' in cForm:
                return "STEM"
            elif '未然形' in cForm:
                return "NAI_FORM"
            elif '終止形' in cForm:
                return "DICTIONARY"
            elif '連体形' in cForm:
                return "ATTRIBUTIVE"
            elif '仮定形' in cForm:
                return "CONDITIONAL_BA"
            elif '命令形' in cForm:
                return "IMPERATIVE"
        
        return "DICTIONARY"
    
    def get_honorific_level(self, word: str, pos1: str, lemma: str) -> str:
        """Determine honorific/politeness level"""
        if pos1 in ['動詞', '助動詞']:
            # Check for polite forms
            if 'ます' in word or 'です' in word or 'ました' in word or 'ません' in word:
                return "POLITE"
            
            # Check for humble forms
            humble_words = ['いたす', '申す', '参る', 'おる']
            if any(humble in lemma for humble in humble_words):
                return "HUMBLE"
            
            # Check for respectful forms
            respectful_suffixes = ['れる', 'られる']
            if any(suffix in word for suffix in respectful_suffixes):
                return "RESPECTFUL"
        
        # Check for honorific prefixes
        if word.startswith('お') or word.startswith('ご'):
            return "HONORIFIC"
        
        return "PLAIN"
    
    def get_semantic_category(self, word: str, pos1: str, lemma: str) -> str:
        """Determine semantic category"""
        # Ensure lemma is a string
        if lemma is None:
            lemma = word or ""
        
        if pos1 == '名詞':
            # Time words
            time_words = ['時', '時間', '日', '月', '年', '分', '秒', '朝', '晩', '夜', '今日', '昨日', '明日', '今']
            if any(tw in lemma for tw in time_words):
                return "TIME"
            
            # Location words
            location_words = ['場所', '所', '地点', '位置', '家', '学校', '店', '駅', '空港', 'ここ', 'そこ', 'あそこ']
            if any(lw in lemma for lw in location_words):
                return "LOCATION" 
            
            # Person words
            person_words = ['人', '先生', '学生', '私', 'あなた', '彼', '彼女', '子供', '大人', '奥様', '旦那様']
            if any(pw in lemma for pw in person_words):
                return "PERSON"
            else:
                return "OBJECT"
        
        elif pos1 == '動詞':
            return "ACTION"
        elif pos1 in ['形容詞', '形状詞']:
            return "DESCRIPTION"
        elif pos1 == '副詞':
            return "DESCRIPTION"
        elif pos1 == '助詞':
            return "GRAMMAR"
        elif pos1 == '助動詞':
            return "GRAMMAR"
        
        return "GENERAL"

    def get_syntax_role(self, word: str, pos1: str, particle_type: str, index: int, sentence_length: int) -> str:
        """Determine syntactic role in sentence"""
        if particle_type != "None":
            if particle_type in ['CASE_WA']:
                return "TOPIC"
            elif particle_type in ['CASE_GA']:
                return "SUBJECT"
            elif particle_type in ['CASE_O']:
                return "DIRECT_OBJECT"
            elif particle_type in ['CASE_NI']:
                return "INDIRECT_OBJECT"
            elif particle_type in ['CASE_DE']:
                return "LOCATION"
            elif particle_type in ['CASE_E']:
                return "DIRECTION"
            elif particle_type in ['CASE_KARA']:
                return "SOURCE"
            elif particle_type in ['CASE_MADE']:
                return "DESTINATION"
            elif particle_type in ['CASE_NO']:
                return "POSSESSOR"
            elif particle_type in ['FINAL_KA', 'FINAL_NE', 'FINAL_YO', 'FINAL_WA']:
                return "SENTENCE_ENDER"
        
        if pos1 == '動詞' and index >= sentence_length - 3:
            return "VERB"
        elif pos1 in ['形容詞', '形状詞'] and index >= sentence_length - 3:
            return "PREDICATE"
        elif pos1 == '代名詞':
            return "SUBJECT"
        
        return "MODIFIER"
    
    def get_word_translation(self, word: str, pos1: str, lemma: str, target_language: str = 'en') -> str:
        """Get translation for individual words"""
        # Skip translation for particles, punctuation
        if pos1 in ['助詞', '助動詞', '記号', '補助記号']:
            return ""
        
        # Check translation map first (try both word and lemma)
        if word in self.translation_map:
            return self.translation_map[word]
        
        if lemma in self.translation_map:
            return self.translation_map[lemma]
        
        # Check cache
        cache_key = f"{word}:{lemma}"
        if cache_key in self.translation_cache:
            return self.translation_cache[cache_key]
        
        # Fall back to Google Translate for content words
        if self.translator and pos1 in ['名詞', '動詞', '形容詞', '形状詞', '副詞']:
            try:
                translated = self.translator.translate(word)
                if translated and translated != word:
                    self.translation_cache[cache_key] = translated
                    return translated
            except Exception as e:
                logger.debug(f"Word translation error for '{word}': {e}")
        
        return ""
    
    def get_transliteration(self, word: str) -> str:
        """Get full romaji transliteration using pykakasi"""
        if self.is_punctuation(word) or not word:
            return ""
        try:
            result = self.kakasi.convert(word)
            # Join all parts to get the full romaji
            romaji_parts = []
            for item in result:
                if 'hepburn' in item:
                    romaji_parts.append(item['hepburn'])
            return ''.join(romaji_parts)
        except Exception as e:
            logger.debug(f"Transliteration error for '{word}': {e}")
            return word
    
    def translate_sentence(self, sentence: str, target_lang: str = 'en') -> str:
        """Translate entire sentence using Google Translate"""
        try:
            if target_lang != 'en':
                self.translator.target = target_lang
            return self.translator.translate(sentence)
        except Exception as e:
            logger.error(f"Sentence translation error: {e}")
            return ""
    
    def analyze_sentence(self, sentence: str, target_language: str = 'en') -> List[Dict[str, Any]]:
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
                # Debug output
                logger.debug(f"Word='{word.surface}', Feature={word.feature}")
                
                # Skip punctuation
                if self.is_punctuation(word.surface):
                    continue
                
                # Get features from Unidic
                feature = word.feature
                
                # Extract Unidic fields with safe defaults
                pos1 = getattr(feature, 'pos1', '') or ''  # 品詞1 (名詞, 動詞, etc)
                pos2 = getattr(feature, 'pos2', '') or ''  # 品詞2 (普通名詞, 格助詞, etc)
                lemma = getattr(feature, 'lemma', word.surface) or word.surface  # 語彙素 (dictionary form)
                cForm = getattr(feature, 'cForm', '') or ''  # 活用形 (conjugation form)
                kana = getattr(feature, 'kana', '') or ''  # 仮名形
                
                # Get part of speech
                pos = self.get_part_of_speech(pos1)
                
                # Get particle type (only for particles)
                particle_type = "None"
                if pos1 == '助詞':
                    particle_type = self.get_particle_type(word.surface, pos1, pos2)
                
                # Get verb form
                verb_form = self.get_verb_form(word.surface, pos1, cForm)
                
                # Get honorific level
                honorific_level = self.get_honorific_level(word.surface, pos1, lemma)
                
                # Get semantic category (with safe lemma)
                semantic_category = self.get_semantic_category(word.surface, pos1, lemma or "")
                
                # Get syntax role
                syntax_role = self.get_syntax_role(word.surface, pos1, particle_type, i, sentence_length)
                
                # Get transliteration - FIXED: use the full word
                romaji_word = self.get_transliteration(word.surface)
                
                # Also try using kana if available for better results
                if kana and len(kana) > 0 and kana != word.surface:
                    kana_romaji = self.get_transliteration(kana)
                    if kana_romaji and len(kana_romaji) > len(romaji_word):
                        romaji_word = kana_romaji
                
                # Get translation
                translation = self.get_word_translation(word.surface, pos1, lemma or "", target_language)
                
                # Log the results for debugging
                logger.info(f"Word: {word.surface}, POS: {pos}, Particle Type: {particle_type}, "
                        f"Verb Form: {verb_form}, Honorific: {honorific_level}, "
                        f"Semantic: {semantic_category}, Syntax: {syntax_role}, "
                        f"Transliteration: {romaji_word}, Translation: {translation}")
                
                result.append({
                    "word": word.surface,
                    "transliteration": romaji_word,
                    "translation": translation,
                    "syntax_role": syntax_role,
                    "part_of_speech": pos,
                    "particle_type": particle_type,
                    "verb_form": verb_form,
                    "honorific_level": honorific_level,
                    "is_punctuation": False,
                    "semantic_category": semantic_category
                })
                
        except Exception as e:
            logger.error(f"Error in analyze_sentence: {e}", exc_info=True)
        
        return result