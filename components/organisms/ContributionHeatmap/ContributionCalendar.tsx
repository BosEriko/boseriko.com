"use client";

import { useEffect, useRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export type Contribution = {
  date: string;
  count: number;
  level: number;
};

const colors = ["#ede5d6", "#f8dca5", "#f7b43d", "#ce8b1c", "#9a6300"];
const yearButtonClass =
  "inline-flex min-h-11 items-center gap-2 rounded-sm border border-ink px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors enabled:cursor-pointer enabled:hover:bg-ink enabled:hover:text-paper disabled:cursor-not-allowed disabled:border-line disabled:text-muted/60 sm:px-4";

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

export default function ContributionCalendar({
  recentContributions,
  history,
}: {
  recentContributions: Contribution[] | null;
  history: Contribution[] | null;
}) {
  const [selectedYear, setSelectedYear] = useState("last");
  const yearTabsRef = useRef<HTMLDivElement>(null);
  const years = [...new Set(history?.map((day) => day.date.slice(0, 4)) ?? [])].sort().reverse();
  const periods = ["last", ...years];
  const selectedIndex = periods.indexOf(selectedYear);
  useEffect(() => {
    const tabs = yearTabsRef.current;
    const selectedTab = tabs?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (tabs && selectedTab) {
      const keepSelectedTabVisible = () => {
        tabs.scrollLeft = selectedTab.offsetLeft - (tabs.clientWidth - selectedTab.clientWidth) / 2;
      };
      keepSelectedTabVisible();
      const observer = new ResizeObserver(keepSelectedTabVisible);
      observer.observe(tabs);
      return () => observer.disconnect();
    }
  }, [selectedYear]);
  const contributions = selectedYear === "last"
    ? recentContributions
    : history?.filter((day) => day.date.startsWith(`${selectedYear}-`)) ?? null;
  const period = selectedYear === "last" ? "in the last 12 months" : `in ${selectedYear}`;
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

        {years.length > 0 && (
          <div
            ref={yearTabsRef}
            role="group"
            aria-label="Contribution year"
            className="relative mb-6 flex gap-1 overflow-x-auto border-b border-line pt-1"
          >
            {[...periods].reverse().map((year) => (
              <button
                key={year}
                type="button"
                aria-pressed={selectedYear === year}
                onClick={() => setSelectedYear(year)}
                className={`min-h-11 shrink-0 cursor-pointer border-b-2 px-3 font-mono text-xs transition-colors focus-visible:-outline-offset-4 ${
                  selectedYear === year
                    ? "border-brand bg-brand/10 text-ink"
                    : "border-transparent text-muted hover:border-line hover:bg-paper-deep hover:text-ink"
                }`}
              >
                {year === "last" ? "Last 12 months" : year}
              </button>
            ))}
          </div>
        )}

        {days ? (
          <>
            <div
              key={selectedYear}
              className="overflow-x-auto pb-2"
              tabIndex={0}
              role="region"
              aria-label={`Contribution calendar ${period}; scroll horizontally to explore`}
            >
              <Tooltip.Provider delayDuration={150}>
                <svg
                  viewBox={`0 0 ${weeks * 15 + 35} 128`}
                  className="w-full min-w-[760px]"
                  role="group"
                  aria-labelledby="contributions-title contributions-description"
                >
                  <title id="contributions-title">GitHub contributions {period}</title>
                  <desc id="contributions-description">
                    {total.toLocaleString("en-US")} contribution{total === 1 ? "" : "s"}. Each square represents a day;
                    darker amber indicates more contributions. Hover over or focus a square for its date and count.
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
                    <Tooltip.Root key={day.date}>
                      <Tooltip.Trigger asChild>
                        <rect
                          x={35 + day.week * 15}
                          y={20 + day.weekday * 15}
                          width={11}
                          height={11}
                          rx={2}
                          fill={colors[day.level]}
                          tabIndex={0}
                          role="img"
                          aria-label={day.label}
                          className="stroke-ink/5 hover:stroke-ink focus:stroke-ink"
                        />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          sideOffset={8}
                          collisionPadding={12}
                          className="z-50 max-w-[calc(100vw-24px)] rounded-sm bg-ink px-3 py-2 text-center text-xs text-paper shadow-md"
                        >
                          <p className="font-medium">
                            {day.count.toLocaleString("en-US")} contribution{day.count === 1 ? "" : "s"}
                          </p>
                          <p className="mt-1 font-mono text-[10px] text-paper/70">
                            {dateFormat.format(day.dateObject)}
                          </p>
                          <Tooltip.Arrow className="fill-ink" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  ))}
                </svg>
              </Tooltip.Provider>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
              <p>
                <span className="font-medium text-ink">{total.toLocaleString("en-US")} contribution{total === 1 ? "" : "s"}</span> {period}
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

        {years.length > 0 && (
          <nav aria-label="Contribution years" className="mt-8 flex items-center justify-between gap-2 border-t border-line pt-6">
            <button
              type="button"
              disabled={selectedIndex === periods.length - 1}
              onClick={() => setSelectedYear(periods[selectedIndex + 1])}
              className={yearButtonClass}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Previous
            </button>
            <span aria-live="polite" aria-atomic="true" className="text-center font-mono text-xs text-muted">
              {selectedYear === "last" ? "Last 12 months" : selectedYear}
            </span>
            <button
              type="button"
              disabled={selectedIndex === 0}
              onClick={() => setSelectedYear(periods[selectedIndex - 1])}
              className={yearButtonClass}
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
