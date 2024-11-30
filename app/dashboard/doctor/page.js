import DoctorDashboardClient from "@/app/components/DoctorDashboardClient";
import { cookies } from "next/headers";

function DashboardPatientsPage() {
  const cookieStore = cookies();
  const email = cookieStore.get("email")?.value || null;

  if (!email) {
    return <div>You must be logged in to access this page.</div>;
  }

  return <DoctorDashboardClient email={email} />;
}

export default DashboardPatientsPage;
