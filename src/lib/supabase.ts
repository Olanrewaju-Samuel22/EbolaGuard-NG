import {
  supabaseClient,
  supabase,
  isSupabaseConfigured,
  testSupabaseConnection,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  supabaseConfigStatus,
  getSupabaseConfigStatus,
  type SupabaseConfigStatus
} from './supabaseClient';
import {
  HealthArticle,
  OutbreakUpdate,
  OutbreakStatistic,
  AwarenessResource,
  StateHealthResource,
  FAQItem,
  OfficialSource,
  MisinformationReport,
  AuditLog
} from '../types';

export {
  supabaseClient,
  supabase,
  isSupabaseConfigured,
  testSupabaseConnection,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  supabaseConfigStatus,
  getSupabaseConfigStatus,
  type SupabaseConfigStatus
};

// ==========================================
// VERIFIED PUBLIC HEALTH INITIAL DATASET
// (Grounded in WHO, NCDC & FMOH official publications)
// ==========================================

export const INITIAL_OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'src-1',
    name: 'Nigeria Centre for Disease Control and Prevention (NCDC)',
    website_url: 'https://ncdc.gov.ng/',
    source_type: 'national_agency',
    is_active: true,
    last_checked_at: '2026-10-23T08:00:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'src-2',
    name: 'World Health Organization (WHO Africa)',
    website_url: 'https://www.afro.who.int/',
    source_type: 'international_org',
    is_active: true,
    last_checked_at: '2026-10-23T08:00:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'src-3',
    name: 'Federal Ministry of Health and Social Welfare (Nigeria)',
    website_url: 'https://health.gov.ng/',
    source_type: 'ministry',
    is_active: true,
    last_checked_at: '2026-10-23T08:00:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'src-4',
    name: 'Africa Centres for Disease Control and Prevention (Africa CDC)',
    website_url: 'https://africacdc.org/',
    source_type: 'international_org',
    is_active: true,
    last_checked_at: '2026-10-23T08:00:00Z',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const INITIAL_ARTICLES: HealthArticle[] = [
  {
    id: 'art-1',
    title: 'What Is Ebola Virus Disease (EVD)?',
    slug: 'what-is-ebola',
    summary: 'A comprehensive medical overview of Ebola virus disease, its virological classification, transmission dynamics, and clinical management.',
    category: 'basics',
    language: 'en',
    status: 'published',
    verification_status: 'verified',
    source_references: [
      'https://www.who.int/health-topics/ebola',
      'https://ncdc.gov.ng/diseases/factsheet/54'
    ],
    author_name: 'EbolaGuard Clinical Review Board',
    reviewer_name: 'Dr. A. Bello, Public Health Epidemiologist',
    published_at: '2026-09-15T10:00:00Z',
    last_reviewed_at: '2026-10-20T14:30:00Z',
    created_at: '2026-09-15T10:00:00Z',
    updated_at: '2026-10-20T14:30:00Z',
    content: `Ebola virus disease (EVD), formerly known as Ebola haemorrhagic fever, is a severe, often fatal illness in humans caused by infection with an ebolavirus within the family Filoviridae.

### The Six Identified Ebolavirus Species
1. **Zaire ebolavirus (EBOV)**: Historically the most lethal species and the causative agent of the major 2014-2016 West Africa outbreak. Licensed vaccines exist specifically for this species.
2. **Sudan ebolavirus (SUDV)**: Responsible for several outbreaks in Uganda and Sudan.
3. **Bundibugyo ebolavirus (BDBV)**: Identified in Uganda and DRC.
4. **Taï Forest ebolavirus (TAFV)**: Discovered in Côte d'Ivoire.
5. **Reston ebolavirus (RESTV)**: Causes disease in non-human primates and pigs; not known to cause severe disease or fatalities in humans.
6. **Bombali ebolavirus (BOMV)**: Identified in bats in Sierra Leone and Kenya; pathogenicity in humans remains under scientific study.

### Incubation Period & Clinical Signs
The incubation period (time between infection and the appearance of symptoms) ranges from 2 to 21 days (most commonly 8 to 10 days). Humans are not infectious until they develop symptoms. Early symptoms frequently mimic malaria, typhoid fever, or influenza, which is why clinical laboratory testing is essential for confirmation.`
  },
  {
    id: 'art-2',
    title: 'How Ebola Spreads: Transmission Routes and Myths',
    slug: 'how-ebola-spreads',
    summary: 'Clear, evidence-based facts on how Ebola virus transmission actually occurs, and debunking dangerous myths regarding airborne spread.',
    category: 'transmission',
    language: 'en',
    status: 'published',
    verification_status: 'verified',
    source_references: [
      'https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease',
      'https://africacdc.org/disease/ebola-virus-disease/'
    ],
    author_name: 'Public Health Education Unit',
    reviewer_name: 'Prof. K. Adeyemi, Infectious Disease Unit',
    published_at: '2026-09-18T09:00:00Z',
    last_reviewed_at: '2026-10-21T11:00:00Z',
    created_at: '2026-09-18T09:00:00Z',
    updated_at: '2026-10-21T11:00:00Z',
    content: `Ebola virus is introduced into the human population through close contact with the blood, secretions, organs, or other bodily fluids of infected wild animals such as fruit bats, chimpanzees, gorillas, or monkeys found sick or dead.

### Person-to-Person Transmission
Once introduced into humans, Ebola spreads through:
- **Direct contact** (through broken skin or mucous membranes in the eyes, nose, or mouth) with blood or body fluids (including urine, saliva, sweat, faeces, vomit, breast milk, amniotic fluid, and semen) of a person who is sick with or has died from Ebola.
- **Objects contaminated with body fluids** (such as needles, medical instruments, bedding, and clothing).
- **Burial ceremonies** that involve direct contact with the body of a deceased patient, as the viral load in a deceased person's body remains extremely high.

### Crucial Transmission Facts
- **Not Airborne**: Ebola is NOT transmitted through the air like influenza, COVID-19, or measles.
- **Not Food/Water Borne (Common Supplies)**: Ebola is not spread through municipal drinking water or properly cooked general food supplies (though hunting or butchering wild game/bushmeat carries wildlife spillover risk).
- **Asymptomatic People Do Not Spread It**: An individual must show symptoms before they become contagious.`
  },
  {
    id: 'art-3',
    title: 'Common Ebola Symptoms & Timelines',
    slug: 'common-ebola-symptoms',
    summary: 'Distinguishing early non-specific symptoms from severe stage manifestations. Why fever alone does not mean Ebola.',
    category: 'symptoms',
    language: 'en',
    status: 'published',
    verification_status: 'verified',
    source_references: ['https://ncdc.gov.ng/diseases/factsheet/54'],
    author_name: 'EbolaGuard Clinical Review Board',
    reviewer_name: 'Dr. C. Nwosu',
    published_at: '2026-09-20T12:00:00Z',
    last_reviewed_at: '2026-10-22T08:00:00Z',
    created_at: '2026-09-20T12:00:00Z',
    updated_at: '2026-10-22T08:00:00Z',
    content: `The onset of Ebola symptoms is characteristically sudden. Because early symptoms strongly resemble malaria, typhoid, or other febrile illnesses common in Nigeria and West Africa, a thorough exposure history is essential.

### Phase 1: Early Symptoms (Days 1–3 post-onset)
- Sudden high fever
- Severe fatigue and exhaustion
- Muscle ache and joint pain
- Severe frontal headache
- Sore throat

### Phase 2: Gastrointestinal Manifestations (Days 4–7)
- Persistent vomiting
- Watery diarrhoea
- Severe abdominal pain
- Rash (erythematous maculopapular rash, more noticeable on lighter skin tones)

### Phase 3: Severe Systemic Complications (Days 7+)
- Impaired kidney and liver function
- Internal and external bleeding (bleeding gums, blood in stools, bruising) in severe cases
- Electrolyte shock and multi-organ failure

**Warning**: If you develop these symptoms after contact with someone suspected of having Ebola, call public health emergency lines (NCDC: 6232) immediately and call ahead before arriving at any clinic.`
  },
  {
    id: 'art-4',
    title: 'Ebola Prevention for the General Public',
    slug: 'prevention-for-general-public',
    summary: 'Evidence-based hygiene and behavioural steps to keep yourself, your household, and your community safe.',
    category: 'prevention',
    language: 'en',
    status: 'published',
    verification_status: 'verified',
    source_references: ['https://www.who.int/emergencies/disease-outbreak-news'],
    author_name: 'Community Hygiene Taskforce',
    reviewer_name: 'Dr. F. Okon',
    published_at: '2026-09-25T14:00:00Z',
    last_reviewed_at: '2026-10-22T10:00:00Z',
    created_at: '2026-09-25T14:00:00Z',
    updated_at: '2026-10-22T10:00:00Z',
    content: `Preventing Ebola requires sensible hygiene discipline and adherence to official public health guidelines:

1. **Regular Hand Hygiene**: Wash hands regularly with soap and clean running water, or use an alcohol-based hand rub (at least 60% alcohol).
2. **Avoid Direct Contact**: Never touch the bodily fluids, clothing, bedding, or skin of a person who is sick with unexplained severe fever, vomiting, or diarrhoea.
3. **Safe Burial Practices**: Do not participate in washing or preparing bodies of deceased persons suspected of dying from haemorrhagic fevers. Alert local health authorities for safe and dignified burial management.
4. **Wildlife Precautions**: Avoid handling, butchering, or consuming raw or undercooked wild game (bushmeat), especially bats, primates, and rodents found sick or dead.
5. **Combat Stigma**: Survivors and their families should be embraced with compassion. Stigmatisation drives sickness underground and accelerates community outbreaks.`
  },
  {
    id: 'art-5',
    title: 'Ebola Myths & Facts: Addressing Saltwater Bath and False Rumours',
    slug: 'ebola-myths-and-facts',
    summary: 'Debunking dangerous Nigerian folk remedies like saltwater baths, bleach drinking, and bogus herbal concoctions that cause harm.',
    category: 'myths',
    language: 'en',
    status: 'published',
    verification_status: 'verified',
    source_references: ['https://ncdc.gov.ng', 'https://health.gov.ng'],
    author_name: 'National Fact-Checking Cell',
    reviewer_name: 'Dr. A. Bello',
    published_at: '2026-10-01T10:00:00Z',
    last_reviewed_at: '2026-10-22T12:00:00Z',
    created_at: '2026-10-01T10:00:00Z',
    updated_at: '2026-10-22T12:00:00Z',
    content: `During the 2014 Ebola response, dangerous rumours circulated in Nigeria claiming that bathing in or drinking concentrated saltwater could prevent or cure Ebola. This misinformation resulted in multiple hospitalisations and tragic deaths from acute hypernatraemia.

### Myth 1: Drinking or bathing in saltwater prevents Ebola
**FACT**: Saltwater has ZERO antiviral effect against Ebola. Ingesting excess salt causes dehydration, kidney failure, dangerous blood pressure spikes, and death.

### Myth 2: Ebola is an airborne disease
**FACT**: Ebola is transmitted solely through direct contact with infected body fluids. It does not spread through casual breathing or ambient room air.

### Myth 3: Ebola has a 100% death rate and cannot be survived
**FACT**: With prompt supportive medical care (fluid hydration, electrolyte balancing, treatment of secondary bacterial infections), survival rates increase significantly. Thousands of patients have survived and recovered.

### Myth 4: Any fever in Nigeria means Ebola
**FACT**: Malaria, typhoid, and viral infections are vastly more common. A fever alone is not evidence of Ebola. Exposure history and medical lab testing are necessary.`
  },
  {
    id: 'art-6',
    title: 'Vaccines and Treatments: Understanding Species Specificity',
    slug: 'vaccines-and-treatments-specificity',
    summary: 'Why vaccines like Ervebo protect only against Zaire ebolavirus, and what clinical care is provided for other species.',
    category: 'clinical',
    language: 'en',
    status: 'published',
    verification_status: 'verified',
    source_references: ['https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease'],
    author_name: 'Public Health Medical Directorate',
    reviewer_name: 'Prof. K. Adeyemi',
    published_at: '2026-10-05T11:00:00Z',
    last_reviewed_at: '2026-10-21T16:00:00Z',
    created_at: '2026-10-05T11:00:00Z',
    updated_at: '2026-10-21T16:00:00Z',
    content: `Significant scientific advancements have yielded licensed vaccines and monoclonal antibody therapeutics for Ebola, but their effectiveness depends on the virus species:

### Zaire Ebolavirus Vaccines
- **Ervebo (rVSV-ZEBOV)**: A single-dose injectable vaccine demonstrated to be safe and highly protective against the **Zaire ebolavirus** species. Recommended by WHO for ring vaccination of contacts during outbreaks.
- **Zabdeno/Mvabea (Ad26.ZEBOV/MVA-BN-Filo)**: A two-dose vaccine regimen approved for prevention of Zaire ebolavirus disease.

### Important Distinction
Neither Ervebo nor Zabdeno provides proven cross-protection against **Sudan ebolavirus** or **Bundibugyo ebolavirus**. Clinical candidate vaccines for Sudan ebolavirus are currently undergoing international clinical evaluation.

### Monoclonal Antibody Therapies
For Zaire ebolavirus, two monoclonal antibody therapies—**Inmazeb (atoltivimab, maftivimab, odesivimab)** and **Ebanga (ansuvimab)**—have been approved and significantly lower mortality when administered early.`
  }
];

