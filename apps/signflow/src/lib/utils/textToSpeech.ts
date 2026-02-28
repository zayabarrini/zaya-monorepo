// textToSpeech.ts
export function speak(text: string): void {
  // Implement your text-to-speech logic here
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
