import { CACHE_TTL_SECONDS } from "@/config/cache";
import Template from "@template";
import ContributionHeatmap from "@/components/organisms/ContributionHeatmap";
import Link from "next/link";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";

type TopicDataItem = {
  title: string;
  description: string;
  deviconClass?: string | null;
  bg?: string | null;
};

type GitHubUser = {
  public_repos: number;
  followers: number;
  created_at: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
};

const TOPIC_COUNT_URL = "https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/topic-count.json";
const TOPICS_URL = "https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/topics.json";
const GITHUB_USER_URL = "https://api.github.com/users/BosEriko";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

async function getJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, {
      next: { revalidate: CACHE_TTL_SECONDS },
    });

    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

async function getRepositories(): Promise<GitHubRepo[] | null> {
  const repositories: GitHubRepo[] = [];

  for (let page = 1; page <= 10; page++) {
    const data = await getJson<GitHubRepo[] | null>(
      `${GITHUB_USER_URL}/repos?type=owner&sort=pushed&per_page=100&page=${page}`,
      null,
    );

    if (!Array.isArray(data)) return null;
    repositories.push(...data);
    if (data.length < 100) break;
  }

  return repositories;
}

const repoHref = (repo: GitHubRepo) =>
  repo.topics?.some((topic) => topic === "product" || topic === "project")
    ? `/description/${repo.name}`
    : repo.html_url;

const SectionHeading: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
  <div className="mb-7">
    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
    <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
  </div>
);

const RepoList: React.FC<{ repos: GitHubRepo[]; meta: (repo: GitHubRepo) => ReactNode }> = ({
  repos,
  meta,
}) => (
  <ul className="border-t border-line">
    {repos.map((repo) => (
      <li key={repo.id} className="border-b border-line">
        <Link href={repoHref(repo)} className="group block py-4">
          <span className="flex items-center justify-between gap-3">
            <span className="truncate font-serif text-xl decoration-brand decoration-2 underline-offset-4 group-hover:underline">
              {repo.name}
            </span>
            <span className="shrink-0 font-mono text-xs text-muted">{meta(repo)}</span>
          </span>
          {repo.description && (
            <span className="mt-1 line-clamp-1 block text-sm text-muted">{repo.description}</span>
          )}
        </Link>
      </li>
    ))}
  </ul>
);

