"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/topic/product" },
    { label: "Projects", path: "/topic/project" },
    { label: "Blogs", path: "/blog" },
    { label: "Links", path: "/links" },
  ];

  return (
    <nav className="relative z-50">
      <div className="flex items-center justify-between md:hidden py-4">
        <button
          className="px-3 py-2 rounded bg-[#f7b43d] text-white"
          onClick={() => setOpen((v) => !v)}
        >
          <FontAwesomeIcon icon={faBars} className="text-md" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center gap-6 md:hidden text-white">
          {items.map((item) => (
            <button
              key={item.path}
              className="text-2xl px-6 py-3 hover:text-[#f7b43d] transition"
              onClick={() => {
                router.push(item.path);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            className="px-8 py-3 rounded-full bg-[#f7b43d] text-white text-2xl hover:bg-white hover:text-gray-700 transition"
            onClick={() => {
              router.push("/resume");
              setOpen(false);
            }}
          >
            Resume
          </button>

          <button
            className="absolute top-4 right-4 text-3xl"
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>
      )}

      <ul className="hidden md:flex md:items-center">
        {items.map((item) => (
          <li key={item.path}>
            <button
              className="px-7 py-5 hover:bg-[#f7b43d] cursor-pointer hover:text-gray-700 border-l border-gray-200 transition-all"
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}

        <li>
          <button
            className="px-7 py-5 text-[#f7b43d] hover:bg-[#f7b43d] hover:text-gray-700 cursor-pointer border-x border-gray-200 transition-all"
            onClick={() => window.open("/resume", "_blank")}
          >
            <FontAwesomeIcon icon={faFileLines} className="text-lg" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
