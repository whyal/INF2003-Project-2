import PatientDashboardClient from "@/app/components/PatientDashboardClient";
import { cookies } from "next/headers";

function DashboardPatientsPage() {
  const cookieStore = cookies();
  const email = cookieStore.get("email")?.value || null;

  if (!email) {
    return <div>You must be logged in to access this page.</div>;
  }

  return <PatientDashboardClient email={email} />;
}

export default DashboardPatientsPage;
