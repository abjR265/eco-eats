import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


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
