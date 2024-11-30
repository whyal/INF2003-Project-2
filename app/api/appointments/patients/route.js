import clientPromise from "@/lib/db";

export async function POST(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { email } = body;
      console.log(email);
      const client = await clientPromise;
      const db = client.db("iclinicdb");
      const result = await db
        .collection("appointments")
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "patient_id",
              foreignField: "patient_id",
              as: "patientAppt",
            },
          },
          { $unwind: "$patientAppt" },
          { $match: { patientAppt: { $exists: true } } },
        ])
        .toArray();
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "Database error", error: error.message }),
        {
          status: 500,
        }
      );
    }
  } else {
    res.status(405).end();
  }
}
