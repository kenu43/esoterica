/**
 * Sonidos místicos sintetizados con Web Audio (sin archivos): campanillas con cola larga, soplo de aire y clics suaves.
 * Los navegadores solo dejan sonar tras un toque del usuario; si no hay permiso, simplemente no suena.
 */
let ctx: AudioContext | null = null
let master: GainNode | null = null

const KEY = 'ue-sound'
export const isSoundOn = () => {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}
export const setSoundOn = (on: boolean) => {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* sin almacenamiento */
  }
}

function audio() {
  if (typeof window === 'undefined' || !isSoundOn()) return null
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  if (!ctx) {
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.55
    // Eco suave que da sensación de templo/cueva.
    const delay = ctx.createDelay(0.6)
    delay.delayTime.value = 0.23
    const fb = ctx.createGain()
    fb.gain.value = 0.38
    const wet = ctx.createGain()
    wet.gain.value = 0.35
    delay.connect(fb).connect(delay)
    master.connect(ctx.destination)
    master.connect(delay)
    delay.connect(wet).connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Nota de campanilla: fundamental + armónicos inarmónicos con caída exponencial. */
function bell(c: AudioContext, freq: number, at: number, vol = 0.18, decay = 1.8) {
  for (const [mult, v] of [[1, 1], [2.756, 0.35], [5.404, 0.16]] as const) {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.value = freq * mult
    g.gain.setValueAtTime(0.0001, at)
    g.gain.exponentialRampToValueAtTime(vol * v, at + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, at + decay / mult ** 0.5)
    o.connect(g).connect(master!)
    o.start(at)
    o.stop(at + decay + 0.1)
  }
}

/** Soplo de aire filtrado que sube o baja (barajar, voltear). */
function whoosh(c: AudioContext, at: number, dur: number, from: number, to: number, vol = 0.16) {
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buf
  const f = c.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 1.4
  f.frequency.setValueAtTime(from, at)
  f.frequency.exponentialRampToValueAtTime(to, at + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(vol, at + dur * 0.35)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  src.connect(f).connect(g).connect(master!)
  src.start(at)
}

let nextCardSlot = 0

/**
 * Carta que se revela. Las tres de una tirada suenan como una frase: cada una es una nota más alta de la misma
 * escala (sol → do → mi) y, si se abren seguidas, se encolan en vez de pisarse. La tercera cierra con un acorde.
 */
export function playCardFlip(order = 0, finale = false) {
  const c = audio()
  if (!c) return
  const start = Math.max(c.currentTime, nextCardSlot)
  nextCardSlot = start + (finale ? 1.1 : 0.62)
  const note = [392, 523.25, 659.25][Math.min(order, 2)]
  whoosh(c, start, 0.28, 500, 2400, 0.12)
  bell(c, note, start + 0.16, 0.15, 2.2)
  if (finale) {
    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => bell(c, f, start + 0.4 + i * 0.07, 0.08, 3.2))
  }
}

/** Ruleta que empieza a girar. */
export function playSpinStart() {
  const c = audio()
  if (!c) return
  whoosh(c, c.currentTime, 0.7, 300, 3000, 0.14)
  bell(c, 523.25, c.currentTime + 0.05, 0.1, 1.4)
}

/** Clic de cada número que pasa; `step` (0..1) sube el tono hacia el final. */
export function playSpinTick(step = 0) {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = 'triangle'
  o.frequency.value = 520 + step * 520
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.004)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  o.connect(g).connect(master!)
  o.start(t)
  o.stop(t + 0.12)
}

/** Un carril se detiene: campanita corta. */
export function playReelStop(index = 0) {
  const c = audio()
  if (!c) return
  bell(c, [523.25, 659.25, 783.99, 987.77][index % 4], c.currentTime, 0.13, 1.2)
}

/** Resultado revelado: arpegio ascendente en pentatónica con brillo final. */
export function playReveal() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  ;[523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => bell(c, f, t + i * 0.11, 0.14, 2.8))
  whoosh(c, t + 0.45, 0.9, 1800, 6000, 0.05)
  bell(c, 2093, t + 0.62, 0.07, 3)
}

/** Barajar: ráfagas de aire cortas (cartas rozándose) que se aceleran y luego se calman. */
export function playShuffle(durationMs = 1500) {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const n = 14
  for (let i = 0; i < n; i++) {
    const p = i / (n - 1)
    // Más seguidas al centro, más espaciadas al principio y al final.
    const at = t + (durationMs / 1000) * (0.5 - 0.5 * Math.cos(Math.PI * p)) * 0.92
    whoosh(c, at, 0.09, 1800 + Math.random() * 2200, 700 + Math.random() * 600, 0.07 + 0.04 * Math.sin(Math.PI * p))
  }
  bell(c, 392, t + 0.05, 0.06, 1.6)
}

/** Una carta que cae en su lugar: golpecito suave + campanilla grave. */
export function playCardDeal(index = 0) {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  whoosh(c, t, 0.16, 900, 300, 0.12)
  bell(c, [349.23, 440, 523.25][index % 3], t + 0.08, 0.1, 1.8)
}

/** Merlín responde: dos pulsaciones de arpa grave y un velo de aire; más bajito y apagado que las campanillas de las cartas. */
export function playMerlinReply() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const pluck = (freq: number, at: number) => {
    const o = c.createOscillator()
    const lp = c.createBiquadFilter()
    const g = c.createGain()
    o.type = 'triangle'
    o.frequency.value = freq
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(1800, at)
    lp.frequency.exponentialRampToValueAtTime(320, at + 0.8)
    g.gain.setValueAtTime(0.0001, at)
    g.gain.exponentialRampToValueAtTime(0.42, at + 0.015)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 1.1)
    o.connect(lp).connect(g).connect(master!)
    o.start(at)
    o.stop(at + 1)
  }
  whoosh(c, t, 0.7, 220, 700, 0.1)
  pluck(329.63, t + 0.05) // mi4
  pluck(246.94, t + 0.26) // si3
  pluck(196, t + 0.5) // sol3
}

// Desbloquea el audio con el primer toque de la persona: así los sonidos que llegan después de una espera
// (la respuesta de Merlín, por ejemplo) sí se oyen, porque el navegador ya dio permiso.
if (typeof window !== 'undefined') {
  const unlock = () => {
    audio()
    window.removeEventListener('pointerdown', unlock)
    window.removeEventListener('keydown', unlock)
  }
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('keydown', unlock)
}
