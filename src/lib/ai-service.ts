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
  language: SupportedLanguage = 'en'
): VirtualDoctorTriageResult {
  const warningSigns: string[] = [];
  const textLower = concern.toLowerCase();

  const isBleeding =
    answers.hasSevereBleeding ||
    answers.symptoms.some((s) => s.toLowerCase().includes('bleed') || s.toLowerCase().includes('èjẹ̀') || s.toLowerCase().includes('jini') || s.toLowerCase().includes('ọbara')) ||
    textLower.includes('bleed') ||
    textLower.includes('blood');

  const isBreathing =
    answers.hasBreathingDifficulty ||
    textLower.includes('breath') ||
    textLower.includes('shortness of breath') ||
    textLower.includes('mí');

  const isConsciousness =
    answers.hasAlteredConsciousness ||
    textLower.includes('unconscious') ||
    textLower.includes('confusion') ||
    textLower.includes('faint') ||
    textLower.includes('koma');

  if (isBleeding) {
    warningSigns.push(
      language === 'pcm' ? 'Blood dey comot from mouth, nose, stool or skin' :
      language === 'yo' ? 'Ẹ̀jẹ̀ tó ń jáde láìtọ́ láti ẹnu, imú tàbí ìgbẹ́' :
      language === 'ha' ? 'Zubar jini daga baki, hanci ko bayan gida' :
      language === 'ig' ? 'Ọbara na-agba na mberede site n\'ọnụ, imi ma ọ bụ nsị' :
      'Unexplained bleeding or blood in bodily fluids'
    );
  }

  if (isBreathing) {
    warningSigns.push(
      language === 'pcm' ? 'Wahala to breathe or chest dey tight heavy' :
      language === 'yo' ? 'Ìṣòro mímí tó le tàbí àyà fífún' :
      language === 'ha' ? 'Wahalar numfashi mai tsanani ko matsewar kirji' :
      language === 'ig' ? 'Iku ume ike nke ukwuu ma ọ bụ obi mkpụkọ' :
      'Severe shortness of breath or respiratory distress'
    );
  }

  if (isConsciousness) {
    warningSigns.push(
      language === 'pcm' ? 'Person dey lose mind, confuse well-well, or faint' :
      language === 'yo' ? 'Ìdàrúdàpọ̀ ọpọlọ, dídákú tàbí àìmọ ibi tí a wà' :
      language === 'ha' ? 'Rikicewar tunani, faduwa sumamme ko rashin sani' :
      language === 'ig' ? 'Ọgbaghara echiche, ịdaba mba ma ọ bụ enweghị uche' :
      'Altered consciousness, severe confusion, or fainting'
    );
  }

  const hasCompatibleSymptoms =
    answers.symptoms.length > 0 ||
    textLower.includes('fever') ||
    textLower.includes('vomit') ||
    textLower.includes('diarrhea') ||
    textLower.includes('weakness') ||
    textLower.includes('ibà') ||
    textLower.includes('zazzabi') ||
    textLower.includes('ahụ ọkụ');

  // LEVEL 3: Immediate Emergency Escalation
  if (warningSigns.length > 0 || (answers.hasExposureRisk && hasCompatibleSymptoms)) {
    const titles: Record<SupportedLanguage, string> = {
      en: 'Level 3: Immediate Emergency Medical Attention',
      pcm: 'Level 3: Emergency Care Wey You Need Sharp-Sharp',
      yo: 'Ipele 3: Ìtọ́jú Ìṣègùn Pàjáwìrì Lẹ́sẹ̀kẹsẹ̀',
      ha: 'Mataki na 3: Kulawar Lafiya ta Gaggawa Cikin Gaggawa',
      ig: 'Ọkwa 3: Nlekọta Ahụike Mberede Ozugbo'
    };

    const summaries: Record<SupportedLanguage, string> = {
      en: answers.hasExposureRisk && hasCompatibleSymptoms
        ? 'URGENT MEDICAL ALERT: Reported potential exposure history combined with active symptoms requires immediate clinical isolation and specialized public health response. Call ahead before traveling.'
        : 'CRITICAL WARNING: Your reported signs indicate potentially life-threatening symptoms requiring immediate medical evaluation. Contact emergency public health authorities immediately.',
      pcm: answers.hasExposureRisk && hasCompatibleSymptoms
        ? 'OGBONGE WARNING: You talk say you fit don touch infected person or travel go where outbreak dey, plus say you get sharp symptoms. You need emergency isolation and quick health response now. Call before you go hospital.'
        : 'OGBONGE ALERT: Di symptoms wey you report show say serious danger sign dey. You need doctor check am sharp-sharp for hospital.',
      yo: answers.hasExposureRisk && hasCompatibleSymptoms
        ? 'ÌKÌLỌ̀ PÀJÁWÌRÌ: Ìtàn ìfaradà pẹ̀lú àwọn àmì àrùn tó le gba àbójútó pàjáwìrì àti ìsọtọ̀ lẹ́sẹ̀kẹsẹ̀ láti ọwọ́ àwọn oníṣẹ́-ìlera. Kọ́kọ́ pe ilé-ìwòsàn ṣáájú kí o tó dé.'
        : 'ÌKÌLỌ̀ KAN KAN: Àwọn àmì tí o sọ fi hàn pé ewu ńlá wà fún ẹ̀mí. Ó nílò àyẹ̀wò ìṣègùn pàjáwìrì ní ilé-ìwòsàn kíákíá.',
      ha: answers.hasExposureRisk && hasCompatibleSymptoms
        ? 'GARGADI NA GAGGAWA: Tarihin haduwa da mai cutar tare da alamun cutar yana bukatar kebewa da daukar matakin gaggawa daga hukumomin lafiya. Kira asibiti kafin zuwa.'
        : 'GARGADI MAI MUHIMMANCI: Alamomin da ka bayyana suna nuna alamun hadari da ke bukatar ganin likita cikin gaggawa a asibiti.',
      ig: answers.hasExposureRisk && hasCompatibleSymptoms
        ? 'ỊDỌ AKA NÁ NTỊ MBEREDE: Ịnọ nso onye nwere ike ibute ọrịa yana inwe ihe mgbaàmà chọrọ ịnọpụ iche na enyemaka ahụike mberede ozugbo. Kpọọ ụlọ ọgwụ tupu ị rute.'
        : 'ỊDỌ AKA NÁ NTỊ: Ihe mgbaàmà gị na-egosi ihe egwu siri ike nke chọrọ nyocha dọkịta ozugbo n\'ụlọ ọgwụ.'
    };

    const actions: Record<SupportedLanguage, string[]> = {
      en: [
        'Call the NCDC Toll-Free Emergency Hotline at 6232 immediately.',
        'MANDATORY CALL-AHEAD PROTOCOL: If proceeding to a hospital, call the facility in advance to inform them of your symptoms and travel/exposure history so infection control precautions are enacted before you arrive.',
        'Remain in an isolated room separate from family members and avoid sharing towels, cutlery, or sanitation facilities.',
        'Avoid public transport (buses, commercial tricycles, or ride shares); use designated emergency health transport.',
        'Do NOT visit crowded outpatient waiting areas without calling ahead.'
      ],
      pcm: [
        'Pe NCDC Toll-Free Emergency Hotline for 6232 immediately.',
        'CALL-AHEAD RULE: Before you reach any hospital, call dem first make dem prepare isolation room and protection gear before you show face.',
        'Stay inside separate room away from family people; no share towel, spoon, or toilet.',
        'No enter molue, danfo, or public transport; make emergency health bus carry you.',
        'No go sit down for crowded hospital reception without telling dem beforehand.'
      ],
      yo: [
        'Pe nọ́mbà ọ̀fẹ́ NCDC ní 6232 lẹ́sẹ̀kẹsẹ̀.',
        'ÌLÀNÀ ÌPÈ ṢÁAJÚ: Kí o tó dé ilé-ìwòsàn kankan, kọ́kọ́ pe wọ́n kí àwọn dọ́kítà lè múra yàrá ìsọtọ̀ àti aṣọ ààbò sílẹ̀ kí o tó dé.',
        'Dúró sí yàrá ọ̀tọ̀ kúrò lọ́dọ̀ àwọn mọ̀lẹ́bí; má ṣe pín aṣọ, kọ́ọ̀bù, tàbí ilé-ìgbọ̀nsẹ̀.',
        'Má ṣe wọ ọkọ̀ èrò tàbí kẹ̀kẹ́ marwa; jẹ́ kí ọkọ̀ ètò ìlera gbé ọ.',
        'Má ṣe lọ sí ibi àkójọpọ̀ ènìyàn láì kọ́kọ́ pe ilé-ìwòsàn.'
      ],
      ha: [
        'Kira layin gaggawa na NCDC kyauta a 6232 nan take.',
        'KA\'IDAR KIRA KAFIN ZUWA: Kafin ka tafi asibiti, kira su a waya don ma\'aikatan su shirya dakin kebewa da kayan kariya kafin ka isa.',
        'Zauna a daki daban da \'yan uwa; kada a raba tawul, kofi, ko bandaki.',
        'Kada ka shiga motar haya ko adaidaita sahu; yi amfani da motar asibiti.',
        'Kada ka shiga dakin jiran marasa lafiya ba tare da ka sanar da su ba.'
      ],
      ig: [
        'Kpọọ NCDC n\'efu na 6232 ozugbo.',
        'USORO ỊKPỌ OKWU TUPU Ị GAA: Tupu ị gaa ụlọ ọgwụ ọ bụla, buru ụzọ kpọọ ha ka ndị ọrụ ahụike dozie ọnụ ụlọ iche na uwe nchebe tupu ị rute.',
        'Nọrọ n\'ọnụ ụlọ dị iche n\'ebe ndị ezinụlọ nọ; ekekọrịtala akwa nhicha, efere, ma ọ bụ mposi.',
        'Ejila ụgbọ ala ọha ma ọ bụ keke napep gaa; jiri ụgbọ ala mberede.',
        'Abanyela n\'ebe ndị mmadụ jupụtara na-enweghị ịkpọ oku mbụ.'
      ]
    };

    return {
      level: 3,
      level_name: titles[language] || titles.en,
      summary: summaries[language] || summaries.en,
      warning_signs_detected: warningSigns.length > 0 ? warningSigns : [answers.symptoms.join(', ') || 'Acute symptoms with exposure history'],
      exposure_risk_flag: answers.hasExposureRisk,
      recommended_actions: actions[language] || actions.en,
      safe_self_care: [
        'Stay seated upright or in a recovery position if conscious.',
        'Sip oral rehydration salts (ORS) or clean boiled water only if fully conscious.',
        'Keep calm and avoid sudden strenuous physical movement.'
      ],
      monitoring_points: [
        'Monitor mental alertness and response time closely.',
        'Watch for signs of acute dehydration (dry mouth, sunken eyes, inability to pass urine).',
        'Check for spontaneous gum or mucosal bleeding.'
      ],
      urgent_contacts: [
        {
          label: 'NCDC Toll-Free 24/7 National Emergency Hotline',
          phone: '6232',
          description: 'Free call across all Nigerian networks (MTN, Airtel, Glo, 9mobile)'
        },
        {
          label: 'NCDC Alternative Emergency Operations Line',
          phone: '+234 800 9700 0010',
          description: 'Official National Emergency Operations Centre'
        }
      ],
      disclaimer: 'This is an educational AI assessment, NOT a clinical diagnosis. Symptoms alone cannot confirm or rule out Ebola or other conditions. Laboratory testing (RT-PCR) is required. Seek immediate medical attention.'
    };
  }

  // LEVEL 2: Prompt Professional Assessment
  if (answers.durationDays >= 3 || answers.hasExposureRisk || answers.symptoms.length >= 2 || hasCompatibleSymptoms) {
    const titles: Record<SupportedLanguage, string> = {
      en: 'Level 2: Prompt Primary Healthcare Assessment',
      pcm: 'Level 2: Quick Visit to Primary Health Centre (Within 24 Hours)',
      yo: 'Ipele 2: Ìbẹ̀wò Kíákíá Sí Ilé-Ìwòsàn Agbègbè (Láàárín Wákàtí 24)',
      ha: 'Mataki na 2: Ziyarar Gaggawa Zuwa Asibitin Kusa (Cikin Sa\'o\'i 24)',
      ig: 'Ọkwa 2: Ịga Ụlọ Ọgwụ Ndị Obodo Ngwa Ngwa (N\'ime Awa 24)'
    };

    const summaries: Record<SupportedLanguage, string> = {
      en: answers.hasExposureRisk
        ? 'Precautionary Guidance: You reported potential exposure without acute emergency signs. Formal 21-day public health monitoring and temperature surveillance are recommended.'
        : 'Your symptoms warrant prompt evaluation by a licensed healthcare professional within 24 hours to test for and treat common West African febrile illnesses (such as malaria or typhoid) and monitor infection markers.',
      pcm: answers.hasExposureRisk
        ? 'Guidance: You talk say you fit don close to person wey get exposure, but emergency danger sign never show. You suppose do 21-day temperature check with health workers.'
        : 'Di symptoms wey you report mean say make you visit primary health centre or clinic within 24 hours make dem test for malaria or typhoid and check your body well.',
      yo: answers.hasExposureRisk
        ? 'Ìtọ́sọ́nà Ààbò: O sọ pé ìfaradà lè wáyé ṣùgbọ́n àwọn àmì ewu ńlá kò tí ì fi ara hàn. A gbani nímọ̀ràn àyẹ̀wò fún ọjọ́ 21 pẹ̀lú àwọn òṣìṣẹ́ ìlera.'
        : 'Àwọn àmì rẹ gba pé kí o lọ sí ilé-ìwòsàn agbègbè láàárín wákàtí 24 fún àyẹ̀wò ẹ̀jẹ̀ láti ṣàyẹ̀wò ibà (malaria), typhoid, tàbí àwọn àkóràn mìíràn.',
      ha: answers.hasExposureRisk
        ? 'Shawarar Kariya: Ka bayyana cewa an sami haduwa amma babu manyan alamun gaggawa. Ana ba da shawarar sanya ido kan zafin jiki na tsawon kwanaki 21.'
        : 'Alamomin da kuka bayyana suna bukatar ganin likita a asibitin kusa cikin sa\'o\'i 24 domin gwajin zazzabin cizon sauro (malaria) ko typhoid da sauran cututtuka.',
      ig: answers.hasExposureRisk
        ? 'Ntuziaka Nchekwa: I kwuru na enwere ike inwe mmekọrịta mana enweghị ihe egwu mberede. A na-atụ aro nlekota okpomọkụ ruo ụbọchị 21 n\'aka ndị ọrụ ahụike.'
        : 'Ihe mgbaàmà gị chọrọ nyocha dọkịta n\'ụlọ ọgwụ dị nso n\'ime awa 24 iji nyochaa ịba (malaria) ma ọ bụ typhoid na ọrịa ndị ọzọ.'
    };

    const actions: Record<SupportedLanguage, string[]> = {
      en: [
        'Visit a licensed clinic or primary healthcare centre within the next 24 hours for examination and laboratory tests (e.g., malaria RDT or blood film).',
        'If you had any contact with individuals suffering from unexplained illness, inform the intake nurse immediately upon arrival.',
        'Wear a surgical face mask when traveling to the healthcare facility.',
        'Drink plenty of clean fluids (water, ORS) and avoid taking unverified medications or antibiotics without a prescription.'
      ],
      pcm: [
        'Go licensed hospital or health centre within 24 hours make dem test your blood for malaria or typhoid.',
        'If you touch anybody wey get strange sickness, tell di nurse for entrance immediately you reach.',
        'Wear nose mask when you dey go hospital.',
        'Drink clean boiled water or ORS plenty, and no take medicine without doctor prescription.'
      ],
      yo: [
        'Lọ sí ilé-ìwòsàn tí a mọ̀ dunjú láàárín wákàtí 24 fún àyẹ̀wò ẹ̀jẹ̀ (malaria àti typhoid).',
        'Bí o bá ti súnmọ́ ẹni tí ó ní àrùn àìmọ̀, sọ fún nọ́ọ̀sì lẹ́sẹ̀kẹsẹ̀ tí o bá dé.',
        'Wọ ìbòjú (face mask) nígbà tí o bá ń lọ sí ilé-ìwòsàn.',
        'Mu omi mímọ́ tàbí ORS púpọ̀, má ṣe ra oògùn láì gba àṣẹ dọ́kítà.'
      ],
      ha: [
        'Ziyarci asibitin da aka amince da shi cikin sa\'o\'i 24 don gwajin jini (malaria da typhoid).',
        'Idan ka taba haduwa da wanda ke da cutar da ba a sani ba, sanar da ma\'aikaciyar lafiya da zaran ka isa.',
        'Sanya takunkumin fuska (mask) yayin tafiya zuwa asibiti.',
        'Sha tsaftataccen ruwa ko ORS sosai, kada ka sha magani ba tare da takardar likita ba.'
      ],
      ig: [
        'Gaa n\'ụlọ ọgwụ nwere ikike n\'ime awa 24 maka nyocha ọbara (ịba na typhoid).',
        'Ọ bụrụ na ị nọrọ nso onye nwere ọrịa a na-amaghị, gwa nọọsụ ozugbo ị ruru.',
        'Yiri ihe mkpuchi ihu (mask) mgbe ị na-aga ụlọ ọgwụ.',
        'Ṅụọ mmiri dị ọcha ma ọ bụ ORS nke ọma, anaghị aṅụ ọgwụ n\'enweghị dọkịta.'
      ]
    };

    return {
      level: 2,
      level_name: titles[language] || titles.en,
      summary: summaries[language] || summaries.en,
      warning_signs_detected: answers.symptoms.length > 0 ? answers.symptoms : ['Persistent or progressing febrile symptoms'],
      exposure_risk_flag: answers.hasExposureRisk,
      recommended_actions: actions[language] || actions.en,
      safe_self_care: [
        'Oral rehydration therapy with clean boiled water or commercial ORS packets.',
        'Rest in a well-ventilated, quiet room.',
        'Paracetamol may be used for mild fever/pain as directed on package. AVOID aspirin, ibuprofen, or NSAIDs as they increase bleeding tendencies in viral fevers.'
      ],
      monitoring_points: [
        'Take temperature twice daily (morning and evening).',
        'Record any new gastrointestinal symptoms (vomiting, watery stools).',
        'Seek immediate emergency escalation (Call 6232) if any bleeding or breathlessness develops.'
      ],
      urgent_contacts: [
        {
          label: 'NCDC Public Health Toll-Free',
          phone: '6232',
          description: 'For surveillance and clinical referral advice'
        }
      ],
      disclaimer: 'This guidance is informational only and does not establish a diagnosis. A medical doctor must perform a clinical examination.'
    };
  }

  // LEVEL 1: General Guidance
  const titles: Record<SupportedLanguage, string> = {
    en: 'Level 1: General Home Care & Monitoring',
    pcm: 'Level 1: Normal Home Care & Water Drinking',
    yo: 'Ipele 1: Ìtọ́jú Ní Ilé & Mímu Omi Púpọ̀',
    ha: 'Mataki na 1: Kulawar Gida & Yawan Shan Ruwa',
    ig: 'Ọkwa 1: Nlekọta n\'Ụlọ & Ịṅụ Ọtụtụ Mmiri'
  };

  const summaries: Record<SupportedLanguage, string> = {
    en: 'Your reported symptoms appear mild and do not match immediate high-risk warning flags. General hydration, rest, and routine health precautions are advised. Monitor your temperature.',
    pcm: 'Di symptoms wey you report dey mild and emergency danger sign no dey. Drink clean water, rest well, and watch your body for the next 2 days.',
    yo: 'Àwọn àmì tí o sọ fẹ́ẹ́rẹ́ kò sì ní àwọn àmì ewu ńlá kankan nínú. Ìmọ́tótó, mímu omi mímọ́, àti ìsinmi ni a gbani nímọ̀ràn rẹ̀. Ṣọ́ ara rẹ dáadáa.',
    ha: 'Alamomin da ka bayyana ba su da tsanani kuma babu manyan alamun hadari. Ana ba da shawarar shan ruwa mai tsafta, samun hutu, da lura da zafin jiki.',
    ig: 'Ihe mgbaàmà gị dị mfe ma enweghị ihe ịrịba ama nke nnukwu ihe egwu. A na-atụ aro ịṅụ mmiri dị ọcha, izu ike, na idebe ịdị ọcha. Nyochaa ahụ gị.'
  };

  const actions: Record<SupportedLanguage, string[]> = {
    en: [
      'Maintain standard hygiene: wash hands frequently with soap and clean running water.',
      'Ensure adequate hydration by drinking clean water, clear broths, or tea.',
      'Monitor how you feel over the next 48 to 72 hours.',
      'If your temperature rises above 38°C (100.4°F) or does not improve in 2 days, seek medical evaluation.'
    ],
    pcm: [
      'Dey wash hand with soap and running water regularly.',
      'Drink plenty clean water, tea, or pepper soup wey clean.',
      'Watch your body over the next 48 to 72 hours.',
      'If fever high pass 38°C or e no improve after 2 days, go see doctor.'
    ],
    yo: [
      'Máa fọ ọwọ́ rẹ pẹ̀lú ọṣẹ àti omi tó ń ṣàn déédé.',
      'Mu omi mímọ́ púpọ̀ láti jẹ́ kí omi inú ara rẹ péye.',
      'Ṣọ́ bí ara rẹ ṣe ń ṣe ọ́ fún wákàtí 48 sí 72 tí ń bọ̀.',
      'Bí ibà bá ga kọjá 38°C tàbí tí kò bá lọ lẹ́yìn ọjọ́ 2, lọ sí ilé-ìwòsàn.'
    ],
    ha: [
      'Wanke hannaye da sabulu da ruwa mai gudu akai-akai.',
      'Tabbatar da shan tsaftataccen ruwa ko shayi yadda ya kamata.',
      'Kula da yadda kake ji a cikin sa\'o\'i 48 zuwa 72 masu zuwa.',
      'Idan zazzabi ya haura 38°C ko bai ragu ba bayan kwanaki 2, ziyarci likita.'
    ],
    ig: [
      'Na-akwọ aka mgbe niile site na iji ncha na mmiri na-asọ asọ.',
      'Ṅụọ mmiri dị ọcha nke ọma ma ọ bụ tii.',
      'Kiri otu ahụ gị dị n\'ime awa 48 ruo 72 na-abịa.',
      'Ọ bụrụ na ahụ ọkụ ruru karịa 38°C ma ọ bụ ghara ịka mma mgbe ụbọchị 2 gachara, gaa hụ dọkịta.'
    ]
  };

  return {
    level: 1,
    level_name: titles[language] || titles.en,
    summary: summaries[language] || summaries.en,
    warning_signs_detected: [],
    exposure_risk_flag: false,
    recommended_actions: actions[language] || actions.en,
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
  const q = question.toLowerCase().trim();

  // 1. Casual Chat: "How are you?"
  const isHowAreYou = /^(how\s*are\s*you|how\s*r\s*u|how\s*are\s*you\s*doing|how\s*far|bawo\s*ni|yaya\s*kake|kedu\s*ka\s*ị\s*mere)[\s!?.👋]*$/i.test(q) ||
    q.includes('how are you') || q.includes('how are you doing') || q.includes('bawo ni') || q.includes('yaya kake') || q.includes('kedu ka i mere');

  if (isHowAreYou) {
    const answers: Record<SupportedLanguage, string> = {
      en: "I'm here and ready to help! What health question can I assist you with today?",
      pcm: "I dey fine and ready to help! Which health question you get today?",
      yo: "Mo wa daadaa, mo si ṣetan lati ran ọ lọwọ! Ibeere ilera wo ni o ni loni?",
      ha: "Ina nan lafiya kuma a shirye nake in taimake ku! Wace tambayar lafiya zan iya taimaka muku da ita a yau?",
      ig: "Adị m mma ma dị njikere inyere gị aka! Kedu ajụjụ ahụike ị nwere taa?"
    };
    return {
      answer: answers[language] || answers.en,
      sources: [],
      disclaimer: ''
    };
  }

  // 2. Greetings: "Hey", "Hi", "Hello", "Good morning", etc.
  const isGreeting = /^(hey|hi|hello|good\s*(morning|afternoon|evening)|howdy|what'?s\s*up|sup|yo|sannu|ina\s*kwana|bawo|e\s*nle|ekaro|kedu|ndewo)[\s!?.👋]*$/i.test(q) ||
    q === 'hey' || q === 'hi' || q === 'hello' || q === 'good morning' || q === 'good afternoon' || q === 'good evening' ||
    q === 'sannu' || q === 'kedu' || q === 'ndewo' || q === 'bawo';

  if (isGreeting) {
    const answers: Record<SupportedLanguage, string> = {
      en: "Hey! 👋 Welcome to EbolaGuard NG. I'm your virtual health assistant. How can I help you today?",
      pcm: "Hey! 👋 Welcome to EbolaGuard NG. I be your virtual health assistant. How I fit help you today?",
      yo: "Ẹ n lẹ́ o! 👋 Ẹ ku abọ si EbolaGuard NG. Èmi ni oluranlọwọ ilera rẹ. Bawo ni mo ṣe le ran ọ lọwọ loni?",
      ha: "Sannu! 👋 Barka da zuwa EbolaGuard NG. Ni ne mataimakin lafiyarku. Ta yaya zan iya taimaka muku a yau?",
      ig: "Nnọọ! 👋 Nnọọ na EbolaGuard NG. Abụ m onye enyemaka ahụike gị. Kedu ka m ga-esi nyere gị aka taa?"
    };
    return {
      answer: answers[language] || answers.en,
      sources: [],
      disclaimer: ''
    };
  }

  // 3. Thanks / Pleasantries
  const isThanks = /^(thanks|thank\s*you|nagode|daalu|ese|o\s*she|ok|okay|bye|goodbye)[\s!?.👋]*$/i.test(q);
  if (isThanks) {
    const answers: Record<SupportedLanguage, string> = {
      en: "You're very welcome! If you have any questions about health, symptoms, or prevention, I'm here to help.",
      pcm: "You dey welcome well-well! If you get any health question, make you ask me anytime.",
      yo: "Kò tọ́pẹ́ rara! Ti o ba ni ibeere eyikeyi lori ilera tabi idena aisan, mo wa nibi lati ran ọ lọwọ.",
      ha: "Ba komai! Idan kuna da wata tambaya game da kiwon lafiya ko rigakafi, ina nan don taimaka muku.",
      ig: "Ndewo nke ukwuu! Ọ bụrụ na ị nwere ajụjụ gbasara ahụike ma ọ bụ mgbochi, anọ m ebe a inyere gị aka."
    };
    return {
      answer: answers[language] || answers.en,
      sources: [],
      disclaimer: ''
    };
  }

  // 4. Safety-Critical: Exposure + Symptoms ("I may have been exposed...")
  const isExposure = (q.includes('exposed') || q.includes('exposure') || q.includes('contact')) &&
    (q.includes('fever') || q.includes('sick') || q.includes('symptom') || q.includes('ill') || q.includes('vomit'));

  if (isExposure) {
    const answers: Record<SupportedLanguage, string> = {
      en: `⚠️ **Urgent Health Guidance**: If you believe you may have been exposed to Ebola and are experiencing a fever or other symptoms, please take these steps immediately:\n\n1. **Contact a Healthcare Provider Promptly**: Reach out to a medical professional or public health authority right away.\n2. **Call Ahead Before Visiting**: Before going to any hospital, clinic, or health facility, **call them in advance**. This critical step enables healthcare workers to prepare an isolation space and wear appropriate protective equipment before you arrive, protecting you and others.\n3. **Isolate and Avoid Contact**: Stay in a separate room away from family members, avoid close physical contact, and avoid public transportation.\n4. **Official Emergency Line**: In Nigeria, you can contact the Nigeria Centre for Disease Control and Prevention (NCDC) toll-free emergency hotline at **6232** for immediate guidance.`,
      pcm: `⚠️ **Urgent Health Guidance**: If you feel say you touch person wey get Ebola and now fever dey catch you, abeg follow these steps sharp-sharp:\n\n1. **Call Doctor or Health Office Quick**: Reach out to health workers right away.\n2. **Call Dem First Before You Waka Go**: Before you enter any hospital, **call dem for phone first**. Dis will make doctors prepare isolation room and protective clothes before you reach there.\n3. **Stay for Separate Room**: No stay close to family members, and no enter public bus or keke.\n4. **Official Line**: For Nigeria, call NCDC free line at **6232** for immediate help.`,
      yo: `⚠️ **Ìtọ́sọ́nà Ìlera Pàjáwìrì**: Ti o ba ro pe o le ti ni ifọwọkan pẹlu ẹni ti o ni Ebola ati pe o ni iba tabi awọn aami aisan miiran, jọwọ tẹle awọn igbesẹ wọnyi lẹsẹkẹsẹ:\n\n1. **Kan si Olutọju Ilera Kíákíá**: Kan si dokita tabi alaṣẹ ilera gbogbogbo lẹsẹkẹsẹ.\n2. **Kọkọ Pe Wọn Ṣaaju Ki O To Lọ**: Ṣaaju ki o to lọ si ile-iwosan eyikeyi, **kọkọ pe wọn lori foonu**. Eyi n gba awọn oṣiṣẹ ilera laaye lati pese yara iyasọtọ ati aṣọ aabo ṣaaju ki o to de.\n3. **Ya Ara Rẹ Sọtọ**: Duro si yara ti o yatọ si awọn ẹbi rẹ, maṣe sunmọ eniyan, ki o si yago fun gbigbe ọkọ ayọkẹlẹ gbogbogbo.\n4. **Nọmba Pajawiri**: Ni Naijiria, pe nọmba pajawiri ọfẹ NCDC lori **6232**.`,
      ha: `⚠️ **Shawarar Gaggawa Kan Kiwon Lafiya**: Idan kuna zargin cewa kun yi mu'amala da mai cutar Ebola kuma yanzu kuna da zazzabi, da fatan za a bi wadannan matakan nan take:\n\n1. **Tuntubi Ma'aikatan Lafiya Cikin Gaggawa**: Tuntubi likita ko hukumar lafiya nan da nan.\n2. **Kira Kafin Ka Je Asibiti**: Kafin ka tafi kowane asibiti, **fara kiran su a waya**. Wannan zai ba ma'aikatan asibiti damar shirya dakin killace marasa lafiya da kayan kariya kafin ka isa.\n3. **Killace Kanka**: Zauna a daki daban da iyalinka, kuma ka guji hawa motar haya ko taba mutane.\n4. **Layin Gaggawa**: A Najeriya, kira layin NCDC kyauta a **6232**.`,
      ig: `⚠️ **Ndụmọdụ Ahụike Mberede**: Ọ bụrụ na ị chere na gị na onye nwere Ebola nwere ike ịmetụ aka ma nwee ahụ ọkụ ugbu a, biko mee ihe ndị a ozugbo:\n\n1. **Kpọtụrụ Ndị Ọrụ Ahụike Ozugbo**: Kpọtụrụ dọkịta ma ọ bụ ndị nlekọta ahụike ọha ngwa ngwa.\n2. **Buru Ụzọ Kpọọ Tupu Ị Gaa**: Tupu ị gaa ụlọ ọgwụ ọ bụla, **kpọọ ha na ekwentị na mbụ**. Nke a na-eme ka ndị ọrụ ahụike dozie ọnụ ụlọ iche na uwe nchebe tupu ị rute.\n3. **Nọrọ n'Ebe Dị Iche**: Nọrọ n'ọnụ ụlọ dị iche n'ebe ezinụlọ gị nọ, ma zere ịbanye ụgbọ ala ọha.\n4. **Akara Ekwentị Mberede**: Na Naịjirịa, kpọọ NCDC n'efu na **6232** maka enyemaka ozugbo.`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola'],
      disclaimer: 'This is urgent triage advice. Call ahead before arriving at any clinic or hospital.'
    };
  }

  // 5. What are the symptoms of Ebola?
  const isSymptoms = q.includes('symptom') || q.includes('signs') || q.includes('alamomi') || q.includes('aami aisan') || q.includes('ihe iriba ama');
  if (isSymptoms) {
    const answers: Record<SupportedLanguage, string> = {
      en: `The main symptoms of Ebola typically appear 2 to 21 days after exposure (most commonly within 8 to 10 days):\n\n- **Early symptoms**: Sudden high fever, severe exhaustion and fatigue, intense headache, muscle and joint aches, and sore throat.\n- **Progressing symptoms**: Persistent vomiting, severe watery diarrhoea, and sharp abdominal pain.\n- **Severe complications**: In critical cases, unexplained bruising, bleeding from the gums or in stool, and multi-organ strain.\n\nBecause early symptoms strongly resemble malaria, typhoid, and other common fevers, symptoms alone cannot confirm or rule out Ebola. If you or someone you know is unwell, please consult a qualified healthcare professional promptly.`,
      pcm: `Main symptoms of Ebola dey show between 2 to 21 days after contact (most times between 8 to 10 days):\n\n- **Early signs**: High fever wey come sudden, heavy tiredness and weakness, severe headache, body/joint pain, and sore throat.\n- **Followed by**: Continuous vomiting, heavy watery diarrhoea, and stomach pain.\n- **Severe stages**: Unexplained bleeding from mouth, nose, or stool, and organ weakness.\n\nBecause early signs resemble malaria and typhoid well-well, symptoms alone no fit confirm or rule out Ebola. If person sick, make dem see qualified health worker promptly.`,
      yo: `Àwọn àmì pàtàkì ti àrùn Ebola sábà máa ń bẹ̀rẹ̀ láàárín ọjọ́ 2 sí 21 lẹ́yìn ìfọwọ́kan (púpọ̀ jùlọ láàárín ọjọ́ 8 sí 10):\n\n- **Àwọn àmì àkọ́kọ́**: Ibà líle lójijì, àárẹ̀ ara tó pọ̀, ẹ̀fọ́rí líle, ìrora iṣan àti oríkèé, àti ọ̀fun dídùn.\n- **Lẹ́yìn náà**: Èébì títẹ̀síwájú, ìgbẹ́ gbuuru líle, àti inú rírun.\n- **Àwọn àmì líle**: Ẹ̀jẹ̀ tó ń jáde láìtọ́ láti ẹnu, imú tàbí ìgbẹ́, àti àárẹ̀ ẹ̀yà ara.\n\nNítorí pé àwọn àmì àkọ́kọ́ jọ ti ibà tàbí typhoid, àmì nìkan kò lè fìdí rẹ̀ múlẹ̀ tàbí yọ ọ́ kúrò. Bí ẹnìkan kò bá gbádùn, jọwọ kàn sí oníṣègùn tó tóótun lẹ́sẹ̀kẹsẹ̀.`,
      ha: `Babban alamomin cutar Ebola sukan bayyana tsakanin kwanaki 2 zuwa 21 bayan kamuwa (mafi yawanci kwanaki 8 zuwa 10):\n\n- **Alamomin farko**: Zazzabi mai zafi kwatsam, matsananciyar gajiya da rauni, ciwon kai mai tsanani, ciwon tsoka da gabobi, da ciwon makogwaro.\n- **Alamomi masu biyo baya**: Amai da ba ya tsayawa, zawo mai ruwa-ruwa, da ciwon ciki.\n- **Manya-manyan matsaloli**: Zubar jini daga baki, hanci ko bayan gida, da gajiyar gabobin jiki.\n\nDomin alamomin farko sun yi kama da zazzabin cizon sauro (malaria) ko typhoid, alamomi kadai ba za su iya tabbatar da Ebola ba. Idan wani ba shi da lafiya, a tuntubi kwararren likita cikin gaggawa.`,
      ig: `Isi ihe ịrịba ama nke Ebola na-apụtakarị n'etiti ụbọchị 2 ruo 21 mgbe e metụrụ ya aka (ọkachasị n'ime ụbọchị 8 ruo 10):\n\n- **Ihe ịrịba ama mbụ**: Oke ahụ ọkụ na mberede, ike ọgwụgwụ nke ukwuu, isi ọwụwa siri ike, ahụ mgbu, na akpịrị mgbu.\n- **Ihe na-esote**: Agbọ na-akwụsịghị akwụsị, afọ ọsịsa mmiri, na afọ mgbu.\n- **Ọnọdụ siri ike**: Ọbara na-agba na mberede site n'ọnụ ma ọ bụ nsị, na nsogbu akụkụ ahụ.\n\nEbe ọ bụ na ihe ịrịba ama ndị a yiri ịba (malaria) na typhoid, ihe ịrịba ama naanị apụghị ikwubi ma ọ bụ iwepụ Ebola. Ọ bụrụ na ahụ adịghị gị ma ọ bụ onye ọzọ mma, biko kpọtụrụ dọkịta nwere ikike n'oge.`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease', 'https://ncdc.gov.ng'],
      disclaimer: 'EbolaGuard NG provides verified health information. Consult a healthcare provider for medical evaluations.'
    };
  }

  // 6. How can I prevent Ebola?
  const isPrevention = q.includes('prevent') || q.includes('prevention') || q.includes('protection') || q.includes('kariya') || q.includes('idena') || q.includes('mgbochi');
  if (isPrevention) {
    const answers: Record<SupportedLanguage, string> = {
      en: `You can protect yourself and your community from Ebola by following these verified public health precautions:\n\n1. **Wash your hands regularly** with soap and clean running water, or use an alcohol-based hand rub.\n2. **Avoid direct contact** with the blood, vomit, saliva, or other bodily fluids of anyone who is ill with fever, vomiting, or diarrhoea.\n3. **Do not handle items** that may have come into contact with an infected person's fluids (clothing, bedding, needles).\n4. **Avoid handling, butchering, or eating wild animals** (bushmeat), especially bats, monkeys, or rodents found sick or dead.\n5. **Follow safe burial practices**: Avoid touching deceased persons suspected of dying from hemorrhagic fevers; alert public health authorities for safe burial management.`,
      pcm: `You fit protect yourself and your people from Ebola with these correct public health advice:\n\n1. **Dey wash your hands regular** with soap and clean running water, or use sanitiser.\n2. **No touch bodily fluids** (blood, vomit, saliva, urine) of anybody wey dey sick with fever or purging.\n3. **No touch dirty cloth or bed** wey person wey dey sick don use.\n4. **Avoid bushmeat**, especially bats, monkeys, or animals wey dem see sick or dead for bush.\n5. **Safe burials**: No touch dead body of person wey die from strange fever; call health authorities make dem handle am safely.`,
      yo: `O le dáàbò bo ara rẹ ati agbegbe rẹ kuro lọwọ Ebola nipa titẹle awọn iṣọra ilera wọnyi:\n\n1. **Fọ ọwọ rẹ nigbagbogbo** pẹlu ọṣẹ ati omi to n san, tabi lo sanitiser.\n2. **Yago fun ifọwọkan omi ara** (ẹjẹ, eebi, itọ, igbẹ) ẹnikẹni ti o ba ni iba tabi eebi.\n3. **Maṣe fọwọkan awọn ohun elo** ti o le ti kan omi ara alaisan (aṣọ, aṣọ ibusun, abẹrẹ).\n4. **Yago fun jijẹ tabi pipa ẹran igbó**, paapaa adan tabi ọbọ ti a ri ni aisan tabi oku.\n5. **Eto isinku to ni aabo**: Yago fun fífọwọ́kan oku ẹni ti a fura si pe o ku nipa iba ẹjẹ; pe awọn alaṣẹ ilera lẹsẹkẹsẹ.`,
      ha: `Kuna iya kare kanku da al'ummarku daga cutar Ebola ta hanyar bin wadannan matakan rigakafin:\n\n1. **Wanke hannu akai-akai** da sabulu da ruwa mai gudu, ko amfani da sinadarin tsaftace hannu.\n2. **Guji taba ruwan jiki** (jini, amai, miyau, fitsari) na duk wanda ke fama da zazzabi ko zawo.\n3. **Kada ku taba kayayyakin da ruwan jikin marar lafiya ya taba** (mayafai, tufafi, allurai).\n4. **Guji taba ko cin naman daji**, musamman jemage ko biri da aka samu a mace ko marar lafiya.\n5. **Tsarin binne gawa cikin aminci**: Kada a taba gawar wanda ake zargin ya rasu sakamakon zazzabin zubar jini; sanar da jami'an lafiya nan take.`,
      ig: `I nwere ike ichebe onwe gị na obodo gị pụọ na Ebola site n'ịgbaso usoro mgbochi ndị a:\n\n1. **Kwọọ aka gị mgbe niile** site na iji ncha na mmiri na-asọ asọ, ma ọ bụ jiri sanitiser.\n2. **Zere imetụ mmiri ahụ aka** (ọbara, agbọ, asọ mmiri) nke onye ọ bụla na-arịa ahụ ọkụ ma ọ bụ na-agbọ agbọ.\n3. **Emetụla ihe ndị ruru mmiri onye ọrịa aka** (uwe, akwa ndina, agịga).\n4. **Zere anụ ọhịa**, ọkachasị ụsụ ma ọ bụ enwe a hụrụ ka ha na-arịa ọrịa ma ọ bụ nwụrụ anwụ.\n5. **Usoro olili dị nchebe**: Emetụla ozu onye a na-enyo enyo na ọ nwụrụ n'ihi ọrịa a aka; kpọtụrụ ndị ọrụ ahụike ozugbo.`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://www.who.int/health-topics/ebola', 'https://ncdc.gov.ng'],
      disclaimer: 'Practical public health guidance based on WHO and NCDC protocols.'
    };
  }

  // 7. What is Ebola?
  const isWhatIs = q.includes('what is ebola') || q.includes("what's ebola") || q.includes('tell me about ebola') || q.includes('explain ebola') || q.includes('kini ebola') || q.includes('menene ebola') || q.includes('kedu ihe bu ebola');
  if (isWhatIs) {
    const answers: Record<SupportedLanguage, string> = {
      en: `Ebola virus disease (EVD) is a rare, severe illness in humans caused by an ebolavirus.\n\n- **How it spreads**: Ebola spreads through direct contact (broken skin or mucous membranes) with the blood or bodily fluids (sweat, saliva, vomit, urine, diarrhoea) of a person who is sick with or has died from Ebola, or contaminated objects (needles, bedding). It is **not** spread through the air and **not** transmitted by mosquitoes.\n- **Main symptoms**: Sudden high fever, severe fatigue, headache, muscle pain, and sore throat, followed by vomiting, diarrhoea, and in severe cases, unexplained bleeding.\n\nEarly supportive clinical care (such as intravenous fluids and electrolyte replacement) significantly improves chances of survival.`,
      pcm: `Ebola virus disease (EVD) na serious sickness wey ebolavirus dey cause for human body.\n\n- **How e dey spread**: Ebola dey spread through direct contact with blood or body fluids (sweat, saliva, vomit, urine, diarrhoea) of person wey dey sick or don die from Ebola, or dirty clothes/needles. E **NO DEY** spread through air and mosquito **NO DEY** carry am.\n- **Main symptoms**: High fever wey come sudden, heavy tiredness, severe headache, muscle pain, sore throat, vomiting, and diarrhoea.\n\nEarly medical care for hospital dey help person survive well.`,
      yo: `Àrùn Ebola (EVD) jẹ́ àìsàn líle tí kòkòrò ebolavirus ń fà nínú ènìyàn.\n\n- **Bí ó ṣe ń ràn**: Ebola máa ń ràn nípasẹ̀ fífọwọ́kan ẹ̀jẹ̀ tàbí omi ara (itọ́, èébì, ìtọ̀, ìgbẹ́) aláìsàn tí ó ní àrùn náà tàbí òkú ẹni tí ó kú nípase rẹ̀, tàbí aṣọ/abẹ́rẹ́ tí omi ara kàn. Kò **kì í ṣe** àrùn afẹ́fẹ́ bẹ́ẹ̀ ni ẹ̀fọn **kò lè** kó o ràn.\n- **Àwọn àmì kókó**: Ibà líle lójijì, àárẹ̀ ara, ẹ̀fọ́rí, ìrora iṣan, èébì, àti ìgbẹ́ gbuuru.\n\nÌtọ́jú kíákíá ní ilé-ìwòsàn ń gba ẹ̀mí là púpọ̀.`,
      ha: `Cutar Ebola (EVD) cuta ce mai tsanani da kwayar cutar ebolavirus ke haifarwa a jikin dan adam.\n\n- **Yadda take yaduwa**: Ebola tana yaduwa ne ta hanyar taba jini ko ruwan jikin (amai, miyau, fitsari, zawo) mai cutar ko gawar wanda ya rasu, ko taba allurai da tufafin da ruwan jiki ya taba. **Ba ta** yaduwa ta iska kuma sauro **ba ya** sanya ta.\n- **Babban alamomi**: Zazzabi mai zafi kwatsam, matsananciyar gajiya, ciwon kai, ciwon tsoka, amai, da zawo.\n- Samun kulawar asibiti da wuri yana taimakawa wajen samun sauki cikin sauri.`,
      ig: `Ọrịa Ebola (EVD) bụ ọrịa dị egwu nke ebolavirus na-ebute n'ahụ mmadụ.\n\n- **Otu o si agbasa**: Ebola na-agbasa site n'imetụ ọbara ma ọ bụ mmiri ahụ (asọ mmiri, agbọ, mamịrị, nsị) onye na-arịa ya ma ọ bụ ozu onye nwụrụ na ya aka, ma ọ bụ uwe na agịga ruru mmiri ahụ. Ọ **naghị** efe n'ikuku ma anwụnta **anaghị** ebunye ya.\n- **Isi ihe ịrịba ama**: Oke ahụ ọkụ na mberede, ike ọgwụgwụ, isi ọwụwa, ahụ mgbu, agbọ, na afọ ọsịsa.\n\nInweta nlekọta ahụike n'oge n'ụlọ ọgwụ na-azọpụta ndụ nke ukwuu.`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://www.who.int/health-topics/ebola', 'https://ncdc.gov.ng'],
      disclaimer: 'Verified public health information based on WHO guidelines.'
    };
  }

  // 8. Vaccines and Treatments
  const isVaccine = q.includes('vaccine') || q.includes('cure') || q.includes('treatment') || q.includes('ogwu') || q.includes('magani') || q.includes('abere');
  if (isVaccine) {
    const answers: Record<SupportedLanguage, string> = {
      en: `Yes, approved vaccines and therapeutics exist for specific species of Ebola:\n\n1. **Vaccines**: The **Ervebo (rVSV-ZEBOV)** vaccine is WHO-recommended and licensed specifically for the *Zaire ebolavirus* species. It is used primarily for ring vaccination of contacts during outbreaks.\n2. **Therapies**: Monoclonal antibodies (Inmazeb and Ebanga) have been approved for *Zaire ebolavirus* and substantially reduce mortality when administered early.\n\n*Note*: Current licensed vaccines do not provide proven protection against the *Sudan ebolavirus* or *Bundibugyo* species, though candidate vaccines are under clinical evaluation. Prompt supportive hospital care remains essential.`,
      pcm: `Ehen, vaccine and correct medicine dey for specific type of Ebola:\n\n1. **Ervebo Vaccine**: Na approved vaccine wey dey protect person against *Zaire ebolavirus*.\n2. **Monoclonal Antibodies**: Inmazeb and Ebanga na approved medicine wey dey help patient survive.\n\n*Note*: Di current vaccine no dey work for *Sudan ebolavirus*, but clinical trial dey go on. Early hospital care na wetin dey save life.`,
      yo: `Bẹ́ẹ̀ni, àwọn àbẹ́rẹ́ àjẹsára àti oògùn tó dájú wà fún oríṣi Zaire ebolavirus:\n\n1. **Àbẹ́rẹ́ Ervebo**: Àbẹ́rẹ́ àjẹsára tí àjọ WHO fọwọ́ sí fún Zaire ebolavirus.\n2. **Àwọn Oògùn Àkànṣe**: Inmazeb àti Ebanga jẹ́ oògùn tó ń gba ẹ̀mí là bí a bá tètè fún aláìsàn ní ilé-ìwòsàn.\n\n*Àkíyèsí*: Àbẹ́rẹ́ yìí kò gbó fún oríṣi Sudan, ṣùgbọ́n ìwádìí ń lọ lọ́wọ́. Ìtọ́jú ní ilé-ìwòsàn ṣe pàtàkì púpọ̀.`,
      ha: `Kwarai kuwa, akwai alluran rigakafi da ingantattun magunguna na musamman don nau'in Zaire ebolavirus:\n\n1. **Allurar Ervebo**: Allurar rigakafi ce da WHO ta amince da ita don kare kamuwa da Zaire ebolavirus.\n2. **Magungunan Inmazeb da Ebanga**: Magunguna ne na musamman da ke taimakawa marar lafiya ya warke da wuri.\n\n*Lura*: Alluran ba sa aiki a kan nau'in Sudan a yanzu, amma ana ci gaba da gwaje-gwaje. Kulawar asibiti na da matukar muhimmanci.`,
      ig: `Ee, enwere ezigbo ọgwụ mgbochi na ọgwụgwọ maka ụdị Zaire ebolavirus:\n\n1. **Ọgwụ Mgbochi Ervebo**: Ọ bụ ọgwụ mgbochi nke WHO kwadoro maka Zaire ebolavirus.\n2. **Ọgwụ Ndị Pụrụ Iche**: Inmazeb na Ebanga bụ ọgwụ na-azọpụta ndụ ma ọ bụrụ na e nye ya n'oge.\n\n*Rịba ama*: Ọgwụ mgbochi a anaghị arụ ọrụ maka ụdị Sudan ugbu a. Ịga ụlọ ọgwụ n'oge dị oke mkpa.`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease', 'https://ncdc.gov.ng'],
      disclaimer: 'This information is for health education only. Only certified healthcare authorities administer Ebola vaccines.'
    };
  }

  // 9. Airborne / Mosquito Myths
  const isAirborne = q.includes('airborne') || q.includes('air') || q.includes('breathe') || q.includes('mosquito') || q.includes('afefe') || q.includes('iska') || q.includes('ikuku');
  if (isAirborne) {
    const answers: Record<SupportedLanguage, string> = {
      en: `No. Ebola is **NOT airborne** and is **NOT transmitted by mosquitoes**.\n\nEbola is spread strictly through direct contact with:\n- The blood or bodily fluids (sweat, saliva, vomit, urine, diarrhoea, semen) of a person who is sick with or has died from Ebola.\n- Contaminated needles, medical instruments, bedding, or clothing soiled with these fluids.\n\nA person cannot catch Ebola from someone breathing near them or casual walking on the street. Individuals only become contagious once they develop active symptoms.`,
      pcm: `Rara o! Ebola **NO DEY FLY FOR AIR** and **yanyanya (mosquito) NO DEY TRANSMIT AM**.\n\nEbola dey spread only through direct contact with:\n- Blood, vomit, saliva, or body fluids of person wey get active sickness or wey don die.\n- Contaminated cloth or needles soiled with these fluids.\n\nPerson no fit catch Ebola through ordinary air or passing someone on the road.`,
      yo: `Rárá o! Àrùn Ebola **KÌ Í ṢE ÀRÙN AFẸ́FẸ́** bẹ́ẹ̀ ni **ẸFỌN KÒ LÈ KÒ Ó RÀN**.\n\nEbola máa ń ràn kìkì nípasẹ̀ fífọwọ́kan omi ara ní tààràtà:\n- Ẹ̀jẹ̀, èébì, itọ́, ìtọ̀, tàbí ìgbẹ́ aláìsàn tí ó ní àrùn náà tàbí òkú ẹni tí ó kú nípase rẹ̀.\n- Aṣọ ìtẹ́lẹ̀ tàbí abẹ́rẹ́ tí omi ara aláìsàn ti tà sí.\n\nÈnìyàn kò lè kó Ebola nípa mímí afẹ́fẹ́ tàbí rírìn kọjá lẹ́bàá aláìsàn.`,
      ha: `A'a sam! Cutar Ebola **BA TA YADUWA TA ISKA** kuma **SAURO BA YA SANYA TA**.\n\nEbola tana yaduwa ne kawai ta hanyar taba ruwan jiki kai tsaye:\n- Jini, amai, miyau, fitsari, ko kashin mai cutar ko gawar wanda ya rasu sakamakon cutar.\n- Taba mayafai ko alluran da ruwan jikin marar lafiya ya taba.\n\nBa za a iya kamuwa da Ebola ta hanyar shakar iska ba.`,
      ig: `Mba! Ebola **ANAGHỊ EFE N'IKUKU** ma **ANWỤNTA ANAGHỊ EBUSA YA**.\n\nEbola na-agbasa naanị site na imetụ mmiri ahụ aka kpọmkwem:\n- Ọbara, agbọ, asọ mmiri, mamịrị, ma ọ bụ nsị onye na-arịa ọrịa ahụ ma ọ bụ ozu onye nwụrụ na ya.\n- Ihe ndina ma ọ bụ uwe mmiri ahụ ruru aka.\n\nMmadụ apụghị ibute Ebola site n'ikuku nkịtị.`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola'],
      disclaimer: 'Verified epidemiological facts from WHO and NCDC consensus.'
    };
  }

  // 10. Saltwater Myth
  const isSalt = q.includes('salt') || q.includes('saltwater') || q.includes('bath') || q.includes('rumour') || q.includes('rumor') || q.includes('iyo') || q.includes('gishiri') || q.includes('nnu');
  if (isSalt) {
    const answers: Record<SupportedLanguage, string> = {
      en: `**DANGER**: Saltwater baths or drinking concentrated saltwater do NOT prevent or cure Ebola. In fact, this dangerous rumour caused multiple fatalities and hospitalizations in Nigeria during 2014 from severe salt poisoning (hypernatraemia).\n\nExcessive salt intake can cause kidney failure, dehydration, seizures, and death. Rely only on proven hygiene: wash hands with soap and running water, or use an alcohol-based hand sanitiser.`,
      pcm: `**WABALA**: Wíwẹ̀ omi iyọ̀ tàbí mímu omi iyọ̀ **NO DEY PREVENT OR CURE EBOLA** at all!\n\nFor 2014, dis fake rumour cause people make dem die and enter emergency hospital for Naija because of salt poisoning. Make you use ordinary soap and clean water wash your hands well, or sanitiser. No drink saltwater!`,
      yo: `**EWU NLA**: Mímu tàbí wíwẹ̀ omi iyọ̀ **KÒ LÈ DÈNÀ TÀBÍ WO EBOLA** láé!\n\nNí ọdún 2014, irọ́ eléwu yìí pa ọ̀pọ̀ ènìyàn ní Nàìjíríà tí wọ́n sì kún inú ilé-ìwòsàn nítorí oró iyọ̀ líle nínú ẹ̀jẹ̀. Fífọ ọwọ́ pẹ̀lú ọṣẹ àti omi tó ń ṣàn nìkan ni ọ̀nà àbáyọ tó dájú. MÁ ṢE mu omi iyọ̀!`,
      ha: `**HADARI BABBA**: Shan ruwan gishiri ko wanka da shi **BA YA MAGANIN EBOLA KO KARE MUTUM** sam!\n\nA shekarar 2014, wannan karyar ta kashe mutane da yawa a Najeriya sakamakon gubar gishiri a jiki. Ka dogara kawai kan wanke hannu da sabulu da ruwa mai gudu. Kada ka sha ruwan gishiri!`,
      ig: `**OKE IHE EGWU**: Ịṅụ ma ọ bụ ịsa mmiri nnu **ANAGHỊ AGWỌ MA Ọ BỤ GBOCHIE EBOLA** ma ọlị!\n\nN'afọ 2014, akụkọ ụgha a gburu ọtụtụ ndị mmadụ na Naịjirịa ma mee ka ọtụtụ ndị nọrọ n'ụlọ ọgwụ n'ihi nsị nnu. Jiri ncha na mmiri na-asọ asọ kwọọ aka gị nke ọma mgbe niile. Aṅụla mmiri nnu!`
    };
    return {
      answer: answers[language] || answers.en,
      sources: ['https://ncdc.gov.ng', 'https://health.gov.ng'],
      disclaimer: 'Always verify health rumours with official NCDC bulletins before acting on them.'
    };
  }

  // 11. General Informational Fallback (Concise, without unsolicited claims or case numbers)
  const defaultAnswers: Record<SupportedLanguage, string> = {
    en: `Ebola virus disease (EVD) is a serious viral infection. Key information:\n\n- **Transmission**: Direct contact with blood or body fluids of an infected person who has symptoms, or infected wild animals.\n- **Prevention**: Regular handwashing with soap and running water, avoiding contact with body fluids of sick individuals, and avoiding bushmeat.\n- **Symptoms**: Sudden high fever, severe fatigue, headache, muscle pain, vomiting, and diarrhoea.\n\nEarly medical care substantially improves recovery chances. What specific question about Ebola or prevention would you like to know more about?`,
    pcm: `Ebola virus disease (EVD) na serious sickness. Key tori:\n\n- **Transmission**: Direct contact with blood or body fluids of person wey get symptoms, or infected wild animals.\n- **Prevention**: Regular handwashing with soap and clean water, avoiding fluids of sick persons, and avoiding bushmeat.\n- **Symptoms**: Sudden high fever, heavy weakness, headache, muscle pain, vomiting, and purging.\n\nWhich specific question about Ebola or prevention you go like ask?`,
    yo: `Àrùn Ebola (EVD) jẹ́ àìsàn líle. Àwọn kókó pàtàkì:\n\n- **Ìrànkálẹ̀**: Fífọwọ́kan ẹ̀jẹ̀ tàbí omi ara aláìsàn tí ó ní àmì àrùn, tàbí ẹran igbó.\n- **Ìdènà**: Fífo ọwọ́ nígbà gbogbo pẹ̀lú ọṣẹ àti omi, yíyẹra fún omi ara aláìsàn, àti yíyẹra fún ẹran igbó.\n- **Àmì**: Ibà líle lójijì, àárẹ̀ ara, ẹ̀fọ́rí, èébì, àti ìgbẹ́ gbuuru.\n\nIbeere pàtó wo ni o fẹ́ mọ̀ nípa Ebola tàbí ìdènà rẹ̀?`,
    ha: `Cutar Ebola (EVD) cuta ce mai tsanani. Muhimman bayanai:\n\n- **Yaduwa**: Taba jini ko ruwan jikin mai cutar, ko dabbobin daji.\n- **Rigakafi**: Wanke hannu da sabulu da ruwa, guje wa ruwan jikin marar lafiya, da guje wa naman daji.\n- **Alamomi**: Zazzabi mai zafi kwatsam, matsananciyar gajiya, ciwon kai, amai, da zawo.\n\nWace tambaya ta musamman kuke son sani game da Ebola ko rigakafinta?`,
    ig: `Ọrịa Ebola (EVD) bụ ọrịa dị egwu. Isi ihe ndị dị mkpa:\n\n- **Mgbasa**: Imetụ ọbara ma ọ bụ mmiri ahụ onye nwere ihe ịrịba ama aka, ma ọ bụ anụ ọhịa.\n- **Mgbochi**: Ịkwọ aka mgbe niile na ncha na mmiri, izere mmiri ahụ onye na-arịa ọrịa, na izere anụ ọhịa.\n- **Ihe ịrịba ama**: Oke ahụ ọkụ na mberede, ike ọgwụgwụ, isi ọwụwa, agbọ, na afọ ọsịsa.\n\nKedu ajụjụ pụrụ iche ị ga-achọ ịjụ maka Ebola ma ọ bụ mgbochi ya?`
  };

  return {
    answer: defaultAnswers[language] || defaultAnswers.en,
    sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola'],
    disclaimer: 'EbolaGuard NG is an educational resource. Consult a healthcare provider for any personal medical evaluation.'
  };
}
