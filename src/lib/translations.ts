import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  developerCredit: string;
  common: {
    emergencyCallText: string;
    hotline: string;
    altHotline: string;
    readMore: string;
    learnMore: string;
    viewDetails: string;
    close: string;
    cancel: string;
    submit: string;
    search: string;
    filter: string;
    all: string;
    loading: string;
    submitting: string;
    thinking: string;
    success: string;
    error: string;
    clear: string;
    back: string;
    download: string;
    share: string;
    copyLink: string;
    verified: string;
    official: string;
    lowRisk: string;
    highRisk: string;
    zeroCases: string;
    days: string;
    status: string;
    source: string;
    location: string;
    date: string;
    emergency: string;
  };
  nav: {
    home: string;
    riskAssessment: string;
    prevention: string;
    about: string;
    updates: string;
    dashboard: string;
    facilities: string;
    emergency: string;
    resources: string;
    faq: string;
    aboutUs: string;
    contact: string;
    admin: string;
    staff: string;
    getGuidance: string;
    signIn?: string;
    createAccount?: string;
    account?: string;
  };
  alert: {
    officialBadge: string;
    source: string;
    verifiedOn: string;
    readFullBrief: string;
    dismiss: string;
    locationLabel: string;
    publishedLabel: string;
  };
  hero: {
    topPill: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    developerCredit: string;
    trustLine: string;
    startHere: string;
    doctorBtn: string;
    updatesBtn: string;
    learnBtn: string;
  };
  cards: {
    understand: string;
    understandDesc: string;
    symptoms: string;
    symptomsDesc: string;
    prevention: string;
    preventionDesc: string;
    guidance: string;
    guidanceDesc: string;
  };
  home: {
    liveSurveillance: string;
    metrics: {
      activeCases: string;
      totalFatalities: string;
      portScreenings: string;
      diagnosticLabs: string;
      nationalStatus: string;
      borderStatus: string;
      activeCasesUnit: string;
      fatalitiesUnit: string;
      labsUnit: string;
      verifiedDate: string;
    };
    stateTableTitle: string;
    stateTableSubtitle: string;
    stateColState: string;
    stateColScreenings: string;
    stateColStatus: string;
    stateColRisk: string;
    stateSearchPlaceholder: string;
    newsletterTitle: string;
    newsletterDesc: string;
    smsTab: string;
    whatsappTab: string;
    phonePlaceholder: string;
    subscribeBtn: string;
    subscribedSuccess: string;
    privacyNote: string;
    sdgTitle: string;
    sdgDesc: string;
  };
  aboutEbola: {
    badge: string;
    title: string;
    subtitle: string;
    whatIsTitle: string;
    whatIsText: string;
    transmissionTitle: string;
    transmissionDirect: string;
    transmissionNotAir: string;
    transmissionBushmeat: string;
    transmissionBurials: string;
    speciesTitle: string;
    incubationTitle: string;
    incubationText: string;
  };
  symptoms: {
    badge: string;
    title: string;
    subtitle: string;
    earlyTitle: string;
    earlyDesc: string;
    gastroTitle: string;
    gastroDesc: string;
    severeTitle: string;
    severeDesc: string;
    checkerTitle: string;
    checkerInstruction: string;
    exposureQuestion: string;
    urgentWarning: string;
    callAheadReminder: string;
    feverLabel: string;
    fatigueLabel: string;
    headacheLabel: string;
    musclePainLabel: string;
    soreThroatLabel: string;
    vomitingLabel: string;
    diarrheaLabel: string;
    abdominalPainLabel: string;
    bleedingLabel: string;
  };
  prevention: {
    badge: string;
    title: string;
    subtitle: string;
    roleWarningTitle: string;
    roleWarningText: string;
    tabPublic: string;
    tabHealthcare: string;
    tabBurial: string;
    handwashingTitle: string;
    handwashingText: string;
    foodSafetyTitle: string;
    foodSafetyText: string;
    dosListTitle: string;
    dontsListTitle: string;
    saltMythTitle: string;
    saltMythText: string;
  };
  updates: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    filterAnnouncements: string;
    filterAdvisories: string;
    filterGuidelines: string;
    modalTitle: string;
    verifiedStamp: string;
    viewSource: string;
  };
  statistics: {
    badge: string;
    title: string;
    subtitle: string;
    geoFilter: string;
    timeframeFilter: string;
    downloadBtn: string;
    activeCasesTitle: string;
    fatalitiesTitle: string;
    screeningsTitle: string;
    labsTitle: string;
    trendTitle: string;
    stateSurveillanceTitle: string;
  };
  emergencyHelp: {
    badge: string;
    title: string;
    subtitle: string;
    nationalCentre: string;
    ncdcHotlineTitle: string;
    ncdcHotlineDesc: string;
    altHotlineLabel: string;
    smsDeskLabel: string;
    callAheadTitle: string;
    callAheadWarning: string;
    step1: string;
    step2: string;
    step3: string;
    nemaTitle: string;
    nemaDesc: string;
    nemaBtn: string;
    lagosTitle: string;
    lagosDesc: string;
    redCrossTitle: string;
    redCrossDesc: string;
    viewDirectoryBtn: string;
  };
  virtualDoctor: {
    badge: string;
    title: string;
    subtitle: string;
    welcomeHeader: string;
    welcomeText: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    startBtn: string;
    formTitle: string;
    concernLabel: string;
    concernPlaceholder: string;
    voiceInputBtn: string;
    voiceListening: string;
    symptomsLabel: string;
    durationLabel: string;
    exposureLabel: string;
    bleedingLabel: string;
    breathingLabel: string;
    consciousnessLabel: string;
    ageLabel: string;
    stateLabel: string;
    adult: string;
    child: string;
    elderly: string;
    submitTriageBtn: string;
    analyzingText: string;
    resultTitle: string;
    listenBtn: string;
    stopListenBtn: string;
    level1Title: string;
    level2Title: string;
    level3Title: string;
    callAheadNotice: string;
    newConsultationBtn: string;
    validationError?: string;
    editAnswersBtn?: string;
    consultationError?: string;
    symptomSelectedCount?: string;
  };
  assistant: {
    badge: string;
    title: string;
    subtitle: string;
    greeting: string;
    inputPlaceholder: string;
    sendBtn: string;
    thinking: string;
    suggestedHeader: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    fullCheckerBtn: string;
    disclaimer: string;
  };
  findHelp: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    stateFilterAll: string;
    emergencyDesk: string;
    officialPortal: string;
    website: string;
    verifiedOn: string;
    noFacilityTitle: string;
    noFacilityDesc: string;
    callNcdcDispatch: string;
  };
  resources: {
    badge: string;
    title: string;
    subtitle: string;
    langFilterAll: string;
    downloadMaterialBtn: string;
    downloadedSuccess: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    catAll: string;
    catBasics: string;
    catTransmission: string;
    catPrevention: string;
    catMedical: string;
    catMyths: string;
    calloutTitle: string;
    calloutDesc: string;
    callNcdcBtn: string;
  };
  aboutUs: {
    badge: string;
    title: string;
    subtitle: string;
    devCreditBadge: string;
    devCreditTitle: string;
    devCreditDesc: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    tabMisinformation: string;
    tabFeedback: string;
    categoryLabel: string;
    catFakeCure: string;
    catFalseDeath: string;
    catHiddenCase: string;
    catOther: string;
    sourceUrlLabel: string;
    sourceUrlPlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    submitReportBtn: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendFeedbackBtn: string;
    emergencyWarning: string;
  };
  admin: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    loginBtn: string;
    demoNote: string;
    logoutBtn: string;
    tabOverview: string;
    tabArticles: string;
    tabUpdates: string;
    tabStatistics: string;
    tabSources: string;
    tabReports: string;
    tabHealth: string;
  };
  footer: {
    brandDescription: string;
    builtWithPurpose: string;
    platformHeader: string;
    legalHeader: string;
    privacyPolicy: string;
    termsOfService: string;
    clinicalEthics: string;
    emergencyContacts: string;
    reportMisinfo: string;
    developerCredit: string;
    copyright: string;
    sdgLabel: string;
  };
  privacy: {
    badge: string;
    title: string;
    subtitle: string;
    introTitle: string;
    introText: string;
    anonTitle: string;
    anonText: string;
    noSaleTitle: string;
    noSaleText: string;
    serverSecurityTitle: string;
    serverSecurityText: string;
    retentionTitle: string;
    retentionText: string;
  };
  terms: {
    badge: string;
    title: string;
    subtitle: string;
    term1Title: string;
    term1Text: string;
    term2Title: string;
    term2Text: string;
    term3Title: string;
    term3Text: string;
    term4Title: string;
    term4Text: string;
  };
  disclaimer: {
    short: string;
    emergencyCall: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    createAccount: string;
    myAccount: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    forgotPasswordLink: string;
    rememberMe: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    signInTitle: string;
    signInSubtitle: string;
    signUpTitle: string;
    signUpSubtitle: string;
    forgotTitle: string;
    forgotSubtitle: string;
    resetPasswordBtn: string;
    backToSignIn: string;
    showPassword: string;
    hidePassword: string;
    passwordRequirements: string;
    passwordMatchError: string;
    passwordLengthError: string;
    emailRequiredError: string;
    nameRequiredError: string;
    registrationSuccess: string;
    emailConfirmNotice: string;
    resetEmailSent: string;
    publicNotice: string;
    accountTitle: string;
    accountSubtitle: string;
    editProfile: string;
    saveChanges: string;
    saving: string;
    profileUpdated: string;
    phoneLabel: string;
    stateLabel: string;
    memberSince: string;
    securitySettings: string;
    verifiedAccount: string;
    alertPreferences: string;
    smsAlerts: string;
    emailAlerts: string;
    emergencyQuickLinks: string;
    viewAssessments: string;
    facilityDirectory: string;
    outbreakFeed: string;
    loginRequiredTitle: string;
    loginRequiredDesc: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  // ==========================================
  // ENGLISH (en)
  // ==========================================
  en: {
    brandName: 'EbolaGuard NG',
    tagline: 'Verified Information. Early Awareness. Safer Communities.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    common: {
      emergencyCallText: 'Call NCDC Toll-Free 6232',
      hotline: '6232',
      altHotline: '+234 800 9700 0010',
      readMore: 'Read Full Brief',
      learnMore: 'Learn More',
      viewDetails: 'View Details',
      close: 'Close',
      cancel: 'Cancel',
      submit: 'Submit',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      loading: 'Loading...',
      submitting: 'Submitting...',
      thinking: 'Thinking...',
      success: 'Success',
      error: 'Error',
      clear: 'Clear',
      back: 'Back',
      download: 'Download',
      share: 'Share',
      copyLink: 'Copy Link',
      verified: 'Verified',
      official: 'Official',
      lowRisk: 'Low Risk',
      highRisk: 'High Risk',
      zeroCases: '0 Confirmed Cases',
      days: 'Days',
      status: 'Status',
      source: 'Source',
      location: 'Location',
      date: 'Date',
      emergency: 'Emergency'
    },
    nav: {
      home: 'Home',
      riskAssessment: 'Risk Assessment',
      prevention: 'Prevention',
      about: 'About Ebola',
      updates: 'Outbreak Updates',
      dashboard: 'Dashboard',
      facilities: 'Facilities',
      emergency: 'Emergency',
      resources: 'Awareness Resources',
      faq: 'FAQ',
      aboutUs: 'About Us',
      contact: 'Report / Contact',
      admin: 'Admin Portal',
      staff: 'Staff',
      getGuidance: 'Get Health Guidance',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      account: 'My Account'
    },
    alert: {
      officialBadge: 'Official Public Health Status',
      source: 'Source: Nigeria Centre for Disease Control (NCDC)',
      verifiedOn: 'Verified: October 2026',
      readFullBrief: 'Read Full Brief',
      dismiss: 'Dismiss notice',
      locationLabel: 'Location',
      publishedLabel: 'Published'
    },
    hero: {
      topPill: 'SDG 3 Aligned · AI-Powered · Privacy-First',
      headline: 'Protecting Nigeria from',
      headlineHighlight: 'Ebola & Epidemic Diseases',
      subheadline: 'AI-powered early risk detection, outbreak intelligence, and prevention support to protect Nigerian communities from Ebola virus disease and other epidemic threats.',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      trustLine: 'Grounded in NCDC & WHO Protocols · Zero Personal Data Retained',
      startHere: '👇 Start Here',
      doctorBtn: 'Talk to Virtual Doctor',
      updatesBtn: 'View Official Updates',
      learnBtn: 'Learn Prevention'
    },
    cards: {
      understand: 'Understand Ebola',
      understandDesc: 'Species differences, clinical transmission mechanisms, and incubation timelines.',
      symptoms: 'Recognise the Symptoms',
      symptomsDesc: 'Early non-specific signs, gastrointestinal progression, and urgent warning signals.',
      prevention: 'Learn Prevention Measures',
      preventionDesc: 'Hygiene protocols, safe caregiving practices, and dignified burial precautions.',
      guidance: 'Find Official Guidance',
      guidanceDesc: '36 States + FCT emergency directories, NCDC toll-free 6232, and verified hotlines.'
    },
    home: {
      liveSurveillance: 'Epidemiological Surveillance',
      metrics: {
        activeCases: 'Active Confirmed Cases (Nigeria)',
        totalFatalities: 'Total Fatalities (Nigeria)',
        portScreenings: 'Border & Port Screenings',
        diagnosticLabs: 'Accredited Molecular Labs',
        nationalStatus: 'Current Status: Zero confirmed cases in 2026',
        borderStatus: 'Intensive screening active at MMIA, Abuja & seaports',
        activeCasesUnit: 'active cases',
        fatalitiesUnit: 'fatalities',
        labsUnit: 'regional labs',
        verifiedDate: 'NCDC Verified: October 2026'
      },
      stateTableTitle: 'National Surveillance by State & Entry Point',
      stateTableSubtitle: 'Real-time status across Nigerian state epidemiologist desks and port health authorities.',
      stateColState: 'State / Territory',
      stateColScreenings: 'Screenings Conducted',
      stateColStatus: 'Surveillance Status',
      stateColRisk: 'Risk Level',
      stateSearchPlaceholder: 'Filter state or entry point...',
      newsletterTitle: 'Get Verified Epidemic Alerts',
      newsletterDesc: 'Direct emergency SMS or WhatsApp alerts if official disease alerts are issued by NCDC.',
      smsTab: 'SMS Alerts',
      whatsappTab: 'WhatsApp Alerts',
      phonePlaceholder: 'Enter your phone number (e.g. 0803 123 4567)...',
      subscribeBtn: 'Subscribe for Free Alerts',
      subscribedSuccess: 'Thank you! You will receive verified public health alerts.',
      privacyNote: 'Your contact details are strictly kept private and never shared.',
      sdgTitle: 'Sustainable Development Goal 3',
      sdgDesc: 'Ensuring healthy lives and promoting well-being for all Nigerians through verified digital disease surveillance.'
    },
    aboutEbola: {
      badge: 'Official Public Health Intelligence',
      title: 'Understanding Ebola Virus Disease (EVD)',
      subtitle: 'Evidence-based insights into transmission, species variants, historical context, and Nigerian preparedness.',
      whatIsTitle: 'What is Ebola Virus Disease?',
      whatIsText: 'Ebola virus disease is a rare but severe and often fatal illness in humans. The virus was first identified in 1976 near the Ebola River in what is now the Democratic Republic of the Congo.',
      transmissionTitle: 'How the Virus Spreads',
      transmissionDirect: 'Direct Contact: Contact through broken skin or mucous membranes with blood, vomit, saliva, urine, or bodily fluids of a sick or deceased person.',
      transmissionNotAir: 'NOT Airborne: Ebola is NOT spread through ordinary air like the common flu or COVID-19. It requires direct physical contact with infected bodily fluids.',
      transmissionBushmeat: 'Bushmeat & Animal Contact: Handling sick or dead forest animals (fruit bats, chimpanzees, monkeys) or butchering uninspected bushmeat.',
      transmissionBurials: 'Unsafe Burials: Direct contact with the bodies of persons who died of Ebola is one of the highest transmission hazards.',
      speciesTitle: 'The Six Identified Ebolavirus Species',
      incubationTitle: 'Incubation Timeline (2 to 21 Days)',
      incubationText: 'A person infected with Ebola CANNOT spread the virus to others until they develop symptoms. The incubation period ranges from 2 to 21 days (most commonly 8 to 10 days).'
    },
    symptoms: {
      badge: 'Clinical Symptomatology & Exposure Guide',
      title: 'Symptoms and Exposure Assessment',
      subtitle: 'Learn how Ebola manifestations progress, why laboratory confirmation is vital, and what immediate steps to take if potential exposure has occurred.',
      earlyTitle: 'Phase 1: Early Manifestations (Days 1–3)',
      earlyDesc: 'Sudden onset fever, profound fatigue, frontal headache, and diffuse muscle aches. These early signs easily mimic malaria and typhoid.',
      gastroTitle: 'Phase 2: Gastrointestinal Progression (Days 4–7)',
      gastroDesc: 'Severe watery diarrhoea, frequent vomiting, severe abdominal pain, and loss of appetite causing rapid fluid depletion.',
      severeTitle: 'Phase 3: Severe Complications (Days 7+)',
      severeDesc: 'Unexplained bleeding (gums, eyes, stool, vomit), internal organ failure, confusion, and shock. Requires immediate specialized intensive isolation.',
      checkerTitle: 'Interactive Clinical Symptom Checklist',
      checkerInstruction: 'Select any symptoms currently being experienced for an educational overview:',
      exposureQuestion: 'Have you had direct contact with an acutely sick person or travelled to an active outbreak region in the past 21 days?',
      urgentWarning: 'Important Medical Safety Notice: Early symptoms mimic malaria. NEVER self-medicate with unverified concoctions. Contact NCDC 6232 for guidance.',
      callAheadReminder: 'Call-Ahead Protocol: Always telephone the healthcare facility before arriving so medical staff can prepare safe protective gear.',
      feverLabel: 'Sudden High Fever (>38°C / 100.4°F)',
      fatigueLabel: 'Severe Weakness / Exhaustion',
      headacheLabel: 'Intense Severe Headache',
      musclePainLabel: 'Muscle Aches & Joint Pain',
      soreThroatLabel: 'Sore Throat / Painful Swallowing',
      vomitingLabel: 'Persistent Vomiting & Nausea',
      diarrheaLabel: 'Severe Watery Diarrhoea',
      abdominalPainLabel: 'Acute Abdominal Cramps',
      bleedingLabel: 'Unexplained Bleeding or Bruising'
    },
    prevention: {
      badge: 'Evidence-Based Infection Control Protocol',
      title: 'Ebola Prevention & Community Protection',
      subtitle: 'Comprehensive, actionable hygiene measures, safe caregiving principles, healthcare worker precautions, and safe burial practices grounded in Nigerian public health directives.',
      roleWarningTitle: 'Critical Safety Distinction: General Public vs. Trained Professionals',
      roleWarningText: 'Ordinary visitors and community members should NEVER attempt to handle medical waste, disinfect heavily contaminated bedding, or wash the remains of someone suspected of having died from a haemorrhagic fever.',
      tabPublic: 'General Public Protocols',
      tabHealthcare: 'Healthcare Worker Precautions',
      tabBurial: 'Safe & Dignified Burials',
      handwashingTitle: 'Hand Hygiene Protocol',
      handwashingText: 'Wash hands thoroughly with soap and clean running water for at least 30 seconds, or use an alcohol-based hand rub with at least 60% alcohol.',
      foodSafetyTitle: 'Food & Meat Safety',
      foodSafetyText: 'Avoid handling sick bats, monkeys, or forest rodents. Cook all meats and animal products thoroughly to high temperatures.',
      dosListTitle: 'Key DOs (Recommended Practices)',
      dontsListTitle: 'Key DONTs (Hazardous Practices)',
      saltMythTitle: 'Bathing in Saltwater is Ineffective & Dangerous',
      saltMythText: 'Drinking or bathing in concentrated saltwater does NOT prevent or cure Ebola and has caused fatalities from extreme sodium poisoning.'
    },
    updates: {
      badge: 'Real-time Public Health Surveillance Feed',
      title: 'Verified Outbreak Updates & Advisories',
      subtitle: 'Official epidemiological announcements, border screenings, and health ministry directives verified directly against NCDC and WHO.',
      searchPlaceholder: 'Search official updates by title, location, or agency...',
      filterAll: 'All Updates',
      filterAnnouncements: 'Announcements',
      filterAdvisories: 'Advisories',
      filterGuidelines: 'Guidelines',
      modalTitle: 'Official Public Health Brief',
      verifiedStamp: 'NCDC / WHO Verified Record',
      viewSource: 'Visit Official Source'
    },
    statistics: {
      badge: 'Epidemiological Intelligence & Surveillance Dashboard',
      title: 'Outbreak Statistics & Surveillance',
      subtitle: 'Grounded epidemiological metrics strictly sourced from the Nigeria Centre for Disease Control (NCDC) and the World Health Organization.',
      geoFilter: 'Geographic Filter',
      timeframeFilter: 'Surveillance Cycle',
      downloadBtn: 'Download Verified CSV Dataset',
      activeCasesTitle: 'Active Confirmed Cases (Nigeria)',
      fatalitiesTitle: 'Total Fatalities (Nigeria)',
      screeningsTitle: 'Border Screenings',
      labsTitle: 'Accredited Diagnostic Labs',
      trendTitle: 'Surveillance Screenings Trend (2026)',
      stateSurveillanceTitle: 'Surveillance by Nigerian State'
    },
    emergencyHelp: {
      badge: 'Immediate Public Health Crisis Dispatch',
      title: 'Emergency Assistance & Response',
      subtitle: 'Direct emergency hotlines for the Nigeria Centre for Disease Control and Prevention (NCDC), State Rapid Response Teams, and national emergency ambulance lines.',
      nationalCentre: 'National Emergency Operations Centre',
      ncdcHotlineTitle: 'NCDC Toll-Free Emergency Hotline',
      ncdcHotlineDesc: 'Free call 24 hours a day, 7 days a week from MTN, Airtel, Glo, and 9mobile.',
      altHotlineLabel: 'Alternative Hotline:',
      smsDeskLabel: 'Official SMS Desk:',
      callAheadTitle: 'The Mandatory "Call-Ahead" Protocol',
      callAheadWarning: 'If you or someone in your home has a sudden high fever accompanied by severe vomiting, diarrhoea, or unexplained bleeding, DO NOT travel directly to an outpatient clinic or emergency ward unannounced.',
      step1: '1. Call the hospital before leaving home: Inform the triage desk that you are arriving with symptoms of viral haemorrhagic illness.',
      step2: '2. Allow clinical staff to prepare: Healthcare workers must don specialized Personal Protective Equipment (PPE) to ensure safe intake without exposing other patients in waiting areas.',
      step3: '3. Avoid public commercial transport: Never use crowded public buses or shared taxis. Ask NCDC or the hospital if designated emergency medical transport can be dispatched.',
      nemaTitle: 'National Emergency (NEMA)',
      nemaDesc: 'Police, fire, and ambulance unified nationwide hotline.',
      nemaBtn: 'Dial 112',
      lagosTitle: 'Lagos Ministry of Health',
      lagosDesc: 'Mainland Hospital IDH Yaba & Emergency Response.',
      redCrossTitle: 'Nigerian Red Cross Society',
      redCrossDesc: 'Community first aid and disaster medical dispatch.',
      viewDirectoryBtn: 'View All 36 States Directory →'
    },
    virtualDoctor: {
      badge: 'AI-Powered Assessment & Virtual Doctor',
      title: 'AI-Powered Risk Assessment',
      subtitle: 'Answer a few questions about your symptoms and exposure history to receive personalized risk guidance — designed for communities across Nigeria.',
      welcomeHeader: 'Welcome Message & Transparency Notice',
      welcomeText: "Hello. I'm the EbolaGuard Virtual Doctor, an AI health assistant. I can help you understand your symptoms, provide general health guidance, and identify when you need medical attention. I cannot confirm a diagnosis or replace a licensed healthcare professional. If you may be experiencing a medical emergency, seek emergency help immediately.",
      step1Title: '1. Describe Symptoms',
      step1Desc: 'Input fever duration, weakness, and potential exposure context.',
      step2Title: '2. Safety Triage',
      step2Desc: 'Categorizes cases into Level 1 (General), Level 2 (Clinic), or Level 3 (Emergency).',
      step3Title: '3. Safe Guidance',
      step3Desc: 'Receive call-ahead instructions, hydration tips, and nearest hospital contacts.',
      startBtn: 'Start Risk Assessment',
      formTitle: 'Triage Assessment Questionnaire',
      concernLabel: 'Describe what you or the patient are experiencing in your own words:',
      concernPlaceholder: 'E.g., I have had a high fever for 2 days with severe headache, vomiting, and fatigue...',
      voiceInputBtn: 'Voice Input',
      voiceListening: 'Listening... speak clearly into your microphone',
      symptomsLabel: 'Select all symptoms currently present:',
      durationLabel: 'How many days have symptoms lasted?',
      exposureLabel: 'Known exposure to anyone suspected of Ebola or recent travel to an active outbreak area?',
      bleedingLabel: 'Any unexplained bleeding (from gums, nose, eyes, vomit, or stool)?',
      breathingLabel: 'Any severe shortness of breath or respiratory distress?',
      consciousnessLabel: 'Any confusion, loss of consciousness, or seizures?',
      ageLabel: 'Age Category:',
      stateLabel: 'Current Nigerian State / Location:',
      adult: 'Adult (18–64)',
      child: 'Child (under 18)',
      elderly: 'Elderly (65+)',
      submitTriageBtn: 'Evaluate Risk & Get Clinical Guidance',
      analyzingText: 'Analyzing symptoms according to NCDC & WHO triage protocols...',
      resultTitle: 'Your Triage Assessment Result',
      listenBtn: 'Listen to Audio Guidance',
      stopListenBtn: 'Stop Audio',
      level1Title: 'Level 1: General Home Care & Monitoring',
      level2Title: 'Level 2: Prompt Primary Healthcare Assessment',
      level3Title: 'Level 3: Immediate Emergency Medical Guidance',
      callAheadNotice: 'MANDATORY CALL-AHEAD NOTICE: Before going to any hospital, call NCDC Toll-Free 6232 so the isolation team can prepare safe reception.',
      newConsultationBtn: 'Start New Assessment',
      validationError: 'Please describe your symptoms in the box or select at least one symptom from the list below.',
      editAnswersBtn: 'Review & Edit Answers',
      consultationError: 'Unable to connect to the online triage engine. Your entered information is preserved, and a local public health assessment has been generated below.',
      symptomSelectedCount: 'symptoms selected'
    },
    assistant: {
      badge: 'AI Health Education Guide (Powered by Gemini)',
      title: 'AI Health Education Assistant',
      subtitle: 'Ask questions about Ebola facts, transmission, myth-busting, and official Nigerian health directives.',
      greeting: "Hello! I am the EbolaGuard NG AI Health Education Assistant. I can answer your questions about Ebola Virus Disease, transmission facts, vaccines, and official Nigerian public health directives.\n\n*Important:* I am an educational guide. I cannot diagnose medical conditions or prescribe drugs. How can I help you understand Ebola today?",
      inputPlaceholder: 'Ask a public health question (e.g., Is saltwater protective? What are early signs?)...',
      sendBtn: 'Send',
      thinking: 'Thinking...',
      suggestedHeader: 'Suggested Inquiries:',
      q1: 'Is there any active Ebola outbreak currently in Nigeria?',
      q2: 'Can drinking or bathing in saltwater protect against Ebola?',
      q3: 'Is Ebola an airborne virus like COVID-19 or flu?',
      q4: 'What approved vaccines and treatments exist for Ebola?',
      fullCheckerBtn: 'Full Risk Checker',
      disclaimer: 'EbolaGuard NG provides verified public health education. It does not replace a licensed clinical medical doctor.'
    },
    findHelp: {
      badge: 'Verified Healthcare Facilities & Isolation Centres',
      title: 'Find Verified Healthcare Services in Nigeria',
      subtitle: 'Directory of verified tertiary teaching hospitals, federal medical centres, and state viral haemorrhagic isolation facilities across all 36 Nigerian States and the Federal Capital Territory.',
      searchPlaceholder: 'Search hospitals by name, city, or address...',
      stateFilterAll: 'All Nigerian States',
      emergencyDesk: 'Verified Emergency Desk:',
      officialPortal: 'Official Portal:',
      website: 'Website',
      verifiedOn: 'Verified:',
      noFacilityTitle: 'No specific facility record found for selected state.',
      noFacilityDesc: 'Every state in Nigeria has an active State Epidemiologist and Ministry of Health rapid response team coordinated through the Federal NCDC desk.',
      callNcdcDispatch: 'Call NCDC Toll-Free 6232 for State Dispatch'
    },
    resources: {
      badge: 'Multilingual Community Awareness Repository',
      title: 'Approved Awareness Resources & Handouts',
      subtitle: 'Download, print, and distribute official public health posters and factsheets across English, Nigerian Pidgin, Yorùbá, Hausa, and Igbo.',
      langFilterAll: 'All Languages',
      downloadMaterialBtn: 'Download Material',
      downloadedSuccess: 'File downloaded successfully!'
    },
    faq: {
      badge: 'Verified Public Health Inquiries',
      title: 'Frequently Asked Questions',
      subtitle: 'Clear, evidence-based answers to the most common questions Nigerians ask regarding Ebola transmission, home prevention, treatments, and vaccines.',
      searchPlaceholder: 'Search questions (e.g. saltwater, transmission, vaccine)...',
      catAll: 'All Questions',
      catBasics: 'Basics',
      catTransmission: 'Transmission',
      catPrevention: 'Prevention',
      catMedical: 'Medical & Vaccines',
      catMyths: 'Myths & Facts',
      calloutTitle: 'Still have an unanswered question?',
      calloutDesc: 'You can talk to our AI Health Assistant or contact the official NCDC toll-free hotline 24/7.',
      callNcdcBtn: 'Call NCDC 6232'
    },
    aboutUs: {
      badge: 'Mission & Public Health Governance',
      title: 'About EbolaGuard NG',
      subtitle: 'A dedicated Nigerian public health intelligence portal engineered to democratize verified Ebola awareness, counter dangerous health misinformation, and provide clinical-grade AI triage guidance to underserved communities.',
      devCreditBadge: 'Official Developer Credit',
      devCreditTitle: 'Developed by OLANREWAJU SAMUEL',
      devCreditDesc: 'EbolaGuard NG was conceptualized and developed by OLANREWAJU SAMUEL as a high-fidelity digital response to public health crises in Nigeria and West Africa, blending robust software engineering with verified epidemiological science.',
      pillar1Title: 'Verified Information',
      pillar1Desc: 'Every statistic, fact, and health advisory is strictly grounded in official publications from the Nigeria Centre for Disease Control (NCDC), Federal Ministry of Health, and WHO.',
      pillar2Title: 'Early Awareness',
      pillar2Desc: 'Educating citizens to identify early febrile manifestations and exposure risks early, enabling prompt hospital presentation before complications develop.',
      pillar3Title: 'Clinical AI Ethics',
      pillar3Desc: 'Engineered with transparent medical boundaries, zero diagnostic hallucinations, strict privacy protections, and direct referral protocols.'
    },
    contact: {
      badge: 'Public Feedback & Rumour Verification',
      title: 'Report Misinformation & Contact',
      subtitle: 'Help protect Nigerian communities by reporting dangerous false cures or rumours, or reach our technical public health team.',
      tabMisinformation: 'Report Misinformation / False Rumours',
      tabFeedback: 'General Feedback & Inquiries',
      categoryLabel: 'Category of Misinformation:',
      catFakeCure: 'Fake Cure / Concoction (e.g. Saltwater bath)',
      catFalseDeath: 'False Outbreak Claim or Unverified Death',
      catHiddenCase: 'Rumour of Hidden Patient',
      catOther: 'Other Misleading Information',
      sourceUrlLabel: 'Where did you see or hear this? (Social Media, WhatsApp, Website, Radio):',
      sourceUrlPlaceholder: 'E.g., Viral WhatsApp audio, Facebook post link, market flyer...',
      descriptionLabel: 'Describe the false claim or rumor in detail:',
      descriptionPlaceholder: 'Please explain what was claimed, who is spreading it, and what community it affects...',
      submitReportBtn: 'Submit Report for Fact-Checking',
      nameLabel: 'Your Full Name:',
      emailLabel: 'Your Email Address:',
      messageLabel: 'Your Message:',
      sendFeedbackBtn: 'Send Message',
      emergencyWarning: 'Medical Emergency Notice: This form is NOT monitored for real-time emergency triage. If someone is acutely sick, call NCDC 6232 immediately.'
    },
    admin: {
      title: 'Staff & Epidemiological Management Portal',
      subtitle: 'Restricted administrative access for authorized public health editors and data verification officers.',
      emailPlaceholder: 'Email Address',
      passwordPlaceholder: 'Password',
      loginBtn: 'Sign In to Admin Portal',
      demoNote: 'Authorized Personnel Only (Demo pass: EbolaGuard2026!)',
      logoutBtn: 'Log Out',
      tabOverview: 'Overview',
      tabArticles: 'Articles',
      tabUpdates: 'Outbreak Updates',
      tabStatistics: 'Statistics',
      tabSources: 'Official Sources',
      tabReports: 'Misinformation Reports',
      tabHealth: 'System Health'
    },
    footer: {
      brandDescription: 'AI-powered Ebola prevention and early risk detection platform for Nigeria. Helping Nigerian communities detect risk early, understand symptoms, prevent outbreaks, and access rapid medical guidance.',
      builtWithPurpose: 'Built with purpose for Nigerian and global health security',
      platformHeader: 'Platform',
      legalHeader: 'Legal & Ethics',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service & Disclaimer',
      clinicalEthics: 'Clinical Data Ethics',
      emergencyContacts: 'Emergency Contacts (6232)',
      reportMisinfo: 'Report Misinformation',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      copyright: '© 2026 EbolaGuard NG. All rights reserved. Not for medical diagnosis.',
      sdgLabel: 'SDG 3 Aligned: Good Health and Well-being'
    },
    privacy: {
      badge: 'Privacy & Data Protection Principles',
      title: 'Privacy Policy',
      subtitle: 'Last revised: October 2026 · Compliant with the Nigeria Data Protection Act (NDPA).',
      introTitle: '1. Introduction',
      introText: 'EbolaGuard NG is committed to safeguarding user privacy. We understand that health queries and potential symptom disclosures are sensitive. This Privacy Policy details our data collection, processing, and retention practices.',
      anonTitle: '2. Anonymous AI Consultations',
      anonText: 'The EbolaGuard Virtual Doctor and AI Health Assistant do NOT require account creation or personal identity credentials. Users are never asked to provide government IDs, home addresses, or full legal names. Symptom checkboxes and text inputs are processed strictly to generate instant clinical triage guidance.',
      noSaleTitle: '3. No Sale of Health Data',
      noSaleText: 'We do NOT sell, license, or monetize any user consultation or feedback data. We do not use user medical queries for advertising tracking or third-party profiling.',
      serverSecurityTitle: '4. Server-Side Security & AI Integration',
      serverSecurityText: 'All generative interactions with Gemini API occur via secure server-side proxy routes. API credentials and administrative keys are never transmitted to or exposed in the frontend client browser.',
      retentionTitle: '5. Retention and Deletion',
      retentionText: 'Consultation messages may be cached ephemerally for session continuity and automatically purged within 48 hours. Users may clear browser storage at any time to wipe local state.'
    },
    terms: {
      badge: 'Legal Disclaimer & Conditions of Use',
      title: 'Terms of Service & Clinical Disclaimer',
      subtitle: 'Important medical limitations and usage conditions for the EbolaGuard NG public health platform.',
      term1Title: '1. Educational and Triage Tool Only',
      term1Text: 'EbolaGuard NG is an informational, educational, and preliminary triage platform. It is NOT a substitute for licensed medical examination, definitive clinical diagnosis, laboratory testing (such as RT-PCR), or personalized doctor prescription.',
      term2Title: '2. Immediate Emergency Protocol',
      term2Text: 'If you or someone in your care is exhibiting acute warning signs—including sudden high fever, persistent vomiting, severe watery diarrhoea, or unexplained bleeding—DO NOT wait for an AI consultation response. Contact the NCDC Toll-Free Emergency Hotline at 6232 or your state emergency medical dispatch immediately.',
      term3Title: '3. Grounded in Official Public Health Directives',
      term3Text: 'All public health information, prevention advisories, and triage rules provided through this portal are directly mapped to published guidelines from the Nigeria Centre for Disease Control (NCDC), the Federal Ministry of Health and Social Welfare (Nigeria), and the World Health Organization (WHO).',
      term4Title: '4. Limitation of Liability',
      term4Text: 'EbolaGuard NG and its developer OLANREWAJU SAMUEL provide this service in good faith to advance national health security. We disclaim liability for any actions taken or not taken based on the informational contents of this platform without verified clinical examination.'
    },
    disclaimer: {
      short: 'EbolaGuard NG provides verified public health education and AI triage guidance. It is NOT a substitute for licensed clinical diagnosis or emergency hospital care.',
      emergencyCall: 'For immediate medical emergencies or suspected exposure, dial NCDC Toll-Free 6232 or your state emergency response number immediately.'
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Create Account',
      signOut: 'Sign Out',
      createAccount: 'Create Account',
      myAccount: 'My Account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. Dr. Amina Bello',
      forgotPasswordLink: 'Forgot Password?',
      rememberMe: 'Remember my session',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signInTitle: 'Sign In to EbolaGuard NG',
      signInSubtitle: 'Access personalized public health resources, save consultation history, and manage state alert preferences.',
      signUpTitle: 'Create an EbolaGuard Account',
      signUpSubtitle: 'Join thousands of Nigerians staying protected with verified disease bulletins, risk screening, and emergency directories.',
      forgotTitle: 'Recover Your Password',
      forgotSubtitle: 'Enter your registered email address and we will dispatch a secure reset link to your inbox.',
      resetPasswordBtn: 'Send Password Reset Email',
      backToSignIn: 'Return to Sign In',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      passwordRequirements: 'Password must be at least 6 characters long.',
      passwordMatchError: 'Passwords do not match. Please ensure both passwords are identical.',
      passwordLengthError: 'Password must be at least 6 characters.',
      emailRequiredError: 'Please provide a valid email address.',
      nameRequiredError: 'Please enter your full name.',
      registrationSuccess: 'Account successfully registered!',
      emailConfirmNotice: 'If email confirmation is enabled on your Supabase project, please check your email inbox to confirm your address before signing in.',
      resetEmailSent: 'Password reset link has been dispatched! Please check your email inbox.',
      publicNotice: 'Emergency guidance, outbreak statistics, and the Risk Assessment tool are 100% public and free without logging in.',
      accountTitle: 'Account & Health Profile',
      accountSubtitle: 'Manage your verified contact credentials, emergency state location, and outbreak notification settings.',
      editProfile: 'Edit Health Profile',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      profileUpdated: 'Your health profile has been successfully updated.',
      phoneLabel: 'Emergency Phone Number',
      stateLabel: 'Primary Nigerian State / Location',
      memberSince: 'Member Since',
      securitySettings: 'Account & Security Status',
      verifiedAccount: 'Supabase Authenticated',
      alertPreferences: 'Emergency Outbreak Alerts',
      smsAlerts: 'Receive high-priority NCDC epidemic SMS alerts',
      emailAlerts: 'Receive weekly verified public health digest',
      emergencyQuickLinks: 'Quick Health Actions',
      viewAssessments: 'Start Symptom Assessment',
      facilityDirectory: 'Locate Nearest Facility',
      outbreakFeed: 'View Outbreak Updates',
      loginRequiredTitle: 'Authentication Required',
      loginRequiredDesc: 'Please sign in or create an account to view and manage your EbolaGuard NG profile.'
    }
  },

  // ==========================================
  // NIGERIAN PIDGIN (pcm)
  // ==========================================
  pcm: {
    brandName: 'EbolaGuard NG',
    tagline: 'Correct Information. Quick Awareness. Better Community.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    common: {
      emergencyCallText: 'Call NCDC Free Line 6232',
      hotline: '6232',
      altHotline: '+234 800 9700 0010',
      readMore: 'Read Full Tori',
      learnMore: 'Learn More',
      viewDetails: 'See Wetin Dey Inside',
      close: 'Close Am',
      cancel: 'Cancel',
      submit: 'Send Am',
      search: 'Find',
      filter: 'Filter',
      all: 'All',
      loading: 'E dey load...',
      submitting: 'E dey send...',
      thinking: 'AI dey reason am...',
      success: 'E don enter well',
      error: 'Wabala don happen',
      clear: 'Clear am',
      back: 'Go Back',
      download: 'Download am',
      share: 'Share am',
      copyLink: 'Copy Link',
      verified: 'Verified by NCDC',
      official: 'Official Tori',
      lowRisk: 'Risk Low Well-Well',
      highRisk: 'Risk High Sharp-Sharp',
      zeroCases: '0 Case Wey Dem Confirm',
      days: 'Days',
      status: 'Status',
      source: 'Where e come from',
      location: 'Place',
      date: 'Date',
      emergency: 'Pajawiri / Emergency'
    },
    nav: {
      home: 'Domot (Home)',
      riskAssessment: 'Check Your Risk',
      prevention: 'How to Prevent Am',
      about: 'Tori About Ebola',
      updates: 'Official Gist & News',
      dashboard: 'Numbers Dashboard',
      facilities: 'Hospitals Near You',
      emergency: 'Emergency Help',
      resources: 'Pamphlet & Guides',
      faq: 'Questions & Answers',
      aboutUs: 'Who We Be',
      contact: 'Report Rumour / Contact',
      admin: 'Admin Area',
      staff: 'Staff',
      getGuidance: 'Get Health Advice'
    },
    alert: {
      officialBadge: 'NCDC Official Public Health Status',
      source: 'From: Nigeria Centre for Disease Control (NCDC)',
      verifiedOn: 'Verified: October 2026',
      readFullBrief: 'Read Full Story',
      dismiss: 'Close alert',
      locationLabel: 'Place',
      publishedLabel: 'Date Wey E Show'
    },
    hero: {
      topPill: 'SDG 3 Aligned · AI Power · No Data Storing',
      headline: 'Dey Protect Naija from',
      headlineHighlight: 'Ebola & Dangerous Diseases',
      subheadline: 'Get genuine health news about Ebola from government experts (NCDC & WHO). Check your body condition with our AI Virtual Doctor make your family and community safe.',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      trustLine: 'Base on NCDC & WHO Protocol · We No Dey Store Your Private Data',
      startHere: '👇 Start Here',
      doctorBtn: 'Tok With Virtual Doctor',
      updatesBtn: 'Check Latest Gist',
      learnBtn: 'Learn How to Prevent Am'
    },
    cards: {
      understand: 'Understand How Ebola Be',
      understandDesc: 'Know how e dey enter body, why e no be air disease, and how long e dey take show.',
      symptoms: 'Recognise Di Bad Signs',
      symptomsDesc: 'Heavy fever, body pain, vomiting and purge. No assume say na ordinary malaria.',
      prevention: 'How To Keep Safe',
      preventionDesc: 'Wash hand with soap and water, avoid touching sick person fluid or dead body.',
      guidance: 'Where To Find Help',
      guidanceDesc: 'Call NCDC free number 6232 or check hospital near your side for all 36 states.'
    },
    home: {
      liveSurveillance: 'Epidemiological Surveillance (Eye on Ground)',
      metrics: {
        activeCases: 'Confirmed Ebola Cases (Naija)',
        totalFatalities: 'People Wey Die (Naija)',
        portScreenings: 'Airport & Border Checks',
        diagnosticLabs: 'Certified Testing Labs',
        nationalStatus: 'Naija Status: Zero confirmed cases for 2026',
        borderStatus: 'Tight screening dey go on for MMIA Lagos, Abuja airport and water ports',
        activeCasesUnit: 'active cases',
        fatalitiesUnit: 'deaths',
        labsUnit: 'big labs',
        verifiedDate: 'NCDC Verified: October 2026'
      },
      stateTableTitle: 'National Surveillance for All States & Border Points',
      stateTableSubtitle: 'Live situation report from state epidemiologists and port health workers across Naija.',
      stateColState: 'State / Territory',
      stateColScreenings: 'Screening Wey Dem Do',
      stateColStatus: 'Surveillance Status',
      stateColRisk: 'Risk Level',
      stateSearchPlaceholder: 'Find your state or border point...',
      newsletterTitle: 'Get Free Epidemic Alert for Phone',
      newsletterDesc: 'Get free SMS or WhatsApp alert straight from NCDC if any outbreak warning happen.',
      smsTab: 'SMS Alert',
      whatsappTab: 'WhatsApp Alert',
      phonePlaceholder: 'Put your phone number (e.g. 0803 123 4567)...',
      subscribeBtn: 'Join Free Alerts',
      subscribedSuccess: 'Welldone! You go dey receive verified government public health alert.',
      privacyNote: 'Your number dey safe well-well. We no go share am with anybody.',
      sdgTitle: 'UN Sustainable Development Goal 3',
      sdgDesc: 'To make sure say all Naija people dey healthy and safe through reliable digital disease monitoring.'
    },
    aboutEbola: {
      badge: 'Official Public Health Intelligence',
      title: 'Tori & Facts About Ebola Virus Disease (EVD)',
      subtitle: 'Clear facts on how e dey spread, different virus types, and how Naija dey prepare.',
      whatIsTitle: 'Wetin Ebola Virus Disease Really Be?',
      whatIsText: 'Ebola na serious sickness wey dey happen once in a while but fit kill person if dem no quickly take care of am. Dem first find di virus for 1976 near Ebola River for DR Congo.',
      transmissionTitle: 'How Di Virus Dey Spread from Person to Person',
      transmissionDirect: 'Direct Contact: Touching spit, vomitus, blood, urine, or poo of person wey sick or person wey don die.',
      transmissionNotAir: 'NO BE AIR DISEASE: Ebola no dey fly for air like ordinary catarrh or COVID-19. Person must touch infected body fluid directly.',
      transmissionBushmeat: 'Bushmeat & Forest Animals: Touching sick or dead bats, chimpanzees, monkeys, or cutting raw bushmeat without hand gloves.',
      transmissionBurials: 'Unsafe Burials: Washing or hugging dead body of person wey die of fever na one of the fastest ways virus dey spread.',
      speciesTitle: 'Di Six Ebola Virus Types Wey Dey',
      incubationTitle: 'Time Wey Virus Take Start (2 to 21 Days)',
      incubationText: 'Person wey get Ebola NO FIT give another person until body symptoms start. The time dey range from 2 to 21 days (mostly 8 to 10 days).'
    },
    symptoms: {
      badge: 'Signs & Body Feel Guide',
      title: 'Recognise Ebola Signs & Check Risk',
      subtitle: 'Learn how Ebola signs dey start, why lab blood test dey important, and wetin to do immediately.',
      earlyTitle: 'Stage 1: Early Signs (Day 1 to 3)',
      earlyDesc: 'Sudden high fever, serious body weakness, heavy headache, and body pain. E dey resemble malaria and typhoid well-well.',
      gastroTitle: 'Stage 2: Belle Trouble (Day 4 to 7)',
      gastroDesc: 'Heavy watery purge, continuous vomiting, sharp belle bite, and dehydration because water dey leave body fast.',
      severeTitle: 'Stage 3: Dangerous Emergency Signs (Day 7+)',
      severeDesc: 'Bleeding from gum, eye, vomit or stool, confusion, and organ trouble. Person need special isolation treatment urgently.',
      checkerTitle: 'Interactive Symptoms Checker',
      checkerInstruction: 'Pick the signs wey you or di person dey feel right now:',
      exposureQuestion: 'You touch anybody wey seriously sick or travel go where Ebola dey for the past 21 days?',
      urgentWarning: 'Important Warning: Early signs resemble malaria! NO drink or bath saltwater! Call NCDC toll-free line 6232.',
      callAheadReminder: 'Call First Rule: Always phone hospital before you carry person go, so doctors go prepare safety suit.',
      feverLabel: 'Sudden High Fever (>38°C / 100.4°F)',
      fatigueLabel: 'Serious Weakness / Heavy Sluggishness',
      headacheLabel: 'Heavy Head Pounding Pain',
      musclePainLabel: 'Body Pain & Joint Pain',
      soreThroatLabel: 'Throat Pain / Hard to Swallow',
      vomitingLabel: 'Continuous Heavy Vomiting',
      diarrheaLabel: 'Watery Purging Nonstop',
      abdominalPainLabel: 'Sharp Belle Biting Pain',
      bleedingLabel: 'Bleeding or Blood Stains for Body'
    },
    prevention: {
      badge: 'Infection Control Protocol (How to Stay Safe)',
      title: 'Ebola Prevention & Community Safety',
      subtitle: 'How to clean hand, take care of sick person safely, and follow government guidelines.',
      roleWarningTitle: 'Clear Difference: Ordinary People vs. Trained Health Doctors',
      roleWarningText: 'Ordinary person must NEVER touch medical waste, wash bloody bedsheets, or wash dead body of person wey die of fever.',
      tabPublic: 'General Public (Everybody)',
      tabHealthcare: 'Healthcare Workers',
      tabBurial: 'Safe & Dignified Burials',
      handwashingTitle: 'Proper Handwashing Rules',
      handwashingText: 'Wash hands well with soap and running water for at least 30 seconds, or use hand sanitiser with at least 60% alcohol.',
      foodSafetyTitle: 'Food & Meat Safety',
      foodSafetyText: 'No touch sick bats or monkeys. Cook all meat well-well before eating.',
      dosListTitle: 'Wetin You MUST Do (Correct Steps)',
      dontsListTitle: 'Wetin You MUST NOT Do (Dangerous Mistakes)',
      saltMythTitle: 'Saltwater Bath Na Big Lie & Danger!',
      saltMythText: 'Drinking or bathing with hot saltwater NO fit cure or prevent Ebola. E don even kill people before through salt poisoning.'
    },
    updates: {
      badge: 'Real-time Surveillance Gist',
      title: 'Verified Outbreak Updates & News',
      subtitle: 'Official announcements from NCDC, WHO Africa, and Africa CDC wey we verify well-well.',
      searchPlaceholder: 'Search updates with title or state...',
      filterAll: 'All News',
      filterAnnouncements: 'Announcements',
      filterAdvisories: 'Advisories',
      filterGuidelines: 'Guidelines',
      modalTitle: 'Full Official Brief',
      verifiedStamp: 'NCDC / WHO Verified Record',
      viewSource: 'Visit Official Source'
    },
    statistics: {
      badge: 'Epidemiological Dashboard',
      title: 'Outbreak Numbers & Statistics',
      subtitle: 'Original numbers from NCDC and WHO. We separate verified zeroes from numbers wey never dey.',
      geoFilter: 'Filter by Place',
      timeframeFilter: 'Year Cycle',
      downloadBtn: 'Download Verified CSV Data',
      activeCasesTitle: 'Active Confirmed Cases (Naija)',
      fatalitiesTitle: 'People Wey Die (Naija)',
      screeningsTitle: 'Border Screenings',
      labsTitle: 'Certified Labs',
      trendTitle: 'Surveillance Screening Graph (2026)',
      stateSurveillanceTitle: 'Surveillance by State'
    },
    emergencyHelp: {
      badge: 'Quick Action for Serious Health Crisis',
      title: 'Emergency Help & Quick Action',
      subtitle: 'Direct emergency phone numbers for NCDC, State Rapid Response Team, and national ambulance services.',
      nationalCentre: 'National Emergency Operations Centre',
      ncdcHotlineTitle: 'NCDC Free Emergency Line',
      ncdcHotlineDesc: 'Free call 24 hours every day from MTN, Airtel, Glo, and 9mobile.',
      altHotlineLabel: 'Another Phone Number:',
      smsDeskLabel: 'Official SMS Desk:',
      callAheadTitle: 'The Compulsory "Call First" Rule',
      callAheadWarning: 'If you or person inside your house get sudden high fever, dey vomit heavily, dey purge water-water, or blood dey come out, NO GO directly to clinic or hospital without calling first.',
      step1: '1. Call the hospital before you leave house: Tell the hospital nurses say person get signs of bleeding fever so dem go prepare.',
      step2: '2. Make doctors and nurses wear protection: Dem need to wear special protective clothes (PPE) before you reach, so other patients no go catch am.',
      step3: '3. No take public bus, keke or okada: Call NCDC or hospital make dem bring official ambulance car come carry una safely.',
      nemaTitle: 'National Emergency (NEMA)',
      nemaDesc: 'Police, fire, and ambulance unified hotline for whole Nigeria.',
      nemaBtn: 'Dial 112',
      lagosTitle: 'Lagos Ministry of Health',
      lagosDesc: 'Mainland Hospital IDH Yaba & Emergency Response.',
      redCrossTitle: 'Nigerian Red Cross Society',
      redCrossDesc: 'Community first aid and disaster medical dispatch.',
      viewDirectoryBtn: 'Look All 36 States Hospitals →'
    },
    virtualDoctor: {
      badge: 'AI Doctor & Health Triage',
      title: 'AI Virtual Doctor Risk Assessment',
      subtitle: 'Answer few questions about your body feel and travel make AI doctor tell you wetin to do — built for all Naija communities.',
      welcomeHeader: 'Welcome Message & Honest Notice',
      welcomeText: "Kedu / Bawo / Sannu! I be EbolaGuard Virtual Doctor, AI health assistant. I fit help you understand your symptoms, give health advice, and tell you when to run go hospital. But I no be real human doctor and I no fit replace hospital blood test. If person dey critical, call emergency sharp-sharp.",
      step1Title: '1. Tell Us Wetin Dey Do You',
      step1Desc: 'Put fever days, body weakness, and if you touch sick person.',
      step2Title: '2. Safety Triage',
      step2Desc: 'E go group case into Level 1 (Home Care), Level 2 (Clinic), or Level 3 (Emergency).',
      step3Title: '3. What To Do Next',
      step3Desc: 'Receive call-ahead instructions, hydration tips, and nearest hospital contacts.',
      startBtn: 'Start Body Check Now',
      formTitle: 'Triage Check Form',
      concernLabel: 'Explain how you or di sick person dey feel in your own words:',
      concernPlaceholder: 'Example: I get hot fever since yesterday, my head dey pain me, and I dey vomit...',
      voiceInputBtn: 'Voice Tok (Mic)',
      voiceListening: 'I dey listen... tok now into your mic',
      symptomsLabel: 'Tick all the signs wey you dey feel:',
      durationLabel: 'How many days di symptoms don dey?',
      exposureLabel: 'You touch anybody wey get Ebola or travel go where outbreak dey for past 21 days?',
      bleedingLabel: 'Any strange bleeding (gum, nose, eye, vomit, or stool)?',
      breathingLabel: 'Breathing dey hard person well-well?',
      consciousnessLabel: 'Di person dey faint, confuse, or dey shake (seizure)?',
      ageLabel: 'Age Group:',
      stateLabel: 'State Wey You Dey Inside Naija:',
      adult: 'Big Person (18–64)',
      child: 'Pikin (under 18)',
      elderly: 'Mama or Papa (65+)',
      submitTriageBtn: 'Check My Risk & Give Me Guidance',
      analyzingText: 'AI dey check symptoms according to NCDC & WHO medical rules...',
      resultTitle: 'Your Triage Result',
      listenBtn: 'Listen to Voice Guidance',
      stopListenBtn: 'Stop Voice',
      level1Title: 'Level 1: Normal Home Care & Water Drinking',
      level2Title: 'Level 2: Quick Visit to Primary Health Centre',
      level3Title: 'Level 3: Immediate Emergency Guidance (Call 6232)',
      callAheadNotice: 'IMPORTANT NOTICE: Before you run enter hospital, call NCDC free line 6232 make doctors wear safety clothes ready for you.',
      newConsultationBtn: 'Start Another Check',
      validationError: 'Abeg write small explanation for di text box or select at least one symptom from di cards below.',
      editAnswersBtn: 'Check & Change Your Answers',
      consultationError: 'Network get small wahala for online consultation. We don use our local emergency rule check your symptoms below.',
      symptomSelectedCount: 'symptoms wey you choose'
    },
    assistant: {
      badge: 'AI Health Education Helper (Gemini)',
      title: 'AI Health Education Assistant',
      subtitle: 'Ask questions about Ebola facts, transmission, myth-busting, and official Nigerian health directives.',
      greeting: "Hello! I be EbolaGuard NG AI Health Education Assistant. I fit answer your questions about Ebola disease, how e dey spread, vaccine, and government instructions.\n\n*Important:* I be educational guide. I no fit replace real doctor. How I fit help you understand Ebola today?",
      inputPlaceholder: 'Ask question (e.g. Saltwater bath dey work? Wetin be early signs?)...',
      sendBtn: 'Send',
      thinking: 'Thinking...',
      suggestedHeader: 'Popular Questions:',
      q1: 'Ebola outbreak dey inside Naija right now?',
      q2: 'Drinking or bathing saltwater fit cure Ebola?',
      q3: 'Ebola dey fly for air like flu or COVID-19?',
      q4: 'Which vaccine and medicine dey for Ebola?',
      fullCheckerBtn: 'Full Risk Checker',
      disclaimer: 'EbolaGuard NG na public health education tool. E no replace real hospital doctor or blood test.'
    },
    findHelp: {
      badge: 'Certified Hospitals & Isolation Centres',
      title: 'Find Certified Healthcare Centres for Naija',
      subtitle: 'List of teaching hospitals, federal medical centres, and state isolation centres across all 36 states and Abuja.',
      searchPlaceholder: 'Search hospital by name, town, or address...',
      stateFilterAll: 'All Naija States',
      emergencyDesk: 'Emergency Phone Desk:',
      officialPortal: 'Official Portal:',
      website: 'Website',
      verifiedOn: 'Verified Date:',
      noFacilityTitle: 'We no find specific hospital record for this state yet.',
      noFacilityDesc: 'Every state get active Rapid Response Team from Ministry of Health under NCDC coordination.',
      callNcdcDispatch: 'Call NCDC Free Line 6232 for State Ambulance'
    },
    resources: {
      badge: 'Public Health Flyers & Material',
      title: 'Approved Public Health Handouts & Posters',
      subtitle: 'Download, print, and share posters in English, Pidgin, Yoruba, Hausa, and Igbo.',
      langFilterAll: 'All Languages',
      downloadMaterialBtn: 'Download Material',
      downloadedSuccess: 'File don download successfully!'
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'Honest answers to everyday questions Nigerians dey ask about Ebola transmission, prevention, and fake cures.',
      searchPlaceholder: 'Search questions (e.g. saltwater, transmission, vaccine)...',
      catAll: 'All Questions',
      catBasics: 'Ebola Basics',
      catTransmission: 'Transmission',
      catPrevention: 'Prevention',
      catMedical: 'Medicines & Vaccines',
      catMyths: 'Lies vs Facts',
      calloutTitle: 'You still get question wey never answer?',
      calloutDesc: 'You fit tok with our AI Health Assistant or call NCDC free line 6232 any time 24/7.',
      callNcdcBtn: 'Call NCDC 6232'
    },
    aboutUs: {
      badge: 'Our Mission & Governance',
      title: 'About EbolaGuard NG',
      subtitle: 'Digital public health system created to spread genuine Ebola awareness, fight fake news, and give free AI health guidance across Nigeria.',
      devCreditBadge: 'Official Developer Credit',
      devCreditTitle: 'Developed by OLANREWAJU SAMUEL',
      devCreditDesc: 'EbolaGuard NG was conceptualized and developed by OLANREWAJU SAMUEL as a high-fidelity digital response to public health crises in Nigeria and West Africa, blending robust software engineering with verified epidemiological science.',
      pillar1Title: 'Correct Information',
      pillar1Desc: 'Every number and advice come straight from NCDC, Federal Ministry of Health, and WHO.',
      pillar2Title: 'Early Awareness',
      pillar2Desc: 'Helping our people recognise fever and sickness early so hospital treatment go succeed.',
      pillar3Title: 'Safe AI Technology',
      pillar3Desc: 'Built with safety rules, no fake diagnosis, and no storing of private personal data.'
    },
    contact: {
      badge: 'Public Feedback & Rumour Buster',
      title: 'Report False News & Contact Us',
      subtitle: 'Protect your community by reporting fake cure rumours or send feedback to our public health technical team.',
      tabMisinformation: 'Report Fake News / Dangerous Rumour',
      tabFeedback: 'General Feedback & Questions',
      categoryLabel: 'Kind of False News:',
      catFakeCure: 'Fake Cure / Concoction (e.g. Saltwater bath)',
      catFalseDeath: 'Fake Death or Outbreak Lie',
      catHiddenCase: 'Rumour of Hidden Patient',
      catOther: 'Other False Information',
      sourceUrlLabel: 'Where you see or hear am? (WhatsApp voice note, Facebook, Radio):',
      sourceUrlPlaceholder: 'E.g., WhatsApp audio, Facebook post, market gist...',
      descriptionLabel: 'Explain the fake claim in detail:',
      descriptionPlaceholder: 'Tell us wetin dem claim, who dey spread am, and which town...',
      submitReportBtn: 'Submit Report for Fact-Checkers',
      nameLabel: 'Your Full Name:',
      emailLabel: 'Your Email Address:',
      messageLabel: 'Your Message:',
      sendFeedbackBtn: 'Send Message',
      emergencyWarning: 'Emergency Warning: This form no be for immediate sickness. If person dey critically sick, call NCDC free line 6232 sharp-sharp.'
    },
    admin: {
      title: 'Staff & Management Portal',
      subtitle: 'Restricted area for authorized public health editors and data verification officers.',
      emailPlaceholder: 'Email Address',
      passwordPlaceholder: 'Password',
      loginBtn: 'Log In to Admin Portal',
      demoNote: 'Authorized Personnel Only (Demo pass: EbolaGuard2026!)',
      logoutBtn: 'Log Out',
      tabOverview: 'Overview',
      tabArticles: 'Articles',
      tabUpdates: 'Outbreak Updates',
      tabStatistics: 'Statistics',
      tabSources: 'Official Sources',
      tabReports: 'Misinformation Reports',
      tabHealth: 'System Health'
    },
    footer: {
      brandDescription: 'AI-powered Ebola prevention and early risk detection platform for Nigeria. Helping Nigerian communities detect risk early, understand symptoms, prevent outbreaks, and access rapid medical guidance.',
      builtWithPurpose: 'Built with purpose for Nigerian and global health security',
      platformHeader: 'Platform',
      legalHeader: 'Legal & Ethics',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service & Disclaimer',
      clinicalEthics: 'Clinical Data Ethics',
      emergencyContacts: 'Emergency Contacts (6232)',
      reportMisinfo: 'Report Misinformation',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      copyright: '© 2026 EbolaGuard NG. All rights reserved. Not for medical diagnosis.',
      sdgLabel: 'SDG 3 Aligned: Good Health and Well-being'
    },
    privacy: {
      badge: 'Privacy & Data Protection Principles',
      title: 'Privacy Policy',
      subtitle: 'Last revised: October 2026 · Compliant with the Nigeria Data Protection Act (NDPA).',
      introTitle: '1. Introduction',
      introText: 'EbolaGuard NG dey take user privacy serious well-well. We understand say health questions na private matter.',
      anonTitle: '2. Anonymous AI Consultations',
      anonText: 'EbolaGuard Virtual Doctor and Assistant no dey ask for sign up, BVN, NIN, or full legal name.',
      noSaleTitle: '3. We No Dey Sell Data',
      noSaleText: 'We NEVER sell or give user medical questions to advertisers or any third-party.',
      serverSecurityTitle: '4. Server-Side Security',
      serverSecurityText: 'All AI communication dey pass through secure server routes. Secret keys no dey reach browser.',
      retentionTitle: '5. Data Deletion',
      retentionText: 'Session data dey wipe automatically within 48 hours.'
    },
    terms: {
      badge: 'Legal Disclaimer & Conditions of Use',
      title: 'Terms of Service & Clinical Disclaimer',
      subtitle: 'Important medical limitations and usage conditions for the EbolaGuard NG public health platform.',
      term1Title: '1. Educational and Triage Tool Only',
      term1Text: 'EbolaGuard NG na health educational and triage guide. E no replace real hospital doctor, laboratory blood test, or prescription.',
      term2Title: '2. Emergency Protocol',
      term2Text: 'If person dey bleed or dey purge heavily with sudden high fever, NO wait for AI. Call NCDC free line 6232 immediately.',
      term3Title: '3. Grounded in Official Directives',
      term3Text: 'All guidance follow NCDC, Federal Ministry of Health, and WHO guidelines.',
      term4Title: '4. Limitation of Liability',
      term4Text: 'EbolaGuard NG and developer OLANREWAJU SAMUEL provide this service to help our nation without clinical liability.'
    },
    disclaimer: {
      short: 'EbolaGuard NG na public health education tool. E no replace real hospital doctor or blood test.',
      emergencyCall: 'If person seriously sick or bleed, call NCDC free line 6232 right away make hospital prepare before you enter.'
    },
    auth: {
      signIn: 'Sign In (Waka Enter)',
      signUp: 'Create Account (Open Account)',
      signOut: 'Sign Out (Comot)',
      createAccount: 'Create Account',
      myAccount: 'My Account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Write your password again',
      fullNameLabel: 'Your Full Name',
      fullNamePlaceholder: 'e.g. Dr. Amina Bello',
      forgotPasswordLink: 'You forget password?',
      rememberMe: 'Remember my session',
      dontHaveAccount: 'You never get account?',
      alreadyHaveAccount: 'You already get account?',
      signInTitle: 'Sign In to EbolaGuard NG',
      signInSubtitle: 'Waka enter your account to check your health history and manage outbreak alerts.',
      signUpTitle: 'Create EbolaGuard Account',
      signUpSubtitle: 'Join our people wey dey stay protected with correct health tori and emergency guides.',
      forgotTitle: 'Recover Your Password',
      forgotSubtitle: 'Put your email wey you take register make we send you reset link sharp-sharp.',
      resetPasswordBtn: 'Send Password Reset Email',
      backToSignIn: 'Go Back to Sign In',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      passwordRequirements: 'Password must reach at least 6 letters.',
      passwordMatchError: 'The two passwords no match. Check am well.',
      passwordLengthError: 'Password must reach at least 6 letters.',
      emailRequiredError: 'Abeg put correct email address.',
      nameRequiredError: 'Abeg enter your full name.',
      registrationSuccess: 'Account don open successfully!',
      emailConfirmNotice: 'If Supabase need email confirmation, abeg check your email inbox to confirm your address before you sign in.',
      resetEmailSent: 'Password reset link don reach your email! Check am now.',
      publicNotice: 'Emergency advice, outbreak numbers, and Risk Assessment tool na 100% free for everybody without login.',
      accountTitle: 'Account & Health Profile',
      accountSubtitle: 'Manage your contact details, state location, and outbreak notification preferences.',
      editProfile: 'Edit Health Profile',
      saveChanges: 'Save Am',
      saving: 'E dey save...',
      profileUpdated: 'Your profile don update well-well.',
      phoneLabel: 'Emergency Phone Number',
      stateLabel: 'Your State / Location for Nigeria',
      memberSince: 'Member Since',
      securitySettings: 'Account & Security Status',
      verifiedAccount: 'Supabase Authenticated',
      alertPreferences: 'Emergency Outbreak Alerts',
      smsAlerts: 'Receive emergency NCDC epidemic SMS alerts',
      emailAlerts: 'Receive weekly verified public health digest',
      emergencyQuickLinks: 'Quick Health Actions',
      viewAssessments: 'Start Symptom Assessment',
      facilityDirectory: 'Find Hospitals Near You',
      outbreakFeed: 'See Outbreak News',
      loginRequiredTitle: 'You Need to Sign In',
      loginRequiredDesc: 'Abeg sign in or open account to manage your EbolaGuard NG health profile.'
    }
  },

  // ==========================================
  // YORUBA (yo)
  // ==========================================
  yo: {
    brandName: 'EbolaGuard NG',
    tagline: 'Ìròyìn Tòótọ́. Ìmọ̀ Tètè. Àwùjọ Tí Ó Dára Jùlọ.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    common: {
      emergencyCallText: 'Pe NCDC Ọ̀fẹ́ lórí 6232',
      hotline: '6232',
      altHotline: '+234 800 9700 0010',
      readMore: 'Ka Ìkìlọ̀ Lẹ́kùnrẹ́rẹ́',
      learnMore: 'Kẹ́kọ̀ọ́ Síi',
      viewDetails: 'Wo Àkọsílẹ̀',
      close: 'Tìí',
      cancel: 'Fagilé',
      submit: 'Fi Ránṣẹ́',
      search: 'Wá',
      filter: 'Ṣàṣàyàn',
      all: 'Gbogbo Rẹ̀',
      loading: 'Ó ń gbé wọlé...',
      submitting: 'Ó ń fi ránṣẹ́...',
      thinking: 'AI ń gbérò...',
      success: 'Àṣeyọrí',
      error: 'Àṣìṣe wáyé',
      clear: 'Pa Rẹ́',
      back: 'Padà Sẹ́yìn',
      download: 'Gba Sílẹ̀',
      share: 'Pín',
      copyLink: 'Da Àjápọ̀ Kọ',
      verified: 'Ìfidájú NCDC',
      official: 'Láti Ọwọ́ Ìjọba',
      lowRisk: 'Ewu Kéré',
      highRisk: 'Ewu Pọ̀ Púpọ̀',
      zeroCases: 'Àkọsílẹ̀ 0',
      days: 'Ọjọ́',
      status: 'Ipò',
      source: 'Orísun',
      location: 'Ibùdó',
      date: 'Ọjọ́',
      emergency: 'Pàjáwìrì'
    },
    nav: {
      home: 'Ilé (Home)',
      riskAssessment: 'Àyẹ̀wò Ewu',
      prevention: 'Bí A Ṣe Lè Dáàbò Bo Ara',
      about: 'Nípa Àrùn Ebola',
      updates: 'Ìròyìn Titun',
      dashboard: 'Àkọsílẹ̀ Nọ́mbà',
      facilities: 'Àwọn Ilé-Ìwòsàn',
      emergency: 'Ìrànwọ́ Pàjáwìrì',
      resources: 'Àwọn Ìwé Ìkìlọ̀',
      faq: 'Àwọn Ìbéèrè',
      aboutUs: 'Nípa Wa',
      contact: 'Ìjábọ̀ / Ìbánisọ̀rọ̀',
      admin: 'Ojúewé Alákòóso',
      staff: 'Àwọn Òṣìṣẹ́',
      getGuidance: 'Gba Ìtọ́sọ́nà Ìlera'
    },
    alert: {
      officialBadge: 'Ìkìlọ̀ Ìlera Láti NCDC',
      source: 'Orísun: Nigeria Centre for Disease Control (NCDC)',
      verifiedOn: 'Ìfidájú: Oṣù Kẹwàá 2026',
      readFullBrief: 'Ka Ìkìlọ̀ Lẹ́kùnrẹ́rẹ́',
      dismiss: 'Pa ìkìlọ̀ rẹ́',
      locationLabel: 'Ibùdó',
      publishedLabel: 'Ọjọ́ Tí A Tẹ̀ Ẹ́ Jáde'
    },
    hero: {
      topPill: 'Ètò SDG 3 · Agbára AI · Ààbò Àkọsílẹ̀',
      headline: 'Dídáàbò Bo Nàìjíríà Lọ́wọ́',
      headlineHighlight: 'Àrùn Ebola Àti Àjakálẹ̀-Àrùn',
      subheadline: 'Gba ìròyìn tó dájú nípa àrùn Ebola láti ọwọ́ NCDC àti WHO. Lo Dókítà Virtual láti mọ ipò ìlera rẹ kí o sì dáàbò bo àwùjọ rẹ.',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      trustLine: 'Lórí Ìtọ́sọ́nà NCDC & WHO · A Kò Tọ́jú Àkọsílẹ̀ Rẹ Síbì Kankan',
      startHere: '👇 Bẹ̀rẹ̀ Níbí',
      doctorBtn: 'Bá Dókítà Virtual Sọ̀rọ̀',
      updatesBtn: 'Wo Ìròyìn Titun',
      learnBtn: 'Bí A Ṣe Lè Dáàbò Bo Ara'
    },
    cards: {
      understand: 'Òye Nípa Ebola',
      understandDesc: 'Bí àrùn ṣe ń ràn, oríṣiríṣi kòkòrò náà, àti àkókò tí àmì fi ń yọ síta.',
      symptoms: 'Àwọn Àmì Pàjáwìrì',
      symptomsDesc: 'Ibà gíga, èébì, ìgbẹ́ gbuuru, àti àárẹ̀ ara tí kò wọ́pọ̀.',
      prevention: 'Ìmọ́tótó Ara',
      preventionDesc: 'Fífọ ọwọ́ pẹ̀lú ọṣẹ àti omi tó ń ṣàn, yẹra fún fífọwọ́kan omi ara aláìsàn.',
      guidance: 'Wá Ìrànwọ́ Ìlera',
      guidanceDesc: 'Pe nọ́mbà ọ̀fẹ́ NCDC 6232 fún ìrànwọ́ kíákíá ní gbogbo ìpínlẹ̀ 36.'
    },
    home: {
      liveSurveillance: 'Ìṣọ́ Àrùn Fún Orílẹ̀-Èdè (Surveillance)',
      metrics: {
        activeCases: 'Àwọn Tí Ó Ní Àrùn Ebola (Nàìjíríà)',
        totalFatalities: 'Iye Tí Ó Kú (Nàìjíríà)',
        portScreenings: 'Àyẹ̀wò Ní Pápá Ọkọ̀ Òfurufú & Bodè',
        diagnosticLabs: 'Àwọn Ilé-Àyẹ̀wò Tó Ní Àṣẹ',
        nationalStatus: 'Ipò Nàìjíríà: Kò sí ẹnikẹ́ni tó ní àrùn náà ní 2026',
        borderStatus: 'Àyẹ̀wò tó múnádóko ń lọ lọ́wọ́ ní pápá ọkọ̀ èkó, abuja àti etí omi',
        activeCasesUnit: 'aláìsàn',
        fatalitiesUnit: 'ẹni tí ó kú',
        labsUnit: 'ilé-àyẹ̀wò',
        verifiedDate: 'Ìfidájú NCDC: Oṣù Kẹwàá 2026'
      },
      stateTableTitle: 'Ìṣọ́ Àrùn Ní Gbogbo Ìpínlẹ̀ Àti Ibodè',
      stateTableSubtitle: 'Ìròyìn ní tààràtà láti ọ́fíìsì àwọn dókítà ìpínlẹ̀ kọ̀ọ̀kan àti àwọn agbègbè bodè.',
      stateColState: 'Ìpínlẹ̀ / Agbègbè',
      stateColScreenings: 'Iye Àyẹ̀wò Tí A Ṣe',
      stateColStatus: 'Ipò Ìṣọ́ Àrùn',
      stateColRisk: 'Ipele Ewu',
      stateSearchPlaceholder: 'Ṣàṣàyàn ìpínlẹ̀ rẹ...',
      newsletterTitle: 'Gba Ìkìlọ̀ Pàjáwìrì Lórí Fóònù Rẹ Lọ́fẹ̀ẹ́',
      newsletterDesc: 'A ó fi SMS tàbí WhatsApp ránṣẹ́ sí ọ bí NCDC bá kéde ìkìlọ̀ pàjáwìrì eyikeyii.',
      smsTab: 'Ìkìlọ̀ SMS',
      whatsappTab: 'Ìkìlọ̀ WhatsApp',
      phonePlaceholder: 'Tẹ nọ́mbà fóònù rẹ (f.a. 0803 123 4567)...',
      subscribeBtn: 'Forúkọ Sílẹ̀ Lọ́fẹ̀ẹ́',
      subscribedSuccess: 'Ẹ ṣeun! Ẹ ó máa gba ìkìlọ̀ ìlera láti ọ̀dọ̀ ìjọba.',
      privacyNote: 'A kò ní pín nọ́mbà rẹ fún ẹnikẹ́ni láé.',
      sdgTitle: 'Ètò SDG 3 Àjọ Àgbáyé',
      sdgDesc: 'Láti rí i dájú pé gbogbo ọmọ Nàìjíríà wà ní ìlera pípé nípasẹ̀ ìmọ̀ ẹ̀rọ ìṣọ́ àrùn.'
    },
    aboutEbola: {
      badge: 'Ìmọ̀ Ìlera Láti Ọ̀dọ̀ Ìjọba',
      title: 'Òye Lẹ́kùnrẹ́rẹ́ Nípa Àrùn Ebola (EVD)',
      subtitle: 'Òtítọ́ nípa bí àrùn ṣe ń ràn, oríṣiríṣi kòkòrò, àti ìmúrasílẹ̀ orílẹ̀-èdè Nàìjíríà.',
      whatIsTitle: 'Kí Ni Àrùn Ebola Gan-an?',
      whatIsText: 'Àrùn kòkòrò Ebola jẹ́ àrùn tó le púpọ̀ tó sì lè fa ikú kíákíá bí a kò bá tètè tọ́jú rẹ̀. Wọ́n kọ́kọ́ ṣàwárí rẹ̀ ní ọdún 1976 lẹ́bàá Odò Ebola ní orílẹ̀-èdè DR Congo.',
      transmissionTitle: 'Bí Àrùn Náà Ṣe Ń Ràn',
      transmissionDirect: 'Fífọwọ́kan Tààrà: Fífọwọ́kan ẹ̀jẹ̀, èébì, itọ́, ìtọ̀, tàbí ìgbẹ́ aláìsàn tàbí òkú ẹni tó kú nípase Ebola.',
      transmissionNotAir: 'KÌ Í ṢE ÀRÙN AFẸ́FẸ́: Ebola kì í gba inú afẹ́fẹ́ ràn bíi kòtòkútù (otútù) tàbí COVID-19. Ènìyàn gbọ́dọ̀ fọwọ́ kan omi ara aláìsàn.',
      transmissionBushmeat: 'Ẹran Ìgbẹ́: Fífọwọ́kan àdán, ìnàkí, tàbí ọbọ tó ti kú tàbí sísè ẹran igbó láì bọ̀ ọ́ dáadáa.',
      transmissionBurials: 'Ìsìnkú Tí Kò Lálàáfíà: Fífọ òkú tàbí gbígbá òkú ẹni tó kú nípase ibà láìmọ̀ jẹ́ ọ̀nà tó yára jùlọ láti kó àrùn náà.',
      speciesTitle: 'Àwọn Irúfẹ́ Kòkòrò Ebola Mẹ́fà Tí A Mọ̀',
      incubationTitle: 'Àkókò Ìfarasin Kòkòrò (Ọjọ́ 2 sí 21)',
      incubationText: 'Ẹnìkan tí ó ní Ebola KÒ LÈ ran ẹlòmíràn àfi tí àwọn àmì àrùn bá bẹ̀rẹ̀ ní ara rẹ̀. Àkókò náà wà láàárín ọjọ́ 2 sí 21 (púpọ̀ jùlọ ọjọ́ 8 sí 10).'
    },
    symptoms: {
      badge: 'Ìtọ́sọ́nà Àwọn Àmì Àti Ewu',
      title: 'Àwọn Àmì Àrùn Àti Àyẹ̀wò Ewu',
      subtitle: 'Kẹ́kọ̀ọ́ nípa bí àmì ṣe ń bẹ̀rẹ̀, ìdí tí àyẹ̀wò ẹ̀jẹ̀ fi ṣe pàtàkì, àti ohun tí o gbọ́dọ̀ ṣe kíákíá.',
      earlyTitle: 'Ipele 1: Àwọn Àmì Àkọ́kọ́ (Ọjọ́ 1 sí 3)',
      earlyDesc: 'Ibà gíga lójijì, àárẹ̀ ara tó pọ̀, ẹ̀fọ́rí líle, àti ríro gbogbo oríkèé ara. Ó jọ ibà pọ́nju àti typhoid púpọ̀.',
      gastroTitle: 'Ipele 2: Ìyọnu Inú (Ọjọ́ 4 sí 7)',
      gastroDesc: 'Ìgbẹ́ gbuuru omi líle, èébì lemọ́lemọ́, inú rírun tó le, àti àìnísùúrù oúnjẹ tó ń mú kí omi tán lára.',
      severeTitle: 'Ipele 3: Àwọn Àmì Pàjáwìrì Tó Lelékenkà (Ọjọ́ 7+)',
      severeDesc: 'Ẹ̀jẹ̀ dídà láti inú eyín, ojú, èébì tàbí ìgbẹ́, ìdàrúdàpọ̀ ọpọlọ, àti kíkùnà àwọn ẹ̀yà ara. Ó nílò ìsọtọ̀ kíákíá.',
      checkerTitle: 'Àkójọ Àyẹ̀wò Àmì Ìlera',
      checkerInstruction: 'Yan àwọn àmì tí o ń nírìírí wọn báyìí fún ìmọ̀ràn:',
      exposureQuestion: 'Ṣé o ti fọwọ́ kan aláìsàn tó le tàbí rìnrìn-àjò sí ibi tí àrùn wà ní ọjọ́ 21 sẹ́yìn?',
      urgentWarning: 'Ìkìlọ̀ Pàjáwìrì: Àmì àkọ́kọ́ jọ ibà lásán. MÁ ṢE mu tàbí wẹ̀ omi iyọ̀! Pe NCDC 6232 kíákíá.',
      callAheadReminder: 'Ìlànà Pípè Ṣáájú: Tẹ tẹlifóònù sí ilé-ìwòsàn ṣáájú kí o tó dé, kí àwọn dókítà lè múra aṣọ ààbò sílẹ̀.',
      feverLabel: 'Ibà Gbígbóná Lójijì (>38°C / 100.4°F)',
      fatigueLabel: 'Àárẹ̀ Líle / Àìlera Ara',
      headacheLabel: 'Fífọ́ Orí Líle',
      musclePainLabel: 'Ìrora Ẹran-ara & Oríkèé-ara',
      soreThroatLabel: 'Ọ̀nà-ọ̀fun Dídùn / Ìṣòro Gbé Nnkan Mì',
      vomitingLabel: 'Èébì Líle Léraléra',
      diarrheaLabel: 'Ìgbẹ́ Gbuuru Bí Omi',
      abdominalPainLabel: 'Ìrora Inú Líle',
      bleedingLabel: 'Ẹ̀jẹ̀ Láì Mọ̀dí Tàbí Àpá Ẹ̀jẹ̀'
    },
    prevention: {
      badge: 'Ìlànà Dídènà Àkóràn',
      title: 'Dídáàbò Bo Ara Àti Àwùjọ',
      subtitle: 'Ìmọ́tótó ọwọ́, tọ́tọ́jú aláìsàn láì kó àrùn, àti ìsìnkú tó lálàáfíà nípasẹ̀ ìtọ́sọ́nà NCDC.',
      roleWarningTitle: 'Ìyàtọ̀ Pàtàkì: Ará Ìlú Àti Àwọn Dókítà Tó Gbádùn Ẹ̀kọ́',
      roleWarningText: 'Kò gbọdọ̀ sí ẹnikẹ́ni tí kò kẹ́kọ̀ọ́ tí yóò gbìyànjú láti fọ aṣọ ẹ̀jẹ̀, fọ òkú, tàbí sọ dọ̀tí ilé-ìwòsàn nù láìsí aṣọ ààbò PPE.',
      tabPublic: 'Ará Ìlú Gbogbogbò',
      tabHealthcare: 'Àwọn Òṣìṣẹ́ Ìlera',
      tabBurial: 'Ìsìnkú Tí Ó Lálàáfíà',
      handwashingTitle: 'Ìlànà Fífọ Ọwọ́ Tòótọ́',
      handwashingText: 'Fọ ọwọ́ rẹ pẹ̀lú ọṣẹ àti omi tó ń ṣàn fún ó kéré tán ìṣẹ́jú àáyá 30, tàbí lo sanitiser tó ní ọtí tí ó tó 60%.',
      foodSafetyTitle: 'Ààbò Oúnjẹ Àti Ẹran',
      foodSafetyText: 'Yẹra fún fífọwọ́kan àdán tàbí ọbọ tó ń ṣàìsàn. Se gbogbo ẹran jìn dáadáa kí o tó jẹ ẹ́.',
      dosListTitle: 'Àwọn Ohun Tí O Gbọ́dọ̀ Ṣe (DOs)',
      dontsListTitle: 'Àwọn Ohun Tí Kò Gbọdọ̀ Ṣe (DONTs)',
      saltMythTitle: 'Wíwẹ̀ Omi Iyọ̀ Jẹ́ Irọ́ Pátápátá Àti Ewu!',
      saltMythText: 'Mímu tàbí wíwẹ̀ omi iyọ̀ gbígbóná kò lè dènà tàbí wo Ebola. Ó ti pa ọ̀pọ̀ ènìyàn tẹ́lẹ̀ rí nípase oró iyọ̀ (salt poisoning).'
    },
    updates: {
      badge: 'Ìròyìn Ìṣọ́ Àrùn Lẹ́kùnrẹ́rẹ́',
      title: 'Ìròyìn Titun & Ìkìlọ̀ Ìlera',
      subtitle: 'Ìkéde láti ọ̀dọ̀ NCDC, WHO Africa, àti Africa CDC tí a ti fìdí rẹ̀ múlẹ̀.',
      searchPlaceholder: 'Wá ìròyìn nípasẹ̀ àkọlé tàbí ìpínlẹ̀...',
      filterAll: 'Gbogbo Ìròyìn',
      filterAnnouncements: 'Àwọn Ìkéde',
      filterAdvisories: 'Àwọn Ìkìlọ̀',
      filterGuidelines: 'Àwọn Ìlànà',
      modalTitle: 'Ìkìlọ̀ Lẹ́kùnrẹ́rẹ́',
      verifiedStamp: 'Àkọsílẹ̀ Ìfidájú NCDC / WHO',
      viewSource: 'Wo Orísun Tòótọ́'
    },
    statistics: {
      badge: 'Àkọsílẹ̀ Nọ́mbà Ìlera',
      title: 'Nọ́mbà Àti Àkọsílẹ̀ Àrùn',
      subtitle: 'Àkọsílẹ̀ tòótọ́ láti ọwọ́ NCDC àti WHO láìsí àbùkù.',
      geoFilter: 'Agbègbè',
      timeframeFilter: 'Àkókò Ọdún',
      downloadBtn: 'Gba Àkọsílẹ̀ CSV Sílẹ̀',
      activeCasesTitle: 'Àwọn Tí Ó Ní Àrùn (Nàìjíríà)',
      fatalitiesTitle: 'Iye Tí Ó Kú (Nàìjíríà)',
      screeningsTitle: 'Àyẹ̀wò Ní Bodè',
      labsTitle: 'Ilé-Àyẹ̀wò Tó Ní Àṣẹ',
      trendTitle: 'Àwòrán Àyẹ̀wò Ọdún 2026',
      stateSurveillanceTitle: 'Ìṣọ́ Ní Gbogbo Ìpínlẹ̀'
    },
    emergencyHelp: {
      badge: 'Ìpè Kánjúkánjú fún Ìlera Ará Ilú',
      title: 'Ìrànlọ́wọ́ Pajawiri & Ìgbésẹ̀ Kíákíá',
      subtitle: 'Nọ́mbà tààrà fún Ilé-Iṣẹ́ Ìdarí Àrùn Nàìjíríà (NCDC), Ẹgbẹ́ Ìdáhùn Kíákíá Ìpínlẹ̀, àti àwọn ọkọ̀ èsì pajawiri.',
      nationalCentre: 'Ilé-Iṣẹ́ Ìdarí Pajawiri Orílẹ̀-èdè',
      ncdcHotlineTitle: 'Nọ́mbà Ọ̀fẹ́ NCDC fún Pajawiri',
      ncdcHotlineDesc: 'Ìpè ọ̀fẹ́ láì san owó fún wákàtí 24 lojoojúmọ́ láti MTN, Airtel, Glo, àti 9mobile.',
      altHotlineLabel: 'Nọ́mbà Ìpè Mìíràn:',
      smsDeskLabel: 'Ibi Ìfọ̀rọ̀ránṣẹ́ SMS:',
      callAheadTitle: 'Àlànà Pàtàkì "Pè Kí O Tó Lọ"',
      callAheadWarning: 'Bí ìwọ tàbí ẹnìkan nínú ilé bá ní ibà gbígbóná pẹ̀lú èébì líle, ìgbẹ́ gbuuru, tàbí ẹ̀jẹ̀ láì mọ̀dí, MÁ ṢE lọ tààrà sí ilé-ìwòsàn láì kọ́kọ́ pè lórí fóònù.',
      step1: '1. Pè ilé-ìwòsàn kí o tó kúrò nílé: Sọ fún wọn pé aláìsàn ní àwọn àmì àrùn ibà ẹ̀jẹ̀ kí wọ́n lè múra sílẹ̀.',
      step2: '2. Fún àwọn oníṣègùn láyè láti múra: Àwọn nọ́ọ̀sì àti dọ́kítà gbọ́dọ̀ wọ aṣọ ààbò (PPE) láti dáàbò bo àwọn aláìsàn mìíràn.',
      step3: '3. Má ṣe wọ ọkọ̀ èrò tàbí dánfó: Ẹ pe NCDC tàbí ilé-ìwòsàn fún ọkọ̀ èsì pajawiri amúnisọ́rọ̀.',
      nemaTitle: 'Pajawiri Orílẹ̀-èdè (NEMA)',
      nemaDesc: 'Ọlọ́pàá, iná, àti ọkọ̀ èsì pajawiri fún gbogbo orílẹ̀-èdè.',
      nemaBtn: 'Tẹ 112',
      lagosTitle: 'Ilé-Iṣẹ́ Ìlera Ìpínlẹ̀ Èkó',
      lagosDesc: 'Ilé-ìwòsàn Mainland IDH Yaba àti Ètò Ìdáhùn Pajawiri.',
      redCrossTitle: 'Ẹgbẹ́ Red Cross ti Nàìjíríà',
      redCrossDesc: 'Ìtọ́jú àkọ́kọ́ ní àdúgbò àti ìrànwọ́ ìṣẹ̀lẹ̀ pajawiri.',
      viewDirectoryBtn: 'Wo Àtòjọ Gbogbo Ìpínlẹ̀ 36 →'
    },
    virtualDoctor: {
      badge: 'Dókítà Virtual & Àyẹ̀wò AI',
      title: 'Dókítà Virtual: Àyẹ̀wò Ewu Ìlera',
      subtitle: 'Dáhùn àwọn ìbéèrè díẹ̀ nípa àmì ara rẹ kí AI dókítà lè fún ọ ní ìtọ́sọ́nà tó tọ́ — tí a kọ́ fún àwùjọ Nàìjíríà.',
      welcomeHeader: 'Ọ̀rọ̀ Àkọ́kọ́ & Ìkìlọ̀ Òtítọ́',
      welcomeText: "Ẹ ǹlẹ́ o! Èmi ni EbolaGuard Virtual Doctor, olùrànlọ́wọ́ AI fún ìlera. Mo lè ràn ọ́ lọ́wọ́ láti mọ àwọn àmì tí o ń fura sí, fún ọ ní ìmọ̀ràn gbogbogbò, kí n sì sọ fún ọ nígbà tí o gbọ́dọ̀ kánjú lọ sí ilé-ìwòsàn. Ṣùgbọ́n èmi kì í ṣe dókítà ènìyàn, n kò sì lè rọ́pò àyẹ̀wò ẹ̀jẹ̀ ilé-ìwòsàn. Bí ó bá jẹ́ pàjáwìrì, pe 6232 kíákíá.",
      step1Title: '1. Sọ Àwọn Àmì Rẹ',
      step1Desc: 'Tẹ iye ọjọ́ tí ibà ti ń ṣe ọ́ àti bí o bá fọwọ́kan aláìsàn.',
      step2Title: '2. Ṣíṣe Àtòjọ Ewu',
      step2Desc: 'Yóò pín ọ̀ràn náà sí Ipele 1 (Ilé), Ipele 2 (Kílíníkì), tàbí Ipele 3 (Pàjáwìrì).',
      step3Title: '3. Ìtọ́sọ́nà Tó Dá Dájú',
      step3Desc: 'Gba ìlànà bí o ṣe lè pe ilé-ìwòsàn kí o tó dé bẹ̀ àti ìmọ̀ràn omi mumi.',
      startBtn: 'Bẹ̀rẹ̀ Àyẹ̀wò Nísinsìnyí',
      formTitle: 'Fọ́ọ̀mù Àyẹ̀wò Ìlera',
      concernLabel: 'Ṣàlàyé ohun tí ń ṣe ọ́ tàbí aláìsàn náà ní èdè rẹ:',
      concernPlaceholder: 'F.a., Ibà ti ń ṣe mí fún ọjọ́ méjì, orí ń fọ́ mi gan-an, mo sì ń bì...',
      voiceInputBtn: 'Sọ̀rọ̀ Sí Kómpútà (Ohùn)',
      voiceListening: 'Mo ń gbọ́ ọ... sọ̀rọ̀ báyìí sí gbohùngbohùn rẹ',
      symptomsLabel: 'Yan gbogbo àwọn àmì tí o ń rí lára rẹ:',
      durationLabel: 'Ọjọ́ mélòó ni àmì náà ti wà?',
      exposureLabel: 'Ṣé o súnmọ́ ẹni tí a fura sí tàbí rìnrìn-àjò sí ibi tí àrùn wà ní ọjọ́ 21 sẹ́yìn?',
      bleedingLabel: 'Ṣé ẹ̀jẹ̀ ń tú jáde níbì kankan (eyín, imú, ojú, èébì, tàbí ìgbẹ́)?',
      breathingLabel: 'Ṣé èémí ńira púpọ̀ láti fà sínú?',
      consciousnessLabel: 'Ṣé ojú ń dúdú, dákú, tàbí gbogbo ara ń gbọ̀n (seizure)?',
      ageLabel: 'Ọjọ́ Orí:',
      stateLabel: 'Ìpínlẹ̀ Tí O Wà Ní Nàìjíríà:',
      adult: 'Àgbàlagbà (18–64)',
      child: 'Ọmọdé (kéré sí 18)',
      elderly: 'Arúgbó (65+)',
      submitTriageBtn: 'Ṣàyẹ̀wò Ewu Mi & Fún Mi Ní Ìtọ́sọ́nà',
      analyzingText: 'AI ń ṣàyẹ̀wò àwọn àmì gẹ́gẹ́ bí ìlànà NCDC & WHO...',
      resultTitle: 'Àbájáde Àyẹ̀wò Rẹ',
      listenBtn: 'Gbọ́ Ìtọ́sọ́nà Lórí Ohùn',
      stopListenBtn: 'Dá Ohùn Dúró',
      level1Title: 'Ipele 1: Ìtọ́jú Ní Ilé & Mímu Omi Púpọ̀',
      level2Title: 'Ipele 2: Ìbẹ̀wò Kíákíá Sí Ilé-Ìwòsàn Agbègbè',
      level3Title: 'Ipele 3: Ìtọ́sọ́nà Pàjáwìrì Kíákíá (Pe 6232)',
      callAheadNotice: 'ÌKÌLỌ̀ PÀTÀKÌ: Ṣáájú kí o tó sáré lọ sí ilé-ìwòsàn, pe nọ́mbà ọ̀fẹ́ NCDC 6232 kí àwọn dókítà lè múra sílẹ̀ de ọ pẹ̀lú aṣọ ààbò.',
      newConsultationBtn: 'Bẹ̀rẹ̀ Àyẹ̀wò Titun',
      validationError: 'Jọ̀wọ́ kọ àlàyé sí inú àpótí tàbí kí o yan ó kéré tán àmì àrùn kan lára àwọn káàdì nísàlẹ̀.',
      editAnswersBtn: 'Ṣàtúnṣe Àwọn Ìdáhùn Rẹ',
      consultationError: 'Àṣìṣe wáyé nígbà tí a ń kàn sí ẹ̀rọ. Àwọn ìdáhùn rẹ wà ní ààbò, a sì ti lo ìlànà agbègbè fún àyẹ̀wò rẹ nísàlẹ̀.',
      symptomSelectedCount: 'àmì àrùn tí a yàn'
    },
    assistant: {
      badge: 'Olùkọ́ Ìlera AI (Gemini)',
      title: 'Olùrànlọ́wọ́ Ìmọ̀ Ìlera AI',
      subtitle: 'Béèrè àwọn ìbéèrè nípa àrùn Ebola, bí a ṣe lè yẹra fún un, àti òfin ìjọba.',
      greeting: "Ẹ n lẹ́ o! Èmi ni Olùrànlọ́wọ́ Ìmọ̀ Ìlera EbolaGuard NG. Mo lè dáhùn àwọn ìbéèrè rẹ nípa àrùn Ebola, àbẹ́rẹ́ àjẹsára, àti ìlànà ìjọba.\n\n*Pàtàkì:* Ìmọ̀ ẹ̀kọ́ nìkan ni mo ń pèsè. N kò lè kọ oògùn fún ọ. Báwo ni mo ṣe lè ràn ọ́ lọ́wọ́ lónìí?",
      inputPlaceholder: 'Béèrè ìbéèrè (f.a. Ṣé wíwẹ̀ omi iyọ̀ dára? Kí ni àmì àkọ́kọ́?)...',
      sendBtn: 'Ránṣẹ́',
      thinking: 'Ó ń rò ó...',
      suggestedHeader: 'Àwọn Ìbéèrè Tí Ènìyàn Ń Béèrè:',
      q1: 'Ṣé àrùn Ebola wà ní Nàìjíríà báyìí?',
      q2: 'Ṣé mímu omi iyọ̀ lè dènà Ebola?',
      q3: 'Ṣé Ebola ń gba inú afẹ́fẹ́ ràn bíi COVID-19?',
      q4: 'Àbẹ́rẹ́ àjẹsára àti oògùn wo ló wà fún Ebola?',
      fullCheckerBtn: 'Àyẹ̀wò Ewu Lẹ́kùnrẹ́rẹ́',
      disclaimer: 'EbolaGuard NG wà fún ìmọ̀ ìlera gbogbogbò. Kì í ṣe dípò dókítà ilé-ìwòsàn.'
    },
    findHelp: {
      badge: 'Àwọn Ilé-Ìwòsàn Àti Ibùdó Ìsọtọ̀',
      title: 'Wá Ilé-Ìwòsàn Tó Dá Dájú Ní Nàìjíríà',
      subtitle: 'Àtòjọ àwọn ilé-ìwòsàn ńlá, federal medical centres, àti ibùdó ìsọtọ̀ ní gbogbo ìpínlẹ̀ 36 àti Abuja.',
      searchPlaceholder: 'Wá ilé-ìwòsàn nípasẹ̀ orúkọ, ìlú tàbí àdírẹ́sì...',
      stateFilterAll: 'Gbogbo Ìpínlẹ̀ Nàìjíríà',
      emergencyDesk: 'Tẹlifóònù Pàjáwìrì:',
      officialPortal: 'Ojúewé Wẹ́ẹ̀bù:',
      website: 'Ojúewé Wẹ́ẹ̀bù',
      verifiedOn: 'Ìfidájú:',
      noFacilityTitle: 'A kò tí ì rí ilé-ìwòsàn pàtó fún ìpínlẹ̀ yìí.',
      noFacilityDesc: 'Gbogbo ìpínlẹ̀ ni ó ní àwọn dókítà tó ń ṣiṣẹ́ pẹ̀lú NCDC láti dáhùn sí pàjáwìrì.',
      callNcdcDispatch: 'Pe NCDC 6232 fún Ọkọ̀ Aláìsàn (Ambulance)'
    },
    resources: {
      badge: 'Àwọn Ìwé Ìkìlọ̀ Àti Ìwé Pélébé',
      title: 'Àwọn Ìwé Ìkìlọ̀ Ìlera Tó Ní Àṣẹ',
      subtitle: 'Gba sílẹ̀, tẹ̀ ẹ́ jáde, kí o sì pín àwọn ìwé ní èdè Gẹ̀ẹ́sì, Píjíìnì, Yorùbá, Hausa, àti Igbo.',
      langFilterAll: 'Gbogbo Èdè',
      downloadMaterialBtn: 'Gba Ìwé Náà Sílẹ̀',
      downloadedSuccess: 'Ìwé ti wọlé sí ẹ̀rọ rẹ!'
    },
    faq: {
      badge: 'Àwọn Ìbéèrè Tí A Máa Ń Béèrè',
      title: 'Àwọn Ìbéèrè Tí Ó Wọ́pọ̀ (FAQ)',
      subtitle: 'Ìdáhùn tòótọ́ sí àwọn ìbéèrè pàtàkì nípa bí àrùn ṣe ń ràn, oògùn èké, àti bí a ṣe lè dáàbò bo ara.',
      searchPlaceholder: 'Wá ìbéèrè (f.a. omi iyọ̀, àbẹ́rẹ́, bí ó ṣe ń ràn)...',
      catAll: 'Gbogbo Ìbéèrè',
      catBasics: 'Ìbẹ̀rẹ̀ Ebola',
      catTransmission: 'Bí Ó Ṣe Ń Ràn',
      catPrevention: 'Dídènà Rẹ̀',
      catMedical: 'Oògùn & Àbẹ́rẹ́',
      catMyths: 'Irọ́ Àti Òtítọ́',
      calloutTitle: 'Ṣé o ṣì ní ìbéèrè tí a kò tí ì dáhùn?',
      calloutDesc: 'O lè bá AI Health Assistant sọ̀rọ̀ tàbí pe nọ́mbà ọ̀fẹ́ NCDC 6232 ní wákàtí 24 gbogbo ọjọ́.',
      callNcdcBtn: 'Pe NCDC 6232'
    },
    aboutUs: {
      badge: 'Ète & Ìṣàkóso Wa',
      title: 'Nípa EbolaGuard NG',
      subtitle: 'Ojúewé ìlera ti gbogbo ará Nàìjíríà láti pèsè ìmọ̀ tòótọ́, gbógun ti ìròyìn èké, àti pèsè ìmọ̀ràn AI fún gbogbo ènìyàn.',
      devCreditBadge: 'Official Developer Credit',
      devCreditTitle: 'Developed by OLANREWAJU SAMUEL',
      devCreditDesc: 'EbolaGuard NG was conceptualized and developed by OLANREWAJU SAMUEL as a high-fidelity digital response to public health crises in Nigeria and West Africa, blending robust software engineering with verified epidemiological science.',
      pillar1Title: 'Ìròyìn Tòótọ́',
      pillar1Desc: 'Gbogbo àkọsílẹ̀ wá láti ọwọ́ NCDC, Ilé-iṣẹ́ Ìlera ti Orílẹ̀-Èdè, àti WHO.',
      pillar2Title: 'Ìmọ̀ Tètè',
      pillar2Desc: 'Kíkọ́ àwọn ènìyàn láti mọ àmì àrùn tètè kí ìtọ́jú ilé-ìwòsàn lè gbéṣẹ́.',
      pillar3Title: 'Ìlànà AI Tó Dá Dájú',
      pillar3Desc: 'A kọ́ ọ pẹ̀lú òfin ìlera tó péye, láìsí àkọsílẹ̀ èké tàbí pípín àṣírí ẹnikẹ́ni.'
    },
    contact: {
      badge: 'Ìjábọ̀ Ìròyìn Èké & Ìbánisọ̀rọ̀',
      title: 'Jábọ̀ Ìròyìn Èké & Bá Wa Sọ̀rọ̀',
      subtitle: 'Dáàbò bo àwùjọ rẹ nípa jíjábọ̀ àwọn oògùn èké tàbí kí o fi ìmọ̀ràn ránṣẹ́ sí àwọn onímọ̀ ẹ̀rọ ìlera wa.',
      tabMisinformation: 'Jábọ̀ Ìròyìn Èké / Oògùn Irọ́',
      tabFeedback: 'Ìbánisọ̀rọ̀ & Ìmọ̀ràn Gbogbogbò',
      categoryLabel: 'Oríṣi Ìròyìn Èké Náà:',
      catFakeCure: 'Oògùn Èké (f.a. Wíwẹ̀ omi iyọ̀)',
      catFalseDeath: 'Ikú Irọ́ tàbí Ìròyìn Àjakálẹ̀ Èké',
      catHiddenCase: 'Fura Sí Aláìsàn Tí A Fi Pamọ́',
      catOther: 'Àwọn Ìròyìn Aṣini Lọ́nà Mìíràn',
      sourceUrlLabel: 'Níbo ni o ti gbọ́ tàbí rí i? (WhatsApp, Facebook, Rédíò):',
      sourceUrlPlaceholder: 'F.a., Ohùn WhatsApp, àtẹ̀jáde Facebook...',
      descriptionLabel: 'Ṣàlàyé ohun tí wọ́n sọ lẹ́kùnrẹ́rẹ́:',
      descriptionPlaceholder: 'Ṣàlàyé ohun tí wọ́n sọ, ẹni tó ń sọ ọ́, àti ìlú tí ó ti ń ṣẹlẹ̀...',
      submitReportBtn: 'Fi Ránṣẹ́ Fún Àyẹ̀wò',
      nameLabel: 'Orúkọ Rẹ Lẹ́kùnrẹ́rẹ́:',
      emailLabel: 'Àdírẹ́sì Ímeèlì Rẹ:',
      messageLabel: 'Ọ̀rọ̀ Tí O Fẹ́ Sọ:',
      sendFeedbackBtn: 'Fi Ránṣẹ́',
      emergencyWarning: 'Ìkìlọ̀ Pàjáwìrì: Fọ́ọ̀mù yìí kò wà fún aláìsàn tó le báyìí. Bí ẹnìkan bá ń ṣàìsàn gidigidi, pe NCDC 6232 kíákíá.'
    },
    admin: {
      title: 'Ojúewé Àwọn Òṣìṣẹ́ & Alákòóso',
      subtitle: 'Àyè àṣírí fún àwọn olóòtú àti àwọn onímọ̀ ìfidájú àkọsílẹ̀.',
      emailPlaceholder: 'Àdírẹ́sì Ímeèlì',
      passwordPlaceholder: 'Ọ̀rọ̀ Ìgbaniwọlé',
      loginBtn: 'Wọle Sí Ojúewé Alákòóso',
      demoNote: 'Fún Àwọn Òṣìṣẹ́ Nìkan (Ọ̀rọ̀ awo: EbolaGuard2026!)',
      logoutBtn: 'Jáde Kúrò',
      tabOverview: 'Àkópọ̀',
      tabArticles: 'Àwọn Àkọsílẹ̀',
      tabUpdates: 'Ìròyìn Titun',
      tabStatistics: 'Àkọsílẹ̀ Nọ́mbà',
      tabSources: 'Àwọn Orísun',
      tabReports: 'Ìjábọ̀ Ìròyìn Èké',
      tabHealth: 'Àlàáfíà Ẹ̀rọ'
    },
    footer: {
      brandDescription: 'AI-powered Ebola prevention and early risk detection platform for Nigeria. Helping Nigerian communities detect risk early, understand symptoms, prevent outbreaks, and access rapid medical guidance.',
      builtWithPurpose: 'Built with purpose for Nigerian and global health security',
      platformHeader: 'Platform',
      legalHeader: 'Legal & Ethics',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service & Disclaimer',
      clinicalEthics: 'Clinical Data Ethics',
      emergencyContacts: 'Emergency Contacts (6232)',
      reportMisinfo: 'Report Misinformation',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      copyright: '© 2026 EbolaGuard NG. All rights reserved. Not for medical diagnosis.',
      sdgLabel: 'SDG 3 Aligned: Good Health and Well-being'
    },
    privacy: {
      badge: 'Privacy & Data Protection Principles',
      title: 'Ìlànà Àṣírí Àti Ààbò Àkọsílẹ̀',
      subtitle: 'Àtúnṣe Ìkẹyìn: Oṣù Kẹwàá 2026 · Bá Òfin NDPA Nàìjíríà Mu.',
      introTitle: '1. Ọ̀rọ̀ Àkọ́kọ́',
      introText: 'EbolaGuard NG fi ọwọ́ pàtàkì mú ààbò àṣírí gbogbo ènìyàn.',
      anonTitle: '2. Àyẹ̀wò AI Láìbéèrè Orúkọ',
      anonText: 'A kò ní béèrè fún orúkọ rẹ, NIN, BVN, tàbí àdírẹ́sì ilé rẹ láé.',
      noSaleTitle: '3. A Kò Ní Ta Àkọsílẹ̀ Rẹ',
      noSaleText: 'A kì í ta tàbí fi ọ̀rọ̀ ìlera rẹ ran àwọn oníṣòwò tàbí ilé-iṣẹ́ ìpolówó.',
      serverSecurityTitle: '4. Ààbò Ẹ̀rọ Ayélujára',
      serverSecurityText: 'Gbogbo ìbánisọ̀rọ̀ AI ń gba ojúewé tó ní ààbò kọjá.',
      retentionTitle: '5. Pípa Àkọsílẹ̀ Rẹ́',
      retentionText: 'A máa ń pa gbogbo àkọsílẹ̀ rẹ́ láàárín wákàtí 48.'
    },
    terms: {
      badge: 'Legal Disclaimer & Conditions of Use',
      title: 'Àwọn Òfin Àti Ìkìlọ̀ Ìlera',
      subtitle: 'Àwọn ààlà pàtàkì fún lílo ojúewé ìlera EbolaGuard NG.',
      term1Title: '1. Fún Ẹ̀kọ́ Nìkan',
      term1Text: 'EbolaGuard NG wà fún ìmọ̀ ẹ̀kọ́ gbogbogbò. Kì í ṣe dípò dókítà ilé-ìwòsàn tàbí àyẹ̀wò ẹ̀jẹ̀.',
      term2Title: '2. Ìlànà Pàjáwìrì',
      term2Text: 'Bí ẹnìkan bá ń bì tàbí tú ẹ̀jẹ̀ jáde pẹ̀lú ibà líle, pe NCDC 6232 lẹ́sẹ̀kẹsẹ̀.',
      term3Title: '3. Ìtọ́sọ́nà NCDC & WHO',
      term3Text: 'Gbogbo ìròyìn wa wà ní ìbámu pẹ̀lú àwọn ìlànà NCDC àti WHO.',
      term4Title: '4. Ààlà Ẹrù-iṣẹ́',
      term4Text: 'EbolaGuard NG àti olùkọ́ rẹ̀ OLANREWAJU SAMUEL pèsè ètò yìí láti ran orílẹ̀-èdè lọ́wọ́.'
    },
    disclaimer: {
      short: 'EbolaGuard NG wà fún ìmọ̀ ìlera gbogbogbò. Kì í ṣe dípò dókítà ilé-ìwòsàn.',
      emergencyCall: 'Fún pàjáwìrì, pe nọ́mbà NCDC 6232 kíákíá.'
    },
    auth: {
      signIn: 'Wọle (Sign In)',
      signUp: 'Ṣẹda Akọọlẹ (Create Account)',
      signOut: 'Wọ jade (Sign Out)',
      createAccount: 'Ṣẹda Akọọlẹ',
      myAccount: 'Akọọlẹ Mi',
      emailLabel: 'Adirẹsi Imeeli',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Ọrọigbaniwọle',
      passwordPlaceholder: 'Tẹ ọrọigbaniwọle rẹ',
      confirmPasswordLabel: 'Tẹ Ọrọigbaniwọle Lẹẹkan Si',
      confirmPasswordPlaceholder: 'Tún ọrọigbaniwọle rẹ tẹ',
      fullNameLabel: 'Orukọ Rẹ Lẹkunrẹrẹ',
      fullNamePlaceholder: 'b.a. Dr. Amina Bello',
      forgotPasswordLink: 'Njẹ o gbagbe ọrọigbaniwọle?',
      rememberMe: 'Ranti igba mi',
      dontHaveAccount: 'Ṣe o ko ti ni akọọlẹ?',
      alreadyHaveAccount: 'Ṣe o ti ni akọọlẹ tẹlẹ?',
      signInTitle: 'Wọle si EbolaGuard NG',
      signInSubtitle: 'Wọle lati wo itan ilera rẹ ati ṣakoso awọn ikilọ ajakalẹ-arun.',
      signUpTitle: 'Ṣẹda Akọọlẹ EbolaGuard',
      signUpSubtitle: 'Darapọ mọ ẹgbẹẹgbẹrun awọn ọmọ orilẹ-ede Naijiria ti n ri aabo.',
      forgotTitle: 'Gba Ọrọigbaniwọle Rẹ Pada',
      forgotSubtitle: 'Tẹ imeeli rẹ sii lati gba ọna abawọle imularada.',
      resetPasswordBtn: 'Fi Imeeli Atunṣe Ránṣẹ́',
      backToSignIn: 'Pada si Oju-iwe Wọle',
      showPassword: 'Fi ọrọigbaniwọle han',
      hidePassword: 'Pa ọrọigbaniwọle mọ',
      passwordRequirements: 'Ọrọigbaniwọle gbọdọ to o kere ju lẹta 6.',
      passwordMatchError: 'Awọn ọrọigbaniwọle mejeeji ko baramu.',
      passwordLengthError: 'Ọrọigbaniwọle gbọdọ to o kere ju lẹta 6.',
      emailRequiredError: 'Jọwọ tẹ adirẹsi imeeli to tọ.',
      nameRequiredError: 'Jọwọ tẹ orukọ rẹ lẹkunrẹrẹ.',
      registrationSuccess: 'A ti ṣẹda akọọlẹ rẹ ni aṣeyọri!',
      emailConfirmNotice: 'Ti iṣẹ Supabase rẹ ba nilo ijẹrisi imeeli, jọwọ ṣayẹwo apo-iwọle rẹ ṣaaju ki o to wọle.',
      resetEmailSent: 'A ti fi ọna abawọle atunṣe ranṣẹ si imeeli rẹ!',
      publicNotice: 'Awọn ilana pajawiri, iṣiro ajakalẹ-arun, ati ayẹwo aisan wa ni ọfẹ fun gbogbo eniyan laisi wọle.',
      accountTitle: 'Akọọlẹ & Profaili Ilera',
      accountSubtitle: 'Ṣakoso awọn alaye rẹ, ipinlẹ rẹ ni Naijiria, ati awọn eto ikilọ ajakalẹ.',
      editProfile: 'Ṣatunkọ Profaili Ilera',
      saveChanges: 'Fi Awọn Iyipada Pamọ',
      saving: 'O n fipamọ...',
      profileUpdated: 'A ti ṣe imudojuiwọn profaili rẹ ni aṣeyọri.',
      phoneLabel: 'Nọmba Foonu Pajawiri',
      stateLabel: 'Ipinlẹ Rẹ ni Naijiria',
      memberSince: 'O ti di ọmọ ẹgbẹ lati',
      securitySettings: 'Aabo & Ipo Akọọlẹ',
      verifiedAccount: 'Supabase ti fọwọsi',
      alertPreferences: 'Awọn Ikilọ Pajawiri NCDC',
      smsAlerts: 'Gba awọn ifiranṣẹ SMS pajawiri NCDC',
      emailAlerts: 'Gba iwe iroyin ilera lodọọdun',
      emergencyQuickLinks: 'Awọn Iṣe Ilera Kíákíá',
      viewAssessments: 'Bẹrẹ Ayẹwo Aisan',
      facilityDirectory: 'Wa Awọn Ilé-Ìwòsàn Nitosi',
      outbreakFeed: 'Wo Awọn Iroyin Ajakalẹ',
      loginRequiredTitle: 'O Ni Lati Wọle',
      loginRequiredDesc: 'Jọwọ wọle tabi ṣẹda akọọlẹ lati wọle si profaili EbolaGuard NG rẹ.'
    }
  },

  // ==========================================
  // HAUSA (ha)
  // ==========================================
  ha: {
    brandName: 'EbolaGuard NG',
    tagline: 'Ingantaccen Bayani. Fadakarwa Da Wuri. Al\'umma Mai Aminci.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    common: {
      emergencyCallText: 'Kira NCDC Kyauta a 6232',
      hotline: '6232',
      altHotline: '+234 800 9700 0010',
      readMore: 'Karanta Cikakken Bayani',
      learnMore: 'Koyi Karin Bayani',
      viewDetails: 'Duba Cikakken Bayani',
      close: 'Rufe',
      cancel: 'Soke',
      submit: 'Aika',
      search: 'Bincika',
      filter: 'Tantance',
      all: 'Duka',
      loading: 'Yana lodawa...',
      submitting: 'Yana aikawa...',
      thinking: 'AI yana nazari...',
      success: 'An yi nasara',
      error: 'An samu kuskure',
      clear: 'Share',
      back: 'Koma Baya',
      download: 'Sauke',
      share: 'Raba',
      copyLink: 'Kwafi Adireshin',
      verified: 'Ingantacce daga NCDC',
      official: 'Na Gwamnati',
      lowRisk: 'Hadari Kadan',
      highRisk: 'Hadari Babba',
      zeroCases: 'Babu Wanda Ya Kamu (0)',
      days: 'Kwanaki',
      status: 'Hali',
      source: 'Tushe',
      location: 'Wuri',
      date: 'Kwanan Wata',
      emergency: 'Gaggawa'
    },
    nav: {
      home: 'Gida (Home)',
      riskAssessment: 'Binciken Hadari',
      prevention: 'Rigakafi',
      about: 'Game da Ebola',
      updates: 'Labaran Yanzu',
      dashboard: 'Kididdiga',
      facilities: 'Asibitoci',
      emergency: 'Taimakon Gaggawa',
      resources: 'Kayan Fadakarwa',
      faq: 'Tambayoyi',
      aboutUs: 'Game da Mu',
      contact: 'Rahoto / Tuntuba',
      admin: 'Shugabanci',
      staff: 'Ma\'aikata',
      getGuidance: 'Nemi Shawarar Lafiya'
    },
    alert: {
      officialBadge: 'Sanarwar Lafiya Daga NCDC',
      source: 'Tushe: Cibiyar Kula da Cututtuka ta Kasa (NCDC)',
      verifiedOn: 'Tabbatarwa: Oktoba 2026',
      readFullBrief: 'Karanta Cikakken Bayani',
      dismiss: 'Rufe sanarwa',
      locationLabel: 'Wuri',
      publishedLabel: 'Ranar Buga'
    },
    hero: {
      topPill: 'Daidai da SDG 3 · Karfin AI · Sirrin Mai Amfani',
      headline: 'Kare Najeriya Daga Cutar',
      headlineHighlight: 'Ebola Da Annoba',
      subheadline: 'Samu ingantaccen bayani kan cutar Ebola daga NCDC da WHO. Yi amfani da Likitan Virtual don binciken lafiyarka da kare iyalinka.',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      trustLine: 'Bisa Ka\'idojin NCDC & WHO · Ba Ma Ajiye Bayananka Masu Zaman Kansu',
      startHere: '👇 Fara Daga Nan',
      doctorBtn: 'Yi Magana da Likita',
      updatesBtn: 'Duba Sabbin Labarai',
      learnBtn: 'Koyi Rigakafi'
    },
    cards: {
      understand: 'Fahimtar Ebola',
      understandDesc: 'Yadda take yaduwa, rabe-raben kwayar cutar, da lokacin da take bayyana a jiki.',
      symptoms: 'Gane Alamomi',
      symptomsDesc: 'Zazzabi mai zafi, amai, zawo, da matsananciyar gajiya marar misaltuwa.',
      prevention: 'Matakan Rigakafi',
      preventionDesc: 'Wanke hannu da sabulu da ruwa, guje wa taba ruwan jikin marar lafiya ko gawa.',
      guidance: 'Neman Taimako',
      guidanceDesc: 'Kira layin NCDC kyauta a 6232 don samun agaji cikin gaggawa a kowace jiha.'
    },
    home: {
      liveSurveillance: 'Tsarin Kula Da Cututtuka (Surveillance)',
      metrics: {
        activeCases: 'Wadanda Ke Dauke Da Ebola (Najeriya)',
        totalFatalities: 'Wadanda Suka Rasu (Najeriya)',
        portScreenings: 'Gwajin Shiga Filin Jirgi & Iyakoki',
        diagnosticLabs: 'Cibiyoyin Gwaje-Gwaje Masu Lasisi',
        nationalStatus: 'Halin Najeriya: Babu wani mutum da ya kamu a 2026',
        borderStatus: 'Ana ci gaba da gwajin shiga a filin jirgin Legas, Abuja da tashoshin jirgin ruwa',
        activeCasesUnit: 'mutane',
        fatalitiesUnit: 'rasuwa',
        labsUnit: 'dakunan gwaji',
        verifiedDate: 'Tabbatarwar NCDC: Oktoba 2026'
      },
      stateTableTitle: 'Kula Da Cututtuka a Kowace Jiha Da Iyakokin Kasa',
      stateTableSubtitle: 'Rahoton kai tsaye daga likitocin kula da annoba na jihohi da jami\'an kiwon lafiya a iyakoki.',
      stateColState: 'Jiha / Yanki',
      stateColScreenings: 'Yawan Gwajin Da Aka Yi',
      stateColStatus: 'Matsayin Tsaro',
      stateColRisk: 'Matakin Hadari',
      stateSearchPlaceholder: 'Nemi jiharka ko iyakarki...',
      newsletterTitle: 'Sami Sakonnin Gaggawa a Wayarka Kyauta',
      newsletterDesc: 'Samu sakon SMS ko WhatsApp kai tsaye idan NCDC ta fitar da gargadin gaggawa.',
      smsTab: 'Sakon SMS',
      whatsappTab: 'Sakon WhatsApp',
      phonePlaceholder: 'Sanya lambar wayarka (misali 0803 123 4567)...',
      subscribeBtn: 'Yi Rajista Kyauta',
      subscribedSuccess: 'Mun gode! Za ka rika samun ingantattun sakonnin lafiya.',
      privacyNote: 'Lambar wayarka tana da cikakken tsaro kuma ba za a raba ta da kowa ba.',
      sdgTitle: 'Manufar Majalisar Dinkin Duniya Ta SDG 3',
      sdgDesc: 'Tabbatar da koshin lafiyar dukkan al\'ummar Najeriya ta hanyar fasahar zamani.'
    },
    aboutEbola: {
      badge: 'Ingantaccen Bayanin Lafiya',
      title: 'Fahimtar Cutar Ebola (EVD)',
      subtitle: 'Cikakken bayani kan yadda cutar ke yaduwa, rabe-raben kwayoyin cutar, da shirye-shiryen Najeriya.',
      whatIsTitle: 'Mene Ne Cutar Ebola?',
      whatIsText: 'Cutar kwayar cutar Ebola cuta ce mai tsanani da ka iya kisa idan ba a samu kulawar gaggawa ba. An fara gano ta a shekarar 1976 kusa da Kogin Ebola a kasar Jamhuriyar Dimokuradiyyar Kongo.',
      transmissionTitle: 'Yadda Cutar Ke Yaduwa',
      transmissionDirect: 'Taba Ruwan Jiki: Shafar jini, amai, miyau, fitsari, ko kashin mai cutar ko gawar wanda ya rasu sakamakon cutar.',
      transmissionNotAir: 'BA TA YADUWA TA ISKA: Ebola ba ta tafiya a iska kamar mura ko COVID-19. Dole ne sai mutum ya taba ruwan jikin mai ciwon kai tsaye.',
      transmissionBushmeat: 'Naman Daji: Taba jemagu ko biran da suka mutu a daji, ko yanka naman daji marar lafiya.',
      transmissionBurials: 'Binne Gawa Cikin Hadari: Wanke gawar wanda ya mutu sakamakon zazzabin jini na daya daga cikin manyan hanyoyin kamuwa.',
      speciesTitle: 'Nau\'o\'i Shida na Cutar Ebola da Aka Sani',
      incubationTitle: 'Lokacin Zama na Cutar a Jiki (Kwanaki 2 zuwa 21)',
      incubationText: 'Mutumin da ya kamu da Ebola BA ZAI IYA shafawa wani ba har sai alamomin ciwo sun bayyana a jikinsa. Tsawon lokacin yana tsakanin kwanaki 2 zuwa 21 (mafi yawanci kwanaki 8 zuwa 10).'
    },
    symptoms: {
      badge: 'Jagoran Alamomi & Tantance Hadari',
      title: 'Alamomin Cutar & Binciken Hadari',
      subtitle: 'Koyi yadda alamomin ke bayyana, dalilin da ya sa gwajin jini ke da muhimmanci, da matakan gaggawa.',
      earlyTitle: 'Mataki na 1: Alamomin Farko (Kwana 1 zuwa 3)',
      earlyDesc: 'Zazzabi mai zafi kwatsam, matsananciyar gajiya, ciwon kai, da ciwon gabobi. Yana kama da zazzabin cizon sauro da typhoid.',
      gastroTitle: 'Mataki na 2: Matsalar Ciki (Kwana 4 zuwa 7)',
      gastroDesc: 'Zawo mai ruwa-ruwa, yawan amai, ciwon ciki mai tsanani, da rashin cin abinci wanda ke janyo kishirwa.',
      severeTitle: 'Mataki na 3: Matsanancin Hadari (Kwana 7+)',
      severeDesc: 'Zubar jini daga hakora, ido, amai ko bayan gida, rudewa, da lalacewar sassan jiki. Yana bukatar kebewa a asibiti cikin gaggawa.',
      checkerTitle: 'Tantance Alamomin Lafiyarka',
      checkerInstruction: 'Zabi duk alamomin da kake ji a jikinka a halin yanzu:',
      exposureQuestion: 'Ka taba mai tsananin rashin lafiya ko ka yi tafiya zuwa inda ake da Ebola a cikin kwanaki 21 da suka wuce?',
      urgentWarning: 'Gargadi Mai Muhimmanci: Alamomin farko suna kama da malaria. KADA ka sha ko wanka da ruwan gishiri! Kira NCDC a 6232.',
      callAheadReminder: 'Dokar Sanarwa Kafin Zuwa: Koyaushe a kira asibiti a waya kafin a tafi domin likitoci su sanya rigunan kariya.',
      feverLabel: 'Zazzabi Mai Zafi na Fatan Kai (>38°C)',
      fatigueLabel: 'Mugun Kasala da Rashin Karfi',
      headacheLabel: 'Ciwon Kai Mai Tsanani',
      musclePainLabel: 'Ciwon Tsokoki da Gabobin Jiki',
      soreThroatLabel: 'Ciwon Makogwaro / Wahalar Hadiya',
      vomitingLabel: 'Yawan Amai Ba Kakkautawa',
      diarrheaLabel: 'Gudawa Mai Ruwa-Ruwa',
      abdominalPainLabel: 'Mugun Ciwon Ciki',
      bleedingLabel: 'Zubar Jini Ba Gaira Ba Dalili'
    },
    prevention: {
      badge: 'Ka\'idojin Rigakafin Cututtuka',
      title: 'Rigakafin Ebola & Kare Al\'umma',
      subtitle: 'Tsabtace hannu, kula da marasa lafiya cikin aminci, da matakan binne mamata da mutunci.',
      roleWarningTitle: 'Bambanci Mai Mahimmanci: Jama\'a da Kwararrun Likitoci',
      roleWarningText: 'Kada wanda ba kwararre ba ya yi kuskuren wanke mayafin da jini ya taba, ko wanke gawar wanda ya rasu sakamakon zazzabin jini.',
      tabPublic: 'Daukacin Jama\'a',
      tabHealthcare: 'Ma\'aikatan Kiwon Lafiya',
      tabBurial: 'Binne Mamaci Lafiyayye',
      handwashingTitle: 'Ka\'idar Wanke Hannu',
      handwashingText: 'Wanke hannu sosai da sabulu da ruwa mai gudu na a kalla sakanni 30, ko amfani da sinadarin wanke hannu mai giya kashi 60%.',
      foodSafetyTitle: 'Tsabtar Abinci da Nama',
      foodSafetyText: 'Guje wa taba jemagu ko biran daji marasa lafiya. Dafa nama sosai kafin ci.',
      dosListTitle: 'Abubuwan Da Ya Kamata Ka Yi (DOs)',
      dontsListTitle: 'Abubuwan Da KADA Ka Yi (DONTs)',
      saltMythTitle: 'Wanka Da Ruwan Gishiri Karya Ne Kuma Hadari Ne!',
      saltMythText: 'Sha ko wanka da ruwan gishiri mai zafi BA YA karewa ko maganin Ebola. Ya taba kashe mutane sakamakon gubar gishiri.'
    },
    updates: {
      badge: 'Labaran Sa-Ido Na Yanzu',
      title: 'Ingantattun Labaran Annoba',
      subtitle: 'Sanarwar gwamnati daga NCDC da WHO da aka tabbatar da ingancinsu.',
      searchPlaceholder: 'Bincika labarai da jiha ko take...',
      filterAll: 'Duk Labaran',
      filterAnnouncements: 'Sanarwa',
      filterAdvisories: 'Gargadi',
      filterGuidelines: 'Ka\'idoji',
      modalTitle: 'Cikakken Bayanin Gwamnati',
      verifiedStamp: 'Bayanin NCDC / WHO Da Aka Tabbatar',
      viewSource: 'Duba Asalin Tushe'
    },
    statistics: {
      badge: 'Kididdigar Annoba',
      title: 'Kididdiga Da Lambobin Annoba',
      subtitle: 'Ingantattun alkaluma daga NCDC da WHO ba tare da boye komai ba.',
      geoFilter: 'Yanki',
      timeframeFilter: 'Zagayen Shekara',
      downloadBtn: 'Sauke Bayanan CSV',
      activeCasesTitle: 'Wadanda Ke Dauke Da Cuta (Najeriya)',
      fatalitiesTitle: 'Wadanda Suka Rasu (Najeriya)',
      screeningsTitle: 'Gwajin Iyakoki',
      labsTitle: 'Dakunan Gwaji Masu Lasisi',
      trendTitle: 'Jadawalin Gwajin Shekarar 2026',
      stateSurveillanceTitle: 'Sa-Ido a Kowace Jiha'
    },
    emergencyHelp: {
      badge: 'Gaggawar Amsa Kan Lafiyar Jama\'a',
      title: 'Taimakon Gaggawa da Matakan Gaggawa',
      subtitle: 'Layin wayar gaggawa kai tsaye na Hukumar Kula da Cututtuka ta Kasa (NCDC), Tawagar Amsa ta Jihohi, da motocin daukar marasa lafiya.',
      nationalCentre: 'Cibiyar Gudanar da Ayyukan Gaggawa ta Kasa',
      ncdcHotlineTitle: 'Layin Waya Kyauta na NCDC',
      ncdcHotlineDesc: 'Kira kyauta sa\'o\'i 24 a kowace rana daga MTN, Airtel, Glo, da 9mobile.',
      altHotlineLabel: 'Sauran Layukan Waya:',
      smsDeskLabel: 'Sashin Sakonnin SMS:',
      callAheadTitle: 'Dokar Dole ta "Kira Kafin Ka Tafi"',
      callAheadWarning: 'Idan kai ko wani a gidanka ya sami zazzabi mai tsanani tare da amai, gudawa, ko zubar jini, KADA ka tafi asibiti kai tsaye ba tare da ka fara kira ba.',
      step1: '1. Kira asibiti kafin ka bar gida: Sanar da ma\'aikatan asibiti cewa majiyyaci na nuna alamomin zazzabin zubar jini domin su shirya.',
      step2: '2. Ba ma\'aikatan lafiya damar shiri: Dole ne likitoci da ma\'aikatan jinya su sanya kayan kariya na musamman (PPE) don kare sauran marasa lafiya.',
      step3: '3. Guji shiga motocin haya na jama\'a: Kada ka shiga bas ko tasi. Nemi NCDC ko asibiti su aiko da motar daukar marasa lafiya ta musamman.',
      nemaTitle: 'Gaggawar Kasa (NEMA)',
      nemaDesc: 'Layin hadin gwiwa na \'yan sanda, kashe gobara, da motar daukar marasa lafiya a fadin kasa.',
      nemaBtn: 'Kira 112',
      lagosTitle: 'Ma\'aikatar Lafiya ta Jihar Legas',
      lagosDesc: 'Asibitin Mainland IDH Yaba da Amsar Gaggawa.',
      redCrossTitle: 'Kungiyar Red Cross ta Najeriya',
      redCrossDesc: 'Agajin gaggawa na farko a cikin al\'umma da amsar bala\'i.',
      viewDirectoryBtn: 'Duba Jerin Asibitocin Jihohi 36 →'
    },
    virtualDoctor: {
      badge: 'Likitan Virtual & Binciken AI',
      title: 'Binciken Hadari Tare Da Likitan Virtual',
      subtitle: 'Amsa wasu tambayoyi game da alamomin jikinka domin samun shawarar likita ta musamman — wadda aka kera don al\'ummar Najeriya.',
      welcomeHeader: 'Sakon Maraba & Bayanin Gaskiya',
      welcomeText: "Sannu! Ni ne Likitan Virtual na EbolaGuard, mataimakin kiwon lafiya na AI. Zan iya taimaka maka fahimtar alamomin da kake ji, ba ka shawarwarin lafiya, da sanar da kai lokacin da ya kamata ka gaggauta zuwa asibiti. Amma ni ba likita na mutum ba ne, kuma ba zan iya maye gurbin gwajin jini a asibiti ba. Idan al'amari ne na gaggawa, kira 6232 nan take.",
      step1Title: '1. Bayyana Alamomi',
      step1Desc: 'Sanya kwanakin zazzabi, matsananciyar gajiya, da alakar ka da marar lafiya.',
      step2Title: '2. Rarraba Matakin Hadari',
      step2Desc: 'Zai raba yanayin zuwa Mataki na 1 (Gida), Mataki na 2 (Karamar Asibiti), ko Mataki na 3 (Gaggawa).',
      step3Title: '3. Samun Cikakkiyar Shawara',
      step3Desc: 'Samu shawarar yadda za a kira asibiti kafin a je da yadda za a sha ruwa.',
      startBtn: 'Fara Binciken Lafiya Yanzu',
      formTitle: 'Takardar Tambayoyin Lafiya',
      concernLabel: 'Bayyana abin da kake ji a jikinka ko marar lafiya a cikin kalamanka:',
      concernPlaceholder: 'Misali: Ina fama da zazzabi mai zafi tun kwanaki biyu, ciwon kai, da amai...',
      voiceInputBtn: 'Yi Magana Da Murya (Mic)',
      voiceListening: 'Ina sauraronka... yi magana yanzu cikin na\'urarka',
      symptomsLabel: 'Zabi duk alamomin da kake ji a jikinka:',
      durationLabel: 'Kwanaki nawa kenan alamomin suka fara?',
      exposureLabel: 'Ka taba wanda ake zargi da Ebola ko ka je wurin da ake da ciwon a kwanaki 21 da suka wuce?',
      bleedingLabel: 'Akwai wani zubar jini ba gaira ba dalili (hakora, hanci, ido, amai ko bayan gida)?',
      breathingLabel: 'Akwai matsananciyar matsalar numfashi?',
      consciousnessLabel: 'Akwai rudewa, suma, ko farfadiya?',
      ageLabel: 'Rukuni na Shekaru:',
      stateLabel: 'Jihar Da Kake Ciki a Najeriya:',
      adult: 'Babba (18–64)',
      child: 'Yaro (kasa da 18)',
      elderly: 'Tsoho (65+)',
      submitTriageBtn: 'Tantance Hadarina & Samu Shawara',
      analyzingText: 'AI yana duba alamomi bisa ka\'idojin NCDC & WHO...',
      resultTitle: 'Sakamakon Bincikenka',
      listenBtn: 'Saurari Shawara Ta Murya',
      stopListenBtn: 'Dakata Da Murya',
      level1Title: 'Mataki na 1: Kulawar Gida & Yawan Shan Ruwa',
      level2Title: 'Mataki na 2: Ziyarar Gaggawa Zuwa Asibitin Kusa',
      level3Title: 'Mataki na 3: Taimakon Gaggawa Na Asibiti (Kira 6232)',
      callAheadNotice: 'GARGADI MAI MUHIMMANCI: Kafin ka tafi asibiti, kira layin NCDC kyauta a 6232 domin likitoci su shirya dakin kebewa kafin isarka.',
      newConsultationBtn: 'Fara Sabon Bincike',
      validationError: 'Da fatan za a bayyana alamominku a akwatin rubutu ko zaɓi aƙalla alama ɗaya daga cikin katunan ƙasa.',
      editAnswersBtn: 'Duba & Gyara Amsoshinka',
      consultationError: 'An sami matsala wajen haɗawa da ɗakin bincike na kan layi. Bayananku suna nan a ajiye, an kuma bincika alamunku bisa tsarin gida a ƙasa.',
      symptomSelectedCount: 'alamomin da aka zaɓa'
    },
    assistant: {
      badge: 'Mataimakin Ilimin Lafiya Na AI (Gemini)',
      title: 'Mataimakin Ilimin Lafiya Na AI',
      subtitle: 'Yi tambayoyi game da cutar Ebola, hanyoyin kariya, karyata tatsuniyoyi, da dokokin gwamnati.',
      greeting: "Sannu! Ni ne Mataimakin Ilimin Lafiya na EbolaGuard NG. Zan iya amsa tambayoyinka kan cutar Ebola, allurar rigakafi, da ka'idojin gwamnatin Najeriya.\n\n*Muhimmi:* Ina nan don ilimantarwa ne kawai. Ba na rubuta magani. Ta yaya zan iya taimaka maka a yau?",
      inputPlaceholder: 'Yi tambayar lafiya (misali: Shin wanka da ruwan gishiri yana kare mutum?)...',
      sendBtn: 'Aika',
      thinking: 'Yana tunani...',
      suggestedHeader: 'Tambayoyin Da Aka Fi Yi:',
      q1: 'Shin akwai cutar Ebola a Najeriya a halin yanzu?',
      q2: 'Shin shan ruwan gishiri ko wanka da shi yana warkar da Ebola?',
      q3: 'Shin Ebola tana tashi a iska kamar COVID-19?',
      q4: 'Wadanne alluran rigakafi da magunguna aka amince da su?',
      fullCheckerBtn: 'Cikakken Binciken Hadari',
      disclaimer: 'EbolaGuard NG na bayar da fadakarwa ne kawai. Ba ta maye gurbin ainihin likita ba.'
    },
    findHelp: {
      badge: 'Cibiyoyin Asibitoci & Dakunan Kebewa',
      title: 'Nemo Asibitin Da Aka Amince Da Shi a Najeriya',
      subtitle: 'Jerin manyan asibitocin koyarwa, asibitocin tarayya, da dakunan kebewa a dukkan jihohi 36 da Abuja.',
      searchPlaceholder: 'Nemo asibiti da suna, gari ko adireshi...',
      stateFilterAll: 'Dukkan Jihohin Najeriya',
      emergencyDesk: 'Layin Gaggawa:',
      officialPortal: 'Shafin Yanar Gizo:',
      website: 'Shafin Yanar Gizo',
      verifiedOn: 'Tabbatarwa:',
      noFacilityTitle: 'Ba a sami asibitin wannan jihar a nan ba tukunna.',
      noFacilityDesc: 'Kowace jiha tana da kwararrun ma\'aikatan gaggawa karkashin NCDC.',
      callNcdcDispatch: 'Kira NCDC 6232 Don Samun Motar Asibiti'
    },
    resources: {
      badge: 'Kayan Fadakarwa & Takardun Bayani',
      title: 'Ingantattun Takardun Fadakarwa Na Gwamnati',
      subtitle: 'Sauke, buga, kuma raba takardun wayar da kai da Turanci, Pidgin, Yoruba, Hausa, da Igbo.',
      langFilterAll: 'Duk Harsuna',
      downloadMaterialBtn: 'Sauke Wannan Takarda',
      downloadedSuccess: 'An sauke takardar cikin nasara!'
    },
    faq: {
      badge: 'Tambayoyi Da Amsoshi',
      title: 'Tambayoyin Da Aka Fi Yi (FAQ)',
      subtitle: 'Gaskiyar amsoshi ga tambayoyin da \'yan Najeriya ke yawan yi game da rigakafin Ebola da magungunan karya.',
      searchPlaceholder: 'Bincika tambayoyi (misali ruwan gishiri, rigakafi, yaduwa)...',
      catAll: 'Duk Tambayoyin',
      catBasics: 'Tushen Ebola',
      catTransmission: 'Yadda Take Yaduwa',
      catPrevention: 'Kariya',
      catMedical: 'Magunguna & Allurai',
      catMyths: 'Karya vs Gaskiya',
      calloutTitle: 'Kana da wata tambayar da ba a amsa ba?',
      calloutDesc: 'Kuna iya magana da Mataimakin AI ko kira layin NCDC kyauta a 6232 sa\'o\'i 24 a kowace rana.',
      callNcdcBtn: 'Kira NCDC 6232'
    },
    aboutUs: {
      badge: 'Manufa & Shugabanci',
      title: 'Game da EbolaGuard NG',
      subtitle: 'Shafin intanet na kiwon lafiyar al\'ummar Najeriya don fadakarwa, yaki da labaran karya, da bayar da shawarar AI kyauta.',
      devCreditBadge: 'Official Developer Credit',
      devCreditTitle: 'Developed by OLANREWAJU SAMUEL',
      devCreditDesc: 'EbolaGuard NG was conceptualized and developed by OLANREWAJU SAMUEL as a high-fidelity digital response to public health crises in Nigeria and West Africa, blending robust software engineering with verified epidemiological science.',
      pillar1Title: 'Ingantaccen Bayani',
      pillar1Desc: 'Dukkan alkaluma da shawarwari sun fito ne daga NCDC, Ma\'aikatar Lafiya ta Tarayya, da WHO.',
      pillar2Title: 'Fadakarwa Da Wuri',
      pillar2Desc: 'Koya wa al\'umma gane zazzabi da alamomi da wuri domin samun nasarar magani a asibiti.',
      pillar3Title: 'Ka\'idojin AI Masu Aminci',
      pillar3Desc: 'An gina shi tare da kiyaye dokokin kiwon lafiya ba tare da raba sirrin kowa ba.'
    },
    contact: {
      badge: 'Tantance Labaran Karya & Tuntuba',
      title: 'Ba Da Rahoton Labarin Karya & Tuntuba',
      subtitle: 'Kare al\'ummarka ta hanyar sanar da magungunan karya ko tura sakonka zuwa kwararrunmu.',
      tabMisinformation: 'Bayar Da Rahoton Labarin Karya',
      tabFeedback: 'Sakon Ra\'ayi & Shawara',
      categoryLabel: 'Rukuni Na Labarin Karya:',
      catFakeCure: 'Maganin Karya (misali Wanka da ruwan gishiri)',
      catFalseDeath: 'Karyar Mutuwa ko Barkewar Cutar',
      catHiddenCase: 'Zargin Boye Marar Lafiya',
      catOther: 'Sauran Labaran Yaudara',
      sourceUrlLabel: 'A ina ka ji ko ka ga wannan? (WhatsApp, Facebook, Rediyo):',
      sourceUrlPlaceholder: 'Misali: Muryar WhatsApp, rubutun Facebook, labarin kasuwa...',
      descriptionLabel: 'Bayyana karyar dalla-dalla:',
      descriptionPlaceholder: 'Bayyana abin da aka fada, wanda ke yadawa, da garin da abin ke faruwa...',
      submitReportBtn: 'Aika Don Tantancewa',
      nameLabel: 'Cikakken Sunanka:',
      emailLabel: 'Adireshin Imel:',
      messageLabel: 'Sakonka:',
      sendFeedbackBtn: 'Aika Sakon',
      emergencyWarning: 'Sanarwar Gaggawa: Wannan fom ba na marar lafiya da ke neman agaji nan take ba ne. Idan mutum na cikin halin kaka-ni-kayi, kira NCDC a 6232 nan take.'
    },
    admin: {
      title: 'Dakin Gudanarwa Na Ma\'aikata',
      subtitle: 'Wuri na musamman don jami\'an kula da lafiya da masu tantance bayanai.',
      emailPlaceholder: 'Adireshin Imel',
      passwordPlaceholder: 'Kalmar Sirri',
      loginBtn: 'Shiga Dakin Gudanarwa',
      demoNote: 'Ma\'aikata Masu Lasisi Kawai (Kalmar gwaji: EbolaGuard2026!)',
      logoutBtn: 'Fita',
      tabOverview: 'Bayanin Kasa',
      tabArticles: 'Rubuce-Rubuce',
      tabUpdates: 'Sabbin Labarai',
      tabStatistics: 'Kididdiga',
      tabSources: 'Tushen Bayanai',
      tabReports: 'Rahotannin Labaran Karya',
      tabHealth: 'Lafiyar Na\'ura'
    },
    footer: {
      brandDescription: 'AI-powered Ebola prevention and early risk detection platform for Nigeria. Helping Nigerian communities detect risk early, understand symptoms, prevent outbreaks, and access rapid medical guidance.',
      builtWithPurpose: 'Built with purpose for Nigerian and global health security',
      platformHeader: 'Platform',
      legalHeader: 'Legal & Ethics',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service & Disclaimer',
      clinicalEthics: 'Clinical Data Ethics',
      emergencyContacts: 'Emergency Contacts (6232)',
      reportMisinfo: 'Report Misinformation',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      copyright: '© 2026 EbolaGuard NG. All rights reserved. Not for medical diagnosis.',
      sdgLabel: 'SDG 3 Aligned: Good Health and Well-being'
    },
    privacy: {
      badge: 'Privacy & Data Protection Principles',
      title: 'Ka\'idojin Sirrin Bayanai',
      subtitle: 'Gyara na Karshe: Oktoba 2026 · Daidai da Dokar NDPA ta Najeriya.',
      introTitle: '1. Gabatarwa',
      introText: 'EbolaGuard NG tana mutunta sirrin masu amfani da ita matuka.',
      anonTitle: '2. Binciken AI Ba Tare Da Suna Ba',
      anonText: 'Ba ma tambayar sunanka, lambar NIN, BVN, ko adireshin gidanka.',
      noSaleTitle: '3. Ba Ma Sayar Da Bayanai',
      noSaleText: 'Ba ma sayar da bayanan lafiyarka ga kamfanonin talla ko kowane mutum.',
      serverSecurityTitle: '4. Tsaron Na\'urorin Sabar',
      serverSecurityText: 'Dukkan sadarwar AI tana gudana ne ta hanyoyin sabar masu cikakken tsaro.',
      retentionTitle: '5. Share Bayanai',
      retentionText: 'Ana share bayanan shiga kowane sa\'o\'i 48 kai tsaye.'
    },
    terms: {
      badge: 'Legal Disclaimer & Conditions of Use',
      title: 'Sharuddan Amfani & Ka\'idojin Likita',
      subtitle: 'Muhimman iyakokin aiki don amfani da EbolaGuard NG.',
      term1Title: '1. Don Ilimantarwa Kawai',
      term1Text: 'EbolaGuard NG na ilimantarwa ne kawai. Ba ta maye gurbin ainihin likita a asibiti ko gwajin jini ba.',
      term2Title: '2. Dokar Gaggawa',
      term2Text: 'Idan mutum na zubar da jini ko zazzabi mai tsanani, KADA a jira AI. Kira NCDC kyauta a 6232 nan take.',
      term3Title: '3. Daidai Da Dokokin NCDC & WHO',
      term3Text: 'Dukkan shawarwarinmu sun bi ka\'idojin NCDC da WHO.',
      term4Title: '4. Iyakance Hakki',
      term4Text: 'EbolaGuard NG da mai kera ta OLANREWAJU SAMUEL sun samar da wannan tsari ne domin taimakon al\'umma.'
    },
    disclaimer: {
      short: 'EbolaGuard NG na bayar da fadakarwa ne kawai. Ba ta maye gurbin ainihin likita ba.',
      emergencyCall: 'A lokacin gaggawa, kira NCDC 6232 nan take.'
    },
    auth: {
      signIn: 'Shiga (Sign In)',
      signUp: 'Bude Asusu (Create Account)',
      signOut: 'Fita (Sign Out)',
      createAccount: 'Bude Asusu',
      myAccount: 'Asusuna',
      emailLabel: 'Adireshin Imel',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Kalmar Sirri',
      passwordPlaceholder: 'Shigar da kalmar sirri',
      confirmPasswordLabel: 'Tabbatar da Kalmar Sirri',
      confirmPasswordPlaceholder: 'Sake shigar da kalmar sirri',
      fullNameLabel: 'Cikakken Sunanka',
      fullNamePlaceholder: 'misali Dr. Amina Bello',
      forgotPasswordLink: 'Ka manta kalmar sirri?',
      rememberMe: 'Tuna zaman asusuna',
      dontHaveAccount: 'Ba ka da asusu tukuna?',
      alreadyHaveAccount: 'Kana da asusu a riga?',
      signInTitle: 'Shiga EbolaGuard NG',
      signInSubtitle: 'Shiga asusunka don duba tarihin lafiyarka da tsara sanarwar annoba.',
      signUpTitle: 'Bude Sabon Asusun EbolaGuard',
      signUpSubtitle: "Kasance tare da dubban 'yan Najeriya da ke kare kansu da sahihan bayanan kiwon lafiya.",
      forgotTitle: 'Dawo da Kalmar Sirri',
      forgotSubtitle: 'Shigar da adireshin imel dinka don samun sakon dawo da asusunka.',
      resetPasswordBtn: 'Aika Sakon Dawo da Kalmar Sirri',
      backToSignIn: 'Koma Shafin Shiga',
      showPassword: 'Nuna kalmar sirri',
      hidePassword: 'Boye kalmar sirri',
      passwordRequirements: 'Dole ne kalmar sirri ta kai a kalla haruffa 6.',
      passwordMatchError: 'Kalmomin sirri ba su yi daidai da juna ba.',
      passwordLengthError: 'Dole ne kalmar sirri ta kai a kalla haruffa 6.',
      emailRequiredError: 'Da fatan za a shigar da ingantaccen imel.',
      nameRequiredError: 'Da fatan za a shigar da cikakken sunanka.',
      registrationSuccess: 'An bude asusunka cikin nasara!',
      emailConfirmNotice: 'Idan tsarin Supabase yana bukatar tabbatar da imel, duba akwatin sakonka kafin ka shiga.',
      resetEmailSent: 'An tura hanyar dawo da kalmar sirri zuwa imel dinka!',
      publicNotice: 'Bayanin gaggawa, kididdigar annoba, da tsarin binciken hadari kyauta ne ga kowa ba tare da shiga asusu ba.',
      accountTitle: 'Bayanin Asusu & Lafiya',
      accountSubtitle: 'Sarrafa lambobin sadarwarka, jiharka a Najeriya, da tsarin sanarwar annoba.',
      editProfile: 'Gyara Bayanin Lafiya',
      saveChanges: 'Ajiye Canje-canje',
      saving: 'Yana ajiye...',
      profileUpdated: 'An sabunta bayaninka cikin nasara.',
      phoneLabel: 'Lambar Wayar Gaggawa',
      stateLabel: 'Babbar Jiharka a Najeriya',
      memberSince: 'Ya zama memba tun',
      securitySettings: 'Tsaro & Matsayin Asusu',
      verifiedAccount: 'An Tabbatar da Supabase',
      alertPreferences: 'Sanarwar Annoba Ta Gaggawa',
      smsAlerts: 'Karbi sakon SMS na gaggawa daga NCDC',
      emailAlerts: 'Karbi bayanin kiwon lafiya na mako-mako',
      emergencyQuickLinks: 'Hanyoyin Gaggawa',
      viewAssessments: 'Fara Binciken Alamomi',
      facilityDirectory: 'Nemi Asibiti Kusa da Kai',
      outbreakFeed: 'Duba Sabbin Labarai',
      loginRequiredTitle: 'Ana Bukatar Shiga Asusu',
      loginRequiredDesc: 'Da fatan za a shiga ko bude asusu don sarrafa bayananka a EbolaGuard NG.'
    }
  },

  // ==========================================
  // IGBO (ig)
  // ==========================================
  ig: {
    brandName: 'EbolaGuard NG',
    tagline: 'Ozi Eziokwu. Mmata n\'Oge. Obodo Dị Nchebe.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    common: {
      emergencyCallText: 'Kpọọ NCDC n\'Efu na 6232',
      hotline: '6232',
      altHotline: '+234 800 9700 0010',
      readMore: 'Gụọ Nchịkọta Niile',
      learnMore: 'Mụtakwuo',
      viewDetails: 'Lee Ihe Dị n\'Ime',
      close: 'Mechie',
      cancel: 'Kagbuo',
      submit: 'Ziga',
      search: 'Chọọ',
      filter: 'Nyochaa',
      all: 'Ha Niile',
      loading: 'Ọ na-ebugo...',
      submitting: 'Ọ na-eziga...',
      thinking: 'AI na-eche echiche...',
      success: 'Ọ gara nke ọma',
      error: 'Nsogbu mere',
      clear: 'Hichapụ',
      back: 'Laghachi Azụ',
      download: 'Budata',
      share: 'Kesa',
      copyLink: 'Detuo Njikọ',
      verified: 'Nchọpụta NCDC',
      official: 'Nke Gọọmentị',
      lowRisk: 'Ihe Egwu Dị Ala',
      highRisk: 'Ihe Egwu Dị Elu',
      zeroCases: 'Ọrịa 0 Ekwadoro',
      days: 'Ụbọchị',
      status: 'Ọnọdụ',
      source: 'Ebe O Si',
      location: 'Ebe Ọ Dị',
      date: 'Ụbọchị',
      emergency: 'Ọnọdụ Mberede'
    },
    nav: {
      home: 'Ụlọ (Home)',
      riskAssessment: 'Nyocha Ihe Egwu',
      prevention: 'Mgbochi',
      about: 'Maka Ebola',
      updates: 'Ozi Ọhụrụ',
      dashboard: 'Ọnụ Ọgụgụ',
      facilities: 'Ụlọ Ọgwụ Dị Nso',
      emergency: 'Enyemaka Mberede',
      resources: 'Akwụkwọ Mmata',
      faq: 'Ajụjụ na Azịza',
      aboutUs: 'Gbasara Anyị',
      contact: 'Kpesa / Kpọtụrụ',
      admin: 'Nchịkwa',
      staff: 'Ndị Ọrụ',
      getGuidance: 'Nweta Ndụmọdụ Ahụike'
    },
    alert: {
      officialBadge: 'Ozi Nchekwa Ọha Si NCDC',
      source: 'Ebe O Si: Ụlọ Ọrụ Na-ahụ Maka Nchịkwa Ọrịa na Naịjirịa (NCDC)',
      verifiedOn: 'Enyochara: Ọktoba 2026',
      readFullBrief: 'Gụọ Nchịkọta Niile',
      dismiss: 'Wepụ ozi',
      locationLabel: 'Ebe Ọ Dị',
      publishedLabel: 'Ụbọchị E Bipụtara'
    },
    hero: {
      topPill: 'Dabere na SDG 3 · Ike AI · Nzuzo Ndị Mmadụ',
      headline: 'Ichebe Naịjirịa Pụọ n\'Ọrịa',
      headlineHighlight: 'Ebola na Ntiwapụ Ọrịa Ọjọọ',
      subheadline: 'Nweta ezigbo ozi banyere ọrịa Ebola site n\'aka NCDC na WHO. Gwa Dọkịta Virtual okwu maka nlekọta ahụike gị na ezinụlọ gị.',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      trustLine: 'Dabere n\'Usoro NCDC & WHO · Anyị Anaghị Edobe Ozi Nzuzo Gị',
      startHere: '👇 Bido Ebe A',
      doctorBtn: 'Gwa Dọkịta Okwu',
      updatesBtn: 'Lee Ozi Ọhụrụ',
      learnBtn: 'Mụta Maka Mgbochi'
    },
    cards: {
      understand: 'Ịghọta Ebola',
      understandDesc: 'Otu o si agbasa, ụdị kọrọkọrọ nje ahụ, na oge ole ọ na-ewe iji pụta ìhè.',
      symptoms: 'Ịmata Ihe Ịrịba Ama',
      symptomsDesc: 'Oke ahụ ọkụ, agbọ, afọ ọsịsa, na ike ọgwụgwụ pụrụ iche.',
      prevention: 'Ụzọ Mgbochi',
      preventionDesc: 'Ịsa aka mgbe niile na ncha na mmiri, zere imetụ mmiri ahụ onye na-arịa ọrịa aka.',
      guidance: 'Chọta Enyemaka',
      guidanceDesc: 'Kpọọ akara ekwentị NCDC n\'efu na 6232 maka enyemaka ngwa ngwa n\'obodo gị.'
    },
    home: {
      liveSurveillance: 'Usoro Nlekọta Ọrịa Mba (Surveillance)',
      metrics: {
        activeCases: 'Ndị Bu Ọrịa Ebola Ugbu A (Naịjirịa)',
        totalFatalities: 'Ndị Nwụrụ Anwụ (Naịjirịa)',
        portScreenings: 'Nyocha Ọdụ Ụgbọ Elu & Mpaghara',
        diagnosticLabs: 'Ụlọ Nyocha Ikike Nyere',
        nationalStatus: 'Ọnọdụ Naịjirịa: Ọ dịghị onye ọrịa a hụrụ na 2026',
        borderStatus: 'Nyocha siri ike na-aga n\'ihu n\'ọdụ ụgbọ elu Legọs, Abuja na ọdụ ụgbọ mmiri',
        activeCasesUnit: 'ndị ọrịa',
        fatalitiesUnit: 'ọnwụ',
        labsUnit: 'ụlọ nyocha',
        verifiedDate: 'Nchọpụta NCDC: Ọktoba 2026'
      },
      stateTableTitle: 'Nlekọta Ọrịa na Steeti Niile na Ebe Ndị A Na-esi Bata',
      stateTableSubtitle: 'Ozi ozugbo sitere n\'aka ndị dọkịta nlekọta ọrịa na steeti dị iche iche na ndị nche oke ala.',
      stateColState: 'Steeti / Mpaghara',
      stateColScreenings: 'Ọnụ Ọgụgụ Nyocha Emere',
      stateColStatus: 'Ọnọdụ Nchebe',
      stateColRisk: 'Ọkwa Ihe Egwu',
      stateSearchPlaceholder: 'Chọọ steeti gị...',
      newsletterTitle: 'Nweta Ozi Mberede n\'Ekwentị Gị n\'Efu',
      newsletterDesc: 'Nweta SMS ma ọ bụ ozi WhatsApp ozugbo gọọmentị NCDC wepụtara ozi mberede.',
      smsTab: 'Ozi SMS',
      whatsappTab: 'Ozi WhatsApp',
      phonePlaceholder: 'Tinye akara ekwentị gị (dịka 0803 123 4567)...',
      subscribeBtn: 'Debanye Aha n\'Efu',
      subscribedSuccess: 'Daalụ nke ukwuu! Ị ga-anata ozi nchekwa ahụike ziri ezi.',
      privacyNote: 'Akara ekwentị gị dị nchebe nke ukwuu; anyị anaghị enye ya onye ọzọ.',
      sdgTitle: 'Ebumnuche SDG 3 nke Mba Ụwa',
      sdgDesc: 'Iji hụ na ndị Naịjirịa niile nwere ezigbo ahụike site na iji teknụzụ nyocha ọrịa nke oge a.'
    },
    aboutEbola: {
      badge: 'Ozi Nchekwa Ọha nke Gọọmentị',
      title: 'Ịghọta Ọrịa Nje Ebola (EVD)',
      subtitle: 'Eziokwu banyere otu o si efe efe, ụdị nje dị iche iche, na njikere Naịjirịa nọ na ya.',
      whatIsTitle: 'Gịnị Ka Ọrịa Ebola Bụ n\'Ezie?',
      whatIsText: 'Ọrịa nje Ebola bụ ọrịa dị egwu nke nwere ike igbu mmadụ ma ọ bụrụ na e lezighị anya ngwa ngwa. E bu ụzọ chọpụta ya na 1976 nso Osimiri Ebola na Democratic Republic of the Congo.',
      transmissionTitle: 'Otu Nje Ahụ Si Agbasa',
      transmissionDirect: 'Mmetụ Aka n\'Ihu: Imetụ ọbara, agbọ, asọ mmiri, mamịrị, ma ọ bụ nsị onye na-arịa ọrịa aka ma ọ bụ ozu onye nwụrụ n\'ọrịa ahụ.',
      transmissionNotAir: 'Ọ NAGHỊ EFEE N\'IKUKU: Ebola anaghị agagharị n\'ikuku dịka oyi ma ọ bụ COVID-19. Mmadụ ga-emetụ mmiri ahụ onye ahụ aka kpọmkwem.',
      transmissionBushmeat: 'Anụ Ọhịa: Imetụ ụsụ ma ọ bụ enwe nwụrụ n\'ọhịa aka, ma ọ bụ ịkwa anụ ọhịa na-anwụchabeghị aka.',
      transmissionBurials: 'Ili Ozu na-enweghị Nchebe: Ịsa ma ọ bụ ịmakụ ozu onye ahụ ọkụ gburu bụ otu n\'ime ụzọ kachasị ngwa ngwa nje na-esi efe efe.',
      speciesTitle: 'Ụdị Nje Ebola Isii Ndị Ahụrụla',
      incubationTitle: 'Oge Nje Na-anọ Tupu Ya Egosipụta (Ụbọchị 2 ruo 21)',
      incubationText: 'Onye bu nje Ebola ENWEGHỊ IKE ibunye onye ọzọ ya ruo mgbe akara ọrịa pụtara n\'ahụ ya. Oge ahụ na-adị n\'agbata ụbọchị 2 ruo 21 (ọkachasị ụbọchị 8 ruo 10).'
    },
    symptoms: {
      badge: 'Ntuziaka Ihe Ịrịba Ama & Nyocha',
      title: 'Ihe Ịrịba Ama & Nyocha Ihe Egwu',
      subtitle: 'Mụta otu ihe ịrịba ama si amalite, ihe mere nyocha ọbara n\'ụlọ nyocha ji dị mkpa, na ihe ị ga-eme ozugbo.',
      earlyTitle: 'Ọkwa 1: Ihe Ịrịba Ama Mbụ (Ụbọchị 1 ruo 3)',
      earlyDesc: 'Oke ahụ ọkụ na mberede, ike ọgwụgwụ siri ike, oke isi ọwụwa, na ahụ mgbu. Ọ na-eyi ịba (malaria) na typhoid nke ukwuu.',
      gastroTitle: 'Ọkwa 2: Nsogbu Afọ (Ụbọchị 4 ruo 7)',
      gastroDesc: 'Afọ ọsịsa mmiri siri ike, agbọ ugboro ugboro, oke afọ mgbu, na agụụ ịla n\'iyi nke na-eme ka mmiri pụchaa n\'ahụ.',
      severeTitle: 'Ọkwa 3: Nsogbu Dị Egwu (Ụbọchị 7+)',
      severeDesc: 'Ọbara isi n\'eze, anya, agbọ ma ọ bụ nsị pụta, ọgba aghara n\'uche, na akụkụ ahụ ịkwụsị ịrụ ọrụ. Ọ chọrọ ụlọ nlekọta pụrụ iche ozugbo.',
      checkerTitle: 'Ndepụta Nyocha Ihe Ịrịba Ama',
      checkerInstruction: 'Họrọ ihe ịrịba ama ọ bụla ị na-enwe ugbu a maka ndụmọdụ:',
      exposureQuestion: 'Ì metụla onye ọrịa aka ma ọ bụ gaa ebe ọrịa ahụ nọ ntiwapụ n\'ime ụbọchị 21 gara aga?',
      urgentWarning: 'Ọkwa Ịdọ Aka ná Ntị: Ihe ịrịba ama mbụ na-eyi ịba. ANWỤCHALA ma ọ bụ saa mmiri nnu! Kpọọ NCDC na 6232.',
      callAheadReminder: 'Iwu Ịkpọ Ekwentị Tupu Ị Bịa: Kpọọ ụlọ ọgwụ mgbe niile n\'ekwentị tupu i rute ebe ahụ ka ndị dọkịta nwee ike kwado uwe nchebe.',
      feverLabel: 'Oke Ahụ Ọkụ Na Mberede (>38°C)',
      fatigueLabel: 'Ike Ọgwụgwụ nke Ukwuu',
      headacheLabel: 'Oke Isi Ọwụwa',
      musclePainLabel: 'Mgbu n\'Ahụ na n\'Nkwonkwo',
      soreThroatLabel: 'Akpịrị Ịbụ Mgbu / Ihe Ilu Ilo',
      vomitingLabel: 'Ọgbụgbọ Na-adịghị Akwụsị Akwụsị',
      diarrheaLabel: 'Afọ Ọsịsa Mmiri Mmiri',
      abdominalPainLabel: 'Oke Mgbu n\'Afọ',
      bleedingLabel: 'Ọbara Ọgbụgba n\'Ebe Ọ Bụla Na Mberede'
    },
    prevention: {
      badge: 'Usoro Mgbochi Ọrịa nke Eziokwu',
      title: 'Mgbochi Ebola & Nchebe Obodo',
      subtitle: 'Ịsa aka nke ọma, ilekọta ndị ọrịa n\'enweghị nsogbu, na ili ozu n\'ụzọ nkwanye ùgwù na nchekwa.',
      roleWarningTitle: 'Ọdịiche Dị Mkpa: Ndị Obodo nkịtị na Ndị Dọkịta nwere Ọzụzụ',
      roleWarningText: 'Onye ọ bụla na-enweghị ọzụzụ agbalịla imetụ akwa ọbara ruru aka, ịsa ozu onye ahụ ọkụ gburu, ma ọ bụ kpochapụ ihe mkpofu ụlọ ọgwụ.',
      tabPublic: 'Ọha na Eze Niile',
      tabHealthcare: 'Ndị Ọrụ Ahụike',
      tabBurial: 'Ili Ozu Dị Nchebe',
      handwashingTitle: 'Usoro Ịsa Aka nke Ọma',
      handwashingText: 'Jiri ncha na mmiri na-asọ asọ kwọọ aka gị nke ọma ma ọ dịkarịa ala sekọnd 30, ma ọ bụ jiri ihe na-egbu nje nwere mmanya na-aba n\'anya ruru 60%.',
      foodSafetyTitle: 'Nchekwa Nri na Anụ',
      foodSafetyText: 'Zere imetụ ụsụ ma ọ bụ enwe na-arịa ọrịa aka. Sie anụ niile nke ọma tupu i rie ya.',
      dosListTitle: 'Ihe Ndị Ị GA-EME (DOs)',
      dontsListTitle: 'Ihe Ndị Ị NA-AGHỊ EME (DONTs)',
      saltMythTitle: 'Ịsa Mmiri Nnu Bụ Ụgha Dị Egwu!',
      saltMythText: 'Ịṅụ ma ọ bụ ịsa mmiri nnu na-ekpo ọkụ ANAGHỊ egbochi ma ọ bụ gwọọ Ebola. O gbuola ọtụtụ mmadụ n\'oge gara aga n\'ihi nsị nnu.'
    },
    updates: {
      badge: 'Ozi Nlekọta Ọhụrụ',
      title: 'Ozi na Ịdọ Aka ná Ntị Ọhụrụ',
      subtitle: 'Ọkwa gọọmentị sitere na NCDC, WHO Africa, na Africa CDC nke enyochara nke ọma.',
      searchPlaceholder: 'Chọọ ozi site na aha ma ọ bụ steeti...',
      filterAll: 'Ozi Niile',
      filterAnnouncements: 'Ọkwa Ọhaneze',
      filterAdvisories: 'Ịdọ Aka ná Ntị',
      filterGuidelines: 'Usoro Ntuziaka',
      modalTitle: 'Nchịkọta Ozi zuru oke',
      verifiedStamp: 'Ihe Nchọpụta NCDC / WHO Ekwadoro',
      viewSource: 'Gaa n\'Ebe O Si'
    },
    statistics: {
      badge: 'Ndepụta Ọnụ Ọgụgụ Ahụike',
      title: 'Ọnụ Ọgụgụ Ọrịa na Nyocha',
      subtitle: 'Ọnụ ọgụgụ ziri ezi sitere na NCDC na WHO na-enweghị ihe e zoro ezo.',
      geoFilter: 'Ebe',
      timeframeFilter: 'Oge Afọ',
      downloadBtn: 'Budata Data CSV',
      activeCasesTitle: 'Ndị Bu Ọrịa Ugbu A (Naịjirịa)',
      fatalitiesTitle: 'Ndị Nwụrụ Anwụ (Naịjirịa)',
      screeningsTitle: 'Nyocha Oke Ala',
      labsTitle: 'Ụlọ Nyocha Ikike Nyere',
      trendTitle: 'Eserese Nyocha nke Afọ 2026',
      stateSurveillanceTitle: 'Nlekọta n\'Otu Steeti'
    },
    emergencyHelp: {
      badge: 'Nzaghachi Mberede Maka Ahụike Ọha',
      title: 'Enyemaka Mberede & Nzaghachi Ngwa Ngwa',
      subtitle: 'Nọmba ekwentị mberede maka Ụlọ Ọrụ Nchịkwa Ọrịa Naịjirịa (NCDC), Ndị Nzaghachi Ngwa Ngwa Steeti, na ụgbọ ala mberede.',
      nationalCentre: 'Ebe Ọrụ Mberede Mba',
      ncdcHotlineTitle: 'Nọmba Mberede N\'akwụghị Ụgwọ nke NCDC',
      ncdcHotlineDesc: 'Kpọọ n\'efu awa 24 kwa ụbọchị site na MTN, Airtel, Glo, na 9mobile.',
      altHotlineLabel: 'Nọmba Ọzọ:',
      smsDeskLabel: 'Ozi Ederede SMS:',
      callAheadTitle: 'Iwu Iri Kwesịrị nke "Kpọọ Tupu Ị Gawa"',
      callAheadWarning: 'Ọ bụrụ na gị ma ọ bụ onye nọ n\'ụlọ gị nwere oke ahụ ọkụ na-ebute ọgbụgbọ, afọ ọsịsa, ma ọ bụ ọbara ọgbụgba, AKWALA gaa n\'ụlọ ọgwụ ozugbo n\'akpọghị oku na mbụ.',
      step1: '1. Kpọọ ụlọ ọgwụ tupu ị pụọ n\'ụlọ: Gwa ndị ọrụ ụlọ ọgwụ na onye ahụ nwere akara ọrịa ahụ ọkụ na-agba ọbara ka ha kwadebe.',
      step2: '2. Kwe ka ndị ọrụ ahụike kwadebe: Ndị dọkịta na ndị nọọsụ ga-eyi uwe nchebe pụrụ iche (PPE) iji chebe ndị ọrịa ndị ọzọ.',
      step3: '3. Zere ịbanye ụgbọ ala ọha: Ejila bọs ma ọ bụ tagzi ọha. Kpọọ NCDC ma ọ bụ ụlọ ọgwụ ka ha ziga ụgbọ ala mberede.',
      nemaTitle: 'Mberede Mba (NEMA)',
      nemaDesc: 'Nọmba njikọ nke ndị uwe ojii, mgbanyụ ọkụ, na ụgbọ ala mberede na mba ahụ niile.',
      nemaBtn: 'Kụọ 112',
      lagosTitle: 'Ministri Ahụike Steeti Legọs',
      lagosDesc: 'Mainland Hospital IDH Yaba & Nzaghachi Mberede.',
      redCrossTitle: 'Òtù Red Cross nke Naịjirịa',
      redCrossDesc: 'Enyemaka mbụ n\'ime obodo na nzaghachi maka ọdachi ahụike.',
      viewDirectoryBtn: 'Lee Ndepụta Steeti 36 Niile →'
    },
    virtualDoctor: {
      badge: 'Dọkịta Virtual & Nyocha AI',
      title: 'Dọkịta Virtual: Nyocha Ihe Egwu Ahụike',
      subtitle: 'Zaa ajụjụ ole na ole gbasara ihe ịrịba ama gị ka AI nyere gị ezigbo ndụmọdụ — nke emere maka obodo Naịjirịa.',
      welcomeHeader: 'Ozi Nnabata & Ọkwa Eziokwu',
      welcomeText: "Nnọọ! Abụ m EbolaGuard Virtual Doctor, onye enyemaka ahụike AI. Enwere m ike inyere gị aka ịghọta ihe ịrịba ama gị, nye ndụmọdụ ahụike, ma gwa gị mgbe ị ga-aga ụlọ ọgwụ ngwa ngwa. Mana abụghị m dọkịta mmadụ, enweghịkwa m ike dochie nyocha ọbara n'ụlọ ọgwụ. Ọ bụrụ na ọ bụ ọnọdụ mberede, kpọọ 6232 ozugbo.",
      step1Title: '1. Kọwaa Ihe Na-eme Gị',
      step1Desc: 'Tinye ụbọchị ahụ ọkụ dị, ike ọgwụgwụ, na ma ì metụrụ onye ọrịa aka.',
      step2Title: '2. Nyocha Ihe Egwu',
      step2Desc: 'Ọ ga-ekewa ya n\'ime Ọkwa 1 (Nlekọta n\'Ụlọ), Ọkwa 2 (Ụlọ Ọgwụ dị nso), ma ọ bụ Ọkwa 3 (Mberede).',
      step3Title: '3. Ndụmọdụ Ziri Ezi',
      step3Desc: 'Nweta ndụmọdụ ịkpọ ekwentị tupu ị gaa, na ndụmọdụ ịṅụ mmiri.',
      startBtn: 'Bido Nyocha Ahụike Ugbu A',
      formTitle: 'Akwụkwọ Ajụjụ Nyocha Ahụike',
      concernLabel: 'Kọwaa ihe na-eme gị ma ọ bụ onye ọrịa n\'okwu nke aka gị:',
      concernPlaceholder: 'Dịka: Enwere m oke ahụ ọkụ kemgbe ụbọchị abụọ, isi na-awa m nke ukwuu, ana m agbọkwa agbọ...',
      voiceInputBtn: 'Jiri Olu Kwuo Okwu (Mic)',
      voiceListening: 'Ana m ege gị ntị... kwuo okwu ugbu a n\'ime igwe okwu gị',
      symptomsLabel: 'Họrọ ihe ịrịba ama niile dị gị n\'ahụ:',
      durationLabel: 'Ụbọchị ole ka ihe ndị a dịla?',
      exposureLabel: 'Ì metụrụ onye a na-enyo enyo aka ma ọ bụ gaa ebe ọrịa ahụ nọ n\'ime ụbọchị 21 gara aga?',
      bleedingLabel: 'Ọbara ọ̀ na-agbapụta ebe ọ bụla na mberede (eze, imi, anya, agbọ ma ọ bụ nsị)?',
      breathingLabel: 'Ọ̀ na-esiri gị ike iku ume nke ukwuu?',
      consciousnessLabel: 'Ọ̀ nwere mgbagwoju anya, ịda mba, ma ọ bụ ahụ ịma jijiji?',
      ageLabel: 'Ọkwa Afọ:',
      stateLabel: 'Steeti Ị Nọ Na Ya na Naịjirịa:',
      adult: 'Okenye (18–64)',
      child: 'Nwatakịrị (erubeghị 18)',
      elderly: 'Agadi (65+)',
      submitTriageBtn: 'Nyochaa Ihe Egwu M & Nye M Ndụmọdụ',
      analyzingText: 'AI na-enyocha ihe ịrịba ama ndị a dabere n\'usoro NCDC & WHO...',
      resultTitle: 'Nsonaazụ Nyocha Gị',
      listenBtn: 'Ge Ntị na Ndụmọdụ Olu',
      stopListenBtn: 'Kwụsị Olu',
      level1Title: 'Ọkwa 1: Nlekọta n\'Ụlọ & Ịṅụ Ọtụtụ Mmiri',
      level2Title: 'Ọkwa 2: Ịga Ụlọ Ọgwụ Ndị Obodo Ngwa Ngwa',
      level3Title: 'Ọkwa 3: Nlekọta Mberede Ngwa Ngwa (Kpọọ 6232)',
      callAheadNotice: 'ỊDỌ AKA NÁ NTỊ DỊ MKPA: Tupu ị gaa n\'ụlọ ọgwụ, kpọọ akara ekwentị NCDC n\'efu na 6232 ka ndị dọkịta wee kwado uwe nchebe tupu ị rute.',
      newConsultationBtn: 'Bido Nyocha Ọhụrụ',
      validationError: 'Biko kọwaa ihe mgbaàmà gị n\'igbe ederede ma ọ bụ họrọ ma ọ dịkarịa ala otu ihe mgbaàmà site na kaadị ndị dị n\'okpuru.',
      editAnswersBtn: 'Nyochaa & Mezie Azịza Gị',
      consultationError: 'Enweghị ike mezue nyocha n\'ịntanetị. Ejidela ozi gị nke ọma, ejirikwa usoro nyocha mberede obodo nyochaa ihe mgbaàmà gị n\'okpuru.',
      symptomSelectedCount: 'ihe mgbaàmà ahọpụtara'
    },
    assistant: {
      badge: 'Onye Nkụzi Ahụike AI (Gemini)',
      title: 'Onye Enyemaka Nkụzi Ahụike AI',
      subtitle: 'Jụọ ajụjụ banyere ọrịa Ebola, ụzọ mgbochi, ịgbagha akụkọ ụgha, na iwu gọọmentị.',
      greeting: "Nnọọ! Abụ m Onye Enyemaka Nkụzi Ahụike EbolaGuard NG. Enwere m ike ịza ajụjụ gị gbasara ọrịa Ebola, ọgwụ mgbochi, na ntuziaka gọọmentị Naịjirịa.\n\n*Ihe dị mkpa:* Abụ m maka nkụzi ahụike naanị. Enweghị m ike ide ọgwụ. Olee otu m nwere ike isi nyere gị aka taa?",
      inputPlaceholder: 'Jụọ ajụjụ ahụike (dịka: Ịsa mmiri nnu ọ̀ na-echebe? Gịnị bụ ihe ịrịba ama mbụ?)...',
      sendBtn: 'Ziga',
      thinking: 'Ọ na-eche...',
      suggestedHeader: 'Ajụjụ Ndị A Na-ajụkarị:',
      q1: 'Ọrịa Ebola ọ̀ dị na Naịjirịa ugbu a?',
      q2: 'Ịṅụ ma ọ bụ ịsa mmiri nnu ọ̀ na-agwọ Ebola?',
      q3: 'Ebola ọ̀ na-efe n\'ikuku dịka COVID-19?',
      q4: 'Kedu ọgwụ mgbochi na ọgwụgwọ dị maka Ebola?',
      fullCheckerBtn: 'Nyocha Ihe Egwu Niile',
      disclaimer: 'EbolaGuard NG bụ maka nkuzi ahụike. Ọ bụghị dọkịta nwere ikike n\'ụlọ ọgwụ.'
    },
    findHelp: {
      badge: 'Ụlọ Ọgwụ Ndị A Kwadoro & Ebe Nsọtọ',
      title: 'Chọta Ụlọ Ọgwụ Ndị A Kwadoro na Naịjirịa',
      subtitle: 'Ndepụta ụlọ ọgwụ nkuzi, ụlọ ọgwụ etiti gọọmentị, na ebe nsọtọ na steeti 36 niile na Abuja.',
      searchPlaceholder: 'Chọọ ụlọ ọgwụ site na aha, obodo ma ọ bụ adreesị...',
      stateFilterAll: 'Steeti Naịjirịa Niile',
      emergencyDesk: 'Ekwentị Mberede:',
      officialPortal: 'Ebe Ntanetị Ọchịchị:',
      website: 'Ebe Ntanetị',
      verifiedOn: 'Enyochara:',
      noFacilityTitle: 'Ahụbeghị ụlọ ọgwụ maka steeti a họọrọ.',
      noFacilityDesc: 'Steeti ọ bụla nwere ndị ọrụ mberede ahụike n\'okpuru nhazi NCDC.',
      callNcdcDispatch: 'Kpọọ NCDC 6232 Maka Ụgbọ Ibuga Ndị Ọrịa (Ambulance)'
    },
    resources: {
      badge: 'Akwụkwọ Mmata & Mpempe Akwụkwọ',
      title: 'Akwụkwọ Mmata Ọhaneze Ekwadoro',
      subtitle: 'Budata, bipụta, ma kesaa akwụkwọ ndị a n\'asụsụ Bekee, Pidgin, Yoruba, Hausa, na Igbo.',
      langFilterAll: 'Asụsụ Niile',
      downloadMaterialBtn: 'Budata Akwụkwọ A',
      downloadedSuccess: 'E budatala akwụkwọ a nke ọma!'
    },
    faq: {
      badge: 'Ajụjụ na Azịza Ndị A Na-ajụkarị',
      title: 'Ajụjụ Ndị A Na-ajụkarị (FAQ)',
      subtitle: 'Azịza ziri ezi nye ajụjụ ndị kachasị mkpa ndị Naịjirịa na-ajụ gbasara mgbochi Ebola na ọgwụ ụgha.',
      searchPlaceholder: 'Chọọ ajụjụ (dịka mmiri nnu, ọgwụ mgbochi, mgbasa)...',
      catAll: 'Ajụjụ Niile',
      catBasics: 'Mmalite Ebola',
      catTransmission: 'Mgbasa',
      catPrevention: 'Mgbochi',
      catMedical: 'Ọgwụ & Ọgwụ Mgbochi',
      catMyths: 'Akụkọ Ụgha vs Eziokwu',
      calloutTitle: 'Ì nwere ajụjụ a na-azabeghị?',
      calloutDesc: 'Ị nwere ike ịgwa Onye Enyemaka AI anyị okwu ma ọ bụ kpọọ NCDC n\'efu na 6232 n\'oge ọ bụla awa 24 n\'ụbọchị.',
      callNcdcBtn: 'Kpọọ NCDC 6232'
    },
    aboutUs: {
      badge: 'Ebumnuche & Ọchịchị Anyị',
      title: 'Gbasara EbolaGuard NG',
      subtitle: 'Ebe ntanetị ahụike nke ọha mmadụ Naịjirịa iji kesaa ezigbo mmata, lụso akụkọ ụgha ọgụ, ma nye ndụmọdụ AI n\'efu.',
      devCreditBadge: 'Official Developer Credit',
      devCreditTitle: 'Developed by OLANREWAJU SAMUEL',
      devCreditDesc: 'EbolaGuard NG was conceptualized and developed by OLANREWAJU SAMUEL as a high-fidelity digital response to public health crises in Nigeria and West Africa, blending robust software engineering with verified epidemiological science.',
      pillar1Title: 'Ozi Eziokwu',
      pillar1Desc: 'Ọnụ ọgụgụ na ndụmọdụ niile sitere kpọmkwem n\'aka NCDC, Ụlọ Ọrụ Ahụike Etiti, na WHO.',
      pillar2Title: 'Mmata n\'Oge',
      pillar2Desc: 'Ịkụziri ndị mmadụ ịmata ahụ ọkụ n\'oge ka ọgwụgwọ ụlọ ọgwụ wee nwee ihe ịga nke ọma.',
      pillar3Title: 'Teknụzụ AI Dị Nchebe',
      pillar3Desc: 'Emere ya site na nchebe siri ike, na-enweghị nchọpụta ụgha ma ọ bụ ikpughe ozi onye ọ bụla.'
    },
    contact: {
      badge: 'Nkwupụta Akụkọ Ụgha & Kpọtụrụ Anyị',
      title: 'Kpesa Akụkọ Ụgha & Kpọtụrụ Anyị',
      subtitle: 'Chebe obodo gị site n\'ịkọ akụkọ ọgwụgwọ ụgha ma ọ bụ zigara ndị ọrụ teknụzụ ahụike anyị ozi.',
      tabMisinformation: 'Kpesa Akụkọ Ụgha / Ọgwụgwọ Ụgha',
      tabFeedback: 'Ndụmọdụ Ọha & Ajụjụ',
      categoryLabel: 'Ụdị Akụkọ Ụgha Ahụ:',
      catFakeCure: 'Ọgwụgwọ Ụgha (dịka Ịsa mmiri nnu)',
      catFalseDeath: 'Ọnwa Ụgha ma ọ bụ Ntiwapụ nke na-abụghị eziokwu',
      catHiddenCase: 'Enweghị ntụkwasị obi banyere Onye Ọrịa E Zoro Ezo',
      catOther: 'Ozi Ụgha Ndị Ọzọ',
      sourceUrlLabel: 'Ebee ka ị nụrụ ma ọ bụ hụ nke a? (WhatsApp, Facebook, Redio):',
      sourceUrlPlaceholder: 'Dịka: Olu WhatsApp, ozi Facebook, akụkọ ahịa...',
      descriptionLabel: 'Kọwaa akụkọ ụgha ahụ n\'uju:',
      descriptionPlaceholder: 'Kọwaa ihe ha kwuru, onye na-ekesa ya, na obodo ebe ọ na-eme...',
      submitReportBtn: 'Ziga Maka Nyocha',
      nameLabel: 'Aha Gị Niile:',
      emailLabel: 'Adreesị Imel Gị:',
      messageLabel: 'Ozi Gị:',
      sendFeedbackBtn: 'Ziga Ozi',
      emergencyWarning: 'Ọkwa Ọnọdụ Mberede: Ụdị akwụkwọ a abụghị maka onye na-arịa ezigbo ọrịa ugbu a. Ọ bụrụ na onye ọrịa dị oke njọ, kpọọ NCDC 6232 ozugbo.'
    },
    admin: {
      title: 'Ọnụ Ụzọ Nchịkwa Ndị Ọrụ',
      subtitle: 'Ebe pụrụ iche maka ndị editọ ahụike na ndị na-enyocha data gọọmentị.',
      emailPlaceholder: 'Adreesị Imel',
      passwordPlaceholder: 'Okwu Nzuzo',
      loginBtn: 'Banye n\'Ebe Nchịkwa',
      demoNote: 'Ndị Ọrụ E Nyere Ikike Naanị (Paswọọdụ: EbolaGuard2026!)',
      logoutBtn: 'Pụọ',
      tabOverview: 'Nchịkọta',
      tabArticles: 'Edemede',
      tabUpdates: 'Ozi Ọhụrụ',
      tabStatistics: 'Ọnụ Ọgụgụ',
      tabSources: 'Ebe Ozi Si',
      tabReports: 'Nkwupụta Akụkọ Ụgha',
      tabHealth: 'Ọnọdụ Sistemụ'
    },
    footer: {
      brandDescription: 'AI-powered Ebola prevention and early risk detection platform for Nigeria. Helping Nigerian communities detect risk early, understand symptoms, prevent outbreaks, and access rapid medical guidance.',
      builtWithPurpose: 'Built with purpose for Nigerian and global health security',
      platformHeader: 'Platform',
      legalHeader: 'Legal & Ethics',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service & Disclaimer',
      clinicalEthics: 'Clinical Data Ethics',
      emergencyContacts: 'Emergency Contacts (6232)',
      reportMisinfo: 'Report Misinformation',
      developerCredit: 'Developed by OLANREWAJU SAMUEL',
      copyright: '© 2026 EbolaGuard NG. All rights reserved. Not for medical diagnosis.',
      sdgLabel: 'SDG 3 Aligned: Good Health and Well-being'
    },
    privacy: {
      badge: 'Privacy & Data Protection Principles',
      title: 'Usoro Nzuzo na Nchebe Data',
      subtitle: 'Mmezigharị Ikpeazụ: Ọktoba 2026 · Dabere na Iwu NDPA nke Naịjirịa.',
      introTitle: '1. Okwu Mmalite',
      introText: 'EbolaGuard NG ji nzuzo ndị mmadụ kpọrọ ihe nke ukwuu.',
      anonTitle: '2. Nyocha AI Na-enweghị Aha',
      anonText: 'Anyị anaghị ajụ aha gị, nọmba NIN, BVN, ma ọ bụ adreesị ụlọ gị.',
      noSaleTitle: '3. Anyị Anaghị Ere Data',
      noSaleText: 'Anyị anaghị ere ozi ahụike gị nye ụlọ ọrụ mgbasa ozi ma ọ bụ ndị ọzọ.',
      serverSecurityTitle: '4. Nchebe Server',
      serverSecurityText: 'Nkwukọrịta AI niile na-aga site na ụzọ sava dị nchebe.',
      retentionTitle: '5. Ihichapụ Data',
      retentionText: 'A na-ehichapụ ozi niile n\'ime awa 48 na-akpaghị aka.'
    },
    terms: {
      badge: 'Legal Disclaimer & Conditions of Use',
      title: 'Usoro Ọrụ & Ịdọ Aka ná Ntị Ahụike',
      subtitle: 'Ihe mgbochi dị mkpa maka iji usoro ahụike EbolaGuard NG.',
      term1Title: '1. Maka Nkụzi Naanị',
      term1Text: 'EbolaGuard NG bụ maka nkụzi ahụike naanị. Ọ dịghị dochie dọkịta ụlọ ọgwụ ma ọ bụ nyocha ọbara.',
      term2Title: '2. Usoro Mberede',
      term2Text: 'Ọ bụrụ na mmadụ na-agba ọbara ma ọ bụ nwee oke ahụ ọkụ na mberede, ECHERELA AI. Kpọọ NCDC na 6232 ozugbo.',
      term3Title: '3. Dabere na Ntuziaka NCDC & WHO',
      term3Text: 'Ozi niile na-agbaso ntuziaka gọọmentị NCDC na WHO.',
      term4Title: '4. Oke Ọrụ',
      term4Text: 'EbolaGuard NG na onye rụrụ ya OLANREWAJU SAMUEL mere usoro a iji nyere mba aka n\'enweghị ụgwọ.'
    },
    disclaimer: {
      short: 'EbolaGuard NG bụ maka nkuzi ahụike. Ọ bụghị dọkịta nwere ikike n\'ụlọ ọgwụ.',
      emergencyCall: 'Maka ọnọdụ mberede, kpọọ NCDC 6232 ozugbo.'
    },
    auth: {
      signIn: 'Banye (Sign In)',
      signUp: 'Mepụta Akaụntụ (Create Account)',
      signOut: 'Pụọ (Sign Out)',
      createAccount: 'Mepụta Akaụntụ',
      myAccount: 'Akaụntụ M',
      emailLabel: 'Adreesị Ozi-e',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Okwuntughe',
      passwordPlaceholder: 'Tinye okwuntughe gị',
      confirmPasswordLabel: 'Kwenye Okwuntughe',
      confirmPasswordPlaceholder: 'Tinyegharịa okwuntughe gị',
      fullNameLabel: 'Aha Gị Niile',
      fullNamePlaceholder: 'dịka Dr. Amina Bello',
      forgotPasswordLink: 'Ị chefuru okwuntughe?',
      rememberMe: 'Cheta oge m',
      dontHaveAccount: 'Ị nwebeghị akaụntụ?',
      alreadyHaveAccount: 'Ị nwere akaụntụ ugbua?',
      signInTitle: 'Banye na EbolaGuard NG',
      signInSubtitle: 'Banye iji lelee akụkọ ahụike gị na ijikwa ọkwa ntiwapụ ọrịa.',
      signUpTitle: 'Mepụta Akaụntụ EbolaGuard',
      signUpSubtitle: 'Sonyere ọtụtụ puku ndị Naịjirịa na-echebe onwe ha site na ozi ahụike dị mma.',
      forgotTitle: 'Weghachite Okwuntughe Gị',
      forgotSubtitle: 'Tinye ozi-e gị iji nweta njikọ mweghachi.',
      resetPasswordBtn: 'Ziga Ozi-e Ntọgharị Okwuntughe',
      backToSignIn: 'Laghachi na Peeji Nbanye',
      showPassword: 'Gosi okwuntughe',
      hidePassword: 'Zobe okwuntughe',
      passwordRequirements: 'Okwuntughe ga-eru opekata mpe mkpụrụedemede 6.',
      passwordMatchError: 'Okwuntughe abụọ ahụ adabaghị.',
      passwordLengthError: 'Okwuntughe ga-eru opekata mpe mkpụrụedemede 6.',
      emailRequiredError: 'Biko tinye adreesị ozi-e ziri ezi.',
      nameRequiredError: 'Biko tinye aha gị niile.',
      registrationSuccess: 'Emepụtara akaụntụ gị nke ọma!',
      emailConfirmNotice: 'Ọ bụrụ na Supabase chọrọ nkwenye ozi-e, biko lelee igbe ozi gị tupu ị banye.',
      resetEmailSent: 'Ezitela njikọ ntọgharị okwuntughe na ozi-e gị!',
      publicNotice: 'Ntuziaka mberede, ọnụ ọgụgụ ntiwapụ, na ngwa nyocha ihe egwu bụ n\'efu maka onye ọ bụla na-enweghị nbanye.',
      accountTitle: 'Akaụntụ & Profaịlụ Ahụike',
      accountSubtitle: 'Jikwaa nkọwa gị, steeti gị na Naịjirịa, na ntọala ọkwa ntiwapụ.',
      editProfile: 'Dezie Profaịlụ Ahụike',
      saveChanges: 'Chekwaa Mgbanwe',
      saving: 'Na-echekwa...',
      profileUpdated: 'E melitere profaịlụ ahụike gị nke ọma.',
      phoneLabel: 'Nọmba Ekwentị Mberede',
      stateLabel: 'Isi Steeti Gị na Naịjirịa',
      memberSince: 'Onye otu kemgbe',
      securitySettings: 'Nchekwa & Ọnọdụ Akaụntụ',
      verifiedAccount: 'Ekwadoro na Supabase',
      alertPreferences: 'Ọkwa Mberede NCDC',
      smsAlerts: 'Nweta ozi SMS mberede sitere na NCDC',
      emailAlerts: 'Nweta akwụkwọ akụkọ ahụike kwa izu',
      emergencyQuickLinks: 'Omume Ahụike Ngwa Ngwa',
      viewAssessments: 'Malite Nyocha Ihe Egwu',
      facilityDirectory: 'Chọta Ụlọ Ọgwụ Dị Nso',
      outbreakFeed: 'Lelee Ozi Ntiwapụ Ọhụrụ',
      loginRequiredTitle: 'A Chọrọ Nbanye',
      loginRequiredDesc: 'Biko banye ma ọ bụ mepụta akaụntụ iji nweta profaịlụ EbolaGuard NG gị.'
    }
  }
};
