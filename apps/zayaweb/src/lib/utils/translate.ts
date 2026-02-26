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
