import Template from "@template";
import Atom from "@atom";
import Molecule from "@molecule";
import ContributionHeatmap from "@/components/organisms/ContributionHeatmap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface PortraitProps {
  url: string;
}

const sections = [
  { label: "Products", description: "Things I keep building.", path: "/topic/product" },
  { label: "Projects", description: "Things I build every now and then.", path: "/topic/project" },
  { label: "Stats", description: "My GitHub, by the numbers.", path: "/stats" },
  { label: "Connect", description: "Find me around the internet.", path: "/connect" },
];

const viewfinderCorners = [
  "top-3 left-3 border-t-2 border-l-2 group-hover:top-5 group-hover:left-5",
  "top-3 right-3 border-t-2 border-r-2 group-hover:top-5 group-hover:right-5",
  "bottom-3 left-3 border-b-2 border-l-2 group-hover:bottom-5 group-hover:left-5",
  "bottom-3 right-3 border-b-2 border-r-2 group-hover:bottom-5 group-hover:right-5",
];

const Portrait: React.FC<PortraitProps> = ({ url }) => {
  return (
    <figure className="group relative w-72 sm:w-80 lg:w-[26rem]">
      <span className="absolute -top-6 -left-6 z-20 -rotate-12 rounded-sm bg-paper p-1 shadow-md transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110">
        <Atom.Logo className="block h-12 w-12" />
      </span>

      <div className="relative rounded-sm border-2 border-ink bg-ink shadow-[10px_10px_0_var(--color-brand)] transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[5px_5px_0_var(--color-brand)]">
        <div className="flex items-center justify-between py-2 pr-3 pl-10 font-mono text-[10px] uppercase tracking-widest text-paper/60">
          <span className="flex items-center gap-2 text-paper">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            On air
          </span>
          <span>cam_01</span>
        </div>

        <div className="relative aspect-4/5 overflow-hidden bg-paper-deep">
          <img
            src={url}
            alt="Portrait of Bos Eriko"
            className="h-full w-full object-cover grayscale-[40%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />

          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(26_23_20/0.18)_0px,rgb(26_23_20/0.18)_1px,transparent_1px,transparent_3px)] transition-opacity duration-500 group-hover:opacity-0" />

          {viewfinderCorners.map((corner) => (
            <span
              key={corner}
              className={`pointer-events-none absolute h-6 w-6 border-brand transition-all duration-500 ${corner}`}
            />
          ))}

          <div className="absolute bottom-8 left-0 flex flex-col items-start">
            <span className="bg-brand py-1 pr-4 pl-5 font-serif text-2xl leading-tight text-ink">
              Bos Eriko
            </span>
            <span className="bg-ink py-1.5 pr-4 pl-5 font-mono text-[10px] uppercase tracking-widest text-paper">
              Software engineer &middot; @BosEriko
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default async function Home() {
  return (
    <Template.Default orientation="minimal">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 pt-14 pb-20 lg:grid-cols-[1fr_auto] lg:gap-20 lg:pt-24 lg:pb-28">
        <div className="order-2 lg:order-1">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Portfolio &mdash; Software Engineer
          </p>
          <h1 className="mt-5 font-serif text-7xl leading-[0.9] tracking-tight sm:text-8xl lg:text-[9rem]">
            Bos <em className="text-brand-deep">Eriko</em>
          </h1>
          <p className="mt-8 max-w-lg text-xl leading-relaxed text-ink-soft md:text-2xl">
            I&apos;m a software engineer who likes{" "}
            <span className="highlight text-ink">anime</span> and{" "}
            <span className="highlight text-ink">streaming</span>.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/topic/product"
              className="group inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-brand hover:text-ink"
            >
              View products
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href="/resume"
              target="_blank"
              className="text-sm font-medium underline decoration-brand decoration-2 underline-offset-8 transition-colors hover:text-brand-deep"
            >
              Read my resume
            </a>
          </div>
          <div className="mt-14 border-t border-line pt-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Things I work with
            </p>
            <div className="flex flex-wrap gap-2">
              <Molecule.Pills type="yellow" />
            </div>
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <Portrait url="https://avatars.githubusercontent.com/BosEriko" />
        </div>
      </section>

      <ContributionHeatmap />

      <section className="border-t border-line">
        <ul className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, index) => (
            <li
              key={section.path}
              className="border-line border-b sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Link
                href={section.path}
                className="group flex h-full flex-col gap-10 px-5 md:px-8 py-8 transition-colors hover:bg-paper-deep"
              >
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
                <div>
                  <h2 className="flex items-center justify-between font-serif text-3xl">
                    {section.label}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-base text-muted transition-all group-hover:-rotate-45 group-hover:text-brand-deep"
                    />
                  </h2>
                  <p className="mt-1 text-sm text-muted">{section.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Template.Default>
  );
}
