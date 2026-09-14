import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const registrationSchema = z.object({
  eventSlug: z.string().trim().min(1).max(100),
  eventName: z.string().trim().min(1).max(150),
  teamName: z.string().trim().min(1, "Team name is required").max(100),
  college: z.string().trim().min(1, "College is required").max(200),
  members: z.string().trim().min(1, "List your team members").max(500),
  contactName: z.string().trim().min(1, "Contact person is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{7,15}$/, "Enter a valid phone number"),
});

export const submitRegistration = createServerFn({ method: "POST" })
  .validator((data) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
            h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { error } = await supabase.from("registrations").insert({
      event_slug: data.eventSlug,
      event_name: data.eventName,
      team_name: data.teamName,
      college: data.college,
      members: data.members,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone,
    });
    if (error) throw new Error("Could not save your registration. Please try again.");
    return { ok: true };
  });
