import { Button, Tooltip } from '@heroui/react'
import { Music, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMusicStore } from '../model/music.store'

const TRACK_URL = '/audio/ambient.mp3'
const TARGET_VOLUME = 0.22
const FADE_MS = 1200

export function MusicToggle() {
  const isOn = useMusicStore((s) => s.isOn)
  const setOn = useMusicStore((s) => s.setOn)
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
          audio.volume = Math.max(0, Math.min(1, p * TARGET_VOLUME))
          if (p < 1) requestAnimationFrame(fadeIn)
        }
        requestAnimationFrame(fadeIn)
      })
      .catch(() => setNeedsGesture(true))
  }, [setOn])

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
            audio.volume = Math.max(0, Math.min(1, p * TARGET_VOLUME))
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
      <Tooltip delay={400}>
        <Button
          isIconOnly
          variant="ghost"
          aria-label={playing ? 'Silenciar música ambiental' : 'Reproducir música ambiental'}
          aria-pressed={playing}
          onPress={handlePress}
        >
          {playing ? <Music className="size-5 text-gold" /> : <VolumeX className="size-5" />}
        </Button>
        <Tooltip.Content>
          {playing ? 'Silenciar música' : needsGesture ? 'Toca para activar música' : 'Música ambiental'}
        </Tooltip.Content>
      </Tooltip>
    </>
  )
}
