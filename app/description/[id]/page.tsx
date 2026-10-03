import Template from "@template";
import Atom from "@atom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const revalidate = 86400;

interface Repo {
  node_id: string;
  description: string;
  name: string;
  homepage: string;
  updated_at: string;
  stargazers_count: number;
  html_url: string;
  topics: string[];
  full_name: string;
  default_branch: string;
}

interface PageProps {
  params: any;
}

export default async function Description({ params }: PageProps) {
  const { id } = await params;
  let content = null;

  const [contentRes, readmeRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/repos/boseriko/${id}/contents/PORTFOLIO.md`, { next: { revalidate } }),
    fetch(`https://api.github.com/repos/boseriko/${id}/contents/README.md`, { next: { revalidate } }),
    fetch(`https://api.github.com/repos/boseriko/${id}`, { next: { revalidate } }),
  ]);

  if (readmeRes.ok) {
    const readmeJson = await readmeRes.json();
    content = Buffer.from(readmeJson.content, "base64").toString("utf-8");
  }

  if (contentRes.ok) {
    const contentJson = await contentRes.json();
    content = Buffer.from(contentJson.content, "base64").toString("utf-8");
  }


  const repoJson: Repo = await repoRes.json();
  const type: string = repoJson?.topics?.includes("product") ? "product" : "project";
  const topics: string[] = (repoJson?.topics ?? []).filter((topic: any) => topic !== "product" && topic !== "project");
  const name: string = repoJson.name;
  const updated_at: string = repoJson.updated_at;
  const homepage: string = repoJson.homepage;
  const stargazers_count: number = repoJson.stargazers_count;
  const html_url: string = repoJson.html_url;
  const node_id: string = repoJson.node_id;
  const description: string = repoJson.description;
  const full_name: string = repoJson.full_name;
  const default_branch: string = repoJson.default_branch;

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Template.Default orientation="minimal">
      <article className="px-5 md:px-8 pt-12 pb-20 md:pt-20">
        <header className="mx-auto max-w-3xl">
          <a
            href={`/topic/${type}`}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
          >
            &larr; {typeLabel}s
          </a>

          <h1 className="mt-6 font-serif text-5xl leading-none break-words sm:text-6xl md:text-7xl">{name}</h1>

          <p className="mt-6 text-xl leading-relaxed text-ink-soft">
            {description}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-4 border-y border-line py-5 font-mono text-xs sm:grid-cols-3">
            <div>
              <dt className="uppercase tracking-widest text-muted">Updated</dt>
              <dd className="mt-1">
                {new Date(updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-muted">Source</dt>
              <dd className="mt-1">
                <a href={html_url} target="_blank" className="hover:text-brand-deep hover:underline">
                  {stargazers_count} star{stargazers_count > 1 && "s"} on GitHub
                </a>
              </dd>
            </div>
            <Atom.Visibility state={!!homepage}>
              <div>
                <dt className="uppercase tracking-widest text-muted">Live</dt>
                <dd className="mt-1 truncate">
                  <a href={homepage} target="_blank" className="hover:text-brand-deep hover:underline">
                    {homepage?.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            </Atom.Visibility>
          </dl>

          <Atom.Visibility state={!!(topics.length > 0)}>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
              {topics.map((topic) => (
                <li key={topic}>
                  <a
                    href={`/topic/${topic}`}
                    target="_blank"
                    className="text-muted hover:text-ink"
                  >
                    #{topic}
                  </a>
                </li>
              ))}
            </ul>
          </Atom.Visibility>
        </header>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-sm border border-line bg-paper-deep">
          <Atom.Cover
            coverPhotoUrl={`https://raw.githubusercontent.com/${full_name}/${default_branch}/COVER.png`}
            fallbackCoverPhotoUrl={`https://opengraph.githubassets.com/${node_id}/${full_name}`}
            className="aspect-2/1 w-full bg-cover bg-center"
          />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Atom.Visibility state={!!content}>
            <Atom.Markdown content={content} />
          </Atom.Visibility>
          <Atom.Visibility state={!content}>
            <p className="text-muted">Description unavailable.</p>
          </Atom.Visibility>
        </div>
      </article>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Like what you see?
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              Let&apos;s work together and make your ideas{" "}
              <em className="text-brand">come to life.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/resume`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper"
            >
              <FontAwesomeIcon icon={faFileLines} />
              <span>Check Resume</span>
            </a>
            <a
              href={`/topic/${type}`}
              className="inline-flex items-center gap-2 rounded-sm border border-paper/30 px-5 py-3 text-sm font-medium transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              <span>See More {typeLabel}s</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </section>
    </Template.Default>
  );
}
