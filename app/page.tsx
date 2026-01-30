"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div>
        <button onClick={() => router.push(`/project`)}>View Projects</button>
      </div>
      <div>
        <button onClick={() => router.push(`/blog`)}>View Blogs</button>
      </div>
    </div>
  );
}
