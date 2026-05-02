import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {Button} from '@site/src/components/ui/button';
import {Badge} from '@site/src/components/ui/badge';
import {Card, CardDescription, CardHeader, CardIcon, CardTitle} from '@site/src/components/ui/card';
import {GradientText} from '@site/src/components/ui/gradient-text';
import {Aurora, GridBackground} from '@site/src/components/ui/aurora';

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora intensity="medium" />
      <GridBackground />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-6 pt-32 pb-32 text-center sm:pb-40">
        <Badge variant="default" dot>
          v0.1 — now in public beta
        </Badge>

        <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--ifm-heading-color)] sm:text-7xl">
          The bridge between
          <br />
          <GradientText className="pb-2">code and motion.</GradientText>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--bifrost-text-muted)] sm:text-xl">
          Bifrost is a plug-and-play component library for Remotion. Composable
          primitives, opinionated motion, zero boilerplate — ship video faster.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button to="/docs/intro" variant="primary" size="lg">
            Get started
            <span aria-hidden>→</span>
          </Button>
          <Button to="/docs/intro" variant="secondary" size="lg">
            <span aria-hidden className="font-mono text-xs opacity-60">$</span>
            npm i @bifrost/remotion
          </Button>
        </div>

        <div className="mt-16 flex items-center gap-6 text-xs text-[var(--bifrost-text-muted)]">
          <span className="font-mono tracking-tight">REMOTION 4+</span>
          <span className="h-3 w-px bg-[var(--bifrost-border-strong)]" />
          <span className="font-mono tracking-tight">REACT 19</span>
          <span className="h-3 w-px bg-[var(--bifrost-border-strong)]" />
          <span className="font-mono tracking-tight">MIT</span>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: '◆',
    title: 'Composable primitives',
    body: 'Drop-in components with predictable APIs. Compose them — never fight them.',
  },
  {
    icon: '✦',
    title: 'Motion, opinionated',
    body: 'Curated easings, springs, and timing presets that match how things move IRL.',
  },
  {
    icon: '◇',
    title: 'TypeScript native',
    body: 'Strict types throughout. Autocomplete every prop. Zero any.',
  },
  {
    icon: '✧',
    title: 'Themeable surfaces',
    body: 'CSS variables, design tokens, and dark mode out of the box.',
  },
  {
    icon: '◈',
    title: 'Render-ready',
    body: 'Built for Remotion render pipelines. Frame-accurate, deterministic.',
  },
  {
    icon: '✦',
    title: 'Tiny footprint',
    body: 'Tree-shakeable, dependency-light, no runtime CSS-in-JS overhead.',
  },
];

function Features() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-14 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--ifm-heading-color)] sm:text-4xl">
          Everything you need.
          <br />
          <span className="text-[var(--bifrost-text-muted)]">Nothing you don&apos;t.</span>
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} glow>
            <CardHeader>
              <CardIcon>{f.icon}</CardIcon>
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardDescription>{f.body}</CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--bifrost-border)] bg-[var(--bifrost-surface-strong)] px-8 py-16 text-center backdrop-blur-xl sm:px-16 sm:py-20">
        <Aurora intensity="subtle" />
        <div className="relative">
          <h3 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-[var(--ifm-heading-color)] sm:text-5xl">
            Cross the bridge.
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--bifrost-text-muted)] sm:text-lg">
            Start building with Bifrost in under sixty seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/docs/intro" variant="primary" size="lg">
              Read the docs
              <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Plug-and-play components for Remotion.">
      <Hero />
      <Features />
      <CTA />
    </Layout>
  );
}
