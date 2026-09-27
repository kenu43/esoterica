import { cn } from '@/shared/lib'

/** Haz de luz diagonal que aparece al cargar (inspirado en Aceternity UI "Spotlight"). */
export function Spotlight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        'pointer-events-none absolute z-0 h-[169%] w-[138%] opacity-0 lg:w-[84%]',
        'animate-[spotlight_2.2s_ease_0.4s_1_forwards]',
        className,
      )}
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <style>{`@keyframes spotlight{0%{opacity:0;transform:translate(-72%,-62%) scale(.5)}100%{opacity:1;transform:translate(-50%,-40%) scale(1)}}`}</style>
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="var(--gold)"
          fillOpacity="0.18"
        />
      </g>
      <defs>
        <filter
          id="spotlight-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  )
}
