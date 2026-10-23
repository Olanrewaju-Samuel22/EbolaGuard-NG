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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _language: SupportedLanguage
): HealthAssistantResponse {
  const q = question.toLowerCase();

  if (q.includes('vaccine') || q.includes('cure') || q.includes('treatment')) {
    return {
      answer: `Yes, there are proven vaccines and medical therapies for Ebola, specifically for the Zaire ebolavirus species:\n\n1. **Ervebo (rVSV-ZEBOV)** is an FDA- and WHO-approved vaccine shown to be highly protective against Zaire ebolavirus.\n2. **Monoclonal Antibodies**: Inmazeb and Ebanga have been approved by regulatory agencies and dramatically improve survival when administered early in clinical infection.\n\n*Important note*: Currently available vaccines do NOT offer proven protection against the Sudan or Bundibugyo species, though candidate vaccines are under clinical evaluation. Supportive clinical care (intravenous hydration and electrolyte replenishment) remains vital for all species.`,
      sources: [
        'https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease',
        'https://ncdc.gov.ng'
      ],
      disclaimer: 'This information is for health education only. Only certified healthcare authorities administer Ebola vaccines through ring vaccination protocols.',
      recommendedPages: ['About Ebola', 'Prevention', 'Statistics']
    };
  }

  if (q.includes('airborne') || q.includes('air') || q.includes('breathe') || q.includes('mosquito')) {
    return {
      answer: `No. Ebola is **NOT airborne** and is **NOT transmitted by mosquitoes**.\n\nEbola is spread strictly through direct contact with:\n- The blood or bodily fluids (sweat, saliva, vomit, urine, diarrhoea, semen) of a person who is sick with or has died from Ebola.\n- Contaminated needles, medical instruments, bedding, or clothing soiled with these fluids.\n\nA person cannot catch Ebola from someone breathing near them or casual walking on the street. Individuals only become contagious once they develop active symptoms.`,
      sources: [
        'https://ncdc.gov.ng/diseases/factsheet/54',
        'https://www.who.int/health-topics/ebola'
      ],
      disclaimer: 'Public health advice based on verified epidemiological consensus.',
      recommendedPages: ['Symptoms and Exposure', 'Prevention']
    };
  }

  if (q.includes('salt') || q.includes('saltwater') || q.includes('bath') || q.includes('rumour') || q.includes('rumor')) {
    return {
      answer: `**DANGER**: Saltwater baths or drinking saltwater do NOT cure or prevent Ebola. In fact, this dangerous myth caused multiple deaths and emergency hospital admissions in Nigeria during 2014.\n\nIngesting excessive salt causes dangerous hypernatraemia (salt toxicity), dehydration, kidney failure, and seizures. Rely only on genuine hygiene: wash hands with soap and running water, or use an alcohol-based sanitiser.`,
      sources: [
        'https://ncdc.gov.ng',
        'https://health.gov.ng'
      ],
      disclaimer: 'Always verify health rumours with official NCDC bulletins before acting on them.',
      recommendedPages: ['About Ebola', 'Prevention', 'Awareness Resources']
    };
  }

  return {
    answer: `Ebola virus disease (EVD) is a rare but severe illness caused by the Ebola virus. Key facts:\n\n- **Transmission**: Direct contact with body fluids of an infected person who has symptoms, or infected animals.\n- **Incubation**: 2 to 21 days (most commonly 8–10 days).\n- **Early symptoms**: Sudden high fever, fatigue, muscle pain, headache, and sore throat, followed by vomiting, diarrhoea, and in severe cases, unexplained bleeding.\n- **Current Nigerian Status**: Nigeria has ZERO active cases. Surveillance at airports and borders is strictly proactive.\n- **Emergency Hotline**: NCDC Toll-Free 6232.`,
    sources: [
      'https://ncdc.gov.ng',
      'https://www.who.int/health-topics/ebola',
      'https://africacdc.org'
    ],
    disclaimer: 'EbolaGuard NG is an educational resource. Consult a healthcare provider for any personal medical evaluation.',
    recommendedPages: ['About Ebola', 'Symptoms and Exposure', 'Virtual Doctor', 'Emergency Help']
  };
}
