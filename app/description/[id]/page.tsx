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
    <Template.Default center={true}>
      <div>
        <Atom.Visibility state={!!loading}>
          <div className="text-center">Loading...</div>
        </Atom.Visibility>
        <Atom.Visibility state={!loading}>
          <Atom.Visibility state={!!content}>
            <Atom.Markdown content={content} simple={false} />
          </Atom.Visibility>
          <Atom.Visibility state={!content}>
            <div className="text-center">No content found.</div>
          </Atom.Visibility>
        </Atom.Visibility>
      </div>
    </Template.Default>
  );
}
