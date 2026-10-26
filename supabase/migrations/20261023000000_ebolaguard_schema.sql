-- =========================================================
-- EBOLAGUARD NG: PRODUCTION POSTGRESQL SCHEMA & RLS POLICIES
-- Platform: EbolaGuard NG (Nigeria Public Health Platform)
-- Credit: Developed by OLANREWAJU SAMUEL
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. USER ROLES
CREATE TYPE public.app_role AS ENUM ('super_admin', 'health_editor', 'fact_checker', 'content_contributor');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'content_contributor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, role)
);

-- Helper security function to check roles
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

-- 3. OFFICIAL SOURCES
CREATE TABLE IF NOT EXISTS public.official_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_checked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. HEALTH ARTICLES
CREATE TABLE IF NOT EXISTS public.health_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  verification_status TEXT NOT NULL DEFAULT 'pending_review' CHECK (verification_status IN ('verified', 'pending_review', 'flagged', 'archived')),
  source_references TEXT[] NOT NULL DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. OUTBREAK UPDATES
CREATE TABLE IF NOT EXISTS public.outbreak_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  publisher TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_published_at TIMESTAMPTZ NOT NULL,
  retrieved_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  verified_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_review', 'flagged', 'archived')),
  location TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'announcement',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. OUTBREAK STATISTICS
CREATE TABLE IF NOT EXISTS public.outbreak_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country TEXT NOT NULL,
  state_or_region TEXT NOT NULL,
  virus_species TEXT NOT NULL,
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

-- 7. AWARENESS RESOURCES
CREATE TABLE IF NOT EXISTS public.awareness_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  source_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. STATE HEALTH RESOURCES
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

-- 9. FAQS
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

-- 10. TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  language TEXT NOT NULL,
  translated_title TEXT,
  translated_content TEXT NOT NULL,
  review_status TEXT NOT NULL DEFAULT 'pending',
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  consent_status BOOLEAN NOT NULL DEFAULT true,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  unsubscribed_at TIMESTAMPTZ
);

-- 12. MISINFORMATION REPORTS
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

-- 13. AUDIT LOGS
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

-- 14. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 15. VIRTUAL CONSULTATION SESSIONS & MESSAGES (Ephemeral privacy-compliant)
CREATE TABLE IF NOT EXISTS public.virtual_consultation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  anonymous_session_id TEXT,
  session_status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (timezone('utc'::text, now()) + interval '48 hours')
);

CREATE TABLE IF NOT EXISTS public.virtual_consultation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.virtual_consultation_sessions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'assistant', 'system')),
  message_content TEXT NOT NULL,
  triage_level INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. VIRTUAL DOCTOR FEEDBACK
CREATE TABLE IF NOT EXISTS public.virtual_doctor_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.virtual_consultation_sessions(id) ON DELETE SET NULL,
  feedback_type TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbreak_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbreak_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awareness_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_health_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.misinformation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_consultation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_consultation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_doctor_feedback ENABLE ROW LEVEL SECURITY;
-- User profile & role access policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Public read policies for verified content
CREATE POLICY "Public can view published verified articles" ON public.health_articles
  FOR SELECT USING (status = 'published' AND verification_status = 'verified');

CREATE POLICY "Public can view verified outbreak updates" ON public.outbreak_updates
  FOR SELECT USING (status = 'active' AND verification_status = 'verified');

CREATE POLICY "Public can view verified statistics" ON public.outbreak_statistics
  FOR SELECT USING (verification_status = 'verified');

CREATE POLICY "Public can view active official sources" ON public.official_sources
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active state health facilities" ON public.state_health_resources
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view published FAQs" ON public.faqs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view active awareness resources" ON public.awareness_resources
  FOR SELECT USING (status = 'active');

-- Staff/Role modification policies
CREATE POLICY "Super admins full access articles" ON public.health_articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'health_editor'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'health_editor'));

CREATE POLICY "Super admins full access updates" ON public.outbreak_updates
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'health_editor'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'health_editor'));

CREATE POLICY "Super admins full access stats" ON public.outbreak_statistics
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'health_editor'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'health_editor'));

-- Public can submit misinformation reports (insert only)
CREATE POLICY "Public can insert misinformation report" ON public.misinformation_reports
  FOR INSERT WITH CHECK (true);

-- Only fact checkers / admins can view and resolve reports
CREATE POLICY "Staff can view misinformation reports" ON public.misinformation_reports
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'fact_checker'));

-- Anonymous & authenticated users can manage their own consultation session
CREATE POLICY "Session owner access" ON public.virtual_consultation_sessions
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Message owner access" ON public.virtual_consultation_messages
  FOR ALL USING (true);
