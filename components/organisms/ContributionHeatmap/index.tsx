type Contribution = {
  date: string;
  count: number;
  level: number;
};

const colors = ["#ede5d6", "#f8dca5", "#f7b43d", "#ce8b1c", "#9a6300"];
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

async function fetchContributions(): Promise<Contribution[] | null> {
  try {
    const response = await fetch(
      "https://github-contributions-api.jogruber.de/v4/BosEriko?y=last",
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(8000) },
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (
      !Array.isArray(data.contributions) ||
      data.contributions.length === 0 ||
      !data.contributions.every(
        (day: Contribution) =>
          day &&
          /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
          Number.isFinite(Date.parse(day.date)) &&
          Number.isInteger(day.count) &&
          day.count >= 0 &&
          Number.isInteger(day.level) &&
          day.level >= 0 &&
          day.level < colors.length,
      )
    ) return null;

    return data.contributions.sort((a: Contribution, b: Contribution) =>
      a.date.localeCompare(b.date),
    );
  } catch {
    return null;
  }
}

export default async function ContributionHeatmap() {
  const contributions = await fetchContributions();
  const total = contributions?.reduce((sum, day) => sum + day.count, 0) ?? 0;
  const firstDate = contributions ? new Date(contributions[0].date) : null;
  const firstSunday = firstDate
    ? firstDate.getTime() - firstDate.getUTCDay() * 86400000
    : 0;
  const days = contributions?.map((day) => {
    const date = new Date(day.date);
    return {
      ...day,
      dateObject: date,
      week: Math.floor((date.getTime() - firstSunday) / 604800000),
      weekday: date.getUTCDay(),
      label: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${dateFormat.format(date)}`,
    };
  });
  const weeks = days ? days[days.length - 1].week + 1 : 0;

  return (
    <section aria-labelledby="github-activity-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
              A little progress, every day
            </p>
            <h2 id="github-activity-heading" className="font-serif text-3xl sm:text-4xl">
              GitHub activity
            </h2>
          </div>
          <a
            href="https://github.com/BosEriko"
            className="text-sm font-medium underline decoration-brand decoration-2 underline-offset-8 transition-colors hover:text-brand-deep"
          >
            @BosEriko <span aria-hidden="true">↗</span>
          </a>
        </div>

        {days ? (
          <>
            <div
              className="overflow-x-auto pb-2"
              tabIndex={0}
              role="region"
              aria-label="Contribution calendar; scroll horizontally to explore the past year"
            >
              <svg
                viewBox={`0 0 ${weeks * 15 + 35} 128`}
                className="w-full min-w-[760px]"
                role="img"
                aria-labelledby="contributions-title contributions-description"
              >
                <title id="contributions-title">GitHub contributions over the past year</title>
                <desc id="contributions-description">
                  {total.toLocaleString("en-US")} contributions. Each square represents a day;
                  darker amber indicates more contributions. Hover over a square for its date and count.
                </desc>
                {days.filter((day) => day.dateObject.getUTCDate() === 1 && day.week < weeks - 1).map((day) => (
                  <text key={day.date} x={35 + day.week * 15} y={10} className="fill-muted font-mono text-[9px]">
                    {monthFormat.format(day.dateObject)}
                  </text>
                ))}
                {["Mon", "Wed", "Fri"].map((label, index) => (
                  <text key={label} x={0} y={44 + index * 30} className="fill-muted font-mono text-[9px]">
                    {label}
                  </text>
                ))}
                {days.map((day) => (
                  <rect
                    key={day.date}
                    x={35 + day.week * 15}
                    y={20 + day.weekday * 15}
                    width={11}
                    height={11}
                    rx={2}
                    fill={colors[day.level]}
                    className="stroke-ink/5 hover:stroke-ink"
                  >
                    <title>{day.label}</title>
                  </rect>
                ))}
              </svg>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
              <p>
                <span className="font-medium text-ink">{total.toLocaleString("en-US")} contributions</span> in the last year
              </p>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="mr-1">Less</span>
                {colors.map((color) => (
                  <span key={color} className="h-3 w-3 rounded-[2px] border border-ink/5" style={{ backgroundColor: color }} />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">
            Activity is temporarily unavailable. Visit my GitHub profile to see what I&apos;m working on.
          </p>
        )}
      </div>
    </section>
  );
}
