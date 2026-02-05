"use client";

import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

type TopicCount = Record<string, number>;

// Professional Google font
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

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
    <Template.Default>
      <div className="container mx-auto px-4">
        <h1
          className={`${poppins.className} text-8xl md:text-9xl font-bold text-gray-900 mb-4`}
        >
          Bos Eriko
        </h1>

        <hr className="bg-[#f7b43d] w-24 h-2 border-0 rounded-full mb-4" />

        <div className="text-lg md:text-xl text-gray-700">
          I'm a full stack developer making random things
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {Object.entries(topics).map(([topic, count]) => (
            <button
              key={topic}
              onClick={() => router.push(`/topic/${topic}`)}
              className="rounded-full pl-3 pr-1 py-1 text-xs font-medium transition-all duration-300 ease-out uppercase flex gap-3 items-center cursor-pointer
                         bg-yellow-200 border border-yellow-300 text-yellow-600 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <span>{topic}</span>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-yellow-500 text-yellow-200 text-xs">
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => window.open("/resume", "_blank")}
            className="px-6 py-2 rounded-md border-2 border-[#f7b43d] bg-[#f7b43d] text-gray-700 font-bold transition-all duration-300 ease-out
                       hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            Resume
          </button>
          <button
            onClick={() => router.push("/product")}
            className="px-6 py-2 rounded-md border-2 border-[#f7b43d] bg-transparent text-[#f7b43d] font-bold transition-all duration-300 ease-out
                       hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            View Products
          </button>
        </div>
      </div>
    </Template.Default>
  );
}
