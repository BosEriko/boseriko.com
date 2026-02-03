"use client";
import React, { ReactNode } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface ResumeProps {
  children: ReactNode;
}

const Resume: React.FC<ResumeProps> = ({ children }) => {
  const handleDownloadPDF = async () => {
    const elementsToHide = document.querySelectorAll(".hidden-from-pdf");
    elementsToHide.forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });

    const element = document.body;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    elementsToHide.forEach((el) => {
      (el as HTMLElement).style.display = "";
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Bos Eriko's Resume.pdf");
  };

  return (
    <div className="min-h-screen min-w-screen bg-white">
      <div className="container mx-auto py-5">
        <div>{children}</div>
        <div className="hidden-from-pdf h-15"></div>
        <div className="hidden-from-pdf fixed bottom-0 left-0 w-full bg-blue-950">
          <div className="container mx-auto items-center justify-center gap-5 flex text-white h-15">
            <div>Bos Eriko Reyes’ Resume — ready to download.</div>
            <button
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
              onClick={handleDownloadPDF}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
