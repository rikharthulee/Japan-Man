const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getHeaders() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars"
    );
  }
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

async function supaFetch(pathWithQuery, { revalidate = 60, tags } = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${pathWithQuery}`;
  const next = { revalidate };
  if (Array.isArray(tags) && tags.length) next.tags = tags;
  const res = await fetch(url, {
    headers: getHeaders(),
    next,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function fetchLocations() {
  const query =
    "locations?select=slug,name,summary,hero_image,thumbnail_image,status&status=eq.published&order=name.asc";
  return supaFetch(query, { revalidate: 300, tags: ["locations"] });
}

export async function fetchLocationsBySlug(slug) {
  const query = `locations?slug=eq.${encodeURIComponent(
    slug
  )}&select=slug,name,summary,body_richtext,hero_image,thumbnail_image,status&limit=1`;
  const rows = await supaFetch(query, {
    revalidate: 300,
    tags: ["locations", `locations:${slug}`],
  });
  return rows?.[0] || null;
}

export async function fetchAccommodations() {
  const query =
    "accommodations?select=slug,name,summary,hero_image,status&status=eq.published&order=name.asc";
  return supaFetch(query, { revalidate: 900, tags: ["accommodations"] });
}

export async function fetchAccommodationBySlug(slug) {
  const query = `accommodations?slug=eq.${encodeURIComponent(
    slug
  )}&select=slug,name,summary,description,hero_image,status&limit=1`;
  const rows = await supaFetch(query, {
    revalidate: 900,
    tags: ["accommodations", `accommodation:${slug}`],
  });
  return rows?.[0] || null;
}
