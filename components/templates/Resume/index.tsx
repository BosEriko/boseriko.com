"use client";
import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ResumeProps {
  blocks: ReactNode[];
}

const MM_TO_PX = 96 / 25.4;
const SHEET_WIDTH_PX = 210 * MM_TO_PX;
const CONTENT_HEIGHT_PX = (297 - 15 * 2) * MM_TO_PX;
const PDF_FILENAME = "Bos-Eriko-Reyes-Resume.pdf";

const paginate = (heights: number[]) => {
  const pages: number[][] = [];
  let page: number[] = [];
  let used = 0;

  heights.forEach((height, index) => {
    if (page.length > 0 && used + height > CONTENT_HEIGHT_PX) {
      pages.push(page);
      page = [];
      used = 0;
    }
    page.push(index);
    used += height;
  });

  if (page.length > 0) pages.push(page);
  return pages;
};

const sheetClass =
  "resume-sheet relative w-[210mm] bg-white p-[15mm] shadow-[0_1px_0_var(--color-line),0_20px_50px_-20px_rgb(26_23_20/0.25)] print:shadow-none";

const Resume: React.FC<ResumeProps> = ({ blocks }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pages, setPages] = useState<number[][] | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      setZoom(Math.min(1, entry.contentRect.width / SHEET_WIDTH_PX));
    });
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      const container = measureRef.current;
      if (!container || cancelled) return;
      const heights = Array.from(container.children).map(
        (child) => child.getBoundingClientRect().height,
      );
      setPages(paginate(heights));
    };

    measure();
    document.fonts.ready.then(() => {
      measure();
      if (!cancelled) setFontsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [blocks]);

  const handleDownload = async () => {
    setDownloadState("loading");

    try {
      const res = await fetch("/resume/pdf");
      if (!res.ok) throw new Error(`Failed to generate PDF: ${res.status}`);

      const url = URL.createObjectURL(await res.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = PDF_FILENAME;
      link.click();
      URL.revokeObjectURL(url);

      setDownloadState("idle");
    } catch (error) {
      console.error(error);
      setDownloadState("error");
    }
  };

  return (
    <div
      data-paginated={pages && fontsReady ? "true" : undefined}
      className="min-h-screen bg-paper-deep px-3 pt-6 pb-32 text-ink sm:px-6 sm:pt-12 print:min-h-0 print:bg-white print:p-0"
    >
      <div
        ref={measureRef}
        aria-hidden
        className="invisible absolute top-0 -left-[9999px] w-[180mm] print:hidden"
      >
        {blocks.map((block, index) => (
          <div key={index}>{block}</div>
        ))}
      </div>

      <div ref={frameRef} className="mx-auto max-w-[210mm] print:max-w-none">
        <div
          className="flex flex-col gap-8 [zoom:var(--resume-zoom)] print:block print:[zoom:1]"
          style={{ "--resume-zoom": zoom } as React.CSSProperties}
        >
          {pages ? (
            pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className={`${sheetClass} h-[297mm] overflow-hidden print:break-after-page print:last:break-after-auto [&>div:first-child>*]:pt-0`}
              >
                {page.map((blockIndex) => (
                  <div key={blockIndex}>{blocks[blockIndex]}</div>
                ))}
                <span className="absolute right-[15mm] bottom-[7mm] font-mono text-[9px] text-muted">
                  {pageIndex + 1} / {pages.length}
                </span>
              </div>
            ))
          ) : (
            <div className={`${sheetClass} min-h-[297mm]`}>
              {blocks.map((block, index) => (
                <div key={index}>{block}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-5 flex justify-center px-4 print:hidden">
        <div className="flex items-center gap-4 rounded-sm bg-ink py-2 pr-2 pl-5 text-paper shadow-xl">
          <span className="font-mono text-xs text-paper/70">
            {downloadState === "error"
              ? "Couldn't generate the PDF."
              : `A4 · ${pages?.length ?? 1} ${pages?.length === 1 ? "page" : "pages"}`}
          </span>
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-brand px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:cursor-wait disabled:opacity-70"
            onClick={handleDownload}
            disabled={downloadState === "loading"}
          >
            <FontAwesomeIcon
              icon={downloadState === "loading" ? faSpinner : faDownload}
              className={`text-xs ${downloadState === "loading" ? "animate-spin" : ""}`}
            />
            {downloadState === "loading"
              ? "Preparing…"
              : downloadState === "error"
                ? "Try again"
                : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
