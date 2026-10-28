import React from 'react';
import { Tag, Sparkles, Copy, Check, Gift, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OffersView: React.FC = () => {
  const { coupons, applyCoupon, showToast, setCurrentView } = useStore();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    showToast(`Coupon ${code} copied and applied to your shopping bag!`, 'success');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C59B27] font-bold">
            Patron Privileges & Celebrations
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#4A0E17]">
            Festive Offers & Exclusive Coupons
          </h1>
          <p className="text-xs sm:text-sm text-[#8C7A6B]">
            Enjoy privileged seasonal savings on our handwoven Banarasi silks, Kanjivarams, and handcrafted 22K gold plated jewellery.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map(coupon => (
            <div
              key={coupon.code}
              className="p-6 bg-white rounded-2xl border-2 border-[#DFBE68]/60 shadow-md relative overflow-hidden flex flex-col justify-between space-y-4 hover:shadow-xl transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1724] bg-[#F4EFE6] px-2.5 py-1 rounded">
                    Festive Reward
                  </span>
                  <span className="text-lg font-black text-[#1C4A34]">
                    {coupon.discountPercent}% OFF
                  </span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-dashed border-[#DFBE68] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C7A6B] block">COUPON CODE</span>
                    <span className="font-mono text-base font-extrabold text-[#4A0E17] tracking-wider">
                      {coupon.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className="p-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Copy & Apply"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </button>
                </div>

                <p className="text-xs text-[#2C1810] leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F4EFE6] text-[11px] text-[#8C7A6B] flex items-center justify-between">
                <span>Min Order: ₹{coupon.minOrderValue.toLocaleString('en-IN')}</span>
                <span>Max Discount: ₹{coupon.maxDiscount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Complimentary Privileges Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] border border-[#DFBE68]/40 shadow-md flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#DFBE68]/20 border border-[#DFBE68] flex items-center justify-center text-[#DFBE68] shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-royal text-base font-bold text-[#DFBE68]">
                Complimentary Imperial Velvet Gift Box
              </h3>
              <p className="text-xs text-[#EDE5D8]/90 leading-relaxed">
                Every saree and bridal jewellery order includes our signature burgundy velvet gift casing, complete with tissue preservation wrap and authenticated seal.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] border border-[#DFBE68]/40 shadow-md flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#DFBE68]/20 border border-[#DFBE68] flex items-center justify-center text-[#DFBE68] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-royal text-base font-bold text-[#DFBE68]">
                Free Insured Express Delivery Above ₹999
              </h3>
              <p className="text-xs text-[#EDE5D8]/90 leading-relaxed">
                Enjoy complimentary insured BlueDart courier transit on all orders exceeding ₹999 anywhere across India, delivered safely within 2–4 business days.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
