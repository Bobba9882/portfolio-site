"use client";

import { useState } from "react";
import { Window } from "@/components/ui/Window";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <button onClick={() => setIsOpen(true)}>Open window</button>

      {isOpen && (
        <Window title="Hello" onClose={() => setIsOpen(false)} className="w-64">
          <p>Hello!</p>
        </Window>
      )}
    </div>
  );
}
