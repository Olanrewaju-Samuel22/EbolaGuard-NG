import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// 1. If VITE_SUPABASE_ANON_KEY has a secret key, save to SUPABASE_SECRET_KEY and scrub it
if (process.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_secret_') || process.env.VITE_SUPABASE_ANON_KEY?.includes('service_role')) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    process.env.SUPABASE_SECRET_KEY = process.env.VITE_SUPABASE_ANON_KEY;
  }
  delete process.env.VITE_SUPABASE_ANON_KEY;
}

// 2. Load .env with override so client-facing variables are populated
dotenv.config({ override: true });

// 3. Fallback support: If VITE_SUPABASE_URL isn't set but SUPABASE_URL is, copy it
if (!process.env.VITE_SUPABASE_URL && process.env.SUPABASE_URL) {
  process.env.VITE_SUPABASE_URL = process.env.SUPABASE_URL;
}

// Normalize URL: Strip /rest/v1 and trailing slashes if inadvertently provided
if (process.env.VITE_SUPABASE_URL) {
  process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

// 4. Fallback support: If VITE_SUPABASE_ANON_KEY isn't set but SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_KEY is, copy publishable key
if (!process.env.VITE_SUPABASE_ANON_KEY) {
  const candidate = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (candidate && !candidate.startsWith('sb_secret_') && !candidate.includes('service_role')) {
    process.env.VITE_SUPABASE_ANON_KEY = candidate;
  }
}

// 5. Final guard: Ensure NO secret keys ever leak into process.env.VITE_SUPABASE_ANON_KEY
if (process.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_secret_') || process.env.VITE_SUPABASE_ANON_KEY?.includes('service_role')) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    process.env.SUPABASE_SECRET_KEY = process.env.VITE_SUPABASE_ANON_KEY;
  }
  delete process.env.VITE_SUPABASE_ANON_KEY;
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

