import AccommodationsManager from "@/components/admin/AccommodationManager";

export const dynamic = "force-dynamic";

export default function AdminAccommodationPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <AccommodationsManager />
    </main>
  );
}
