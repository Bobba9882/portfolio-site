"use client";

import { useState } from "react";
import Image from "next/image";
import { boidsApp } from "@/components/apps/boids";
import { Window } from "@/components/ui/Window";
import { DESKTOP_SHORTCUT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import type { DesktopApp } from "@/types";

// Add an app here to give it a desktop shortcut
const APPS: DesktopApp[] = [boidsApp];

export function Desktop() {
  const [openAppIds, setOpenAppIds] = useState<string[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  function openApp(id: string) {
    setOpenAppIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }

  function closeApp(id: string) {
    setOpenAppIds((ids) => ids.filter((openId) => openId !== id));
  }

  return (
    <>
      <div
        className="absolute inset-x-0 top-0 bottom-11 flex flex-col flex-wrap content-start p-1"
        onClick={() => setSelectedAppId(null)}
      >
        {APPS.map(({ id, name, icon }) => (
          <div
            key={id}
            tabIndex={0}
            style={{ width: DESKTOP_SHORTCUT_SIZE, height: DESKTOP_SHORTCUT_SIZE }}
            className={cn(
              "relative flex cursor-default flex-col items-center gap-1 border border-transparent p-1 text-xs text-white shadow-none [text-shadow:0_1px_2px_#000]",
              (hoveredAppId === id || selectedAppId === id) && "window glass active shadow-[inset_0_0_0_1px_#fffa]",
            )}
            onPointerEnter={() => setHoveredAppId(id)}
            onPointerLeave={() => setHoveredAppId(null)}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedAppId(id);
            }}
            onPointerUp={(event) => event.pointerType === "touch" && openApp(id)}
            onDoubleClick={() => openApp(id)}
            onKeyDown={(event) => event.key === "Enter" && openApp(id)}
          >
            <span className="relative">
              <Image src={icon} alt="" width={48} height={48} unoptimized />
              <Image src="/icons/shortcut-arrow.svg" alt="" width={16} height={16} className="absolute bottom-0 left-0" />
            </span>
            {name}
          </div>
        ))}
      </div>

      {APPS.filter(({ id }) => openAppIds.includes(id)).map(({ id, name, size, Content }) => (
        <Window key={id} title={name} size={size} onClose={() => closeApp(id)}>
          <Content />
        </Window>
      ))}
    </>
  );
}
