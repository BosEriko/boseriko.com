"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
      <div className="flex items-center justify-between md:hidden p-4">
        <button
          className="px-3 py-2 border rounded"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center gap-6 md:hidden text-white">
          {items.map((item) => (
            <button
              key={item.path}
              className="text-2xl px-6 py-3 hover:text-blue-400 transition"
              onClick={() => {
                router.push(item.path);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            className="px-8 py-3 rounded-full bg-blue-500 text-white text-2xl hover:bg-blue-600 transition"
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
            ✕
          </button>
        </div>
      )}

      <ul className="hidden md:flex md:gap-2 md:items-center">
        {items.map((item) => (
          <li key={item.path}>
            <button
              className="px-3 py-2 hover:bg-gray-700 rounded"
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}

        <li>
          <button
            className="px-4 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition"
            onClick={() => window.open("/resume", "_blank")}
          >
            Resume
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
