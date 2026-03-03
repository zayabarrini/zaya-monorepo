// src/content/utils.js
export function log(...args) {
  if (typeof window !== 'undefined' && window.DEBUG) {
    console.log('🔊 [ReadAloud]:', ...args);
  }
}

export function getWordUnderCursor(event) {
  const target = event.target;
  if (!target || ['BUTTON', 'INPUT', 'SELECT', 'A'].includes(target.tagName)) {
    return null;
  }

  const range = document.caretRangeFromPoint(event.clientX, event.clientY);
  if (!range) return null;

  const textNode = range.startContainer;
  const offset = range.startOffset;

  if (textNode.nodeType !== Node.TEXT_NODE) return null;

  const text = textNode.textContent || '';
  let start = offset;
  let end = offset;

  while (start > 0 && !/\s/.test(text[start - 1])) start--;
  while (end < text.length && !/\s/.test(text[end])) end++;

  return text.substring(start, end).trim() || null;
}

export function getLineFromElement(element) {
  return element.innerText?.trim() || null;
}

export function isInteractiveElement(element) {
  return ['BUTTON', 'INPUT', 'SELECT', 'A'].includes(element?.tagName);
}
