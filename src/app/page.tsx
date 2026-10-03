"use client";

import { useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { Window } from "@/components/ui/Window";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Screen
      backgroundImage="/sign-on-bg.webp"
      className="flex flex-col items-center justify-center"
    >
      <div className="user-tile">
        <Image
          src="/profile-pic.png"
          alt="Profile picture"
          className="size-32 rounded-sm border border-black/30"
          width={128}
          height={128}
          loading="eager"
          draggable={false}
        />
      </div>

      <h1 className="mt-4 text-2xl text-white [text-shadow:0_1px_6px_#000c]">Jesse</h1>

      <form
        className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-1.5"
        onSubmit={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          className="col-start-2 w-56 shadow-md placeholder:text-gray-400"
        />
        <button type="submit" aria-label="Sign in" className="sign-in-button">
          <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-white stroke-[2.5]" aria-hidden>
            <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" />
          </svg>
        </button>
      </form>

      <button type="button" onClick={() => setIsOpen(true)} className="glass-button mt-10 text-sm">
        Information
      </button>

      {isOpen && (
        <Window title="Information" onClose={() => setIsOpen(false)} className="w-64">
          <h2 className="instruction-primary">Welcome to my portfolio!</h2>
          <p className="mt-2">
            Don't worry, this page isn't actually guarded by a password. Just press the arrow to
            continue!
          </p>
          <p className="mt-2">Inside you'll find find some experiments i am working on.</p>
          <p className="mt-3 text-[10px] italic text-gray-500 underline">This site is a MAJOR work in progress.</p>
        </Window>
      )}
    </Screen>
  );
}
