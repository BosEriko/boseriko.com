import React, { ReactNode } from "react";
import Organism from "@organism";

interface DefaultProps {
  children: ReactNode;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Organism.Header />
      <div className="flex-1">{children}</div>
      <Organism.Footer />
    </div>
  );
};

export default Default;
