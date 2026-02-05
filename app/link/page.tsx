"use client";
import Template from "@template";
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
import socialLinksData from "@data/links.json";

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

export default function Links() {
  return (
    <Template.Default>
      <h1 className="font-bold text-4xl text-center">Connect with me</h1>
      <h4 className="text-gray-500 text-center">Or play with me or whatever</h4>
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
    </Template.Default>
  );
}
