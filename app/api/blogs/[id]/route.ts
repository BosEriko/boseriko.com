import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const res = await fetch(
    `https://api.github.com/repos/BosEriko/blog/contents/${id}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
