import Template from "@template";
import Atom from "@atom";

interface Repo {
  description: string;
  name: string;
  homepage: string;
  created_at: string;
  updated_at: string;
  stargazers_count: string;
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

    return (
      <Template.Default orientation="minimal" backgroundColor="white">
        <div className="container mx-auto px-4 py-10">
          <Atom.Visibility state={!!(topics.length > 0)}>
            <ul className="mb-4 flex flex-wrap gap-2 justify-center">
              {topics.map((topic) => (
                <li key={topic}>
                  <a
                    href={`/topic/${topic}`}
                    target="_blank"
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                  >
                    #{topic}
                  </a>
                </li>
              ))}
            </ul>
          </Atom.Visibility>
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
