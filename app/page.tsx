"use client";
import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TopicCount = Record<string, number>;

export default function Home() {
  const router = useRouter();
  const [topics, setTopics] = useState<TopicCount>({});

  useEffect(() => {
    fetch("/api/topic-count")
      .then((res) => res.json())
      .then(setTopics)
      .catch(console.error);
  }, []);

  return (
    <Template.Default center={true}>
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <h1 className="font-bold text-9xl">Bos Eriko</h1>
        <hr className="bg-[#f7b43d] w-24 h-2 border-0" />
        <div>I'm a full stack developer making random things</div>
        <div className="flex flex-row gap-3">
          {Object.entries(topics).map(([topic, count]) => (
            <button
              key={topic}
              onClick={() => router.push(`/topic/${topic}`)}
              className="rounded-full bg-zinc-800 hover:bg-zinc-700 px-3 py-1 text-xs font-medium text-white transition uppercase"
            >
              {topic} {count}
            </button>
          ))}
        </div>
        <div>
          <button>View Products</button>
          <button>Resume</button>
        </div>
      </div>
    </Template.Default>
  );
}
