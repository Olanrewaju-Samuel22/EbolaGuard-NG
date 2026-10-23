// Supabase Edge Function: virtual-doctor
// Handles symptom assessment and 3-level triage for underserved regions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { concernDescription, answers, language = "en" } = await req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
    const prompt = `Language: ${language}.
User Concern: "${(concernDescription || '').slice(0, 1000)}"
Symptoms: ${(answers?.symptoms || []).join(', ')}
Exposure reported: ${answers?.hasExposureRisk ? 'YES' : 'NO'}
Severe bleeding: ${answers?.hasSevereBleeding ? 'YES' : 'NO'}
Breathing distress: ${answers?.hasBreathingDifficulty ? 'YES' : 'NO'}
State: ${answers?.locationState || 'Nigeria'}

Analyze this clinical presentation and return a valid JSON object matching:
{
  "level": 1 | 2 | 3,
  "level_name": "General Guidance" | "Prompt Professional Assessment" | "Immediate Emergency Medical Attention",
  "summary": "plain-language summary",
  "warning_signs_detected": ["sign1", "sign2"],
  "exposure_risk_flag": boolean,
  "recommended_actions": ["action1", "action2"],
  "safe_self_care": ["care1"],
  "monitoring_points": ["point1"],
  "urgent_contacts": [{"label": "NCDC Toll-Free", "phone": "6232", "description": "National Emergency Desk"}],
  "disclaimer": "AI triage only. Not a licensed physician diagnosis."
}`;

    const apiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{
            text: "You are the EbolaGuard Virtual Doctor. Categorize cases into Level 1, Level 2, or Level 3 triage. Enforce call-ahead protocol for emergency suspected cases. Return valid JSON only."
          }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1
        }
      })
    });

    const data = await apiRes.json();
    const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(jsonText);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error processing request";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
