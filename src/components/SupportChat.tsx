/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Sparkles, Building2, UserCheck, ShieldAlert } from 'lucide-react';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Greetings. Welcome to Moon Bangladesh Limited. I am your Executive Concierge. How may I assist you with our luxury properties or joint-venture partnerships today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Predefined prompts mapping
  const quickPrompts = [
    { label: 'Earthquake Safety?', query: 'Tell me about your earthquake safety standards and construction quality.' },
    { label: 'Where is Horizon?', query: 'Where is Moon Skyline Horizon located and what is its price?' },
    { label: 'Share my Land?', query: 'I am a landowner. How do I joint-venture with Moon Group?' },
    { label: 'Loan Facility?', query: 'Do you offer home loan partnership options?' }
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate concierge professional response
    setTimeout(() => {
      let botResponseText = '';
      const t = textToSend.toLowerCase();

      if (t.includes('earthquake') || t.includes('safety') || t.includes('quality') || t.includes('material')) {
        botResponseText = 'At Moon Bangladesh Limited, structural safety is our unyielding commitment. All our buildings are engineered for seismic Zone 3 (Dhaka region maximum standard) and designed to withstand winds up to 210 km/h. We exclusively use Grade-72.5 deformed bars, top-tier durable Portland cement (BSRM/AKS and equivalent), and high-grade ready-mix concrete tested extensively in independent laboratories.';
      } else if (t.includes('horizon') || t.includes('skyline') || t.includes('gulshan')) {
        botResponseText = 'Moon Skyline Horizon is our crowning luxury ongoing residential tower located at Road 54, Gulshan 2, Dhaka. It features spacious 3,250 to 4,800 Sft apartments, starting from Tk 6.5 to 9.8 Crore. Highlights include a private lakeside infinity pool, sky deck, smart automation systems, and triple-basement secure parking.';
      } else if (t.includes('land') || t.includes('joint') || t.includes('partner') || t.includes('venture') || t.includes('share')) {
        botResponseText = 'For esteemed landowners, Moon Group offers a highly lucrative and seamless Joint Venture program. We handle all approvals from RAJUK/CDA, offer premium signing bonuses, optimize the build allocation ratio, and bind the project timeline with bank guarantees. You can submit your plot measurements in our "Partner With Us" section on this website, and our Joint Venture director will arrange a feasibility meeting.';
      } else if (t.includes('loan') || t.includes('finance') || t.includes('partner')) {
        botResponseText = 'Yes, we maintain strong corporate strategic partnerships with all major financial institutions in Bangladesh, including IPDC Finance, Delta Brac Housing (DBH), IDLC, Mutual Trust Bank, and City Bank. This ensures our clients receive fast-tracked, low-interest home loans with quick processing and customized repayment structures.';
      } else if (t.includes('contact') || t.includes('phone') || t.includes('call') || t.includes('number')) {
        botResponseText = 'You can reach our corporate headquarters at +880 2-9891234, or speak to our Head of Sales directly at +880 179-9992222. You can also visit our Corporate Suites at Moon Tower, Gulshan Avenue, Dhaka.';
      } else {
        botResponseText = 'Thank you for your message. Your inquiry has been routed to our Senior Sales Director. If you would like immediate assistance, please use our private "Schedule Visit" module above to arrange an in-person meeting or call us directly at +880 179-9992222.';
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Action Button */
          <motion.button
            key="chat-fab"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="p-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-luxury-charcoal rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-gold-300/30 group"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out font-sans text-xs uppercase tracking-widest font-bold whitespace-nowrap pl-0 group-hover:pl-2">
              Concierge
            </span>
          </motion.button>
        ) : (
          /* Chat Window Card */
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[320px] sm:w-[380px] h-[500px] bg-luxury-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col justify-between font-sans"
          >
            {/* Header */}
            <div className="bg-luxury-slate py-4 px-5 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-gradient-to-br from-gold-400 to-gold-600 rounded text-luxury-charcoal">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide">MBL Concierge</h4>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-slow" />
                    <span className="text-[10px] text-slate-400 font-sans font-medium">Active Director Channel</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Messages Container Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-luxury-beige/40"
            >
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded p-3 text-xs leading-relaxed font-sans ${
                        isBot
                          ? 'bg-luxury-slate text-white border border-white/5 shadow-sm'
                          : 'bg-gold-500 text-luxury-charcoal rounded-br-none font-semibold shadow-md'
                      }`}
                    >
                      {/* Message Text */}
                      <p>{msg.text}</p>
                      
                      {/* Meta info inside message card */}
                      <div className={`mt-1.5 flex items-center justify-between opacity-50 text-[9px] font-mono ${isBot ? 'text-slate-400' : 'text-luxury-charcoal/80'}`}>
                        <span>{isBot ? 'Moon Director' : 'You'}</span>
                        <span>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bot typing loader state */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-luxury-slate border border-white/5 p-3 rounded shadow-sm text-xs text-slate-400 flex items-center space-x-1.5 font-mono">
                    <Sparkles className="w-3 h-3 text-gold-400 animate-spin" />
                    <span>Executive is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Footer controls & Text Entry */}
            <div className="p-3 bg-luxury-charcoal border-t border-white/10">
              {/* Predefined prompts helper slider */}
              <div className="flex space-x-1.5 overflow-x-auto pb-2.5 mb-2.5 border-b border-white/10 scrollbar-none scroll-smooth">
                {quickPrompts.map((p, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(p.query)}
                    className="px-2.5 py-1 bg-luxury-beige border border-white/5 text-slate-300 rounded text-[10px] whitespace-nowrap hover:bg-gold-500 hover:border-gold-500 hover:text-luxury-charcoal font-sans tracking-wide transition-all cursor-pointer shrink-0 font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Text Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="Ask about properties, pricing, land..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-gold-500 text-luxury-charcoal hover:bg-gold-400 rounded transition-colors flex items-center justify-center cursor-pointer font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
