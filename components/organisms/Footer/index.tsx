import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSteam,
  faFacebook,
  faTwitch,
  faYoutube,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const socialLinks = [
  {
    name: "steam",
    icon: faSteam,
    url: "https://steamcommunity.com/id/BosEriko/",
  },
  {
    name: "facebook",
    icon: faFacebook,
    url: "https://www.facebook.com/boseriko",
  },
  { name: "twitch", icon: faTwitch, url: "https://www.twitch.tv/boseriko" },
  {
    name: "youtube",
    icon: faYoutube,
    url: "https://www.youtube.com/@BosEriko",
  },
  {
    name: "instagram",
    icon: faInstagram,
    url: "https://www.instagram.com/boseriko",
  },
  { name: "tiktok", icon: faTiktok, url: "https://www.tiktok.com/@boseriko" },
  { name: "x", icon: faXTwitter, url: "https://x.com/boseriko" },
];

const Footer = () => {
  return (
    <footer className="p-4 border-t border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div>Bos Eriko Reyes &copy; {new Date().getFullYear()}</div>
        <div className="flex justify-center space-x-3">
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
