import Link from "next/link";

type Goal = {
  playerId: string;
  assistBy?: string;
};

type Match = {
  _id: string;
  date: string;
  opponent: string;
  result: string;
  goals: Goal[];
  mvp?: string;
  participants: string[];
};

type Player = {
  _id: string;
  name: string;
  position: string;
};

async function getMatch(id: string): Promise<Match> {
  const res = await fetch(`http://localhost:3000/api/matches?id=${id}`, {
    cache: "no-store",
  });
  return res.json();
}

async function getPlayers(): Promise<Player[]> {
  const res = await fetch("http://localhost:3000/api/players", {
    cache: "no-store",
  });
  return res.json();
}

export default async function MatchDetail({ params }: { params: { id: string } }) {
  const match = await getMatch(params.id);
  const players = await getPlayers();

  function getPlayerName(id: string) {
    return players.find((p) => p._id === id)?.name || "Okänd";
  }

  const goalsPerPlayer: Record<string, number> = {};
  match.goals.forEach((g) => {
    goalsPerPlayer[g.playerId] = (goalsPerPlayer[g.playerId] || 0) + 1;
  });

  const assistsPerPlayer: Record<string, number> = {};
  match.goals.forEach((g) => {
    if (g.assistBy) {
      assistsPerPlayer[g.assistBy] = (assistsPerPlayer[g.assistBy] || 0) + 1;
    }
  });

  return (
    <section className="space-y-6">
      <Link href="/" className="text-blue-600 underline">
        ← Tillbaka till matcher
      </Link>

      <h2 className="text-2xl font-bold">
        📅 {match.date} – {match.opponent}
      </h2>

      <p className="text-lg">
        Resultat: <strong>{match.result}</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mål */}
        <div>
          <h3 className="text-xl font-semibold mb-2">⚽ Mål</h3>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Spelare</th>
                <th className="px-4 py-2 text-left">Antal mål</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(goalsPerPlayer).length > 0 ? (
                Object.entries(goalsPerPlayer).map(([playerId, count]) => (
                  <tr key={playerId} className="border-t border-gray-200">
                    <td className="px-4 py-2">{getPlayerName(playerId)}</td>
                    <td className="px-4 py-2">{count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan={2}>
                    Inga mål registrerade.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Assister */}
        <div>
          <h3 className="text-xl font-semibold mb-2">🎯 Assister</h3>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Spelare</th>
                <th className="px-4 py-2 text-left">Antal assist</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(assistsPerPlayer).length > 0 ? (
                Object.entries(assistsPerPlayer).map(([playerId, count]) => (
                  <tr key={playerId} className="border-t border-gray-200">
                    <td className="px-4 py-2">{getPlayerName(playerId)}</td>
                    <td className="px-4 py-2">{count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan={2}>
                    Inga assister registrerade.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {match.mvp && (
        <p className="text-lg font-semibold">
          ⭐ MVP: {getPlayerName(match.mvp)}
        </p>
      )}
    </section>
  );
}
