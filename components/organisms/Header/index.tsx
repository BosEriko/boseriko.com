"use client";

import Organism from "@organism";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Header = () => {
  return (
    <header className="text-black border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div>
          <h2
            className={`${pixelify.className} text-3xl md:text-4xl font-bold text-[#f7b43d]`}
          >
            BE
          </h2>
        </div>
        <div>
          <Organism.Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
