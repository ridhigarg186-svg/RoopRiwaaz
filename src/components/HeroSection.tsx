import React from 'react';
import { ArrowRight, Sparkles, Shield, Award, Gem, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setSelectedSubCategoryFilter } = useStore();

  const handleNavigate = (view: string, category?: any, sub?: any) => {
    setCurrentView(view);
    setSelectedCategoryFilter(category || null);
    setSelectedSubCategoryFilter(sub || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#4A0E17] text-[#FAF7F2]">
      {/* Background Decorative Indian Arch & Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="jharokha" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 C20 15, 10 25, 0 30 C10 35, 20 45, 30 60 C40 45, 50 35, 60 30 C50 25, 40 15, 30 0 Z" fill="none" stroke="#DFBE68" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jharokha)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B1724]/80 border border-[#DFBE68]/40 text-xs font-semibold text-[#DFBE68] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn Bridal & Festive Edition 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15] text-balance">
              Elegance Woven in Every <span className="gold-gradient-text italic font-serif">Tradition.</span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-[#EDE5D8]/90 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover exquisite handwoven Banarasi and Kanjivaram sarees paired with royal Kundan and Polki jewellery, designed for your most cherished weddings and festive moments.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleNavigate('sarees', 'sarees')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#DFBE68] via-[#C59B27] to-[#B3881E] hover:from-[#E6CA7E] hover:to-[#C59B27] text-[#2C1810] font-bold text-sm tracking-wide rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Sarees</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate('jewellery', 'jewellery')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] border border-[#DFBE68]/50 font-semibold text-sm tracking-wide rounded-full backdrop-blur-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Jewellery</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#DFBE68]/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#EDE5D8]/80 text-left">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#DFBE68] shrink-0" />
                <span>100% Pure Silk Mark Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-[#DFBE68] shrink-0" />
                <span>22K Antique Micron Gold Plating</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Truck className="w-4 h-4 text-[#DFBE68] shrink-0" />
                <span>Free Insured Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Dual Card Layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Card: Saree Showcase */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DFBE68]/40 bg-[#3B0918]">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                  alt="RoopRiwaaz Royal Crimson Handloom Saree"
                  className="w-full h-80 sm:h-96 object-cover object-top filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17] via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#4A0E17]/85 backdrop-blur-md border border-[#DFBE68]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#DFBE68] font-bold uppercase tracking-widest block">
                      Featured Masterpiece
                    </span>
                    <h3 className="font-display text-sm font-bold text-[#FAF7F2]">
                      Kashi Darbar Banarasi Katan Silk
                    </h3>
                    <p className="text-xs text-[#EDE5D8]">₹18,500 <span className="line-through text-xs text-[#EDE5D8]/60">₹24,000</span></p>
                  </div>
                  <button
                    onClick={() => handleNavigate('sarees', 'sarees', 'banarasi')}
                    className="p-2.5 bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] rounded-full transition-transform hover:scale-110"
                    title="View Banarasi Saree"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Front Pill: Matching Jewellery Highlight */}
              <div 
                onClick={() => handleNavigate('jewellery', 'jewellery', 'bridal-sets')}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#FAF7F2] text-[#2C1810] p-3.5 rounded-2xl shadow-2xl border border-[#DFBE68] flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform max-w-[260px] sm:max-w-xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80"
                  alt="Matching Kundan Choker"
                  className="w-12 h-12 object-cover rounded-xl border border-[#E2D7C3] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-[#6B1724] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#C59B27]" />
                    <span>Complete The Look</span>
                  </div>
                  <p className="font-display text-xs font-bold truncate">Rajgharana Kundan Choker</p>
                  <p className="text-[11px] text-[#6B1724] font-semibold">₹12,800 · 22K Gold Plated</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Secondary Promotional Banner for Bridal & Festive Collections */}
      <div className="border-t border-[#DFBE68]/20 bg-[#3B0918]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DFBE68] animate-ping" />
              <div>
                <p className="text-sm font-semibold text-[#DFBE68] tracking-wide">
                  The Royal Rajputana Bridal & Festive Curations Are Live
                </p>
                <p className="text-xs text-[#EDE5D8]/80">
                  Custom blouse tailoring, complimentary matching potli bag & express insurance on every bridal ensemble.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleNavigate('bridal')}
                className="px-5 py-2 text-xs font-semibold rounded-full bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] transition-colors"
              >
                Explore Bridal Suite
              </button>
              <button
                onClick={() => handleNavigate('offers')}
                className="px-5 py-2 text-xs font-semibold rounded-full border border-[#DFBE68]/60 text-[#DFBE68] hover:bg-[#DFBE68]/10 transition-colors"
              >
                View Coupon Codes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
