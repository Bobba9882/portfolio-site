import type { DesktopApp } from "@/types";
import {BoidsContent, WINDOW_SIZE} from "./BoidsContent";
const icon = "/icons/boids-ico.ico";

export const boidsApp: DesktopApp = {
  id: "boids",
  name: "Boids",
  icon,
  size: { width: WINDOW_SIZE.width },
  Content: BoidsContent,
};
