export const dynamic = "force-dynamic";

// 📌 Typ för match
type Match = {
  _id: string;
  date: string;
  opponent: string;
  result: string; // t.ex. "2-1"
};

async function getMatches(): Promise<Match[]> {
  const res = await fetch("/api/matches", { cache: "no-store" });
  return res.json();
}

export default async function StatsPage() {
  const matches = await getMatches();

  const total = matches.length;

  const wins = matches.filter((m) => {
    const [home, away] = m.result.split("-");
    return parseInt(home) > parseInt(away);
  }).length;

  const draws = matches.filter((m) => {
    const [home, away] = m.result.split("-");
    return parseInt(home) === parseInt(away);
  }).length;

  const losses = total - wins - draws;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">📊 Statistik</h2>
      <ul className="space-y-2">
        <li>Totalt antal matcher: {total}</li>
        <li>Vinster: {wins}</li>
        <li>Oavgjorda: {draws}</li>
        <li>Förluster: {losses}</li>
      </ul>
    </section>
  );
}
