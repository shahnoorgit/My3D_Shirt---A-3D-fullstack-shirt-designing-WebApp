import { proxy } from "valtio";

const State = proxy({
  intro: true,
  color: "#6930C3",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "/threejs.png",
});

export default State;
