import { describe, expect, it, vi } from "vitest";
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
}));

import { TypeWriterText } from "./TypeWriterText.js";

const charAt = (container: HTMLElement, index: number) =>
  container.querySelector(`[data-char-index="${index}"]`) as HTMLElement | null;

const visibleCharCount = (container: HTMLElement) =>
  container.querySelectorAll('[data-char-index][data-visible="true"]').length;

describe("TypeWriterText", () => {
  it("renders zero visible chars before startAtFrame", () => {
    mockFrame = 5;
    const { container } = render(
      <TypeWriterText text="hello" charsPerSecond={30} startAtFrame={20} />,
    );
    expect(visibleCharCount(container)).toBe(0);
    expect(container.querySelector("[data-typewriter]")).toHaveAttribute(
      "data-complete",
      "false",
    );
  });

  it("reveals chars progressively at the configured rate", () => {
    // 30 cps at fps 30 → exactly 1 char per frame.
    mockFrame = 3;
    const { container } = render(
      <TypeWriterText text="hello" charsPerSecond={30} />,
    );
    expect(visibleCharCount(container)).toBe(3);
    expect(charAt(container, 0)).toHaveAttribute("data-visible", "true");
    expect(charAt(container, 2)).toHaveAttribute("data-visible", "true");
    expect(charAt(container, 3)).toHaveAttribute("data-visible", "false");
  });

  it("marks complete once all chars are revealed", () => {
    mockFrame = 1000;
    const { container } = render(
      <TypeWriterText text="abcd" charsPerSecond={30} />,
    );
    expect(visibleCharCount(container)).toBe(4);
    expect(container.querySelector("[data-typewriter]")).toHaveAttribute(
      "data-complete",
      "true",
    );
  });

  it("hides chars with display:none by default and visibility:hidden when preserveLayout", () => {
    mockFrame = 0;
    const { container, rerender } = render(
      <TypeWriterText text="ab" charsPerSecond={30} startAtFrame={1000} />,
    );
    expect(charAt(container, 0)).toHaveStyle({ display: "none" });

    rerender(
      <TypeWriterText
        text="ab"
        charsPerSecond={30}
        startAtFrame={1000}
        preserveLayout
      />,
    );
    expect(charAt(container, 0)).toHaveStyle({ visibility: "hidden" });
  });

  it("inserts a pause after punctuation chars", () => {
    // 30 cps, fps 30 → 1 frame/char. After "a." we add 10 extra frames before "b".
    mockFrame = 2;
    const { container } = render(
      <TypeWriterText
        text="a.b"
        charsPerSecond={30}
        punctuationPauseFrames={10}
      />,
    );
    // "a" at 1, "." at 2, "b" at 2 + 1 + 10 = 13. So at frame 2 only first two visible.
    expect(visibleCharCount(container)).toBe(2);

    mockFrame = 13;
    const { container: c2 } = render(
      <TypeWriterText
        text="a.b"
        charsPerSecond={30}
        punctuationPauseFrames={10}
      />,
    );
    expect(visibleCharCount(c2)).toBe(3);
  });

  it("uses renderChar when provided", () => {
    mockFrame = 1000;
    render(
      <TypeWriterText
        text="hi"
        charsPerSecond={30}
        renderChar={({ char, index, isVisible }) => (
          <strong data-testid={`c-${index}`} data-iv={String(isVisible)}>
            {char.toUpperCase()}
          </strong>
        )}
      />,
    );
    expect(screen.getByTestId("c-0")).toHaveTextContent("H");
    expect(screen.getByTestId("c-1")).toHaveTextContent("I");
    expect(screen.getByTestId("c-1")).toHaveAttribute("data-iv", "true");
  });

  it("forwards className, charClassName, color, and style", () => {
    mockFrame = 1000;
    const { container } = render(
      <TypeWriterText
        text="ab"
        charsPerSecond={30}
        className="root-x"
        charClassName="char-x"
        color="#abcdef"
      />,
    );
    expect(container.firstChild).toHaveClass("root-x");
    expect(charAt(container, 0)).toHaveClass("char-x");
    expect(container.firstChild).toHaveStyle({ color: "#abcdef" });
  });

  it("renders a blinking cursor that toggles each blink half-period", () => {
    mockFrame = 0;
    const { container, rerender } = render(
      <TypeWriterText text="x" showCursor cursorBlinkFrames={5} />,
    );
    expect(container.querySelector("[data-cursor]")).toHaveAttribute(
      "data-cursor-visible",
      "true",
    );

    mockFrame = 5;
    rerender(<TypeWriterText text="x" showCursor cursorBlinkFrames={5} />);
    expect(container.querySelector("[data-cursor]")).toHaveAttribute(
      "data-cursor-visible",
      "false",
    );

    mockFrame = 10;
    rerender(<TypeWriterText text="x" showCursor cursorBlinkFrames={5} />);
    expect(container.querySelector("[data-cursor]")).toHaveAttribute(
      "data-cursor-visible",
      "true",
    );
  });

  it("hides the cursor on completion when hideCursorOnComplete is set", () => {
    mockFrame = 1000;
    const { container } = render(
      <TypeWriterText
        text="x"
        charsPerSecond={30}
        showCursor
        hideCursorOnComplete
      />,
    );
    expect(container.querySelector("[data-cursor]")).toHaveAttribute(
      "data-cursor-visible",
      "false",
    );
  });

  it("omits the cursor entirely when showCursor is false", () => {
    mockFrame = 0;
    const { container } = render(<TypeWriterText text="x" />);
    expect(container.querySelector("[data-cursor]")).toBeNull();
  });

  it("produces a deterministic reveal order for a given humanizeSeed", () => {
    mockFrame = 8;
    const a = render(
      <TypeWriterText
        text="hello world"
        charsPerSecond={30}
        humanizeJitterFrames={3}
        humanizeSeed={42}
      />,
    );
    const aCount = visibleCharCount(a.container);
    a.unmount();

    const b = render(
      <TypeWriterText
        text="hello world"
        charsPerSecond={30}
        humanizeJitterFrames={3}
        humanizeSeed={42}
      />,
    );
    expect(visibleCharCount(b.container)).toBe(aCount);
  });
});
