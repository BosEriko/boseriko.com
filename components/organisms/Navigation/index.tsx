"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/topic/product" },
  { label: "Projects", path: "/topic/project" },
  { label: "Blog", path: "/blog" },
  { label: "Connect", path: "/connect" },
];

const Navigation = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink md:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink text-paper md:hidden">
          <div className="flex h-16 items-center justify-end px-5">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-paper/20"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
            {items.map((item, index) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-4 py-2 font-serif text-5xl transition-colors hover:text-brand ${isActive(item.path) ? "text-brand" : ""}`}
                >
                  <span className="font-mono text-xs text-paper/40">
                    0{index + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-6">
              <a
                href="/resume"
                target="_blank"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 rounded-sm bg-brand px-5 py-3 font-mono text-sm uppercase tracking-wider text-ink"
              >
                Resume
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
              </a>
            </li>
          </ul>
        </div>
      )}

      <ul className="hidden items-center gap-1 md:flex">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`relative px-3 py-2 text-sm transition-colors hover:text-ink after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-brand after:transition-transform after:origin-left ${isActive(item.path) ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:after:scale-x-100"}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="ml-3">
          <a
            href="/resume"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-sm border border-ink px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
          >
            Resume
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
