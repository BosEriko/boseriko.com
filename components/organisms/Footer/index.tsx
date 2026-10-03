import Link from "next/link";
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
    next: { revalidate: 86400 },
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

const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Say hello
            </p>
            <Link
              href="/connect"
              className="group mt-3 inline-flex items-center gap-4 font-serif text-4xl md:text-5xl"
            >
              Let&apos;s build something
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-2xl text-brand-deep transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </div>
          <ul className="flex flex-wrap gap-1">
            {socialLinks.map((social: any) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-sm text-muted transition-colors hover:bg-ink hover:text-paper"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex justify-between border-t border-line pt-6 font-mono text-xs text-muted">
          <span>Bos Eriko &copy; {new Date().getFullYear()}</span>
          <span>boseriko.com</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
