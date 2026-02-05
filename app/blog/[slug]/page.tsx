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

        <div>
          {cover && (
            <img
              src={cover}
              alt={post.title}
              className="w-full h-64 object-cover rounded-t-lg bg-white border-t border-x border-gray-200 align-baseline"
            />
          )}
        </div>
        <div className="border-b border-x rounded-b-lg rounded-x-lg bg-white border-gray-200">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ ...props }) => (
                <div className="relative flex items-center justify-center aspect-video w-full group my-25 scale-110">
                  <div className="absolute rounded-md rotate-10 bg-[#f7b43d] w-full aspect-video opacity-70 transition-all duration-500 group-hover:rotate-3 scale-105 group-hover:scale-100 shadow-lg group-hover:shadow-md"></div>
                  <div className="absolute rounded-md -rotate-6 bg-[#f7b43d] w-full aspect-video opacity-80 transition-all duration-500 group-hover:-rotate-2 scale-105 group-hover:scale-100 shadow-lg group-hover:shadow-md"></div>
                  <div className="absolute rounded-md rotate-3 border-10 border-[#f7b43d] bg-cover bg-center w-full aspect-video overflow-hidden transition-all duration-500 group-hover:rotate-1 scale-110 group-hover:scale-100 shadow-lg group-hover:shadow-md">
                    <img
                      {...props}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ),
              p: ({ children, ...props }) => (
                <div>
                  <p {...props} className="p-5">
                    {children}
                  </p>
                </div>
              ),
              h1: ({ children, ...props }) => (
                <h1 {...props} className="text-4xl font-bold p-5 text-gray-900">
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2
                  {...props}
                  className="text-3xl font-semibold p-5 text-gray-800"
                >
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3
                  {...props}
                  className="text-2xl font-medium p-5 text-gray-700"
                >
                  {children}
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4
                  {...props}
                  className="text-xl font-medium p-5 text-gray-600"
                >
                  {children}
                </h4>
              ),
              h5: ({ children, ...props }) => (
                <h5
                  {...props}
                  className="text-xl font-medium p-5 text-gray-600"
                >
                  {children}
                </h5>
              ),
            }}
          >
            {post.body_html}
          </ReactMarkdown>
        </div>
      </div>
    </Template.Default>
  );
}
