import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import WeeklyWasteChart from './components/WeeklyWasteChart';
import WastePieChart from './components/WastePieChart';
import ClientDashboard from './components/ClientDashboard'; 


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <ClientDashboard userName={session.user?.name || "User"} />
  );
}
