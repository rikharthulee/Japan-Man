/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let remotePatterns = [];
try {
  if (supabaseUrl) {
    const host = new URL(supabaseUrl).hostname;
    remotePatterns.push({
      protocol: 'https',
      hostname: host,
      pathname: '/storage/v1/object/public/**',
    });
  }
} catch {}

const nextConfig = {
  images: {
    remotePatterns: [
      ...remotePatterns,
      // Allow placeholder images used in seed data
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default nextConfig;
