import React, { useState } from 'react';
import { Shield, Menu, X, PhoneCall, ChevronDown, Lock } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

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

  const { language: ctxLanguage, setLanguage: ctxSetLanguage, t } = useTranslation();
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display font-bold text-base md:text-lg text-foreground tracking-tight">
              EbolaGuard
            </span>
            <span className="text-primary font-bold text-base md:text-lg">
              NG
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
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
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Select Language"
            >
              <span>{languageLabels[currentLanguage]?.flag || '🇳🇬'}</span>
              <span className="uppercase tracking-wide font-semibold">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-card border border-border shadow-lg p-1 z-50 text-xs">
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

          {/* Admin Staff Access */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Admin Staff Portal"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.nav.staff}</span>
          </button>

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
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
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

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              🔒 {t.nav.admin}
            </button>
            <span className="text-[11px] text-muted-foreground">
              {t.common.emergencyCallText}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
