import type { DesktopApp } from "@/types";
import { SnakeContent, WINDOW_SIZE } from "./SnakeContent";
const icon = "/icons/snake-ico.ico";

export const snakeApp: DesktopApp = {
  id: "snake",
  name: "Snake",
  icon,
  size: { width: WINDOW_SIZE.width },
  Content: SnakeContent,
};
