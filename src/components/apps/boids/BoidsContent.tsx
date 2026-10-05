"use client";

import { useEffect, useRef } from "react";
import { Boid } from "./classes/Boid";

export const boidsSize = { width: 720, height: 540 };

export function BoidsContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const boids = Array.from({ length: 50 }, () => new Boid(
      Math.random() * boidsSize.width,
      Math.random() * boidsSize.height,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ));

    boids.forEach((boid) => boid.draw(context));
  }, []);


  return <canvas ref={canvasRef} className="min-h-0 w-full" width={boidsSize.width} height={boidsSize.height} />;
}
