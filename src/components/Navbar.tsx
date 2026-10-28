import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Lock,
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, CategoryType } from '../types';

export const Navbar: React.FC = () => {
  const {
    products,
    cartTotalCount,
    cartSubtotal,
    wishlist,
    setIsCartDrawerOpen,
    setIsAuthModalOpen,
    currentUser,
    currentView,
    setCurrentView,
    setSelectedCategoryFilter,
    setSelectedSubCategoryFilter,
    setSelectedProduct,
    setIsAiStylistOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update live search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matches = products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.subCategoryLabel.toLowerCase().includes(q) ||
          p.fabricOrMaterial.toLowerCase().includes(q) ||
          p.occasion.some(occ => occ.toLowerCase().includes(q))
      ).slice(0, 5);
      setSearchSuggestions(matches);
      setIsSearchActive(true);
    } else {
      setSearchSuggestions([]);
      setIsSearchActive(false);
    }
  }, [searchQuery, products]);

  const handleNavClick = (view: string, category?: CategoryType, subCategory?: string) => {
    setCurrentView(view);
    setSelectedCategoryFilter(category || null);
    setSelectedSubCategoryFilter(subCategory || null);
    setIsMobileMenuOpen(false);
    setIsSearchActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    setIsSearchActive(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2D7C3] transition-all shadow-xs">
      {/* Top Announcement Bar with TOP CORNER Admin Dashboard Button */}
      <div className="bg-[#4A0E17] text-[#FAF7F2] text-xs py-2 px-4 sm:px-8 font-medium tracking-wide flex items-center justify-between border-b border-[#DFBE68]/20">
        
        {/* Left Trust Marker */}
        <div className="hidden md:flex items-center gap-1.5 text-[#DFBE68] text-[11px]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handcrafted Indian Luxury · Silk Mark & 22K Hallmarked</span>
        </div>

        {/* Center Promotion Announcement */}
        <div className="text-center flex-1 mx-2 text-[11px] sm:text-xs">
          <span>
            Free Express Insured Delivery Above ₹999 · Use Code <strong className="text-[#DFBE68] tracking-widest font-bold">ROOP10</strong> for 10% Off
          </span>
        </div>

        {/* TOP CORNER BUTTON: Admin Dashboard Button */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => handleNavClick('admin')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B0918] hover:bg-[#6B1724] text-[#DFBE68] border border-[#DFBE68]/50 hover:border-[#DFBE68] text-[11px] font-bold tracking-wide transition-all shadow-xs cursor-pointer group"
            title="Open Admin Dashboard & Inventory Console"
          >
            <Lock className="w-3 h-3 text-[#DFBE68] group-hover:scale-110 transition-transform" />
            <span>Admin Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Row: Brand (Left) — Centered Search Bar (Middle) — Actions (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A0E17] hover:text-[#6B1724] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B27] rounded-md shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Zone: Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Elegant Indian Motif Emblem */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6B1724] to-[#3B0918] flex items-center justify-center shadow-md border-2 border-[#DFBE68]/60 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-[#DFBE68]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8.5C6 13 12 21 12 21C12 21 18 13 18 8.5C18 5 15.5 2 12 2ZM12 6.5C13.1 6.5 14 7.4 14 8.5C14 9.6 13.1 10.5 12 10.5C10.9 10.5 10 9.6 10 8.5C10 7.4 10.9 6.5 12 6.5Z" opacity="0.3"/>
                <path d="M12 4C10.5 6 9.5 8 9.5 10C9.5 11.4 10.6 12.5 12 12.5C13.4 12.5 14.5 11.4 14.5 10C14.5 8 13.5 6 12 4Z" />
                <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-2xl sm:text-3xl font-bold tracking-wider text-[#4A0E17] group-hover:text-[#6B1724] transition-colors leading-none">
                RoopRiwaaz
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59B27] font-semibold mt-1">
                Haute Tradition
              </span>
            </div>
          </div>

          {/* MIDDLE ZONE: Prominent Centered Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-xl mx-auto relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length > 1) setIsSearchActive(true);
                }}
                placeholder="Search Banarasi sarees, Kundan chokers, organza drapes, wedding wear..."
                className="w-full bg-white text-xs text-[#2C1810] placeholder-[#8C7A6B] pl-10 pr-10 py-3 rounded-full border-2 border-[#DFBE68]/50 focus:border-[#C59B27] focus:outline-none focus:ring-2 focus:ring-[#DFBE68]/30 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchActive(false);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C7A6B] hover:text-[#4A0E17]"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Centered Suggestions Dropdown */}
            {isSearchActive && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#DFBE68]/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 border-b border-[#F4EFE6] bg-[#FAF7F2] text-[11px] font-bold text-[#4A0E17] uppercase tracking-wider flex justify-between items-center">
                  <span>Creations matching "{searchQuery}"</span>
                  <span className="text-[#8C7A6B] font-medium">{searchSuggestions.length} found</span>
                </div>
                <div className="divide-y divide-[#F4EFE6] max-h-80 overflow-y-auto">
                  {searchSuggestions.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="p-3 flex items-center gap-3.5 hover:bg-[#FAF7F2] cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-lg border border-[#E2D7C3] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#2C1810] truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mt-0.5">
                          <span className="text-[#6B1724] font-bold tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span>·</span>
                          <span className="text-[#8C7A6B] font-medium">{product.subCategoryLabel}</span>
                          {product.fabricOrMaterial && (
                            <>
                              <span>·</span>
                              <span className="text-[#8C7A6B] truncate max-w-[100px]">{product.fabricOrMaterial.split(',')[0]}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#C59B27] shrink-0" />
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-[#FAF7F2] text-center border-t border-[#F4EFE6]">
                  <button
                    onClick={() => {
                      handleNavClick('sarees');
                      setIsSearchActive(false);
                    }}
                    className="text-xs font-bold text-[#6B1724] hover:underline"
                  >
                    Explore all matching collections in catalogue →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Zone: Account, Wishlist, Cart Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => {
                const query = prompt('Search sarees, jewellery or collections:');
                if (query) {
                  setSearchQuery(query);
                  handleNavClick('sarees');
                }
              }}
              className="md:hidden p-2 text-[#4A0E17] hover:text-[#6B1724] rounded-full hover:bg-[#F4EFE6]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('account')}
              className="p-2 text-[#4A0E17] hover:text-[#6B1724] rounded-full hover:bg-[#F4EFE6] transition-colors relative"
              aria-label="Wishlist"
              title="My Royal Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#6B1724] text-[#FAF7F2] text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account Button */}
            <button
              onClick={() => {
                if (currentUser) {
                  handleNavClick('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-[#4A0E17] hover:text-[#6B1724] rounded-full hover:bg-[#F4EFE6] transition-colors flex items-center gap-1.5"
              aria-label="Customer Account"
              title={currentUser ? `Account: ${currentUser.name}` : 'Login to Account'}
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="hidden xl:inline-block text-xs font-bold text-[#4A0E17] max-w-[80px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C59B27] text-[#2C1810] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2] shadow-sm animate-in zoom-in-50">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Navigation Row (Centered Links) */}
      <div className="hidden lg:block border-t border-[#E2D7C3]/60 bg-[#FAF7F2]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-8 xl:gap-10 h-12 text-xs uppercase tracking-widest font-semibold text-[#4A0E17]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'home' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('sarees', 'sarees')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'sarees' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              Sarees
              {currentView === 'sarees' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('jewellery', 'jewellery')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'jewellery' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              Jewellery
              {currentView === 'jewellery' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('bridal')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative flex items-center gap-1.5 ${
                currentView === 'bridal' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              <span>Bridal Collection</span>
              <span className="text-[9px] uppercase tracking-wider bg-[#DFBE68]/30 text-[#4A0E17] px-1.5 py-0.2 rounded font-bold">
                Royal
              </span>
              {currentView === 'bridal' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('new-arrivals')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'new-arrivals' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              New Arrivals
              {currentView === 'new-arrivals' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('best-sellers')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'best-sellers' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              Best Sellers
              {currentView === 'best-sellers' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('offers')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative text-[#A81C51] ${
                currentView === 'offers' ? 'font-bold' : ''
              }`}
            >
              Offers & Coupons
              {currentView === 'offers' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#A81C51] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'about' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              About Us
              {currentView === 'about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#6B1724] transition-colors py-1 relative ${
                currentView === 'contact' ? 'text-[#6B1724] font-bold' : ''
              }`}
            >
              Contact Us
              {currentView === 'contact' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-black/50 backdrop-blur-xs z-50 animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] w-4/5 max-w-sm h-full shadow-2xl p-6 overflow-y-auto border-r border-[#E2D7C3] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#E2D7C3] flex items-center justify-between">
                <div>
                  <p className="font-royal text-xl font-bold text-[#4A0E17]">RoopRiwaaz</p>
                  <p className="text-[11px] text-[#8C7A6B]">Wear Your Tradition, Define Your Elegance.</p>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#8C7A6B] hover:text-[#4A0E17]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Centered Search input */}
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, jewellery..."
                  className="w-full bg-white text-xs text-[#2C1810] px-4 py-2.5 rounded-xl border border-[#DFBE68]/60 shadow-inner"
                />
              </div>

              <nav className="flex flex-col space-y-2 text-xs uppercase tracking-wider font-semibold text-[#4A0E17]">
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('sarees', 'sarees')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors font-bold text-[#6B1724]"
                >
                  Sarees Catalogue
                </button>
                <button
                  onClick={() => handleNavClick('jewellery', 'jewellery')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors font-bold text-[#6B1724]"
                >
                  Jewellery Treasury
                </button>
                <button
                  onClick={() => handleNavClick('bridal')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors flex items-center justify-between"
                >
                  <span>Bridal Collection</span>
                  <span className="text-[9px] bg-[#DFBE68]/30 px-2 py-0.5 rounded text-[#4A0E17] font-bold">
                    Royal
                  </span>
                </button>
                <button
                  onClick={() => handleNavClick('new-arrivals')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => handleNavClick('best-sellers')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors"
                >
                  Best Sellers
                </button>
                <button
                  onClick={() => handleNavClick('offers')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors text-[#A81C51] font-bold"
                >
                  Offers & Coupons
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors"
                >
                  About Our Craftsmanship
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#F4EFE6] transition-colors"
                >
                  Contact Concierge
                </button>
                
                {/* Mobile Admin Link */}
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-left py-2.5 px-3 rounded-xl bg-[#4A0E17]/10 text-[#6B1724] font-bold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#C59B27]" />
                  <span>Admin Dashboard</span>
                </button>
              </nav>

              <div className="pt-4 border-t border-[#E2D7C3] space-y-2">
                <button
                  onClick={() => {
                    setIsAiStylistOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#4A0E17] to-[#6B1724] text-[#DFBE68] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#DFBE68]" />
                  <span>Consult Roop AI Stylist</span>
                </button>

                {currentUser ? (
                  <button
                    onClick={() => handleNavClick('account')}
                    className="w-full py-2.5 px-4 bg-[#F4EFE6] text-[#4A0E17] rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>My Account ({currentUser.name})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 bg-[#F4EFE6] text-[#4A0E17] rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Login / Register</span>
                  </button>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2D7C3] text-center text-[11px] text-[#8C7A6B]">
              <p>Certified Handloom India · 22K Micro Gold</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
