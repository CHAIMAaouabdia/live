import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const c = loadCormorant("normal", { weights: ["400", "600", "700"] });
const i = loadInter("normal", { weights: ["300", "400", "600"] });

export const serif = c.fontFamily;
export const sans = i.fontFamily;

export const palette = {
  ivory: "#F6EFE2",
  cream: "#EFE3CC",
  sand: "#D9B679",
  brown: "#5C3A1E",
  deep: "#2E1B0E",
  accent: "#B5651D",
  ink: "#1B120A",
};
