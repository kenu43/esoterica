import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib'

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

interface ProductVideoPlayerProps {
  src: string
  poster?: string
  name: string
  className?: string
}

/** Reproductor propio: sin menú de descarga, con controles dorados y botón central. */
export function ProductVideoPlayer({ src, poster, name, className }: ProductVideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const v = ref.current
    return () => v?.pause()
  }, [src])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
  }

  return (
    <div ref={box} className={cn('group/player relative size-full bg-black', className)} onContextMenu={(e) => e.preventDefault()}>
      <video
        ref={ref}
        src={src}
        poster={poster || undefined}
        playsInline
        preload="metadata"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        aria-label={`Video de ${name}`}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="size-full cursor-pointer object-contain"
      />

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Reproducir video"
          className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/10"
        >
          <span className="grid size-16 place-items-center rounded-full border border-gold/60 bg-black/55 text-gold shadow-[0_0_30px_var(--gold-soft)] backdrop-blur-sm transition-transform group-hover/player:scale-105">
            <Play className="ml-1 size-7 fill-current" aria-hidden />
          </span>
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8 text-white">
        <button type="button" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'} className="text-gold">
          {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          aria-label="Progreso del video"
          onChange={(e) => {
            if (ref.current) ref.current.currentTime = Number(e.target.value)
          }}
          className="h-1 min-w-0 flex-1 cursor-pointer accent-[var(--gold)]"
        />
        <span className="shrink-0 text-xs tabular-nums text-white/80">
          {fmt(time)} / {fmt(duration)}
        </span>
        <button
          type="button"
          onClick={() => {
            if (ref.current) ref.current.muted = !muted
            setMuted(!muted)
          }}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
        <button type="button" onClick={() => void (document.fullscreenElement ? document.exitFullscreen() : box.current?.requestFullscreen())} aria-label="Pantalla completa">
          <Maximize className="size-5" />
        </button>
      </div>
    </div>
  )
}
