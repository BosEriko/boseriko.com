import React, { ReactNode } from "react";
import Organism from "@organism";
import { Roboto_Condensed } from "next/font/google";

interface DefaultProps {
  children: ReactNode;
}

const roboto_condensed = Roboto_Condensed({
  weight: ["100"],
});

const Default: React.FC<DefaultProps> = ({ children }) => {
  return (
    <div
      className={`${roboto_condensed.className} flex flex-col min-h-screen bg-[#f8f1e3]`}
    >
      <Organism.Header />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-10">{children}</div>
      </div>
      <Organism.Footer />
    </div>
  );
};

export default Default;
