import clientPromise from "@/lib/db";

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("iclinicdb");
  const doctors = await db.collection("doctors").find().toArray();
  return new Response(JSON.stringify(doctors), { status: 200 });
}
