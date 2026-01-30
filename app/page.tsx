"use client";
import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
};

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const perPage = 10;

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.github.com/search/repositories?q=user:boseriko+topic:portfolio&sort=updated&order=desc&page=${page}&per_page=${perPage}`,
      );
      const data = await res.json();
      setRepos(data.items || []);
      setTotalCount(data.total_count || 0);
      setLoading(false);
    };

    fetchRepos();
  }, [page]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My Portfolio Projects</h1>

      {loading ? (
        <p>Loading...</p>
      ) : repos.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            maxWidth: "600px",
          }}
        >
          {repos.map((repo) => (
            <div key={repo.id}>
              <h2>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h2>
              <p>{repo.description}</p>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                Updated at: {new Date(repo.updated_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={{ margin: "0 1rem" }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
