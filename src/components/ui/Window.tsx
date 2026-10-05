"use client";

import { useDraggable, type Position } from "@/hooks/useDraggable";
import { cn } from "@/lib/utils";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  initialPosition?: Position;
  size?: { width: number; height?: number };
  className?: string;
};

export function Window({
  title,
  children,
  onClose,
  initialPosition,
  size,
  className,
}: WindowProps) {
  const { positionStyle, draggableRef, dragHandleProps } = useDraggable(initialPosition);

  return (
    <div
      ref={draggableRef}
      className={cn("window glass active fixed flex max-h-[calc(100dvh-2.75rem)] max-w-[calc(100vw-1rem)] flex-col", className)}
      style={{ ...positionStyle, ...size }}
    >
      <div className="title-bar touch-none select-none" {...dragHandleProps}>
        <div className="title-bar-text">{title}</div>

        {onClose && (
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose} />
          </div>
        )}
      </div>

      <div className="window-body has-space flex min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
