import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseClient, isSupabaseConfigured } from '../lib/supabaseClient';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  error: string | null;
  clearError: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{
    success: boolean;
    error?: string;
    emailConfirmationRequired?: boolean;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
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

  const clearError = () => setError(null);

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
      async (_event, currentSession) => {
        if (!isMounted) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

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

    if (!supabaseClient) {
      const msg = 'Supabase credentials are not configured in your environment.';
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
  ): Promise<{ success: boolean; error?: string; emailConfirmationRequired?: boolean }> => {
    setError(null);

    if (!supabaseClient) {
      const msg = 'Supabase credentials are not configured in your environment.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const trimmedEmail = email.trim();
      const trimmedName = fullName.trim();

      const { data, error: signUpErr } = await supabaseClient.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: trimmedName,
            display_name: trimmedName
          }
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
        emailConfirmationRequired: requiresConfirmation
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error during registration.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  // 3. Sign Out
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
  };

  // 4. Reset Password
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);

    if (!supabaseClient) {
      const msg = 'Supabase client is not configured.';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}` : undefined;
      const { error: resetErr } = await supabaseClient.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl
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

  // 5. Update Profile
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
      error,
      clearError,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetPassword,
      updateProfile
    }),
    [user, session, profile, loading, error]
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
