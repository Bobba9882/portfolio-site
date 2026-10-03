"use client";

import { useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { Window } from "@/components/ui/Window";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Screen
      backgroundImage="/sign-on-bg.jpg"
      className="flex flex-col items-center justify-center gap-4"
    >
      <button onClick={() => setIsOpen(true)}>Click me bro</button>

      {isOpen && (
        <Window title="Coming soon" onClose={() => setIsOpen(false)} className="w-64">
          <p>Cool stuff soon!</p>
          <p className="mt-2 text-[10px] italic text-gray-500 underline">Source: trust me bro</p>
        </Window>
      )}
    </Screen>
  );
}
