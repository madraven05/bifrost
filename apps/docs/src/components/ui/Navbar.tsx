import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import {LogoMark} from './logo';
import {Button} from './button';
import {cn} from '@site/src/lib/utils';

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function ColorModeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <button
      type="button"
      aria-label="Toggle color mode"
      onClick={() => setColorMode(isDark ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--bifrost-border)] bg-[var(--bifrost-surface)] text-[var(--ifm-color-emphasis-800)] transition-all duration-200 hover:border-[var(--bifrost-border-strong)] hover:text-[var(--ifm-color-content)]">
      <span className="text-sm">{isDark ? '☀' : '☾'}</span>
    </button>
  );
}

function NavLink({to, href, children, className}: {to?: string; href?: string; children: ReactNode; className?: string}) {
  return (
    <Link
      to={to}
      href={href}
      className={cn(
        'relative rounded-full px-3.5 py-1.5 text-sm text-[var(--ifm-color-emphasis-700)] transition-colors duration-200',
        'hover:bg-[var(--ifm-color-emphasis-100)] hover:text-[var(--ifm-color-content)] hover:no-underline',
        className,
      )}>
      {children}
    </Link>
  );
}

export default function Navbar(): ReactNode {
  const scrolled = useScrolled();
  return (
    <nav
      className={cn(
        'navbar sticky top-0 z-50 w-full transition-all duration-300 ease-out',
        scrolled
          ? 'border-b border-[var(--bifrost-border)] bg-[var(--bifrost-bg-base)]/70 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent',
      )}>
      <div className="mx-auto flex h-16 w-full max-w-[96rem] items-center justify-between px-4 sm:px-8">
        <Link
          to="/"
          aria-label="Bifrost — home"
          className="group flex items-center gap-2.5 hover:no-underline">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--bifrost-border)] bg-[var(--bifrost-surface-strong)] transition-all duration-200 group-hover:border-[var(--bifrost-border-strong)]">
            <LogoMark size={22} className="text-[var(--ifm-color-content)]" />
          </span>
          <span className="text-base font-semibold tracking-tight text-[var(--ifm-color-content)]">
            Bifrost
          </span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          <NavLink to="/docs/intro">Docs</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink href="https://github.com/facebook/docusaurus">GitHub</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <ColorModeToggle />
          <Button to="/docs/intro" variant="primary" size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
