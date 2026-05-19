import Template from "@template";
import Atom from "@atom";
import Molecule from "@molecule";
import type { Metadata } from "next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const revalidate = 86400;

const fetchData = async <T,>(name: string): Promise<T> => {
  const res = await fetch(`https://raw.githubusercontent.com/BosEriko/gh-data/refs/heads/main/${name}.json`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${name}`);
  }

  return res.json();
};

export const metadata: Metadata = {
  title: "Bos Eriko Reyes' Resume",
};

interface EntryDate {
  start: number;
  end: number | null;
}

interface EntryItem {
  position: string;
  company: string;
  date: EntryDate;
  location: string;
  active: boolean;
  hidden: boolean;
  responsibilities: string[];
}

interface EntryProps {
  data: EntryItem[];
  title: string;
  icon?: React.ReactNode;
}

interface Project {
  name: string;
  full_name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  updated_at: string | Date;
}

const ResumeSection: React.FC<EntryProps> = ({ data, title }) => {
  return (
    <div className="mb-20">
      <ul className="space-y-6">
        {data.filter((entry) => entry.hidden !== true).map((entry, index) => (
          <li key={index} className="inline-table w-full">
            {index < 1 && <h4 className="text-3xl font-bold mb-5">{title}</h4>}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{entry.position}</h3>
              <span className="text-xs text-gray-500">
                <Atom.Visibility state={!!entry.date?.start}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric",
                  }).format(new Date(entry.date.start))}
                </Atom.Visibility>
                <Atom.Visibility state={!!(entry.date?.end || entry.active)}>
                  <span> - </span>
                  <Atom.Visibility state={entry.active}>
                    Present
                  </Atom.Visibility>
                  <Atom.Visibility state={!entry.active}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(entry.date.end as number))}
                  </Atom.Visibility>
                </Atom.Visibility>
              </span>
            </div>
            <p className="text-gray-600 mb-2 flex gap-1">
              <span className="font-bold">{entry.company}</span>
              {entry.location && (
                <>
                  <span>at</span>
                  <span>{entry.location}</span>
                </>
              )}
            </p>
            <ul className="list-disc list-outside space-y-1 ml-5">
              {entry.responsibilities.map((task, i) => (
                <li key={i} className="text-gray-700">
                  {task}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default async function Resume() {
  const projects = await fetch(
    "https://api.github.com/search/repositories?q=user:boseriko+topic:product&sort=stars&order=desc&page=1&per_page=5",
    {
      next: { revalidate },
    },
  ).then((res) => res.json());

  const [
    experience,
    awards,
    gems,
    packages,
    contributions,
  ] = await Promise.all([
    fetchData<any>("experience"),
    fetchData<any>("awards"),
    fetchData<any>("gems"),
    fetchData<any>("packages"),
    fetchData<any>("contributions"),
  ]);

  const formatFullDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date);

  return (
    <Template.Resume>
      {/* Header */}
      <div className="inline-table w-full mb-15">
        <h1 className="text-5xl font-bold mb-2">Bos Eriko Reyes</h1>
        <p className="text-gray-600 mb-3">Software Engineer</p>
        <div className="flex items-center text-sm text-gray-700 mb-4 gap-5">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
            <span>boseriko.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
            <span>resume@boseriko.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            <span>github.com/BosEriko</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Molecule.Pills type="colored" />
        </div>
      </div>

      {/* Objective */}
      <div className="inline-table w-full mb-20">
        <h4 className="text-3xl font-bold mb-5">🏁 Objective</h4>
        <p className="text-justify">
          I am seeking employment with a company where I can use my skills and
          also grow as a person. I want to work in an environment where I can
          learn more knowledge related to my skill set. I want to excel and be
          the best that I can be at programming and also be crucial to any team
          that I can be a part of.
        </p>
      </div>

      {/* Experience */}
      <ResumeSection data={experience} title="🔥 Experience" />

      {/* Personal Projects */}
      <div className="mb-20">
        <ul className="space-y-6">
          {projects.items.map((project: Project, index: number) => (
            <li key={index} className="inline-table w-full">
              {index < 1 && (
                <h4 className="text-3xl font-bold mb-5">
                  🗂️ Personal Projects
                </h4>
              )}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <span className="text-xs text-gray-500">
                  <Atom.Visibility state={!!project.updated_at}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(project.updated_at))}
                  </Atom.Visibility>
                </span>
              </div>
              <p className="text-gray-600 mb-2 flex gap-1">
                <a href={project.html_url} className="font-bold" target="_blank">
                  {project.full_name}
                </a>
                <span>at</span>
                <span>github.com</span>
              </p>
              <ul className="list-disc list-outside space-y-1 ml-5">
                <li className="text-gray-700">
                  <Atom.Visibility state={!!project.language}>
                    <span>Built with {project.language}. </span>
                  </Atom.Visibility>
                  <span>Currently has {project.stargazers_count} </span>
                  <span>star{project.stargazers_count > 1 && "s"}.</span>
                  <Atom.Visibility state={!!project.homepage}>
                    <span> Live at </span>
                    <a href={project.homepage} target="_blank">
                      {project.homepage?.replace(/^https?:\/\//, "")}
                    </a>
                    <span>.</span>
                  </Atom.Visibility>
                </li>
                <Atom.Visibility state={!!project.description}>
                  {project.description.split(". ").map((item, index) => (
                    <li className="text-gray-700" key={index}>
                      <span>{item.endsWith(".") ? item : item + "."}</span>
                    </li>
                  ))}
                </Atom.Visibility>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Awards & Special Mentions */}
      <ResumeSection data={awards} title="🥇 Awards & Special Mentions" />

      {/* Community Contributions */}
      <div className="inline-table w-full mb-20">
        <h4 className="text-3xl font-bold mb-5">📜 Community Contributions</h4>
        <div className="flex gap-3">
          <div className="flex-1 flex gap-5 flex-col">
            <div>
              <h4 className="text-xl font-bold mb-2">NPM Packages</h4>
              <ul className="list-disc ml-5">
                {packages.map((npm: any, index: number) => (
                  <li key={index}>
                    <a
                      href={npm.link}
                      className="font-bold text-blue-800"
                      target="_blank"
                    >
                      {npm.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Ruby Gems</h4>
              <ul className="list-disc ml-5">
                {gems.map((gem: any, index: number) => (
                  <li key={index}>
                    <a
                      href={gem.link}
                      className="font-bold text-blue-800"
                      target="_blank"
                    >
                      {gem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">
              Open Source Contributions
            </h4>
            <ul className="list-disc ml-5">
              {contributions.map((contribution: any, index: number) => (
                <li key={index}>
                  <a
                    href={contribution.link}
                    className="font-bold text-blue-800"
                    target="_blank"
                  >
                    {contribution.name}
                  </a>
                  <span className="mx-1">by</span>
                  <a
                    href={contribution.author.link}
                    className="text-blue-800"
                    target="_blank"
                  >
                    {contribution.author.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-xs text-center text-gray-400 italic">
        Last Update: {formatFullDate(new Date())}
      </div>
    </Template.Resume>
  );
}