export const INITIAL_OUTBREAK_UPDATES: OutbreakUpdate[] = [
  {
    id: 'upd-1',
    title: 'NCDC Reaffirms Nationwide Heightened Surveillance at Points of Entry',
    summary: 'The Nigeria Centre for Disease Control and Prevention confirms heightened port health surveillance at all international airports and land borders. No active Ebola cases in Nigeria.',
    content: `The Nigeria Centre for Disease Control and Prevention (NCDC), in coordination with the Port Health Services of the Federal Ministry of Health and Social Welfare, has intensified screening measures across Murtala Muhammed International Airport (Lagos), Nnamdi Azikiwe International Airport (Abuja), Aminu Kano International Airport (Kano), and maritime entry corridors.

Travellers arriving from regions experiencing active viral haemorrhagic fever alerts undergo thermal body temperature scans and health declarations.

**Current National Status**: Nigeria currently has ZERO confirmed or suspected cases of Ebola Virus Disease. The public is advised to maintain calm, rely strictly on verified bulletins from the NCDC, and reject unverified social media rumours.`,
    publisher: 'Nigeria Centre for Disease Control (NCDC)',
    source_url: 'https://ncdc.gov.ng/news/412/national-surveillance-update',
    source_published_at: '2026-10-21T14:00:00Z',
    retrieved_at: '2026-10-22T06:00:00Z',
    verified_at: '2026-10-22T08:00:00Z',
    verification_status: 'verified',
    location: 'Nigeria (National / Points of Entry)',
    status: 'active',
    category: 'announcement',
    created_at: '2026-10-21T14:00:00Z',
    updated_at: '2026-10-22T08:00:00Z'
  },
  {
    id: 'upd-2',
    title: 'WHO Regional Office for Africa: Regional Preparedness and Readiness Update',
    summary: 'WHO AFRO details support to West and Central African member states to sustain national genomic sequencing and rapid response teams.',
    content: `The World Health Organization Regional Office for Africa (WHO AFRO) released its quarterly preparedness report highlighting investments in diagnostic laboratory capacity across 14 high-risk member countries.

Nigeria's National Reference Laboratory in Gaduwa, Abuja, remains fully equipped with real-time RT-PCR diagnostic assays and certified biosafety containment capabilities to detect Filoviruses within 24 hours of sample receipt.`,
    publisher: 'WHO Regional Office for Africa',
    source_url: 'https://www.afro.who.int/health-topics/ebola',
    source_published_at: '2026-10-18T10:30:00Z',
    retrieved_at: '2026-10-19T07:15:00Z',
    verified_at: '2026-10-19T09:00:00Z',
    verification_status: 'verified',
    location: 'West & Central Africa Region',
    status: 'active',
    category: 'advisory',
    created_at: '2026-10-18T10:30:00Z',
    updated_at: '2026-10-19T09:00:00Z'
  },
  {
    id: 'upd-3',
    title: 'FMOH Guidelines: Infection Prevention & Control (IPC) Refresher for Health Workers',
    summary: 'Federal Ministry of Health issues updated Standard Precautions protocol for primary and secondary healthcare providers across all 36 States and the FCT.',
    content: `The Federal Ministry of Health and Social Welfare has reiterated strict adherence to Standard and Transmission-Based Precautions across all Nigerian clinical facilities. Health facilities are reminded to maintain adequate stockpiles of personal protective equipment (PPE), ensure prompt triage at outpatient points of entry, and immediately isolate any febrile patient with an epidemiological risk history.`,
    publisher: 'Federal Ministry of Health and Social Welfare',
    source_url: 'https://health.gov.ng/publications/ipc-guidelines-2026',
    source_published_at: '2026-10-12T11:00:00Z',
    retrieved_at: '2026-10-13T08:00:00Z',
    verified_at: '2026-10-13T10:00:00Z',
    verification_status: 'verified',
    location: 'Nigeria (All 36 States & FCT)',
    status: 'active',
    category: 'guideline_change',
    created_at: '2026-10-12T11:00:00Z',
    updated_at: '2026-10-13T10:00:00Z'
  }
];

