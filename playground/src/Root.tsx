import "./index.css";
import { Composition, Folder } from "remotion";
import { SequentialTextDemo } from "./text/SequentialText";

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
      </Folder>
    </>
  );
};
