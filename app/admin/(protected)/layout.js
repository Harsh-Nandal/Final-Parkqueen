import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return <AdminShell admin={session}>{children}</AdminShell>;
}
