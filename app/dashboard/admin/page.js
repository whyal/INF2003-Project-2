"use client";
import { useEffect, useState } from "react";

function DashboardPatientsPage() {
  const [appointments, setAppointments] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patient_id, setPatientId] = useState(0);
  const [doctor_id, setDoctorId] = useState(0);
  const [appointment_time, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [selectedAppointment, setSelectedAppointment] = useState(null); // Data for the selected appointment
  const [updatedReason, setUpdatedReason] = useState(""); // Updated name for the appointment
  useEffect(() => {
    const fetchAppt = async () => {
      try {
        const res = await fetch("/api/appointments/admins", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        setAppointments(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppt();
  }, []);

  // Function to handle creating of appointments
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/appointments/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "Create Appointment",
          patient_id,
          doctor_id,
          appointment_time,
          reason,
        }),
      });

      if (response.ok) {
        console.log("Appointment created successfully");
        const { insertedId } = await response.json();
        setAppointments((prevAppointments) => [
          ...prevAppointments,
          { patient_id, doctor_id, appointment_time, reason, _id: insertedId },
        ]);
      } else {
        console.error("Error creating appointment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deletion
  const handleDelete = async (e) => {
    const appointmentId = e.target.getAttribute("data-id");

    try {
      const response = await fetch("/api/appointments/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "Delete Appointment",
          appointmentId: appointmentId,
        }),
      });
      if (response.ok) {
        console.log("Appointment deleted successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else {
        console.error("Error deleting appointment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle update
  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/appointments/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "Update Appointment",
          appointmentId: selectedAppointment._id,
          updatedData: { name: updatedName },
        }),
      });

      if (response.ok) {
        // Update the local state
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === selectedAppointment._id
              ? { ...appointment, name: updatedName }
              : appointment
          )
        );

        handleCloseDialog(); // Close the dialog
      } else {
        console.error("Failed to update the appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Open the dialog
  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdatedReason(appointment.reason); // Pre-fill with the existing name
    setIsDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAppointment(null);
    setUpdatedReason("");
  };

  return (
    <>
      <div className="bg-white p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
        <h3>All Appointments</h3>
        <table className="w-100">
          <thead>
            <tr>
              <th scope="col">Patient ID</th>
              <th scope="col">Doctor ID</th>
              <th scope="col">Appointment Timing</th>
              <th scope="col">Reason for appointment</th>
              <th scope="col">Appointment ID</th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.length > 0 &&
              appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{appt.patient_id}</td>
                  <td>{appt.doctor_id}</td>
                  <td>{appt.appointment_time}</td>
                  <td>{appt.reason}</td>
                  <td>{appt._id}</td>
                  <td className="flex justify-between">
                    <button
                      onClick={handleDelete}
                      data-id={appt._id}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleOpenDialog(appt)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Update Dialog */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Update Appointment</h2>
            <label>
              Reason:
              <input
                type="text"
                value={updatedReason}
                onChange={(e) => setUpdatedReason(e.target.value)}
              />
            </label>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <form onSubmit={handleCreate}>
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
              type="datetime-local"
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
