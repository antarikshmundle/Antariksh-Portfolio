import styles from "./moonrise.module.css";

/**
 * Decorative closing motif for the contact section: the hero's red moon,
 * half risen behind a ridge and a small torii. Hidden from assistive tech.
 */
export function Moonrise({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="relative aspect-[4/3] w-full">
        <div className={styles.moon} />
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path
            fill="var(--color-background)"
            d="M0 300 L0 226 Q70 200 140 214 Q210 228 262 206 Q330 180 400 204 L400 300Z"
          />
          {/* Torii on the ridge */}
          <path
            fill="var(--color-background)"
            d="M114 216 L117 178 L123 178 L124 216Z M156 216 L157 178 L163 178 L166 216Z M108 190 L172 190 L172 195 L108 195Z M98 170 Q140 178 182 170 L178 180 Q140 186 102 180Z"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
      </div>
    </div>
  );
}
