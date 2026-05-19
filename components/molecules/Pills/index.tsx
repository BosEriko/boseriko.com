import { Fragment } from "react";

const revalidate = 86400;

type TopicDataItem = {
  title: string;
  description: string;
  deviconClass?: string | null;
  bg?: string | null;
};

const fetchCount = async <T,>(): Promise<T> => {
  const res = await fetch(`https://raw.githubusercontent.com/BosEriko/gh-data/refs/heads/main/topic-count.json`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${name}`);
  }

  return res.json();
};

const fetchTopics = async <T,>(): Promise<T> => {
  const res = await fetch("https://raw.githubusercontent.com/BosEriko/gh-data/refs/heads/main/topics.json", {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  return res.json();
};


const Pills = async () => {
  const [count, topics] = await Promise.all([
    fetchCount<any>(),
    fetchTopics<any>(),
  ]);

  const filteredTopics = Object.fromEntries(
    Object.keys(count).map((key) => [key, topics[key]])
  );

  return (
    <Fragment>
      {Object.entries(filteredTopics).map(([topic, value]) => {
        const { deviconClass, bg } = value as TopicDataItem;
        return (
          <div
            key={topic}
            className="text-white flex items-center gap-2 rounded px-3 py-1 text-xs font-medium uppercase"
            style={{ backgroundColor: bg ?? "#D1D5DB" }}
          >
            <div>
              {deviconClass && (
                <i className={`${deviconClass} h-3 w-3`}></i>
              )}
            </div>
            <div>{topic}</div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Pills;
