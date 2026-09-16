CREATE TABLE public.results (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_slug text NOT NULL,
  event_name text NOT NULL,
  position text NOT NULL,
  team_name text NOT NULL,
  college text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.results TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.results TO authenticated;
GRANT ALL ON public.results TO service_role;

ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view results" ON public.results FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Organizers can add results" ON public.results FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Organizers can update results" ON public.results FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Organizers can delete results" ON public.results FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_results_updated_at BEFORE UPDATE ON public.results FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX results_event_slug_idx ON public.results (event_slug);