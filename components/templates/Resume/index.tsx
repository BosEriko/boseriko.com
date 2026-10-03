"use client";
import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface ResumeProps {
  children: ReactNode;
}

const Resume: React.FC<ResumeProps> = ({ children }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page min-h-screen bg-paper-deep px-3 pt-6 pb-32 text-ink sm:px-6 sm:pt-12 print:bg-white print:p-0">
      <div className="resume-container mx-auto w-full max-w-3xl bg-white px-6 py-10 shadow-[0_1px_0_var(--color-line),0_20px_50px_-20px_rgb(26_23_20/0.25)] sm:px-14 sm:py-14 print:max-w-none print:p-0 print:shadow-none">
        {children}
      </div>

      <div className="hidden-from-print fixed inset-x-0 bottom-5 flex justify-center px-4">
        <div className="flex items-center gap-4 rounded-sm bg-ink py-2 pr-2 pl-5 text-paper shadow-xl">
          <span className="font-mono text-xs text-paper/70">
            Bos Eriko Reyes&apos; Resume
          </span>
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-brand px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper"
            onClick={handlePrint}
          >
            <FontAwesomeIcon icon={faDownload} className="text-xs" />
            Download PDF
          </button>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body {
            margin: 10mm;
            background: white !important;
          }
          .hidden-from-print {
            display: none !important;
          }
          .resume-container {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
