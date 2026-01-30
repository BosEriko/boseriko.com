"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PortfolioPage() {
  const params = useParams();
  const { id } = params;
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.github.com/repos/BosEriko/${id}/contents/PORTFOLIO.md`,
        );
        const data = await res.json();

        // GitHub API returns content as base64
        if (data.content) {
          const decoded = atob(data.content.replace(/\n/g, ""));
          setContent(decoded);
        } else {
          setContent("No PORTFOLIO.md found.");
        }
      } catch (err) {
        setContent("Failed to fetch PORTFOLIO.md");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [id]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Portfolio: {id}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {content}
        </pre>
      )}
    </div>
  );
}
