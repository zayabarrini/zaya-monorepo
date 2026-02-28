from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import json
import logging
from typing import Dict, Any, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add paths for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

app = Flask(__name__)
CORS(app)

# Import transliteration functions with error handling
try:
    from transliteration.transliteration import (
        transliterate,
        transliterate_chinese,
        process_chinese_advanced,
        get_detailed_pos_analysis,
        add_furigana,
        language_map,
        filter_language_text,
        is_language_text,
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


@app.route("/", methods=["GET"])
def home():
    """Root endpoint with API info"""
    return jsonify(
        {
            "name": "Transliteration API",
            "version": "1.0.0",
            "endpoints": {
                "/api/transliterate": "POST - Transliterate text",
                "/api/transliterate/chinese": "POST - Chinese-specific transliteration",
                "/api/analyze/chinese": "POST - Detailed Chinese syntax analysis",
                "/api/languages": "GET - List supported languages",
                "/api/health": "GET - Health check",
            },
            "supported_languages": (
                list(language_map.keys())
                if language_map
                else ["ja", "ko", "zh-cn", "hi", "ar", "ru"]
            ),
        }
    )


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify(
        {
            "status": "healthy",
            "modules_loaded": {
                "transliteration": "transliteration" in sys.modules,
                "jieba": "jieba" in sys.modules,
                "pykakasi": "pykakasi" in sys.modules,
            },
        }
    )


@app.route("/api/languages", methods=["GET"])
def list_languages():
    """List all supported languages"""
    return jsonify(
        {
            "languages": [
                {"code": "ja", "name": "Japanese"},
                {"code": "jp", "name": "Japanese"},
                {"code": "ko", "name": "Korean"},
                {"code": "kr", "name": "Korean"},
                {"code": "zh-cn", "name": "Chinese (Simplified)"},
                {"code": "zh-CN", "name": "Chinese (Simplified)"},
                {"code": "hi", "name": "Hindi"},
                {"code": "in", "name": "Hindi"},
                {"code": "ar", "name": "Arabic"},
                {"code": "ru", "name": "Russian"},
            ]
        }
    )


@app.route("/api/transliterate", methods=["POST"])
def transliterate_endpoint():
    """
    Main transliteration endpoint

    Expected JSON payload:
    {
        "text": "Text to transliterate",
        "language": "ja|ko|zh-cn|hi|ar|ru",
        "mode": "simple|color|detailed",  # optional, defaults to simple
        "format": "plain|html"  # optional, defaults to plain
    }
    """
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        text = data.get("text", "")
        language = data.get("language", "ja").lower()
        mode = data.get("mode", "simple")
        output_format = data.get("format", "plain")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        logger.info(f"Transliterating {len(text)} chars in {language} with mode={mode}")

        # Handle Chinese specially
        if language in ["zh-cn", "zh-CN", "chinese"]:
            if mode == "detailed":
                result = process_chinese_advanced(text)
                return jsonify(
                    {
                        "original": text,
                        "language": "chinese",
                        "mode": mode,
                        "result": result,
                    }
                )
            else:
                # Use color mode for HTML, simple for plain
                color_mode = mode == "color" or output_format == "html"
                result = transliterate_chinese(
                    text, mode="color" if color_mode else "simple"
                )

                if output_format == "html":
                    return jsonify(
                        {
                            "original": text,
                            "language": "chinese",
                            "mode": mode,
                            "html": result,
                            "result": result,  # Keep for backward compatibility
                        }
                    )
                else:
                    # Extract plain text from HTML if needed
                    if hasattr(result, "prettify"):
                        import re

                        plain_text = re.sub(r"<[^>]+>", "", str(result))
                    else:
                        plain_text = str(result)

                    return jsonify(
                        {
                            "original": text,
                            "language": "chinese",
                            "mode": mode,
                            "result": plain_text,
                        }
                    )

        # For other languages
        result = transliterate(text, language)

        # Format based on language and output type
        if language in ["ja", "japanese"] and isinstance(result, list):
            if output_format == "html":
                # Generate HTML with furigana
                html_result = add_furigana(text, result, language)
                if hasattr(html_result, "prettify"):
                    html_result = str(html_result)

                return jsonify(
                    {
                        "original": text,
                        "language": language,
                        "result": result,
                        "html": html_result,
                    }
                )
            else:
                # Return structured data for Japanese
                return jsonify(
                    {
                        "original": text,
                        "language": language,
                        "result": result,
                        "plain": " ".join([item.get("hepburn", "") for item in result]),
                    }
                )

        elif language in ["ko", "kr", "korean"] and isinstance(result, list):
            # Korean returns list of [char, trans] pairs
            plain_result = " ".join([trans for char, trans in result])

            if output_format == "html":
                html_result = add_furigana(text, result, language)
                if hasattr(html_result, "prettify"):
                    html_result = str(html_result)

                return jsonify(
                    {
                        "original": text,
                        "language": "korean",
                        "result": result,
                        "plain": plain_result,
                        "html": html_result,
                    }
                )
            else:
                return jsonify(
                    {"original": text, "language": "korean", "result": plain_result}
                )

        else:
            # Simple string result for other languages
            return jsonify(
                {"original": text, "language": language, "result": str(result)}
            )

    except Exception as e:
        logger.error(f"Transliteration error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


@app.route("/api/transliterate/chinese", methods=["POST"])
def transliterate_chinese_endpoint():
    """Chinese-specific transliteration endpoint with POS analysis"""
    try:
        data = request.json
        text = data.get("text", "")
        mode = data.get("mode", "color")  # 'simple', 'color', 'detailed'
        include_pos = data.get("include_pos", False)

        if not text:
            return jsonify({"error": "No text provided"}), 400

        if mode == "detailed" or include_pos:
            # Return detailed POS analysis
            analysis = get_detailed_pos_analysis(text)
            return jsonify(
                {
                    "original": text,
                    "analysis": analysis,
                    "html": transliterate_chinese(text, mode="color"),
                }
            )
        else:
            # Return HTML with pinyin
            result = transliterate_chinese(text, mode=mode)
            return jsonify(
                {
                    "original": text,
                    "html": str(result) if hasattr(result, "prettify") else result,
                    "mode": mode,
                }
            )

    except Exception as e:
        logger.error(f"Chinese transliteration error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


@app.route("/api/analyze/chinese", methods=["POST"])
def analyze_chinese():
    """Detailed Chinese syntax and POS analysis"""
    try:
        data = request.json
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Get detailed analysis
        analysis = get_detailed_pos_analysis(text)

        # Also get word-by-word breakdown
        words = []
        for item in analysis:
            words.append(
                {
                    "word": item["word"],
                    "pos": item["pos"],
                    "syntax": item["syntax"],
                    "pinyin": item["pinyin"],
                    "is_punctuation": item["is_punctuation"],
                }
            )

        # Get color-coded HTML version
        html_result = transliterate_chinese(text, mode="color")

        return jsonify(
            {
                "original": text,
                "words": words,
                "html": (
                    str(html_result)
                    if hasattr(html_result, "prettify")
                    else html_result
                ),
            }
        )

    except Exception as e:
        logger.error(f"Chinese analysis error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


@app.route("/api/detect-language", methods=["POST"])
def detect_language():
    """Detect if text contains characters from supported languages"""
    try:
        data = request.json
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        results = {}
        for lang in ["chinese", "japanese", "korean", "arabic", "russian", "hindi"]:
            results[lang] = is_language_text(text, lang)

        # Find the most likely language
        likely_langs = [lang for lang, present in results.items() if present]

        return jsonify(
            {
                "text": text[:100] + ("..." if len(text) > 100 else ""),
                "detected_languages": likely_langs,
                "details": results,
            }
        )

    except Exception as e:
        logger.error(f"Language detection error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


# For local development
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
