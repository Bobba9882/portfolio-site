"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import startIcon from "@/app/icon.svg";

function subscribeToClock(onTick: () => void) {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
}

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const getDate = () => new Date().toLocaleDateString();
const getServerText = () => "";

export function Taskbar() {
    const time = useSyncExternalStore(subscribeToClock, getTime, getServerText);
    const date = useSyncExternalStore(subscribeToClock, getDate, getServerText);

    return (
        <footer className="taskbar fixed inset-x-0 bottom-0 flex h-[calc(2.75rem+env(safe-area-inset-bottom))] items-center px-1 pb-[env(safe-area-inset-bottom)]">
            <button className="start-orb">
                <Image src={startIcon} alt="Start" className="size-6" />
            </button>

            <div className="flex-1" />

            <div className="text-xs text-white text-center leading-tight min-w-16 min-h-8">
                <div>{time}</div>
                <div>{date}</div>
            </div>
        </footer>
    );
}
