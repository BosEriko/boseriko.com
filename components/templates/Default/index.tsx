import React, { ReactNode } from "react";
import Atom from "@atom";
import Organism from "@organism";
import { Roboto_Condensed } from "next/font/google";

interface DefaultProps {
  children: ReactNode;
  orientation?: "default" | "center" | "minimal";
}

const roboto_condensed = Roboto_Condensed({
  weight: ["100"],
});

const Default: React.FC<DefaultProps> = ({
  children,
  orientation = "default",
}) => {
  return (
    <div
      className={`${roboto_condensed.className} flex flex-col min-h-screen bg-[#f8f1e3]`}
    >
      <Organism.Header />
      <Atom.Visibility state={"default" == orientation}>
        <div className="flex-1">
          <div className="container mx-auto px-4 py-10">{children}</div>
        </div>
      </Atom.Visibility>
      <Atom.Visibility state={"center" == orientation}>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </Atom.Visibility>
      <Atom.Visibility state={"minimal" == orientation}>
        <div className="flex-1">{children}</div>
      </Atom.Visibility>
      <Organism.Footer />
    </div>
  );
};

export default Default;
