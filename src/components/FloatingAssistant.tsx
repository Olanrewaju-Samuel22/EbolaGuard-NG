import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, PhoneCall, Minimize2, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { askHealthAssistant } from '../lib/ai-service';

interface FloatingAssistantProps {
  language: SupportedLanguage;
  onOpenVirtualDoctor: () => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  language,
  onOpenVirtualDoctor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Hello! I am the EbolaGuard AI Assistant. How can I assist you with Ebola information, symptoms, or prevention guidelines today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      const res = await askHealthAssistant(text, language);
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
          text: 'Unable to reach the assistant right now. For emergency assistance in Nigeria, dial NCDC Toll-Free at 6232.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button (Component yh equivalent) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 p-3.5 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5 text-white animate-pulse" />
          <span className="hidden sm:inline font-semibold text-xs pr-1">Ask AI</span>
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
                <h3 className="font-bold text-xs">EbolaGuard AI Assistant</h3>
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
                aria-label="Close"
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
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border border-border text-foreground rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-muted-foreground mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground p-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>Thinking...</span>
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
              <span>Full Risk Checker</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <a
              href="tel:6232"
              className="text-destructive hover:underline font-bold flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>NCDC: 6232</span>
            </a>
          </div>

          {/* Input box */}
          <div className="p-2.5 bg-card border-t border-border flex items-center gap-1.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask an Ebola question..."
              className="flex-1 px-3 py-2 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
