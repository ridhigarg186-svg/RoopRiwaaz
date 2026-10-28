import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Check, 
  Heart,
  BarChart3,
  Package,
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setSelectedSubCategoryFilter, showToast, products, orders } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNav = (view: string, cat?: any, sub?: any) => {
    setCurrentView(view);
    setSelectedCategoryFilter(cat || null);
    setSelectedSubCategoryFilter(sub || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    showToast('Welcome to the RoopRiwaaz Inner Circle. Enjoy 10% off your next creation with code ROOP10.', 'success');
  };

  return (
    <footer className="bg-[#3B0918] text-[#EDE5D8] border-t-2 border-[#DFBE68]/40 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Brand Promise Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#4A0E17] to-[#2B0611] border border-[#DFBE68]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#DFBE68] font-bold flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The RoopRiwaaz Gazette</span>
            </span>
            <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
              Join the Patrons of Heritage Fashion
            </h3>
            <p className="text-xs text-[#EDE5D8]/80 max-w-md">
              Receive private bridal previews, seasonal master weaver stories, and exclusive patron privileges.
            </p>
          </div>

          <div className="lg:col-span-6">
            {isSubscribed ? (
              <div className="p-3 bg-[#1C4A34]/20 border border-[#1C4A34] text-[#DFBE68] rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are subscribed! Use coupon ROOP10 at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email for 10% privilege code"
                  className="flex-1 px-4 py-3 rounded-xl border border-[#DFBE68]/40 bg-[#FAF7F2] text-[#2C1810] text-xs placeholder-[#8C7A6B] focus:outline-none focus:border-[#DFBE68]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* DEDICATED ADMIN DASHBOARD MANAGEMENT SECTION IN FOOTER */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#2B0611] border-2 border-[#DFBE68]/50 shadow-2xl relative overflow-hidden">
          {/* Subtle Royal Watermark Texture */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <Lock className="w-48 h-48 text-[#DFBE68]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFBE68]/15 border border-[#DFBE68]/40 text-[#DFBE68] text-[10px] font-bold uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5" />
                <span>Store Administration & Control Center</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                RoopRiwaaz Protected Admin Dashboard
              </h3>
              <p className="text-xs text-[#EDE5D8]/80 leading-relaxed max-w-2xl">
                Manage live handloom sarees & jewellery inventory, adjust stock and pricing, monitor customer orders and real-time transit fulfillment, configure discount coupons, moderate customer reviews, and customize the AI Fashion Stylist.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#DFBE68] pt-2">
                <span className="flex items-center gap-1.5 bg-[#4A0E17] px-2.5 py-1 rounded-md border border-[#DFBE68]/30">
                  <Package className="w-3.5 h-3.5" />
                  <strong>{products.length} Products Live</strong>
                </span>
                <span className="flex items-center gap-1.5 bg-[#4A0E17] px-2.5 py-1 rounded-md border border-[#DFBE68]/30">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <strong>{orders.length} Active Orders</strong>
                </span>
                <span className="text-[#EDE5D8]/70">
                  Demo Credentials: <code className="text-[#DFBE68]">admin@roopriwaaz.com</code> / <code className="text-[#DFBE68]">admin123</code>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 justify-center">
              <button
                onClick={() => handleNav('admin')}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#DFBE68] via-[#C59B27] to-[#B3881E] hover:from-[#E6CA7E] hover:to-[#C59B27] text-[#2C1810] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Lock className="w-4 h-4 text-[#2C1810] group-hover:scale-110 transition-transform" />
                <span>Launch Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Brand & Craftsmanship */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B1724] to-[#4A0E17] flex items-center justify-center border border-[#DFBE68]/50 text-[#DFBE68]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-royal text-2xl font-bold text-[#DFBE68] tracking-wider block">
                  RoopRiwaaz
                </span>
                <span className="text-[10px] text-[#EDE5D8]/80 tracking-widest uppercase">
                  Wear Your Tradition, Define Your Elegance.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#EDE5D8]/75 leading-relaxed pr-4">
              Born from a reverence for India’s handloom marvels and royal regalia. Every Banarasi weave is created thread by thread on Varanasi pitlooms, and every jewel set is hand-lacquered with pure 22K antique gold dip and Basra pearls.
            </p>

            <div className="space-y-1.5 text-[11px] text-[#EDE5D8]/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFBE68] shrink-0" />
                <span>Heritage Flagship: 14, Royal Palace Road, Jaipur 302001, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DFBE68] shrink-0" />
                <span>Concierge: +91 (022) 8492-9100 · Mon–Sat 10:00 AM – 7:00 PM IST</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DFBE68] shrink-0" />
                <span>concierge@roopriwaaz.com</span>
              </p>
            </div>
          </div>

          {/* Column 2: Sarees Collection */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#DFBE68] tracking-wider">
              Handloom Sarees
            </h4>
            <ul className="space-y-2 text-[#EDE5D8]/80">
              <li>
                <button onClick={() => handleNav('sarees', 'sarees', 'banarasi')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Banarasi Katan Silk
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sarees', 'sarees', 'silk')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Kanchipuram Zari Silk
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sarees', 'sarees', 'organza')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Pure Tissue Organza
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sarees', 'sarees', 'designer')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Jaipuri Gota Patti
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sarees', 'sarees', 'cotton')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Chanderi Soft Handloom
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sarees', 'sarees', 'party')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Micro Velvet Party Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bridal')} className="hover:text-[#DFBE68] transition-colors font-semibold text-[#DFBE68] cursor-pointer">
                  Royal Rajputana Bridal Sarees
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Jewellery Collection */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#DFBE68] tracking-wider">
              Heritage Jewellery
            </h4>
            <ul className="space-y-2 text-[#EDE5D8]/80">
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'bridal-sets')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Bridal Choker Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'kundan-polki')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Nizam Uncut Polki & Haslis
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'earrings-jhumkas')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Meenakari Peacock Chandbalis
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'necklaces')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Heritage Guttapusalu Malas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'bangles')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Temple Kada Bangles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'pearl')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Freshwater Basra Pearls
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jewellery', 'jewellery', 'everyday')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Everyday Gold-Plated Classics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services & Quick Links (Includes Admin Dashboard Link) */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#DFBE68] tracking-wider">
              Business & Quick Links
            </h4>
            <ul className="space-y-2 text-[#EDE5D8]/80">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  About Our Weavers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Contact Royal Concierge
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Track Order Shipment
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('offers')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  Festive Offers & Codes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-[#DFBE68] transition-colors cursor-pointer">
                  7-Day Returns & Exchanges
                </button>
              </li>
              <li className="pt-2 border-t border-[#DFBE68]/20">
                {/* Admin Dashboard link */}
                <button
                  onClick={() => handleNav('admin')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#DFBE68] hover:text-white transition-colors cursor-pointer group"
                  title="Protected Admin Portal"
                >
                  <Lock className="w-3.5 h-3.5 text-[#DFBE68] group-hover:scale-110 transition-transform" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Partner Logos & Bottom Bar */}
        <div className="pt-8 border-t border-[#DFBE68]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#EDE5D8]/70">
          <div>
            <p>© 2026 RoopRiwaaz India Private Limited. All Rights Reserved.</p>
            <p className="text-[10px] text-[#EDE5D8]/50 mt-0.5">
              Silk Mark India Registered · 22K Micro Gold Micron Hallmarked · Handloom Certified
            </p>
          </div>

          {/* Supported Indian Payment badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-[#DFBE68] font-bold uppercase tracking-wider">Payment Partners:</span>
            {['UPI (GPay / PhonePe)', 'RuPay', 'Visa', 'Mastercard', 'Net Banking', 'Cash on Delivery'].map((m, i) => (
              <span key={i} className="px-2 py-0.5 bg-[#4A0E17] border border-[#DFBE68]/30 rounded text-[#FAF7F2] text-[10px] font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
