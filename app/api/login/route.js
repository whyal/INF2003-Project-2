import { connectToDatabase } from "../../utils/db";

export async function POST(request) {
  const body = await request.json();
  const { email, password, role } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password required" }),
      {
        status: 400,
      }
    );
  }

  try {
    let query = "";
    if (role == "Patients") {
      query = "SELECT * FROM Patients WHERE email = ? AND password = ?;";
    } else if (role == "Doctors") {
      query = "SELECT * FROM Doctors WHERE email = ? AND password = ?;";
    } else {
      query = "SELECT * FROM Admins WHERE email = ? AND password = ?;";
    }

    const connection = await connectToDatabase();
    const [rows] = await connection.execute(query, [email, password]);

    await connection.end();

    if (rows.length > 0) {
      return new Response(
        JSON.stringify({ message: "Login successful", rows }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Database error", error }), {
      status: 500,
    });
  }
}
