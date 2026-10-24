/**
 * The hero's red moon as a self-contained SVG: halo, textured disc, soft
 * maria and thin cloud strands. Decorative. Sized by its container.
 */
export function RedMoon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 400" className={className}>
      <defs>
        <radialGradient id="moon-disc" cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#e2603f" />
          <stop offset="0.36" stopColor="#c43a22" />
          <stop offset="0.7" stopColor="#8f1e15" />
          <stop offset="1" stopColor="#4c0d09" />
        </radialGradient>
        <radialGradient id="moon-halo">
          <stop offset="0.45" stopColor="rgb(200,48,32)" stopOpacity="0.4" />
          <stop offset="0.7" stopColor="rgb(179,38,30)" stopOpacity="0.12" />
          <stop offset="1" stopColor="rgb(179,38,30)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moon-mare">
          <stop offset="0" stopColor="#3a0805" stopOpacity="0.34" />
          <stop offset="1" stopColor="#3a0805" stopOpacity="0" />
        </radialGradient>
        <clipPath id="moon-clip">
          <circle cx="200" cy="200" r="120" />
        </clipPath>
        {/* Lunar surface: fractal noise turned into soft dark mottling */}
        <filter id="moon-surface" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="4" seed="8" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.03  0 0 0 0 0.02  0 0 0 -2.2 1.35" />
        </filter>
        <filter id="moon-cloud" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#moon-halo)" />
      <circle cx="200" cy="200" r="120" fill="url(#moon-disc)" />
      <g clipPath="url(#moon-clip)">
        <rect x="80" y="80" width="240" height="240" filter="url(#moon-surface)" opacity="0.6" />
        <ellipse cx="166" cy="174" rx="38" ry="28" fill="url(#moon-mare)" />
        <ellipse cx="232" cy="212" rx="30" ry="24" fill="url(#moon-mare)" />
        <ellipse cx="188" cy="246" rx="24" ry="16" fill="url(#moon-mare)" />
        <circle cx="258" cy="152" r="10" fill="url(#moon-mare)" />
      </g>
      <g fill="#08090b" filter="url(#moon-cloud)">
        <rect x="40" y="236" width="210" height="9" rx="4.5" opacity="0.72" />
        <rect x="170" y="262" width="230" height="13" rx="6.5" opacity="0.78" />
        <rect x="90" y="296" width="170" height="7" rx="3.5" opacity="0.55" />
      </g>
    </svg>
  );
}