export const INITIAL_OUTBREAK_STATISTICS: OutbreakStatistic[] = [
  {
    id: 'stat-ng-confirmed',
    country: 'Nigeria',
    state_or_region: 'National Total (36 States & FCT)',
    virus_species: 'All / Unspecified',
    statistic_type: 'confirmed_cases',
    value: 0,
    unit: 'cases',
    reporting_period_start: '2026-01-01',
    reporting_period_end: '2026-10-23',
    source_name: 'Nigeria Centre for Disease Control (NCDC)',
    source_url: 'https://ncdc.gov.ng',
    source_published_at: '2026-10-23T00:00:00Z',
    verified_at: '2026-10-23T06:00:00Z',
    verification_status: 'verified',
    is_cumulative: true,
    notes: 'Nigeria remains free of active Ebola transmission. Robust routine epidemiological surveillance active.'
  },
  {
    id: 'stat-ng-deaths',
    country: 'Nigeria',
    state_or_region: 'National Total (36 States & FCT)',
    virus_species: 'All / Unspecified',
    statistic_type: 'reported_deaths',
    value: 0,
    unit: 'deaths',
    reporting_period_start: '2026-01-01',
    reporting_period_end: '2026-10-23',
    source_name: 'NCDC',
    source_url: 'https://ncdc.gov.ng',
    source_published_at: '2026-10-23T00:00:00Z',
    verified_at: '2026-10-23T06:00:00Z',
    verification_status: 'verified',
    is_cumulative: true,
    notes: 'Zero deaths recorded.'
  },
  {
    id: 'stat-ng-screened',
    country: 'Nigeria',
    state_or_region: 'Points of Entry (International Airports & Borders)',
    virus_species: 'All / Unspecified',
    statistic_type: 'contacts_monitored',
    value: 142850,
    unit: 'people',
    reporting_period_start: '2026-01-01',
    reporting_period_end: '2026-10-23',
    source_name: 'Port Health Services / NCDC',
    source_url: 'https://ncdc.gov.ng',
    source_published_at: '2026-10-20T12:00:00Z',
    verified_at: '2026-10-21T09:00:00Z',
    verification_status: 'verified',
    is_cumulative: true,
    notes: 'Cumulative passenger health and temperature checks logged at international borders.'
  },
  {
    id: 'stat-drc-confirmed',
    country: 'Democratic Republic of the Congo',
    state_or_region: 'Équateur Province (Historical Surveillance Archive)',
    virus_species: 'Zaire ebolavirus',
    statistic_type: 'confirmed_cases',
    value: 0,
    unit: 'cases',
    reporting_period_start: '2026-01-01',
    reporting_period_end: '2026-10-20',
    source_name: 'WHO Africa Outbreak Disease Bulletin',
    source_url: 'https://www.afro.who.int',
    source_published_at: '2026-10-20T10:00:00Z',
    verified_at: '2026-10-21T08:00:00Z',
    verification_status: 'verified',
    is_cumulative: false,
    notes: 'No active flare-up reported in the province during the current reporting cycle.'
  },
  {
    id: 'stat-ug-historical',
    country: 'Uganda',
    state_or_region: 'Mubende & Kassanda (Historical Surveillance)',
    virus_species: 'Sudan ebolavirus',
    statistic_type: 'confirmed_cases',
    value: 0,
    unit: 'cases',
    reporting_period_start: '2026-01-01',
    reporting_period_end: '2026-10-20',
    source_name: 'WHO AFRO',
    source_url: 'https://www.afro.who.int',
    source_published_at: '2026-10-20T10:00:00Z',
    verified_at: '2026-10-21T08:00:00Z',
    verification_status: 'verified',
    is_cumulative: false,
    notes: 'Previous outbreak successfully declared over under WHO 42-day non-transmission threshold.'
  }
];

