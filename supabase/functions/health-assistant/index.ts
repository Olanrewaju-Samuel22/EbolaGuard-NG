// Supabase Edge Function: health-assistant
// Handles verified Ebola public health education via Gemini

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
    const { question, language = "en" } = await req.json();
    if (!question || typeof question !== "string") {
      return new Response(JSON.stringify({ error: "Missing question" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `Language: ${language}. User inquiry regarding Ebola: "${question.slice(0, 1000)}"` }]
        }
      ],
      systemInstruction: {
        parts: [{
          text: `You are the EbolaGuard NG AI Health Education Assistant.
Provide calm, evidence-based Nigerian public health information on Ebola Virus Disease.
Follow strict NCDC & WHO guidelines. Never diagnose. Never prescribe. Clarify that Nigeria has zero active Ebola cases and airport screening is routine. Mention NCDC Toll-free 6232.`
        }]
      },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 600
      }
    };

    const apiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await apiRes.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to retrieve health information.";

    return new Response(JSON.stringify({
      answer,
      sources: ["https://ncdc.gov.ng", "https://www.who.int/health-topics/ebola"],
      disclaimer: "EbolaGuard NG provides public health education. It does not replace a licensed clinical medical doctor."
    }), {
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
