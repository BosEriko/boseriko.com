"use client";

import Template from "@template";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

type TopicCount = Record<string, number>;

interface PictureStackProps {
  url: string;
}

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const PictureStack: React.FC<PictureStackProps> = ({ url }) => {
  return (
    <div className="relative flex items-center justify-center aspect-square w-60 lg:w-80 xl:w-125">
      <div className="absolute rounded-md rotate-3 bg-[#f7b43d] w-full aspect-square opacity-70" />
      <div className="absolute rounded-md -rotate-2 bg-[#f7b43d] w-full aspect-square opacity-80" />
      <div className="absolute rounded-md rotate-1 border-10 border-[#f7b43d] bg-cover bg-center w-full aspect-square overflow-hidden">
        <img src={url} className="w-full h-full" />
      </div>
    </div>
  );
};

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
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center mb-40 gap-10 mt-10">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6 w-full">
          <h1
            className={`${poppins.className} text-6xl sm:text-8xl md:text-9xl font-bold text-gray-900`}
          >
            Bos Eriko
          </h1>
          <hr className="bg-[#f7b43d] w-24 h-2 border-0 rounded-full" />
          <div className="text-lg md:text-xl text-gray-700">
            I'm a full stack developer making random things
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
          <div className="flex flex-col sm:flex-row gap-4">
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
        <div className="flex justify-center items-center w-full md:w-auto">
          <PictureStack url="https://avatars.githubusercontent.com/BosEriko" />
        </div>
      </div>
    </Template.Default>
  );
}
