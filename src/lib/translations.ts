import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  developerCredit: string;
  nav: {
    home: string;
    aboutEbola: string;
    symptoms: string;
    prevention: string;
    updates: string;
    statistics: string;
    assistant: string;
    virtualDoctor: string;
    emergency: string;
    resources: string;
    faq: string;
    aboutUs: string;
    contact: string;
    admin: string;
    getGuidance: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    learnBtn: string;
    updatesBtn: string;
    doctorBtn: string;
  };
  alert: {
    officialBadge: string;
    source: string;
    verifiedOn: string;
    readMore: string;
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
  disclaimer: {
    short: string;
    emergencyCall: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: 'EbolaGuard NG',
    tagline: 'Verified Information. Early Awareness. Safer Communities.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    nav: {
      home: 'Home',
      aboutEbola: 'About Ebola',
      symptoms: 'Symptoms & Exposure',
      prevention: 'Prevention',
      updates: 'Outbreak Updates',
      statistics: 'Statistics',
      assistant: 'AI Assistant',
      virtualDoctor: 'Virtual Doctor',
      emergency: 'Emergency Help',
      resources: 'Awareness Resources',
      faq: 'FAQ',
      aboutUs: 'About Us',
      contact: 'Report / Contact',
      admin: 'Admin Portal',
      getGuidance: 'Get Health Guidance'
    },
    hero: {
      headline: 'Know the Facts. Recognise the Signs. Protect Your Community.',
      subheadline: 'Access verified Nigerian public health information on Ebola virus disease, monitor official updates, understand early signs, and receive clinical-grade AI health guidance.',
      learnBtn: 'Learn About Ebola',
      updatesBtn: 'View Official Updates',
      doctorBtn: 'Talk to Virtual Doctor'
    },
    alert: {
      officialBadge: 'Official NCDC Alert',
      source: 'Source: Nigeria Centre for Disease Control (NCDC)',
      verifiedOn: 'Verified: October 2026',
      readMore: 'Read Full Brief'
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
    disclaimer: {
      short: 'EbolaGuard NG provides verified public health education and AI triage guidance. It is NOT a substitute for licensed clinical diagnosis or emergency hospital care.',
      emergencyCall: 'For immediate medical emergencies or suspected exposure, dial NCDC Toll-Free 6232 or your state emergency response number immediately.'
    }
  },
  pcm: {
    brandName: 'EbolaGuard NG',
    tagline: 'Correct Information. Quick Awareness. Better Community.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    nav: {
      home: 'Domot (Home)',
      aboutEbola: 'Tori About Ebola',
      symptoms: 'Signs & Body Feel',
      prevention: 'How to Prevent Am',
      updates: 'Official Gist & News',
      statistics: 'Numbers & Dashboard',
      assistant: 'AI Health Helper',
      virtualDoctor: 'Virtual Doctor',
      emergency: 'Emergency Help',
      resources: 'Pamphlet & Guides',
      faq: 'Questions & Answers',
      aboutUs: 'Who We Be',
      contact: 'Report Rumour / Contact',
      admin: 'Admin Area',
      getGuidance: 'Get Health Advice'
    },
    hero: {
      headline: 'Know Di Real Facts. Spot Di Signs. Protect Your People.',
      subheadline: 'Get genuine health news about Ebola from government experts (NCDC & WHO). Check your body condition with our AI Virtual Doctor.',
      learnBtn: 'Read About Ebola',
      updatesBtn: 'Check Latest Gist',
      doctorBtn: 'Tok With Virtual Doctor'
    },
    alert: {
      officialBadge: 'NCDC Official Message',
      source: 'From: Nigeria Centre for Disease Control (NCDC)',
      verifiedOn: 'Verified: October 2026',
      readMore: 'Read Full Story'
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
    disclaimer: {
      short: 'EbolaGuard NG na public health education tool. E no replace real hospital doctor or blood test.',
      emergencyCall: 'If person seriously sick or bleed, call NCDC free line 6232 right away make hospital prepare before you enter.'
    }
  },
  yo: {
    brandName: 'EbolaGuard NG',
    tagline: 'Ìròyìn Tòótọ́. Ìmọ̀ Tètè. Àwùjọ Tí Ó Dára Jùlọ.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    nav: {
      home: 'Ilé (Home)',
      aboutEbola: 'Nípa Àrùn Ebola',
      symptoms: 'Àwọn Àmì Àrùn',
      prevention: 'Bí A Ṣe Lè Dáàbò Bo Ara',
      updates: 'Ìròyìn Titun',
      statistics: 'Àkọsílẹ̀ Nọ́mbà',
      assistant: 'Olùrànlọ́wọ́ AI',
      virtualDoctor: 'Dókítà Virtual',
      emergency: 'Ìrànwọ́ Pàjáwìrì',
      resources: 'Àwọn Ìwé Ìkìlọ̀',
      faq: 'Àwọn Ìbéèrè',
      aboutUs: 'Nípa Wa',
      contact: 'Ìjábọ̀ / Ìbánisọ̀rọ̀',
      admin: 'Ojúewé Alákòóso',
      getGuidance: 'Gba Ìtọ́sọ́nà Ìlera'
    },
    hero: {
      headline: 'Mọ Òtítọ́. Mọ Àwọn Àmì. Dáàbò Bo Àwùjọ Rẹ.',
      subheadline: 'Gba ìròyìn tó dájú nípa àrùn Ebola láti ọwọ́ NCDC àti WHO. Lo Dókítà Virtual láti mọ ipò ìlera rẹ.',
      learnBtn: 'Kẹ́kọ̀ọ́ Nípa Ebola',
      updatesBtn: 'Wo Ìròyìn Titun',
      doctorBtn: 'Bá Dókítà Virtual Sọ̀rọ̀'
    },
    alert: {
      officialBadge: 'Ìkìlọ̀ Láti NCDC',
      source: 'Orísun: NCDC Nigeria',
      verifiedOn: 'Ìfidájú: Oṣù Kẹwàá 2026',
      readMore: 'Ka Ìkìlọ̀ Lẹ́kùnrẹ́rẹ́'
    },
    cards: {
      understand: 'Òye Nípa Ebola',
      understandDesc: 'Bí àrùn ṣe ń ràn àti àkókò tí àmì fi ń yọ síta.',
      symptoms: 'Àwọn Àmì Pàjáwìrì',
      symptomsDesc: 'Ibà gíga, èébì, ìgbẹ́ gbuuru àti àárẹ̀ ara.',
      prevention: 'Ìmọ́tótó Ara',
      preventionDesc: 'Fífọ ọwọ́ pẹ̀lú ọṣẹ àti omi tó ń ṣàn, yẹra fún fífọwọ́kan omi ara aláìsàn.',
      guidance: 'Wá Ìrànwọ́ Ìlera',
      guidanceDesc: 'Pe nọ́mbà ọ̀fẹ́ NCDC 6232 fún ìrànwọ́ kíákíá.'
    },
    disclaimer: {
      short: 'EbolaGuard NG wà fún ìmọ̀ ìlera gbogbogbò. Kì í ṣe dípò dókítà ilé-ìwòsàn.',
      emergencyCall: 'Fún pàjáwìrì, pe nọ́mbà NCDC 6232 kíákíá.'
    }
  },
  ha: {
    brandName: 'EbolaGuard NG',
    tagline: 'Ingantaccen Bayani. Fadakarwa Da Wuri. Al\'umma Mai Aminci.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    nav: {
      home: 'Gida (Home)',
      aboutEbola: 'Game da Ebola',
      symptoms: 'Alamomin Cutar',
      prevention: 'Rigakafi',
      updates: 'Labaran Yanzu',
      statistics: 'Kididdiga',
      assistant: 'Mataimakin Lafiya AI',
      virtualDoctor: 'Likitan Virtual',
      emergency: 'Taimakon Gaggawa',
      resources: 'Kayan Fadakarwa',
      faq: 'Tambayoyi',
      aboutUs: 'Game da Mu',
      contact: 'Rahoto / Tuntuba',
      admin: 'Shugabanci',
      getGuidance: 'Nemi Shawarar Lafiya'
    },
    hero: {
      headline: 'San Gaskiya. Gane Alamomi. Kare Al\'ummarka.',
      subheadline: 'Samu ingantaccen bayani kan cutar Ebola daga NCDC da WHO. Yi amfani da Likitan Virtual don binciken lafiyarka.',
      learnBtn: 'Koyi Game da Ebola',
      updatesBtn: 'Duba Sabbin Labarai',
      doctorBtn: 'Yi Magana da Likita'
    },
    alert: {
      officialBadge: 'Sanarwar NCDC',
      source: 'Tushe: NCDC Nigeria',
      verifiedOn: 'Tabbatarwa: Oktoba 2026',
      readMore: 'Karanta Cikakken Bayani'
    },
    cards: {
      understand: 'Fahimtar Ebola',
      understandDesc: 'Yadda take yaduwa da lokacin da take bayyana a jiki.',
      symptoms: 'Gane Alamomi',
      symptomsDesc: 'Zazzabi mai zafi, amai, zawo, da matsananciyar gajiya.',
      prevention: 'Matakan Rigakafi',
      preventionDesc: 'Wanke hannu da sabulu da ruwa, guje wa taba ruwan jikin marar lafiya.',
      guidance: 'Neman Taimako',
      guidanceDesc: 'Kira layin NCDC kyauta a 6232 don samun agaji cikin gaggawa.'
    },
    disclaimer: {
      short: 'EbolaGuard NG na bayar da fadakarwa ne kawai. Ba ta maye gurbin ainihin likita ba.',
      emergencyCall: 'A lokacin gaggawa, kira NCDC 6232 nan take.'
    }
  },
  ig: {
    brandName: 'EbolaGuard NG',
    tagline: 'Ozi Eziokwu. Mmata n\'Oge. Obodo Dị Nchebe.',
    developerCredit: 'Developed by OLANREWAJU SAMUEL',
    nav: {
      home: 'Ụlọ (Home)',
      aboutEbola: 'Maka Ebola',
      symptoms: 'Ihe Ịrịba Ama',
      prevention: 'Mgbochi',
      updates: 'Ozi Ọhụrụ',
      statistics: 'Ọnụ Ọgụgụ',
      assistant: 'Onye Enyemaka AI',
      virtualDoctor: 'Dọkịta Virtual',
      emergency: 'Enyemaka Mberede',
      resources: 'Akwụkwọ Mmata',
      faq: 'Ajụjụ na Azịza',
      aboutUs: 'Gbasara Anyị',
      contact: 'Kpesa / Kpọtụrụ',
      admin: 'Nchịkwa',
      getGuidance: 'Nweta Ndụmọdụ Ahụike'
    },
    hero: {
      headline: 'Mata Eziokwu. Mara Ihe Ịrịba Ama. Chebe Obodo Gị.',
      subheadline: 'Nweta ezigbo ozi banyere ọrịa Ebola site n\'aka NCDC na WHO. Gwa Dọkịta Virtual okwu maka nlekọta ahụike gị.',
      learnBtn: 'Mụta Maka Ebola',
      updatesBtn: 'Lee Ozi Ọhụrụ',
      doctorBtn: 'Gwa Dọkịta Okwu'
    },
    alert: {
      officialBadge: 'Ozi Si NCDC',
      source: 'Ebe O Si: NCDC Nigeria',
      verifiedOn: 'Enyochara: Ọktoba 2026',
      readMore: 'Gụọ Nchịkọta Niile'
    },
    cards: {
      understand: 'Ịghọta Ebola',
      understandDesc: 'Otu o si agbasa na oge ole ọ na-ewe iji pụta ìhè.',
      symptoms: 'Ịmata Ihe Ịrịba Ama',
      symptomsDesc: 'Oke ahụ ọkụ, agbọ, afọ ọsịsa na ike ọgwụgwụ.',
      prevention: 'Ụzọ Mgbochi',
      preventionDesc: 'Ịsa aka mgbe niile na ncha na mmiri, zere imetụ mmiri ahụ onye na-arịa ọrịa aka.',
      guidance: 'Chọta Enyemaka',
      guidanceDesc: 'Kpọọ akara ekwentị NCDC n\'efu na 6232 maka enyemaka ngwa ngwa.'
    },
    disclaimer: {
      short: 'EbolaGuard NG bụ maka nkuzi ahụike. Ọ bụghị dọkịta nwere ikike n\'ụlọ ọgwụ.',
      emergencyCall: 'Maka ọnọdụ mberede, kpọọ NCDC 6232 ozugbo.'
    }
  }
};
