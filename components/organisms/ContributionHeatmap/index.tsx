import ContributionCalendar, { type Contribution } from "./ContributionCalendar";

async function fetchContributions(period: "last" | "all"): Promise<Contribution[] | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/BosEriko?y=${period}`,
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
          day.level <= 4,
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
  const [recentContributions, history] = await Promise.all([
    fetchContributions("last"),
    fetchContributions("all"),
  ]);

  return <ContributionCalendar recentContributions={recentContributions} history={history} />;
}
