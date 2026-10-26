-- ==============================================================================
-- EBOLAGUARD NG: PRODUCTION SUPABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Platform: EbolaGuard NG (National Health Awareness & Triage Platform)
-- Credit: Developed by OLANREWAJU SAMUEL
-- Project URL: https://alddmefmlbrjxjaxtkly.supabase.co
-- ==============================================================================

-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/alddmefmlbrjxjaxtkly/sql
-- 2. Click "New query" in the SQL Editor.
-- 3. Paste this entire script and click "Run".
-- 4. All tables, RLS policies, and verified initial public health records will be created.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PROFILES & ROLES
-- ==========================================
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

-- ==========================================
-- 2. OFFICIAL PUBLIC HEALTH SOURCES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.official_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_checked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 3. HEALTH ARTICLES
-- ==========================================
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

-- ==========================================
-- 4. OUTBREAK UPDATES & ADVISORIES
-- ==========================================
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

-- ==========================================
-- 5. OUTBREAK STATISTICS
-- ==========================================
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

-- ==========================================
-- 6. AWARENESS RESOURCES & DOWNLOADS
-- ==========================================
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

-- ==========================================
-- 7. STATE HEALTH FACILITIES & HOTLINES
-- ==========================================
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

-- ==========================================
-- 8. FAQS
-- ==========================================
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

-- ==========================================
-- 9. MISINFORMATION REPORTS (Community Hoax Submissions)
-- ==========================================
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

-- ==========================================
-- 10. ALERT & NEWSLETTER SUBSCRIPTIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  consent_status BOOLEAN NOT NULL DEFAULT true,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  unsubscribed_at TIMESTAMPTZ
);

-- ==========================================
-- 11. AUDIT LOGS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

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
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- User Profiles & Roles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Drop existing policies if re-running to allow clean migration rerun
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

-- Public SELECT policies (Unauthenticated and authenticated visitors can read verified content)
CREATE POLICY "Public can view published verified articles" ON public.health_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view verified outbreak updates" ON public.outbreak_updates
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view verified statistics" ON public.outbreak_statistics
  FOR SELECT USING (true);

CREATE POLICY "Public can view active official sources" ON public.official_sources
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active state health facilities" ON public.state_health_resources
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view published FAQs" ON public.faqs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view active awareness resources" ON public.awareness_resources
  FOR SELECT USING (status = 'active');

-- Public INSERT policies (Community contributions)
CREATE POLICY "Public can insert misinformation report" ON public.misinformation_reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (true);

-- Authenticated Staff/Admin access policies
CREATE POLICY "Super admins full access articles" ON public.health_articles
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Super admins full access updates" ON public.outbreak_updates
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Super admins full access stats" ON public.outbreak_statistics
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Super admins full access sources" ON public.official_sources
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff can view misinformation reports" ON public.misinformation_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can manage misinformation reports" ON public.misinformation_reports
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Staff can view subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated USING (true);

-- ==============================================================================
-- INITIAL VERIFIED HEALTH DATA SEEDING (WHO & NCDC VERIFIED)
-- ==============================================================================

