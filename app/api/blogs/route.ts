import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const per_page = Number(searchParams.get("per_page") || "10");

  const res = await fetch(
    `https://dev.to/api/articles?username=boseriko&page=${page}&per_page=${per_page}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch posts from dev.to" },
      { status: res.status },
    );
  }

  const data = await res.json();

  const nextRes = await fetch(
    `https://dev.to/api/articles?username=boseriko&page=${page + 1}&per_page=${per_page}`,
    { next: { revalidate: 86400 } },
  );
  const nextData = nextRes.ok ? await nextRes.json() : [];

  return NextResponse.json({
    posts: data,
    hasNext: Array.isArray(nextData) && nextData.length > 0,
  });
}
