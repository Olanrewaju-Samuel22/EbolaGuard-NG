import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

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
const HEALTH_ASSISTANT_SYSTEM_PROMPT = `You are the EbolaGuard NG AI Health Education Assistant, built for Nigerian public health awareness.
Your mission: Provide calm, verified, plain-language health information on Ebola Virus Disease (EVD) grounded strictly in official protocols from the Nigeria Centre for Disease Control (NCDC), the World Health Organization (WHO), and the Federal Ministry of Health and Social Welfare (Nigeria).

STRICT SAFETY RULES:
1. NEVER diagnose the user with Ebola or any disease.
2. NEVER prescribe prescription medication, dosage instructions, or recommend experimental or folk remedies (strictly debunk saltwater drinking/baths, bleach, and unapproved concoctions).
3. NEVER claim a user is definitely infected or safe.
4. ALWAYS explain that early symptoms (fever, body pain, headache) mimic malaria and other common tropical fevers, and laboratory testing (RT-PCR) is required for diagnosis.
5. Emphasize that Nigeria currently has zero active Ebola transmission and surveillance at borders is proactive.
6. For suspected exposure or severe illness, instruct the user to call the NCDC Toll-Free Emergency Hotline at 6232.
7. Always provide a calm, respectful tone and brief source attribution (e.g. "Source: NCDC / WHO Guidelines").`;

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
    const prompt = `Language: ${language}. User Question: "${sanitized}". Provide a clear, supportive response following your public health guidelines.`;
    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: HEALTH_ASSISTANT_SYSTEM_PROMPT,
        temperature: 0.2,
        maxOutputTokens: 800
      }
    });

    const text = response.text || 'Unable to generate response.';
    return res.json({
      answer: text,
      sources: [
        'https://ncdc.gov.ng',
        'https://www.who.int/health-topics/ebola',
        'https://africacdc.org'
      ],
      disclaimer: 'EbolaGuard NG provides verified public health education. It does not replace a licensed clinical medical doctor.'
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
    const prompt = `Language: ${language}.
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
  "level_name": "General Guidance" | "Prompt Professional Assessment" | "Immediate Emergency Medical Attention",
  "summary": "concise plain-language clinical summary",
  "warning_signs_detected": ["list of identified signs"],
  "exposure_risk_flag": boolean,
  "recommended_actions": ["bullet points for patient"],
  "safe_self_care": ["safe hydration, rest, paracetamol caution"],
  "monitoring_points": ["signs to watch for"],
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

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown AI error';
    console.error('Virtual doctor error:', message);
    return res.status(500).json({ error: 'Failed to process virtual consultation.' });
  }
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