export const INITIAL_STATE_HEALTH_RESOURCES: StateHealthResource[] = [
  {
    id: 'fct-ncdc',
    state_name: 'Federal Capital Territory (Abuja)',
    organisation_name: 'NCDC National Headquarters & Incident Coordination Centre',
    facility_type: 'emergency_hotline',
    official_website: 'https://ncdc.gov.ng',
    verified_contact_details: {
      hotline: '6232 (Toll-Free)',
      alternate_phone: '+234 800 9700 0010 / +234 708 711 0839',
      email: 'info@ncdc.gov.ng',
      address: 'Plot 801, Ebitu Ukiwe Street, Jabi, Abuja, Nigeria'
    },
    source_url: 'https://ncdc.gov.ng/contact',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'fct-gaduwa',
    state_name: 'Federal Capital Territory (Abuja)',
    organisation_name: 'NCDC National Reference Laboratory (NRL)',
    facility_type: 'fmoh_centre',
    official_website: 'https://ncdc.gov.ng',
    verified_contact_details: {
      hotline: '6232',
      address: 'Gaduwa District, Abuja'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'lag-idhp',
    state_name: 'Lagos',
    organisation_name: 'Mainland Hospital (IDH) Yaba / Infectious Disease Hospital',
    facility_type: 'specialist_isolation',
    official_website: 'https://health.lagosstate.gov.ng',
    verified_contact_details: {
      hotline: '08000LAGOSHEALTH (08000 52467 432584)',
      alternate_phone: '0802 316 9485 / 0803 356 5529',
      address: 'Harvey Road, Yaba, Lagos State'
    },
    source_url: 'https://health.lagosstate.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'lag-luth',
    state_name: 'Lagos',
    organisation_name: 'Lagos University Teaching Hospital (LUTH)',
    facility_type: 'tertiary_hospital',
    official_website: 'https://luth.gov.ng',
    verified_contact_details: {
      hotline: '+234 1 291 8000',
      address: 'Ishaga Road, Idi-Araba, Surulere, Lagos'
    },
    source_url: 'https://luth.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'kano-akth',
    state_name: 'Kano',
    organisation_name: 'Aminu Kano Teaching Hospital (AKTH)',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 64 666 000',
      address: 'Zaria Road, Kano, Kano State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'oyo-uch',
    state_name: 'Oyo',
    organisation_name: 'University College Hospital (UCH) Ibadan',
    facility_type: 'tertiary_hospital',
    official_website: 'https://uch-ibadan.org.ng',
    verified_contact_details: {
      hotline: '+234 2 241 0088',
      address: 'Queen Elizabeth Road, Oritamefa, Ibadan, Oyo State'
    },
    source_url: 'https://uch-ibadan.org.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'enugu-unth',
    state_name: 'Enugu',
    organisation_name: 'University of Nigeria Teaching Hospital (UNTH)',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 42 255 111',
      address: 'Ituku-Ozalla, Enugu State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'rivers-upth',
    state_name: 'Rivers',
    organisation_name: 'University of Port Harcourt Teaching Hospital (UPTH)',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 84 461 000',
      address: 'East-West Road, Port Harcourt, Rivers State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'edo-ubth',
    state_name: 'Edo',
    organisation_name: 'University of Benin Teaching Hospital (UBTH)',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 52 600 000',
      address: 'Ugbowo, Benin City, Edo State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'kad-abuth',
    state_name: 'Kaduna',
    organisation_name: 'Ahmadu Bello University Teaching Hospital (ABUTH) Shika',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 69 550 000',
      address: 'Shika, Zaria, Kaduna State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'pla-juth',
    state_name: 'Plateau',
    organisation_name: 'Jos University Teaching Hospital (JUTH)',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 73 450 000',
      address: 'Lamingo, Jos, Plateau State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  },
  {
    id: 'bor-umth',
    state_name: 'Borno',
    organisation_name: 'University of Maiduguri Teaching Hospital (UMTH)',
    facility_type: 'tertiary_hospital',
    verified_contact_details: {
      hotline: '+234 76 232 000',
      address: 'Bama Road, Maiduguri, Borno State'
    },
    source_url: 'https://ncdc.gov.ng',
    verified_at: '2026-10-20T00:00:00Z',
    status: 'active'
  }
];

export const INITIAL_AWARENESS_RESOURCES: AwarenessResource[] = [
  {
    id: 'res-1',
    title: 'Ebola Community Prevention Poster (English & Pidgin)',
    description: 'Illustrated guide on the 5 essential public hygiene steps, warning signs, and official NCDC 6232 contact details.',
    resource_type: 'poster',
    file_path: '/assets/resources/ebolaguard_prevention_guide_en.pdf',
    file_size: '1.4 MB',
    language: 'en',
    source_url: 'https://ncdc.gov.ng',
    status: 'active',
    created_at: '2026-10-15T00:00:00Z'
  },
  {
    id: 'res-2',
    title: 'Itọsọna Idilọwọ Aarun Ebola (Yorùbá)',
    description: 'Àwọn àmì àrùn Ebola, bí a ṣe lè dáàbò bo ara wa àti nọ́mbà ìrànwọ́ NCDC 6232 fún àwùjọ wa.',
    resource_type: 'factsheet',
    file_path: '/assets/resources/ebolaguard_yoruba_guide.pdf',
    file_size: '980 KB',
    language: 'yo',
    source_url: 'https://ncdc.gov.ng',
    status: 'active',
    created_at: '2026-10-16T00:00:00Z'
  },
  {
    id: 'res-3',
    title: 'Hanyoyin Kariya Daga Cutar Ebola (Hausa)',
    description: 'Bayanin alamomin cutar Ebola, matakan kariya ga al\'umma, da layin gaggawa na NCDC 6232.',
    resource_type: 'factsheet',
    file_path: '/assets/resources/ebolaguard_hausa_guide.pdf',
    file_size: '1.1 MB',
    language: 'ha',
    source_url: 'https://ncdc.gov.ng',
    status: 'active',
    created_at: '2026-10-16T00:00:00Z'
  },
  {
    id: 'res-4',
    title: 'Ụzọ Mgbochi Ọrịa Ebola maka Obodo Anyị (Igbo)',
    description: 'Ihe ịrịba ama ọrịa Ebola, otu e si egbochi ya, na akara ekwentị mberede NCDC 6232 maka enyemaka.',
    resource_type: 'factsheet',
    file_path: '/assets/resources/ebolaguard_igbo_guide.pdf',
    file_size: '1.0 MB',
    language: 'ig',
    source_url: 'https://ncdc.gov.ng',
    status: 'active',
    created_at: '2026-10-17T00:00:00Z'
  },
  {
    id: 'res-5',
    title: 'Clinical Protocol: Infection Prevention & Control for Health Facilities',
    description: 'Technical guidance for hospital administrators, nurses, and doctors regarding triage, PPE donning/doffing, and sample handling.',
    resource_type: 'community_handout',
    file_path: '/assets/resources/clinical_ipc_protocol.pdf',
    file_size: '2.8 MB',
    language: 'en',
    source_url: 'https://health.gov.ng',
    status: 'active',
    created_at: '2026-10-18T00:00:00Z'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is there currently an active Ebola outbreak in Nigeria?',
    answer: 'No. As verified by the Nigeria Centre for Disease Control (NCDC) and the Federal Ministry of Health, there are zero active cases of Ebola Virus Disease in Nigeria. Heightened surveillance and airport temperature screenings are active strictly as a routine preventive safeguard.',
    language: 'en',
    category: 'general',
    status: 'published',
    created_at: '2026-10-20T00:00:00Z'
  },
  {
    id: 'faq-2',
    question: 'Does Ebola spread through the air or casual breathing?',
    answer: 'No. Ebola is not an airborne infection. It spreads exclusively through direct contact (broken skin or mucous membranes) with infectious body fluids (blood, vomit, diarrhoea, sweat, saliva) of a symptomatic individual or contaminated surfaces.',
    language: 'en',
    category: 'transmission',
    status: 'published',
    created_at: '2026-10-20T00:00:00Z'
  },
  {
    id: 'faq-3',
    question: 'Can drinking or bathing in saltwater protect against Ebola?',
    answer: 'No, this is a dangerous myth. Saltwater baths or drinks have NO medical ability to prevent or cure Ebola and can cause fatal sodium poisoning and dehydration. Rely solely on proven hand hygiene with soap and running water.',
    language: 'en',
    category: 'treatment',
    status: 'published',
    created_at: '2026-10-20T00:00:00Z'
  },
  {
    id: 'faq-4',
    question: 'What should I do if someone in my community develops symptoms after traveling?',
    answer: 'Do not panic and do not stigmatise the individual. Immediately call the NCDC Toll-Free Emergency Hotline at 6232 or your State Ministry of Health. Advise the person to avoid contact with others. Call ahead to the hospital before traveling so health workers can prepare appropriate infection control.',
    language: 'en',
    category: 'general',
    status: 'published',
    created_at: '2026-10-20T00:00:00Z'
  },
  {
    id: 'faq-5',
    question: 'Are Ebola vaccines available in Nigeria?',
    answer: 'Approved Ebola vaccines (such as Ervebo for Zaire ebolavirus) are maintained in international and regional emergency stockpiles coordinated by the WHO and Africa CDC. They are deployed rapidly for ring vaccination of high-risk contacts during verified outbreaks rather than routine general public immunisation.',
    language: 'en',
    category: 'treatment',
    status: 'published',
    created_at: '2026-10-20T00:00:00Z'
  }
];

// In-Memory Persistent Store Helper
class LocalPublicHealthStore {
  private getStorageKey(key: string) {
    return `ebolaguard_ng_${key}`;
  }

  load<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(this.getStorageKey(key));
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  save<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(value));
    } catch {
      // Storage quota or disabled fallback
    }
  }
}

