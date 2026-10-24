import React from 'react';
import { Shield, Heart, Globe2 } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16 border-t border-border/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg md:text-xl text-white tracking-tight">
                EbolaGuard<span className="text-primary">NG</span>
              </span>
            </div>

            <p className="text-background/70 max-w-md text-sm md:text-base leading-relaxed">
              {t.footer.brandDescription}
            </p>

            <div className="flex items-center gap-2 text-xs md:text-sm text-background/60 pt-1">
              <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
              <span>{t.footer.builtWithPurpose}</span>
            </div>
          </div>

          {/* Column: Platform Links */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm uppercase tracking-wider text-background/80">
              {t.footer.platformHeader}
            </h4>
            <ul className="space-y-2.5 text-background/70 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('virtual-doctor')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.nav.riskAssessment}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('prevention')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.nav.prevention}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('updates')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.nav.updates}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('statistics')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.nav.dashboard}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('find-help')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.nav.facilities}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.nav.admin}
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Ethics */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm uppercase tracking-wider text-background/80">
              {t.footer.legalHeader}
            </h4>
            <ul className="space-y-2.5 text-background/70 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('privacy')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.footer.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('terms')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.footer.termsOfService}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about-ebola')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.footer.clinicalEthics}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('emergency')}
                  className="hover:text-primary transition-colors text-left text-destructive font-medium"
                >
                  {t.footer.emergencyContacts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-primary transition-colors text-left"
                >
                  {t.footer.reportMisinfo}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs md:text-sm text-background/60">
              {t.footer.copyright}
            </p>
            <p className="text-xs md:text-sm text-background/70 mt-1">
              Developed by <span className="text-primary font-medium">OLANREWAJU SAMUEL</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm text-background/60 flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <span>{t.footer.sdgLabel}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
