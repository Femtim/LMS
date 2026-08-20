create table if not exists public."user" (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  user_type text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public."user" enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."user" (id, full_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'User')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

 drop policy if exists "Users can insert their own profile" on public."user";
create policy "Users can insert their own profile"
on public."user"
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can view their own profile" on public."user";
create policy "Users can view their own profile"
on public."user"
for select
to authenticated
using (auth.uid() = id);
