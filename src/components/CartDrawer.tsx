import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartFinalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    setIsCheckoutModalOpen,
    setCurrentView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#E2D7C3] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E2D7C3] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4A0E17]" />
              <h2 className="font-display text-lg font-bold text-[#4A0E17]">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#8C7A6B] hover:text-[#4A0E17] rounded-full hover:bg-[#F4EFE6] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#4A0E17] text-[#FAF7F2] px-5 py-3 text-xs">
            {amountToFreeShipping > 0 ? (
              <div>
                <p className="text-center font-medium">
                  Add <strong className="text-[#DFBE68]">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="text-[#DFBE68]">FREE Express Shipping</strong>!
                </p>
                <div className="w-full bg-[#6B1724] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#DFBE68] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center font-semibold text-[#DFBE68] flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You have unlocked FREE Insured Express Shipping!</span>
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E2D7C3]">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#8C7A6B] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-[#C59B27]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#4A0E17]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#8C7A6B] mt-1">
                    Explore our heirloom sarees and royal jewellery to begin your ensemble.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('sarees');
                  }}
                  className="px-6 py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  Explore Sarees
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-lg border border-[#E2D7C3] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#2C1810] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#8C7A6B] mt-0.5">
                      Shade: <span className="font-medium text-[#4A0E17]">{item.selectedColour}</span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E2D7C3] rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColour)}
                          className="px-2 py-0.5 text-xs text-[#4A0E17] hover:bg-[#F4EFE6]"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColour)}
                          className="px-2 py-0.5 text-xs text-[#4A0E17] hover:bg-[#F4EFE6]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#6B1724] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColour)}
                    className="p-1.5 text-[#8C7A6B] hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Footer: Coupons & Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E2D7C3] space-y-4">
              
              {/* Coupon Section */}
              <div>
                {appliedCoupon ? (
                  <div className="p-2.5 rounded-lg bg-[#1C4A34]/10 border border-[#1C4A34]/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#1C4A34] font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} applied (-₹{cartDiscount.toLocaleString('en-IN')})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon (e.g. ROOP10)"
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E2D7C3] bg-[#FAF7F2] uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#4A0E17] text-[#DFBE68] text-xs font-bold rounded-lg hover:bg-[#6B1724] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                
                {/* Available Coupons Chips */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1 scrollbar-none">
                    {coupons.filter(c => c.active).map(c => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => applyCoupon(c.code)}
                        className="text-[10px] bg-[#F4EFE6] hover:bg-[#EDE5D8] text-[#4A0E17] px-2 py-0.5 rounded border border-[#E2D7C3] font-bold shrink-0 cursor-pointer"
                      >
                        {c.code} ({c.discountPercent}% OFF)
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#2C1810] font-medium tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#1C4A34] font-semibold">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Express Insured)</span>
                  <span className="text-[#1C4A34] font-semibold tabular-nums">
                    {cartShipping === 0 ? 'FREE' : `₹${cartShipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (3%)</span>
                  <span className="text-[#2C1810] tabular-nums">₹{cartTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-[#E2D7C3] flex justify-between text-sm font-extrabold text-[#4A0E17]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#6B1724] tabular-nums">
                    ₹{cartFinalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-[#DFBE68] via-[#C59B27] to-[#B3881E] hover:from-[#E6CA7E] hover:to-[#C59B27] text-[#2C1810] font-bold text-xs tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C7A6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C4A34]" />
                <span>256-Bit SSL Encrypted Indian Payment Gateway</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
