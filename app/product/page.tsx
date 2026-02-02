"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
};

export default function Product() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  const perPage = 10;

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const res = await fetch(`/api/products?page=${page}`);
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
      <h1>My Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : repos.length === 0 ? (
        <p>No Products found.</p>
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
            <div key={repo.id} style={{ marginBottom: "1.5rem" }}>
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

              <div style={{ marginTop: "0.5rem" }}>
                <button
                  onClick={() => window.open(repo.html_url, "_blank")}
                  style={{ marginRight: "0.5rem" }}
                >
                  Check on GitHub
                </button>
                <button onClick={() => router.push(`/product/${repo.name}`)}>
                  Read More
                </button>
              </div>
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
