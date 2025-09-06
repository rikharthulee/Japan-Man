import { redirect } from "next/navigation";

export default function LegacyAdminAccommodationsRedirect() {
  // Preserve deep links by redirecting to the new admin section
  redirect("/admin/accommodation");
}

