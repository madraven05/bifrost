import type {HTMLAttributes, ReactNode} from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@site/src/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        default:
          'bifrost-glass text-[var(--ifm-color-emphasis-800)]',
        prism:
          'border border-[var(--bifrost-border)] bg-[var(--bifrost-surface)] text-[var(--ifm-color-emphasis-800)] backdrop-blur',
        solid:
          'bg-[var(--ifm-color-primary)] text-[var(--bifrost-bg-base)]',
        outline:
          'border border-[var(--bifrost-border-strong)] text-[var(--ifm-color-emphasis-800)]',
      },
    },
    defaultVariants: {variant: 'default'},
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    children?: ReactNode;
    dot?: boolean;
  };

export function Badge({className, variant, children, dot, ...props}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({variant}), className)} {...props}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-bifrost-cyan)] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-bifrost-cyan)]" />
        </span>
      )}
      {children}
    </span>
  );
}
