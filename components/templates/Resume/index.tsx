"use client";
import React, { ReactNode } from "react";

interface ResumeProps {
  children: ReactNode;
}

const Resume: React.FC<ResumeProps> = ({ children }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page min-h-screen bg-white">
      <div className="w-full max-w-3xl mx-auto py-10 px-5 resume-container">
        <div>{children}</div>

        <div className="hidden-from-print fixed bottom-0 left-0 w-full bg-blue-950 py-3">
          <div className="container mx-auto flex justify-center items-center gap-5 text-white">
            <div>Bos Eriko Reyes’ Resume — ready to download.</div>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
              onClick={handlePrint}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body {
            margin: 10mm;
          }
          .hidden-from-print {
            display: none !important;
          }
          .resume-container {
            width: 100%;
            font-size: 12pt;
          }
          /* Optional: adjust section spacing */
          .resume-container > * {
            page-break-inside: avoid;
            margin-bottom: 10mm;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
