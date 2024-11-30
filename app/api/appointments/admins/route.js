import { connectToDatabase } from "../../../../lib/db";

export async function GET(req, res) {
  if (req.method === "GET") {
    try {
      const connection = await connectToDatabase();
      const [rows] = await connection.execute("SELECT * FROM Appointments;");
      await connection.end();
      return new Response(JSON.stringify(rows), {
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
  //console.log(body);

  //const { patient_id, doctor_id, appointment_time, reason } = body;

  if (action === "createAppointment") {
    const { patient_id, doctor_id, appointment_time, reason } = data;
    if (!patient_id || !doctor_id || !appointment_time || !reason) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const query = `INSERT INTO Appointments (PATIENT_ID, DOCTOR_ID, APPOINTMENT_TIMING, REASON_FOR_VISIT) VALUES (?, ?, ?, ?)`;
    const values = [patient_id, doctor_id, appointment_time, reason];

    try {
      const connection = await connectToDatabase();
      const [result] = await connection.execute(query, values);
      await connection.end();
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
  } else if (action === "deleteAppointment") {
    const { selectedAppointmentId } = data;
    console.log("Appt ID", data);
    if (!selectedAppointmentId) {
      return new Response(JSON.stringify({ error: "Missing appointment_id" }), {
        status: 400,
      });
    }

    const query = "DELETE FROM Appointments WHERE APPOINTMENT_ID = ?;";
    const values = [selectedAppointmentId];

    const connection = await connectToDatabase();
    const [result] = await connection.execute(query, values);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  }
}
