import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, PhoneCall, Minimize2, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { askHealthAssistant } from '../lib/ai-service';
import { useTranslation } from '../contexts/LanguageContext';
import { FormattedMessage } from './FormattedMessage';

interface FloatingAssistantProps {
  language?: SupportedLanguage;
  onOpenVirtualDoctor: () => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  language: propLanguage,
  onOpenVirtualDoctor
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: t.assistant.greeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update greeting when language changes if only the initial greeting is present
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'assistant') {
        return [
          {
            sender: 'assistant',
            text: t.assistant.greeting,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      }
      return prev;
    });
  }, [activeLanguage, t.assistant.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');

    const newMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const res = await askHealthAssistant(text, activeLanguage);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: res.answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
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
            : 'Unable to reach the assistant right now. For emergency assistance in Nigeria, dial NCDC Toll-Free at 6232.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button matching reference yh */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-white flex items-center justify-center active:scale-95 transition-transform group"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-80 sm:w-96 rounded-2xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-3.5 bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xs">{t.assistant.title}</h3>
                <span className="text-[10px] text-white/80">Active · NCDC Guidelines</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={t.common.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs bg-muted/20">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none whitespace-pre-wrap break-words'
                      : 'bg-card border border-border text-foreground rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.sender === 'user' ? (
                    <div className="break-words">{m.text}</div>
                  ) : (
                    <FormattedMessage content={m.text} />
                  )}
                </div>
                <span className="text-[9px] text-muted-foreground mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground p-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>{t.common.thinking}</span>
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="px-3 py-1.5 bg-background border-t border-border flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenVirtualDoctor();
              }}
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t.assistant.fullCheckerBtn}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <a
              href="tel:6232"
              className="text-destructive hover:underline font-bold flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>NCDC: {t.common.hotline}</span>
            </a>
          </div>

          {/* Input box */}
          <div className="p-2.5 bg-card border-t border-border flex items-center gap-1.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.assistant.inputPlaceholder}
              className="flex-1 px-3 py-2 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              aria-label={t.common.submit}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default FloatingAssistant;
