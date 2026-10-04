import { CACHE_TTL_SECONDS } from "@/config/cache";
import Template from "@template";
import Atom from "@atom";
import Molecule from "@molecule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";

type Repo = {
  id: number;
  topics: string[];
  name: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  node_id: string;
  full_name: string;
  default_branch: string;
};

type RepositorySearch = {
  items: Repo[];
  total_count: number;
};

async function getTopicRepositories(
  topic: string,
  page = 1,
  perPage = 12,
): Promise<RepositorySearch | null> {
  try {
    const repositories: Repo[] = [];
    let searchPage = 1;
    let totalCount = 0;

    do {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=user:boseriko+topic:${encodeURIComponent(topic)}&sort=updated&order=desc&page=${searchPage}&per_page=100`,
        { next: { revalidate: CACHE_TTL_SECONDS } },
      );

      if (!response.ok) return null;

      const data = await response.json();
      if (
        !Array.isArray(data.items) ||
        !Number.isInteger(data.total_count) ||
        data.total_count < 0 ||
        data.incomplete_results
      ) return null;

      totalCount = data.total_count;
      if (data.items.length === 0 && repositories.length < totalCount) return null;
      repositories.push(...data.items);
      searchPage += 1;
    } while (repositories.length < totalCount);

    const filteredRepositories = topic === "product" || topic === "project"
      ? repositories
      : repositories.filter((repo) =>
          repo.topics?.some((tag) => tag === "product" || tag === "project"),
        );

    return {
      items: filteredRepositories.slice((page - 1) * perPage, page * perPage),
      total_count: filteredRepositories.length,
    };
  } catch {
    return null;
  }
}

const TOPICS_URL = "https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/topics.json";

async function getTopics() {
  const res = await fetch(TOPICS_URL, {
    next: { revalidate: CACHE_TTL_SECONDS },
  });

  if (!res.ok) return {};
  return res.json();
}

interface PageProps {
  params: any;
  searchParams: any;
}

export default async function Topic({ params, searchParams }: PageProps) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const topic = awaitedParams.topic;
  const page = Number(awaitedSearchParams.page ?? 1);
  const perPage = 12;

  const topics = await getTopics();
  const topicInfo = topics[topic];

  const data = await getTopicRepositories(topic, page, perPage);
  const repos = data?.items ?? [];
  const totalCount = data?.total_count ?? 0;
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <Template.Default>
      <header className="grid gap-6 border-b border-line pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Index &mdash; #{topic}
          </p>
          <h1 className="mt-4 font-serif text-6xl leading-none md:text-7xl">
            {topicInfo?.title ?? "Unknown Topic"}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            {topicInfo?.description ?? "Unknown Description"}{" "}
            Find more at my{" "}
            <a
              href="https://github.com/BosEriko"
              target="_blank"
              className="underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-deep"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <p className="font-mono text-xs text-muted">
          {totalCount} {totalCount === 1 ? "repository" : "repositories"}
        </p>
      </header>

      {repos.length === 0 ? (
        <p className="py-20 text-center text-muted">No Repository found.</p>
      ) : (
        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <li key={repo.id}>
              <Atom.Card url={`/description/${repo.name}`} label={repo.full_name} coverPhotoUrl={`https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/COVER.png`} fallbackCoverPhotoUrl={`https://opengraph.githubassets.com/${repo.node_id}/${repo.full_name}`}>
                <h2 className="font-serif text-2xl leading-tight break-words decoration-brand decoration-2 underline-offset-4 group-hover:underline">
                  {repo.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {repo.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-5 font-mono text-xs text-muted">
                  <span>{repo.language}</span>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faEye} />
                      {repo.watchers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCodeBranch} />
                      {repo.forks_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </div>
              </Atom.Card>
            </li>
          ))}
        </ul>
      )}

      <Molecule.Pagination
        page={page}
        previousHref={`/topic/${topic}?page=${Math.max(1, page - 1)}`}
        nextHref={`/topic/${topic}?page=${Math.min(totalPages, page + 1)}`}
        hasPrevious={page > 1}
        hasNext={page < totalPages}
      />
    </Template.Default>
  );
}
