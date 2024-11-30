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
          updatedData: selectedAppointment,
        }),
      });

      if (response.ok) {
        // Update the local state
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === selectedAppointment._id
              ? selectedAppointment
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

  const handleChange = (e) => {
    setSelectedAppointment({
      ...selectedAppointment,
      [e.target.name]: e.target.value,
    });
  };

  // Open the dialog
  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    //setUpdatedAppointment(appointment); // Pre-fill with the existing name
    setIsDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAppointment(null);
    //setUpdatedReason("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold my-12">Welcome back, Admin!</h2>
      <div className="m-auto w-[95%] rounded-sm border border-gray-200 rounded-lg shadow-lg py-12 px-24 mb-12">
        <form onSubmit={handleCreate}>
          <h3 className="text-center font-bold text-4xl mt-4 mb-8">
            Add Appointments
          </h3>
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
              Appointment Date Time:
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
      <div className="w-full">
        <div className="bg-white p-6 w-full">
          <h3 className="text-center font-bold text-4xl mb-8">
            All Appointments
          </h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b"
                  scope="col"
                >
                  Patient ID
                </th>
                <th
                  className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b"
                  scope="col"
                >
                  Doctor ID
                </th>
                <th
                  className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b"
                  scope="col"
                >
                  Appointment Timing
                </th>
                <th
                  className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b"
                  scope="col"
                >
                  Reason for appointment
                </th>
                <th
                  className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b"
                  scope="col"
                >
                  Appointment ID
                </th>
                <th
                  className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b"
                  scope="col"
                ></th>
              </tr>
            </thead>
            <tbody>
              {appointments &&
                appointments.length > 0 &&
                appointments.map((appt) => (
                  <tr
                    className="hover:bg-gray-100 transition duration-200"
                    key={appt._id}
                  >
                    <td className="py-2 px-4 border-b text-gray-700">
                      {appt.patient_id}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {appt.doctor_id}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {appt.appointment_time}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {appt.reason}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {appt._id}
                    </td>
                    <td className="flex justify-between py-2 px-4 border-b text-gray-700">
                      <button
                        onClick={() => handleOpenDialog(appt)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        data-id={appt._id}
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
      </div>

      {/* Update Dialog */}
      {isDialogOpen && (
        <div className="fixed w-full h-full flex flex-col items-center justify-center top-0 left-0 bg-[#00000080]">
          <div className="bg-white p-[20px] w-[300px] rounded-lg">
            <h2>Update Appointment</h2>
            <label>
              Patient ID:
              <input
                type="text"
                name="patient_id"
                value={selectedAppointment.patient_id}
                onChange={handleChange}
              />
            </label>
            <label>
              Doctor ID:
              <input
                type="text"
                name="doctor_id"
                value={selectedAppointment.doctor_id}
                onChange={handleChange}
              />
            </label>
            <label>
              Appointment Time:
              <input
                type="text"
                name="appointment_time"
                value={selectedAppointment.appointment_time}
                onChange={handleChange}
              />
            </label>
            <label>
              Reason:
              <input
                type="text"
                name="reason"
                value={selectedAppointment.reason}
                onChange={handleChange}
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
    </>
  );
}

export default DashboardPatientsPage;
