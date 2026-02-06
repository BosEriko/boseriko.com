import Template from "@template";
import Atom from "@atom";

interface PageProps {
  params: any;
}

export default async function Description({ params }: PageProps) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://api.github.com/repos/BosEriko/${id}/contents/PORTFOLIO.md`,
      {
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch description: ${res.status}`);
    }

    const data = await res.json();
    const content = atob(data.content.replace(/\n/g, ""));

    return (
      <Template.Default center={true}>
        <div>
          <Atom.Visibility state={!!content}>
            <Atom.Markdown content={content} simple={false} />
          </Atom.Visibility>
          <Atom.Visibility state={!content}>
            <div className="text-center">No PORTFOLIO.md found.</div>
          </Atom.Visibility>
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
