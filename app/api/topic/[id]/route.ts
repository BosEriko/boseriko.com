import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const perPage = "10";

  const res = await fetch(
    `https://api.github.com/search/repositories?q=user:boseriko+topic:${id}&sort=updated&order=desc&page=${page}&per_page=${perPage}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
