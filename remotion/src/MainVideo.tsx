import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneSections } from "./scenes/SceneSections";
import { SceneParcours } from "./scenes/SceneParcours";
import { SceneTiers } from "./scenes/SceneTiers";
import { SceneAccounts } from "./scenes/SceneAccounts";
import { SceneLangAI } from "./scenes/SceneLangAI";
import { SceneOutro } from "./scenes/SceneOutro";
import { palette } from "./theme";

const D = [110, 140, 160, 160, 160, 140, 110];
const T = 18;
export const TOTAL_FRAMES = D.reduce((a, b) => a + b, 0) - T * 6;

const scenes = [SceneIntro, SceneSections, SceneParcours, SceneTiers, SceneAccounts, SceneLangAI, SceneOutro];

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: palette.deep, fontSmooth: "antialiased" } as any}>
      <TransitionSeries>
        {scenes.map((Scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={D[i]}>
              <Scene />
            </TransitionSeries.Sequence>
            {i < scenes.length - 1 && (
              <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
