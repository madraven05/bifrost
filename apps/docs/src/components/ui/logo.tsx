import type {SVGProps} from 'react';
import {cn} from '@site/src/lib/utils';

type LogoMarkProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Bifrost mark — stylized rainbow bridge arc.
 * Seven concentric strokes form the prism. Monochrome by default;
 * `colored` mode reveals the prism gradient.
 */
export function LogoMark({className, size = 28, ...props}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}>
      <defs>
        <linearGradient id="bifrost-mark-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="25%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="75%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M3 26 A13 13 0 0 1 29 26"
        stroke="url(#bifrost-mark-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M6 26 A10 10 0 0 1 26 26"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9 26 A7 7 0 0 1 23 26"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="26" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function LogoWordmark({className, size = 24}: {className?: string; size?: number}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark size={size} />
      <span className="text-lg font-semibold tracking-tight text-[var(--ifm-color-content)]">
        Bifrost
      </span>
    </span>
  );
}
