# /home/zaya/Downloads/Zayas/zaya-monorepo/apps/transliteration/api/index.py

import json
import logging
import os
import sys
from typing import Any, Dict, Optional

from flask import Flask, jsonify, request
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add paths for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

app = Flask(__name__)

# ==================== CORS CONFIGURATION ====================
CORS(
    app,
    origins=["*"],
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
)


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


# ==================== IMPORTS ====================

# Import Japanese analyzer
try:
    from japanese_analyzer import JapaneseSentenceAnalyzer

    japanese_analyzer = JapaneseSentenceAnalyzer()
    logger.info("Successfully imported Japanese analyzer")
except Exception as e:
    logger.error(f"Failed to import Japanese analyzer: {e}")
    japanese_analyzer = None

# Import Chinese analyzer
try:
    from chinese_analyzer import ChineseSentenceAnalyzer

    chinese_analyzer = ChineseSentenceAnalyzer()
    logger.info("Successfully imported Chinese analyzer")
except Exception as e:
    logger.error(f"Failed to import Chinese analyzer: {e}")
    chinese_analyzer = None

# Import Korean analyzer
try:
    from korean_analyzer import KoreanSentenceAnalyzer

    korean_analyzer = KoreanSentenceAnalyzer()
    logger.info("Successfully imported Korean analyzer")
except Exception as e:
    logger.error(f"Failed to import Korean analyzer: {e}")
    korean_analyzer = None

# Import Arabic analyzer
try:
    from arabic_analyzer import ArabicSentenceAnalyzer

    arabic_analyzer = ArabicSentenceAnalyzer()
    logger.info("Successfully imported Arabic analyzer")
except Exception as e:
    logger.error(f"Failed to import Arabic analyzer: {e}")
    arabic_analyzer = None

# Import Hindi analyzer
try:
    from hindi_analyzer import HindiSentenceAnalyzer

    hindi_analyzer = HindiSentenceAnalyzer()
    logger.info("Successfully imported Hindi analyzer")
except Exception as e:
    logger.error(f"Failed to import Hindi analyzer: {e}")
    hindi_analyzer = None

# Import Russian analyzer
try:
    from russian_analyzer import RussianSentenceAnalyzer

    russian_analyzer = RussianSentenceAnalyzer()
    logger.info("Successfully imported Russian analyzer")
except Exception as e:
    logger.error(f"Failed to import Russian analyzer: {e}")
    russian_analyzer = None

# Import transliteration functions
try:
    from transliteration.transliteration import (
        add_furigana,
        filter_language_text,
        get_detailed_pos_analysis,
        is_language_text,
        language_map,
        process_chinese_advanced,
        transliterate,
        transliterate_chinese,
    )

    logger.info("Successfully imported transliteration module")
except ImportError as e:
    logger.error(f"Failed to import transliteration module: {e}")

    # Define fallback functions
    def transliterate(text, language):
        return f"Error: Transliteration module not loaded - {text}"

    def transliterate_chinese(text, mode="color"):
        return f"Error: Chinese transliteration not available - {text}"

    def process_chinese_advanced(text):
        return []

    def get_detailed_pos_analysis(text):
        return []

    def add_furigana(text, transliteration, language):
        return text

    language_map = {}
    filter_language_text = lambda text, lang: text
    is_language_text = lambda text, lang: True

# ==================== HELPER FUNCTIONS ====================


def create_error_response(message, status_code=500):
    """Create a consistent error response"""
    response = jsonify({"success": False, "error": message})
    response.status_code = status_code
    return response


def create_success_response(data):
    """Create a consistent success response"""
    return jsonify({"success": True, **data})


# ==================== ROOT ENDPOINT ====================


