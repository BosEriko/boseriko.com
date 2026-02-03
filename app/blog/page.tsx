"use client";
import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  name: string;
  path: string;
  html_url: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const perPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        const sortedPosts = (data || []).sort((a: Post, b: Post) =>
          b.name.localeCompare(a.name),
        );

        setPosts(sortedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedPosts = posts.slice(start, end);

  return (
    <Template.Default>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>My Blog</h1>

        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <>
            <ul>
              {paginatedPosts.map((post) => (
                <li key={post.path} style={{ marginBottom: "1rem" }}>
                  <button
                    onClick={() => router.push(`/blog/${post.name}`)}
                    style={{
                      fontSize: "1rem",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    {post.name.replace(/\.md$/, "")}
                  </button>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div style={{ marginTop: "1rem" }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ marginRight: "1rem" }}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ marginLeft: "1rem" }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Template.Default>
  );
}
