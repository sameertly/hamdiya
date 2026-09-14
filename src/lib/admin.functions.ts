import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type RegistrationDTO = {
  id: string;
  createdAt: string;
  eventSlug: string;
  eventName: string;
  teamName: string;
  college: string;
  members: string;
  contactName: string;
  email: string;
  phone: string;
};

export const getRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<RegistrationDTO[]> => {
    // Owner-read policy on user_roles lets a user see only their own rows.
    const { data: roles } = await context.supabase
      .from("user_roles" as unknown as "registrations")
      .select("role" as unknown as "event_slug")
      .eq("user_id", context.userId);
    const isAdmin = ((roles ?? []) as unknown as { role: string }[]).some(
      (r) => r.role === "admin"
    );
    if (!isAdmin) throw new Error("Only organizers can view registrations.");

    const { data, error } = await context.supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error("Could not load registrations. Please try again.");

    return (data ?? []).map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      eventSlug: row.event_slug,
      eventName: row.event_name,
      teamName: row.team_name,
      college: row.college,
      members: row.members,
      contactName: row.contact_name,
      email: row.email,
      phone: row.phone,
    }));
  });
