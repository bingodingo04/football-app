import Link from "next/link";

export const dynamic = "force-dynamic";

type Match = {
  _id: string;
  date: string;
  opponent: string;
  result: string; // format: "2-1"
};

async function getMatches(): Promise<Match[]> {
  const res = await fetch("/api/matches", {
  cache: "no-store",
});
return res.json();
}

function getResultInfo(result: string) {
  const [home, away] = result.split("-").map(Number);
  if (home > away) return { text: "Vinst", color: "text-green-700", icon: "✅" };
  if (home < away) return { text: "Förlust", color: "text-red-700", icon: "❌" };
  return { text: "Oavgjort", color: "text-gray-600", icon: "🤝" };
}

export default async function HomePage() {
  const matches = await getMatches();

  const sortedMatches = [...matches].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold">📅 Matcher</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMatches.map((m) => {
          const resultInfo = getResultInfo(m.result);

          return (
            <Link
              key={m._id}
              href={`/matches/${m._id}`}
              className="block border border-gray-300 rounded-lg p-6 bg-white shadow hover:shadow-md hover:border-blue-600 transition"
            >
              <p className="text-sm text-gray-500 mb-2">{m.date}</p>
              <h3 className="text-xl font-semibold mb-1">{m.opponent}</h3>
              <p className={`text-lg font-bold flex items-center gap-2 ${resultInfo.color}`}>
                <span>{resultInfo.icon}</span>
                {m.result} ({resultInfo.text})
              </p>
              <span className="inline-block mt-4 text-blue-600 hover:underline">
                Visa detaljer →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
