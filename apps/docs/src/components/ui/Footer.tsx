import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {LogoMark} from './logo';

const sections: {title: string; links: {label: string; to?: string; href?: string}[]}[] = [
  {
    title: 'Product',
    links: [
      {label: 'Docs', to: '/docs/intro'},
      {label: 'Blog', to: '/blog'},
    ],
  },
  {
    title: 'Resources',
    links: [
      {label: 'GitHub', href: 'https://github.com/facebook/docusaurus'},
      {label: 'Remotion', href: 'https://remotion.dev'},
    ],
  },
];

export default function Footer(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const year = new Date().getFullYear();

  return (
    <footer className="footer relative mt-24">
      <div className="bifrost-hairline" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--bifrost-border)] bg-[var(--bifrost-surface-strong)]">
                <LogoMark size={22} className="text-[var(--ifm-color-content)]" />
              </span>
              <span className="text-base font-semibold tracking-tight text-[var(--ifm-color-content)]">
                Bifrost
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--bifrost-text-muted)]">
              Plug-and-play components for Remotion. The bridge between code and motion.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ifm-color-emphasis-700)]">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      href={link.href}
                      className="text-sm text-[var(--bifrost-text-muted)] transition-colors duration-200 hover:text-[var(--ifm-color-content)] hover:no-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--bifrost-border)] pt-6 text-xs text-[var(--bifrost-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.title}. All rights reserved.</p>
          <p className="font-mono tracking-tight">v0.1.0 — built on the rainbow bridge</p>
        </div>
      </div>
    </footer>
  );
}
