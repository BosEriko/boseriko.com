import Template from "@template";
import Atom from "@atom";

interface Repo {
  description: string;
  name: string;
  homepage: string;
  updated_at: string;
  stargazers_count: number;
  topics: string[];
}

interface PageProps {
  params: any;
}

export default async function Description({ params }: PageProps) {
  const { id } = await params;
  const revalidate = 86400;
  const portfolioURL = `https://api.github.com/repos/boseriko/${id}/contents/PORTFOLIO.md`;
  const repoURL = `https://api.github.com/repos/boseriko/${id}`;

  try {
    const [contentRes, repoRes] = await Promise.all([
      fetch(portfolioURL, {
        next: { revalidate },
      }),
      fetch(repoURL, {
        next: { revalidate },
      }),
    ]);

    if (!contentRes.ok) {
      return (
        <Template.Default>
          <div className="text-center">
            <span>No PORTFOLIO.md found. </span>
            <span>Make sure the repository has </span>
            <span>PORTFOLIO.md on the root directory.</span>
          </div>
        </Template.Default>
      );
    }

    const contentJson = await contentRes.json();
    const repoJson: Repo = await repoRes.json();

    const content = Buffer.from(contentJson.content, "base64").toString(
      "utf-8",
    );

    const topics: string[] = (repoJson?.topics ?? []).filter(
      (topic: any) => topic !== "product" && topic !== "project",
    );

    const name: string = repoJson.name;
    const created_at: string = repoJson.created_at;
    const updated_at: string = repoJson.updated_at;
    const homepage: string = repoJson.homepage;
    const stargazers_count: number = repoJson.stargazers_count;
    const description: string = repoJson.description;

    return (
      <Template.Default orientation="minimal" backgroundColor="white">
        <div className="px-4 py-10">
          <Atom.Visibility state={!!(topics.length > 0)}>
            <ul className="flex flex-wrap gap-2 justify-center mb-3">
              {topics.map((topic) => (
                <li key={topic}>
                  <a
                    href={`/topic/${topic}`}
                    target="_blank"
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    #{topic}
                  </a>
                </li>
              ))}
            </ul>
          </Atom.Visibility>

          <div className="text-gray-500 text-sm text-center mb-3">
            <span>
              <span>Updated at </span>
              {new Date(updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="font-bold"> &middot; </span>
            <span>
              <a href={homepage} target="_blank" className="hover:underline">
                {homepage?.replace(/^https?:\/\//, "")}
              </a>
            </span>
          </div>

          <h1 className="text-3xl font-bold text-center mb-3">{name}</h1>

          <h4 className="text-center mb-10 text-md text-gray-500 max-w-175 mx-auto">
            {description}
          </h4>

          <Atom.Markdown content={content} simple={false} />
        </div>
      </Template.Default>
    );
  } catch (err) {
    console.error(err);
    return (
      <Template.Default>
        <div className="p-8 font-sans">
          <p>Failed to fetch PORTFOLIO.md</p>
        </div>
      </Template.Default>
    );
  }
}
