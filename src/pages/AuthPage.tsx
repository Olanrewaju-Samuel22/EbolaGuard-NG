import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Info,
  PhoneCall,
  ChevronLeft,
  RefreshCw,
  Send,
  Sparkles,
  Inbox
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';

export type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'confirm-email' | 'update-password';

interface AuthPageProps {
  initialMode?: AuthMode;
  onSuccessRedirect?: (targetTab: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signin',
  onSuccessRedirect,
  onNavigateTab
}) => {
  const { t } = useTranslation();
  const {
    signInWithEmail,
    signUpWithEmail,
    resendConfirmationEmail,
    resetPassword,
    updatePassword,
    user,
    error,
    clearError,
    authEvent,
    authNotice,
    clearAuthNotice,
    isConfigured,
    configStatus
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Recovery States
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Email Confirmation & Resend States
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cooldown timer interval for resend confirmation email
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Sync mode if initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setFormError(null);
    setSuccessMessage(null);
    clearError();
  }, [initialMode, clearError]);

  // Handle incoming auth callback events (e.g. from confirmation link or password recovery)
  useEffect(() => {
    if (authEvent === 'recovery') {
      setMode('update-password');
      setFormError(null);
    } else if (authEvent === 'confirmed') {
      setSuccessMessage('Email verified successfully! Welcome to EbolaGuard NG.');
      if (onSuccessRedirect) {
        const timer = setTimeout(() => {
          onSuccessRedirect('account');
        }, 1500);
        return () => clearTimeout(timer);
      }
    } else if (authEvent === 'expired') {
      setFormError('Your email confirmation or reset link has expired or has already been used. Please request a new one below.');
    }
  }, [authEvent, onSuccessRedirect]);

  // If already logged in, redirect to intended tab (unless in recovery/update-password mode)
  useEffect(() => {
    if (user && mode !== 'update-password' && mode !== 'forgot-password') {
      if (onSuccessRedirect) {
        onSuccessRedirect('account');
      }
    }
  }, [user, mode, onSuccessRedirect]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleResendConfirmation = async (targetEmail?: string) => {
    const emailToUse = targetEmail || registeredEmail || email;
    if (!emailToUse || !validateEmail(emailToUse)) {
      setFormError('Please provide a valid email address to resend confirmation.');
      return;
    }

    if (resendCooldown > 0) return;

    setIsResending(true);
    setFormError(null);
    setResendSuccess(null);

    const res = await resendConfirmationEmail(emailToUse);
    setIsResending(false);

    if (res.success) {
      setResendSuccess(`Verification link resent to ${emailToUse}! Please check your inbox and spam folder.`);
      setResendCooldown(60);
    } else {
      setFormError(res.error || 'Failed to resend confirmation email. Please try again shortly.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setResendSuccess(null);
    clearError();
    clearAuthNotice();

    // 1. Mode: Update Password (from recovery email)
    if (mode === 'update-password') {
      if (!newPassword || newPassword.length < 6) {
        setFormError('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setFormError('Passwords do not match. Please ensure both passwords match.');
        return;
      }

      setIsSubmitting(true);
      const res = await updatePassword(newPassword);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMessage('Password updated successfully! Redirecting to your dashboard...');
        if (onSuccessRedirect) {
          setTimeout(() => onSuccessRedirect('account'), 1500);
        }
      } else {
        setFormError(res.error || 'Failed to update password. Please try requesting a new reset link.');
      }
      return;
    }

    // 2. Email validation for all other modes
    if (!email || !validateEmail(email)) {
      setFormError(t.auth?.emailRequiredError || 'Please provide a valid email address.');
      return;
    }

    // 3. Mode: Forgot Password
    if (mode === 'forgot-password') {
      setIsSubmitting(true);
      const res = await resetPassword(email);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMessage(
          t.auth?.resetEmailSent ||
            'Password reset instructions have been dispatched! Please check your email inbox and spam folder.'
        );
      } else {
        setFormError(res.error || 'Failed to dispatch reset email. Please verify your address.');
      }
      return;
    }

    // 4. Mode: Create Account
    if (mode === 'signup') {
      if (!fullName.trim()) {
        setFormError(t.auth?.nameRequiredError || 'Please enter your full name.');
        return;
      }
      if (!password || password.length < 6) {
        setFormError(t.auth?.passwordLengthError || 'Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError(t.auth?.passwordMatchError || 'Passwords do not match. Please ensure both match.');
        return;
      }

      setIsSubmitting(true);
      const res = await signUpWithEmail(email, password, fullName);
      setIsSubmitting(false);

      if (res.success) {
        if (res.emailConfirmationRequired) {
          setRegisteredEmail(res.registeredEmail || email.trim());
          setMode('confirm-email');
          setResendCooldown(60);
        } else {
          setSuccessMessage(t.auth?.registrationSuccess || 'Account registered successfully!');
          if (onSuccessRedirect) {
            setTimeout(() => onSuccessRedirect('account'), 1000);
          }
        }
      } else {
        setFormError(res.error || 'Registration failed. Please try again.');
      }
      return;
    }

    // 5. Mode: Sign In
    if (mode === 'signin') {
      if (!password) {
        setFormError('Please enter your password.');
        return;
      }

      setIsSubmitting(true);
      const res = await signInWithEmail(email, password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMessage('Successfully signed in. Loading your dashboard...');
        if (onSuccessRedirect) {
          setTimeout(() => onSuccessRedirect('account'), 500);
        }
      } else {
        setFormError(
          res.error ||
            'Unable to sign in. Please check your email and password, or verify if your email is confirmed.'
        );
      }
    }
  };

  const isEmailUnconfirmedError = (formError || error)?.includes('not been confirmed') || (formError || error)?.includes('Email not confirmed');

  return (
    <div className="py-10 sm:py-16 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigateTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.common.back} {t.nav.home}</span>
        </button>

        {/* Public Health Reassurance Banner */}
        <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">Public Health Notice: </span>
            {t.auth?.publicNotice ||
              'Emergency guidance, outbreak statistics, and the Risk Assessment triage tool are 100% public and free without logging in.'}
          </p>
        </div>

        {/* Auth Card Container */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-hero text-white mb-2 shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
              {mode === 'signin' && (t.auth?.signInTitle || 'Sign In to EbolaGuard NG')}
              {mode === 'signup' && (t.auth?.signUpTitle || 'Create an EbolaGuard Account')}
              {mode === 'forgot-password' && (t.auth?.forgotTitle || 'Recover Your Password')}
              {mode === 'confirm-email' && 'Verify Your Email Address'}
              {mode === 'update-password' && 'Set New Password'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {mode === 'signin' && (t.auth?.signInSubtitle || 'Access personalized public health resources and manage state alert preferences.')}
              {mode === 'signup' && (t.auth?.signUpSubtitle || 'Join Nigerians staying protected with verified disease bulletins, risk screening, and emergency directories.')}
              {mode === 'forgot-password' && (t.auth?.forgotSubtitle || 'Enter your registered email address to receive password recovery instructions.')}
              {mode === 'confirm-email' && 'An activation link has been dispatched to complete your registration.'}
              {mode === 'update-password' && 'Enter your new secure password below to regain full account access.'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In / Register) */}
          {(mode === 'signin' || mode === 'signup') && (
            <div className="grid grid-cols-2 p-1 bg-secondary rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setFormError(null);
                  setSuccessMessage(null);
                  clearError();
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-card text-foreground shadow-xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.auth?.signIn || 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setFormError(null);
                  setSuccessMessage(null);
                  clearError();
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-card text-foreground shadow-xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.auth?.createAccount || 'Create Account'}
              </button>
            </div>
          )}

          {/* Configuration Notice Alert (Identifies missing environment variables clearly without revealing keys) */}
          {!isConfigured && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>Supabase Configuration Notice</span>
              </div>
              <p className="leading-relaxed">
                {configStatus?.errorMessage || 'Supabase authentication is not configured in this environment.'}
              </p>
              {configStatus?.missingVariables && configStatus.missingVariables.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-1.5 items-center">
                  <span className="font-semibold text-muted-foreground">Required variables:</span>
                  {configStatus.missingVariables.map((v) => (
                    <code key={v} className="px-1.5 py-0.5 rounded bg-amber-500/20 font-mono text-[11px] font-bold text-amber-900 dark:text-amber-200">
                      {v}
                    </code>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth Notice (e.g. email verified celebration) */}
          {authNotice && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div className="space-y-1">
                <p className="font-semibold">{authNotice}</p>
              </div>
            </div>
          )}

          {/* Error Message Alert */}
          {(formError || error) && (
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold">Error: </span>
                  <span>{formError || error}</span>
                </div>
              </div>

              {/* Special action if error is unconfirmed email */}
              {isEmailUnconfirmedError && (
                <div className="pt-1 border-t border-destructive/20 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-destructive/80">Need a fresh link?</span>
                  <button
                    type="button"
                    disabled={isResending || resendCooldown > 0}
                    onClick={() => handleResendConfirmation(email)}
                    className="text-[11px] font-bold underline hover:opacity-80 disabled:opacity-50 cursor-pointer"
                  >
                    {isResending ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend confirmation email →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Resend Confirmation Success Alert */}
          {resendSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{resendSuccess}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* SPECIAL VIEW: DEDICATED EMAIL CONFIRMATION SCREEN        */}
          {/* ======================================================== */}
          {mode === 'confirm-email' && (
            <div className="space-y-5 animate-in fade-in-50">
              {/* Highlight Card */}
              <div className="p-5 rounded-2xl bg-secondary/80 border border-border/80 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <Inbox className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">Check your inbox</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">We sent a verification email to:</p>
                  <div className="inline-block px-3 py-1 mt-2 rounded-lg bg-card border border-border font-mono text-xs font-bold text-primary">
                    {registeredEmail || email || 'your email address'}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  Click the confirmation button in the email to activate your account. Confirmation links will bring you straight back to EbolaGuard NG.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  disabled={isResending || resendCooldown > 0}
                  onClick={() => handleResendConfirmation(registeredEmail || email)}
                  className="w-full py-2.5 px-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                  <span>
                    {isResending
                      ? 'Dispatching verification link...'
                      : resendCooldown > 0
                      ? `Resend confirmation link (${resendCooldown}s)`
                      : 'Resend confirmation email'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setFormError(null);
                    setSuccessMessage(null);
                    setResendSuccess(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return to Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Helpful spam notice */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-[11px] text-muted-foreground text-center space-y-1">
                <p className="font-semibold text-foreground">Can&apos;t find the email?</p>
                <p>Check your Spam, Junk, or Promotions folder. It usually arrives within 1-2 minutes.</p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setFormError(null);
                    setSuccessMessage(null);
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer block mx-auto pt-1"
                >
                  Change email address
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SPECIAL VIEW: UPDATE PASSWORD (FROM RECOVERY CALLBACK)   */}
          {/* ======================================================== */}
          {mode === 'update-password' && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in-50">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>New Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Confirm New Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    aria-label={showConfirmNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Match / Strength Indicator */}
              <div className="text-[11px] text-muted-foreground space-y-0.5 pt-1">
                <p className={newPassword.length >= 6 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                  • Password must be at least 6 characters long.
                </p>
                {confirmNewPassword && (
                  <p className={newPassword === confirmNewPassword ? 'text-primary font-medium' : 'text-destructive font-medium'}>
                    • {newPassword === confirmNewPassword ? 'Passwords match' : 'Passwords do not match'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Saving new password...</span>
                  </>
                ) : (
                  <>
                    <span>Save & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ======================================================== */}
          {/* STANDARD AUTH FORMS (SIGN IN / SIGN UP / FORGOT PW)      */}
          {/* ======================================================== */}
          {mode !== 'confirm-email' && mode !== 'update-password' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Sign Up only) */}
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.auth?.fullNameLabel || 'Full Name'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.auth?.fullNamePlaceholder || 'e.g. Dr. Amina Bello'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{t.auth?.emailLabel || 'Email Address'}</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth?.emailPlaceholder || 'you@example.com'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Password (for Sign In & Sign Up) */}
              {mode !== 'forgot-password' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{t.auth?.passwordLabel || 'Password'}</span>
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot-password');
                          setFormError(null);
                          setSuccessMessage(null);
                          clearError();
                        }}
                        className="text-xs font-medium text-primary hover:underline cursor-pointer"
                      >
                        {t.auth?.forgotPasswordLink || 'Forgot Password?'}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.auth?.passwordPlaceholder || 'Enter your password'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password (Sign Up only) */}
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.auth?.confirmPasswordLabel || 'Confirm Password'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t.auth?.confirmPasswordPlaceholder || 'Re-enter your password'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength / match indicator */}
                  <div className="text-[11px] text-muted-foreground space-y-0.5 pt-1">
                    <p className={password.length >= 6 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                      • {t.auth?.passwordRequirements || 'Password must be at least 6 characters long.'}
                    </p>
                    {confirmPassword && (
                      <p className={password === confirmPassword ? 'text-primary font-medium' : 'text-destructive font-medium'}>
                        • {password === confirmPassword ? 'Passwords match' : (t.auth?.passwordMatchError || 'Passwords do not match')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Remember Me Option (Sign In only) */}
              {mode === 'signin' && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="text-xs text-muted-foreground cursor-pointer select-none">
                    {t.auth?.rememberMe || 'Remember my session on this device'}
                  </label>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>{t.common.loading || 'Processing...'}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'signin' && (t.auth?.signIn || 'Sign In')}
                      {mode === 'signup' && (t.auth?.createAccount || 'Create Account')}
                      {mode === 'forgot-password' && (t.auth?.resetPasswordBtn || 'Send Password Reset Email')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Switch Links */}
          <div className="pt-4 border-t border-border/60 text-center text-xs text-muted-foreground space-y-2">
            {mode === 'signin' && (
              <p>
                {t.auth?.dontHaveAccount || "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setFormError(null);
                    setSuccessMessage(null);
                    clearError();
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  {t.auth?.createAccount || 'Create Account'}
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                {t.auth?.alreadyHaveAccount || 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setFormError(null);
                    setSuccessMessage(null);
                    clearError();
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  {t.auth?.signIn || 'Sign In'}
                </button>
              </p>
            )}

            {(mode === 'forgot-password' || mode === 'update-password') && (
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setFormError(null);
                  setSuccessMessage(null);
                  clearError();
                }}
                className="font-bold text-primary hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{t.auth?.backToSignIn || 'Return to Sign In'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Emergency Hotline Quick Access */}
        <div className="text-center">
          <a
            href="tel:6232"
            className="inline-flex items-center gap-2 text-xs font-bold text-destructive hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>NCDC 24/7 Toll-Free Line: 6232</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
