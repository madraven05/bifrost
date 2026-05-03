import "./index.css";
import { Composition, Folder } from "remotion";
import { SequentialTextDemo } from "./text/SequentialText";
import { TypewriterTextDemo } from "./text/TypewriterText";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="text">
        <Composition
          id="sequential-text"
          component={SequentialTextDemo}
          durationInFrames={270}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="typewriter-text"
          component={TypewriterTextDemo}
          durationInFrames={330}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
