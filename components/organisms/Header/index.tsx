"use client";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header>
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
    </header>
  );
};

export default Header;
