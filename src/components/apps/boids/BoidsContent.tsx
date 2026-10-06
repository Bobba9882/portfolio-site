"use client";

import { useEffect, useRef } from "react";
import { Boid, createPointerAtlas } from "./classes/Boid";

//CONSTANTS
export const WINDOW_SIZE = { width: 720, height: 540 };

const BOIDS_AMOUNT = 400;

const DEFAULT_SETTINGS = {
  minSpeed: 2,
  maxSpeed: 3,
  visibleRange: 40,
  protectedRange: 8,
  repelFactor: 0.05,
  alignmentFactor: 0.05,
  cohesionFactor: 0.02,
  jitterStrength: 0.2,
  edgeMargin: 50,
  turnFactor: 0.2
}

export type BoidSettings = typeof DEFAULT_SETTINGS;


export function BoidsContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(DEFAULT_SETTINGS);

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

    const pointerAtlas = createPointerAtlas();

    let frameId = 0;

    const animationLoop = () => {
      context.clearRect(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height);

      const settings = settingsRef.current;
      const { visibleRange, protectedRange } = settings;
      const visibleRangeSquared = visibleRange ** 2;
      const protectedRangeSquared = protectedRange ** 2;

      boids.forEach(boid => {

        const boidsInRange: Boid[] = []
        const boidsInDangerZone: Boid[] = []

        boids.forEach(otherBoid => {
          if (otherBoid === boid) {
            return;
          }

          const squaredDistance = boid.getSquaredDistanceFromBoid(otherBoid);
          if (squaredDistance < visibleRangeSquared) {
            if (squaredDistance < protectedRangeSquared) {
              boidsInDangerZone.push(otherBoid);
            }
            boidsInRange.push(otherBoid);
          }
        });


        boid.draw(context, pointerAtlas);
        boid.separation(boidsInDangerZone, settings);
        boid.alignment(boidsInRange, settings);
        boid.cohesion(boidsInRange, settings);
        boid.randomJitter(settings);
        boid.avoidWorldExit(settings);
        boid.normalizeSpeed(settings);
        boid.update();
      })

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
