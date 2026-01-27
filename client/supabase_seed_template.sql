-- TEMPLATE: Mock Data for CodeQuity Dynamic Content
-- Paste this into Supabase SQL Editor to see the system in action.

-- 1. Add Featured Direct Items (External/General)
insert into public.featured_content (title, description, tags, link, priority)
values (
  'Privacy trends for 2026',
  'Why privacy, where, and how -- on moats and messaging to data and security testing',
  array['tech trends', 'privacy'],
  'https://a16zcrypto.com',
  10
);

-- 2. Add an Upcoming Blog Transmission (Scheduled)
insert into public.blogs (title, slug, excerpt, content, status, published_at, tags, is_featured)
values (
  'The Epoch of Foundries: Cohort 3 Incoming',
  'cohort-3-incoming',
  'A strategic look into the next evolution of the CodeQuity startup engine.',
  '## The Next Phase\n\nWe are preparing for the largest deployment of student-led on-chain businesses in India.\n\n### What to expect:\n- Direct VC pipelines\n- Technical forges\n- Ecosystem grants',
  'published',
  now() + interval '5 days', -- Shows in "Upcoming"
  array['announcement', 'cohort-3'],
  true -- Also shows in "Featured" section on Home page
);

-- 3. Add an Archived Blog Log (Historical)
insert into public.blogs (title, slug, excerpt, content, status, published_at, tags)
values (
  'Reflections on Cohort 1',
  'reflections-cohort-1',
  'Lessons learned from our first 8 student-led products.',
  'Looking back at the genesis of the guild...',
  'published',
  now() - interval '10 days', -- Shows in "Archived"
  array['history', 'recap']
);

-- 4. Add a Draft (Hidden)
insert into public.blogs (title, slug, excerpt, content, status)
values (
  'SECRET PROJECT ALPHA',
  'secret-alpha',
  'This should not be visible anywhere.',
  'Top secret content.',
  'draft'
);
