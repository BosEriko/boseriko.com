import { CACHE_TTL_SECONDS } from "@/config/cache";
import Template from "@template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  faSteam,
  faFacebook,
  faTwitch,
  faYoutube,
  faInstagram,
  faTiktok,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const socialLinksData = await fetch(
  "https://raw.githubusercontent.com/BosEriko/BosEriko/refs/heads/master/links.json",
  {
    next: { revalidate: CACHE_TTL_SECONDS },
  },
).then((res) => res.json());

const iconMap = {
  faSteam,
  faFacebook,
  faTwitch,
  faYoutube,
  faInstagram,
  faTiktok,
  faXTwitter,
  faLinkedin,
};

const socialLinks = socialLinksData.map((link: any) => ({
  ...link,
  icon: iconMap[link.icon as keyof typeof iconMap],
}));

export default function Connect() {
  return (
    <Template.Default>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Elsewhere
          </p>
          <h1 className="mt-4 font-serif text-6xl leading-none md:text-7xl">
            Connect <em className="text-brand-deep">with me</em>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Or play with me or whatever.
          </p>
        </header>

        <ul className="border-t border-line">
          {socialLinks.map((social: any, index: number) => (
            <li key={social.name} className="border-b border-line">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 py-5 transition-[padding] duration-300 hover:pl-3"
              >
                <span className="w-6 font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white"
                  style={{ backgroundColor: social.color }}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </span>
                <span className="flex-1 font-serif text-3xl capitalize">
                  {social.name}
                </span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-muted transition-all duration-300 group-hover:-rotate-45 group-hover:text-ink"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Template.Default>
  );
}
