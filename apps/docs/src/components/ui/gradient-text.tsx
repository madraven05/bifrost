import type {HTMLAttributes, ReactNode} from 'react';
import {cn} from '@site/src/lib/utils';

type GradientTextProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3';
};

export function GradientText({className, children, as = 'span', ...props}: GradientTextProps) {
  const Tag = as as 'span';
  return (
    <Tag
      className={cn(
        'inline-block bifrost-prism-text',
        className,
      )}
      {...props}>
      {children}
    </Tag>
  );
}
