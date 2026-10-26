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
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup' | 'forgot-password';
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
    resetPassword,
    user,
    error,
    clearError,
    isConfigured,
    configStatus
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot-password'>(initialMode);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(null);

  // Sync mode if initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setFormError(null);
    setSuccessMessage(null);
    setConfirmationNotice(null);
    clearError();
  }, [initialMode]);

  // If already logged in, show redirection option
  useEffect(() => {
    if (user && mode !== 'forgot-password') {
      if (onSuccessRedirect) {
        onSuccessRedirect('account');
      }
    }
  }, [user, mode, onSuccessRedirect]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setConfirmationNotice(null);
    clearError();

    // 1. Email validation
    if (!email || !validateEmail(email)) {
      setFormError(t.auth?.emailRequiredError || 'Please provide a valid email address.');
      return;
    }

    // 2. Mode: Forgot Password
    if (mode === 'forgot-password') {
      setIsSubmitting(true);
      const res = await resetPassword(email);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMessage(
          t.auth?.resetEmailSent ||
            'Password reset link has been dispatched! Please check your email inbox.'
        );
      } else {
        setFormError(res.error || 'Failed to dispatch reset email. Please verify your address.');
      }
      return;
    }

    // 3. Mode: Create Account
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
          setConfirmationNotice(
            t.auth?.emailConfirmNotice ||
              'Account created! If email confirmation is enabled on your Supabase project, please check your inbox to confirm your address before signing in.'
          );
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

    // 4. Mode: Sign In
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
              'Emergency guidance, outbreak statistics, and the Risk Assessment tool are 100% public and free without logging in.'}
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
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {mode === 'signin' && (t.auth?.signInSubtitle || 'Access personalized public health resources and manage state alert preferences.')}
              {mode === 'signup' && (t.auth?.signUpSubtitle || 'Join Nigerians staying protected with verified disease bulletins, risk screening, and emergency directories.')}
              {mode === 'forgot-password' && (t.auth?.forgotSubtitle || 'Enter your registered email address to receive password recovery instructions.')}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In / Register) */}
          {mode !== 'forgot-password' && (
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
                    ? 'bg-card text-foreground shadow-xs'
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
                    ? 'bg-card text-foreground shadow-xs'
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

          {/* Error Message Alert */}
          {(formError || error) && (
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">Error: </span>
                <span>{formError || error}</span>
              </div>
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Email Confirmation Notice Alert */}
          {confirmationNotice && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div className="space-y-2">
                <p className="font-semibold">{confirmationNotice}</p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setConfirmationNotice(null);
                  }}
                  className="font-bold underline cursor-pointer"
                >
                  Proceed to Sign In →
                </button>
              </div>
            </div>
          )}

          {/* The Active Form */}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
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
                  {t.auth?.rememberMe || 'Remember my session'}
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

            {mode === 'forgot-password' && (
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
