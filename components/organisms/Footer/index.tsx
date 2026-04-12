import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  "https://raw.githubusercontent.com/BosEriko/gh-data/refs/heads/main/links.json",
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

const socialLinks = socialLinksData.map((link) => ({
  ...link,
  icon: iconMap[link.icon as keyof typeof iconMap],
}));

const Footer = () => {
  return (
    <footer className="py-6 border-t border-gray-200 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-sm text-gray-600 text-center md:text-left">
          Bos Eriko &copy; {new Date().getFullYear()}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#f7b43d] transition-colors"
            >
              <FontAwesomeIcon icon={social.icon} size="sm" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
