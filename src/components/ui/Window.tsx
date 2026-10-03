"use client";

import { useDraggable, type Position } from "@/hooks/useDraggable";
import { cn } from "@/lib/utils";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  initialPosition?: Position;
  className?: string;
};

export function Window({
  title,
  children,
  onClose,
  initialPosition,
  className,
}: WindowProps) {
  const { positionStyle, draggableRef, dragHandleProps } = useDraggable(initialPosition);

  return (
    <div
      ref={draggableRef}
      className={cn("window glass active fixed", className)}
      style={positionStyle}
    >
      <div className="title-bar touch-none select-none" {...dragHandleProps}>
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
