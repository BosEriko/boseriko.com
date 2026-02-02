"use client";

import { useRouter } from "next/navigation";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import experience from "../data/experience.json";

export default function Home() {
  const router = useRouter();

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
    <div>
      {/* Top Navbar */}
      <nav className="hidden-from-pdf bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Bos Eriko Reyes
        </h1>
        <div className="flex space-x-4">
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/product")}
          >
            Products
          </button>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/project")}
          >
            Projects
          </button>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/blog")}
          >
            Blogs
          </button>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/touch")}
          >
            Contact
          </button>
          <button
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6 max-w-4xl mx-auto space-y-8 mt-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Bos Eriko Reyes</h1>
          <p className="text-gray-600">
            Full Stack Developer & Software Engineer
          </p>
        </div>

        {/* Work Experience */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Work Experience
          </h2>

          <ul className="space-y-6">
            {experience.map((job, index) => (
              <li
                key={index}
                className={`p-4 rounded-lg shadow ${
                  job.active
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">
                    {job.position} at {job.company}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(job.date.start).toLocaleDateString()} -{" "}
                    {job.active
                      ? "Present"
                      : new Date(job.date.end).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{job.location}</p>
                <ul className="list-disc list-inside space-y-1">
                  {job.responsibilities.map((task, i) => (
                    <li key={i} className="text-gray-700">
                      {task}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
