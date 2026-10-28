import React from 'react';
import { CheckCircle2, PackageCheck, Truck, ShieldCheck, Printer, ArrowRight, Sparkles } from 'lucide-react';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const { setCurrentView } = useStore();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleViewInAccount = () => {
    onClose();
    setCurrentView('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] w-full max-w-xl rounded-2xl shadow-2xl border border-[#DFBE68]/50 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="bg-[#4A0E17] text-[#FAF7F2] p-6 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#DFBE68]/20 border border-[#DFBE68]/60 flex items-center justify-center mx-auto mb-3 text-[#DFBE68]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#DFBE68] font-bold block mb-1">
            Order Confirmed & Acknowledged
          </span>
          <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
            Thank You, {order.shippingAddress.name}
          </h2>
          <p className="text-xs text-[#EDE5D8] mt-1">
            Order Reference: <strong className="text-[#DFBE68] font-mono tracking-wider">{order.orderNumber}</strong>
          </p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Tracking Timeline */}
          <div className="p-4 rounded-xl bg-white border border-[#E2D7C3] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A0E17] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C59B27]" />
              <span>Express Delivery Timeline</span>
            </h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2D7C3]">
              {order.trackingSteps.map((step, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                    step.completed
                      ? 'bg-[#1C4A34] border-[#1C4A34]'
                      : 'bg-white border-[#8C7A6B]'
                  }`} />
                  <p className={`font-bold ${step.completed ? 'text-[#1C4A34]' : 'text-[#8C7A6B]'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-[#6B7280]">{step.description} · <span className="italic">{step.date}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Items Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#E2D7C3]">
              <p className="font-bold text-[#8C7A6B] uppercase tracking-wider mb-1">Delivering To:</p>
              <p className="font-semibold text-[#2C1810]">{order.shippingAddress.name}</p>
              <p className="text-[#6B7280]">{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-[#6B7280] mt-1">Contact: {order.shippingAddress.phone}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E2D7C3]">
              <p className="font-bold text-[#8C7A6B] uppercase tracking-wider mb-1">Payment Summary:</p>
              <p className="text-[#6B7280]">Mode: <strong className="text-[#4A0E17]">{order.paymentMethod}</strong></p>
              <p className="text-[#6B7280]">Status: <strong className="text-[#1C4A34]">{order.paymentStatus}</strong></p>
              <p className="text-sm font-bold text-[#6B1724] mt-1 tabular-nums">
                Total Paid: ₹{order.total.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleViewInAccount}
              className="flex-1 py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Track in Customer Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-5 border border-[#E2D7C3] bg-white hover:bg-[#F4EFE6] text-[#4A0E17] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center text-[11px] text-emerald-800 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Order form details successfully routed to Supabase project <strong className="font-mono">iuqvwomcotzcmotjpwee</strong></span>
          </div>

          <p className="text-center text-[11px] text-[#8C7A6B]">
            A confirmation receipt has been sent to your registered contact.
          </p>

        </div>

      </div>
    </div>
  );
};
