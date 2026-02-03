"use client";
import Template from "@template";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ ...props }) => (
                  <img {...props} style={{ maxWidth: "100%" }} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <p>No content found.</p>
        )}
      </div>
    </Template.Default>
  );
}
