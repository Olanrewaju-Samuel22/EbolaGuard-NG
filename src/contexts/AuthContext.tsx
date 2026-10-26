import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseClient, isSupabaseConfigured, getSupabaseConfigStatus, supabaseConfigStatus, type SupabaseConfigStatus } from '../lib/supabaseClient';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  configStatus: SupabaseConfigStatus;
  error: string | null;
  clearError: () => void;
  authEvent: 'confirmed' | 'recovery' | 'expired' | null;
  authNotice: string | null;
  clearAuthNotice: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{
    success: boolean;
    error?: string;
    emailConfirmationRequired?: boolean;
    registeredEmail?: string;
  }>;
  resendConfirmationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: { full_name?: string; phone_number?: string; state?: string }) => Promise<{
    success: boolean;
    error?: string;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_PROFILE_KEY = 'ebolaguard_user_profile';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authEvent, setAuthEvent] = useState<'confirmed' | 'recovery' | 'expired' | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const clearError = () => setError(null);
  const clearAuthNotice = () => {
    setAuthNotice(null);
    setAuthEvent(null);
  };

  // Helper to load or construct profile from User object + metadata + database
  const loadUserProfile = async (authUser: User) => {
    const meta = authUser.user_metadata || {};
    const localSaved = localStorage.getItem(`${LOCAL_PROFILE_KEY}_${authUser.id}`);
    const localData = localSaved ? JSON.parse(localSaved) : {};

    const baseProfile: UserProfile = {
      id: authUser.id,
      email: authUser.email || '',
      full_name: meta.full_name || meta.name || localData.full_name || authUser.email?.split('@')[0] || 'Health Advocate',
      phone_number: meta.phone_number || localData.phone_number || '',
      state: meta.state || localData.state || 'Lagos',
      created_at: authUser.created_at,
      updated_at: new Date().toISOString()
    };

    setProfile(baseProfile);

    // Try fetching from Supabase 'profiles' table if it exists
    if (supabaseClient) {
      try {
        const { data, error: profileErr } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (data && !profileErr) {
          setProfile({
            id: authUser.id,
            email: authUser.email || '',
            full_name: data.display_name || data.full_name || baseProfile.full_name,
            phone_number: data.phone_number || baseProfile.phone_number,
            state: data.state || baseProfile.state,
            created_at: data.created_at || authUser.created_at,
            updated_at: data.updated_at
          });
        }
      } catch {
        // Table may be pending migration; fallback baseProfile is already safely in state
      }
    }
  };

  useEffect(() => {
    // 0. Parse URL hash & query string for auth callbacks or errors
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      const hashParams = new URLSearchParams(hash);
      const searchParams = new URLSearchParams(window.location.search);

      const hashType = hashParams.get('type');
      const authEventQuery = searchParams.get('auth_event');
      const hashError = hashParams.get('error_description') || searchParams.get('error_description') || hashParams.get('error');

      if (hashError) {
        const decoded = decodeURIComponent(hashError.replace(/\+/g, ' '));
        const isExpired = decoded.toLowerCase().includes('expired') || decoded.toLowerCase().includes('invalid');
        setAuthEvent(isExpired ? 'expired' : null);
        setError(decoded);
        // Clean fragment without reloading
        window.history.replaceState(null, '', window.location.pathname);
      } else if (authEventQuery === 'confirmed' || hashType === 'signup') {
        setAuthEvent('confirmed');
        setAuthNotice('Your email address has been verified successfully! Welcome to EbolaGuard NG.');
        window.history.replaceState(null, '', window.location.pathname);
      } else if (authEventQuery === 'recovery' || hashType === 'recovery') {
        setAuthEvent('recovery');
        setAuthNotice('Password reset session authorized. Please enter and save your new password below.');
      }
    }

    if (!supabaseClient || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // 1. Initial Session Retrieval
    supabaseClient.auth.getSession().then(({ data, error: sessionErr }) => {
      if (!isMounted) return;
      if (sessionErr) {
        console.warn('Supabase getSession error:', sessionErr.message);
      }
      const initialSession = data?.session ?? null;
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        loadUserProfile(initialSession.user);
      }
      setLoading(false);
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    // 2. Auth State Change Listener
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!isMounted) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (event === 'PASSWORD_RECOVERY') {
          setAuthEvent('recovery');
          setAuthNotice('Password reset session verified. Enter your new password below.');
        } else if (event === 'SIGNED_IN') {
          // If signed in, keep session active
        }

        if (currentSession?.user) {
          await loadUserProfile(currentSession.user);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // 1. Sign In With Password
  const signInWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);

    if (!supabaseClient || !isSupabaseConfigured) {
      const status = getSupabaseConfigStatus();
      const msg = status.errorMessage || 'Supabase credentials are not configured in your environment.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const { data, error: signInErr } = await supabaseClient.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (signInErr) {
        let friendlyMsg = signInErr.message;
        if (signInErr.message.includes('Invalid login credentials')) {
          friendlyMsg = 'Invalid email or password. Please verify your credentials and try again.';
        } else if (signInErr.message.includes('Email not confirmed')) {
          friendlyMsg = 'Your email has not been confirmed yet. Please check your inbox for the verification link.';
        }
        setError(friendlyMsg);
        return { success: false, error: friendlyMsg };
      }

      if (data?.session) {
        setSession(data.session);
        setUser(data.user);
        if (data.user) {
          await loadUserProfile(data.user);
        }
      }

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error during sign in.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // 2. Sign Up With Password
  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ success: boolean; error?: string; emailConfirmationRequired?: boolean; registeredEmail?: string }> => {
    setError(null);

    if (!supabaseClient || !isSupabaseConfigured) {
      const status = getSupabaseConfigStatus();
      const msg = status.errorMessage || 'Supabase credentials are not configured in your environment.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const trimmedEmail = email.trim();
      const trimmedName = fullName.trim();
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

      const { data, error: signUpErr } = await supabaseClient.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: trimmedName,
            display_name: trimmedName
          },
          emailRedirectTo: siteUrl ? `${siteUrl}?auth_event=confirmed` : undefined
        }
      });

      if (signUpErr) {
        let friendlyMsg = signUpErr.message;
        if (signUpErr.message.includes('User already registered')) {
          friendlyMsg = 'An account with this email address already exists. Please sign in instead.';
        } else if (signUpErr.message.includes('Password should be')) {
          friendlyMsg = 'Password must be at least 6 characters long.';
        }
        setError(friendlyMsg);
        return { success: false, error: friendlyMsg };
      }

      // Check if email confirmation is required (session is null when confirmation is enabled)
      const requiresConfirmation = !data.session && Boolean(data.user);

      if (data.user) {
        // Save local backup metadata
        localStorage.setItem(
          `${LOCAL_PROFILE_KEY}_${data.user.id}`,
          JSON.stringify({ full_name: trimmedName })
        );

        // Attempt writing profile record to 'profiles' table if available
        try {
          await supabaseClient.from('profiles').upsert({
            id: data.user.id,
            display_name: trimmedName,
            email: trimmedEmail,
            updated_at: new Date().toISOString()
          });
        } catch {
          // Table pending migration - ignored gracefully
        }
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        if (data.user) {
          await loadUserProfile(data.user);
        }
      }

      return {
        success: true,
        emailConfirmationRequired: requiresConfirmation,
        registeredEmail: trimmedEmail
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error during registration.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // 3. Resend Confirmation Email
  const resendConfirmationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);

    if (!supabaseClient || !isSupabaseConfigured) {
      const status = getSupabaseConfigStatus();
      const msg = status.errorMessage || 'Supabase credentials are not configured in your environment.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const { error: resendErr } = await supabaseClient.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: siteUrl ? `${siteUrl}?auth_event=confirmed` : undefined
        }
      });

      if (resendErr) {
        let friendlyMsg = resendErr.message;
        if (resendErr.message.includes('rate limit') || resendErr.message.includes('security purposes')) {
          friendlyMsg = 'Please wait at least 60 seconds before requesting another confirmation email.';
        }
        setError(friendlyMsg);
        return { success: false, error: friendlyMsg };
      }

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend confirmation email.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // 4. Sign Out
  const signOut = async (): Promise<void> => {
    setError(null);
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
    setSession(null);
    setUser(null);
    setProfile(null);
    setAuthEvent(null);
    setAuthNotice(null);
  };

  // 5. Reset Password Request
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);

    if (!supabaseClient || !isSupabaseConfigured) {
      const status = getSupabaseConfigStatus();
      const msg = status.errorMessage || 'Supabase client is not configured.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const siteUrl = typeof window !== 'undefined' ? `${window.location.origin}` : undefined;
      const { error: resetErr } = await supabaseClient.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: siteUrl ? `${siteUrl}?auth_event=recovery` : undefined
      });

      if (resetErr) {
        setError(resetErr.message);
        return { success: false, error: resetErr.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error sending reset email.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // 6. Update Password (for recovery flow)
  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);

    if (!supabaseClient || !isSupabaseConfigured) {
      const status = getSupabaseConfigStatus();
      const msg = status.errorMessage || 'Supabase credentials are not configured.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const { error: updateErr } = await supabaseClient.auth.updateUser({
        password: newPassword
      });

      if (updateErr) {
        setError(updateErr.message);
        return { success: false, error: updateErr.message };
      }

      setAuthEvent(null);
      setAuthNotice('Your password has been successfully updated! You are now securely logged in.');
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // 7. Update Profile
  const updateProfile = async (updates: {
    full_name?: string;
    phone_number?: string;
    state?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'You must be signed in to update your profile.' };
    }

    try {
      // 1. Update Supabase auth user metadata
      if (supabaseClient) {
        await supabaseClient.auth.updateUser({
          data: {
            full_name: updates.full_name,
            phone_number: updates.phone_number,
            state: updates.state
          }
        });

        // 2. Update 'profiles' table if it exists
        try {
          await supabaseClient.from('profiles').upsert({
            id: user.id,
            display_name: updates.full_name,
            phone_number: updates.phone_number,
            updated_at: new Date().toISOString()
          });
        } catch {
          // Table pending migration
        }
      }

      // 3. Update local storage backup
      const localKey = `${LOCAL_PROFILE_KEY}_${user.id}`;
      const existing = localStorage.getItem(localKey);
      const parsed = existing ? JSON.parse(existing) : {};
      const merged = { ...parsed, ...updates };
      localStorage.setItem(localKey, JSON.stringify(merged));

      // 4. Update in-memory state
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile.';
      return { success: false, error: msg };
    }
  };

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      isConfigured: isSupabaseConfigured,
      configStatus: supabaseConfigStatus,
      error,
      clearError,
      authEvent,
      authNotice,
      clearAuthNotice,
      signInWithEmail,
      signUpWithEmail,
      resendConfirmationEmail,
      signOut,
      resetPassword,
      updatePassword,
      updateProfile
    }),
    [user, session, profile, loading, error, authEvent, authNotice]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
