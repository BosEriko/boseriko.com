import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch(
    "https://api.github.com/repos/BosEriko/blog/contents",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
