"use client";
import { useEffect, useState } from "react";

function DashboardPatientsPage() {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [name, setName] = useState("");
  const [appointments, setAppointments] = useState([]);

  const [patient_id, setPatientId] = useState(0);
  const [doctor_id, setDoctorId] = useState(0);
  const [appointment_time, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    let adminData = JSON.parse(window.sessionStorage.getItem("data"));
    setName(adminData.FIRST_NAME);

    const fetchAppt = async () => {
      try {
        const res = await fetch("/api/appointments/admins", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        console.log(res);
        setAppointments(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppt();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/appointments/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createAppointment",
          patient_id,
          doctor_id,
          appointment_time,
          reason,
        }),
      });

      if (response.ok) {
        console.log("Appointment created successfully");
      } else {
        console.error("Error creating appointment");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (e) => {
    const appointmentId = e.target.getAttribute("data-id");
    setSelectedAppointmentId(appointmentId);

    await fetch("/api/appointments/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "deleteAppointment",
        selectedAppointmentId,
      }),
    });
  };

  return (
    <>
      <div className="bg-white p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold">Welcome {name && name}</h2>
        <h3>All Appointments</h3>
        <table className="w-100">
          <thead>
            <tr>
              <th scope="col">Appointment ID</th>
              <th scope="col">Patient ID</th>
              <th scope="col">Doctor ID</th>
              <th scope="col">Appointment Timing</th>
              <th scope="col">Reason for appointment</th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.length > 0 &&
              appointments.map((apt) => (
                <tr key={apt.APPOINTMENT_ID}>
                  <td>{apt.APPOINTMENT_ID}</td>
                  <td>{apt.PATIENT_ID}</td>
                  <td>{apt.DOCTOR_ID}</td>
                  <td>{apt.APPOINTMENT_TIMING}</td>
                  <td>{apt.REASON_FOR_VISIT}</td>
                  <td>
                    <button
                      onClick={handleDelete}
                      data-id={apt.APPOINTMENT_ID}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Patient ID:
            </label>
            <input
              type="number"
              className="w-full border rounded-md px-4 py-2"
              value={patient_id}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Doctor ID:
            </label>
            <input
              type="number"
              className="w-full border rounded-md px-4 py-2"
              value={doctor_id}
              onChange={(e) => setDoctorId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Appointment Time:
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
              value={appointment_time}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Reason:
            </label>
            <textarea
              className="w-full border rounded-md px-4 py-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>{" "}
           
        </form>
      </div>
    </>
  );
}

export default DashboardPatientsPage;
