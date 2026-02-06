"use client";
import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
};

const pageDescription: Record<string, { title: string; description: string }> =
  {
    product: {
      title: "Product",
      description: "These are repositories that I work on constantly.",
    },
    project: {
      title: "Project",
      description: "These are repositories that I work on every now and then.",
    },
    typescript: {
      title: "TypeScript",
      description: "Repositories related to TypeScript.",
    },
    ruby: {
      title: "Ruby",
      description: "Repositories related to Ruby.",
    },
    elixir: {
      title: "Elixir",
      description: "Repositories related to Elixir.",
    },
    php: {
      title: "PHP",
      description: "Repositories related to PHP.",
    },
    react: {
      title: "React",
      description: "Repositories related to React.",
    },
    nextjs: {
      title: "Next.js",
      description: "Repositories related to Next.js.",
    },
    nodejs: {
      title: "Node.js",
      description: "Repositories related to Node.js.",
    },
    rails: {
      title: "Rails",
      description: "Repositories related to Rails.",
    },
    graphql: {
      title: "GraphQL",
      description: "Repositories related to GraphQL.",
    },
    docker: {
      title: "Docker",
      description: "Repositories related to Docker.",
    },
    tailwind: {
      title: "Tailwind",
      description: "Repositories related to Tailwind.",
    },
    postgresql: {
      title: "PostgreSQL",
      description: "Repositories related to PostgreSQL.",
    },
    mysql: {
      title: "MySQL",
      description: "Repositories related to MySQL.",
    },
  };

export default function Topic() {
  const params = useParams();
  const { topic: topicParam } = params;
  const topic = Array.isArray(topicParam) ? topicParam[0] : topicParam;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  const perPage = 10;

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const res = await fetch(`/api/topic/${topic}?page=${page}`);
      const data = await res.json();
      setRepos(data.items || []);
      setTotalCount(data.total_count || 0);
      setLoading(false);
    };

    fetchRepos();
  }, [page]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <Template.Default>
      <div className="text-center space-y-4 container mx-auto my-10 px-5">
        <h1 className="font-bold text-4xl">
          {topic ? pageDescription[topic]?.title : "Unknown Topic"}
        </h1>

        <h4 className="text-gray-500">
          {topic ? pageDescription[topic]?.description : "Unknown Description"}
        </h4>

        {loading ? (
          <p>Loading...</p>
        ) : repos.length === 0 ? (
          <p>No Repository found.</p>
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
                  <button
                    onClick={() => router.push(`/description/${repo.name}`)}
                  >
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
    </Template.Default>
  );
}
