import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User, RotateCcw, Copy, Check, MessageCircle } from "lucide-react";
import { ChatMessage } from "../types";
import { t } from "../utils/translations";

interface AIConciergeProps {
  theme: "light" | "dark";
}

export default function AIConcierge({ theme }: AIConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "en";
    }
    return "en";
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: t("ai.welcome", lang)
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      }
    };
    window.addEventListener("lang-change", handleLangChange);
    return () => window.removeEventListener("lang-change", handleLangChange);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const promptChips = [
    { icon: "💎", key: "ai_chip1", text: t("ai.chip1", lang) },
    { icon: "🏙️", key: "ai_chip2", text: t("ai.chip2", lang) },
    { icon: "🏗️", key: "ai_chip3", text: t("ai.chip3", lang) },
    { icon: "📅", key: "ai_chip4", text: t("ai.chip4", lang) },
    { icon: "📊", key: "ai_chip5", text: t("ai.chip5", lang) },
    { icon: "🛂", key: "ai_chip6", text: t("ai.chip6", lang) }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error(t("ai.errorConnection", lang));
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: t("ai.errorGeneral", lang) }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (chipKey: string) => {
    const chipPrompts: Record<string, string> = {
      ai_chip1: "I have a budget of AED 2 million or less. Which properties from your portfolio offer the best combination of rental yield and capital appreciation? I want maximum ROI with low risk.",
      ai_chip2: "Compare the investment fundamentals of Downtown Dubai vs Dubai Marina. Which area has better rental yields, capital growth potential, and occupancy rates right now?",
      ai_chip3: "What off-plan projects do you currently offer with the best payment plans? I'm interested in post-handover payment plans and which developers offer the most attractive terms.",
      ai_chip4: "I'm interested in the UAE Golden Visa through real estate investment. Which of your properties qualify (above AED 2M)? What's the process, timeline, and what benefits does it include for my family?",
      ai_chip5: "Which of your current properties offer the highest rental yield? I'm looking for the best passive income opportunity — compare yields across all your available units.",
      ai_chip6: "I'm looking for a family home that also makes financial sense. Which 3+ bedroom properties do you offer that combine good living space with strong ROI potential?"
    };
    handleSendMessage(chipPrompts[chipKey] || chipKey);
  };

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: t("ai.welcome", lang)
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
          isOpen ? "rotate-0" : ""
        } ${
          theme === "dark"
            ? "bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] shadow-[0_4px_24px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_32px_rgba(212,175,55,0.6)]"
            : "bg-gradient-to-br from-[#aa7c11] via-[#d4af37] to-[#aa7c11] shadow-[0_4px_24px_rgba(170,124,17,0.35)] hover:shadow-[0_4px_32px_rgba(170,124,17,0.5)]"
        }`}
        aria-label={t("ai.header", lang)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
        {!isOpen && (
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 animate-pulse ${
            theme === "dark" ? "bg-emerald-500 border-[#0d0f15]" : "bg-emerald-500 border-white"
          }`}>
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div 
          className={`fixed bottom-24 left-6 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-2xl border shadow-[0_16px_64px_rgba(0,0,0,0.3)] flex flex-col h-[520px] max-h-[calc(100vh-160px)] overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-b from-[#0d0f15] via-[#10131a] to-[#0a0c12] border-[#d4af37]/25 text-white"
              : "bg-gradient-to-b from-white via-[#fffdfb] to-white border-[#aa7c11]/25 text-stone-800 shadow-[0_16px_64px_rgba(0,0,0,0.12)]"
          }`}
          style={{ animation: 'chatPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Header */}
          <div className={`px-4 py-3 flex justify-between items-center border-b transition-colors duration-300 ${
            theme === "dark" ? "bg-[#0d0f15]/90 border-gray-800/50" : "bg-[#faf8f4]/90 border-stone-200/50"
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#d4af37] to-[#aa7c11] shadow-[0_0_16px_rgba(212,175,55,0.3)]"
                    : "bg-gradient-to-br from-[#aa7c11] to-[#d4af37] shadow-[0_4px_12px_rgba(170,124,17,0.25)]"
                }`}>
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${
                  theme === "dark" ? "bg-emerald-500 border-[#0d0f15]" : "bg-emerald-500 border-white"
                }`} />
              </div>
              <div className="text-left">
                <h4 className={`font-serif text-sm font-bold leading-none mb-0.5 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#6b4f1d]"
                }`}>{t("ai.header", lang)}</h4>
                <p className={`text-[10px] font-sans flex items-center gap-1.5 ${theme === "dark" ? "text-gray-500" : "text-stone-400"}`}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  {t("ai.poweredBy", lang)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  theme === "dark" ? "hover:bg-gray-800/60 text-gray-400 hover:text-white" : "hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                }`}
                title={t("ai.clearChat", lang)}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prompt Chips */}
          <div className={`flex gap-1.5 p-3 overflow-x-auto border-b scrollbar-hide transition-colors duration-300 ${
            theme === "dark" ? "bg-[#0a0c12]/60 border-gray-800/30" : "bg-stone-50/60 border-stone-200/50"
          }`}>
            {promptChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => handleChipClick(chip.key)}
                className={`cursor-pointer text-[10px] font-sans px-2.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-1 ${
                  theme === "dark"
                    ? "bg-[#1a1d2a]/70 border border-gray-800/40 text-gray-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 hover:text-[#f3e5ab]"
                    : "bg-white border border-stone-200/60 text-stone-600 hover:bg-[#aa7c11]/5 hover:border-[#aa7c11]/30 hover:text-[#6b4f1d]"
                }`}
              >
                <span className="text-[10px]">{chip.icon}</span>
                {chip.text}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 text-xs scrollbar-thin">
            {messages.map((msg, index) => {
              const isAI = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 max-w-[90%] ${isAI ? "self-start text-left" : "self-end flex-row-reverse text-right"}`}
                  style={{ animation: 'msgFadeIn 0.25s ease-out' }}
                >
                  <div className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    isAI 
                      ? theme === "dark"
                        ? "bg-gradient-to-br from-[#d4af37]/20 to-[#aa7c11]/10 text-[#d4af37] border border-[#d4af37]/20"
                        : "bg-gradient-to-br from-[#aa7c11]/10 to-[#d4af37]/5 text-[#aa7c11] border border-[#aa7c11]/15"
                      : theme === "dark"
                        ? "bg-gray-800/80 text-gray-300 border border-gray-700/50"
                        : "bg-stone-100 text-stone-600 border border-stone-200"
                  }`}>
                    {isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`px-3.5 py-2.5 rounded-2xl leading-relaxed font-sans whitespace-pre-wrap ${
                      isAI
                        ? theme === "dark"
                          ? "bg-[#14171f] text-gray-200 border border-gray-800/50 rounded-tl-md"
                          : "bg-stone-50 text-stone-700 border border-stone-200/50 rounded-tl-md"
                        : theme === "dark"
                          ? "bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-semibold rounded-tr-md"
                          : "bg-gradient-to-r from-[#aa7c11] to-[#d4af37] text-black font-semibold rounded-tr-md"
                    }`}>
                      {msg.content}
                    </div>
                    {isAI && (
                      <button
                        onClick={() => handleCopyMessage(msg.content, index)}
                        className={`self-start px-1 py-0.5 rounded transition-all duration-200 ${
                          theme === "dark" ? "text-gray-600 hover:text-gray-400" : "text-stone-300 hover:text-stone-500"
                        }`}
                        title={t("ai.copy", lang)}
                      >
                        {copiedIndex === index ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 self-start text-left max-w-[90%]" style={{ animation: 'msgFadeIn 0.25s ease-out' }}>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#d4af37]/20 to-[#aa7c11]/10 text-[#d4af37] border border-[#d4af37]/20"
                    : "bg-gradient-to-br from-[#aa7c11]/10 to-[#d4af37]/5 text-[#aa7c11] border border-[#aa7c11]/15"
                }`}>
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className={`px-4 py-3 rounded-2xl rounded-tl-md border flex items-center gap-2.5 ${
                  theme === "dark" ? "bg-[#14171f] border-gray-800/50" : "bg-stone-50 border-stone-200/50"
                }`}>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === "dark" ? "bg-[#d4af37]" : "bg-[#aa7c11]"}`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === "dark" ? "bg-[#d4af37]" : "bg-[#aa7c11]"}`} style={{ animationDelay: '150ms' }} />
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === "dark" ? "bg-[#d4af37]" : "bg-[#aa7c11]"}`} style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className={`text-[10px] font-sans italic ${theme === "dark" ? "text-gray-500" : "text-stone-400"}`}>
                    {t("ai.loading", lang)}
                  </span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`px-3 py-3 border-t transition-colors duration-300 ${
            theme === "dark" ? "bg-[#0a0c12]/90 border-gray-800/30" : "bg-stone-50/90 border-stone-200/50"
          }`}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder={t("ai.inputPlaceholder", lang)}
                className={`flex-1 rounded-xl px-3.5 py-2.5 text-xs transition-all duration-300 border font-sans ${
                  theme === "dark"
                    ? "bg-[#0d0f15] border-gray-800/50 text-white placeholder-gray-600 focus:border-[#d4af37]/40"
                    : "bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#aa7c11]/40"
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15`}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className={`cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black hover:shadow-[0_0_16px_rgba(212,175,55,0.35)] hover:scale-105"
                    : "bg-gradient-to-r from-[#aa7c11] to-[#d4af37] text-black hover:shadow-[0_4px_12px_rgba(170,124,17,0.3)] hover:scale-105"
                } active:scale-95`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatPopIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes msgFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </>
  );
}
