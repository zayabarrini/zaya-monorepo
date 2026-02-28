export async function translateToEnglish(text: string) {
  const res = await fetch(
    "https://libretranslate.com/translate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: "en"
      })
    }
  );

  const data = await res.json();
  return data.translatedText;
}

export async function translateWord(
  text: string
): Promise<string> {
  const url = "https://libretranslate.com/translate"; // Public LibreTranslate API endpoint
  const payload = {
    q: text,
    source: "auto", // Automatically detect the source language
    target: "en", // Translate to English
    format: "text"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(
        `Translation failed: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.translatedText; // Return the translated text
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return the original text if translation fails
  }
}
