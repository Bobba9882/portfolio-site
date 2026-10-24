import type { DesktopApp } from "@/types";
import {BoidsContent, WINDOW_SIZE} from "./BoidsContent";
import { BoidsInfo } from "./BoidsInfo";
const icon = "/icons/boids-ico.ico";

export const boidsApp: DesktopApp = {
  id: "boids",
  name: "Boids",
  icon,
  size: { width: WINDOW_SIZE.width },
  Content: BoidsContent,
  Info: BoidsInfo,
};
