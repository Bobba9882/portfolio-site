import { cn } from "@/lib/utils";

type ScreenProps = {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
};

export function Screen({ backgroundImage, children, className }: ScreenProps) {
  return (
    <div
      className={cn("fixed inset-0 bg-[#1d5f7a] bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}
