import { supabase } from "@/integrations/supabase/client";

export type ResultRow = {
  id: string;
  event_slug: string;
  event_name: string;
  position: string;
  team_name: string;
  college: string;
  note: string;
  sort_order: number;
  created_at: string;
};

export async function fetchResults(): Promise<ResultRow[]> {
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error("Could not load results. Please try again.");
  return (data ?? []) as ResultRow[];
}

export const POSITIONS = [
  "Winner",
  "Runner-up",
  "Second Runner-up",
  "Special Mention",
] as const;
