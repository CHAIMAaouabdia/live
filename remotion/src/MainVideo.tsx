import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneHierarchy } from "./scenes/SceneHierarchy";
import { SceneSections } from "./scenes/SceneSections";
import { SceneFilters } from "./scenes/SceneFilters";
import { SceneParcours } from "./scenes/SceneParcours";
import { SceneTiers } from "./scenes/SceneTiers";
import { SceneAIDeep } from "./scenes/SceneAIDeep";
import { SceneAccounts } from "./scenes/SceneAccounts";
import { SceneDashboards } from "./scenes/SceneDashboards";
import { SceneLangAI } from "./scenes/SceneLangAI";
import { SceneOutro } from "./scenes/SceneOutro";
import { palette } from "./theme";

const scenes = [SceneIntro, SceneHierarchy, SceneSections, SceneFilters, SceneParcours, SceneTiers, SceneAIDeep, SceneAccounts, SceneDashboards, SceneLangAI, SceneOutro];
const D = [110, 180, 140, 180, 180, 160, 200, 150, 200, 150, 110];
const T = 18;
export const TOTAL_FRAMES = D.reduce((a, b) => a + b, 0) - T * (scenes.length - 1);

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
