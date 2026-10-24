import React, { useState } from 'react';
import {
  Building2,
  PhoneCall,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { StateHealthResource, SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface FindMedicalHelpPageProps {
  resources: StateHealthResource[];
  language?: SupportedLanguage;
}

export const FindMedicalHelpPage: React.FC<FindMedicalHelpPageProps> = ({ resources }) => {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const NIGERIA_STATES = [
    'All',
    'Federal Capital Territory (Abuja)',
    'Lagos', 'Kano', 'Oyo', 'Enugu', 'Rivers', 'Edo', 'Kaduna', 'Plateau', 'Borno',
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Cross River', 'Delta', 'Ebonyi', 'Ekiti', 'Gombe', 'Imo', 'Jigawa',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Ogun',
    'Ondo', 'Osun', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const filteredResources = resources.filter((res) => {
    const matchesState = selectedState === 'All' || res.state_name.toLowerCase().includes(selectedState.toLowerCase());
    const matchesSearch =
      res.organisation_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.verified_contact_details.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Building2 className="w-4 h-4" />
            <span>{t.findHelp.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.findHelp.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.findHelp.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">
        {/* Filter and Search Bar */}
        <div className="bg-card p-5 rounded-2xl border border-border shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.findHelp.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input text-xs sm:text-sm focus:outline-none focus:border-primary bg-background"
            />
          </div>

          {/* State Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-input text-xs sm:text-sm text-foreground bg-card focus:outline-none focus:border-primary"
            >
              {NIGERIA_STATES.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? t.findHelp.stateFilterAll : st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-card rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                    {res.state_name}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase">
                    {res.facility_type.replace('_', ' ')}
                  </span>
                </div>

                <h2 className="text-base font-bold text-foreground leading-snug">
                  {res.organisation_name}
                </h2>

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{res.verified_contact_details.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.findHelp.emergencyDesk}</span>
                  <a
                    href={`tel:${res.verified_contact_details.hotline.replace(/[^0-9+]/g, '')}`}
                    className="font-mono font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{res.verified_contact_details.hotline}</span>
                  </a>
                </div>

                {res.official_website && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-foreground">{t.findHelp.officialPortal}</span>
                    <a
                      href={res.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>{t.findHelp.website}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{t.findHelp.verifiedOn} {new Date(res.verified_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="p-12 text-center bg-card rounded-2xl border border-border space-y-3">
            <p className="text-sm font-semibold text-foreground">
              {t.findHelp.noFacilityTitle}
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              {t.findHelp.noFacilityDesc}
            </p>
            <div className="pt-2">
              <a
                href="tel:6232"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.findHelp.callNcdcDispatch}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FindMedicalHelpPage;
