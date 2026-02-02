import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const res = await fetch(
    `https://api.github.com/repos/BosEriko/${id}/contents/PORTFOLIO.md`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
