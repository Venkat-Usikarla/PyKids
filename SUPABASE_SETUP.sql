-- ============================================================
-- PyKids — Supabase Setup SQL
-- Run this entire file in Supabase SQL Editor once
-- ============================================================

-- 1. PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text,
  is_paid boolean default false,
  is_admin boolean default false,
  xp integer default 0,
  created_at timestamp with time zone default now()
);

-- 2. LESSON PROGRESS
create table if not exists progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  lesson_id text not null,
  completed_at timestamp with time zone default now(),
  unique(user_id, lesson_id)
);

-- 3. QUIZ RESULTS
create table if not exists quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  quiz_id text not null,
  score integer not null,
  total integer not null,
  completed_at timestamp with time zone default now(),
  unique(user_id, quiz_id)
);

-- 4. ARENA SOLVES
create table if not exists arena_solves (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  problem_id text not null,
  solved_at timestamp with time zone default now(),
  unique(user_id, problem_id)
);

-- 5. ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table progress enable row level security;
alter table quiz_results enable row level security;
alter table arena_solves enable row level security;

-- Helper: is current user admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and is_admin = true
  );
$$ language sql security definer;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id or is_admin());
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Admins can update any profile"
  on profiles for update using (is_admin());

-- Progress policies
create policy "Users can view own progress"
  on progress for select using (auth.uid() = user_id or is_admin());
create policy "Users can insert own progress"
  on progress for insert with check (auth.uid() = user_id);

-- Quiz policies
create policy "Users can view own quiz results"
  on quiz_results for select using (auth.uid() = user_id or is_admin());
create policy "Users can insert own quiz results"
  on quiz_results for insert with check (auth.uid() = user_id);
create policy "Users can update own quiz results"
  on quiz_results for update using (auth.uid() = user_id);

-- Arena policies
create policy "Users can view own arena solves"
  on arena_solves for select using (auth.uid() = user_id or is_admin());
create policy "Users can insert own arena solves"
  on arena_solves for insert with check (auth.uid() = user_id);
create policy "Users can upsert own arena solves"
  on arena_solves for update using (auth.uid() = user_id);

-- 6. ADD_XP FUNCTION
create or replace function add_xp(user_id uuid, amount integer)
returns void as $$
begin
  update profiles set xp = xp + amount where id = user_id;
end;
$$ language plpgsql security definer;

-- ============================================================
-- ONE-TIME: Make yourself admin after creating your account
-- Replace with your actual email, then run just these lines:
--
-- update profiles
-- set is_admin = true
-- where id = (select id from auth.users where email = 'you@gmail.com');
-- ============================================================
