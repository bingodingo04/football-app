import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="max-w-md mx-auto p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">🔒 Endast admin</h2>
        <Link
          href="/login"
          className="inline-block bg-blue-700 text-white px-4 py-2 rounded"
        >
          Logga in
        </Link>
      </section>
    );
  }

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <p>Du är inloggad som admin!</p>
      {/* Lägg här hela din admin-formulär som du redan har! */}
    </section>
  );
}
