import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, showToast } = useStore();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      showToast(`Password reset link sent to ${email}`, 'info');
      setMode('login');
      return;
    }

    // Login or register
    loginUser(email, 'customer');
    setIsAuthModalOpen(false);
  };

  const fillDemoCustomer = () => {
    setEmail('aditi.sharma@example.com');
    setPassword('secret123');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-2xl shadow-2xl border border-[#DFBE68]/50 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#4A0E17] text-[#FAF7F2] p-6 text-center relative">
          <div className="w-12 h-12 rounded-full bg-[#DFBE68]/20 border border-[#DFBE68]/60 flex items-center justify-center mx-auto mb-2 text-[#DFBE68]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-royal text-xl font-bold tracking-wide text-[#DFBE68]">
            RoopRiwaaz
          </h2>
          <p className="text-xs text-[#EDE5D8]">
            {mode === 'login' && 'Sign in to access your royal wishlist and orders'}
            {mode === 'register' && 'Join the RoopRiwaaz Patrons Club'}
            {mode === 'forgot' && 'Reset your account security access'}
          </p>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-[#EDE5D8] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'register' && (
              <div>
                <label className="font-bold text-[#8C7A6B] block mb-1">Your Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                  <User className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-[#8C7A6B] block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-white text-[#2C1810]"
                />
                <Mail className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="font-bold text-[#8C7A6B] block mb-1">Mobile (+91)</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                  <Phone className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#8C7A6B]">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-[#6B1724] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2D7C3] bg-white text-[#2C1810]"
                  />
                  <Lock className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl font-bold tracking-wide transition-colors cursor-pointer"
            >
              {mode === 'login' && 'Sign In to Account'}
              {mode === 'register' && 'Create Patron Account'}
              {mode === 'forgot' && 'Send Recovery Email'}
            </button>
          </form>

          {/* Quick Demo Autofill */}
          {mode === 'login' && (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="text-[11px] text-[#C59B27] font-semibold hover:underline"
              >
                Auto-fill demo customer details
              </button>
            </div>
          )}

          {/* Switch Mode Footer */}
          <div className="mt-5 pt-4 border-t border-[#E2D7C3] text-center text-xs text-[#8C7A6B]">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="font-bold text-[#6B1724] hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-bold text-[#6B1724] hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
