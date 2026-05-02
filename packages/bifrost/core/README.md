# @bifrost/core

Bifrost core React component library.

## Install

```bash
pnpm add @bifrost/core
```

Peer deps: `react`, `react-dom` (>=18). Tailwind CSS v4 in consumer app for styles.

## Usage

```tsx
import { Button } from "@bifrost/core";

export function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Scripts

- `pnpm build` — build ESM + CJS + types via tsup
- `pnpm dev` — watch mode
- `pnpm test` — Vitest
- `pnpm typecheck` — `tsc --noEmit`
