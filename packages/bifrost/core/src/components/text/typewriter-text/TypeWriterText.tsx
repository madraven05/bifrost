import {
  Fragment,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type TypeWriterTextAlign = "start" | "center" | "end";

export interface TypeWriterCharContext {
  char: string;
  index: number;
  frame: number;
  isVisible: boolean;
  isCurrent: boolean;
}

export interface TypeWriterTextProps {
  text: string;
  /** Characters per second. Default 20. */
  charsPerSecond?: number;
  /** Frame at which typing begins. */
  startAtFrame?: number;
  /** Extra frames inserted after each `.,!?;:` for natural pacing. */
  punctuationPauseFrames?: number;
  /** Characters that trigger the punctuation pause. */
  punctuationChars?: string;
  /** Random per-char delay jitter, in frames. 0 disables. */
  humanizeJitterFrames?: number;
  /** Seed for the humanize PRNG; same seed -> same animation. */
  humanizeSeed?: number;
  /** Reserve full layout width so siblings don't shift as text grows. */
  preserveLayout?: boolean;
  /** Show a blinking cursor at the typed position. */
  showCursor?: boolean;
  cursorChar?: string;
  /** Cursor blink half-period, in frames. */
  cursorBlinkFrames?: number;
  /** Hide cursor once typing completes. */
  hideCursorOnComplete?: boolean;
  align?: TypeWriterTextAlign;
  color?: string;
  className?: string;
  charClassName?: string;
  cursorClassName?: string;
  style?: CSSProperties;
  charStyle?: CSSProperties;
  cursorStyle?: CSSProperties;
  renderChar?: (ctx: TypeWriterCharContext) => ReactNode;
}

const justifyMap: Record<TypeWriterTextAlign, CSSProperties["justifyContent"]> =
  {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  };

const DEFAULT_PUNCTUATION = ".,!?;:";

// mulberry32 — deterministic, cheap PRNG so same seed yields same animation.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function TypeWriterText({
  text,
  charsPerSecond = 20,
  startAtFrame = 0,
  punctuationPauseFrames = 0,
  punctuationChars = DEFAULT_PUNCTUATION,
  humanizeJitterFrames = 0,
  humanizeSeed = 1,
  preserveLayout = false,
  showCursor = false,
  cursorChar = "|",
  cursorBlinkFrames = 15,
  hideCursorOnComplete = false,
  align = "start",
  color,
  className,
  charClassName,
  cursorClassName,
  style,
  charStyle,
  cursorStyle,
  renderChar,
}: TypeWriterTextProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chars = useMemo(() => Array.from(text), [text]);

  const enterFrames = useMemo(() => {
    const rng = makeRng(humanizeSeed);
    const baseStep = fps / Math.max(0.0001, charsPerSecond);
    const punct = new Set(Array.from(punctuationChars));
    const out: number[] = new Array(chars.length);
    let cursor = 0;
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i] ?? "";
      const jitter =
        humanizeJitterFrames > 0 ? (rng() * 2 - 1) * humanizeJitterFrames : 0;
      cursor += Math.max(0, baseStep + jitter);
      out[i] = cursor;
      if (punct.has(ch)) cursor += punctuationPauseFrames;
    }
    return out;
  }, [
    chars,
    fps,
    charsPerSecond,
    humanizeJitterFrames,
    humanizeSeed,
    punctuationPauseFrames,
    punctuationChars,
  ]);

  const local = frame - startAtFrame;
  const visibleCount = useMemo(() => {
    if (local < 0) return 0;
    let lo = 0;
    let hi = enterFrames.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if ((enterFrames[mid] ?? Infinity) <= local) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }, [enterFrames, local]);

  const isComplete = visibleCount >= chars.length;
  const cursorActive = showCursor && !(hideCursorOnComplete && isComplete);
  const cursorOn =
    cursorActive &&
    Math.floor(Math.max(0, frame) / Math.max(1, cursorBlinkFrames)) % 2 === 0;

  return (
    <div
      className={className}
      data-typewriter=""
      data-complete={isComplete ? "true" : "false"}
      data-visible-count={visibleCount}
      style={{
        display: "flex",
        justifyContent: justifyMap[align],
        alignItems: "center",
        whiteSpace: "pre-wrap",
        color,
        ...style,
      }}
    >
      <span style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
        {chars.map((char, i) => {
          const isVisible = i < visibleCount;
          const isCurrent = i === visibleCount - 1;
          const ctx: TypeWriterCharContext = {
            char,
            index: i,
            frame: local,
            isVisible,
            isCurrent,
          };

          if (renderChar) {
            return (
              <Fragment key={i}>
                <span
                  data-char-index={i}
                  data-visible={isVisible ? "true" : "false"}
                  style={{ display: "inline" }}
                >
                  {renderChar(ctx)}
                </span>
              </Fragment>
            );
          }

          const hiddenStyle: CSSProperties = preserveLayout
            ? { visibility: "hidden", opacity: 0 }
            : { display: "none" };

          return (
            <span
              key={i}
              className={charClassName}
              data-char-index={i}
              data-visible={isVisible ? "true" : "false"}
              style={{
                whiteSpace: "pre",
                ...(isVisible ? null : hiddenStyle),
                ...charStyle,
              }}
            >
              {char}
            </span>
          );
        })}
        {showCursor ? (
          <span
            className={cursorClassName}
            data-cursor=""
            data-cursor-visible={cursorOn ? "true" : "false"}
            style={{
              display: "inline-block",
              opacity: cursorOn ? 1 : 0,
              ...cursorStyle,
            }}
          >
            {cursorChar}
          </span>
        ) : null}
      </span>
    </div>
  );
}

TypeWriterText.displayName = "TypeWriterText";
