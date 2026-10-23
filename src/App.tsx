import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OutbreakAlertBanner } from './components/OutbreakAlertBanner';
import { FloatingAssistant } from './components/FloatingAssistant';
import { HomePage } from './pages/HomePage';
import { AboutEbolaPage } from './pages/AboutEbolaPage';
import { SymptomsExposurePage } from './pages/SymptomsExposurePage';
import { PreventionPage } from './pages/PreventionPage';
import { OutbreakUpdatesPage } from './pages/OutbreakUpdatesPage';
import { StatisticsDashboardPage } from './pages/StatisticsDashboardPage';
import { AIHealthAssistantPage } from './pages/AIHealthAssistantPage';
import { VirtualDoctorPage } from './pages/VirtualDoctorPage';
import { EmergencyHelpPage } from './pages/EmergencyHelpPage';
import { FindMedicalHelpPage } from './pages/FindMedicalHelpPage';
import { AwarenessResourcesPage } from './pages/AwarenessResourcesPage';
import { FAQPage } from './pages/FAQPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactFeedbackPage } from './pages/ContactFeedbackPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { AdminPortalPage } from './pages/AdminPortalPage';

import {
  HealthArticle,
  OutbreakUpdate,
  OutbreakStatistic,
  AwarenessResource,
  StateHealthResource,
  FAQItem,
  OfficialSource,
  MisinformationReport,
  SupportedLanguage
} from './types';