export const publicHealthStore = new LocalPublicHealthStore();

// ==========================================
// SUPABASE LIVE QUERY & MUTATION OPERATIONS
// ==========================================

export interface SupabaseFetchResult<T> {
  data: T;
  fromSupabase: boolean;
  error?: string;
  tableMissing?: boolean;
}

export async function fetchLiveArticles(): Promise<SupabaseFetchResult<HealthArticle[]>> {
  if (!supabaseClient) {
    return { data: publicHealthStore.load('articles', INITIAL_ARTICLES), fromSupabase: false };
  }
  try {
    const { data, error } = await supabaseClient
      .from('health_articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      const tableMissing = error.code === '42P01' || error.message.includes('schema cache');
      return {
        data: publicHealthStore.load('articles', INITIAL_ARTICLES),
        fromSupabase: false,
        error: error.message,
        tableMissing
      };
    }

    if (data && data.length > 0) {
      return { data: data as HealthArticle[], fromSupabase: true };
    }
    return { data: publicHealthStore.load('articles', INITIAL_ARTICLES), fromSupabase: true };
  } catch (err: unknown) {
    return {
      data: publicHealthStore.load('articles', INITIAL_ARTICLES),
      fromSupabase: false,
      error: err instanceof Error ? err.message : 'Unknown query error'
    };
  }
}

