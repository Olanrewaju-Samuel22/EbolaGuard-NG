import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  LogOut,
  CheckCircle,
  Bell,
  Activity,
  FileText,
  AlertTriangle,
  Save,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';

const NIGERIA_STATES = [
  'Federal Capital Territory (Abuja)',
  'Lagos', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Edo', 'Enugu', 'Plateau', 'Borno',
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Cross River', 'Delta', 'Ebonyi', 'Ekiti', 'Gombe', 'Imo', 'Jigawa',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Ogun',
  'Ondo', 'Osun', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

interface AccountPageProps {
  onNavigateTab: (tab: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigateTab }) => {
  const { t } = useTranslation();
  const { user, profile, loading, signOut, updateProfile } = useAuth();

  // Profile Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [stateLocation, setStateLocation] = useState('Lagos');

  // Notification Preferences
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync profile fields when loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone_number || '');
      setStateLocation(profile.state || 'Lagos');
    } else if (user) {
      setFullName(user.user_metadata?.full_name || user.email?.split('@')[0] || '');
    }
  }, [profile, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    const res = await updateProfile({
      full_name: fullName.trim(),
      phone_number: phone.trim(),
      state: stateLocation
    });

    setIsSaving(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      setSaveError(res.error || 'Failed to update profile.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigateTab('home');
  };

  // If loading session state
  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-muted-foreground">{t.common.loading || 'Loading account profile...'}</p>
      </div>
    );
  }

  // If unauthenticated: Protected Page View
  if (!user) {
    return (
      <div className="py-16 sm:py-24 px-4 max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-display text-foreground">
            {t.auth?.loginRequiredTitle || 'Authentication Required'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t.auth?.loginRequiredDesc ||
              'Please sign in or create an account to view and manage your EbolaGuard NG profile.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => onNavigateTab('signin')}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all cursor-pointer"
          >
            {t.auth?.signIn || 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('signup')}
            className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-all cursor-pointer"
          >
            {t.auth?.createAccount || 'Create Account'}
          </button>
        </div>

        <div className="pt-6 border-t border-border/60">
          <button
            type="button"
            onClick={() => onNavigateTab('home')}
            className="text-xs text-muted-foreground hover:text-foreground font-medium"
          >
            ← {t.common.back} {t.nav.home}
          </button>
        </div>
      </div>
    );
  }

  // Authenticated User Dashboard
  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : user.email?.slice(0, 2).toUpperCase() || 'EG';

  const memberDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'October 2026';

  return (
    <div className="py-10 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top User Profile Card */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary text-primary-foreground font-bold text-xl sm:text-2xl flex items-center justify-center shadow-sm shrink-0">
              {initials}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  {fullName || 'Health Advocate'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" />
                  {t.auth?.verifiedAccount || 'Supabase Authenticated'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user.email}</span>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t.auth?.memberSince || 'Member Since'}: <span className="font-medium text-foreground">{memberDate}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.auth?.signOut || 'Sign Out'}</span>
            </button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Health Profile Form (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2 font-display">
                  <User className="w-4 h-4 text-primary" />
                  <span>{t.auth?.editProfile || 'Edit Health Profile'}</span>
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Synced with Supabase Auth
                </span>
              </div>

              {saveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{t.auth?.profileUpdated || 'Your health profile has been successfully updated.'}</span>
                </div>
              )}

              {saveError && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.auth?.fullNameLabel || 'Full Name'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Email (Readonly) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.auth?.emailLabel || 'Email Address'}</span>
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email || ''}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-muted text-muted-foreground cursor-not-allowed"
                  />
                  <span className="text-[11px] text-muted-foreground block">
                    Your authenticated login identity.
                  </span>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.auth?.phoneLabel || 'Emergency Phone Number'}</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Primary Nigerian State */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.auth?.stateLabel || 'Primary Nigerian State / Location'}</span>
                  </label>
                  <select
                    value={stateLocation}
                    onChange={(e) => setStateLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {NIGERIA_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notification Settings */}
                <div className="pt-4 border-t border-border/60 space-y-3">
                  <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-primary" />
                    <span>{t.auth?.alertPreferences || 'Emergency Outbreak Alerts'}</span>
                  </h3>

                  <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>{t.auth?.smsAlerts || 'Receive high-priority NCDC epidemic SMS alerts'}</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>{t.auth?.emailAlerts || 'Receive weekly verified public health digest'}</span>
                  </label>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? (t.auth?.saving || 'Saving...') : (t.auth?.saveChanges || 'Save Changes')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Quick Health Shortcuts (1 col) */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-card border border-border/70 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span>{t.auth?.emergencyQuickLinks || 'Quick Health Actions'}</span>
              </h3>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('virtual-doctor')}
                  className="w-full text-left p-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-xs font-semibold text-foreground transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>{t.auth?.viewAssessments || 'Start Symptom Assessment'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('find-help')}
                  className="w-full text-left p-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-xs font-semibold text-foreground transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{t.auth?.facilityDirectory || 'Locate Nearest Facility'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('updates')}
                  className="w-full text-left p-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-xs font-semibold text-foreground transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <span>{t.auth?.outbreakFeed || 'View Outbreak Updates'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Emergency Hotline Direct Callout */}
            <div className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs space-y-3">
              <div className="flex items-center gap-2 text-destructive font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>NCDC National Emergency Desk</span>
              </div>
              <p className="text-foreground leading-relaxed">
                Experiencing sudden high fever, vomiting, or acute illness? Call 6232 immediately before visiting any medical center.
              </p>
              <a
                href="tel:6232"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-xs transition-colors shadow-xs"
              >
                Call NCDC Toll-Free 6232
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
