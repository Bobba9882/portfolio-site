import { cn } from "@/lib/utils";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

export function Window({ title, children, onClose, className }: WindowProps) {
  return (
    <div className={cn("window active", className)}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        {onClose && (
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose} />
          </div>
        )}
      </div>
      <div className="window-body has-space">{children}</div>
    </div>
  );
}
