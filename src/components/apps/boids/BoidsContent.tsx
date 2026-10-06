"use client";

import { useEffect, useRef, useState } from "react";
import { Boid, createPointerAtlas } from "./classes/Boid";

//CONSTANTS
export const WINDOW_SIZE = { width: 720, height: 540 };

const DEFAULT_SETTINGS = {
  boidsAmount: 400,
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

const SLIDERS: { key: keyof BoidSettings; label: string; min: number; max: number; step: number }[] = [
  { key: "boidsAmount", label: "Amount", min: 10, max: 800, step: 10 },
  { key: "visibleRange", label: "Visible range", min: 5, max: 200, step: 1 },
  { key: "protectedRange", label: "Protected range", min: 1, max: 100, step: 1 },
  { key: "minSpeed", label: "Min speed", min: 0.5, max: 5, step: 0.1 },
  { key: "maxSpeed", label: "Max speed", min: 1, max: 8, step: 0.1 },
  { key: "repelFactor", label: "Separation", min: 0, max: 0.5, step: 0.01 },
  { key: "alignmentFactor", label: "Alignment", min: 0, max: 1, step: 0.01 },
  { key: "cohesionFactor", label: "Cohesion", min: 0, max: 0.2, step: 0.005 },
  { key: "jitterStrength", label: "Jitter", min: 0, max: 1, step: 0.01 },
  { key: "turnFactor", label: "Turn factor", min: 0, max: 1, step: 0.01 },
];


export function BoidsContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(DEFAULT_SETTINGS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  function applySettings(newSettings: BoidSettings) {
    settingsRef.current = newSettings;
    setSettings(newSettings);
  }

  function changeSetting(key: keyof BoidSettings, value: string) {
    applySettings({ ...settings, [key]: Number(value) });
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const boids: Boid[] = [];

    const pointerAtlas = createPointerAtlas();

    let frameId = 0;

    const animationLoop = () => {
      context.clearRect(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height);

      const settings = settingsRef.current;

      while (boids.length < settings.boidsAmount) {
        boids.push(new Boid(
          Math.random() * WINDOW_SIZE.width,
          Math.random() * WINDOW_SIZE.height,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ));
      }
      boids.length = settings.boidsAmount;

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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-3 gap-y-2">
        {SLIDERS.map(({ key, label, min, max, step }) => (
          <label key={key} className="flex flex-col text-xs">
            <span className="flex justify-between">
              <span>{label}</span>
              <span>{settings[key]}</span>
            </span>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={settings[key]}
              onChange={event => changeSetting(key, event.target.value)}
            />
          </label>
        ))}
      </div>
      <button type="button" className="mt-2" onClick={() => applySettings(DEFAULT_SETTINGS)}>Reset</button>
    </fieldset>
  </div>
}
