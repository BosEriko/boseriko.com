import Template from "@template";
import Atom from "@atom";
import Molecule from "@molecule";
import type { Metadata } from "next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const revalidate = 86400;

const fetchData = async <T,>(name: string): Promise<T> => {
  const res = await fetch(`https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/${name}.json`, {
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

const ResumeHeading: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="font-mono text-[11px] uppercase tracking-widest text-brand-deep">
    {title}
  </h2>
);

const ResumeBlock: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="grid gap-4 border-t border-line py-8 break-inside-avoid sm:grid-cols-[8.5rem_1fr] sm:gap-8">
    <ResumeHeading title={title} />
    <div>{children}</div>
  </section>
);

const ResumeSection: React.FC<EntryProps> = ({ data, title }) => {
  return (
    <ResumeBlock title={title}>
      <ul className="space-y-7">
        {data.filter((entry) => entry.hidden !== true).map((entry, index) => (
          <li key={index} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-base font-semibold">{entry.position}</h3>
              <span className="font-mono text-[11px] text-muted">
                <Atom.Visibility state={!!entry.date?.start}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric",
                  }).format(new Date(entry.date.start))}
                </Atom.Visibility>
                <Atom.Visibility state={!!(entry.date?.end || entry.active)}>
                  <span> &ndash; </span>
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
            <p className="mt-0.5 flex gap-1 text-sm text-muted">
              <span className="font-medium text-ink-soft">{entry.company}</span>
              {entry.location && (
                <>
                  <span>&middot;</span>
                  <span>{entry.location}</span>
                </>
              )}
            </p>
            <ul className="mt-2 ml-4 list-outside list-disc space-y-1 text-sm leading-relaxed text-ink-soft marker:text-line">
              {entry.responsibilities.map((task, i) => (
                <li key={i}>
                  {task}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </ResumeBlock>
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
      <header className="pb-8">
        <h1 className="font-serif text-5xl leading-none sm:text-6xl">Bos Eriko Reyes</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">Software Engineer</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5 text-muted" />
            <span>boseriko.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5 text-muted" />
            <span>resume@boseriko.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5 text-muted" />
            <span>github.com/BosEriko</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          <Molecule.Pills type="colored" />
        </div>
      </header>

      <ResumeBlock title="Objective">
        <p className="text-sm leading-relaxed text-ink-soft">
          I am seeking employment with a company where I can use my skills and
          also grow as a person. I want to work in an environment where I can
          learn more knowledge related to my skill set. I want to excel and be
          the best that I can be at programming and also be crucial to any team
          that I can be a part of.
        </p>
      </ResumeBlock>

      <ResumeSection data={experience} title="Experience" />

      <ResumeBlock title="Personal Projects">
        <ul className="space-y-7">
          {projects.items.map((project: Project, index: number) => (
            <li key={index} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-semibold">{project.name}</h3>
                <span className="font-mono text-[11px] text-muted">
                  <Atom.Visibility state={!!project.updated_at}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(project.updated_at))}
                  </Atom.Visibility>
                </span>
              </div>
              <p className="mt-0.5 flex gap-1 text-sm text-muted">
                <a href={project.html_url} className="font-medium text-ink-soft hover:underline" target="_blank">
                  {project.full_name}
                </a>
                <span>&middot;</span>
                <span>github.com</span>
              </p>
              <ul className="mt-2 ml-4 list-outside list-disc space-y-1 text-sm leading-relaxed text-ink-soft marker:text-line">
                <li>
                  <Atom.Visibility state={!!project.language}>
                    <span>Built with {project.language}. </span>
                  </Atom.Visibility>
                  <span>Currently has {project.stargazers_count} </span>
                  <span>star{project.stargazers_count > 1 && "s"}.</span>
                  <Atom.Visibility state={!!project.homepage}>
                    <span> Live at </span>
                    <a href={project.homepage} target="_blank" className="underline decoration-line underline-offset-2">
                      {project.homepage?.replace(/^https?:\/\//, "")}
                    </a>
                    <span>.</span>
                  </Atom.Visibility>
                </li>
                <Atom.Visibility state={!!project.description}>
                  {project.description.split(". ").map((item, index) => (
                    <li key={index}>
                      <span>{item.endsWith(".") ? item : item + "."}</span>
                    </li>
                  ))}
                </Atom.Visibility>
              </ul>
            </li>
          ))}
        </ul>
      </ResumeBlock>

      <ResumeSection data={awards} title="Awards & Mentions" />

      <ResumeBlock title="Community">
        <div className="grid gap-6 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-2 font-semibold">NPM Packages</h3>
              <ul className="space-y-1">
                {packages.map((npm: any, index: number) => (
                  <li key={index}>
                    <a
                      href={npm.link}
                      className="text-ink-soft underline decoration-line underline-offset-2 hover:decoration-brand"
                      target="_blank"
                    >
                      {npm.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Ruby Gems</h3>
              <ul className="space-y-1">
                {gems.map((gem: any, index: number) => (
                  <li key={index}>
                    <a
                      href={gem.link}
                      className="text-ink-soft underline decoration-line underline-offset-2 hover:decoration-brand"
                      target="_blank"
                    >
                      {gem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Open Source Contributions</h3>
            <ul className="space-y-1">
              {contributions.map((contribution: any, index: number) => (
                <li key={index} className="text-muted">
                  <a
                    href={contribution.link}
                    className="text-ink-soft underline decoration-line underline-offset-2 hover:decoration-brand"
                    target="_blank"
                  >
                    {contribution.name}
                  </a>
                  <span className="mx-1">by</span>
                  <a
                    href={contribution.author.link}
                    className="hover:underline"
                    target="_blank"
                  >
                    {contribution.author.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ResumeBlock>

      <div className="border-t border-line pt-6 text-center font-mono text-[10px] text-muted">
        Last Update: {formatFullDate(new Date())}
      </div>
    </Template.Resume>
  );
}
