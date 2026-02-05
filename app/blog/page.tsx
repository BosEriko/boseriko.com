"use client";

import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

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
  comments_count: number;
  public_reactions_count: number;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const router = useRouter();

  const perPage = 8;

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
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setHasNext(data.hasNext);
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
      <div className="text-center space-y-4 container mx-auto my-10 px-5">
        <h1 className="font-bold text-4xl">Blog</h1>
        <h4 className="text-gray-500">
          <span>I write stuff on </span>
          <a
            href="https://dev.to/boseriko"
            target="_blank"
            className="bg-yellow-300 texty-gray-700 px-1"
          >
            dev.to
          </a>
        </h4>

        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {posts.map((post) => {
                const cover = post.cover_image || post.social_image;

                return (
                  <li
                    key={post.slug}
                    className="
                      border rounded-lg bg-white border-gray-200 overflow-hidden cursor-pointer
                      transition-all duration-300 ease-in-out
                      hover:border-[#f7b43d] hover:scale-105 relative
                    "
                    onClick={() => router.push(`/blog/${post.slug}`)}
                  >
                    {cover && (
                      <img
                        src={cover}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    )}

                    <div className="flex flex-wrap gap-2 m-3">
                      {(post.tag_list || []).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-semibold mx-3">{post.title}</h2>

                    <div className="text-sm text-gray-500 mb-3 mx-3">
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <p className="text-gray-600 mb-13 mx-3">
                      {post.description}
                    </p>

                    <div className="flex gap-4 text-gray-700 absolute bottom-3 left-3">
                      <div className="flex gap-1 text-xs items-center">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>{post.public_reactions_count}</span>
                        <span>
                          Reaction{post.public_reactions_count > 1 && "s"}
                        </span>
                      </div>
                      <div className="flex gap-2 text-xs items-center">
                        <FontAwesomeIcon icon={faComment} />
                        <span>{post.comments_count}</span>
                        <span>Comment{post.comments_count > 1 && "s"}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="
                  border rounded-lg bg-white border-gray-200 cursor-pointer
                  transition-all duration-300 ease-in-out
                  px-3 py-2
                  hover:border-[#f7b43d]
                  disabled:cursor-not-allowed
                  disabled:bg-gray-100
                  disabled:border-gray-300
                  disabled:text-gray-400
                "
              >
                Previous
              </button>

              <span>Page {page}</span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasNext}
                className="
                  border rounded-lg bg-white border-gray-200 cursor-pointer
                  transition-all duration-300 ease-in-out
                  px-3 py-2
                  hover:border-[#f7b43d]
                  disabled:cursor-not-allowed
                  disabled:bg-gray-100
                  disabled:border-gray-300
                  disabled:text-gray-400
                "
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
