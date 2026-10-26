import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Normalize Supabase URL: strip /rest/v1 or trailing slashes if inadvertently provided in environment
export const cleanSupabaseUrl = (url: string): string => {
  if (!url) return '';
  return url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
};

// Read configuration strictly from environment variables
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_URL = cleanSupabaseUrl(rawUrl);

// Support standard publishable key and anon key naming
const envPublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const rawKey = (envPublishableKey || envAnonKey || '').trim();

// CRITICAL BROWSER SECURITY GUARD:
// Supabase secret keys (sb_secret_... or service-role keys) must NEVER be used in browser client code.
// They bypass Row Level Security and are strictly forbidden in client-side applications.
const isSecretKey = typeof rawKey === 'string' && (rawKey.startsWith('sb_secret_') || rawKey.includes('service_role'));

if (isSecretKey && typeof window !== 'undefined') {
  console.error(
    '[EbolaGuard NG Security Guard] Forbidden use of Supabase secret API key in browser. ' +
    'The client has blocked this key. Please configure VITE_SUPABASE_ANON_KEY with your publishable key (sb_publishable_...).'
  );
}

// Clean publishable key only - never secret key
export const SUPABASE_ANON_KEY = isSecretKey ? '' : rawKey;

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  missingVariables: ('VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY')[];
  errorMessage: string | null;
  hasUrl: boolean;
  hasKey: boolean;
  isSecretKeyBlocked: boolean;
}

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const missing: ('VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY')[] = [];
  const isUrlValid = Boolean(
    SUPABASE_URL &&
    SUPABASE_URL !== 'https://your-project.supabase.co' &&
    !SUPABASE_URL.includes('placeholder')
  );
  if (!isUrlValid) {
    missing.push('VITE_SUPABASE_URL');
  }

  const isKeyValid = Boolean(
    SUPABASE_ANON_KEY &&
    !SUPABASE_ANON_KEY.startsWith('sb_secret_') &&
    SUPABASE_ANON_KEY !== 'placeholder'
  );
  if (!isKeyValid) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }

  let errorMessage: string | null = null;
  if (isSecretKey) {
    errorMessage = 'Forbidden use of secret API key in browser: VITE_SUPABASE_ANON_KEY was set to a secret key (sb_secret_...). Frontend code requires your public publishable key (sb_publishable_...).';
  } else if (missing.length > 0) {
    errorMessage = `Supabase configuration missing: ${missing.join(' and ')} ${
      missing.length > 1 ? 'are' : 'is'
    } not configured in your environment.`;
  }

  return {
    isConfigured: isUrlValid && isKeyValid,
    missingVariables: missing,
    errorMessage,
    hasUrl: isUrlValid,
    hasKey: isKeyValid,
    isSecretKeyBlocked: isSecretKey,
  };
}

export const supabaseConfigStatus = getSupabaseConfigStatus();

export const isSupabaseConfigured = supabaseConfigStatus.isConfigured;

export interface SafeDiagnostic {
  hasUrl: boolean;
  hasPublishableKey: boolean;
  isConfigured: boolean;
  isSecretKeyBlocked: boolean;
  missingVariables: ('VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY')[];
}

/**
 * Safe diagnostic that reports whether the URL and publishable key are present
 * without exposing or printing any portion of their values.
 */
export function getSafeDiagnostic(): SafeDiagnostic {
  const status = getSupabaseConfigStatus();
  return {
    hasUrl: status.hasUrl,
    hasPublishableKey: status.hasKey,
    isConfigured: status.isConfigured,
    isSecretKeyBlocked: status.isSecretKeyBlocked,
    missingVariables: status.missingVariables,
  };
}

// Log safe diagnostic on client startup
if (typeof window !== 'undefined') {
  const diag = getSafeDiagnostic();
  console.info('[EbolaGuard NG Diagnostics]', {
    supabaseUrlPresent: diag.hasUrl,
    publishableKeyPresent: diag.hasPublishableKey,
    isConfigured: diag.isConfigured,
    missingVariables: diag.missingVariables,
  });
}

// Initialize Supabase client strictly with the publishable key
export const supabaseClient: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Re-export as alias for compatibility
export const supabase = supabaseClient;

export interface ConnectionTestResult {
  connected: boolean;
  latencyMs: number;
  url: string;
  hasAnonKey: boolean;
  tables: {
    health_articles: boolean;
    outbreak_updates: boolean;
    outbreak_statistics: boolean;
    misinformation_reports: boolean;
    subscriptions: boolean;
    state_health_resources: boolean;
  };
  errorMessage?: string;
  details?: string;
}

/**
 * Diagnostic utility to test the Supabase connection and check table existence
 */
export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const start = Date.now();
  const result: ConnectionTestResult = {
    connected: false,
    latencyMs: 0,
    url: SUPABASE_URL,
    hasAnonKey: Boolean(SUPABASE_ANON_KEY),
    tables: {
      health_articles: false,
      outbreak_updates: false,
      outbreak_statistics: false,
      misinformation_reports: false,
      subscriptions: false,
      state_health_resources: false,
    },
  };

  if (!supabaseClient) {
    result.errorMessage =
      supabaseConfigStatus.errorMessage ||
      'Supabase client is not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
    result.latencyMs = Date.now() - start;
    return result;
  }

  try {
    // Check auth session response to test base network & API key validity
    const { error: authError } = await supabaseClient.auth.getSession();
    if (authError) {
      result.errorMessage = `Supabase Auth error: ${authError.message}`;
      result.latencyMs = Date.now() - start;
      return result;
    }

    result.connected = true;

    // Probe tables to see which ones exist in the user's Supabase database
    const tableKeys = [
      'health_articles',
      'outbreak_updates',
      'outbreak_statistics',
      'misinformation_reports',
      'subscriptions',
      'state_health_resources',
    ] as const;

    await Promise.all(
      tableKeys.map(async (table) => {
        try {
          const { error } = await supabaseClient!
            .from(table)
            .select('id')
            .limit(1);

          // If error is null or returns 0 rows, table exists!
          // If error is code 42P01 ("relation does not exist"), table is missing.
          if (!error) {
            result.tables[table] = true;
          } else if (error.code === 'PGRST116' || error.message.includes('0 rows')) {
            result.tables[table] = true;
          } else {
            result.tables[table] = false;
          }
        } catch {
          result.tables[table] = false;
        }
      })
    );

    result.latencyMs = Date.now() - start;
    return result;
  } catch (err: unknown) {
    result.latencyMs = Date.now() - start;
    result.errorMessage = err instanceof Error ? err.message : 'Unknown connection error';
    return result;
  }
}
