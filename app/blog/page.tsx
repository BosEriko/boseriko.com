"use client";

import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image: string | null;
  social_image: string;
  published_at: string;
  readable_publish_date: string;
  tag_list: string[];
  url: string;
  path: string;
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
        setLoading(true);

        const res = await fetch(`/api/blogs?page=${page}&per_page=${perPage}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <Template.Default>
      <div className="p-8 font-sans">
        <h1 className="text-3xl font-bold mb-6">My Blog</h1>

        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {posts.map((post) => {
                const cover = post.cover_image || post.social_image;

                return (
                  <li key={post.slug} className="border rounded-lg p-4">
                    {cover && (
                      <img
                        src={cover}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded mb-3"
                        loading="lazy"
                      />
                    )}

                    <h2 className="text-xl font-semibold mb-1">{post.title}</h2>

                    <p className="text-gray-600 mb-2">{post.description}</p>

                    <div className="text-sm text-gray-500 mb-3">
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {(post.tag_list || []).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Read more →
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span>Page {page}</span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={posts.length < perPage}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Template.Default>
  );
}
