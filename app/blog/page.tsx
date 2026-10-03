import Template from "@template";
import Atom from "@atom";
import Molecule from "@molecule";
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
  reading_time_minutes: number;
  comments_count: number;
  public_reactions_count: number;
};

interface PageProps {
  searchParams: any;
}

export default async function Blog({ searchParams }: PageProps) {
  const awaitedSearchParams = await searchParams;
  const page = Number(awaitedSearchParams.page ?? 1);
  const perPage = 12;

  const res = await fetch(
    `https://dev.to/api/articles?username=boseriko&page=${page}&per_page=${perPage}`,
    { next: { revalidate: 86400 } },
  );

  const nextRes = await fetch(
    `https://dev.to/api/articles?username=boseriko&page=${page + 1}&per_page=${perPage}`,
    { next: { revalidate: 86400 } },
  );
  const nextData = nextRes.ok ? await nextRes.json() : [];

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  if (!nextRes.ok) {
    throw new Error("Failed to check if there's a next page");
  }

  const data = await res.json();

  const posts: Post[] = Array.isArray(data) ? data : [];
  const hasNext: boolean = Boolean(
    Array.isArray(nextData) && nextData.length > 0,
  );

  return (
    <Template.Default>
      <header className="border-b border-line pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Writing
        </p>
        <h1 className="mt-4 font-serif text-6xl leading-none md:text-7xl">
          Blog
        </h1>
        <p className="mt-5 text-lg text-ink-soft">
          I write stuff on{" "}
          <a
            href="https://dev.to/boseriko"
            target="_blank"
            className="underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-deep"
          >
            dev.to
          </a>
          .
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-muted">No blog posts found.</p>
      ) : (
        <>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const cover = post.cover_image || post.social_image;

              return (
                <li key={post.slug}>
                  <Atom.Card url={`/blog/${post.slug}`} coverPhotoUrl={cover} label={`dev.to/boseriko`}>
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                      <span>
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                      <span>&middot;</span>
                      <span>{post.reading_time_minutes} min read</span>
                    </div>

                    <h2 className="mt-3 font-serif text-2xl leading-tight break-words decoration-brand decoration-2 underline-offset-4 group-hover:underline">
                      {post.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                      {post.description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-xs text-muted">
                      {(post.tag_list || []).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                      <span className="ml-auto flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faHeart} />
                          {post.public_reactions_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faComment} />
                          {post.comments_count}
                        </span>
                      </span>
                    </div>
                  </Atom.Card>
                </li>
              );
            })}
          </ul>

          <Molecule.Pagination
            page={page}
            previousHref={`/blog?page=${Math.max(1, page - 1)}`}
            nextHref={`/blog?page=${page + 1}`}
            hasPrevious={page !== 1}
            hasNext={hasNext}
          />
        </>
      )}
    </Template.Default>
  );
}
