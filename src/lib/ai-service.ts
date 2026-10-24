import { VirtualDoctorTriageResult, SupportedLanguage } from '../types';

export interface HealthAssistantResponse {
  answer: string;
  sources: string[];
  disclaimer: string;
  recommendedPages?: string[];
}

export async function askHealthAssistant(
  question: string,
  language: SupportedLanguage = 'en'
): Promise<HealthAssistantResponse> {
  try {
    const res = await fetch('/api/health-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, language })
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Fall through to resilient local knowledge engine
  }

  return generateLocalHealthAssistantResponse(question, language);
}

export async function consultVirtualDoctor(
  concernDescription: string,
  answers: {
    symptoms: string[];
    durationDays: number;
    hasExposureRisk: boolean;
    hasSevereBleeding: boolean;
    hasBreathingDifficulty: boolean;
    hasAlteredConsciousness: boolean;
    ageGroup: string;
    locationState: string;
  },
  language: SupportedLanguage = 'en'
): Promise<VirtualDoctorTriageResult> {
  try {
    const res = await fetch('/api/virtual-doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concernDescription, answers, language })
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Fall through to resilient local triage protocol
  }

  return generateLocalTriageAssessment(concernDescription, answers, language);
}

// ========================================================
// CLINICAL TRIAGE DECISION LOGIC (Evidence-based NCDC & WHO)
// ========================================================

function generateLocalTriageAssessment(
  concern: string,
  answers: {
    symptoms: string[];
    durationDays: number;
    hasExposureRisk: boolean;
    hasSevereBleeding: boolean;
    hasBreathingDifficulty: boolean;
    hasAlteredConsciousness: boolean;
    ageGroup: string;
    locationState: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _language: SupportedLanguage
): VirtualDoctorTriageResult {
  const warningSigns: string[] = [];
  const textLower = concern.toLowerCase();

  // Check emergency triggers
  if (answers.hasSevereBleeding || textLower.includes('bleed') || textLower.includes('blood in vomit')) {
    warningSigns.push('Unexplained bleeding or blood in bodily fluids');
  }
  if (answers.hasBreathingDifficulty || textLower.includes('breathing') || textLower.includes('short of breath')) {
    warningSigns.push('Severe shortness of breath or respiratory distress');
  }
  if (answers.hasAlteredConsciousness || textLower.includes('unconscious') || textLower.includes('confusion') || textLower.includes('fainted')) {
    warningSigns.push('Altered consciousness, severe confusion, or fainting');
  }

  const hasCompatibleSymptoms = answers.symptoms.length > 0 ||
    textLower.includes('fever') ||
    textLower.includes('vomit') ||
    textLower.includes('diarrhea') ||
    textLower.includes('weakness');

  // LEVEL 3: Immediate Emergency Escalation
  if (warningSigns.length > 0 || (answers.hasExposureRisk && hasCompatibleSymptoms)) {
    return {
      level: 3,
      level_name: 'Immediate Emergency Medical Attention',
      summary: answers.hasExposureRisk && hasCompatibleSymptoms
        ? 'URGENT: Reported potential exposure history combined with active compatible symptoms requires immediate epidemiological isolation and specialized public health response.'
        : 'CRITICAL ALERT: Your reported symptoms indicate potentially life-threatening warning signs that require emergency clinical assessment immediately.',
      warning_signs_detected: warningSigns.length > 0
        ? warningSigns
        : ['Possible exposure combined with active febrile/gastrointestinal symptoms'],
      exposure_risk_flag: answers.hasExposureRisk,
      recommended_actions: [
        'Call the NCDC Toll-Free Emergency Hotline at 6232 immediately.',
        'IMPORTANT CALL-AHEAD PROTOCOL: If proceeding to a hospital, call the facility in advance to inform them of your symptoms and travel/exposure history so infection control precautions are enacted before you arrive.',
        'Remain in an isolated room separate from family members and avoid sharing towels, cutlery, or sanitation facilities.',
        'Avoid public transport (buses, commercial tricycles, or ride shares); use designated emergency health transport.',
        'Do NOT visit crowded outpatient waiting areas without calling ahead.'
      ],
      safe_self_care: [
        'Stay seated upright or in a recovery position if conscious.',
        'Sip oral rehydration salts (ORS) or clean water only if fully conscious and able to swallow without choking.',
        'Keep warm and avoid sudden strenuous movements.'
      ],
      monitoring_points: [
        'Monitor mental alertness and response time.',
        'Watch for signs of dehydration (extreme dry mouth, sunken eyes, inability to produce urine).',
        'Check for petechiae, purpura, or spontaneous gum bleeding.'
      ],
      urgent_contacts: [
        {
          label: 'NCDC Toll-Free 24/7 National Emergency Hotline',
          phone: '6232',
          description: 'Free call across all Nigerian networks (MTN, Airtel, Glo, 9mobile)'
        },
        {
          label: 'NCDC Alternative Emergency Mobile Line',
          phone: '+234 800 9700 0010',
          description: 'Official National Emergency Operations Centre'
        },
        {
          label: 'Federal Ministry of Health Emergency Operations',
          phone: '+234 708 711 0839',
          description: 'National public health rapid response desk'
        }
      ],
      disclaimer: 'This is an AI emergency assessment, NOT a clinical diagnosis. The virtual assistant cannot confirm or rule out Ebola or any other condition. Seek emergency medical care immediately.'
    };
  }

  // LEVEL 2: Prompt Professional Assessment
  if (answers.durationDays >= 3 || answers.hasExposureRisk || answers.symptoms.length >= 2) {
    return {
      level: 2,
      level_name: 'Prompt Professional Assessment',
      summary: answers.hasExposureRisk
        ? 'Precautionary Guidance: You reported potential exposure without acute severe symptoms. Formal 21-day public health monitoring and temperature surveillance are recommended.'
        : 'Your symptoms (fever, gastrointestinal signs, or persistent fatigue) warrant prompt evaluation by a licensed healthcare professional to rule out common West African febrile illnesses (such as malaria or typhoid) or other infectious conditions.',
      warning_signs_detected: answers.symptoms,
      exposure_risk_flag: answers.hasExposureRisk,
      recommended_actions: [
        'Visit a licensed clinic or primary healthcare centre within the next 24 hours for a professional medical exam and laboratory testing (e.g. malaria RDT / blood film).',
        'If you had any contact with individuals suffering from severe unexplained illness or wild animals, inform the triage nurse immediately upon arrival.',
        'Wear a surgical mask when traveling to the healthcare facility.',
        'Drink plenty of clean fluids and avoid taking unverified medications or antibiotics without a prescription.'
      ],
      safe_self_care: [
        'Oral rehydration therapy with clean boiled water or commercial ORS packets.',
        'Rest in a well-ventilated, quiet room.',
        'Paracetamol may be used for mild fever/pain as directed on package. AVOID aspirin, ibuprofen, or other NSAIDs because they can increase bleeding tendencies in viral fevers.'
      ],
      monitoring_points: [
        'Take temperature twice daily (morning and evening).',
        'Record any new gastrointestinal symptoms (vomiting, loose stools).',
        'Seek immediate emergency escalation if any bleeding, breathlessness, or extreme lethargy develops.'
      ],
      urgent_contacts: [
        {
          label: 'NCDC Public Health Toll-Free',
          phone: '6232',
          description: 'For surveillance and clinical referral advice'
        },
        {
          label: 'Find Verified Healthcare Facility',
          phone: 'Check Directory',
          description: 'Explore the EbolaGuard NG State Health Resources directory'
        }
      ],
      disclaimer: 'AI guidance is informational only and does not establish a diagnosis. A medical doctor must perform a clinical examination.'
    };
  }

  // LEVEL 1: General Guidance
  return {
    level: 1,
    level_name: 'General Guidance',
    summary: 'Your reported symptoms appear mild and do not match immediate high-risk warning flags. General hydration, rest, and routine health precautions are advised.',
    warning_signs_detected: [],
    exposure_risk_flag: false,
    recommended_actions: [
      'Maintain standard hygiene: wash hands frequently with soap and clean running water.',
      'Ensure adequate hydration by drinking clean water, clear broths, or tea.',
      'Monitor how you feel over the next 48 to 72 hours.',
      'If your temperature rises above 38°C (100.4°F) or does not improve in 2 days, seek medical evaluation.'
    ],
    safe_self_care: [
      'Adequate sleep and balanced nutrition.',
      'Regular hand hygiene before meals and after using sanitation facilities.',
      'Do not self-medicate with high-dose medicines or unverified concoctions.'
    ],
    monitoring_points: [
      'Check for any sudden onset of fever or severe headache.',
      'Look out for nausea, vomiting, or stomach pain.',
      'Note any unusual fatigue or weakness.'
    ],
    urgent_contacts: [
      {
        label: 'NCDC General Public Health Line',
        phone: '6232',
        description: 'Toll-free information and guidance'
      }
    ],
    disclaimer: 'This guidance is an AI-assisted educational overview. It cannot replace a qualified doctor.'
  };
}

function generateLocalHealthAssistantResponse(
  question: string,
  language: SupportedLanguage = 'en'
): HealthAssistantResponse {
  const q = question.toLowerCase();

  const isVaccine = q.includes('vaccine') || q.includes('cure') || q.includes('treatment') || q.includes('ogwu') || q.includes('magani') || q.includes('abere');
  const isAirborne = q.includes('airborne') || q.includes('air') || q.includes('breathe') || q.includes('mosquito') || q.includes('afefe') || q.includes('iska') || q.includes('ikuku');
  const isSalt = q.includes('salt') || q.includes('saltwater') || q.includes('bath') || q.includes('rumour') || q.includes('rumor') || q.includes('iyo') || q.includes('gishiri') || q.includes('nnu');

  if (isVaccine) {
    const answers: Record<SupportedLanguage, string> = {
      en: `Yes, there are proven vaccines and medical therapies for Ebola, specifically for the Zaire ebolavirus species:\n\n1. **Ervebo (rVSV-ZEBOV)** is an FDA- and WHO-approved vaccine shown to be highly protective against Zaire ebolavirus.\n2. **Monoclonal Antibodies**: Inmazeb and Ebanga have been approved by regulatory agencies and dramatically improve survival when administered early in clinical infection.\n\n*Important note*: Currently available vaccines do NOT offer proven protection against the Sudan or Bundibugyo species, though candidate vaccines are under clinical evaluation. Supportive clinical care remains vital for all species.`,
      pcm: `Ehen, vaccine and correct medicine dey for Ebola, especially di Zaire type:\n\n1. **Ervebo Vaccine**: Na international approved vaccine wey dey protect person well against Zaire Ebola.\n2. **Monoclonal Antibodies**: Inmazeb and Ebanga na special medicine wey dey help patient survive if dem start am early.\n\n*Important tori*: Di vaccine wey dey ground now no dey work for Sudan or Bundibugyo type, but doctors dey test new ones. If person sick, running enter hospital for proper water and care dey save life.`,
      yo: `Bẹ́ẹ̀ni, àwọn àbẹ́rẹ́ àjẹsára àti oògùn tó dájú wà fún kòkòrò Zaire ebolavirus:\n\n1. **Àbẹ́rẹ́ Ervebo**: Àbẹ́rẹ́ àjẹsára tí àjọ WHO fọwọ́ sí láti dáàbò bo ènìyàn kúrò lọ́wọ́ Ebola.\n2. **Àwọn Oògùn Àkànṣe**: Inmazeb àti Ebanga jẹ́ oògùn tí ó ń gba ẹ̀mí là bí a bá tètè fún aláìsàn ní ilé-ìwòsàn.\n\n*Ìkìlọ̀ Pàtàkì*: Àbẹ́rẹ́ tí ó wà báyìí kò gbó fún oríṣi Sudan tàbí Bundibugyo, ṣùgbọ́n ìwádìí ń lọ lọ́wọ́. Ìtọ́jú kíákíá ní ilé-ìwòsàn ṣe pàtàkì púpọ̀.`,
      ha: `Kwarai kuwa, akwai alluran rigakafi da ingantattun magunguna na musamman don nau'in Zaire ebolavirus:\n\n1. **Allurar Ervebo**: Allurar rigakafi ce da WHO ta amince da ita don kare kamuwa da Ebola.\n2. **Magungunan Inmazeb da Ebanga**: Magunguna ne na musamman da ke taimakawa marar lafiya ya warke idan an yi masa magani da wuri.\n\n*Mahimmin Bayani*: Alluran da ake da su a yanzu ba sa aiki a kan nau'in Sudan ko Bundibugyo, amma ana ci gaba da gwaje-gwaje. Kulawar asibiti da ruwan lodi na da matukar muhimmanci.`,
      ig: `Ee, enwere ezigbo ọgwụ mgbochi na ọgwụgwọ maka ụdị Zaire ebolavirus:\n\n1. **Ọgwụ Mgbochi Ervebo**: Ọ bụ ọgwụ mgbochi nke WHO kwadoro nke na-echebe mmadụ nke ukwuu.\n2. **Ọgwụ Ndị Pụrụ Iche**: Inmazeb na Ebanga bụ ọgwụ na-azọpụta ndụ ma ọ bụrụ na e nye ya n'oge.\n\n*Ihe dị mkpa*: Ọgwụ mgbochi dị ugbu a anaghị arụ ọrụ maka ụdị Sudan ma ọ bụ Bundibugyo, mana a na-eme nyocha ugbu a. Ịga ụlọ ọgwụ n'oge dị oke mkpa.`
    };

    return {
      answer: answers[language] || answers.en,
      sources: ['https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease', 'https://ncdc.gov.ng'],
      disclaimer: 'This information is for health education only. Only certified healthcare authorities administer Ebola vaccines.',
      recommendedPages: ['About Ebola', 'Prevention', 'Statistics']
    };
  }

  if (isAirborne) {
    const answers: Record<SupportedLanguage, string> = {
      en: `No. Ebola is **NOT airborne** and is **NOT transmitted by mosquitoes**.\n\nEbola is spread strictly through direct contact with:\n- The blood or bodily fluids (sweat, saliva, vomit, urine, diarrhoea, semen) of a person who is sick with or has died from Ebola.\n- Contaminated needles, medical instruments, bedding, or clothing soiled with these fluids.\n\nA person cannot catch Ebola from someone breathing near them or casual walking on the street. Individuals only become contagious once they develop active symptoms.`,
      pcm: `Rara o! Ebola **NO DEY FLY FOR AIR** and **yanyanya (mosquito) NO DEY TRANSMIT AM**.\n\nEbola dey spread only through direct contact with:\n- Ẹ̀jẹ̀, èébì, itọ́, ìtọ̀, tàbí omi ara person wey get active sickness or wey don die.\n- All cloth or bed wey dirty with sick person fluid.\n\nPerson no fit catch Ebola through ordinary breeze or person wey dey waka pass for road. Person must touch infected fluid directly.`,
      yo: `Rárá o! Àrùn Ebola **KÌ Í ṢE ÀRÙN AFẸ́FẸ́** bẹ́ẹ̀ ni **ẸFỌN KÒ LÈ KÒ Ó RÀN**.\n\nEbola máa ń ràn kìkì nípasẹ̀ fífọwọ́kan omi ara ní tààràtà:\n- Ẹ̀jẹ̀, èébì, itọ́, ìtọ̀, tàbí ìgbẹ́ aláìsàn tí ó ní àrùn náà tàbí òkú ẹni tí ó kú nípase rẹ̀.\n- Aṣọ ìtẹ́lẹ̀ tàbí abẹ́rẹ́ tí omi ara aláìsàn ti tà sí.\n\nÈnìyàn kò lè kó Ebola nípa mímí afẹ́fẹ́ tàbí rírìn kọjá lẹ́bàá aláìsàn. Aláìsàn ní láti ní àmì àrùn lára kí ó tó lè ràn ẹlòmíràn.`,
      ha: `A'a sam! Cutar Ebola **BA TA YADUWA TA ISKA** kuma **SAURO BA YA SANYA TA**.\n\nEbola tana yaduwa ne kawai ta hanyar taba ruwan jiki kai tsaye:\n- Jini, amai, miyau, fitsari, ko kashin mai cutar ko gawar wanda ya rasu sakamakon cutar.\n- Taba mayafai ko alluran da ruwan jikin marar lafiya ya taba.\n\nBa za a iya kamuwa da Ebola ta hanyar shakar iska ko wucewa ta kusa da mai cutar ba. Dole ne sai mutum ya nuna alamun cutar kafin ya iya shafawa wani.`,
      ig: `Mba! Ebola **ANAGHỊ EFE N'IKUKU** ma **ANWỤNTA ANAGHỊ EBUSA YA**.\n\nEbola na-agbasa naanị site na imetụ mmiri ahụ aka kpọmkwem:\n- Ọbara, agbọ, asọ mmiri, mamịrị, ma ọ bụ nsị onye na-arịa ọrịa ahụ ma ọ bụ ozu onye nwụrụ na ya.\n- Ihe ndina ma ọ bụ uwe mmiri ahụ ruru aka.\n\nMmadụ apụghị ibute Ebola site n'ikuku nkịtị ma ọ bụ ịgafe n'akụkụ onye nwere ya. Onye ahụ ga-enwerịrị ihe ịrịba ama tupu o nwee ike ibunye onye ọzọ.`
    };

    return {
      answer: answers[language] || answers.en,
      sources: ['https://ncdc.gov.ng/diseases/factsheet/54', 'https://www.who.int/health-topics/ebola'],
      disclaimer: 'Public health advice based on verified epidemiological consensus.',
      recommendedPages: ['Symptoms and Exposure', 'Prevention']
    };
  }

  if (isSalt) {
    const answers: Record<SupportedLanguage, string> = {
      en: `**DANGER**: Saltwater baths or drinking saltwater do NOT cure or prevent Ebola. In fact, this dangerous myth caused multiple deaths and emergency hospital admissions in Nigeria during 2014.\n\nIngesting excessive salt causes dangerous hypernatraemia (salt toxicity), dehydration, kidney failure, and seizures. Rely only on genuine hygiene: wash hands with soap and running water, or use an alcohol-based sanitiser.`,
      pcm: `**EWOO / WABALA**: Wíwẹ̀ omi iyọ̀ tàbí mímu omi iyọ̀ **NO DEY CURE OR PREVENT EBOLA** at all!\n\nFor 2014, dis fake rumour cause people make dem die and enter emergency hospital for Naija because of salt poisoning (oró iyọ̀). Make you use ordinary soap and clean water wash your hands well, or sanitiser. No drink saltwater!`,
      yo: `**EWU NLA**: Mímu tàbí wíwẹ̀ omi iyọ̀ **KÒ LÈ DÈNÀ TÀBÍ WO EBOLA** láé!\n\nNí ọdún 2014, irọ́ eléwu yìí pa ọ̀pọ̀ ènìyàn ní Nàìjíríà tí wọ́n sì kún inú ilé-ìwòsàn nítorí oró iyọ̀ líle nínú ẹ̀jẹ̀. Fífọ ọwọ́ pẹ̀lú ọṣẹ àti omi tó ń ṣàn nìkan ni ọ̀nà àbáyọ tó dájú. MÁ ṢE mu omi iyọ̀!`,
      ha: `**HADARI BABBA**: Shan ruwan gishiri ko wanka da shi **BA YA MAGANIN EBOLA KO KARE MUTUM** sam!\n\nA shekarar 2014, wannan karyar ta kashe mutane da yawa a Najeriya sakamakon gubar gishiri a jiki. Ka dogara kawai kan wanke hannu da sabulu da ruwa mai gudu, ko man tsaftace hannu. Kada ka sha ruwan gishiri!`,
      ig: `**OKE IHE EGWU**: Ịṅụ ma ọ bụ ịsa mmiri nnu **ANAGHỊ AGWỌ MA Ọ BỤ GBOCHIE EBOLA** ma ọlị!\n\nN'afọ 2014, akụkọ ụgha a gburu ọtụtụ ndị mmadụ na Naịjirịa ma mee ka ọtụtụ ndị nọrọ n'ụlọ ọgwụ n'ihi nsị nnu. Jiri ncha na mmiri na-asọ asọ kwọọ aka gị nke ọma mgbe niile. Aṅụla mmiri nnu!`
    };

    return {
      answer: answers[language] || answers.en,
      sources: ['https://ncdc.gov.ng', 'https://health.gov.ng'],
      disclaimer: 'Always verify health rumours with official NCDC bulletins before acting on them.',
      recommendedPages: ['About Ebola', 'Prevention', 'Awareness Resources']
    };
  }

  const defaultAnswers: Record<SupportedLanguage, string> = {
    en: `Ebola virus disease (EVD) is a rare but severe illness caused by the Ebola virus. Key facts:\n\n- **Transmission**: Direct contact with body fluids of an infected person who has symptoms, or infected animals.\n- **Incubation**: 2 to 21 days (most commonly 8–10 days).\n- **Early symptoms**: Sudden high fever, fatigue, muscle pain, headache, and sore throat, followed by vomiting, diarrhoea, and in severe cases, unexplained bleeding.\n- **Current Nigerian Status**: Nigeria has ZERO active cases in 2026. Surveillance at airports and borders is strictly proactive.\n- **Emergency Hotline**: NCDC Toll-Free 6232.`,
    pcm: `Tori kókó nípa Ebola Virus Disease (EVD):\n\n- **Bí E Dey Enter Body**: Fífọwọ́kan omi ara (ẹ̀jẹ̀, èébì, itọ́) aláìsàn wey get symptoms tàbí ẹran igbó.\n- **Àkókò Tí E Dey Take Show**: Ọjọ́ 2 sí 21 (ọ̀pọ̀ ìgbà láàárín ọjọ́ 8 sí 10).\n- **Àwọn Àmì Àkọ́kọ́**: Ibà gíga lójijì, àárẹ̀ ara, orí fífọ́, èébì, àti ìgbẹ́ gbuuru.\n- **Ipò Nàìjíríà Lónìí**: Kò sí ẹnikẹ́ni tó ní Ebola ní Nàìjíríà ní ọdún 2026. Ìjọba ń ṣọ́ bodè dáadáa.\n- **Láìní Pàjáwìrì**: Pe NCDC ọ̀fẹ́ ní 6232.`,
    yo: `Àwọn Kókó Pàtàkì Nípa Àrùn Ebola (EVD):\n\n- **Bí Ó Ṣe Ń Ràn**: Fífọwọ́kan omi ara (ẹ̀jẹ̀, èébì, itọ́, ìtọ̀) aláìsàn tàbí ẹran igbó tó ní kòkòrò náà.\n- **Àkókò Àmì**: Láàárín ọjọ́ 2 sí 21 (púpọ̀ jùlọ ọjọ́ 8 sí 10).\n- **Àwọn Àmì Àkọ́kọ́**: Ibà gíga lójijì, àárẹ̀ ara, ẹ̀fọ́rí, èébì, àti ìgbẹ́ gbuuru.\n- **Ipò Nàìjíríà Báyìí**: Kò sí ẹnikẹ́ni tó ní àrùn náà ní Nàìjíríà ní 2026. Ìṣọ́ ń lọ lọ́wọ́ ní gbogbo bodè.\n- **Nọ́mbà Pàjáwìrì**: Pe NCDC 6232 lọ́fẹ̀ẹ́.`,
    ha: `Muhimman Bayanai Game Da Cutar Ebola (EVD):\n\n- **Yaduwa**: Taba ruwan jikin marar lafiya mai nuna alamun cutar kai tsaye, ko dabbobin daji.\n- **Lokacin Bayyana**: Tsakanin kwanaki 2 zuwa 21 (mafi yawanci kwanaki 8 zuwa 10).\n- **Alamomin Farko**: Zazzabi mai zafi kwatsam, matsananciyar gajiya, ciwon kai, amai, da zawo.\n- **Halin Najeriya Yanzu**: Babu wanda ya kamu da cutar a Najeriya a shekarar 2026. Ana ci gaba da kula a dukkan iyakoki.\n- **Layin Gaggawa**: Kira NCDC kyauta a 6232.`,
    ig: `Isi Ihe Ndị Dị Mkpa Banyere Ọrịa Ebola (EVD):\n\n- **Mgbasa**: Imetụ mmiri ahụ (ọbara, agbọ, asọ mmiri) onye na-arịa ọrịa ahụ aka kpọmkwem, ma ọ bụ anụ ọhịa.\n- **Oge Ọ Na-ewe**: Ụbọchị 2 ruo 21 (ọkachasị ụbọchị 8 ruo 10).\n- **Ihe Ịrịba Ama Mbụ**: Oke ahụ ọkụ na mberede, ike ọgwụgwụ, isi ọwụwa, agbọ, na afọ ọsịsa.\n- **Ọnọdụ Naịjirịa Ugbu A**: Ọ dịghị onye bu ọrịa ahụ na Naịjirịa na 2026. A na-eche nche nke ọma n'oke ala niile.\n- **Akara Ekwentị Mberede**: Kpọọ NCDC n'efu na 6232.`
  };

  return {
    answer: defaultAnswers[language] || defaultAnswers.en,
    sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola', 'https://africacdc.org'],
    disclaimer: 'EbolaGuard NG is an educational resource. Consult a healthcare provider for any personal medical evaluation.',
    recommendedPages: ['About Ebola', 'Symptoms and Exposure', 'Virtual Doctor', 'Emergency Help']
  };
}
