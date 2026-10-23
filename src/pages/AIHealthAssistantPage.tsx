import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Shield,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { askHealthAssistant, HealthAssistantResponse } from '../lib/ai-service';

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
  language: SupportedLanguage;
}

export const AIHealthAssistantPage: React.FC<AIHealthAssistantPageProps> = ({
  onSelectTab,
  language
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: `Hello! I am the EbolaGuard NG AI Health Education Assistant. I can answer your questions about Ebola Virus Disease, transmission facts, vaccines, and official Nigerian public health directives.\n\n*Important:* I am an educational guide. I cannot diagnose medical conditions or prescribe drugs. How can I help you understand Ebola today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['https://ncdc.gov.ng', 'https://www.who.int/health-topics/ebola']
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'Is there any active Ebola outbreak currently in Nigeria?',
    'Can drinking or bathing in saltwater protect against Ebola?',
    'Is Ebola an airborne virus like COVID-19 or flu?',
    'What approved vaccines and treatments exist for Ebola?'
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
      const response: HealthAssistantResponse = await askHealthAssistant(q, language);
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
          text: 'Unable to reach the assistant at this moment. For urgent inquiries, please contact the NCDC emergency hotline directly at 6232.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI Health Education Guide (Powered by Gemini)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            AI Health Education Assistant
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ask plain-language questions about Ebola epidemiology, transmission mechanisms, and official public health guidelines.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 max-w-5xl">

      {/* Medical Safety Disclaimer Strip */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
        <Shield className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold">Clinical Safety Notice:</span>
          <p className="text-emerald-900/90 leading-relaxed">
            This AI assistant provides verified educational guidance only. It does NOT diagnose illnesses, prescribe medication, or replace clinical consultation with a licensed doctor. For suspected exposure, call NCDC Toll-Free 6232.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#18794E] text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none space-y-3'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-gray-200/80 text-[11px] text-gray-500 space-y-1">
                    <span className="font-semibold text-gray-700 block">Verified References:</span>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#0F766E] hover:underline"
                        >
                          <span>{src.replace('https://', '').split('/')[0]}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {msg.recommendedPages && msg.recommendedPages.length > 0 && (
                  <div className="pt-2 border-t border-gray-200/80 flex items-center gap-2 flex-wrap text-[11px]">
                    <span className="font-semibold text-gray-700">Explore Portal:</span>
                    {msg.recommendedPages.map((page, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const tabId = page.toLowerCase().includes('about')
                            ? 'about-ebola'
                            : page.toLowerCase().includes('symptom')
                            ? 'symptoms'
                            : page.toLowerCase().includes('doctor')
                            ? 'virtual-doctor'
                            : page.toLowerCase().includes('emergency')
                            ? 'emergency'
                            : 'home';
                          onSelectTab(tabId);
                        }}
                        className="px-2 py-0.5 rounded bg-white border border-gray-200 text-[#18794E] hover:bg-emerald-50 font-medium inline-flex items-center gap-1"
                      >
                        <span>{page}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500 p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Retrieving verified public health facts...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-gray-400 uppercase shrink-0">Quick Topics:</span>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-700 hover:border-[#18794E] hover:text-[#18794E] transition-colors whitespace-nowrap shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your Ebola public health inquiry..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuestion.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#18794E] hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
};
