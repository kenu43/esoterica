export function LogoMark() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="#d4a843" aria-hidden>
      <path d="M29 9a15 15 0 1 0 10 26A13 13 0 1 1 29 9Z" />
      <path d="m32.5 15.5 1.7 4.3 4.3 1.7-4.3 1.7-1.7 4.3-1.7-4.3-4.3-1.7 4.3-1.7Z" />
    </svg>
  )
}

export function Logo() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
      <LogoMark />
      <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '16px', fontWeight: 400, color: 'var(--sanity-color-text)' }}>
        Universo Esotérico
      </span>
    </span>
  )
}
