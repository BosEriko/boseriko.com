"use client";

import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex gap-1">
        <li>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/topic/product")}
          >
            Products
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/topic/project")}
          >
            Projects
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/blog")}
          >
            Blogs
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/contact")}
          >
            Get in Touch
          </button>
        </li>
        <li>
          <button
            className="px-3 py-1 hover:bg-gray-700 rounded"
            onClick={() => router.push("/resume")}
          >
            Resume
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
