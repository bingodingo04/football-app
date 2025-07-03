import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const client = await clientPromise;
  const db = client.db("football-app");

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const match = await db.collection("matches").findOne({ _id: new ObjectId(id) });
    return NextResponse.json(match);
  }

  const matches = await db.collection("matches").find({}).toArray();
  return NextResponse.json(matches);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("football-app");
  const body = await req.json();
  const result = await db.collection("matches").insertOne(body);
  return NextResponse.json(result, { status: 201 });
}
