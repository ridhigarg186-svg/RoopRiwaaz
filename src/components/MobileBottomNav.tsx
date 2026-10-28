import React from 'react';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    wishlist,
    setIsCartDrawerOpen,
    currentUser,
    setIsAuthModalOpen,
    setSelectedCategoryFilter,
    setSelectedSubCategoryFilter
  } = useStore();

  const handleNavClick = (view: string) => {
    if (view === 'cart') {
      setIsCartDrawerOpen(true);
      return;
    }
    if (view === 'account' && !currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (view === 'categories') {
      setCurrentView('sarees');
      setSelectedCategoryFilter(null);
      setSelectedSubCategoryFilter(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E2D7C3] px-2 py-1.5 shadow-lg"
    >
      <div className="grid grid-cols-5 items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            currentView === 'home' ? 'text-[#6B1724]' : 'text-[#8C7A6B] hover:text-[#4A0E17]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => handleNavClick('categories')}
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            currentView === 'sarees' || currentView === 'jewellery' ? 'text-[#6B1724]' : 'text-[#8C7A6B] hover:text-[#4A0E17]'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Shop</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => handleNavClick('account')}
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors relative ${
            currentView === 'account' ? 'text-[#6B1724]' : 'text-[#8C7A6B] hover:text-[#4A0E17]'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#6B1724] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => handleNavClick('cart')}
          className="flex flex-col items-center justify-center py-1 rounded-lg text-[#4A0E17] hover:text-[#6B1724] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#C59B27] text-[#2C1810] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Cart</span>
        </button>

        {/* Account */}
        <button
          onClick={() => handleNavClick('account')}
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            currentView === 'account' ? 'text-[#6B1724]' : 'text-[#8C7A6B] hover:text-[#4A0E17]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Account</span>
        </button>

      </div>
    </nav>
  );
};
