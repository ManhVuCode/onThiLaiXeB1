-- Schema for "Phần mềm thi thử lái xe B1"
-- Paste this whole file into Supabase Dashboard -> SQL Editor -> New query -> Run.

-- ─── profiles ────────────────────────────────────────────────────────────────
-- One row per auth user. Created automatically on sign-up via trigger below.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  daily_goal integer not null default 20,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created
-- (covers email/password sign-up and anonymous sign-in alike).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, daily_goal)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      nullif(split_part(new.email, '@', 1), ''),
      'Học viên Demo'
    ),
    20
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── topic_progress ──────────────────────────────────────────────────────────
-- One row per (user, topic). topic_id matches the static TOPICS list in
-- src/app/data/questions.ts (1-6) — topics themselves are not stored in the DB.
create table if not exists public.topic_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id integer not null,
  practiced integer not null default 0,
  correct integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

alter table public.topic_progress enable row level security;

create policy "Users can view own topic progress"
  on public.topic_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own topic progress"
  on public.topic_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own topic progress"
  on public.topic_progress for update
  using (auth.uid() = user_id);

-- ─── exam_history ────────────────────────────────────────────────────────────
create table if not exists public.exam_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score integer not null,
  total integer not null,
  passed boolean not null,
  taken_at timestamptz not null default now()
);

alter table public.exam_history enable row level security;

create policy "Users can view own exam history"
  on public.exam_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own exam history"
  on public.exam_history for insert
  with check (auth.uid() = user_id);

create index if not exists exam_history_user_taken_at_idx
  on public.exam_history (user_id, taken_at desc);
