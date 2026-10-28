import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  Share2,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    setCurrentView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartDrawerOpen,
    setIsCheckoutModalOpen,
    products,
    showToast
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#8C7A6B]">No product selected.</p>
        <button
          onClick={() => setCurrentView('sarees')}
          className="mt-4 px-6 py-2 bg-[#4A0E17] text-[#DFBE68] rounded-full text-xs font-semibold"
        >
          Return to Sarees
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colours[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'delivery' | 'reviews'>('specs');

  // PIN code checker state
  const [pincode, setPincode] = useState('');
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [pincodeResult, setPincodeResult] = useState<{
    valid: boolean;
    message: string;
    deliveryDateText?: string;
    city?: string;
    codAvailable?: boolean;
  } | null>(null);

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [userReviews, setUserReviews] = useState<Array<{ name: string; rating: number; date: string; comment: string }>>([
    {
      name: 'Priyanka M.',
      rating: 5,
      date: '12 October 2026',
      comment: 'The weave quality is breathtaking. The Kadwa zari has genuine weight and gleams exquisitely under chandelier lighting.'
    },
    {
      name: 'Sunita Reddy',
      rating: 5,
      date: '28 September 2026',
      comment: 'Draped this for my sister\'s wedding and received non-stop compliments. Truly royal Indian craftsmanship.'
    }
  ]);

  const images = selectedProduct.galleryImages.length > 0
    ? selectedProduct.galleryImages
    : [selectedProduct.image];

  const inWishlist = isInWishlist(selectedProduct.id);

  // Find matching cross-sell products
  const matchingProducts = products.filter(p =>
    selectedProduct.matchingProductIds?.includes(p.id)
  );

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    setIsCheckingPincode(true);
    try {
      const res = await fetch(`/api/pincode/check/${pincode.trim()}`);
      const data = await res.json();
      setPincodeResult(data);
    } catch {
      setPincodeResult({
        valid: true,
        message: 'Standard Express Delivery available in 3-4 days',
        deliveryDateText: 'Delivery in 3–4 business days',
        codAvailable: true
      });
    } finally {
      setIsCheckingPincode(false);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    setUserReviews(prev => [
      {
        name: reviewName.trim(),
        rating: reviewRating,
        date: 'Today',
        comment: reviewComment.trim()
      },
      ...prev
    ]);
    setReviewName('');
    setReviewComment('');
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Look at this exquisite piece from RoopRiwaaz: ${selectedProduct.name}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#8C7A6B] mb-6">
          <button 
            onClick={() => setCurrentView('home')}
            className="hover:text-[#4A0E17] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button 
            onClick={() => setCurrentView(selectedProduct.category)}
            className="hover:text-[#4A0E17] transition-colors capitalize"
          >
            {selectedProduct.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4A0E17] font-semibold truncate max-w-xs sm:max-w-md">
            {selectedProduct.name}
          </span>
        </nav>

        {/* Main Product View: Left Gallery, Right Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Gallery & Zoom (Sticky on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-28">
            
            {/* Vertical Thumbnail Rail */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[580px] pb-2 sm:pb-0 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#6B1724] ring-2 ring-[#DFBE68]/60 scale-105'
                      : 'border-[#E2D7C3] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom Preview */}
            <div 
              className="relative flex-1 rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#E2D7C3] aspect-[4/5] sm:aspect-[3/4] shadow-sm group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={images[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className={`w-full h-full object-cover object-center transition-transform duration-300 ease-out ${
                  isZoomed ? 'scale-125 cursor-zoom-in' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start pointer-events-none">
                {selectedProduct.isBridal && (
                  <span className="bg-[#4A0E17] text-[#DFBE68] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                    Imperial Bridal
                  </span>
                )}
                {selectedProduct.discountPercent > 0 && (
                  <span className="bg-[#FAF7F2] text-[#6B1724] text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-[#E2D7C3]">
                    {selectedProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Share & Wishlist floaters */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                    inWishlist
                      ? 'bg-[#6B1724] text-[#FAF7F2]'
                      : 'bg-white/90 text-[#4A0E17] hover:bg-white'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 text-[#4A0E17] hover:bg-white backdrop-blur-md transition-all shadow-md"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-3 right-3 text-[10px] text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                Hover to magnify details
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C59B27] font-semibold mb-1">
                <span>{selectedProduct.subCategoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProduct.fabricOrMaterial.split(',')[0]}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#4A0E17] leading-snug">
                {selectedProduct.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-[#F4EFE6] px-2.5 py-1 rounded-md text-xs font-semibold text-[#4A0E17] border border-[#E2D7C3]">
                  <Star className="w-3.5 h-3.5 fill-[#C59B27] text-[#C59B27]" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-[#8C7A6B]">({selectedProduct.reviewCount} verified reviews)</span>
                </div>
                <span className="text-xs text-[#1C4A34] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {selectedProduct.inStock ? 'Ready to Ship' : 'Made to Order'}
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-xl bg-[#F4EFE6]/60 border border-[#E2D7C3]">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#6B1724] tabular-nums">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-[#8C7A6B] line-through tabular-nums">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {selectedProduct.discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#1C4A34] bg-[#1C4A34]/10 px-2 py-0.5 rounded">
                    Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')} ({selectedProduct.discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8C7A6B] mt-1">
                Inclusive of all taxes · Complimentary insured gift packaging included
              </p>
            </div>

            {/* Available Colours / Shade Picker */}
            {selectedProduct.colours.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A0E17] block mb-2">
                  Select Shade: <strong className="text-[#6B1724]">{selectedColor}</strong>
                </label>
                <div className="flex items-center gap-3">
                  {selectedProduct.colours.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        selectedColor === col.name
                          ? 'border-[#4A0E17] bg-[#FAF7F2] font-semibold shadow-xs ring-1 ring-[#DFBE68]'
                          : 'border-[#E2D7C3] hover:border-[#8C7A6B] bg-white'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                        style={{ backgroundColor: col.hex }} 
                      />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4A0E17]">
                Quantity:
              </label>
              <div className="flex items-center border border-[#E2D7C3] rounded-lg bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-[#4A0E17] hover:bg-[#F4EFE6] transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-[#4A0E17] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-[#4A0E17] hover:bg-[#F4EFE6] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary Action Buttons (Add to Bag & Buy Now) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className="py-3.5 px-4 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#4A0E17] border-2 border-[#4A0E17] rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#4A0E17]" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!selectedProduct.inStock}
                className="py-3.5 px-4 bg-gradient-to-r from-[#DFBE68] via-[#C59B27] to-[#B3881E] hover:from-[#E6CA7E] hover:to-[#C59B27] text-[#2C1810] rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Delivery Availability Checker via PIN Code */}
            <div className="p-4 rounded-xl border border-[#E2D7C3] bg-white">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4A0E17] mb-2">
                <Truck className="w-4 h-4 text-[#C59B27]" />
                <span>Check Delivery & Cash on Delivery (COD)</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Indian PIN Code"
                  className="flex-1 bg-[#FAF7F2] text-xs text-[#2C1810] px-3 py-2 rounded-lg border border-[#E2D7C3] focus:outline-none focus:border-[#C59B27]"
                />
                <button
                  type="submit"
                  disabled={isCheckingPincode}
                  className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {isCheckingPincode ? 'Checking...' : 'Check'}
                </button>
              </form>

              {pincodeResult && (
                <div className={`mt-3 p-2.5 rounded-lg text-xs ${
                  pincodeResult.valid
                    ? 'bg-[#1C4A34]/10 text-[#1C4A34] border border-[#1C4A34]/20'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  <p className="font-semibold">{pincodeResult.message}</p>
                  {pincodeResult.deliveryDateText && (
                    <p className="mt-0.5">{pincodeResult.deliveryDateText} · {pincodeResult.codAvailable ? 'COD Eligible' : 'Prepaid Only'}</p>
                  )}
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-[#4A0E17] pt-2">
              <div className="p-2.5 rounded-lg bg-[#F4EFE6]/70 border border-[#E2D7C3]">
                <ShieldCheck className="w-4 h-4 text-[#C59B27] mx-auto mb-1" />
                <span className="font-semibold block">100% Authentic</span>
                <span className="text-[#8C7A6B]">Silk Mark / Hallmarked</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4EFE6]/70 border border-[#E2D7C3]">
                <RotateCcw className="w-4 h-4 text-[#C59B27] mx-auto mb-1" />
                <span className="font-semibold block">7-Day Returns</span>
                <span className="text-[#8C7A6B]">Hassle-free reverse pickup</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4EFE6]/70 border border-[#E2D7C3]">
                <Sparkles className="w-4 h-4 text-[#C59B27] mx-auto mb-1" />
                <span className="font-semibold block">Royal Packaging</span>
                <span className="text-[#8C7A6B]">Complimentary gift box</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specifications, Fabric Care, Delivery & Customer Reviews */}
        <div className="mt-16 pt-8 border-t border-[#E2D7C3]">
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 border-b border-[#E2D7C3] pb-1 overflow-x-auto">
            {[
              { id: 'specs', label: 'Craft & Specifications' },
              { id: 'care', label: 'Fabric & Care Instructions' },
              { id: 'delivery', label: 'Shipping & Returns Policy' },
              { id: 'reviews', label: `Customer Reviews (${userReviews.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-2 text-xs sm:text-sm font-bold tracking-wide transition-colors whitespace-nowrap cursor-pointer relative ${
                  activeTab === tab.id
                    ? 'text-[#6B1724]'
                    : 'text-[#8C7A6B] hover:text-[#4A0E17]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B1724] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-sm text-[#4A0E17] leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="mt-4 rounded-xl border border-[#E2D7C3] overflow-hidden bg-white">
                  <table className="w-full text-xs divide-y divide-[#E2D7C3]">
                    <tbody className="divide-y divide-[#E2D7C3]">
                      {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAF7F2]' : 'bg-white'}>
                          <td className="px-4 py-3 font-semibold text-[#8C7A6B] w-1/3">{key}</td>
                          <td className="px-4 py-3 font-medium text-[#2C1810]">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3 max-w-2xl text-xs text-[#4A0E17]">
                <p className="font-semibold text-sm text-[#4A0E17]">Heirloom Longevity Guidelines:</p>
                <ul className="space-y-2 list-disc list-inside text-[#6B7280]">
                  {selectedProduct.careInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                  <li>Never hang heavy handloom silks on thin metal wire hangers as it may stretch the zari threads.</li>
                  <li>In rainy seasons, air the saree or jewellery in an air-conditioned room to prevent moisture condensation.</li>
                </ul>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4 max-w-2xl text-xs text-[#4A0E17]">
                <div className="p-4 rounded-xl bg-white border border-[#E2D7C3] space-y-2">
                  <p className="font-bold text-[#4A0E17]">Express Insured Delivery Across India:</p>
                  <p className="text-[#6B7280]">
                    All orders are dispatched within 24–48 hours via BlueDart or Delhivery Express with live transit tracking. Delivery takes 2–4 business days depending on PIN code location.
                  </p>
                  <p className="font-bold text-[#4A0E17] pt-2">7-Day Hassle-Free Returns & Exchanges:</p>
                  <p className="text-[#6B7280]">
                    If the colour or drape does not match your expectations, initiate a pickup directly through your Customer Account within 7 days of delivery. Full refund or exchange processed upon receipt.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-4">
                  {userReviews.map((rev, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#E2D7C3] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#4A0E17]">{rev.name}</span>
                          <span className="text-[10px] text-[#1C4A34] bg-[#1C4A34]/10 px-2 py-0.5 rounded font-semibold">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-[11px] text-[#8C7A6B]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-[#C59B27] text-[#C59B27]'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#2C1810] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-[#E2D7C3] shadow-xs">
                  <h4 className="font-display text-sm font-bold text-[#4A0E17] mb-3">
                    Write a Verified Review
                  </h4>
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#8C7A6B] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        placeholder="e.g. Shalini Roy"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#8C7A6B] block mb-1">
                        Rating
                      </label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(st => (
                          <button
                            type="button"
                            key={st}
                            onClick={() => setReviewRating(st)}
                            className="p-1 cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                st <= reviewRating
                                  ? 'fill-[#C59B27] text-[#C59B27]'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#8C7A6B] block mb-1">
                        Your Feedback
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        placeholder="Share your thoughts on the drape, shine, or craft..."
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Complete The Look / Matching Cross-Sell Recommendations */}
        {matchingProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E2D7C3]">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-[#C59B27] font-bold">
                Royal Ensemble Synergy
              </span>
              <h3 className="font-display text-2xl font-bold text-[#4A0E17] mt-1">
                Complete The Look
              </h3>
              <p className="text-xs text-[#8C7A6B] mt-1">
                Handpicked jewellery pieces designed to elevate this creation with perfect tonal and cultural harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
