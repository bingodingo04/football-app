import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="max-w-md mx-auto p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">🔒 Endast admin</h2>
        <p>Du måste logga in för att använda adminpanelen.</p>
        <a
          href="/api/auth/signin"
          className="inline-block bg-blue-700 text-white px-4 py-2 rounded"
        >
          Logga in
        </a>
      </section>
    );
  }

  return <AdminPanel />;
}
