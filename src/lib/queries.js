// lib/queries.ts
import { supabaseServer } from "@/lib/supabase/server";

export async function getDestination(slug) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}
