import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: {} }) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const perPage = "10";

  const res = await fetch(
    `https://dev.to/api/articles?username=boseriko&page=${page}&per_page=${perPage}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch posts from dev.to" },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
