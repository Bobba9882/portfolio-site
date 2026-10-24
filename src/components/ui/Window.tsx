"use client";

import { useState } from "react";
import { useDraggable, type Position } from "@/hooks/useDraggable";
import { cn } from "@/lib/utils";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onCloseAction?: () => void;
  // When set, the title bar gets a Help button that opens this in a second window
  help?: React.ReactNode;
  initialPosition?: Position;
  size?: { width: number; height?: number };
  className?: string;
};

export function Window({
  title,
  children,
  onCloseAction,
  help,
  initialPosition,
  size,
  className,
}: WindowProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const { positionStyle, draggableRef, dragHandleProps } = useDraggable(initialPosition);

  return (
    <>
      <div
        ref={draggableRef}
        className={cn("window glass active fixed flex max-h-[calc(100dvh-2.75rem)] max-w-[calc(100vw-1rem)] flex-col", className)}
        style={{ ...positionStyle, ...size }}
      >
        <div className="title-bar touch-none select-none" {...dragHandleProps}>
          <div className="title-bar-text">{title}</div>

          {(help || onCloseAction) && (
            <div className="title-bar-controls">
              {help && <button aria-label="Help" onClick={() => setHelpOpen(true)} />}
              {onCloseAction && <button aria-label="Close" onClick={onCloseAction} />}
            </div>
          )}
        </div>

        <div className="window-body has-space flex min-h-0 flex-1 overflow-auto">{children}</div>
      </div>

      {help && helpOpen && (
        <Window title={`About ${title}`} size={{ width: 420 }} onCloseAction={() => setHelpOpen(false)}>
          {help}
        </Window>
      )}
    </>
  );
}
