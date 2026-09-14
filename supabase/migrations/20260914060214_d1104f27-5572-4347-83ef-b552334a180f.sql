create schema if not exists private;

revoke all on schema private from anon, authenticated;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

drop policy "Organizers can view all registrations" on public.registrations;

drop function public.has_role(uuid, app_role);

create policy "Organizers can view all registrations"
  on public.registrations for select
  to authenticated
  using (private.has_role(auth.uid(), 'admin'));

grant execute on function private.has_role(uuid, app_role) to service_role;