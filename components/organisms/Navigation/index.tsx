"use client";

import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  return (
    <nav>
      <ul>
        <li>
          <button
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
