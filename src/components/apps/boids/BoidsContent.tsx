"use client";

import { useEffect, useRef } from "react";
import { Boid } from "./classes/Boid";

//CONSTANTS
export const WINDOW_SIZE = { width: 720, height: 540 };
export const TURN_FACTOR= 0.15;
export const MIN_SPEED= 0;
export const MAX_SPEED= 0.5;
export const VISIBLE_RANGE= 70;
export const PROTECTED_RANGE = 20;
export const REPEL_FACTOR = 0.15;
export const ALIGMENT_FACTOR = 0.005;
export const COHESION_FACTOR = 0.0005;

const BOIDS_AMOUNT = 100;


export function BoidsContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const boids = Array.from({ length: BOIDS_AMOUNT }, () => {

      const boidX = Math.random() * WINDOW_SIZE.width;
      const boidY = Math.random() * WINDOW_SIZE.height;
      const boidVX = (Math.random() - 0.5) * 2;
      const boidVY = (Math.random() - 0.5) * 2;

      return new Boid(boidX, boidY, boidVX, boidVY);
    });

    let frameId = 0;

    const animationLoop = () => {
      context.clearRect(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height);

      boids.forEach(boid => {
        boid.draw(context);
        boid.teleportToOtherSide();
        boid.normalizeSpeed();
        boid.update();
      })

      frameId = requestAnimationFrame(animationLoop);
    }

    frameId = requestAnimationFrame(animationLoop);

    return () => cancelAnimationFrame(frameId);
  }, []);


  return <canvas ref={canvasRef} className="min-h-0 w-full" width={WINDOW_SIZE.width} height={WINDOW_SIZE.height} />;
}
