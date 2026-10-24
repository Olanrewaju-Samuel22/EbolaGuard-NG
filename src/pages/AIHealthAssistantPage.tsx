import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Shield,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { askHealthAssistant, HealthAssistantResponse } from '../lib/ai-service';
import { useTranslation } from '../contexts/LanguageContext';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  disclaimer?: string;
  recommendedPages?: string[];
  timestamp: string;
}

interface AIHealthAssistantPageProps {
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const AIHealthAssistantPage: React.FC<AIHealthAssistantPageProps> = ({
  onSelectTab,
  language: propLanguage
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: t.assistant.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola']
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update initial message if language changes and no user messages exist yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'assistant') {
        return [
          {
            sender: 'assistant',
            text: t.assistant.greeting,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola']
          }
        ];
      }
      return prev;
    });
  }, [activeLanguage, t.assistant.greeting]);

  const suggestedQuestions = [
    t.assistant.q1,
    t.assistant.q2,
    t.assistant.q3,
    t.assistant.q4
  ];

  const handleSend = async (questionToSend?: string) => {
    const q = questionToSend || inputQuestion;
    if (!q.trim() || isLoading) return;

    const userMessage: Message = {
      sender: 'user',
      text: q.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!questionToSend) setInputQuestion('');
    setIsLoading(true);

    try {
      const response: HealthAssistantResponse = await askHealthAssistant(q, activeLanguage);
      const assistantMessage: Message = {
        sender: 'assistant',
        text: response.answer,
        sources: response.sources,
        disclaimer: response.disclaimer,
        recommendedPages: response.recommendedPages,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: activeLanguage === 'pcm'
            ? 'Network dey slow small. For emergency help for Naija, call NCDC free line 6232.'
            : activeLanguage === 'yo'
            ? 'A kò lè kan olùrànlọ́wọ́ báyìí. Fún ìrànwọ́ pàjáwìrì ní Nàìjíríà, pe NCDC 6232 lọ́fẹ̀ẹ́.'
            : activeLanguage === 'ha'
            ? 'Ba a iya samun mataimaki a yanzu ba. Don taimakon gaggawa, kira NCDC kyauta a 6232.'
            : activeLanguage === 'ig'
            ? 'Enweghị ike iru onye enyemaka ugbu a. Maka enyemaka mberede, kpọọ NCDC n\'efu na 6232.'
            : 'Unable to reach the assistant at this moment. For urgent inquiries, please contact the NCDC emergency hotline directly at 6232.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{t.assistant.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.assistant.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.assistant.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl space-y-6">
        {/* Suggested Queries */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            {t.assistant.suggestedHeader}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(sq)}
                className="text-left p-3 rounded-xl border border-border bg-card hover:bg-secondary text-xs text-foreground transition-colors flex items-center justify-between group"
              >
                <span>{sq}</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Chat Stream */}
        <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col h-[520px]">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-secondary/60 text-foreground border border-border rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-border/40 text-[11px] text-muted-foreground space-y-1">
                      <span className="font-semibold block">{t.common.source}:</span>
                      {m.sources.map((s, si) => (
                        <a
                          key={si}
                          href={s}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 mr-3"
                        >
                          <span>{s.replace('https://', '')}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}

                  {m.disclaimer && (
                    <p className="mt-2 text-[10px] text-muted-foreground italic">
                      {m.disclaimer}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-secondary/30 rounded-2xl max-w-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>{t.assistant.thinking}</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-card border-t border-border flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.assistant.inputPlaceholder}
              className="flex-1 px-4 py-2.5 rounded-xl border border-input text-xs sm:text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputQuestion.trim()}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              aria-label={t.assistant.sendBtn}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer & Emergency Callout */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{t.assistant.disclaimer}</span>
          <a
            href="tel:6232"
            className="text-destructive font-bold hover:underline inline-flex items-center gap-1.5 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.common.emergencyCallText}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default AIHealthAssistantPage;
