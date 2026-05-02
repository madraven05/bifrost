import { AbsoluteFill, Sequence } from "remotion";
import { SequentialText } from "@bifrost/core";

export const SequentialTextDemo = () => {
  return (
    <AbsoluteFill className="bg-white text-white font-sans">
      <AbsoluteFill className="items-center justify-center">
        <Sequence from={0} durationInFrames={120}>
          <AbsoluteFill className="items-center justify-center">
            <SequentialText
              words={["Build", "videos", "with", "code."]}
              staggerInFrames={14}
              enterDurationInFrames={22}
              gap={18}
              colors={["#515151", "#515151", "#515151", "#22d3ee"]}
              easing="exponential"
              wordStyle={{
                fontSize: 96,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1,
              }}
            />
          </AbsoluteFill>
        </Sequence>

        <Sequence from={120} durationInFrames={150}>
          <AbsoluteFill className="items-center justify-center">
            <SequentialText
              words={["Ship", "faster", "with", "Bifrost."]}
              staggerInFrames={16}
              enterDurationInFrames={28}
              gap={20}
              colors={["#515151", "#a78bfa", "#515151", "#f472b6"]}
              easing="bounce"
              wordStyle={{
                fontSize: 110,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1,
              }}
            />
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
