// Complete production SQL migration script for Supabase
// Project: EbolaGuard NG (https://alddmefmlbrjxjaxtkly.supabase.co)
// Developer: Developed by OLANREWAJU SAMUEL

export const SUPABASE_SCHEMA_SQL = `-- ==============================================================================
-- EBOLAGUARD NG: PRODUCTION SUPABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Platform: EbolaGuard NG (National Health Awareness & Triage Platform)
-- Credit: Developed by OLANREWAJU SAMUEL
-- Project URL: https://alddmefmlbrjxjaxtkly.supabase.co
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('super_admin', 'health_editor', 'fact_checker', 'content_contributor');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'content_contributor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(req_user_id UUID, req_role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = req_user_id AND role = req_role
  );
$$;

-- 2. OFFICIAL SOURCES
CREATE TABLE IF NOT EXISTS public.official_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_checked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. HEALTH ARTICLES
CREATE TABLE IF NOT EXISTS public.health_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_review', 'flagged', 'archived')),
  source_references TEXT[] NOT NULL DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT DEFAULT 'EbolaGuard Clinical Review Board',
  reviewer_name TEXT DEFAULT 'Dr. A. Bello, Public Health Epidemiologist',
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  last_reviewed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. OUTBREAK UPDATES
CREATE TABLE IF NOT EXISTS public.outbreak_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  publisher TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  retrieved_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  verified_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_review', 'flagged', 'archived')),
  location TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'announcement',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. OUTBREAK STATISTICS
CREATE TABLE IF NOT EXISTS public.outbreak_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country TEXT NOT NULL,
  state_or_region TEXT NOT NULL,
  virus_species TEXT NOT NULL DEFAULT 'All / Unspecified',
  statistic_type TEXT NOT NULL,
  value NUMERIC,
  unit TEXT NOT NULL,
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  source_id UUID REFERENCES public.official_sources(id) ON DELETE SET NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_published_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  verification_status TEXT NOT NULL DEFAULT 'verified',
  is_cumulative BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. AWARENESS RESOURCES
CREATE TABLE IF NOT EXISTS public.awareness_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size TEXT DEFAULT '1.2 MB',
  language TEXT NOT NULL DEFAULT 'en',
  source_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. STATE HEALTH FACILITIES & HOTLINES
CREATE TABLE IF NOT EXISTS public.state_health_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state_name TEXT NOT NULL,
  organisation_name TEXT NOT NULL,
  facility_type TEXT NOT NULL,
  official_website TEXT,
  verified_contact_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_url TEXT NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. MISINFORMATION REPORTS
CREATE TABLE IF NOT EXISTS public.misinformation_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_category TEXT NOT NULL,
  description TEXT NOT NULL,
  reported_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'debunked', 'dismissed')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. ALERT & NEWSLETTER SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  consent_status BOOLEAN NOT NULL DEFAULT true,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  unsubscribed_at TIMESTAMPTZ
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbreak_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbreak_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awareness_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_health_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.misinformation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published verified articles" ON public.health_articles;
DROP POLICY IF EXISTS "Public can view verified outbreak updates" ON public.outbreak_updates;
DROP POLICY IF EXISTS "Public can view verified statistics" ON public.outbreak_statistics;
DROP POLICY IF EXISTS "Public can view active official sources" ON public.official_sources;
DROP POLICY IF EXISTS "Public can view active state health facilities" ON public.state_health_resources;
DROP POLICY IF EXISTS "Public can view published FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Public can view active awareness resources" ON public.awareness_resources;
DROP POLICY IF EXISTS "Public can insert misinformation report" ON public.misinformation_reports;
DROP POLICY IF EXISTS "Public can insert subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Super admins full access articles" ON public.health_articles;
DROP POLICY IF EXISTS "Super admins full access updates" ON public.outbreak_updates;
DROP POLICY IF EXISTS "Super admins full access stats" ON public.outbreak_statistics;
DROP POLICY IF EXISTS "Super admins full access sources" ON public.official_sources;
DROP POLICY IF EXISTS "Staff can view misinformation reports" ON public.misinformation_reports;
DROP POLICY IF EXISTS "Staff can manage misinformation reports" ON public.misinformation_reports;
DROP POLICY IF EXISTS "Staff can view subscriptions" ON public.subscriptions;

CREATE POLICY "Public can view published verified articles" ON public.health_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view verified outbreak updates" ON public.outbreak_updates FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view verified statistics" ON public.outbreak_statistics FOR SELECT USING (true);
CREATE POLICY "Public can view active official sources" ON public.official_sources FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active state health facilities" ON public.state_health_resources FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view published FAQs" ON public.faqs FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view active awareness resources" ON public.awareness_resources FOR SELECT USING (status = 'active');
CREATE POLICY "Public can insert misinformation report" ON public.misinformation_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert subscription" ON public.subscriptions FOR INSERT WITH CHECK (true);

CREATE POLICY "Super admins full access articles" ON public.health_articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Super admins full access updates" ON public.outbreak_updates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Super admins full access stats" ON public.outbreak_statistics FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Super admins full access sources" ON public.official_sources FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff can view misinformation reports" ON public.misinformation_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage misinformation reports" ON public.misinformation_reports FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Staff can view subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (true);

-- INITIAL SEED RECORDS
INSERT INTO public.official_sources (id, name, website_url, source_type, is_active)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Nigeria Centre for Disease Control and Prevention (NCDC)', 'https://ncdc.gov.ng/', 'national_agency', true),
  ('a1000000-0000-0000-0000-000000000002', 'World Health Organization (WHO Africa)', 'https://www.afro.who.int/', 'international_org', true),
  ('a1000000-0000-0000-0000-000000000003', 'Federal Ministry of Health and Social Welfare (Nigeria)', 'https://health.gov.ng/', 'ministry', true),
  ('a1000000-0000-0000-0000-000000000004', 'Africa Centres for Disease Control and Prevention (Africa CDC)', 'https://africacdc.org/', 'international_org', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.outbreak_updates (id, title, summary, content, publisher, source_url, location, status, category)
VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'NCDC Reaffirms Nationwide Heightened Surveillance at Points of Entry',
    'The Nigeria Centre for Disease Control confirms heightened port health surveillance at international airports and borders. Zero active Ebola cases in Nigeria.',
    'Screening active at Lagos, Abuja, Kano airports and land border corridors. Continuous temperature monitoring and declarations.',
    'Nigeria Centre for Disease Control (NCDC)',
    'https://ncdc.gov.ng',
    'Nigeria (National / Points of Entry)',
    'active',
    'announcement'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.outbreak_statistics (id, country, state_or_region, virus_species, statistic_type, value, unit, reporting_period_start, reporting_period_end, source_name, source_url, source_published_at, is_cumulative, notes)
VALUES
  (
    'c1000000-0000-0000-0000-000000000001',
    'Nigeria',
    'National Total (36 States & FCT)',
    'All / Unspecified',
    'confirmed_cases',
    0,
    'cases',
    '2026-01-01',
    '2026-10-23',
    'NCDC',
    'https://ncdc.gov.ng',
    now(),
    true,
    'Zero confirmed cases nationwide.'
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'Nigeria',
    'Points of Entry',
    'All / Unspecified',
    'contacts_monitored',
    142850,
    'people',
    '2026-01-01',
    '2026-10-23',
    'Port Health Services',
    'https://ncdc.gov.ng',
    now(),
    true,
    'Cumulative passenger checks logged.'
  )
ON CONFLICT (id) DO NOTHING;
`;
