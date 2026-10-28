import React from 'react';
import { Lock, Shield, Settings, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminFloatingButton: React.FC = () => {
  const { currentView, setCurrentView } = useStore();

  if (currentView === 'admin') return null;

  const handleClick = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40">
      <button
        onClick={handleClick}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#2B0611] via-[#4A0E17] to-[#2B0611] text-[#FAF7F2] border-2 border-[#DFBE68]/70 hover:border-[#DFBE68] shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        aria-label="Open Admin Dashboard"
        title="Admin Control Center & Inventory"
      >
        <div className="w-6 h-6 rounded-full bg-[#DFBE68]/20 flex items-center justify-center text-[#DFBE68] shrink-0 group-hover:rotate-12 transition-transform">
          <Lock className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <span className="block text-xs font-bold font-royal text-[#DFBE68] tracking-wider leading-none">
            Admin Console
          </span>
          <span className="text-[10px] text-[#EDE5D8]/80 leading-none opacity-90 hidden sm:block">
            Store & Inventory
          </span>
        </div>
      </button>
    </div>
  );
};
