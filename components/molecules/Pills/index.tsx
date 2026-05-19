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
      pillClass = 'text-white flex items-center gap-2 rounded px-3 py-1 text-xs font-medium uppercase';
      break;

    case 'yellow':
      pillClass = 'rounded-full pl-3 pr-1 py-1 text-xs font-medium transition-all duration-300 ease-out uppercase flex gap-3 items-center cursor-pointer bg-yellow-200 border border-yellow-300 text-yellow-600 hover:-translate-y-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300';
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
            style={{ backgroundColor: type === "colored" ? bg ?? "#D1D5DB" : "FEF08A"  }}
            href={`/topic/${topic}`}
          >
            <div>
              <Atom.Visibility state={!!deviconClass}><i className={`${deviconClass} h-3 w-3`}></i></Atom.Visibility>
            </div>
            <span>{topic}</span>
            <Atom.Visibility state={type === "yellow"}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-yellow-600 text-yellow-200 text-xs">
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
