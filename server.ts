import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// 1. Sanitize environment: Ensure NO secret keys leak into client-facing VITE_ environment variables
if (process.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_secret_') || process.env.VITE_SUPABASE_ANON_KEY?.includes('service_role')) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    process.env.SUPABASE_SECRET_KEY = process.env.VITE_SUPABASE_ANON_KEY;
  }
  delete process.env.VITE_SUPABASE_ANON_KEY;
}

// 2. Load .env with override so client-facing VITE_SUPABASE_ANON_KEY receives the publishable key
dotenv.config({ override: true });

// 3. Normalize Supabase URL: Strip /rest/v1 and trailing slash if present
if (!process.env.VITE_SUPABASE_URL && process.env.SUPABASE_URL) {
  process.env.VITE_SUPABASE_URL = process.env.SUPABASE_URL;
}
if (process.env.VITE_SUPABASE_URL) {
  process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

// 4. Fallback for publishable key if not explicitly set with VITE_
if (!process.env.VITE_SUPABASE_ANON_KEY) {
  const candidate = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (candidate && !candidate.startsWith('sb_secret_') && !candidate.includes('service_role')) {
    process.env.VITE_SUPABASE_ANON_KEY = candidate;
  }
}

// 5. Final verification: If VITE_SUPABASE_ANON_KEY still has a secret key, delete it
if (process.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_secret_') || process.env.VITE_SUPABASE_ANON_KEY?.includes('service_role')) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    process.env.SUPABASE_SECRET_KEY = process.env.VITE_SUPABASE_ANON_KEY;
  }
  delete process.env.VITE_SUPABASE_ANON_KEY;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '500kb' }));

// Initialize GoogleGenAI SDK safely
const apiKey = process.env.GEMINI_API_KEY || '';
let genAI: GoogleGenAI | null = null;
if (apiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
  }
}

// System instructions for Health Assistant
const HEALTH_ASSISTANT_SYSTEM_PROMPT = `You are the EbolaGuard NG Virtual Health Assistant. You provide clear, friendly, responsible public health information, especially about Ebola prevention, symptoms, transmission, and when to seek medical care.

Understand the user's actual message before responding.

For greetings such as hey, hi, hello, or good morning, respond with a short, friendly greeting and ask how you can help. Do not immediately provide an Ebola information report.

For simple questions, answer directly and concisely. Provide more detail when the user requests it.

Use simple language and explain medical terms when necessary.

Respond in the language selected in the EbolaGuard NG interface. Support English, Nigerian Pidgin, Yoruba, Hausa, and Igbo.

Never claim to diagnose or rule out Ebola. Do not replace a licensed healthcare professional.

Never invent current outbreak statistics, confirmed case counts, emergency numbers, official announcements, or medical sources. For current information, use verified official sources and clearly state when information cannot be verified.

If a user reports possible Ebola exposure and compatible symptoms, advise prompt contact with a healthcare provider or public health authority. Tell them to call ahead before visiting a healthcare facility.

Do not frighten users unnecessarily. Be calm, respectful, accurate, and helpful.

Keep greetings and simple conversational replies short. Give detailed medical explanations only when the user's question calls for them.`;

