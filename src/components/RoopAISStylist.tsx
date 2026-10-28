import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ShoppingBag, 
  ArrowRight, 
  RefreshCw, 
  Bot, 
  User, 
  Check, 
  Maximize2, 
  Minimize2,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendedProducts?: Product[];
  stylingTips?: string[];
  followUpSuggestions?: string[];
  mode?: string;
}

export const RoopAISStylist: React.FC = () => {
  const {
    isAiStylistOpen,
    setIsAiStylistOpen,
    products,
    selectedProduct,
    setSelectedProduct,
    setCurrentView,
    addToCart,
    showToast
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Namaste! I am your personal Roop AI Stylist. Whether you are looking for an imperial Banarasi wedding saree, matching Rajasthani Kundan jewellery, or curated cocktail wear, I am here to assist your royal ensemble.',
      stylingTips: [
        'Ask me to match authentic jewellery with any saree.',
        'Specify your budget, colour preference, or occasion.'
      ],
      followUpSuggestions: [
        'Find my wedding look',
        'Suggest jewellery under ₹2,000',
        'Match jewellery with my saree',
        'Cocktail party organza sarees'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAiStylistOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiStylistOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          selectedProductId: selectedProduct?.id
        })
      });

      const data = await response.json();

      // Find full product details from catalogue based on recommended IDs
      const matchingProds = (data.recommendedProductIds || [])
        .map((id: string) => products.find(p => p.id === id))
        .filter(Boolean) as Product[];

      const assistantMsg: ChatMessage = {
        id: `resp-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Here are my top royal styling recommendations for you:',
        recommendedProducts: matchingProds,
        stylingTips: data.stylingTips,
        followUpSuggestions: data.followUpSuggestions,
        mode: data.mode
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      // Fallback response
      const fallbackProds = products.slice(0, 2);
      const assistantMsg: ChatMessage = {
        id: `resp-${Date.now()}`,
        sender: 'assistant',
        text: 'For royal Indian elegance, our handloom Banarasi silk sarees paired with antique 22K Kundan jewellery create an unforgettable presence.',
        recommendedProducts: fallbackProds,
        stylingTips: ['Opt for high-contrast jewellery with monochrome saree borders.'],
        followUpSuggestions: ['Find my wedding look', 'Suggest jewellery under ₹2,000']
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    setIsAiStylistOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <>
      {/* Fixed Floating Bottom-Right Trigger Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <button
          onClick={() => setIsAiStylistOpen(!isAiStylistOpen)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
            isAiStylistOpen
              ? 'bg-[#3B0918] text-[#DFBE68] border border-[#DFBE68]'
              : 'bg-gradient-to-r from-[#4A0E17] via-[#6B1724] to-[#4A0E17] text-[#FAF7F2] border-2 border-[#DFBE68]/70 hover:border-[#DFBE68]'
          }`}
          aria-label="Open Roop AI Stylist"
        >
          <div className="w-6 h-6 rounded-full bg-[#DFBE68]/20 flex items-center justify-center text-[#DFBE68] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold font-royal text-[#DFBE68] tracking-wider leading-none">
              Roop AI Stylist
            </span>
            <span className="text-[10px] text-[#EDE5D8] leading-none opacity-90 hidden sm:block">
              Royal Fashion Advisor
            </span>
          </div>
        </button>
      </div>

      {/* Modern Floating Chat Panel */}
      {isAiStylistOpen && (
        <div className="fixed bottom-36 md:bottom-20 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[550px] max-h-[80vh] z-50 bg-[#FAF7F2] rounded-2xl shadow-2xl border-2 border-[#DFBE68]/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] flex items-center justify-between border-b border-[#DFBE68]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DFBE68]/20 border border-[#DFBE68]/50 flex items-center justify-center text-[#DFBE68]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-royal text-sm font-bold text-[#DFBE68]">
                  Roop AI Fashion Stylist
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-[#EDE5D8]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Ethnic Consultant</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAiStylistOpen(false)}
              className="p-1 text-[#EDE5D8] hover:text-white rounded-md hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#4A0E17] text-[#DFBE68] flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-[#4A0E17] text-[#FAF7F2] p-3 rounded-2xl rounded-tr-xs text-xs'
                    : 'bg-white text-[#2C1810] p-3.5 rounded-2xl rounded-tl-xs border border-[#E2D7C3] shadow-xs text-xs'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>

                  {/* Styling Tips */}
                  {msg.stylingTips && msg.stylingTips.length > 0 && (
                    <div className="pt-2 border-t border-[#F4EFE6] space-y-1 text-[11px] text-[#6B7280]">
                      <p className="font-bold text-[#4A0E17]">Stylist Advice:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        {msg.stylingTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended Products Showcase Cards */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <p className="text-[11px] font-bold text-[#4A0E17] uppercase tracking-wider">
                        Recommended from Treasury:
                      </p>
                      <div className="space-y-2">
                        {msg.recommendedProducts.map(p => (
                          <div
                            key={p.id}
                            className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E2D7C3] flex items-center gap-2.5 hover:border-[#C59B27] transition-all"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-14 object-cover rounded-lg border border-[#E2D7C3] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 
                                onClick={() => handleProductClick(p)}
                                className="font-display font-semibold text-xs text-[#2C1810] truncate hover:text-[#6B1724] cursor-pointer"
                              >
                                {p.name}
                              </h5>
                              <p className="text-[11px] font-bold text-[#6B1724] tabular-nums">
                                ₹{p.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <button
                              onClick={() => handleQuickAdd(p)}
                              className="p-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-lg transition-transform hover:scale-105 shrink-0"
                              title="Add to Shopping Bag"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mode tag */}
                  {msg.mode && (
                    <div className="text-[9px] text-[#8C7A6B] text-right pt-1">
                      {msg.mode === 'gemini-live' ? '⚡ Powered by Gemini 3.8' : '✨ Roop Royal Engine'}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#8C7A6B] p-2 bg-white rounded-xl border border-[#E2D7C3] w-max">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C59B27]" />
                <span>Consulting royal catalogue & fabric weave archive...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-[#F4EFE6] border-t border-[#E2D7C3] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              'Find my wedding look',
              'Suggest jewellery under ₹2,000',
              'Match jewellery with my saree',
              'Cocktail party organza'
            ].map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] bg-white hover:bg-[#FAF7F2] text-[#4A0E17] border border-[#E2D7C3] hover:border-[#C59B27] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E2D7C3]">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask e.g. What jewellery matches a maroon saree?"
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#E2D7C3] bg-[#FAF7F2] focus:outline-none focus:border-[#C59B27]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-[#4A0E17] hover:bg-[#6B1724] disabled:opacity-40 text-[#DFBE68] rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