@app.route("/", methods=["GET", "OPTIONS"])
@app.route("/api", methods=["GET", "OPTIONS"])
def home():
    """Root endpoint with API info"""
    if request.method == "OPTIONS":
        return "", 200

    # Get all available analyzers
    available_analyzers = []
    if japanese_analyzer:
        available_analyzers.append("japanese")
    if chinese_analyzer:
        available_analyzers.append("chinese")
    if korean_analyzer:
        available_analyzers.append("korean")
    if arabic_analyzer:
        available_analyzers.append("arabic")
    if hindi_analyzer:
        available_analyzers.append("hindi")
    if russian_analyzer:
        available_analyzers.append("russian")

    return jsonify(
        {
            "name": "Transliteration API",
            "version": "1.0.0",
            "status": "running",
            "available_analyzers": available_analyzers,
            "endpoints": {
                "/api/health": "GET - Health check",
                "/api/languages": "GET - List supported languages",
                "/api/analyze/japanese": "POST - Detailed Japanese syntax analysis",
                "/api/analyze/chinese": "POST - Detailed Chinese syntax analysis",
                "/api/analyze/korean": "POST - Detailed Korean syntax analysis",
                "/api/analyze/arabic": "POST - Detailed Arabic syntax analysis",
                "/api/analyze/russian": "POST - Detailed Russian syntax analysis",
                "/api/analyze/hindi": "POST - Detailed Hindi syntax analysis",
                "/api/transliterate": "POST - Transliterate text",
                "/api/transliterate/chinese": "POST - Chinese-specific transliteration",
                "/api/detect-language": "POST - Detect language in text",
            },
        }
    )


# ==================== HEALTH CHECK ====================


@app.route("/api/health", methods=["GET", "OPTIONS"])
def health():
    """Health check endpoint"""
    if request.method == "OPTIONS":
        return "", 200

    analyzers_status = {
        "japanese_analyzer": japanese_analyzer is not None,
        "chinese_analyzer": chinese_analyzer is not None,
        "korean_analyzer": korean_analyzer is not None,
        "arabic_analyzer": arabic_analyzer is not None,
        "russian_analyzer": russian_analyzer is not None,
        "hindi_analyzer": hindi_analyzer is not None,
    }

    all_analyzers_loaded = all(analyzers_status.values())

    return jsonify(
        {
            "status": "healthy" if all_analyzers_loaded else "degraded",
            "timestamp": __import__("datetime").datetime.now().isoformat(),
            "modules_loaded": {
                "transliteration": "transliteration" in sys.modules,
                "jieba": "jieba" in sys.modules,
                "pykakasi": "pykakasi" in sys.modules,
                "fugashi": "fugashi" in sys.modules,
                **analyzers_status,
            },
        }
    )


# ==================== LANGUAGES LIST ====================


@app.route("/api/languages", methods=["GET", "OPTIONS"])
def list_languages():
    """List all supported languages"""
    if request.method == "OPTIONS":
        return "", 200

    languages = [
        {
            "code": "ja",
            "name": "Japanese",
            "analyzer_available": japanese_analyzer is not None,
        },
        {
            "code": "jp",
            "name": "Japanese",
            "analyzer_available": japanese_analyzer is not None,
        },
        {
            "code": "ko",
            "name": "Korean",
            "analyzer_available": korean_analyzer is not None,
        },
        {
            "code": "kr",
            "name": "Korean",
            "analyzer_available": korean_analyzer is not None,
        },
        {
            "code": "zh",
            "name": "Chinese",
            "analyzer_available": chinese_analyzer is not None,
        },
        {
            "code": "zh-cn",
            "name": "Chinese (Simplified)",
            "analyzer_available": chinese_analyzer is not None,
        },
        {
            "code": "hi",
            "name": "Hindi",
            "analyzer_available": hindi_analyzer is not None,
        },
        {
            "code": "in",
            "name": "Hindi",
            "analyzer_available": hindi_analyzer is not None,
        },
        {
            "code": "ar",
            "name": "Arabic",
            "analyzer_available": arabic_analyzer is not None,
        },
        {
            "code": "ru",
            "name": "Russian",
            "analyzer_available": russian_analyzer is not None,
        },
    ]

    return jsonify({"languages": languages})


# ==================== JAPANESE ANALYSIS ====================


