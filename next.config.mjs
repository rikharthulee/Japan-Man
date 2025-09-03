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
    remotePatterns,
  },
};

export default nextConfig;
