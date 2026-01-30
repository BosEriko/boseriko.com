"use client";

import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const router = useRouter();

  const handleDownloadPDF = async () => {
    // Elements we want to hide
    const elementsToHide = document.querySelectorAll(".hidden-from-pdf");

    // Hide them temporarily
    elementsToHide.forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });

    // Capture the whole body or a specific container
    const element = document.body; // or any container div
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Restore hidden elements
    elementsToHide.forEach((el) => {
      (el as HTMLElement).style.display = "";
    });

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Bos Eriko's Resume.pdf");
  };

  return (
    <div>
      {/* The content to include in the PDF */}
      <div>
        <h1>Welcome to my homepage</h1>
        <p>This is some sample content to include in the PDF.</p>
      </div>

      <div>visible from pdf</div>
      <div className="hidden-from-pdf">not visible from pdf</div>

      {/* Buttons we want to exclude from PDF */}
      <div style={{ marginTop: "20px" }} className="hidden-from-pdf">
        <button onClick={() => router.push(`/project`)}>View Projects</button>
        <button onClick={() => router.push(`/blog`)}>View Blogs</button>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
      </div>
    </div>
  );
}
