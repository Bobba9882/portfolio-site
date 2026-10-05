import type { DesktopApp } from "@/types";
import { BoidsContent, boidsSize } from "./BoidsContent";
const icon = "/icons/boids-ico.ico";

export const boidsApp: DesktopApp = {
  id: "boids",
  name: "Boids",
  icon,
  size: boidsSize,
  Content: BoidsContent,
};
