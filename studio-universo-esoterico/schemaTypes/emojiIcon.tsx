/** Ícono de documento hecho con un emoji, para que el menú del panel sea más visual. */
export function emojiIcon(emoji: string) {
  return function EmojiIcon() {
    return <span style={{ fontSize: '1.1em', lineHeight: 1 }}>{emoji}</span>
  }
}