export default async function Stats() {
  const [count, topics, user, repositories] = await Promise.all([
    getJson<Record<string, number>>(TOPIC_COUNT_URL, {}),
    getJson<Record<string, TopicDataItem>>(TOPICS_URL, {}),
    getJson<GitHubUser | null>(GITHUB_USER_URL, null),
    getRepositories(),
  ]);

  const topicEntries = Object.entries(count);
  const sources = repositories?.filter((repo) => !repo.fork) ?? [];
  const stars = sources.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const forks = sources.reduce((sum, repo) => sum + repo.forks_count, 0);

  const languageCounts = sources.reduce<Record<string, number>>((counts, repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    return counts;
  }, {});
  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8);
  const maxLanguageCount = languages[0]?.[1] ?? 0;

  const mostStarred = [...sources]
    .filter((repo) => repo.stargazers_count > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);
  const recentlyUpdated = [...sources]
    .filter((repo) => repo.name !== "BosEriko")
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 5);

  const tiles = [
    { label: "Public repositories", value: user?.public_repos },
    { label: "Stars earned", value: repositories ? stars : undefined },
    { label: "Forks", value: repositories ? forks : undefined },
    { label: "Followers", value: user?.followers },
    {
      label: "On GitHub since",
      value: user ? new Date(user.created_at).getUTCFullYear() : undefined,
      raw: true,
    },
  ];

  return (
    <Template.Default orientation="minimal">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 pt-12 pb-10 md:pt-20 md:pb-12">
        <header className="border-b border-line pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Index &mdash; Stats
          </p>
          <h1 className="mt-4 font-serif text-6xl leading-none md:text-7xl">
            By the <em className="text-brand-deep">numbers</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            Live numbers from my{" "}
            <a
              href="https://github.com/BosEriko"
              target="_blank"
              className="underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-deep"
            >
              GitHub
            </a>
            .
          </p>
        </header>

        <dl className="grid grid-cols-2 border-l border-line sm:grid-cols-3 lg:grid-cols-5">
          {tiles.map((tile) => (
            <div key={tile.label} className="border-r border-b border-line px-5 py-6">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {tile.label}
              </dt>
              <dd className="mt-3 font-serif text-4xl md:text-5xl">
                {tile.value === undefined
                  ? "—"
                  : tile.raw
                    ? tile.value
                    : tile.value.toLocaleString("en-US")}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ContributionHeatmap />

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Topics" title="Things I work with" />
            <p className="mb-7 font-mono text-xs text-muted">
              {topicEntries.length} {topicEntries.length === 1 ? "topic" : "topics"}
            </p>
          </div>

          {topicEntries.length === 0 ? (
            <p className="text-sm text-muted">No topics found.</p>
          ) : (
            <ul className="border-t border-line">
              {topicEntries.map(([topic, total], index) => {
                const info = topics[topic];

                return (
                  <li key={topic} className="border-b border-line">
                    <Link
                      href={`/topic/${topic}`}
                      className="group flex items-center gap-5 py-5 transition-[padding] duration-300 hover:pl-3"
                    >
                      <span className="w-6 font-mono text-xs text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white"
                        style={{ backgroundColor: info?.bg ?? "#D1D5DB" }}
                      >
                        {info?.deviconClass && (
                          <i className={`${info.deviconClass} text-xl`}></i>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-3xl">
                          {info?.title ?? topic}
                        </span>
                        {info?.description && (
                          <span className="mt-1 block text-sm text-muted">
                            {info.description}
                          </span>
                        )}
                      </span>
                      <span className="rounded-sm bg-paper-deep px-2 py-1 font-mono text-xs text-muted transition-colors group-hover:bg-brand group-hover:text-ink">
                        {total} {total === 1 ? "repo" : "repos"}
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-muted transition-all duration-300 group-hover:-rotate-45 group-hover:text-ink"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-10 md:px-8 md:py-12 lg:grid-cols-3">
          <div>
            <SectionHeading eyebrow="By repository" title="Languages" />
            {languages.length === 0 ? (
              <p className="text-sm text-muted">Languages are temporarily unavailable.</p>
            ) : (
              <ul className="space-y-4">
                {languages.map(([language, total]) => (
                  <li key={language} title={`${language}: ${total} ${total === 1 ? "repository" : "repositories"}`}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-ink">{language}</span>
                      <span className="font-mono text-xs text-muted">{total}</span>
                    </div>
                    <div className="h-2 rounded-sm bg-paper-deep" aria-hidden="true">
                      <div
                        className="h-full rounded-sm bg-brand"
                        style={{ width: `${(total / maxLanguageCount) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <SectionHeading eyebrow="Crowd favorites" title="Most starred" />
            {mostStarred.length === 0 ? (
              <p className="text-sm text-muted">Repositories are temporarily unavailable.</p>
            ) : (
              <RepoList
                repos={mostStarred}
                meta={(repo) => (
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCodeBranch} />
                      {repo.forks_count}
                    </span>
                  </span>
                )}
              />
            )}
          </div>

          <div>
            <SectionHeading eyebrow="Latest pushes" title="Recently updated" />
            {recentlyUpdated.length === 0 ? (
              <p className="text-sm text-muted">Repositories are temporarily unavailable.</p>
            ) : (
              <RepoList
                repos={recentlyUpdated}
                meta={(repo) => dateFormat.format(new Date(repo.pushed_at))}
              />
            )}
          </div>
        </div>
      </section>
    </Template.Default>
  );
}
