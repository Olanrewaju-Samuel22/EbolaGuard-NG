import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';

// Sanitize process.env during Vite build/dev to guarantee secret keys are never bundled
if (process.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_secret_') || process.env.VITE_SUPABASE_ANON_KEY?.includes('service_role')) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    process.env.SUPABASE_SECRET_KEY = process.env.VITE_SUPABASE_ANON_KEY;
  }
  delete process.env.VITE_SUPABASE_ANON_KEY;
}
dotenv.config({ override: true });
if (process.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_secret_')) {
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
