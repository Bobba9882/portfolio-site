"use client";

import { useEffect, useRef } from "react";
import { Boid } from "./classes/Boid";

//CONSTANTS
export const WINDOW_SIZE = { width: 720, height: 540 };
export const MIN_SPEED= 2;
export const MAX_SPEED= 3;
export const VISIBLE_RANGE= 40;
export const PROTECTED_RANGE = 8;
const VISIBLE_RANGE_SQUARED = VISIBLE_RANGE * VISIBLE_RANGE;
const PROTECTED_RANGE_SQUARED = PROTECTED_RANGE * PROTECTED_RANGE;
export const REPEL_FACTOR = 0.05;
export const ALIGMENT_FACTOR = 0.05;
export const COHESION_FACTOR = 0.02;
export const JITTER_STRENGTH =0.2
export const EDGE_MARGIN = 50;
export const TURN_FACTOR = 0.2;

const BOIDS_AMOUNT = 350;


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
    let totalFrameCostMs = 0;
    let measuredFrameCount = 0;

    const animationLoop = () => {
      const frameStart = performance.now();
      context.clearRect(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height);

      boids.forEach(boid => {

        const boidsInRange: Boid[] = []
        const boidsInDangerZone: Boid[] = []

        boids.forEach(otherBoid => {
          if (otherBoid === boid) {
            return;
          }

          const squaredDistance = boid.getSquaredDistanceFromBoid(otherBoid);
          if (squaredDistance < VISIBLE_RANGE_SQUARED) {
            if (squaredDistance < PROTECTED_RANGE_SQUARED) {
              boidsInDangerZone.push(otherBoid);
            }
            boidsInRange.push(otherBoid);
          }
        });


        boid.draw(context);
        boid.separation(boidsInDangerZone);
        boid.alignment(boidsInRange);
        boid.cohesion(boidsInRange);
        boid.randomJitter();
        boid.avoidWorldExit();
        boid.normalizeSpeed();
        boid.update();
      })

      totalFrameCostMs += performance.now() - frameStart;
      measuredFrameCount++;
      if (measuredFrameCount === 60) {
        console.log(`average frame cost: ${(totalFrameCostMs / measuredFrameCount).toFixed(2)}ms`);
        totalFrameCostMs = 0;
        measuredFrameCount = 0;
      }

      frameId = requestAnimationFrame(animationLoop);
    }

    frameId = requestAnimationFrame(animationLoop);

    return () => cancelAnimationFrame(frameId);
  }, []);


  return <div className="flex flex-col w-full">
    <canvas ref={canvasRef} className="w-full h-auto"width={WINDOW_SIZE.width} height={WINDOW_SIZE.height} />
    <fieldset className="shrink-0">
      <legend>Configuration</legend>
      <p>SOON!!!</p>
    </fieldset>
  </div>
}
