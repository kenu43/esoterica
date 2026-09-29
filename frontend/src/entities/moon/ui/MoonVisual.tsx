import { useId } from 'react'

/**
 * Luna en SVG: disco con relieve (mares, cráteres, grano), oscurecimiento del borde y
 * terminador suave según la fase real. El lado oscuro conserva una "luz cenicienta" tenue.
 */
export function MoonVisual({ fraction, className }: { fraction: number; className?: string }) {
  const uid = useId().replace(/:/g, '')
  const id = (name: string) => `${name}-${uid}`

  const waxing = fraction < 0.5
  const k = Math.cos(fraction * 2 * Math.PI)
  const rx = Math.abs(k) * 90

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Fase lunar actual">
      <defs>
        <radialGradient id={id('base')} cx="38%" cy="34%" r="82%">
          <stop offset="0%" stopColor="#f7f2e4" />
          <stop offset="55%" stopColor="#d9d1bd" />
          <stop offset="100%" stopColor="#9b9483" />
        </radialGradient>
        <radialGradient id={id('limb')} cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <radialGradient id={id('crater')} cx="42%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.26" />
          <stop offset="70%" stopColor="#000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.28" />
        </radialGradient>
        <radialGradient id={id('tycho')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={id('mare')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <filter id={id('soft')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={id('grain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.28  0 0 0 0 0.26  0 0 0 0 0.22  0 0 0 0.55 -0.12" />
        </filter>
        <clipPath id={id('disc')}>
          <circle cx="100" cy="100" r="90" />
        </clipPath>
        <mask id={id('shadow')}>
          <g filter={`url(#${id('soft')})`}>
            <rect width="200" height="200" fill="#fff" />
            <path d={waxing ? 'M100 10A90 90 0 0 1 100 190Z' : 'M100 10A90 90 0 0 0 100 190Z'} fill="#000" />
            <ellipse cx="100" cy="100" rx={rx} ry="90" fill={k > 0 ? '#fff' : '#000'} />
          </g>
        </mask>
      </defs>

      <g clipPath={`url(#${id('disc')})`}>
        <rect width="200" height="200" fill={`url(#${id('base')})`} />

        <g fill="#6f695b" opacity="0.5" filter={`url(#${id('mare')})`}>
          <path d="M52 62c10-14 30-16 40-6 8 8 4 20-6 26-12 8-30 6-36-6-2-5-1-10 2-14Z" />
          <path d="M40 96c8-6 18-4 22 4 6 12-2 26-12 30-10 3-18-6-18-16 0-8 3-14 8-18Z" />
          <path d="M96 84c10-8 22-4 26 6 3 9-3 18-12 20-9 2-18-4-18-13 0-5 1-9 4-13Z" />
          <path d="M118 108c10-2 20 4 20 12 0 9-10 14-19 12-8-2-12-8-10-14 1-5 4-9 9-10Z" />
          <path d="M84 118c7-4 15 0 15 7 0 6-7 10-13 8-6-2-8-9-2-15Z" />
        </g>

        <g fill={`url(#${id('crater')})`}>
          <circle cx="70" cy="150" r="9" />
          <circle cx="132" cy="70" r="6" />
          <circle cx="146" cy="96" r="5" />
          <circle cx="108" cy="150" r="7" />
          <circle cx="58" cy="118" r="4.5" />
          <circle cx="126" cy="140" r="4" />
          <circle cx="150" cy="128" r="6.5" />
          <circle cx="92" cy="52" r="4" />
          <circle cx="112" cy="46" r="3" />
        </g>
        <g opacity="0.85">
          <circle cx="96" cy="166" r="14" fill={`url(#${id('tycho')})`} opacity="0.55" />
          <circle cx="96" cy="166" r="3.2" fill="#fff" />
        </g>

        <rect width="200" height="200" filter={`url(#${id('grain')})`} opacity="0.5" style={{ mixBlendMode: 'multiply' }} />
        <circle cx="100" cy="100" r="90" fill={`url(#${id('limb')})`} />

        <rect width="200" height="200" fill="#04040e" opacity="0.94" mask={`url(#${id('shadow')})`} />
      </g>
    </svg>
  )
}
