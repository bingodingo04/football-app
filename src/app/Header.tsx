"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-orange-400 text-white flex justify-between items-center p-4 z-50">
      <h1 className="text-xl font-bold">⚽ Fotbollslaget</h1>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-4">
        <Link href="/" className="hover:underline">Matcher</Link>
        <Link href="/players" className="hover:underline">Spelare</Link>
        <Link href="/stats" className="hover:underline">Statistik</Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
      </nav>

      {/* Hamburger icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          {menuOpen ? (
            <path
              fillRule="evenodd"
              d="M18.3 5.7a1 1 0 00-1.4-1.4L12 9.17 7.1 4.3a1 1 0 00-1.4 1.4L10.83 12l-5.13 5.13a1 1 0 001.4 1.4L12 14.83l4.9 4.9a1 1 0 001.4-1.4L13.17 12l5.13-5.13z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-orange-300 text-white flex flex-col items-start px-4 py-4 space-y-2 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:underline w-full">Matcher</Link>
          <Link href="/players" onClick={() => setMenuOpen(false)} className="hover:underline w-full">Spelare</Link>
          <Link href="/stats" onClick={() => setMenuOpen(false)} className="hover:underline w-full">Statistik</Link>
          <Link href="/admin" onClick={() => setMenuOpen(false)} className="hover:underline w-full">Admin</Link>
        </nav>
      )}
    </header>
  );
}
