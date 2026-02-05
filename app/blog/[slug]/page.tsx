"use client";
import Template from "@template";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Post = {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  social_image?: string;
  published_at: string;
  readable_publish_date: string;
  tags: string[];
  body_markdown: string;
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
      <div className="p-8 font-sans max-w-3xl mx-auto space-y-6">
        {cover && (
          <img
            src={cover}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md"
          />
        )}

        <h1 className="text-3xl font-bold">{post.title}</h1>

        <div className="text-gray-500 text-sm">
          {post.readable_publish_date}
        </div>

        <div className="flex flex-wrap gap-2">
          {(post.tags || []).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="prose max-w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ ...props }) => (
                <img {...props} style={{ maxWidth: "100%" }} />
              ),
            }}
          >
            {post.body_markdown}
          </ReactMarkdown>
        </div>
      </div>
    </Template.Default>
  );
}
