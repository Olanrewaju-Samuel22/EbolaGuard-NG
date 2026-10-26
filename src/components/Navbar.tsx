import React, { useState } from 'react';
import {
  Shield,
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  User,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language: propLanguage,
  onLanguageChange: propOnLanguageChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { language: ctxLanguage, setLanguage: ctxSetLanguage, t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const currentLanguage = propLanguage || ctxLanguage;

  const handleLanguageChange = (code: SupportedLanguage) => {
    if (propOnLanguageChange) {
      propOnLanguageChange(code);
    }
    ctxSetLanguage(code);
    setLangMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'virtual-doctor', label: t.nav.riskAssessment },
    { id: 'prevention', label: t.nav.prevention },
    { id: 'about-ebola', label: t.nav.about },
    { id: 'updates', label: t.nav.updates },
    { id: 'statistics', label: t.nav.dashboard },
    { id: 'find-help', label: t.nav.facilities },
    { id: 'emergency', label: t.nav.emergency, isEmergency: true }
  ];

  const languageLabels: Record<SupportedLanguage, { flag: string; label: string }> = {
    en: { flag: '🇬🇧', label: 'English' },
    pcm: { flag: '🇳🇬', label: 'Pidgin' },
    yo: { flag: '🇳🇬', label: 'Yorùbá' },
    ha: { flag: '🇳🇬', label: 'Hausa' },
    ig: { flag: '🇳🇬', label: 'Igbo' }
  };

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
    setUserMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarInitials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'EG';

  return (
    <header className="sticky top-0 z-50 w-full bg-card/90 backdrop-blur-xl border-b border-border/40 safe-area-top transition-all">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo matching reference */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl gradient-hero flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display font-bold text-lg md:text-xl text-foreground tracking-tight">
              EbolaGuard
            </span>
            <span className="text-primary font-display font-bold text-lg md:text-xl">
              NG
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  item.isEmergency
                    ? 'text-destructive hover:bg-destructive/10 font-semibold'
                    : isActive
                    ? 'bg-primary/10 text-primary shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setUserMenuOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Select Language"
            >
              <span>{languageLabels[currentLanguage]?.flag || '🇳🇬'}</span>
              <span className="uppercase tracking-wide font-semibold">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-card border border-border shadow-lg p-1 z-50 text-xs animate-in fade-in-50 zoom-in-95">
                {(Object.keys(languageLabels) as SupportedLanguage[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      currentLanguage === code
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span>{languageLabels[code].label}</span>
                    <span>{languageLabels[code].flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Authentication Options */}
          {!user ? (
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleNavClick('signin')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{t.auth?.signIn || 'Sign In'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('signup')}
                className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t.auth?.createAccount || 'Create Account'}</span>
              </button>
            </div>
          ) : (
            /* Authenticated User Account Menu Dropdown */
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setLangMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground transition-colors cursor-pointer border border-border/50"
                aria-label="User Account Menu"
              >
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                  {avatarInitials}
                </div>
                <span className="max-w-[90px] truncate hidden md:inline">
                  {displayName}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border shadow-lg p-2 z-50 text-xs space-y-1 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-2 border-b border-border/60">
                    <p className="font-bold text-foreground truncate">{displayName}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavClick('account')}
                    className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-foreground hover:bg-secondary transition-colors font-medium cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>{t.auth?.myAccount || 'My Account'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('virtual-doctor')}
                    className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-foreground hover:bg-secondary transition-colors font-medium cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>{t.nav.riskAssessment}</span>
                  </button>
                  <div className="pt-1 border-t border-border/60">
                    <button
                      type="button"
                      onClick={async () => {
                        await signOut();
                        setUserMenuOpen(false);
                        handleNavClick('home');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-colors font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.auth?.signOut || 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Emergency Hotline CTA */}
          <a
            href="tel:6232"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold transition-all shadow-xs active:scale-95 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.common.hotline}</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-border/40 bg-card px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile Navigation Links */}
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Authentication Area */}
          {!user ? (
            <div className="pt-3 border-t border-border/40 space-y-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                Account Access
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('signin')}
                  className="w-full py-2.5 px-3 rounded-xl border border-input text-xs font-bold text-foreground hover:bg-secondary text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{t.auth?.signIn || 'Sign In'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('signup')}
                  className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 text-center cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t.auth?.createAccount || 'Create Account'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-border/40 space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/70 border border-border/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{displayName}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('account')}
                  className="w-full py-2 px-3 rounded-xl bg-secondary text-xs font-semibold text-foreground text-center cursor-pointer hover:bg-secondary/80 flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>{t.auth?.myAccount || 'My Account'}</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    handleNavClick('home');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-destructive/10 text-destructive text-xs font-bold text-center cursor-pointer hover:bg-destructive/20 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.auth?.signOut || 'Sign Out'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile Footer Note */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-center">
            <span className="text-[11px] text-muted-foreground text-center">
              {t.common.emergencyCallText}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
