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
      {Object.entries(topics).map(([topic, count]) => (
        <button
          key={topic}
          onClick={() => router.push(`/topic/${topic}`)}
          className="rounded-full bg-zinc-800 hover:bg-zinc-700 px-3 py-1 text-xs font-medium text-white transition"
        >
          {topic} {count}
        </button>
      ))}
    </Template.Default>
  );
}
