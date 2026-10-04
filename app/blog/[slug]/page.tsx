import { CACHE_TTL_SECONDS } from "@/config/cache";
import Template from "@template";
import Atom from "@atom";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

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
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
};

interface PageProps {
  params: any;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  try {
    const res = await fetch(`https://dev.to/api/articles/boseriko/${slug}`, {
      next: { revalidate: CACHE_TTL_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const post: Post = await res.json();
    const cover = post.cover_image || post.social_image;

    return (
      <Template.Default>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={post.description} />
          <link rel="canonical" href={post.url} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:image" content={cover || ""} />
          <meta property="og:url" content={post.url} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.description} />
          <meta name="twitter:image" content={cover || ""} />
        </Head>

        <article className="mx-auto max-w-3xl">
          <a
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
          >
            &larr; Blog
          </a>

          <h1 className="mt-6 font-serif text-4xl leading-[1.05] break-words sm:text-5xl md:text-6xl">{post.title}</h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-4 font-mono text-xs text-muted">
            <span className="text-ink">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>{post.reading_time_minutes} min read</span>
            {(post.tags || []).map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>

          {cover && (
            <Atom.Window
              label={`dev.to/boseriko`}
              className="mt-10 shadow-[10px_10px_0_var(--color-brand)]"
            >
              <Atom.Cover
                coverPhotoUrl={cover}
                alt={post.title}
                className="aspect-2/1 w-full bg-paper-deep"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </Atom.Window>
          )}

          <div className="mt-6">
            <Atom.Markdown content={post.body_html} />
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex gap-2">
              <a
                href={`${post.url}`}
                target="_blank"
                className="flex items-center gap-2 rounded-sm border border-line px-3 py-2 font-mono text-xs transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <FontAwesomeIcon icon={faHeart} className="text-brand-deep" />
                <span>{post.public_reactions_count}</span>
                <span>Reaction{post.public_reactions_count > 1 && "s"}</span>
              </a>
              <a
                href={`${post.url}#comments`}
                target="_blank"
                className="flex items-center gap-2 rounded-sm border border-line px-3 py-2 font-mono text-xs transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <FontAwesomeIcon icon={faComment} className="text-brand-deep" />
                <span>{post.comments_count}</span>
                <span>Comment{post.comments_count > 1 && "s"}</span>
              </a>
            </div>
            <div className="flex gap-5 font-mono text-xs uppercase tracking-wider">
              <a href="#" className="text-muted hover:text-ink">
                Back to Top &uarr;
              </a>
              <a href="/blog" className="hover:text-brand-deep">
                Back to Blogs &rarr;
              </a>
            </div>
          </div>
        </article>
      </Template.Default>
    );
  } catch (err) {
    console.error(err);
    return (
      <Template.Default>
        <p className="py-20 text-center text-muted">
          No content found or an error occurred.
        </p>
      </Template.Default>
    );
  }
}