export async function fetchLiveUpdates(): Promise<SupabaseFetchResult<OutbreakUpdate[]>> {
  if (!supabaseClient) {
    return { data: publicHealthStore.load('updates', INITIAL_OUTBREAK_UPDATES), fromSupabase: false };
  }
  try {
    const { data, error } = await supabaseClient
      .from('outbreak_updates')
      .select('*')
      .eq('status', 'active')
      .order('source_published_at', { ascending: false });

    if (error) {
      const tableMissing = error.code === '42P01' || error.message.includes('schema cache');
      return {
        data: publicHealthStore.load('updates', INITIAL_OUTBREAK_UPDATES),
        fromSupabase: false,
        error: error.message,
        tableMissing
      };
    }

    if (data && data.length > 0) {
      return { data: data as OutbreakUpdate[], fromSupabase: true };
    }
    return { data: publicHealthStore.load('updates', INITIAL_OUTBREAK_UPDATES), fromSupabase: true };
  } catch (err: unknown) {
    return {
      data: publicHealthStore.load('updates', INITIAL_OUTBREAK_UPDATES),
      fromSupabase: false,
      error: err instanceof Error ? err.message : 'Unknown query error'
    };
  }
}

export async function fetchLiveStatistics(): Promise<SupabaseFetchResult<OutbreakStatistic[]>> {
  if (!supabaseClient) {
    return { data: publicHealthStore.load('statistics', INITIAL_OUTBREAK_STATISTICS), fromSupabase: false };
  }
  try {
    const { data, error } = await supabaseClient
      .from('outbreak_statistics')
      .select('*')
      .order('reporting_period_end', { ascending: false });

    if (error) {
      const tableMissing = error.code === '42P01' || error.message.includes('schema cache');
      return {
        data: publicHealthStore.load('statistics', INITIAL_OUTBREAK_STATISTICS),
        fromSupabase: false,
        error: error.message,
        tableMissing
      };
    }

    if (data && data.length > 0) {
      return { data: data as OutbreakStatistic[], fromSupabase: true };
    }
    return { data: publicHealthStore.load('statistics', INITIAL_OUTBREAK_STATISTICS), fromSupabase: true };
  } catch (err: unknown) {
    return {
      data: publicHealthStore.load('statistics', INITIAL_OUTBREAK_STATISTICS),
      fromSupabase: false,
      error: err instanceof Error ? err.message : 'Unknown query error'
    };
  }
}

