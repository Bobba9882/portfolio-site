import { useRef, useState } from "react";

export type Position = { x: number; y: number };

// How many pixels of the element must stay on screen so it can always be dragged back
const MIN_VISIBLE_PIXELS = 80;

const CENTERED_STYLE: React.CSSProperties = {
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

/**
 * Makes an element draggable by a handle (e.g. a window's title bar).
 * Spread `dragHandleProps` on the handle, put `draggableRef` on the element,
 * and apply `positionStyle` to the element.
 * Without an initial position, the element starts centered on screen.
 */
export function useDraggable(initialPosition?: Position) {
  // null means "still centered, never dragged"
  const [position, setPosition] = useState<Position | null>(initialPosition ?? null);
  const draggableRef = useRef<HTMLDivElement>(null);
  // Distance from the element's top-left corner to where the pointer grabbed it; null when not dragging
  const pointerOffset = useRef<Position | null>(null);

  function startDragging(event: React.PointerEvent<HTMLElement>) {
    const clickedButton = (event.target as HTMLElement).closest("button");
    if (clickedButton) return;

    const currentPosition = position ?? getScreenPosition(draggableRef.current);
    pointerOffset.current = {
      x: event.clientX - currentPosition.x,
      y: event.clientY - currentPosition.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function followPointer(event: React.PointerEvent<HTMLElement>) {
    if (!pointerOffset.current) return;

    const newPosition = {
      x: event.clientX - pointerOffset.current.x,
      y: event.clientY - pointerOffset.current.y,
    };
    setPosition(keepOnScreen(newPosition, draggableRef.current));
  }

  function stopDragging() {
    pointerOffset.current = null;
  }

  const positionStyle: React.CSSProperties = position
    ? { left: position.x, top: position.y }
    : CENTERED_STYLE;

  return {
    positionStyle,
    draggableRef,
    dragHandleProps: {
      onPointerDown: startDragging,
      onPointerMove: followPointer,
      onPointerUp: stopDragging,
    },
  };
}

function getScreenPosition(element: HTMLElement | null): Position {
  const elementBounds = element?.getBoundingClientRect();

  return { x: elementBounds?.left ?? 0, y: elementBounds?.top ?? 0 };
}

function keepOnScreen(position: Position, element: HTMLElement | null): Position {
  const elementWidth = element?.offsetWidth ?? 0;

  return {
    x: clamp(position.x, MIN_VISIBLE_PIXELS - elementWidth, window.innerWidth - MIN_VISIBLE_PIXELS),
    y: clamp(position.y, 0, window.innerHeight - MIN_VISIBLE_PIXELS),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
