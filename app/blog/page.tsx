"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  name: string; // filename
  path: string;
  html_url: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/BosEriko/blog/contents",
        );
        const data = await res.json();
        setPosts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My Blog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
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
      )}
    </div>
  );
}