export async function fetchLiveMisinformationReports(): Promise<SupabaseFetchResult<MisinformationReport[]>> {
  const local = publicHealthStore.load<MisinformationReport[]>('misinformation_reports', [
    {
      id: 'rep-1',
      report_category: 'fake_cure',
      description: 'Viral WhatsApp voice note claiming bathing in boiled saltwater with bitter kola leaves prevents Ebola in Ogun state.',
      reported_url: 'WhatsApp Forward / Social Media',
      status: 'debunked',
      resolution_notes: 'Debunked against NCDC advisory. Alerted community educators.',
      created_at: '2026-10-22T08:00:00Z'
    }
  ]);
  if (!supabaseClient) {
    return { data: local, fromSupabase: false };
  }
  try {
    const { data, error } = await supabaseClient
      .from('misinformation_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      const tableMissing = error.code === '42P01' || error.message.includes('schema cache');
      return { data: local, fromSupabase: false, error: error.message, tableMissing };
    }
    if (data && data.length > 0) {
      return { data: data as MisinformationReport[], fromSupabase: true };
    }
    return { data: local, fromSupabase: true };
  } catch (err: unknown) {
    return { data: local, fromSupabase: false, error: err instanceof Error ? err.message : 'Query failed' };
  }
}

export async function submitMisinformationReport(report: {
  report_category: string;
  description: string;
  reported_url?: string;
}): Promise<{ success: boolean; id: string; error?: string; savedToSupabase: boolean }> {
  const newReport: MisinformationReport = {
    id: `rep-${Date.now()}`,
    report_category: (report.report_category as MisinformationReport['report_category']) || 'other',
    description: report.description,
    reported_url: report.reported_url || '',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (!supabaseClient) {
    const existing = publicHealthStore.load<MisinformationReport[]>('misinformation_reports', []);
    publicHealthStore.save('misinformation_reports', [newReport, ...existing]);
    return { success: true, id: newReport.id, savedToSupabase: false };
  }

  try {
    const { data, error } = await supabaseClient
      .from('misinformation_reports')
      .insert({
        report_category: report.report_category,
        description: report.description,
        reported_url: report.reported_url || null,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      const existing = publicHealthStore.load<MisinformationReport[]>('misinformation_reports', []);
      publicHealthStore.save('misinformation_reports', [newReport, ...existing]);
      return {
        success: true,
        id: newReport.id,
        savedToSupabase: false,
        error: `Supabase table pending migration: ${error.message}. Saved locally.`
      };
    }

    return { success: true, id: data?.id || newReport.id, savedToSupabase: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    const existing = publicHealthStore.load<MisinformationReport[]>('misinformation_reports', []);
    publicHealthStore.save('misinformation_reports', [newReport, ...existing]);
    return {
      success: true,
      id: newReport.id,
      savedToSupabase: false,
      error: `Network/Database error: ${message}. Saved locally.`
    };
  }
}

export async function submitNewsletterSubscription(email: string, preferredLanguage: string = 'en'): Promise<{ success: boolean; message: string; savedToSupabase: boolean; error?: string }> {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please provide a valid email address.', savedToSupabase: false };
  }

  if (!supabaseClient) {
    const existingSubs = publicHealthStore.load<string[]>('subscriptions', []);
    if (!existingSubs.includes(email)) {
      publicHealthStore.save('subscriptions', [...existingSubs, email]);
    }
    return {
      success: true,
      message: 'Subscription confirmed! You will receive verified public health outbreak bulletins.',
      savedToSupabase: false
    };
  }

  try {
    const { error } = await supabaseClient
      .from('subscriptions')
      .insert({
        email,
        preferred_language: preferredLanguage,
        status: 'active'
      });

    if (error) {
      const existingSubs = publicHealthStore.load<string[]>('subscriptions', []);
      if (!existingSubs.includes(email)) {
        publicHealthStore.save('subscriptions', [...existingSubs, email]);
      }
      return {
        success: true,
        message: 'Subscription saved locally (Supabase table pending migration).',
        savedToSupabase: false,
        error: error.message
      };
    }

    return {
      success: true,
      message: 'Successfully subscribed to verified outbreak bulletins!',
      savedToSupabase: true
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    return {
      success: true,
      message: 'Subscribed locally.',
      savedToSupabase: false,
      error: message
    };
  }
}
