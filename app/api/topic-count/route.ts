import { NextResponse, NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const res = await fetch(
    "https://raw.githubusercontent.com/BosEriko/gh-data/refs/heads/main/topic-count.json",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
