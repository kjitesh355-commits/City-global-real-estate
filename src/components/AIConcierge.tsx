import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User, MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { ChatMessage } from "../types";

interface AIConciergeProps {
  theme: "light" | "dark";
}

export default function AIConcierge({ theme }: AIConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Welcome to City Global Real Estate. I am your elite AI Real Estate Consultant. Ask me anything about Dubai property yields, Golden Visa regulations, premium neighborhoods, or investment ROI models."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    "Best investment under AED 5M?",
    "Compare Downtown vs Dubai Marina",
    "Show me off plan projects",
    "Book a property viewing"
  ];

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputValue("");
    setIsOpen(true); // Open panel to show answer stream
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to consult AI. Please try again.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Apologies, I encountered a connection issue. Please ensure your GEMINI_API_KEY is configured." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (chip: string) => {
    let customQuestion = "";
    if (chip === "Best investment under AED 5M?") {
      customQuestion = "What are the absolute best investment properties under AED 5 Million in Dubai right now in terms of capital appreciation and high rental yields?";
    } else if (chip === "Compare Downtown vs Dubai Marina") {
      customQuestion = "Can you compare Downtown Dubai and Dubai Marina for a real estate investor? Please contrast current average rental yields, capital appreciation trends, and occupant demographics.";
    } else if (chip === "Show me off plan projects") {
      customQuestion = "Which off-plan projects in Dubai are currently attracting the most smart institutional investment, and what are their estimated completion dates?";
    } else if (chip === "Book a property viewing") {
      customQuestion = "I would like to schedule a private viewing for one of your luxury beachfront properties. What is the process and what documents are required for non-resident investors?";
    }

    handleSendMessage(customQuestion);
  };

  return (
    <>
      {/* Floating Chat Trigger Bar (matching picture layout exactly) */}
      <div className="fixed bottom-6 left-4 right-4 sm:left-12 sm:right-12 z-40">
        <div className={`w-full rounded-full px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl border transition-all duration-300 ${
          theme === "dark"
            ? "glass border-[#d4af37]/30"
            : "bg-white/95 border-[#aa7c11]/30 text-stone-800"
        }`}>
          
          {/* AI Indicator */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex items-center gap-3 w-full md:w-auto text-left"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#aa7c11] to-[#d4af37] flex items-center justify-center overflow-hidden shadow-lg">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 animate-pulse ${
                theme === "dark" ? "border-black" : "border-white"
              }`} />
            </div>
            <div>
              <h4 className={`font-serif text-sm font-semibold flex items-center gap-1.5 leading-none mb-1 transition-colors duration-300 ${
                theme === "dark" ? "text-[#f3e5ab]" : "text-stone-900"
              }`}>
                AI Concierge
                {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronUp className="w-3.5 h-3.5 text-gray-500" />}
              </h4>
              <span className="font-sans text-[10px] text-emerald-500 font-semibold tracking-widest uppercase">Online &amp; Active</span>
            </div>
          </button>

          {/* Quick prompt chips (hidden on tiny screens) */}
          {!isOpen && (
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto max-w-full">
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className={`cursor-pointer border text-[10px] font-sans px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    theme === "dark"
                      ? "bg-[#171a24] hover:bg-[#d4af37]/15 border-gray-800 hover:border-[#d4af37]/30 text-gray-300"
                      : "bg-[#fcfaf7] hover:bg-[#aa7c11]/10 border-stone-200 hover:border-[#aa7c11]/30 text-stone-700"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Inline mini typing bar */}
          <div className="w-full md:flex-1 max-w-lg relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              placeholder="Ask me anything about Dubai Real Estate..."
              className={`w-full rounded-full pl-5 pr-12 py-2.5 text-xs transition-all duration-300 border focus:outline-none focus:border-[#d4af37] font-sans ${
                theme === "dark"
                  ? "bg-black/40 border-gray-800 text-white placeholder-gray-500"
                  : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
              }`}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="cursor-pointer absolute right-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black hover:brightness-110 active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Slide-Up Chat Panel (Drawer Console) */}
      {isOpen && (
        <div className={`fixed bottom-26 left-4 right-4 sm:left-12 sm:right-12 z-40 max-w-lg ml-auto rounded-xl border shadow-2xl flex flex-col h-[400px] overflow-hidden animate-in slide-in-from-bottom-6 duration-300 backdrop-blur-xl transition-all ${
          theme === "dark"
            ? "glass border-[#d4af37]/35 text-white"
            : "bg-white border-[#aa7c11]/35 text-stone-800 shadow-2xl"
        }`}>
          
          {/* Header Panel */}
          <div className={`px-4 py-3 flex justify-between items-center border-b transition-colors duration-300 ${
            theme === "dark" ? "bg-[#12141c] border-gray-900" : "bg-stone-50 border-stone-200"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa7c11] flex items-center justify-center text-black">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div className="text-left">
                <h4 className={`font-serif text-xs font-bold leading-none mb-0.5 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
                }`}>Global Elite Consultant</h4>
                <p className={`text-[9px] font-sans transition-colors duration-300 ${theme === "dark" ? "text-gray-500" : "text-stone-400"}`}>Empowered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 transition-colors ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-stone-400 hover:text-stone-900"}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt Chips in drawer */}
          <div className={`flex gap-1.5 p-3 overflow-x-auto border-b transition-colors duration-300 ${
            theme === "dark" ? "bg-[#07080a]/50 border-gray-900/50" : "bg-stone-100/50 border-stone-200"
          }`}>
            {promptChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className={`cursor-pointer border text-[9px] font-sans px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                  theme === "dark"
                    ? "bg-[#171a24] border-gray-900 text-gray-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-[#aa7c11]/10 hover:border-[#aa7c11]/30"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Conversation stream */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 text-xs">
            {messages.map((msg, index) => {
              const isAI = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 max-w-[85%] ${isAI ? "self-start text-left" : "self-end flex-row-reverse text-right"}`}
                >
                  {/* Icon */}
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isAI ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30" : "bg-gray-800 text-gray-300"
                  }`}>
                    {isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble */}
                  <div className={`p-3 rounded-lg leading-relaxed font-sans whitespace-pre-wrap border ${
                    isAI
                      ? (theme === "dark" ? "bg-[#171a24] text-gray-200 border-gray-900" : "bg-stone-50 text-stone-800 border-stone-100")
                      : "bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black font-semibold border-transparent"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {/* Loading placeholder */}
            {isLoading && (
              <div className="flex gap-2.5 self-start text-left max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className={`p-3 rounded-lg border flex items-center gap-1.5 font-sans italic ${
                  theme === "dark" ? "bg-[#171a24] text-gray-400 border-gray-900" : "bg-stone-50 text-stone-500 border-stone-100"
                }`}>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Drafting investment audit...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

        </div>
      )}
    </>
  );
}
