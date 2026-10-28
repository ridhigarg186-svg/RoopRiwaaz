import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { AdminDashboard } from './components/AdminDashboard';
import { RoopAISStylist } from './components/RoopAISStylist';
import { AdminFloatingButton } from './components/AdminFloatingButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { OffersView } from './components/OffersView';
import { Order } from './types';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, setSelectedCategoryFilter, setSelectedSubCategoryFilter, toasts } = useStore();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleOrderPlaced = (order: Order) => {
    setConfirmedOrder(order);
  };

  const handleNavigate = (view: string, cat?: any, sub?: any) => {
    setCurrentView(view);
    setSelectedCategoryFilter(cat || null);
    setSelectedSubCategoryFilter(sub || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col font-sans relative selection:bg-[#4A0E17] selection:text-[#DFBE68]">
      
      {/* Top Navbar */}
      {currentView !== 'admin' && <Navbar />}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Saree Collection Strip */}
            <div className="border-b border-[#E2D7C3]/80">
              <ProductGrid 
                forcedCategory="sarees"
                title="The Saree Treasury"
                subtitle="From Varanasi Kadwa brocades to Kanchipuram zari, explore authentic handlooms woven by master artisans."
              />
              <div className="text-center pb-12">
                <button
                  onClick={() => handleNavigate('sarees', 'sarees')}
                  className="px-8 py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-full text-xs font-bold tracking-wide shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Complete Saree Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Artisanal Royal Campaign Spotlight */}
            <section className="py-16 bg-[#F4EFE6] border-b border-[#E2D7C3]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] border-2 border-[#DFBE68]/50 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs uppercase tracking-widest text-[#DFBE68] font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#DFBE68]" />
                      <span>Artisanal Heritage Guarantee</span>
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F2] leading-tight">
                      Crafted by Fourth-Generation Weavers & Jaipur Royal Jewellers
                    </h2>
                    <p className="text-xs sm:text-sm text-[#EDE5D8]/90 leading-relaxed max-w-xl">
                      Every Banarasi Kadwa motif is hand-woven on historic pitlooms. Our jewellery sets are treated with 22K antique micron gold plating, natural Basra seed pearls, and genuine Meenakari lacquer on the reverse.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#DFBE68]">
                      <span>✓ 100% Tested Silk Mark</span>
                      <span>✓ Free Insured Delivery</span>
                      <span>✓ 7-Day Hassle-Free Returns</span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex justify-center">
                    <button
                      onClick={() => handleNavigate('bridal')}
                      className="px-8 py-4 bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] font-bold text-sm tracking-wide rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer"
                    >
                      Explore Royal Bridal Trousseau
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Dedicated Jewellery Showcase */}
            <div className="border-b border-[#E2D7C3]/80">
              <ProductGrid 
                forcedCategory="jewellery"
                title="Heirloom Royal Jewellery"
                subtitle="22K antique gold-plated Kundan chokers, Basra pearl malas, and Rajasthani Chandbalis."
              />
              <div className="text-center pb-12">
                <button
                  onClick={() => handleNavigate('jewellery', 'jewellery')}
                  className="px-8 py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-full text-xs font-bold tracking-wide shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore All Heritage Jewellery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'sarees' && (
          <ProductGrid forcedCategory="sarees" />
        )}

        {currentView === 'jewellery' && (
          <ProductGrid forcedCategory="jewellery" />
        )}

        {currentView === 'bridal' && (
          <ProductGrid 
            isBridalOnly={true}
            title="The Royal Rajputana Bridal Treasury"
            subtitle="Regal Banarasi Kadwa silks, Kanjivaram pure zari drapes, and 22K Kundan & Basra pearl bridal sets."
          />
        )}

        {currentView === 'new-arrivals' && (
          <ProductGrid 
            title="Fresh Autumn New Arrivals"
            subtitle="Latest handloom drops fresh from the master looms of Varanasi and Rajasthan."
          />
        )}

        {currentView === 'best-sellers' && (
          <ProductGrid 
            title="Most Celebrated Best Sellers"
            subtitle="Timeless classics cherished by thousands of Indian brides and festive connoisseurs."
          />
        )}

        {currentView === 'offers' && <OffersView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'account' && <AccountModal />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Right-Side AI Assistant (Roop AI Stylist) */}
      {currentView !== 'admin' && <RoopAISStylist />}

      {/* Floating Left-Side Bottom Corner Admin Dashboard Button */}
      {currentView !== 'admin' && <AdminFloatingButton />}

      {/* Mobile Fixed Bottom Navigation Bar */}
      {currentView !== 'admin' && <MobileBottomNav />}

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Full Checkout Modal */}
      <CheckoutModal onOrderPlaced={handleOrderPlaced} />

      {/* Order Confirmed Success Modal */}
      <OrderSuccessModal 
        order={confirmedOrder} 
        onClose={() => setConfirmedOrder(null)} 
      />

      {/* Customer Auth Modal (Login / Register / Forgot) */}
      <AuthModal />

      {/* Footer (with distinct Admin Dashboard link) */}
      {currentView !== 'admin' && <Footer />}

      {/* Toast Notification Stack */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-3.5 rounded-xl shadow-xl border text-xs font-semibold backdrop-blur-md transition-all animate-in slide-in-from-top-2 duration-200 pointer-events-auto ${
              toast.type === 'error'
                ? 'bg-rose-900/95 text-white border-rose-700'
                : toast.type === 'info'
                ? 'bg-[#3B0918]/95 text-[#EDE5D8] border-[#DFBE68]/40'
                : 'bg-[#4A0E17]/95 text-[#DFBE68] border-[#DFBE68]/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DFBE68] shrink-0" />
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
