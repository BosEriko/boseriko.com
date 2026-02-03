import React, { ReactNode } from "react";

interface ResumeProps {
  children: ReactNode;
}

const Resume: React.FC<ResumeProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};

export default Resume;
