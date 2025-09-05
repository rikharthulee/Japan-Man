const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export function resolveImageUrl(path) {
  if (!path || typeof path !== "string") return null;
  if (/^https?:\/\//i.test(path)) return path;
  // Handle values stored as storage public path without domain
  if (path.startsWith("/storage/v1/object/public/")) {
    return SUPABASE_URL ? `${SUPABASE_URL}${path}` : path;
  }
  if (path.startsWith("storage/v1/object/public/")) {
    return SUPABASE_URL ? `${SUPABASE_URL}/${path}` : `/${path}`;
  }
  if (path.startsWith("/")) return path;
  if (SUPABASE_URL && SUPABASE_BUCKET) {
    return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`;
  }
  // As a last resort, treat as public/ relative path
  return `/${path}`;
}
