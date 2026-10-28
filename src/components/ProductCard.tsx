import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct, setCurrentView } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>(product.colours[0]?.name || '');
  const [imgError, setImgError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#FAF7F2] rounded-2xl border border-[#E2D7C3]/80 hover:border-[#C59B27]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-[#F4EFE6] overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4EFE6] via-[#FAF7F2] to-[#EDE5D8]">
            <div className="w-12 h-12 rounded-full bg-[#4A0E17]/10 flex items-center justify-center text-[#4A0E17] mb-2">
              <Sparkles className="w-6 h-6 text-[#C59B27]" />
            </div>
            <p className="font-royal text-sm font-semibold text-[#4A0E17] line-clamp-2">
              {product.name}
            </p>
            <p className="text-[11px] text-[#8C7A6B] mt-1">{product.subCategoryLabel}</p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}

        {/* Subtle Scrim gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isBridal && (
            <span className="bg-[#4A0E17] text-[#DFBE68] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              Royal Bridal
            </span>
          )}
          {product.isBestSeller && !product.isBridal && (
            <span className="bg-[#C59B27] text-[#2C1810] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#FAF7F2] text-[#6B1724] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs border border-[#E2D7C3]">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            inWishlist
              ? 'bg-[#6B1724] text-[#FAF7F2] shadow-md scale-110'
              : 'bg-white/80 hover:bg-white text-[#4A0E17] hover:text-[#6B1724] shadow-xs'
          }`}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add to Cart Button (Mobile & Desktop) */}
        <div className="absolute bottom-3 inset-x-3 transition-all duration-300 transform sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md ${
              isAdded
                ? 'bg-[#1C4A34] text-white'
                : 'bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8C7A6B] uppercase tracking-wider font-medium">
            <span>{product.subCategoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[120px]">{product.fabricOrMaterial.split(',')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-display text-base font-semibold text-[#2C1810] group-hover:text-[#6B1724] transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>

          {/* Price & Rating */}
          <div className="flex items-baseline justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#6B1724] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#8C7A6B] line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#4A0E17]">
              <Star className="w-3.5 h-3.5 fill-[#C59B27] text-[#C59B27]" />
              <span className="font-semibold tabular-nums">{product.rating}</span>
              <span className="text-[#8C7A6B]">({product.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Colours Swatches & Stock status */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E2D7C3]/60 text-xs">
          {product.colours.length > 0 ? (
            <div className="flex items-center gap-1.5" title="Available Colours">
              {product.colours.map((col, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === col.name
                      ? 'border-[#4A0E17] scale-125 ring-1 ring-[#DFBE68]'
                      : 'border-white/80 hover:scale-110'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  aria-label={col.name}
                  title={col.name}
                />
              ))}
              <span className="text-[10px] text-[#8C7A6B] ml-1">
                {product.colours.length} shades
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-[#8C7A6B]">Exclusive single shade</span>
          )}

          <span className={`text-[10px] font-semibold tracking-wide ${product.inStock ? 'text-[#1C4A34]' : 'text-rose-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};
