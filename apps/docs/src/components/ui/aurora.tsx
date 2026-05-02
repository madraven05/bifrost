import type {HTMLAttributes} from 'react';
import {cn} from '@site/src/lib/utils';

type AuroraProps = HTMLAttributes<HTMLDivElement> & {
  intensity?: 'subtle' | 'medium' | 'strong';
};

export function Aurora({className, intensity = 'medium', ...props}: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      {...props}>
      <div
        className="bifrost-aurora"
        style={{
          opacity:
            intensity === 'subtle' ? 0.35 : intensity === 'strong' ? 0.85 : undefined,
        }}
      />
    </div>
  );
}

export function GridBackground({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 bifrost-grid-pattern', className)}
      {...props}
    />
  );
}
