import { Button } from '@heroui/react'
import { Music, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMusicStore } from '../model/music.store'

const TRACK_URL = '/audio/ambient.mp3'
const MAX_VOLUME = 0.45
const FADE_MS = 1200

export function MusicToggle() {
  const isOn = useMusicStore((s) => s.isOn)
  const setOn = useMusicStore((s) => s.setOn)
  const volume = useMusicStore((s) => s.volume)
  const setVolume = useMusicStore((s) => s.setVolume)
  const volumeRef = useRef(volume)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [needsGesture, setNeedsGesture] = useState(false)

  const playing = isOn && !needsGesture

  const startFade = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio
      .play()
      .then(() => {
        setNeedsGesture(false)
        setOn(true)
        const start = performance.now()
        const fadeIn = (t: number) => {
          const p = Math.min(1, (t - start) / FADE_MS)
          audio.volume = Math.max(0, Math.min(1, p * volumeRef.current * MAX_VOLUME))
          if (p < 1) requestAnimationFrame(fadeIn)
        }
        requestAnimationFrame(fadeIn)
      })
      .catch(() => setNeedsGesture(true))
  }, [setOn])

  useEffect(() => {
    volumeRef.current = volume
    if (audioRef.current && !audioRef.current.paused) audioRef.current.volume = Math.min(1, volume * MAX_VOLUME)
  }, [volume])

  const handlePress = useCallback(() => {
    if (playing) {
      setNeedsGesture(false)
      setOn(false)
    } else {
      startFade()
    }
  }, [playing, setOn, startFade])

  useEffect(() => {
    if (!isOn) {
      audioRef.current?.pause()
      return
    }

    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio.volume = 0
      audio
        .play()
        .then(() => {
          setNeedsGesture(false)
          const start = performance.now()
          const fadeIn = (t: number) => {
            const p = Math.min(1, (t - start) / FADE_MS)
            audio.volume = Math.max(0, Math.min(1, p * volumeRef.current * MAX_VOLUME))
            if (p < 1) requestAnimationFrame(fadeIn)
          }
          requestAnimationFrame(fadeIn)
        })
        .catch(() => setNeedsGesture(true))
    }

    const kick = () => {
      if (useMusicStore.getState().isOn) startFade()
    }
    window.addEventListener('pointerdown', kick, { once: true })
    window.addEventListener('keydown', kick, { once: true })

    if (audio.readyState >= 2) {
      tryPlay()
    } else {
      audio.addEventListener('loadeddata', tryPlay, { once: true })
    }
    return () => {
      window.removeEventListener('pointerdown', kick)
      window.removeEventListener('keydown', kick)
      audio.removeEventListener('loadeddata', tryPlay)
    }
  }, [isOn, startFade])

  return (
    <>
      <audio ref={audioRef} src={TRACK_URL} loop preload="auto" />
      <div className="group/vol relative flex items-center">
        <Button
          isIconOnly
          variant="ghost"
          aria-label={playing ? 'Silenciar música ambiental' : 'Reproducir música ambiental'}
          aria-pressed={playing}
          onPress={handlePress}
        >
          {playing ? <Music className="size-5 text-gold" /> : <VolumeX className="size-5" />}
        </Button>
        {/* Control de volumen: aparece al pasar el mouse o al enfocar el botón. */}
        <div className="pointer-events-none absolute right-0 top-full z-50 w-44 origin-top-right scale-95 pt-2 opacity-0 transition-[opacity,scale] duration-200 group-focus-within/vol:pointer-events-auto group-focus-within/vol:scale-100 group-focus-within/vol:opacity-100 group-hover/vol:pointer-events-auto group-hover/vol:scale-100 group-hover/vol:opacity-100">
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-overlay px-3 py-2.5 shadow-xl shadow-black/30">
            <span className="shrink-0 text-gold" aria-hidden>
              {volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              aria-label="Volumen de la música"
              onChange={(e) => {
                const v = Number(e.target.value)
                setVolume(v)
                if (v > 0 && !playing) startFade()
              }}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-[var(--gold)]"
            />
            <span className="w-8 shrink-0 text-right text-xs tabular-nums text-muted">{Math.round(volume * 100)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
