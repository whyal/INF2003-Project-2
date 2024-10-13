import { connectToDatabase } from "../../../utils/db";

export async function POST(request) {
  const body = await request.json();

  const { id } = body;
  try {
    let query = "SELECT * FROM Appointments WHERE DOCTOR_ID = ?;";

    const connection = await connectToDatabase();
    const [rows] = await connection.execute(query, [id]);
    await connection.end();

    return new Response(JSON.stringify(rows), {
      status: 200,
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Database error", error: error.message }),
      {
        status: 500,
      }
    );
  }
}
