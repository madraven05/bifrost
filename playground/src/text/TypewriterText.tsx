import { AbsoluteFill, Sequence } from "remotion";
import { TypeWriterText } from "@bifrost/core";

const monoStyle = {
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  fontSize: 88,
  fontWeight: 700,
  letterSpacing: -1,
  lineHeight: 1.1,
};

export const TypewriterTextDemo = () => {
  return (
    <AbsoluteFill className="bg-white text-[#1f2937] font-sans">
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill className="items-center justify-center">
          <TypeWriterText
            text="Hello, world."
            charsPerSecond={14}
            punctuationPauseFrames={18}
            showCursor
            cursorBlinkFrames={15}
            color="#1f2937"
            style={monoStyle}
            cursorStyle={{ marginLeft: 4, color: "#000b0c" }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={150} durationInFrames={180}>
        <AbsoluteFill className="items-center justify-center">
          <TypeWriterText
            text="GLITCH"
            charsPerSecond={8}
            renderChar={({ char, index, isVisible, isCurrent }) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  opacity: isVisible ? 1 : 0,
                  transform: isCurrent ? "translateY(-4px)" : "none",
                  color: index % 2 === 0 ? "#ef4444" : "#111827",
                  fontSize: 96,
                  fontWeight: 800,
                }}
              >
                {char}
              </span>
            )}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
