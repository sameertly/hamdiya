CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_slug TEXT NOT NULL,
  event_name TEXT NOT NULL,
  team_name TEXT NOT NULL,
  college TEXT NOT NULL,
  members TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.registrations TO anon;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register" ON public.registrations FOR INSERT TO anon WITH CHECK (true);