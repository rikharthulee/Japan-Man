export default function DestinationsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Tokyo</h1>
          <p className="mb-4">
            Welcome to our Japan destinations page. Here you’ll find travel
            guides, city highlights, and inspiration for your next trip.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Tokyo – modern metropolis and cultural hub</li>
            <li>Kyoto – temples, gardens, and tradition</li>
            <li>Osaka – street food and nightlife</li>
            <li>Hokkaido – mountains and snow festivals</li>
            <li>Okinawa – beaches and island vibes</li>
          </ul>
        </div>
        <div className="md:col-span-1">
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </div>
      </div>
    </main>
  );
}
