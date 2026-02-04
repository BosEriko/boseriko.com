import Template from "@template";
import Atom from "@atom";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import experience from "../../data/experience.json";
import projects from "../../data/projects.json";
import awards from "../../data/awards.json";
import gems from "../../data/gems.json";
import contributions from "../../data/contributions.json";

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
  responsibilities: string[];
}

interface EntryProps {
  data: EntryItem[];
  title: string;
  icon?: React.ReactNode;
}

const ResumeSection: React.FC<EntryProps> = ({ data, title }) => {
  return (
    <div className="mb-20">
      <ul className="space-y-6">
        {data.map((entry, index) => (
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
            <ul className="list-disc list-inside space-y-1">
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

export default function Resume() {
  return (
    <Template.Resume>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-5xl font-bold mb-2">Bos Eriko Reyes</h1>
        <p className="text-gray-600 mb-5">
          Full Stack Developer & Software Engineer
        </p>
        <div className="flex items-center text-sm text-gray-700">
          <div className="flex items-center gap-2 flex-1">
            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
            <span>resume@boseriko.com</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            <span>github.boseriko.com</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
            <span>linkedin.boseriko.com</span>
          </div>
        </div>
      </div>

      {/* Objective */}
      <div className="mb-20">
        <h4 className="text-3xl font-bold mb-5">🏁 Objective</h4>
        <p className="text-justify">
          I am seeking employment with a company where I can use my skills and
          also grow as a person. I want to work in an environment where I can
          learn more knowledge related to my skill set. I want to excel and be
          the best that I can be at programming and also be crucial to any team
          that I can be a part of.
        </p>
      </div>

      {/* Sections */}
      <ResumeSection data={experience} title="🔥 Experience" />
      <ResumeSection data={projects} title="🧠 Personal Projects" />
      <ResumeSection data={awards} title="🥇 Awards & Special Mentions" />

      {/* Community Contributions */}
      <div className="inline-table w-full">
        <h4 className="text-3xl font-bold mb-5">📜 Community Contributions</h4>
        <div className="flex gap-3">
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">Published Ruby Gems</h4>
            <ul className="list-disc ml-5">
              {gems.map((gem, index) => (
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
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">
              Open Source Contributions
            </h4>
            <ul className="list-disc ml-5">
              {contributions.map((contribution, index) => (
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
    </Template.Resume>
  );
}
