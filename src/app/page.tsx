"use client";

import { useState } from "react";
import { Window } from "@/components/ui/Window";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-[#1d5f7a] bg-[url(/sign-on-bg.jpg)] bg-cover bg-center">
      <button onClick={() => setIsOpen(true)}>Click me bro</button>

      {isOpen && (
        <Window title="Coming soon" onClose={() => setIsOpen(false)} className="w-64">
          <p>Cool stuff soon!</p>
          <p className="mt-2 text-[10px] italic text-gray-500 underline">Source: trust me bro</p>
        </Window>
      )}
    </div>
  );
}