@app.route("/api/analyze/japanese", methods=["POST", "OPTIONS"])
def analyze_japanese():
    """Analyze Japanese text and return detailed word-by-word analysis"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        if not text:
            return create_error_response("No text provided", 400)

        target_language = data.get("target_language", "en")

        logger.info(f"Analyzing Japanese text: {text[:50]}...")

        if not japanese_analyzer:
            return create_error_response("Japanese analyzer not available", 503)

        analysis = japanese_analyzer.analyze_sentence(text, target_language)
        full_translation = japanese_analyzer.translate_sentence(text, target_language)

        return create_success_response(
            {
                "original": text,
                "analysis": analysis,
                "full_translation": full_translation,
                "word_count": len(analysis),
            }
        )

    except Exception as e:
        logger.error(f"Japanese analysis error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== CHINESE ANALYSIS ====================


@app.route("/api/analyze/chinese", methods=["POST", "OPTIONS"])
def analyze_chinese():
    """Analyze Chinese text and return detailed word-by-word analysis"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        if not text:
            return create_error_response("No text provided", 400)

        target_language = data.get("target_language", "en")

        logger.info(f"Analyzing Chinese text: {text[:50]}...")

        if chinese_analyzer:
            analysis = chinese_analyzer.analyze_sentence(text, target_language)
            full_translation = chinese_analyzer.translate_sentence(
                text, target_language
            )

            return create_success_response(
                {
                    "original": text,
                    "analysis": analysis,
                    "full_translation": full_translation,
                    "word_count": len(analysis),
                }
            )
        else:
            # Fallback to basic POS analysis
            pos_analysis = get_detailed_pos_analysis(text)
            return create_success_response(
                {
                    "original": text,
                    "analysis": pos_analysis,
                    "full_translation": "",
                    "word_count": len(pos_analysis),
                    "note": "Using basic POS analysis (Chinese analyzer not available)",
                }
            )

    except Exception as e:
        logger.error(f"Chinese analysis error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== KOREAN ANALYSIS ====================


@app.route("/api/analyze/korean", methods=["POST", "OPTIONS"])
def analyze_korean():
    """Analyze Korean text and return detailed word-by-word analysis"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        if not text:
            return create_error_response("No text provided", 400)

        logger.info(f"Analyzing Korean text: {text[:50]}...")

        if not korean_analyzer:
            return create_error_response("Korean analyzer not available", 503)

        analysis = korean_analyzer.analyze_sentence(text)
        full_translation = korean_analyzer.translate_sentence(text)

        return create_success_response(
            {
                "original": text,
                "analysis": analysis,
                "full_translation": full_translation,
                "word_count": len(analysis),
            }
        )

    except Exception as e:
        logger.error(f"Korean analysis error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== ARABIC ANALYSIS ====================


@app.route("/api/analyze/arabic", methods=["POST", "OPTIONS"])
def analyze_arabic():
    """Analyze Arabic text and return detailed word-by-word analysis"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        if not text:
            return create_error_response("No text provided", 400)

        logger.info(f"Analyzing Arabic text: {text[:50]}...")

        if not arabic_analyzer:
            return create_error_response("Arabic analyzer not available", 503)

        analysis = arabic_analyzer.analyze_sentence(text)
        full_translation = arabic_analyzer.translate_sentence(text)

        return create_success_response(
            {
                "original": text,
                "analysis": analysis,
                "full_translation": full_translation,
                "word_count": len(analysis),
            }
        )

    except Exception as e:
        logger.error(f"Arabic analysis error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== HINDI ANALYSIS ====================


@app.route("/api/analyze/hindi", methods=["POST", "OPTIONS"])
def analyze_hindi():
    """Analyze Hindi text and return detailed word-by-word analysis"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        if not text:
            return create_error_response("No text provided", 400)

        logger.info(f"Analyzing Hindi text: {text[:50]}...")

        if not hindi_analyzer:
            return create_error_response("Hindi analyzer not available", 503)

        analysis = hindi_analyzer.analyze_sentence(text)
        full_translation = hindi_analyzer.translate_sentence(text)

        return create_success_response(
            {
                "original": text,
                "analysis": analysis,
                "full_translation": full_translation,
                "word_count": len(analysis),
            }
        )

    except Exception as e:
        logger.error(f"Hindi analysis error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== RUSSIAN ANALYSIS ====================


@app.route("/api/analyze/russian", methods=["POST", "OPTIONS"])
def analyze_russian():
    """Analyze Russian text and return detailed word-by-word analysis"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        if not text:
            return create_error_response("No text provided", 400)

        logger.info(f"Analyzing Russian text: {text[:50]}...")

        if not russian_analyzer:
            return create_error_response("Russian analyzer not available", 503)

        analysis = russian_analyzer.analyze_sentence(text)
        full_translation = russian_analyzer.translate_sentence(text)

        return create_success_response(
            {
                "original": text,
                "analysis": analysis,
                "full_translation": full_translation,
                "word_count": len(analysis),
            }
        )

    except Exception as e:
        logger.error(f"Russian analysis error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== OTHER ENDPOINTS ====================


@app.route("/api/transliterate", methods=["POST", "OPTIONS"])
def transliterate_endpoint():
    """Main transliteration endpoint"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        if not data:
            return create_error_response("No JSON data provided", 400)

        text = data.get("text", "")
        language = data.get("language", "ja").lower()
        mode = data.get("mode", "simple")
        output_format = data.get("format", "plain")

        if not text:
            return create_error_response("No text provided", 400)

        logger.info(f"Transliterating {len(text)} chars in {language} with mode={mode}")

        # Handle different languages
        if language in ["zh-cn", "zh-CN", "chinese", "zh"]:
            if mode == "detailed":
                result = process_chinese_advanced(text)
                return create_success_response(
                    {
                        "original": text,
                        "language": "chinese",
                        "mode": mode,
                        "result": result,
                    }
                )
            else:
                color_mode = mode == "color" or output_format == "html"
                result = transliterate_chinese(
                    text, mode="color" if color_mode else "simple"
                )

                if output_format == "html":
                    return create_success_response(
                        {
                            "original": text,
                            "language": "chinese",
                            "mode": mode,
                            "html": (
                                str(result) if hasattr(result, "prettify") else result
                            ),
                            "result": (
                                str(result) if hasattr(result, "prettify") else result
                            ),
                        }
                    )
                else:
                    plain_text = str(result)
                    if hasattr(result, "prettify"):
                        import re

                        plain_text = re.sub(r"<[^>]+>", "", str(result))

                    return create_success_response(
                        {
                            "original": text,
                            "language": "chinese",
                            "mode": mode,
                            "result": plain_text,
                        }
                    )

        # For other languages
        result = transliterate(text, language)
        return create_success_response(
            {"original": text, "language": language, "result": str(result)}
        )

    except Exception as e:
        logger.error(f"Transliteration error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


@app.route("/api/transliterate/chinese", methods=["POST", "OPTIONS"])
def transliterate_chinese_endpoint():
    """Chinese-specific transliteration endpoint"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        text = data.get("text", "")
        mode = data.get("mode", "color")
        include_pos = data.get("include_pos", False)

        if not text:
            return create_error_response("No text provided", 400)

        if mode == "detailed" or include_pos:
            analysis = get_detailed_pos_analysis(text)
            return create_success_response(
                {
                    "original": text,
                    "analysis": analysis,
                    "html": str(transliterate_chinese(text, mode="color")),
                }
            )
        else:
            result = transliterate_chinese(text, mode=mode)
            return create_success_response(
                {
                    "original": text,
                    "html": str(result) if hasattr(result, "prettify") else result,
                    "mode": mode,
                }
            )

    except Exception as e:
        logger.error(f"Chinese transliteration error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


@app.route("/api/detect-language", methods=["POST", "OPTIONS"])
def detect_language():
    """Detect if text contains characters from supported languages"""
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.json
        text = data.get("text", "")

        if not text:
            return create_error_response("No text provided", 400)

        results = {}
        for lang in ["chinese", "japanese", "korean", "arabic", "russian", "hindi"]:
            results[lang] = is_language_text(text, lang)

        likely_langs = [lang for lang, present in results.items() if present]

        return create_success_response(
            {
                "text": text[:100] + ("..." if len(text) > 100 else ""),
                "detected_languages": likely_langs,
                "details": results,
            }
        )

    except Exception as e:
        logger.error(f"Language detection error: {e}", exc_info=True)
        return create_error_response(str(e), 500)


# ==================== ERROR HANDLERS ====================


@app.errorhandler(404)
def not_found(error):
    return create_error_response("Endpoint not found", 404)


@app.errorhandler(405)
def method_not_allowed(error):
    return create_error_response("Method not allowed", 405)


@app.errorhandler(500)
def internal_error(error):
    return create_error_response("Internal server error", 500)


# ==================== MAIN ====================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