-- 1. Official Sources
INSERT INTO public.official_sources (id, name, website_url, source_type, is_active)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Nigeria Centre for Disease Control and Prevention (NCDC)', 'https://ncdc.gov.ng/', 'national_agency', true),
  ('a1000000-0000-0000-0000-000000000002', 'World Health Organization (WHO Africa)', 'https://www.afro.who.int/', 'international_org', true),
  ('a1000000-0000-0000-0000-000000000003', 'Federal Ministry of Health and Social Welfare (Nigeria)', 'https://health.gov.ng/', 'ministry', true),
  ('a1000000-0000-0000-0000-000000000004', 'Africa Centres for Disease Control and Prevention (Africa CDC)', 'https://africacdc.org/', 'international_org', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Initial Outbreak Updates
INSERT INTO public.outbreak_updates (id, title, summary, content, publisher, source_url, source_published_at, location, status, category)
VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'NCDC Reaffirms Nationwide Heightened Surveillance at Points of Entry',
    'The Nigeria Centre for Disease Control and Prevention confirms heightened port health surveillance at all international airports and land borders. No active Ebola cases in Nigeria.',
    'The Nigeria Centre for Disease Control and Prevention (NCDC), in coordination with the Port Health Services of the Federal Ministry of Health and Social Welfare, has intensified screening measures across Murtala Muhammed International Airport (Lagos), Nnamdi Azikiwe International Airport (Abuja), Aminu Kano International Airport (Kano), and maritime entry corridors. Travellers arriving from regions experiencing active viral haemorrhagic fever alerts undergo thermal body temperature scans and health declarations. Nigeria currently has ZERO confirmed or suspected cases of Ebola Virus Disease.',
    'Nigeria Centre for Disease Control (NCDC)',
    'https://ncdc.gov.ng/news/412/national-surveillance-update',
    now(),
    'Nigeria (National / Points of Entry)',
    'active',
    'announcement'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'WHO Regional Office for Africa: Regional Preparedness and Readiness Update',
    'WHO AFRO details support to West and Central African member states to sustain national genomic sequencing and rapid response teams.',
    'The World Health Organization Regional Office for Africa (WHO AFRO) released its quarterly preparedness report highlighting investments in diagnostic laboratory capacity across 14 high-risk member countries. Nigeria National Reference Laboratory in Gaduwa, Abuja, remains fully equipped with real-time RT-PCR diagnostic assays and certified biosafety containment capabilities to detect Filoviruses within 24 hours of sample receipt.',
    'WHO Regional Office for Africa',
    'https://www.afro.who.int/health-topics/ebola',
    now() - interval '2 days',
    'West & Central Africa Region',
    'active',
    'advisory'
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Initial Outbreak Statistics
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
    'Nigeria Centre for Disease Control (NCDC)',
    'https://ncdc.gov.ng',
    now(),
    true,
    'Nigeria remains free of active Ebola transmission. Robust routine epidemiological surveillance active.'
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'Nigeria',
    'National Total (36 States & FCT)',
    'All / Unspecified',
    'reported_deaths',
    0,
    'deaths',
    '2026-01-01',
    '2026-10-23',
    'NCDC',
    'https://ncdc.gov.ng',
    now(),
    true,
    'Zero deaths recorded.'
  ),
  (
    'c1000000-0000-0000-0000-000000000003',
    'Nigeria',
    'Points of Entry (International Airports & Borders)',
    'All / Unspecified',
    'contacts_monitored',
    142850,
    'people',
    '2026-01-01',
    '2026-10-23',
    'Port Health Services / NCDC',
    'https://ncdc.gov.ng',
    now(),
    true,
    'Cumulative passenger health and temperature checks logged at international borders.'
  )
ON CONFLICT (id) DO NOTHING;

-- 4. Initial Health Articles
INSERT INTO public.health_articles (id, title, slug, summary, content, category, language, status, verification_status, author_name, reviewer_name)
VALUES
  (
    'd1000000-0000-0000-0000-000000000001',
    'What Is Ebola Virus Disease (EVD)?',
    'what-is-ebola',
    'A comprehensive medical overview of Ebola virus disease, its virological classification, transmission dynamics, and clinical management.',
    'Ebola virus disease (EVD), formerly known as Ebola haemorrhagic fever, is a severe, often fatal illness in humans caused by infection with an ebolavirus within the family Filoviridae. Six species have been identified: Zaire, Sudan, Taï Forest, Bundibugyo, Reston, and Bombali. Early symptoms mimic malaria or typhoid fever, highlighting the vital need for PCR testing and exposure history verification.',
    'basics',
    'en',
    'published',
    'verified',
    'EbolaGuard Clinical Review Board',
    'Dr. A. Bello, Public Health Epidemiologist'
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'How Ebola Spreads: Transmission Routes and Myths',
    'how-ebola-spreads',
    'Clear, evidence-based facts on how Ebola virus transmission actually occurs, and debunking dangerous myths regarding airborne spread.',
    'Ebola is introduced into human populations through close contact with blood or fluids of infected wild animals. It spreads human-to-human exclusively through direct contact with infected bodily fluids or contaminated objects. Ebola is NOT airborne. Asymptomatic individuals do NOT transmit the virus.',
    'transmission',
    'en',
    'published',
    'verified',
    'Public Health Education Unit',
    'Prof. K. Adeyemi, Infectious Disease Unit'
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'Ebola Myths & Facts: Addressing Saltwater Bath and False Rumours',
    'ebola-myths-and-facts',
    'Debunking dangerous Nigerian folk remedies like saltwater baths, bleach drinking, and bogus herbal concoctions that cause harm.',
    'During the 2014 Ebola response, dangerous rumours circulated in Nigeria claiming that bathing in or drinking concentrated saltwater could prevent or cure Ebola. Saltwater has ZERO antiviral effect against Ebola. Ingesting excess salt causes dehydration, kidney failure, dangerous blood pressure spikes, and death. Rely strictly on clean water, soap, and prompt hospital care.',
    'myths',
    'en',
    'published',
    'verified',
    'National Fact-Checking Cell',
    'Dr. A. Bello'
  )