// System instructions for Virtual Doctor
const VIRTUAL_DOCTOR_SYSTEM_PROMPT = `You are the EbolaGuard Virtual Doctor, an AI health triage assistant designed for people who have difficulty accessing healthcare facilities in Nigeria.
Tagline: "Health Guidance When Reaching a Hospital Is Difficult."

MANDATORY MEDICAL CONSTRAINTS:
1. You are an AI triage tool, NOT a licensed human physician. You do NOT replace clinical examination, blood tests, or in-person emergency care.
2. Categorize the user's situation into one of 3 TRIAGE LEVELS:
   - Level 1 (General Guidance): Mild symptoms without warning signs; advise oral hydration, rest, temperature monitoring, and when to see a local doctor.
   - Level 2 (Prompt Professional Assessment): Persistent fever >2-3 days, unexplained gastrointestinal distress, or reported potential contact history. Urge visiting a local primary healthcare centre or hospital within 24 hours.
   - Level 3 (Immediate Emergency Guidance): Life-threatening warning signs (unexplained bleeding from gums/stool/vomit, difficulty breathing, altered consciousness/seizures) OR active febrile symptoms following direct contact with a known or suspected Ebola case.
3. IN LEVEL 3 CASES: Immediately advise dialing NCDC Toll-Free 6232. Emphasize the CALL-AHEAD protocol: call the facility before arriving so healthcare workers can prepare safe isolation and protective gear.
4. Never prescribe drugs or dosages. Never recommend saltwater baths. Do not request identifiable personal records. Respond calmly, clearly, and concisely.`;

// API Routes
app.post('/api/health-assistant', async (req: Request, res: Response) => {
  const { question, language = 'en' } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Valid question string is required.' });
  }

  const sanitized = question.slice(0, 1000);

  if (!genAI) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server. Falling back to local verified knowledge engine.'
    });
  }

  try {
    const languageNames: Record<string, string> = {
      en: 'English',
      pcm: 'Nigerian Pidgin English (fluent, respectful Nigerian Pidgin)',
      yo: 'Yoruba (Yorùbá)',
      ha: 'Hausa',
      ig: 'Igbo'
    };
    const targetLangName = languageNames[language] || 'English';

    const isGreetingOrCasual = /^(hey|hi|hello|good\s*(morning|afternoon|evening)|howdy|what'?s\s*up|yo|how\s*are\s*you|how\s*far|sannu|ina\s*kwana|bawo|e\s*nle|kedu|ndewo|thanks|thank\s*you)[\s!?.👋]*$/i.test(sanitized.trim());

    const prompt = `Requested Output Language: ${targetLangName} (Language code: "${language}").
Respond in ${targetLangName}.

User Message: "${sanitized}"`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: HEALTH_ASSISTANT_SYSTEM_PROMPT,
        temperature: 0.3
      }
    });

    const text = response.text || 'Unable to generate response.';

    // Attach official public health sources only if medical/epidemiological advice is given, not for simple greetings
    const isMedicalQuery = !isGreetingOrCasual && (
      sanitized.toLowerCase().includes('ebola') ||
      sanitized.toLowerCase().includes('symptom') ||
      sanitized.toLowerCase().includes('prevent') ||
      sanitized.toLowerCase().includes('cure') ||
      sanitized.toLowerCase().includes('treatment') ||
      sanitized.toLowerCase().includes('vaccine') ||
      sanitized.toLowerCase().includes('outbreak') ||
      sanitized.toLowerCase().includes('fever') ||
      sanitized.toLowerCase().includes('expose') ||
      sanitized.toLowerCase().includes('contact')
    );

    return res.json({
      answer: text,
      sources: isMedicalQuery
        ? [
            'https://ncdc.gov.ng',
            'https://www.who.int/health-topics/ebola',
            'https://africacdc.org'
          ]
        : [],
      disclaimer: isMedicalQuery
        ? 'EbolaGuard NG provides verified public health education. It does not replace a licensed clinical medical doctor.'
        : undefined
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown AI error';
    console.error('Gemini health assistant error:', message);
    return res.status(500).json({ error: 'Failed to generate AI guidance.' });
  }
});

