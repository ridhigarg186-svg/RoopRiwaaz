import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Building, Banknote, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, Order } from '../types';

interface CheckoutModalProps {
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderPlaced }) => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartFinalTotal,
    currentUser,
    placeOrder,
    showToast
  } = useStore();

  const [address, setAddress] = useState<ShippingAddress>(() => {
    return (
      currentUser?.savedAddresses[0] || {
        name: currentUser?.name || 'Aditi Sharma',
        phone: currentUser?.phone || '+91 98201 54321',
        street: 'B-402, Lotus Residency, Powai',
        apartment: 'Near Hiranandani Gardens',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400076',
        addressType: 'Home'
      }
    );
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('aditi@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.street || !address.pincode) {
      showToast('Please complete all delivery address fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate real gateway payment verification in test mode
      await new Promise(r => setTimeout(r, 900));
      const order = await placeOrder(address, paymentMethod);
      setIsCheckoutModalOpen(false);
      onOrderPlaced(order);
      showToast('Order confirmed! Royal congratulations.', 'success');
    } catch {
      showToast('Payment processing error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E2D7C3] overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E2D7C3] bg-white flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[#4A0E17]">
              Secure Checkout — RoopRiwaaz
            </h2>
            <p className="text-xs text-[#8C7A6B]">
              Handcrafted items packed with royal seals and insured express dispatch.
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 text-[#8C7A6B] hover:text-[#4A0E17] rounded-full hover:bg-[#F4EFE6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="md:col-span-7 space-y-6">
            
            {/* 1. Address Section */}
            <div>
              <h3 className="font-display text-sm font-bold text-[#4A0E17] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#DFBE68] text-[11px] flex items-center justify-center font-bold">1</span>
                <span>Delivery Address (India)</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="col-span-2 sm:col-span-1">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={e => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">Phone Number (+91)</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">Street Address / House No.</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    placeholder="House, Building, Street, Area"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">PIN Code (6 digits)</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={address.pincode}
                    onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white text-[#2C1810] font-semibold"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-semibold text-[#8C7A6B] block mb-1">Address Type</label>
                  <div className="flex gap-2">
                    {['Home', 'Work'].map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setAddress({ ...address, addressType: type as any })}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                          address.addressType === type
                            ? 'bg-[#4A0E17] text-[#DFBE68] border-[#4A0E17]'
                            : 'bg-white text-[#4A0E17] border-[#E2D7C3]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div>
              <h3 className="font-display text-sm font-bold text-[#4A0E17] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#DFBE68] text-[11px] flex items-center justify-center font-bold">2</span>
                <span>Select Payment Mode (Test Gateway Active)</span>
              </h3>

              <div className="space-y-2">
                {/* UPI Option */}
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'bg-white border-[#4A0E17] ring-1 ring-[#C59B27]' : 'bg-[#F4EFE6]/70 border-[#E2D7C3]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#6B1724]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#4A0E17] flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#C59B27]" />
                        <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                      </span>
                      <span className="text-[10px] text-[#8C7A6B]">Instant 0% transaction fee</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#1C4A34]/10 text-[#1C4A34] px-2 py-0.5 rounded font-bold">
                    Fastest
                  </span>
                </label>

                {paymentMethod === 'UPI' && (
                  <div className="pl-8 pt-1 pb-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or name@okhdfcbank"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                    />
                  </div>
                )}

                {/* Card Option */}
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'Card' ? 'bg-white border-[#4A0E17] ring-1 ring-[#C59B27]' : 'bg-[#F4EFE6]/70 border-[#E2D7C3]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="accent-[#6B1724]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#4A0E17] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#C59B27]" />
                        <span>Credit / Debit Card (Visa, RuPay, Mastercard)</span>
                      </span>
                      <span className="text-[10px] text-[#8C7A6B]">Secure 3D Indian OTP authentication</span>
                    </div>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'NetBanking' ? 'bg-white border-[#4A0E17] ring-1 ring-[#C59B27]' : 'bg-[#F4EFE6]/70 border-[#E2D7C3]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NetBanking'}
                      onChange={() => setPaymentMethod('NetBanking')}
                      className="accent-[#6B1724]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#4A0E17] flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#C59B27]" />
                        <span>Net Banking (HDFC, ICICI, SBI, Axis, Kotak)</span>
                      </span>
                      <span className="text-[10px] text-[#8C7A6B]">Direct bank transfer</span>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'bg-white border-[#4A0E17] ring-1 ring-[#C59B27]' : 'bg-[#F4EFE6]/70 border-[#E2D7C3]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#6B1724]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#4A0E17] flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#C59B27]" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                      <span className="text-[10px] text-[#8C7A6B]">Pay cash or UPI upon courier arrival</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-5 bg-white p-5 rounded-xl border border-[#E2D7C3] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display text-sm font-bold text-[#4A0E17] mb-3">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              <div className="divide-y divide-[#F4EFE6] max-h-56 overflow-y-auto mb-4 pr-1">
                {cart.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center gap-2.5 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-12 object-cover rounded border border-[#E2D7C3] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2C1810] truncate">{item.product.name}</p>
                      <p className="text-[10px] text-[#8C7A6B]">Qty: {item.quantity} · {item.selectedColour}</p>
                    </div>
                    <span className="font-bold text-[#6B1724] tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Table */}
              <div className="border-t border-[#E2D7C3] pt-3 space-y-1.5 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-[#2C1810] font-medium tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#1C4A34] font-semibold">
                    <span>Discount Savings</span>
                    <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#1C4A34] font-semibold tabular-nums">
                    {cartShipping === 0 ? 'FREE' : `₹${cartShipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (3%)</span>
                  <span className="text-[#2C1810] tabular-nums">₹{cartTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-[#E2D7C3] flex justify-between text-base font-extrabold text-[#4A0E17]">
                  <span>Total Payable</span>
                  <span className="text-[#6B1724] tabular-nums">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#DFBE68] via-[#C59B27] to-[#B3881E] hover:from-[#E6CA7E] hover:to-[#C59B27] text-[#2C1810] font-bold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Securing Payment & Confirming...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C7A6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C4A34]" />
                <span>Test Payment Gateway Active · No real charge</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
