import React, { ReactNode } from "react";
import Atom from "@atom";
import Organism from "@organism";

interface DefaultProps {
  children: ReactNode;
  orientation?: "default" | "center" | "minimal";
}

const Default: React.FC<DefaultProps> = ({
  children,
  orientation = "default",
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Organism.Header />
      <main className="flex-1 flex flex-col">
        <Atom.Visibility state={"default" == orientation}>
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8 py-12 md:py-20">
            {children}
          </div>
        </Atom.Visibility>
        <Atom.Visibility state={"center" == orientation}>
          <div className="flex-1 flex items-center">{children}</div>
        </Atom.Visibility>
        <Atom.Visibility state={"minimal" == orientation}>
          {children}
        </Atom.Visibility>
      </main>
      <Organism.Footer />
    </div>
  );
};

export default Default;
