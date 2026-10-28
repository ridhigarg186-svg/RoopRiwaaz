import React from 'react';
import { Sparkles, Award, Heart, Shield, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C59B27] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The RoopRiwaaz Heritage</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#4A0E17] leading-tight">
            “Wear Your Tradition, Define Your Elegance.”
          </h1>
          <p className="text-sm sm:text-base text-[#8C7A6B] leading-relaxed">
            RoopRiwaaz was established to honour the timeless legacy of Indian handloom weaving and royal jewel craftsmanship. Each creation is an heirloom woven with devotion, dignity, and cultural grace.
          </p>
        </div>

        {/* Story Section 1: Varanasi Ghats & Pitlooms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-xl border border-[#E2D7C3]">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
              alt="Varanasi Master Handloom Weavers"
              className="w-full h-80 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#6B1724] font-bold">Chapter I</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#4A0E17]">
              The Sacred Weaves of Kashi
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810] leading-relaxed">
              In the narrow galis of Varanasi, fourth-generation weaver families manipulate hundreds of spools of pure silk and tested gold zari on wooden pitlooms. A single bridal Kadwa Banarasi saree requires between 18 to 45 days of rhythmic human choreography. There are no shortcuts; each floral jaal is individually hand-locked into the warp.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#4A0E17] font-semibold">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C59B27]" />
                <span>Silk Mark India Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C59B27]" />
                <span>Fair Living Wages to Artisans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section 2: Jaipur Royal Kundan & Jadau */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:order-2 rounded-2xl overflow-hidden shadow-xl border border-[#E2D7C3]">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
              alt="Jaipur Royal Kundan Jadau Craft"
              className="w-full h-80 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 lg:order-1 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#6B1724] font-bold">Chapter II</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#4A0E17]">
              The Jadau Royal Regalia of Rajasthan
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1810] leading-relaxed">
              Our jewellery ateliers in Jaipur keep the 500-year-old art of Kundan and Meenakari alive. Pure gold foils (kundan) are burnished around raw uncut glass stones and spinels, while the reverse is adorned with vivid enamelling painted with fine squirrel-hair brushes. Finished with clusters of Basra seed pearls, our ornaments carry the spirit of Rajputana maharanis.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#4A0E17] font-semibold">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C59B27]" />
                <span>22K Antique Micron Gold Plating</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <span>Hypoallergenic Skin Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-[#4A0E17] text-[#FAF7F2] text-center max-w-2xl mx-auto space-y-4 shadow-xl">
          <h3 className="font-display text-2xl font-bold text-[#DFBE68]">
            Experience The Treasury In Person
          </h3>
          <p className="text-xs text-[#EDE5D8]">
            Explore our curated collections of pure silks and heirloom ornaments ready for express delivery to your doorstep.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setCurrentView('sarees');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              Explore Saree Treasury
            </button>
            <button
              onClick={() => {
                setCurrentView('jewellery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 border border-[#DFBE68] text-[#DFBE68] hover:bg-white/10 rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              Explore Jewellery
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
