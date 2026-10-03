import { Fragment } from "react";
import Atom from "@atom";

const revalidate = 86400;

type TopicDataItem = {
  title: string;
  description: string;
  deviconClass?: string | null;
  bg?: string | null;
};

const fetchCount = async <T,>(): Promise<T> => {
  const res = await fetch(`https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/topic-count.json`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${name}`);
  }

  return res.json();
};

const fetchTopics = async <T,>(): Promise<T> => {
  const res = await fetch("https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/topics.json", {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  return res.json();
};


const Pills = async ({ type = "colored" }) => {
  const [count, topics] = await Promise.all([
    fetchCount<any>(),
    fetchTopics<any>(),
  ]);

  const filteredTopics = Object.fromEntries(
    Object.keys(count).map((key) => [key, topics[key]])
  );

  let pillClass;
  switch (type) {
    case 'colored':
      pillClass = 'flex items-center gap-1.5 rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft';
      break;

    case 'yellow':
      pillClass = 'group flex items-center gap-2 rounded-sm border border-line bg-paper py-1.5 pl-2.5 pr-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-paper';
      break;

    default:
      pillClass = 'bg-gray-200 text-gray-800';
  }

  return (
    <Fragment>
      {Object.entries(filteredTopics).map(([topic, value]) => {
        const { deviconClass, bg } = value as TopicDataItem;
        return (
          <a
            key={topic}
            className={pillClass}
            href={`/topic/${topic}`}
          >
            <Atom.Visibility state={type === "colored"}>
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: bg ?? "#D1D5DB" }}
              />
            </Atom.Visibility>
            <Atom.Visibility state={type === "yellow" && !!deviconClass}>
              <i className={`${deviconClass} text-sm`}></i>
            </Atom.Visibility>
            <span>{topic}</span>
            <Atom.Visibility state={type === "yellow"}>
              <span className="rounded-sm bg-paper-deep px-1.5 py-0.5 text-[10px] text-muted transition-colors group-hover:bg-brand group-hover:text-ink">
                {count[topic]}
              </span>
            </Atom.Visibility>
          </a>
        );
      })}
    </Fragment>
  );
};

export default Pills;
