"use client";

import { useState, useEffect } from "react";

export default function PatientDashboardClient({ email }) {
  const [appointments, setAppointments] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/appointments/patients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
          }),
        });
        if (response.ok) {
          console.log("Successfully fetched appointments!");
          const result = await response.json();
          setAppointments(result);
        } else {
          console.log("No response");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold my-12">Welcome back, Patient!</h2>
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
