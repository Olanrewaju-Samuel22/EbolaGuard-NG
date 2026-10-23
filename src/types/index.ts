export type UserRole = 'super_admin' | 'health_editor' | 'fact_checker' | 'content_contributor';

export type VerificationStatus = 'verified' | 'pending_review' | 'flagged' | 'archived';

export type SupportedLanguage = 'en' | 'pcm' | 'yo' | 'ha' | 'ig';

export interface OfficialSource {
  id: string;
  name: string;
  website_url: string;
  source_type: 'national_agency' | 'international_org' | 'ministry' | 'academic';
  is_active: boolean;
  last_checked_at: string;
  created_at: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'basics' | 'transmission' | 'symptoms' | 'prevention' | 'clinical' | 'myths';
  language: SupportedLanguage;
  status: 'draft' | 'published' | 'archived';
  verification_status: VerificationStatus;
  source_references: string[];
  author_id?: string;
  author_name?: string;
  reviewer_name?: string;
  published_at: string;
  last_reviewed_at: string;
  created_at: string;
  updated_at: string;
}

export interface OutbreakUpdate {
  id: string;
  title: string;
  summary: string;
  content: string;
  publisher: string;
  source_url: string;
  source_published_at: string;
  retrieved_at: string;
  verified_at: string;
  verification_status: VerificationStatus;
  location: string;
  status: 'active' | 'archived';
  category: 'announcement' | 'advisory' | 'contact_tracing' | 'guideline_change';
  created_at: string;
  updated_at: string;
}

export interface OutbreakStatistic {
  id: string;
  country: string;
  state_or_region: string;
  virus_species: 'Zaire ebolavirus' | 'Sudan ebolavirus' | 'Bundibugyo ebolavirus' | 'All / Unspecified';
  statistic_type: 'confirmed_cases' | 'suspected_cases' | 'reported_deaths' | 'survivors' | 'contacts_monitored';
  value: number | null; // null means "No verified figure available"
  unit: 'cases' | 'deaths' | 'people' | 'percentage';
  reporting_period_start: string;
  reporting_period_end: string;
  source_id?: string;
  source_name: string;
  source_url: string;
  source_published_at: string;
  verified_at: string;
  verification_status: VerificationStatus;
  is_cumulative: boolean;
  notes?: string;
}

export interface AwarenessResource {
  id: string;
  title: string;
  description: string;
  resource_type: 'poster' | 'factsheet' | 'audio_guide' | 'community_handout';
  file_path: string;
  file_size: string;
  language: SupportedLanguage;
  source_url: string;
  status: 'active' | 'archived';
  created_at: string;
}

export interface StateHealthResource {
  id: string;
  state_name: string;
  organisation_name: string;
  facility_type: 'tertiary_hospital' | 'specialist_isolation' | 'fmoh_centre' | 'emergency_hotline';
  official_website?: string;
  verified_contact_details: {
    hotline: string;
    alternate_phone?: string;
    email?: string;
    address: string;
  };
  source_url: string;
  verified_at: string;
  status: 'active' | 'inactive';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  language: SupportedLanguage;
  category: 'general' | 'symptoms' | 'transmission' | 'treatment' | 'travel';
  status: 'published' | 'draft';
  created_at: string;
}

export interface MisinformationReport {
  id: string;
  report_category: 'fake_cure' | 'false_case_claim' | 'conspiracy' | 'unauthorized_remedy' | 'other';
  description: string;
  reported_url?: string;
  status: 'pending' | 'under_review' | 'debunked' | 'dismissed';
  assigned_to?: string;
  resolution_notes?: string;
  created_at: string;
}

export interface VirtualConsultationMessage {
  id: string;
  sender_type: 'user' | 'assistant' | 'system';
  message_content: string;
  created_at: string;
  triage_level?: 1 | 2 | 3;
}

export interface VirtualDoctorTriageResult {
  level: 1 | 2 | 3;
  level_name: 'General Guidance' | 'Prompt Professional Assessment' | 'Immediate Emergency Medical Attention';
  summary: string;
  warning_signs_detected: string[];
  exposure_risk_flag: boolean;
  recommended_actions: string[];
  safe_self_care: string[];
  monitoring_points: string[];
  urgent_contacts: {
    label: string;
    phone: string;
    description: string;
  }[];
  disclaimer: string;
}

export interface AuditLog {
  id: string;
  actor_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}
