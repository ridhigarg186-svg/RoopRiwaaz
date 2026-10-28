import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { showToast, setIsAiStylistOpen } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bridal Trousseau Appointment');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been received. Our royal concierge will respond within 4 business hours.', 'success');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C59B27] font-bold">
            Personal Concierge & Consultations
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#4A0E17]">
            Connect With RoopRiwaaz
          </h1>
          <p className="text-xs sm:text-sm text-[#8C7A6B]">
            Whether you need custom bridal sizing, jewellery matching guidance, or personalized video appointments, our team is at your disposal.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Details & Working Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4 text-xs">
              <h3 className="font-display text-base font-bold text-[#4A0E17]">
                Flagship Atelier & Customer Care
              </h3>

              <div className="space-y-3 text-[#2C1810]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A0E17]">Jaipur Heritage Flagship</strong>
                    <span>14, Royal Palace Avenue, Near City Palace, Jaipur, Rajasthan 302001, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A0E17]">Direct Tele-Concierge</strong>
                    <span>+91 (022) 8492-9100 / +91 98201 54321</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A0E17]">Official Email</strong>
                    <span>concierge@roopriwaaz.com / care@roopriwaaz.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A0E17]">Concierge Hours</strong>
                    <span>Monday to Saturday: 10:00 AM – 7:00 PM IST (Closed on National Holidays)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Quick Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] border border-[#DFBE68]/40 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-[#DFBE68]">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-royal text-sm font-bold">Instant Styling Assistance?</h4>
              </div>
              <p className="text-xs text-[#EDE5D8]/90">
                Our AI Fashion Stylist is available 24/7 to pair matching jewellery with sarees and recommend wedding outfits instantly.
              </p>
              <button
                onClick={() => setIsAiStylistOpen(true)}
                className="px-4 py-2 bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Chat with Roop AI Stylist Now
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs">
            <h3 className="font-display text-lg font-bold text-[#4A0E17] mb-4">
              Send a Message to the Concierge
            </h3>

            {submitted ? (
              <div className="p-6 bg-[#1C4A34]/10 border border-[#1C4A34]/30 rounded-xl text-center space-y-2">
                <p className="font-display text-base font-bold text-[#1C4A34]">Inquiry Acknowledged</p>
                <p className="text-xs text-[#2C1810]">
                  Thank you, {name}. A dedicated client advisor will review your request and get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-[#4A0E17] text-[#DFBE68] rounded-lg text-xs font-semibold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#8C7A6B] block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Shalini Roy"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#8C7A6B] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#8C7A6B] block mb-1">Phone Number (+91)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#8C7A6B] block mb-1">Inquiry Purpose</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-[#FAF7F2]"
                    >
                      <option value="Bridal Trousseau Appointment">Bridal Trousseau Appointment</option>
                      <option value="Custom Saree Blouse Tailoring">Custom Saree Blouse Tailoring</option>
                      <option value="Order Tracking / Delivery Status">Order Tracking / Delivery Status</option>
                      <option value="Jewellery Customization">Jewellery Customization</option>
                      <option value="Corporate / Bulk Gifting">Corporate / Bulk Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your wedding date, saree requirements, or question..."
                    className="w-full p-3 rounded-xl border border-[#E2D7C3] bg-[#FAF7F2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl font-bold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
