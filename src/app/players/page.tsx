"use client";

import { useState, useEffect } from "react";

type Player = {
  _id: string;
  name: string;
  position: string;
};

type Match = {
  participants: string[];
  goals: {
    playerId: string;
    assistBy?: string;
  }[];
  mvp?: string;
};

type PlayerStat = {
  name: string;
  position: string;
  played: number;
  goals: number;
  goalsPerMatch: string;
  assists: number;
  assistsPerMatch: string;
  mvps: number;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [sortKey, setSortKey] = useState<keyof PlayerStat>("name");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    async function getData() {
      const [playersRes, matchesRes] = await Promise.all([
        fetch("/api/players"),
        fetch("/api/matches"),
      ]);

      const players: Player[] = await playersRes.json();
      const matches: Match[] = await matchesRes.json();

      setPlayers(players);
      setMatches(matches);
    }

    getData();
  }, []);

  const stats: PlayerStat[] = players.map((player) => {
    let played = 0;
    let goals = 0;
    let assists = 0;
    let mvps = 0;

    matches.forEach((match) => {
      if (match.participants?.includes(player._id)) {
        played++;
      }

      goals += match.goals?.filter((g) => g.playerId === player._id).length || 0;

      assists += match.goals?.filter((g) => g.assistBy === player._id).length || 0;

      if (match.mvp === player._id) {
        mvps++;
      }
    });

    const goalsPerMatch = played ? (goals / played).toFixed(2) : "0.00";
    const assistsPerMatch = played ? (assists / played).toFixed(2) : "0.00";

    return {
      name: player.name,
      position: player.position,
      played,
      goals,
      goalsPerMatch,
      assists,
      assistsPerMatch,
      mvps,
    };
  });

  const sortedStats = [...stats].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortAsc
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortAsc ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  function handleSort(key: keyof PlayerStat) {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6">📊 Spelarstatistik</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-orange-400 text-white uppercase">
            <tr>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Namn {sortKey === "name" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th className="p-4">Position</th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("played")}
              >
                Matcher {sortKey === "played" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("goals")}
              >
                Mål {sortKey === "goals" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th className="p-4 text-center">Mål/Match</th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("assists")}
              >
                Assister {sortKey === "assists" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th className="p-4 text-center">Assister/Match</th>
              <th
                className="p-4 cursor-pointer text-center"
                onClick={() => handleSort("mvps")}
              >
                MVP {sortKey === "mvps" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedStats.map((s, idx) => (
              <tr
                key={s.name}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 text-center`}
              >
                <td className="p-4 text-left font-medium">{s.name}</td>
                <td className="p-4 text-left">{s.position}</td>
                <td className="p-4">{s.played}</td>
                <td className="p-4">{s.goals}</td>
                <td className="p-4">{s.goalsPerMatch}</td>
                <td className="p-4">{s.assists}</td>
                <td className="p-4">{s.assistsPerMatch}</td>
                <td className="p-4">{s.mvps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
