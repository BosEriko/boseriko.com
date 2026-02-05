import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const username = "boseriko";

  try {
    console.log(`https://dev.to/api/articles/${username}/${slug}`);
    const res = await fetch(`https://dev.to/api/articles/${username}/${slug}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch article from Dev.to" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
