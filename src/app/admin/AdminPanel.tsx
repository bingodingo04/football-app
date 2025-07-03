"use client";

import { useState, useEffect } from "react";

// 📌 Typer
type Goal = {
  playerId: string;
  assistBy: string;
};

type Player = {
  _id: string;
  name: string;
  position: string;
};

export default function AdminPanel() {
  const [date, setDate] = useState("");
  const [opponent, setOpponent] = useState("");
  const [result, setResult] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [mvp, setMvp] = useState("");

  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const res = await fetch("/api/players");
    const data: Player[] = await res.json();
    setPlayers(data);
  }

  function toggleParticipant(id: string) {
    if (participants.includes(id)) {
      setParticipants(participants.filter((pid) => pid !== id));
    } else {
      setParticipants([...participants, id]);
    }
  }

  function addGoal() {
    setGoals([...goals, { playerId: "", assistBy: "" }]);
  }

  function updateGoal(index: number, field: keyof Goal, value: string) {
    const updated = [...goals];
    updated[index][field] = value;
    setGoals(updated);
  }

  async function handleAddMatch() {
    await fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        opponent,
        result,
        participants,
        goals,
        mvp,
      }),
    });
    alert("Match tillagd!");
    setDate("");
    setOpponent("");
    setResult("");
    setParticipants([]);
    setGoals([]);
    setMvp("");
  }

  async function handleAddPlayer() {
    await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playerName, position: playerPosition }),
    });
    alert("Spelare tillagd!");
    setPlayerName("");
    setPlayerPosition("");
    await fetchPlayers();
  }

  return (
    <section className="space-y-12 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">✅ Adminpanel</h1>
      
      {/* 📌 Match-form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Lägg till match</h2>
        <input
          placeholder="Datum"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Motståndare"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Resultat"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold">Vilka spelade?</h3>
          {players.map((p) => (
            <label key={p._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={participants.includes(p._id)}
                onChange={() => toggleParticipant(p._id)}
              />
              {p.name} ({p.position})
            </label>
          ))}
        </div>

        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold">Mål:</h3>
          {goals.map((goal, index) => (
            <div key={index} className="flex gap-2">
              <select
                value={goal.playerId}
                onChange={(e) => updateGoal(index, "playerId", e.target.value)}
                className="border p-2"
              >
                <option value="">Välj målskytt</option>
                {players.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                value={goal.assistBy}
                onChange={(e) => updateGoal(index, "assistBy", e.target.value)}
                className="border p-2"
              >
                <option value="">Välj assist (frivillig)</option>
                {players.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={addGoal}
            className="bg-green-700 text-white px-2 py-1 rounded"
          >
            Lägg till mål
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold">Välj MVP</h3>
          <select
            value={mvp}
            onChange={(e) => setMvp(e.target.value)}
            className="border p-2"
          >
            <option value="">Välj MVP</option>
            {players.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddMatch}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Spara match
        </button>
      </div>

      {/* 📌 Spelare-form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Lägg till spelare</h2>
        <input
          placeholder="Namn"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Position"
          value={playerPosition}
          onChange={(e) => setPlayerPosition(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleAddPlayer}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Lägg till spelare
        </button>
      </div>
    </section>
  );
}