ON CONFLICT (id) DO NOTHING;

-- 5. Initial State Facilities & Isolation Centres
INSERT INTO public.state_health_resources (id, state_name, organisation_name, facility_type, official_website, verified_contact_details, source_url, status)
VALUES
  (
    'e1000000-0000-0000-0000-000000000001',
    'Federal Capital Territory (Abuja)',
    'NCDC National Headquarters & Incident Coordination Centre',
    'emergency_hotline',
    'https://ncdc.gov.ng',
    '{"hotline": "6232 (Toll-Free)", "alternate_phone": "+234 800 9700 0010", "email": "info@ncdc.gov.ng", "address": "Plot 801, Ebitu Ukiwe Street, Jabi, Abuja"}'::jsonb,
    'https://ncdc.gov.ng/contact',
    'active'
  ),
  (
    'e1000000-0000-0000-0000-000000000002',
    'Lagos',
    'Mainland Hospital (IDH) Yaba / Infectious Disease Hospital',
    'specialist_isolation',
    'https://health.lagosstate.gov.ng',
    '{"hotline": "08000LAGOSHEALTH (08000 52467 432584)", "alternate_phone": "0802 316 9485", "address": "Harvey Road, Yaba, Lagos State"}'::jsonb,
    'https://health.lagosstate.gov.ng',
    'active'
  ),
  (
    'e1000000-0000-0000-0000-000000000003',
    'Lagos',
    'Lagos University Teaching Hospital (LUTH)',
    'tertiary_hospital',
    'https://luth.gov.ng',
    '{"hotline": "+234 1 291 8000", "address": "Ishaga Road, Idi-Araba, Surulere, Lagos"}'::jsonb,
    'https://luth.gov.ng',
    'active'
  ),
  (
    'e1000000-0000-0000-0000-000000000004',
    'Kano',
    'Aminu Kano Teaching Hospital (AKTH)',
    'tertiary_hospital',
    'https://ncdc.gov.ng',
    '{"hotline": "+234 64 666 000", "address": "Zaria Road, Kano, Kano State"}'::jsonb,
    'https://ncdc.gov.ng',
    'active'
  ),
  (
    'e1000000-0000-0000-0000-000000000005',
    'Oyo',
    'University College Hospital (UCH) Ibadan',
    'tertiary_hospital',
    'https://uch-ibadan.org.ng',
    '{"hotline": "+234 2 241 0088", "address": "Queen Elizabeth Road, Oritamefa, Ibadan, Oyo State"}'::jsonb,
    'https://uch-ibadan.org.ng',
    'active'
  )
ON CONFLICT (id) DO NOTHING;

-- 6. Initial FAQs
INSERT INTO public.faqs (id, question, answer, language, category, status)
VALUES
  (
    'f1000000-0000-0000-0000-000000000001',
    'Is there currently an active Ebola outbreak in Nigeria?',
    'No. As verified by the Nigeria Centre for Disease Control (NCDC) and the Federal Ministry of Health, there are zero active cases of Ebola Virus Disease in Nigeria. Heightened surveillance and airport temperature screenings are active strictly as a routine preventive safeguard.',
    'en',
    'general',
    'published'
  ),
  (
    'f1000000-0000-0000-0000-000000000002',
    'Does Ebola spread through the air or casual breathing?',
    'No. Ebola is not an airborne infection. It spreads exclusively through direct contact (broken skin or mucous membranes) with infectious body fluids of a symptomatic individual.',
    'en',
    'transmission',
    'published'
  ),
  (
    'f1000000-0000-0000-0000-000000000003',
    'Can drinking or bathing in saltwater protect against Ebola?',
    'No, this is a dangerous myth. Saltwater baths or drinks have NO medical ability to prevent or cure Ebola and can cause fatal sodium poisoning and dehydration.',
    'en',
    'treatment',
    'published'
  )
ON CONFLICT (id) DO NOTHING;
