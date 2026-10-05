"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { Window } from "@/components/ui/Window";
import Image from "next/image";

const WELCOME_DURATION_MS = 1200;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);
    router.prefetch("/desktop");
    setTimeout(() => router.push("/desktop"), WELCOME_DURATION_MS);
  }

  if (isSigningIn) {
    return (
      <Screen backgroundImage="/sign-on-bg.webp" className="flex items-center justify-center gap-3">
        <span className="loader animate size-8 translate-y-0.5" />
        <h1 className="text-3xl leading-none text-white [text-shadow:0_1px_6px_#000c]">Welcome</h1>
      </Screen>
    );
  }

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

      <form action="/desktop" onSubmit={signIn} className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
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
          defaultValue="Bobba9882"
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
          <h2 className="instruction-primary">Welcome to my page!</h2>
          <p className="mt-2">
            Don't worry, this page isn't actually guarded by a password. Just press the arrow to
            continue!
          </p>
          <p className="mt-2">Inside, you'll find some experiments I'm working on.</p>
          <p className="mt-3 text-[10px] italic text-gray-500 underline">This site is a MAJOR work in progress.</p>
        </Window>
      )}

      <p className="fixed right-2 bottom-2 text-xs text-white [text-shadow:0_1px_4px_#000c]">
        Not affiliated with or endorsed by Microsoft.
      </p>
    </Screen>
  );
}