import {
  INITIAL_ARTICLES,
  INITIAL_OUTBREAK_UPDATES,
  INITIAL_OUTBREAK_STATISTICS,
  INITIAL_AWARENESS_RESOURCES,
  INITIAL_STATE_HEALTH_RESOURCES,
  INITIAL_FAQS,
  INITIAL_OFFICIAL_SOURCES,
  publicHealthStore,
  fetchLiveArticles,
  fetchLiveUpdates,
  fetchLiveStatistics,
  fetchLiveMisinformationReports,
  submitMisinformationReport,
  isSupabaseConfigured
} from './lib/supabase';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [selectedUpdateModal, setSelectedUpdateModal] = useState<OutbreakUpdate | null>(null);

  // Core Data States (Initialized from persistent store or pre-seeded verified public health records)
  const [articles, setArticles] = useState<HealthArticle[]>(() =>
    publicHealthStore.load('articles', INITIAL_ARTICLES)
  );
  const [updates, setUpdates] = useState<OutbreakUpdate[]>(() =>
    publicHealthStore.load('updates', INITIAL_OUTBREAK_UPDATES)
  );
  const [statistics, setStatistics] = useState<OutbreakStatistic[]>(() =>
    publicHealthStore.load('statistics', INITIAL_OUTBREAK_STATISTICS)
  );
  const [sources] = useState<OfficialSource[]>(() =>
    publicHealthStore.load('sources', INITIAL_OFFICIAL_SOURCES)
  );
  const [resources] = useState<AwarenessResource[]>(() =>
    publicHealthStore.load('resources', INITIAL_AWARENESS_RESOURCES)
  );
  const [stateFacilities] = useState<StateHealthResource[]>(() =>
    publicHealthStore.load('state_facilities', INITIAL_STATE_HEALTH_RESOURCES)
  );
  const [faqs] = useState<FAQItem[]>(() =>
    publicHealthStore.load('faqs', INITIAL_FAQS)
  );
  const [misinformationReports, setMisinformationReports] = useState<MisinformationReport[]>(() =>
    publicHealthStore.load('misinformation_reports', [
      {
        id: 'rep-1',
        report_category: 'fake_cure',
        description: 'Viral WhatsApp voice note claiming bathing in boiled saltwater with bitter kola leaves prevents Ebola in Ogun state.',
        reported_url: 'WhatsApp Forward / Social Media',
        status: 'debunked',
        resolution_notes: 'Debunked against NCDC advisory. Alerted community educators.',
        created_at: '2026-10-22T08:00:00Z'
      }
    ])
  );

  // Live Supabase query sync on mount
  useEffect(() => {
    let isMounted = true;
    async function syncSupabase() {
      if (!isSupabaseConfigured) return;

      try {
        const [artsRes, updsRes, statsRes, repRes] = await Promise.all([
          fetchLiveArticles(),
          fetchLiveUpdates(),
          fetchLiveStatistics(),
          fetchLiveMisinformationReports()
        ]);

        if (isMounted) {
          if (artsRes.data && artsRes.data.length > 0) {
            setArticles(artsRes.data);
          }
          if (updsRes.data && updsRes.data.length > 0) {
            setUpdates(updsRes.data);
          }
          if (statsRes.data && statsRes.data.length > 0) {
            setStatistics(statsRes.data);
          }
          if (repRes.data && repRes.data.length > 0) {
            setMisinformationReports(repRes.data);
          }
        }
      } catch (e) {
        console.warn('Initial Supabase sync fallback:', e);
      }
    }

    syncSupabase();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync state mutations to local persistent store
  useEffect(() => {
    publicHealthStore.save('articles', articles);
  }, [articles]);

  useEffect(() => {
    publicHealthStore.save('updates', updates);
  }, [updates]);

  useEffect(() => {
    publicHealthStore.save('statistics', statistics);
  }, [statistics]);

  useEffect(() => {
    publicHealthStore.save('misinformation_reports', misinformationReports);
  }, [misinformationReports]);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadFullUpdate = (update: OutbreakUpdate) => {
    setSelectedUpdateModal(update);
    setCurrentTab('updates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddMisinformationReport = async (report: Partial<MisinformationReport>) => {
    const res = await submitMisinformationReport({
      report_category: report.report_category || 'other',
      description: report.description || '',
      reported_url: report.reported_url || ''
    });

    const newReport: MisinformationReport = {
      id: res.id,
      report_category: report.report_category || 'other',
      description: report.description || '',
      reported_url: report.reported_url || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setMisinformationReports((prev) => [newReport, ...prev]);
  };

  const latestOfficialUpdate = updates[0] || INITIAL_OUTBREAK_UPDATES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F6] text-[#1F2937]">
      {/* Official Outbreak Alert Banner */}
      {!alertDismissed && (
        <OutbreakAlertBanner
          update={latestOfficialUpdate}
          onReadFullUpdate={handleReadFullUpdate}
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Page Routing */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={handleSelectTab}
            onViewUpdate={handleReadFullUpdate}
            language={language}
            latestUpdate={latestOfficialUpdate}
            statistics={statistics}
          />
        )}

        {currentTab === 'about-ebola' && (
          <AboutEbolaPage
            articles={articles}
            language={language}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'symptoms' && (
          <SymptomsExposurePage
            onSelectTab={handleSelectTab}
            language={language}
          />
        )}

        {currentTab === 'prevention' && (
          <PreventionPage
            onSelectTab={handleSelectTab}
            language={language}
          />
        )}

        {currentTab === 'updates' && (
          <OutbreakUpdatesPage
            updates={updates}
            onSelectUpdate={setSelectedUpdateModal}
            selectedUpdateModal={selectedUpdateModal}
            onCloseModal={() => setSelectedUpdateModal(null)}
          />
        )}

        {currentTab === 'statistics' && (
          <StatisticsDashboardPage
            statistics={statistics}
          />
        )}

        {currentTab === 'assistant' && (
          <AIHealthAssistantPage
            onSelectTab={handleSelectTab}
            language={language}
          />
        )}

        {currentTab === 'virtual-doctor' && (
          <VirtualDoctorPage
            onSelectTab={handleSelectTab}
            language={language}
          />
        )}

        {currentTab === 'emergency' && (
          <EmergencyHelpPage
            onSelectTab={handleSelectTab}
            language={language}
          />
        )}

        {currentTab === 'find-help' && (
          <FindMedicalHelpPage
            resources={stateFacilities}
          />
        )}

        {currentTab === 'resources' && (
          <AwarenessResourcesPage
            resources={resources}
            language={language}
          />
        )}

        {currentTab === 'faq' && (
          <FAQPage
            faqs={faqs}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'about-us' && (
          <AboutUsPage />
        )}

        {currentTab === 'contact' && (
          <ContactFeedbackPage
            onSubmitReport={handleAddMisinformationReport}
          />
        )}

        {currentTab === 'privacy' && (
          <PrivacyPolicyPage />
        )}

        {currentTab === 'terms' && (
          <TermsOfUsePage />
        )}

        {currentTab === 'admin' && (
          <AdminPortalPage
            articles={articles}
            onUpdateArticles={setArticles}
            updates={updates}
            onUpdateUpdates={setUpdates}
            statistics={statistics}
            onUpdateStatistics={setStatistics}
            sources={sources}
            misinformationReports={misinformationReports}
            onUpdateReports={setMisinformationReports}
          />
        )}
      </main>

      {/* Official Footer with Developer Credit */}
      <Footer
        onSelectTab={handleSelectTab}
        language={language}
      />

      {/* Floating AI Assistant Widget (Matching component yh in reference) */}
      <FloatingAssistant
        language={language}
        onOpenVirtualDoctor={() => handleSelectTab('virtual-doctor')}
      />
    </div>
  );
}
export default App;
