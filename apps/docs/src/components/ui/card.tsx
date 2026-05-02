import type {HTMLAttributes, ReactNode} from 'react';
import {cn} from '@site/src/lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
  children?: ReactNode;
};

export function Card({className, glow, children, ...props}: CardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bifrost-glass p-6 transition-all duration-300',
        'hover:border-[var(--bifrost-border-strong)] hover:-translate-y-0.5',
        glow && 'hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.3)]',
        className,
      )}
      {...props}>
      {glow && (
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-bifrost-indigo)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
      )}
      {children}
    </div>
  );
}

export function CardHeader({className, children, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-3 flex items-center gap-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({className, children, ...props}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-base font-semibold tracking-tight text-[var(--ifm-heading-color)]',
        className,
      )}
      {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({className, children, ...props}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm leading-relaxed text-[var(--bifrost-text-muted)]', className)}
      {...props}>
      {children}
    </p>
  );
}

export function CardIcon({className, children, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--bifrost-border)] bg-[var(--bifrost-surface-strong)] text-[var(--ifm-color-emphasis-800)]',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}
