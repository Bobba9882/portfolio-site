import type { DesktopApp } from "@/types";
import { BoidsContent } from "./BoidsContent";
const icon = "/icons/boids-ico.ico";

export const boidsApp: DesktopApp = {
  id: "boids",
  name: "Boids",
  icon,
  size: { width: 480, height: 360 },
  Content: BoidsContent,
};
