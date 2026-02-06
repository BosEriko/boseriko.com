"use client";
import Template from "@template";
import Atom from "@atom";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Description() {
  const params = useParams();
  const { id } = params;
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/description/${id}`);
        const data = await res.json();

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
    <Template.Default>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Portfolio: {id}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : content ? (
          <div
            style={{
              background: "#f0f0f0",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Atom.Markdown content={content} />
          </div>
        ) : (
          <p>No content found.</p>
        )}
      </div>
    </Template.Default>
  );
}