app.post('/api/virtual-doctor', async (req: Request, res: Response) => {
  const { concernDescription, answers, language = 'en' } = req.body;
  const sanitized = (concernDescription || '').slice(0, 1500);

  if (!genAI) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured. Falling back to clinical decision protocol.'
    });
  }

  try {
    const languageNames: Record<string, string> = {
      en: 'English',
      pcm: 'Nigerian Pidgin English',
      yo: 'Yoruba (Yorùbá)',
      ha: 'Hausa',
      ig: 'Igbo'
    };
    const targetLangName = languageNames[language] || 'English';

    const prompt = `TARGET LANGUAGE: ${targetLangName} (Code: "${language}").
IMPORTANT: You MUST write the string values (level_name, summary, warning_signs_detected, recommended_actions, safe_self_care, monitoring_points, disclaimer) in ${targetLangName}. Keep clinical accuracy.

User Concern: "${sanitized}"
Symptom details:
- Symptoms selected: ${(answers?.symptoms || []).join(', ') || 'None specified'}
- Duration in days: ${answers?.durationDays || 1}
- Possible exposure history reported: ${answers?.hasExposureRisk ? 'YES' : 'NO'}
- Severe bleeding reported: ${answers?.hasSevereBleeding ? 'YES' : 'NO'}
- Severe breathing difficulty reported: ${answers?.hasBreathingDifficulty ? 'YES' : 'NO'}
- Altered consciousness / severe confusion: ${answers?.hasAlteredConsciousness ? 'YES' : 'NO'}
- Nigerian state/location: ${answers?.locationState || 'Nigeria'}

Analyze this clinical presentation and return a JSON object with:
{
  "level": 1 | 2 | 3,
  "level_name": "General Guidance / Level name in ${targetLangName}",
  "summary": "concise plain-language clinical summary in ${targetLangName}",
  "warning_signs_detected": ["list of identified signs in ${targetLangName}"],
  "exposure_risk_flag": boolean,
  "recommended_actions": ["bullet points for patient in ${targetLangName}"],
  "safe_self_care": ["safe hydration, rest, paracetamol caution in ${targetLangName}"],
  "monitoring_points": ["signs to watch for in ${targetLangName}"],
  "urgent_contacts": [
    { "label": "NCDC Toll-Free", "phone": "6232", "description": "National Public Health Emergency Line" }
  ],
  "disclaimer": "AI triage only. Not a clinical diagnosis."
}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: VIRTUAL_DOCTOR_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    let rawText = response.text || '{}';
    if (rawText.includes('```json')) {
      rawText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    } else if (rawText.includes('```')) {
      rawText = rawText.replace(/```\s*/g, '');
    }
    const parsed = JSON.parse(rawText.trim());
    if (!parsed.level || !parsed.summary) {
      throw new Error('Incomplete triage payload from model');
    }
    return res.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown AI error';
    console.error('Virtual doctor error:', message);
    return res.status(500).json({ error: 'Failed to process virtual consultation.' });
  }
});

// Public Supabase configuration endpoint (safely provides project URL and publishable key; NEVER secret keys)
app.get('/api/supabase-config', (_req: Request, res: Response) => {
  const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const rawKey = (process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim();
  const isSecret = rawKey.startsWith('sb_secret_') || rawKey.includes('service_role');
  const publishableKey = isSecret ? '' : rawKey;

  res.json({
    url,
    publishableKey,
    hasUrl: Boolean(url),
    hasPublishableKey: Boolean(publishableKey),
    isSecretKeyBlocked: isSecret
  });
});

// System monitoring endpoint
app.get('/api/system-status', async (_req: Request, res: Response) => {
  const startTime = Date.now();
  let geminiConnected = false;
  let latencyMs = 0;

  if (genAI) {
    try {
      await genAI.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: 'ping',
        config: { maxOutputTokens: 5 }
      });
      geminiConnected = true;
      latencyMs = Date.now() - startTime;
    } catch {
      geminiConnected = false;
      latencyMs = Date.now() - startTime;
    }
  }

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    backend: 'Node.js Express + Supabase Client',
    aiService: {
      provider: 'Google Gemini',
      model: 'gemini-3.8-flash',
      configured: Boolean(apiKey),
      connected: geminiConnected,
      latencyMs
    },
    version: '1.0.0',
    developerCredit: 'Developed by OLANREWAJU SAMUEL'
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EbolaGuard NG server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
