import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("football-app");
  const players = await db.collection("players").find({}).toArray();
  return NextResponse.json(players);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("football-app");
  const body = await req.json();
  const result = await db.collection("players").insertOne(body);
  return NextResponse.json(result, { status: 201 });
}
