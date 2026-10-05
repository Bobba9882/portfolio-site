
export type DesktopApp = {
  id: string;
  name: string;
  icon: string;
  size: { width: number; height?: number };
  Content: React.ComponentType;
};
