"use client";
import { useEffect, useState } from "react";

function DashboardPatientsPage() {
  const [name, setName] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let doctorData = JSON.parse(window.sessionStorage.getItem("data"));
    setName(doctorData.FIRST_NAME);

    const data = async () => {
      try {
        const res = await fetch("/api/appointments/doctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: doctorData.DOCTOR_ID }),
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setAppointments(result);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);

  return (
    <>
      <div className="bg-white p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold">Welcome Dr. {name && name}</h2>
        <h3>Your Appointments</h3>
        <table className="w-100">
          <thead>
            <tr>
              <th scope="col">Appointment ID</th>
              <th scope="col">Appointment Timing</th>
              <th scope="col">Reason for appointment</th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.map((apt) => (
                <tr>
                  <td>{apt.APPOINTMENT_ID}</td>
                  <td>{apt.APPOINTMENT_TIMING}</td>
                  <td>{apt.REASON_FOR_VISIT}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardPatientsPage;
