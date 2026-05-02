import {forwardRef, type ButtonHTMLAttributes, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@site/src/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--ifm-color-primary)] text-[var(--bifrost-bg-base)] hover:opacity-90 hover:no-underline hover:text-[var(--bifrost-bg-base)] focus-visible:ring-[color:var(--bifrost-border-strong)] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:-translate-y-0.5',
        secondary:
          'bifrost-glass text-[var(--ifm-color-content)] hover:no-underline hover:text-[var(--ifm-color-content)] hover:border-[var(--bifrost-border-strong)] focus-visible:ring-[color:var(--bifrost-border-strong)]',
        ghost:
          'text-[var(--ifm-color-emphasis-800)] hover:bg-[var(--ifm-color-emphasis-100)] hover:no-underline hover:text-[var(--ifm-color-content)]',
        outline:
          'border border-[var(--bifrost-border-strong)] bg-transparent text-[var(--ifm-color-content)] hover:bg-[var(--ifm-color-emphasis-100)] hover:no-underline hover:text-[var(--ifm-color-content)]',
      },
      size: {
        sm: 'h-8 px-3.5 text-xs',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asLink?: boolean;
    to?: string;
    href?: string;
    children?: ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asLink, to, href, children, ...props}, ref) => {
    const classes = cn(buttonVariants({variant, size}), className);

    if (asLink || to || href) {
      return (
        <Link to={to} href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export {buttonVariants};
