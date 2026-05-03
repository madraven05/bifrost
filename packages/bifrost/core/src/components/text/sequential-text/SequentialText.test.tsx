import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

let mockFrame = 0;

vi.mock("remotion", () => ({
  useCurrentFrame: () => mockFrame,
  useVideoConfig: () => ({
    fps: 30,
    width: 1920,
    height: 1080,
    durationInFrames: 300,
  }),
  spring: ({ frame, durationInFrames }: { frame: number; durationInFrames: number }) =>
    Math.max(0, Math.min(1, frame / durationInFrames)),
  interpolate: (
    v: number,
    [a0, a1]: [number, number],
    [b0, b1]: [number, number],
    opts?: { easing?: (t: number) => number },
  ) => {
    const tRaw = (v - a0) / (a1 - a0);
    const t = Math.max(0, Math.min(1, tRaw));
    const eased = opts?.easing ? opts.easing(t) : t;
    return b0 + eased * (b1 - b0);
  },
  Easing: {
    cubic: (t: number) => t * t * t,
    exp: (t: number) => Math.pow(2, 10 * (t - 1)),
    bounce: (t: number) => 1 - Math.pow(1 - t, 2),
    out: (fn: (t: number) => number) => (t: number) => 1 - fn(1 - t),
  },
}));

beforeAll(() => {
  // jsdom returns 0 for getBoundingClientRect; stub a non-zero width so the
  // measurement-driven width animation has something to interpolate.
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: () => ({
      width: 100,
      height: 20,
      top: 0,
      left: 0,
      right: 100,
      bottom: 20,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }),
  });
});

import { SequentialText } from "./SequentialText.js";

const visibleWord = (text: string) =>
  screen
    .getAllByText(text)
    .find((el) => el.closest("[data-word-index]") !== null) as HTMLElement;

const wordWrapper = (text: string) =>
  visibleWord(text).closest("[data-word-index]") as HTMLElement;

describe("SequentialText", () => {
  it("marks only the first word visible at frame 0", () => {
    mockFrame = 0;
    render(<SequentialText words={["one", "two", "three"]} staggerInFrames={15} />);
    expect(wordWrapper("one")).toHaveAttribute("data-visible", "true");
    expect(wordWrapper("two")).toHaveAttribute("data-visible", "false");
    expect(wordWrapper("three")).toHaveAttribute("data-visible", "false");
  });

  it("marks subsequent words visible once their enter frame is reached", () => {
    mockFrame = 16;
    render(<SequentialText words={["one", "two", "three"]} staggerInFrames={15} />);
    expect(wordWrapper("one")).toHaveAttribute("data-visible", "true");
    expect(wordWrapper("two")).toHaveAttribute("data-visible", "true");
    expect(wordWrapper("three")).toHaveAttribute("data-visible", "false");
  });

  it("renders all words past total stagger window with full width", () => {
    mockFrame = 1000;
    render(<SequentialText words={["one", "two", "three"]} staggerInFrames={15} />);
    for (const w of ["one", "two", "three"]) {
      expect(wordWrapper(w)).toHaveAttribute("data-visible", "true");
      expect(wordWrapper(w)).toHaveStyle({ opacity: "1" });
    }
  });

  it("splits text prop on whitespace", () => {
    mockFrame = 1000;
    render(<SequentialText text="hello world from bifrost" staggerInFrames={1} />);
    for (const w of ["hello", "world", "from", "bifrost"]) {
      expect(visibleWord(w)).toBeInTheDocument();
    }
  });

  it("applies per-word colors", () => {
    mockFrame = 1000;
    render(
      <SequentialText
        words={["red", "blue"]}
        colors={["#ff0000", "#0000ff"]}
        staggerInFrames={1}
      />,
    );
    expect(visibleWord("red")).toHaveStyle({ color: "#ff0000" });
    expect(visibleWord("blue")).toHaveStyle({ color: "#0000ff" });
  });

  it("forwards className and wordClassName", () => {
    mockFrame = 1000;
    const { container } = render(
      <SequentialText
        words={["a", "b"]}
        className="container-x"
        wordClassName="word-x"
        staggerInFrames={1}
      />,
    );
    expect(container.firstChild).toHaveClass("container-x");
    expect(visibleWord("a")).toHaveClass("word-x");
  });

  it("uses renderWord when provided", () => {
    mockFrame = 1000;
    render(
      <SequentialText
        words={["custom", "render"]}
        staggerInFrames={1}
        renderWord={({ word, index }) => (
          <strong data-testid={`w-${index}`}>{word.toUpperCase()}</strong>
        )}
      />,
    );
    expect(screen.getByTestId("w-0")).toHaveTextContent("CUSTOM");
    expect(screen.getByTestId("w-1")).toHaveTextContent("RENDER");
  });

  it("respects startAtFrame", () => {
    mockFrame = 10;
    render(<SequentialText words={["delayed"]} startAtFrame={20} />);
    expect(wordWrapper("delayed")).toHaveAttribute("data-visible", "false");
    expect(wordWrapper("delayed")).toHaveStyle({ opacity: "0" });
  });

  it("animates wrapper width from 0 to natural width as progress advances", () => {
    mockFrame = 1000;
    render(
      <SequentialText
        words={["alpha"]}
        easing={(t) => t}
        enterDurationInFrames={10}
      />,
    );
    expect(wordWrapper("alpha").style.width).toBe("100px");
  });

  it("supports cubic, exponential, bounce, and spring easing", () => {
    mockFrame = 6;
    for (const easing of ["cubic", "exponential", "bounce", "spring"] as const) {
      const { unmount } = render(
        <SequentialText
          words={["x"]}
          enterDurationInFrames={12}
          easing={easing}
        />,
      );
      const opacity = parseFloat(wordWrapper("x").style.opacity);
      expect(opacity).toBeGreaterThan(0);
      expect(opacity).toBeLessThanOrEqual(1);
      unmount();
    }
  });

  it("accepts a custom easing function", () => {
    mockFrame = 6;
    render(
      <SequentialText
        words={["x"]}
        enterDurationInFrames={12}
        easing={(t) => t}
      />,
    );
    expect(wordWrapper("x")).toHaveStyle({ opacity: "0.5" });
  });
});
