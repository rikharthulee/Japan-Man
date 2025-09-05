import LocationsManager from "@/components/admin/LocationsManager";

export const dynamic = "force-dynamic";

export default function AdminLocationsPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <LocationsManager />
    </main>
  );
}

