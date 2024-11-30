import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("iclinicdb");
      const appointments = await db.collection("appointments").find().toArray();
      return new Response(JSON.stringify(appointments), {
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

export async function POST(req) {
  const body = await req.json();
  const { action, ...data } = body;

  if (action === "Create Appointment") {
    const { patient_id, doctor_id, appointment_time, reason } = data;
    if (!patient_id || !doctor_id || !appointment_time || !reason) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    try {
      const client = await clientPromise;
      const db = client.db("iclinicdb");
      const result = await db.collection("appointments").insertOne(data);

      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to insert appointment" }),
        { status: 500 }
      );
    }
  } else if (action === "Delete Appointment") {
    const { appointmentId } = data;
    console.log(appointmentId);

    if (!appointmentId) {
      return new Response(JSON.stringify({ error: "Missing appointment_id" }), {
        status: 400,
      });
    }

    try {
      const client = await clientPromise;
      const db = client.db("iclinicdb");
      const result = await db
        .collection("appointments")
        .deleteOne({ _id: new ObjectId(appointmentId) });
      console.log(appointmentId);
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete appointment" }),
        { status: 500 }
      );
    }
  }
}
