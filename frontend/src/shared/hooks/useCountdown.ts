import { useEffect, useState } from 'react'

const nextMidnight = () => {
  const d = new Date()
  d.setHours(24, 0, 0, 0)
  return d.getTime()
}

/** Cuenta regresiva hasta la medianoche local: "HH:MM:SS" y los segundos que faltan. */
export function useCountdownToMidnight() {
  const [left, setLeft] = useState(() => Math.max(0, nextMidnight() - Date.now()))
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, nextMidnight() - Date.now())), 1000)
    return () => clearInterval(id)
  }, [])
  const s = Math.floor(left / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return { label: `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`, seconds: s }
}

/** Cuenta regresiva hasta un momento (ms). `left` es 0 cuando ya pasó; `label` sale como "6 d 23:59:12". */
export function useCountdownTo(target: number | null) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (target == null) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const left = target == null ? 0 : Math.max(0, target - now)
  const s = Math.floor(left / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  const days = Math.floor(s / 86400)
  const clock = `${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
  return { left, label: days > 0 ? `${days} d ${clock}` : clock }
}
