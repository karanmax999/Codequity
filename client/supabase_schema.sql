-- CodeQuity V2 Data Schema
-- This schema maps to the static data structures currently used in the frontend.

-- 1. Applications (Linked to Apply Page)
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  team_name text not null,
  lead_name text not null,
  email text not null,
  github_url text,
  project_name text,
  category text, -- 'defi', 'infra', 'gaming', etc.
  stage text, -- 'idea', 'mvp', 'testnet'
  description text,
  video_url text,
  motivation text,
  status text default 'pending' -- 'pending', 'reviewing', 'accepted', 'rejected'
);

-- 2. Projects (Linked to Portfolio Page)
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  tagline text,
  description text,
  image_url text, -- Logo/Banner
  tags text[], -- ['DeFi', 'Polygon', 'Cohort 1']
  website_url text,
  twitter_url text,
  cohort_id text, -- 'c1', 'c2'
  status text -- 'live', 'acquired', 'building'
);

-- 3. Partners (Linked to Partners Page)
create table public.partners (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text, -- 'ecosystem', 'infra', 'vc', 'community'
  logo_url text,
  website_url text,
  perk_title text, -- '50k credits'
  perk_description text,
  is_active boolean default true
);
