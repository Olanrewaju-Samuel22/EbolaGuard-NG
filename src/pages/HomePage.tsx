import React, { useState } from 'react';
import {
  Shield,
  Activity,
  HeartPulse,
  BookOpen,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  CheckCircle,
  Building2,
  Bell,
  Check,
  MapPin,
  Users,
  AlertTriangle,
  Globe,
  Sparkles,
  Lock,
  Radio,
  FileSpreadsheet,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';
import { OutbreakUpdate, OutbreakStatistic, SupportedLanguage } from '../types';
import { submitNewsletterSubscription } from '../lib/supabase';
import { useTranslation } from '../contexts/LanguageContext';

interface HomePageProps {
  onSelectTab: (tab: string) => void;
  onViewUpdate: (update: OutbreakUpdate) => void;
  language?: SupportedLanguage;
  latestUpdate: OutbreakUpdate;
  statistics: OutbreakStatistic[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  language: propLanguage,
  statistics
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  // Subscription state
  const [phoneInput, setPhoneInput] = useState('');
  const [subType, setSubType] = useState<'sms' | 'whatsapp'>('sms');
  const [subState, setSubState] = useState('Lagos');
  const [subSuccess, setSubSuccess] = useState(false);
  const [isSubmittingAlert, setIsSubmittingAlert] = useState(false);

  // Map state
  const [selectedMapState, setSelectedMapState] = useState<string>('Lagos');

  // Hotspot states data matching reference table structure
  const hotspotStates = [
    { state: 'Lagos', cases: 0, screenings: '68,240', status: activeLanguage === 'pcm' ? 'Checking for Airport & Seaport' : activeLanguage === 'yo' ? 'Àyẹ̀wò ní Pápá Ọkọ̀ & Etí Omi' : activeLanguage === 'ha' ? 'Gwajin Filin Jirgi da Tashar Ruwa' : activeLanguage === 'ig' ? 'Nyocha n\'Ọdụ Ụgbọ Elu na Mmiri' : 'Intensive Screening (MMIA Airport & Seaport)', risk: t.common.lowRisk, level: 'moderate' },
    { state: 'FCT (Abuja)', cases: 0, screenings: '42,110', status: activeLanguage === 'pcm' ? 'NCDC Headquarter & Main Lab' : activeLanguage === 'yo' ? 'Olú-Ilé-Iṣẹ́ NCDC & Ilé-Àyẹ̀wò NRL' : activeLanguage === 'ha' ? 'Cibiyar NCDC ta Kasa & NRL' : activeLanguage === 'ig' ? 'Isi Ụlọ Ọrụ NCDC & NRL' : 'National Emergency Operations & NRL Active', risk: t.common.lowRisk, level: 'moderate' },
    { state: 'Kano', cases: 0, screenings: '18,500', status: activeLanguage === 'pcm' ? 'AKIA Kano Airport Screening' : activeLanguage === 'yo' ? 'Àyẹ̀wò Pápá Ọkọ̀ AKIA Kano' : activeLanguage === 'ha' ? 'Gwajin Shiga Filin Jirgin AKIA' : activeLanguage === 'ig' ? 'Nyocha Ọdụ Ụgbọ Elu AKIA' : 'Port Health Screening (AKIA Airport)', risk: t.common.lowRisk, level: 'monitored' },
    { state: 'Rivers', cases: 0, screenings: '8,400', status: activeLanguage === 'pcm' ? 'Port Harcourt Sea & River Checks' : activeLanguage === 'yo' ? 'Ìṣọ́ Bodè Omi Port Harcourt' : activeLanguage === 'ha' ? 'Sa-idon Tashar Ruwan Fatakwal' : activeLanguage === 'ig' ? 'Nchebe Ọdụ Ụgbọ Mmiri Port Harcourt' : 'Maritime Port Health Vigilance', risk: t.common.lowRisk, level: 'monitored' },
    { state: 'Oyo', cases: 0, screenings: '3,200', status: activeLanguage === 'pcm' ? 'UCH Ibadan Isolation Unit' : activeLanguage === 'yo' ? 'Ìmúrasílẹ̀ Ilé-Ìwòsàn UCH Ìbàdàn' : activeLanguage === 'ha' ? 'Shirin Asibitin UCH Ibadan' : activeLanguage === 'ig' ? 'Njikere Ụlọ Ọgwụ UCH Ibadan' : 'UCH Isolation Preparedness & Sentinel Lab', risk: t.common.lowRisk, level: 'monitored' },
    { state: 'Edo', cases: 0, screenings: '2,400', status: activeLanguage === 'pcm' ? 'Irrua Specialist Hospital' : activeLanguage === 'yo' ? 'Ilé-Ìwòsàn Àkànṣe Irrua' : activeLanguage === 'ha' ? 'Babban Asibitin Irrua' : activeLanguage === 'ig' ? 'Ụlọ Ọgwụ Pụrụ Iche Irrua' : 'Irrua Specialist Hospital Diagnostic Standby', risk: t.common.lowRisk, level: 'monitored' }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;

    setIsSubmittingAlert(true);
    try {
      const target = phoneInput.includes('@') ? phoneInput.trim() : `${phoneInput.replace(/\s+/g, '')}@alerts.ebolaguard.ng`;
      await submitNewsletterSubscription(target, activeLanguage);
      setSubSuccess(true);
      setPhoneInput('');
      setTimeout(() => setSubSuccess(false), 5000);
    } finally {
      setIsSubmittingAlert(false);
    }
  };

  // Reference Core Features matching Doe in reference
  const coreFeatures = [
    {
      icon: Sparkles,
      title: activeLanguage === 'pcm' ? 'AI Risk Doctor' : activeLanguage === 'yo' ? 'Àyẹ̀wò Ewu AI' : activeLanguage === 'ha' ? 'Kimantawar Haɗari ta AI' : activeLanguage === 'ig' ? 'Nyocha Ihe Egwu AI' : 'AI Risk Assessment',
      description: activeLanguage === 'pcm' ? 'Quick symptom checker powered by medical AI for early risk stratification and call-ahead alerts.' : activeLanguage === 'yo' ? 'Àyẹ̀wò àmì àrùn tí AI ń ṣe láti dáàbò bo ara ní kùtùkùtù.' : activeLanguage === 'ha' ? 'Binciken alamomi da kariya ta AI domin gano hadari da wuri.' : activeLanguage === 'ig' ? 'Nyocha ihe mgbaàmà site na AI iji mata ihe egwu n\'oge.' : 'Non-diagnostic symptom and exposure assessment powered by responsible clinical AI for early triage.',
      color: 'bg-primary/10 text-primary',
      tab: 'virtual-doctor'
    },
    {
      icon: Activity,
      title: activeLanguage === 'pcm' ? 'Outbreak Gist & News' : activeLanguage === 'yo' ? 'Ìròyìn Àrùn Titun' : activeLanguage === 'ha' ? 'Rahotannin Barkewar Cuta' : activeLanguage === 'ig' ? 'Ozi Ntiwapụ Ọhụrụ' : 'Outbreak Intelligence',
      description: activeLanguage === 'pcm' ? 'Live updates verified directly from NCDC and WHO situation reports across Africa.' : activeLanguage === 'yo' ? 'Ìròyìn tòótọ́ tí a fọwọ́sí láti NCDC àti WHO lojoojúmọ́.' : activeLanguage === 'ha' ? 'Labarai da aka tantance daga NCDC da WHO kan halin da ake ciki.' : activeLanguage === 'ig' ? 'Ozi enyochara site na NCDC na WHO maka ọnọdụ ahụike.' : 'Real-time epidemiological surveillance feeds and official public health bulletins verified against NCDC and WHO.',
      color: 'bg-accent/10 text-accent',
      tab: 'updates'
    },
    {
      icon: Shield,
      title: activeLanguage === 'pcm' ? 'Safe Protection Rules' : activeLanguage === 'yo' ? 'Ìdáàbò Bo Ara' : activeLanguage === 'ha' ? 'Rigakafin Cuta' : activeLanguage === 'ig' ? 'Mgbochi Ọrịa' : 'Prevention & Hygiene',
      description: activeLanguage === 'pcm' ? 'Verified infection control rules, proper hand hygiene, and food safety standards.' : activeLanguage === 'yo' ? 'Ìlànà ìmọ́tótó tòótọ́, fífọ ọwọ́, àti ààbò oúnjẹ láti yẹra fún àkóràn.' : activeLanguage === 'ha' ? 'Hanyoyin rigakafi, tsaftar hannu, da kiyaye abinci daga kamuwa.' : activeLanguage === 'ig' ? 'Usoro mgbochi ọrịa, ịdị ọcha aka, na nchekwa nri.' : 'Evidence-based infection prevention guidelines, clinical hygiene standards, and safe burial educational protocols.',
      color: 'bg-success/10 text-success',
      tab: 'prevention'
    },
    {
      icon: Building2,
      title: activeLanguage === 'pcm' ? 'Hospital Locator' : activeLanguage === 'yo' ? 'Wá Ilé-Ìwòsàn' : activeLanguage === 'ha' ? 'Nemo Asibiti' : activeLanguage === 'ig' ? 'Chọta Ụlọ Ọgwụ' : 'Find Medical Help',
      description: activeLanguage === 'pcm' ? 'Find approved infectious disease hospitals and isolation centres across Nigeria 36 states.' : activeLanguage === 'yo' ? 'Àtòjọ ilé-ìwòsàn tí a yàn fún àrùn ní gbogbo ìpínlẹ̀ 36.' : activeLanguage === 'ha' ? 'Cikakken jerin cibiyoyin jinya da asibitoci a jihohi 36 na Najeriya.' : activeLanguage === 'ig' ? 'Ndepụta ụlọ ọgwụ nwere ikike nlekọta na steeti 36 niile.' : 'Locate verified infectious disease treatment centres, isolation facilities, and regional desks across all 36 States + FCT.',
      color: 'bg-warning/10 text-warning',
      tab: 'find-help'
    },
    {
      icon: Bell,
      title: activeLanguage === 'pcm' ? 'Emergency Alerts' : activeLanguage === 'yo' ? 'Ìkìlọ̀ Pàjáwìrì' : activeLanguage === 'ha' ? 'Gargadin Gaggawa' : activeLanguage === 'ig' ? 'Ịdọ Aka ná Ntị Mberede' : 'Early Warning Feeds',
      description: activeLanguage === 'pcm' ? 'Receive immediate SMS and WhatsApp alerts whenever public health notifications are issued.' : activeLanguage === 'yo' ? 'Gba ìfitónilétí SMS àti WhatsApp kíákíá nígbà tí ìkìlọ̀ bá jáde.' : activeLanguage === 'ha' ? 'Samun sakonni kai tsaye ta SMS da WhatsApp idan an sami wani hadari.' : activeLanguage === 'ig' ? 'Nweta ozi ozugbo na SMS na WhatsApp ma ọ nwee ihe mberede.' : 'Instant automated SMS & WhatsApp public health alert dispatches when surveillance detects regional risk spikes.',
      color: 'bg-primary/10 text-primary',
      tab: 'statistics'
    },
    {
      icon: Lock,
      title: activeLanguage === 'pcm' ? 'Privacy Guarantee' : activeLanguage === 'yo' ? 'Ààbò Àṣírí Rẹ' : activeLanguage === 'ha' ? 'Sirrin Bayanai' : activeLanguage === 'ig' ? 'Nchekwa Nzuzo' : 'Privacy-First Architecture',
      description: activeLanguage === 'pcm' ? 'Zero personal data recorded. Check your symptoms without sharing name or phone number.' : activeLanguage === 'yo' ? 'Àwọn ìbéèrè ìlera rẹ wà ní àṣírí pátápátá láì gba orúkọ rẹ.' : activeLanguage === 'ha' ? 'Ba a bukatar sunanka ko adireshinka don duba lafiyarka.' : activeLanguage === 'ig' ? 'Enweghị ozi onwe a na-edobe; nyochaa ahụ gị n\'enweghị nchegbu.' : 'Zero personally identifiable information required. Anonymous AI triage and NDPA-compliant data principles.',
      color: 'bg-accent/10 text-accent',
      tab: 'privacy'
    }
  ];

  // Stakeholders matching Boe in reference
  const stakeholders = [
    {
      icon: Users,
      title: activeLanguage === 'pcm' ? 'Community / Public' : activeLanguage === 'yo' ? 'Ará Ìlú Gbogbogbò' : activeLanguage === 'ha' ? 'Al\'umma da Jama\'a' : activeLanguage === 'ig' ? 'Ndị Obodo / Ọha' : 'Community / Public',
      description: activeLanguage === 'pcm' ? 'Free access to AI risk assessment, prevention education in local languages, and emergency facility directory.' : activeLanguage === 'yo' ? 'Àyẹ̀wò AI ọ̀fẹ́, ẹ̀kọ́ dídènà àrùn ní èdè abínibí, àti nọ́mbà pàjáwìrì.' : activeLanguage === 'ha' ? 'Binciken lafiya kyauta ta AI, ilimin rigakafi da harsunan gida, da lambobin gaggawa.' : activeLanguage === 'ig' ? 'Nnweta nyocha AI n\'efu, mmụta mgbochi n\'asụsụ obodo, na ndepụta ụlọ ọgwụ.' : 'Free access to AI-powered risk assessment, prevention education, and healthcare facility locator.',
      features: [
        activeLanguage === 'pcm' ? 'Symptom checker' : 'Symptom checker',
        activeLanguage === 'pcm' ? 'Risk classification' : 'Risk classification',
        activeLanguage === 'pcm' ? 'Nearby facilities' : 'Nearby facilities',
        activeLanguage === 'pcm' ? 'Prevention tips' : 'Prevention tips'
      ],
      action: t.hero.doctorBtn,
      tab: 'virtual-doctor',
      gradient: 'gradient-accent'
    },
    {
      icon: Stethoscope,
      title: activeLanguage === 'pcm' ? 'Healthcare Worker' : activeLanguage === 'yo' ? 'Àwọn Òṣìṣẹ́ Ìlera' : activeLanguage === 'ha' ? 'Ma\'aikatan Lafiya' : activeLanguage === 'ig' ? 'Ndị Ọrụ Ahụike' : 'Healthcare Worker',
      description: activeLanguage === 'pcm' ? 'Clinical checklists, PPE protocols, isolation workflows, and verified guidance for frontline health personnel.' : activeLanguage === 'yo' ? 'Ìlànà aṣọ ààbò PPE, àtòjọ àyẹ̀wò kílíníkì, àti ìṣètò ìsọtọ̀ ní ilé-ìwòsàn.' : activeLanguage === 'ha' ? 'Ka\'idojin sanya kayan kariya (PPE), dabarun kebewa, da jagororin asibiti.' : activeLanguage === 'ig' ? 'Usoro uwe nchebe PPE, ndepụta nyocha ahụike, na usoro nlekọta pụrụ iche.' : 'Secure clinical checklists, infection control protocols, and verified reference guidelines for health personnel.',
      features: [
        activeLanguage === 'pcm' ? 'Triage criteria' : 'Clinical checklists',
        activeLanguage === 'pcm' ? 'PPE protocols' : 'PPE protocols',
        activeLanguage === 'pcm' ? 'Isolation steps' : 'Isolation guidance',
        activeLanguage === 'pcm' ? 'Case referral' : 'Facility referral'
      ],
      action: t.nav.prevention,
      tab: 'prevention',
      gradient: 'gradient-hero'
    },
    {
      icon: Building2,
      title: activeLanguage === 'pcm' ? 'Public Health Authority' : activeLanguage === 'yo' ? 'Àwọn Alákòóso Ìlera' : activeLanguage === 'ha' ? 'Hukumomin Lafiya' : activeLanguage === 'ig' ? 'Ndị Isi Ahụike Ọha' : 'Public Health Authority',
      description: activeLanguage === 'pcm' ? 'National surveillance analytics, points of entry screening trends, and verified CSV intelligence export.' : activeLanguage === 'yo' ? 'Àwòrán àkọsílẹ̀ orílẹ̀-èdè, àyẹ̀wò bodè, àti gbigba data CSV fún ìwádìí.' : activeLanguage === 'ha' ? 'Binciken alkaluman kasa, gwaje-gwajen kan iyaka, da sauke bayanan CSV.' : activeLanguage === 'ig' ? 'Nnyocha ọnụ ọgụgụ mba, nyocha oke ala, na nbudata data CSV.' : 'National analytics dashboard with sentinel surveillance metrics, border screening volume, and data export.',
      features: [
        activeLanguage === 'pcm' ? 'Surveillance trends' : 'Surveillance trends',
        activeLanguage === 'pcm' ? 'State matrix' : '36 States matrix',
        activeLanguage === 'pcm' ? 'Border metrics' : 'Border screening data',
        activeLanguage === 'pcm' ? 'CSV export' : 'CSV data exports'
      ],
      action: t.nav.dashboard,
      tab: 'statistics',
      gradient: 'gradient-hero'
    }
  ];

  // Organizations matching Foe in reference
  const healthOrgs = [
    {
      name: 'NCDC Nigeria',
      role: 'Nigeria Centre for Disease Control & Prevention',
      description: 'Nigeria\'s national public health institute — leads Ebola and viral haemorrhagic fever surveillance and response.',
      phone: '6232',
      website: 'https://ncdc.gov.ng',
      icon: Shield,
      color: 'from-primary/20 to-primary/5 border-primary/30',
      iconColor: 'bg-primary/20 text-primary'
    },
    {
      name: 'FMOH Nigeria',
      role: 'Federal Ministry of Health and Social Welfare',
      description: 'National health policy and regulatory institution overseeing Nigeria\'s overall epidemic preparedness and port health.',
      phone: '+234 800 9700 0010',
      website: 'https://health.gov.ng',
      icon: Building2,
      color: 'from-accent/20 to-accent/5 border-accent/30',
      iconColor: 'bg-accent/20 text-accent'
    },
    {
      name: 'WHO AFRO',
      role: 'World Health Organization — Africa Region',
      description: 'International health agency technical advisory, international vaccine deployment oversight, and global epidemiological bulletins.',
      phone: 'who.afro.int',
      website: 'https://www.afro.who.int',
      icon: Globe,
      color: 'from-success/20 to-success/5 border-success/30',
      iconColor: 'bg-success/20 text-success'
    },
    {
      name: 'NEMA Nigeria',
      role: 'National Emergency Management Agency',
      description: 'Unified national disaster response, crisis coordination, ambulance dispatch, and rapid assistance nationwide.',
      phone: '112',
      website: 'https://nema.gov.ng',
      icon: PhoneCall,
      color: 'from-destructive/20 to-destructive/5 border-destructive/30',
      iconColor: 'bg-destructive/20 text-destructive'
    },
    {
      name: 'Lagos State Ministry of Health',
      role: 'Mainland Hospital IDH Yaba Isolation Center',
      description: 'Primary referral center for infectious diseases in Southern Nigeria with 24/7 designated emergency intake.',
      phone: '08000LAGOSHEALTH',
      website: 'https://health.lagosstate.gov.ng',
      icon: HeartPulse,
      color: 'from-primary/20 to-primary/5 border-primary/30',
      iconColor: 'bg-primary/20 text-primary'
    },
    {
      name: 'Nigerian Red Cross Society',
      role: 'Emergency Medical & Community First Aid',
      description: 'Disaster response volunteers, community hygiene outreach, and clinical transport support across Nigeria.',
      phone: '+234 9 291 0612',
      website: 'https://redcrossnigeria.org',
      icon: HeartHandshake,
      color: 'from-destructive/20 to-destructive/5 border-destructive/30',
      iconColor: 'bg-destructive/20 text-destructive'
    }
  ];

  // 4 SDG pillars matching Uoe in reference
  const sdgPillars = [
    {
      icon: HeartPulse,
      title: 'Universal Health Coverage',
      description: 'Free, anonymous clinical risk assessment accessible to all citizens regardless of geography or financial background.'
    },
    {
      icon: Activity,
      title: 'Early Detection & Triage',
      description: 'AI-assisted symptom pattern recognition to guide high-risk individuals toward hospital isolation before complications escalate.'
    },
    {
      icon: Globe,
      title: 'Epidemic Preparedness',
      description: 'Structured to support subnational public health sentinel surveillance across Nigeria\'s 36 states and points of entry.'
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description: 'Verified multilingual education in English, Pidgin, Yorùbá, Hausa, and Igbo to eliminate dangerous rumors like saltwater baths.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ====================================================
          1. HERO SECTION (100% Matching Reference Ree)
          ==================================================== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Exact gradient-hero background from reference */}
        <div className="absolute inset-0 gradient-hero" />

        <div className="relative z-10 container mx-auto px-4 py-20 pt-24 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 backdrop-blur-sm border border-card/20 mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-card/90 text-xs sm:text-sm font-medium">
                {t.hero.topPill}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-card mb-5 md:mb-6 leading-[1.1] tracking-tight">
              {t.hero.headline}
              <span className="block mt-1">{t.hero.headlineHighlight}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-card/80 mb-3 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* Prominent Developer Credit matching reference format */}
            <p className="text-xl md:text-3xl font-extrabold mb-3">
              <span className="text-red-400 drop-shadow-md">
                {t.hero.developerCredit}
              </span>
            </p>

            {/* Trust Line */}
            <p className="text-card/60 text-sm md:text-base mb-8 md:mb-10">
              {t.hero.trustLine}
            </p>

            {/* Animated Start Here Pointer */}
            <div className="flex flex-col items-center mb-4">
              <span className="text-accent font-semibold text-sm sm:text-base animate-bounce mb-1">
                {t.hero.startHere}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16 px-2">
              <button
                onClick={() => onSelectTab('virtual-doctor')}
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-10 py-7 text-lg sm:text-xl shadow-[0_4px_20px_-4px_hsl(158_55%_42%/0.5)] active:scale-[0.98] transition-all ring-2 ring-accent/30 ring-offset-2 ring-offset-transparent animate-pulse-slow rounded-xl flex items-center justify-center gap-2"
              >
                <HeartPulse className="mr-2 w-6 h-6" />
                <span>{t.hero.doctorBtn}</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>

              <button
                onClick={() => onSelectTab('about-ebola')}
                className="w-full sm:w-auto bg-card/20 backdrop-blur-md border border-card/30 text-card hover:bg-card/30 px-8 py-6 text-base sm:text-lg font-semibold active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>{t.hero.learnBtn}</span>
              </button>
            </div>

            {/* 3-Column Metric Highlights under buttons */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
              <div className="text-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 sm:mb-2" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-card font-display">
                  200M+
                </div>
                <div className="text-[11px] sm:text-sm text-card/60 leading-tight mt-0.5">
                  {activeLanguage === 'pcm' ? 'Naija People Protected' : activeLanguage === 'yo' ? 'Ará Nàìjíríà' : activeLanguage === 'ha' ? 'Al\'ummar Najeriya' : activeLanguage === 'ig' ? 'Ndị Naịjirịa' : 'Nigerians Protected'}
                </div>
              </div>

              <div className="text-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 sm:mb-2" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-card font-display">
                  36 + FCT
                </div>
                <div className="text-[11px] sm:text-sm text-card/60 leading-tight mt-0.5">
                  {activeLanguage === 'pcm' ? 'State Wey We Dey Watch' : activeLanguage === 'yo' ? 'Ìpínlẹ̀ Tí A Ń Ṣọ́' : activeLanguage === 'ha' ? 'Jihohin Da Ake Kulawa' : activeLanguage === 'ig' ? 'Steeti A Na-eche' : 'States Monitored'}
                </div>
              </div>

              <div className="text-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 sm:mb-2" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-card font-display">
                  0
                </div>
                <div className="text-[11px] sm:text-sm text-card/60 leading-tight mt-0.5">
                  {t.common.zeroCases}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom smooth fade into background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ====================================================
          2. SURVEILLANCE & EPIDEMIC DATA (Matching Reference Ioe)
          ==================================================== */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.home.liveSurveillance}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              {t.statistics.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {t.statistics.subtitle}
            </p>
          </div>

          {/* 4 KPI Metric Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t.home.metrics.activeCases}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              </div>
              <div className="text-4xl font-bold font-display text-foreground font-mono mb-2">
                0
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t.home.metrics.nationalStatus}</span>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t.home.metrics.totalFatalities}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  CFR: 0.0%
                </span>
              </div>
              <div className="text-4xl font-bold font-display text-foreground font-mono mb-2">
                0
              </div>
              <div className="text-xs text-muted-foreground">
                FMOH & NCDC {t.common.official} Record
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t.home.metrics.portScreenings}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                  Vigilant
                </span>
              </div>
              <div className="text-4xl font-bold font-display text-primary font-mono mb-2">
                142,850+
              </div>
              <div className="text-xs text-muted-foreground">
                MMIA Lagos, Abuja, Kano Airports
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t.home.metrics.diagnosticLabs}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-success/10 text-success">
                  Accredited
                </span>
              </div>
              <div className="text-4xl font-bold font-display text-foreground font-mono mb-2">
                4 Labs
              </div>
              <div className="text-xs text-muted-foreground">
                NRL Gaduwa, LUTH, Irrua ISTH, UCH
              </div>
            </div>
          </div>

          {/* State-Level Surveillance Table */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{t.home.stateTableTitle}</span>
              </h3>
              <button
                onClick={() => onSelectTab('statistics')}
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>{t.common.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground">
                    <th className="py-3 px-5 font-semibold">{t.home.stateColState}</th>
                    <th className="py-3 px-5 font-semibold text-center">{t.common.status}</th>
                    <th className="py-3 px-5 font-semibold text-center">{t.home.stateColScreenings}</th>
                    <th className="py-3 px-5 font-semibold text-left">{t.home.stateColStatus}</th>
                    <th className="py-3 px-5 font-semibold text-right">{t.home.stateColRisk}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {hotspotStates.map((st) => (
                    <tr key={st.state} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-foreground font-display">{st.state}</td>
                      <td className="py-3.5 px-5 text-center font-mono font-semibold">{st.cases}</td>
                      <td className="py-3.5 px-5 text-center font-mono text-muted-foreground">{st.screenings}</td>
                      <td className="py-3.5 px-5 text-muted-foreground">{st.status}</td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {st.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. INTERACTIVE HOTSPOT MAP & READINESS (Matching Reference $oe)
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
              <Activity className="w-4 h-4" />
              <span>Interactive Outbreak Map & State Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3">
              Nigeria Ebola Surveillance & Readiness Map
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Tap any hotspot or state to inspect sentinel diagnostic capacity, isolation units, and port health vigilance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: State Grid */}
            <div className="lg:col-span-8 rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs text-muted-foreground">
                <span>Select a jurisdiction to inspect hospital & sentinel status:</span>
                <span className="text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>36 States + FCT Active</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {[
                  { name: 'Lagos', hub: 'Mainland Hospital IDH Yaba', screenings: '68k+' },
                  { name: 'FCT (Abuja)', hub: 'NCDC National Reference Lab', screenings: '42k+' },
                  { name: 'Kano', hub: 'AKTH Infectious Isolation Unit', screenings: '18k+' },
                  { name: 'Rivers', hub: 'UPTH Port Harcourt', screenings: '8k+' },
                  { name: 'Oyo', hub: 'UCH Ibadan Viral Laboratory', screenings: '3k+' },
                  { name: 'Edo', hub: 'Irrua Specialist Teaching Hospital', screenings: '2k+' },
                  { name: 'Enugu', hub: 'UNTH Ituku-Ozalla', screenings: '1k+' },
                  { name: 'Kaduna', hub: 'ABUTH Zaria Referral Centre', screenings: '1k+' },
                  { name: 'Borno', hub: 'UMTH Rapid Response Team', screenings: '1k+' },
                  { name: 'Plateau', hub: 'JUTH Lamingo Complex', screenings: '1k+' },
                  { name: 'Delta', hub: 'FMC Asaba Isolation', screenings: '1k+' },
                  { name: 'Ogun', hub: 'OOUTH Sagamu VHF Unit', screenings: '1k+' }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedMapState(item.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedMapState === item.name
                        ? 'bg-primary/10 border-primary text-primary shadow-xs font-semibold'
                        : 'bg-background hover:bg-secondary border-border text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold truncate font-display">{item.name}</span>
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    </div>
                    <span className="text-[10px] text-muted-foreground block truncate">{item.hub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: State Profile Card */}
            <div className="lg:col-span-4 rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    State Health Profile
                  </span>
                  <h3 className="text-2xl font-bold font-display text-foreground">{selectedMapState}</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                  {t.common.lowRisk}
                </span>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <strong className="text-foreground block text-sm">Designated Treatment Facility:</strong>
                  <span className="text-foreground font-medium">
                    {selectedMapState === 'Lagos'
                      ? 'Mainland Hospital (IDH) Yaba, Harvey Road'
                      : selectedMapState === 'FCT (Abuja)'
                      ? 'NCDC National Reference Lab, Gaduwa'
                      : `${selectedMapState} State Isolation & Infectious Care Centre`}
                  </span>
                </div>

                <div>
                  <strong className="text-foreground block text-sm">Sentinel Diagnostic Assay:</strong>
                  <span>Real-time RT-PCR Filovirus surveillance & specimen transport link active</span>
                </div>

                <div>
                  <strong className="text-foreground block text-sm">Emergency Dispatch:</strong>
                  <a href="tel:6232" className="text-primary font-bold hover:underline font-mono text-base block mt-0.5">
                    6232 (NCDC Toll-Free)
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('find-help')}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{t.nav.facilities} ({selectedMapState})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. CORE PLATFORM FEATURES (Matching Reference Loe)
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              Designed for Epidemic Preparedness
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end intelligence tools designed for early detection, community safety, and outbreak response across Nigeria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  onClick={() => onSelectTab(feat.tab)}
                  className="group hover:shadow-md transition-all duration-300 border border-border/40 rounded-xl h-full bg-card p-5 md:p-6 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${feat.color} flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-lg font-semibold font-display mb-2 text-foreground group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/30 flex items-center text-xs font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{t.common.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. DESIGNED FOR EVERY STAKEHOLDER (Matching Reference Boe)
          ==================================================== */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Designed for Every Stakeholder
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Role-based access ensures the right tools reach the right people, from Nigerian communities to frontline health workers and national agencies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-foreground">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-foreground font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => onSelectTab(s.tab)}
                      className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-sm transition-all active:scale-[0.98] ${
                        s.gradient === 'gradient-accent'
                          ? 'bg-accent hover:bg-accent/90'
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      {s.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. NIGERIA HEALTH ORGANISATIONS & CONTACTS (Matching Reference zoe)
          ==================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <PhoneCall className="w-4 h-4" />
              <span>Emergency & Support Contacts</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Nigeria Health Organisations & Contacts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key organisations leading epidemic prevention and response across Nigeria. Reach out for guidance, reporting, or emergencies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {healthOrgs.map((org) => {
              const Icon = org.icon;
              return (
                <div
                  key={org.name}
                  className={`bg-gradient-to-br ${org.color} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl ${org.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-display font-bold text-foreground">
                          {org.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {org.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                      {org.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs font-semibold">
                    <a
                      href={org.phone.startsWith('http') ? org.phone : `tel:${org.phone}`}
                      className="text-primary hover:underline font-mono"
                    >
                      {org.phone}
                    </a>
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. DIRECT OUTBREAK ALERT SUBSCRIPTION (Matching Reference Eae)
          ==================================================== */}
      <section className="py-16 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-xl border border-accent/30 shadow-lg max-w-lg mx-auto bg-card p-6 sm:p-8">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-accent animate-pulse" />
            </div>

            <h3 className="text-xl font-display font-bold mb-2 text-center text-foreground">
              {t.home.newsletterTitle}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm text-center mb-6">
              {t.home.newsletterDesc}
            </p>

            {subSuccess ? (
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-center space-y-2">
                <Check className="w-6 h-6 text-accent mx-auto" />
                <h4 className="font-bold text-foreground text-sm">
                  {t.home.subscribedSuccess}
                </h4>
                <p className="text-xs text-muted-foreground">
                  You will receive real-time notifications for {subState} state.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex rounded-xl bg-secondary p-1">
                  <button
                    type="button"
                    onClick={() => setSubType('sms')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      subType === 'sms' ? 'bg-card text-foreground shadow-xs font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    {t.home.smsTab}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubType('whatsapp')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      subType === 'whatsapp' ? 'bg-card text-foreground shadow-xs font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    {t.home.whatsappTab}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
                      {t.home.stateColState}
                    </label>
                    <select
                      value={subState}
                      onChange={(e) => setSubState(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {['Lagos', 'Abuja (FCT)', 'Kano', 'Rivers', 'Oyo', 'Edo', 'Enugu', 'Kaduna', 'All Nigeria'].map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
                      {activeLanguage === 'pcm' ? 'Phone Number' : activeLanguage === 'yo' ? 'Nọ́mbà Fóònù' : activeLanguage === 'ha' ? 'Lambar Waya' : activeLanguage === 'ig' ? 'Akara Ekwentị' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder={t.home.phonePlaceholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingAlert}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm transition-all shadow-xs disabled:opacity-50"
                >
                  {isSubmittingAlert ? t.common.submitting : t.home.subscribeBtn}
                </button>

                <p className="text-[11px] text-muted-foreground text-center">
                  {t.home.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. UN SUSTAINABLE DEVELOPMENT GOAL 3 (Matching Reference Uoe)
          ==================================================== */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <span>{t.home.sdgTitle}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
                Aligned with <span className="text-primary">SDG 3:</span> Good Health and Well-being
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t.home.sdgDesc}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {sdgPillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="p-4 rounded-xl border border-border/50 bg-card">
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <h4 className="text-sm font-bold text-foreground font-display mb-1">{p.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Target 3.3 & 3.d</span>
                <span className="text-xs font-semibold text-accent flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Framework</span>
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-xs">3.3</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">End Epidemics of Neglected Diseases</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">Strengthening early warning systems for Filovirus and viral haemorrhagic fever outbreaks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-xs">3.8</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Universal Health Coverage</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">Providing free clinical AI risk evaluation for remote and hard-to-reach Nigerian communities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-xs">3.d</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Early Warning & National Risk Reduction</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">Empowering citizens and frontline clinicians with official NCDC protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
