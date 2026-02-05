"use client";
import Template from "@template";
import Atom from "@atom";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Post = {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  social_image?: string;
  published_at: string;
  tags: string[];
  body_markdown: string;
  body_html: string;
  url: string;
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();

        if (data && data.body_markdown) {
          setPost(data);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Template.Default>
        <div className="p-8 font-sans">
          <p>Loading...</p>
        </div>
      </Template.Default>
    );
  }

  if (!post) {
    return (
      <Template.Default>
        <div className="p-8 font-sans">
          <p>No content found.</p>
        </div>
      </Template.Default>
    );
  }

  const cover = post.cover_image || post.social_image;

  return (
    <Template.Default>
      <div className="p-8 font-sans max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {(post.tags || []).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-gray-500 text-sm text-center mb-2">
          {new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <h1 className="text-3xl font-bold text-center mb-10">{post.title}</h1>

        <div className="rounded-t-lg bg-white border-t border-x border-gray-200 overflow-hidden">
          {cover && (
            <img
              src={cover}
              alt={post.title}
              className="w-full h-64 object-cover align-baseline"
            />
          )}
        </div>
        <div className="border-b border-x rounded-b-lg rounded-x-lg bg-white border-gray-200">
          <Atom.Markdown content={post.body_html} />
        </div>
      </div>
    </Template.Default>
  );
}
