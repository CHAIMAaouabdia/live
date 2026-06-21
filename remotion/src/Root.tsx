import { Composition } from "remotion";
import { MainVideo, TOTAL_FRAMES } from "./MainVideo";
import { CinematicVideo, CINEMATIC_FRAMES } from "./cinematic/Cinematic";

export const RemotionRoot = () => (
  <>
    <Composition id="main" component={MainVideo} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="cinematic" component={CinematicVideo} durationInFrames={CINEMATIC_FRAMES} fps={30} width={3840} height={2160} />
  </>
);
