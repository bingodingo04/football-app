import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Football App",
  description: "Håll koll på matcher och statistik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <main className="p-8 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
