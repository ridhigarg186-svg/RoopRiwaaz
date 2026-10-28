import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check, Sparkles } from 'lucide-react';
import { Product, CategoryType, OccasionType } from '../types';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

interface ProductGridProps {
  forcedCategory?: CategoryType;
  title?: string;
  subtitle?: string;
  isBridalOnly?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  forcedCategory,
  title,
  subtitle,
  isBridalOnly = false
}) => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedSubCategoryFilter,
    setSelectedSubCategoryFilter,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Subcategory lists
  const sareeSubCategories = [
    { id: 'all', label: 'All Sarees' },
    { id: 'banarasi', label: 'Banarasi Sarees' },
    { id: 'silk', label: 'Silk Sarees' },
    { id: 'designer', label: 'Designer Sarees' },
    { id: 'organza', label: 'Organza Sarees' },
    { id: 'cotton', label: 'Cotton Sarees' },
    { id: 'party', label: 'Party Wear Sarees' },
    { id: 'bridal', label: 'Bridal Sarees' },
    { id: 'festive', label: 'Festive Collections' },
  ];

  const jewellerySubCategories = [
    { id: 'all', label: 'All Jewellery' },
    { id: 'bridal-sets', label: 'Bridal Jewellery Sets' },
    { id: 'kundan-polki', label: 'Kundan & Polki' },
    { id: 'earrings-jhumkas', label: 'Earrings & Jhumkas' },
    { id: 'necklaces', label: 'Necklaces & Pendants' },
    { id: 'bangles', label: 'Bangles & Bracelets' },
    { id: 'rings', label: 'Rings' },
    { id: 'pearl', label: 'Pearl Jewellery' },
    { id: 'everyday', label: 'Everyday Jewellery' },
  ];

  const currentCategory = forcedCategory || selectedCategoryFilter;
  const activeSubList = currentCategory === 'jewellery' ? jewellerySubCategories : sareeSubCategories;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (currentCategory && p.category !== currentCategory) return false;

      // Bridal filter
      if (isBridalOnly && !p.isBridal && !p.occasion.includes('Bridal')) return false;

      // Subcategory filter
      if (selectedSubCategoryFilter && selectedSubCategoryFilter !== 'all') {
        if (p.subCategory !== selectedSubCategoryFilter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.subCategoryLabel.toLowerCase().includes(q) ||
          p.fabricOrMaterial.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (selectedPriceRange === 'under-5000' && p.price >= 5000) return false;
      if (selectedPriceRange === '5000-10000' && (p.price < 5000 || p.price > 10000)) return false;
      if (selectedPriceRange === '10000-20000' && (p.price < 10000 || p.price > 20000)) return false;
      if (selectedPriceRange === 'above-20000' && p.price <= 20000) return false;

      // Occasion filter
      if (selectedOccasion !== 'all' && !p.occasion.includes(selectedOccasion as OccasionType)) {
        return false;
      }

      // In stock
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    currentCategory,
    isBridalOnly,
    selectedSubCategoryFilter,
    searchQuery,
    selectedPriceRange,
    selectedOccasion,
    inStockOnly,
    sortBy
  ]);

  const resetFilters = () => {
    setSelectedSubCategoryFilter(null);
    setSelectedPriceRange('all');
    setSelectedOccasion('all');
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Category Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C59B27] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBridalOnly ? 'Bridal Suite' : currentCategory ? `${currentCategory} Collection` : 'Royal Treasury'}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#4A0E17]">
          {title || (currentCategory === 'jewellery' ? 'Handcrafted Royal Jewellery' : 'Exquisite Handloom Sarees')}
        </h2>
        <p className="text-sm text-[#8C7A6B] mt-2">
          {subtitle || 'Curated with age-old Indian handloom mastery, authentic gold zari, and timeless royal sensibilities.'}
        </p>
      </div>

      {/* Subcategory Segmented Filter Pills */}
      <div className="mb-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {activeSubList.map(sub => {
          const isActive = (selectedSubCategoryFilter === sub.id) || (!selectedSubCategoryFilter && sub.id === 'all');
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategoryFilter(sub.id === 'all' ? null : sub.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#4A0E17] text-[#DFBE68] shadow-md'
                  : 'bg-[#F4EFE6] text-[#4A0E17] hover:bg-[#EDE5D8]'
              }`}
            >
              {sub.label}
            </button>
          );
        })}
      </div>

      {/* Control Bar: Filters toggle, Active count, Sorting dropdown */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#F4EFE6]/70 border border-[#E2D7C3]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FAF7F2] text-[#4A0E17] border border-[#E2D7C3] hover:border-[#C59B27] shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Refine Filters</span>
            {(selectedPriceRange !== 'all' || selectedOccasion !== 'all' || inStockOnly) && (
              <span className="w-2 h-2 rounded-full bg-[#6B1724]" />
            )}
          </button>

          <span className="text-xs text-[#8C7A6B]">
            Showing <strong className="text-[#4A0E17] font-bold">{filteredProducts.length}</strong> creations
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-[#8C7A6B] hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-[#FAF7F2] text-xs font-medium text-[#4A0E17] pl-3 pr-8 py-2 rounded-lg border border-[#E2D7C3] focus:outline-none focus:border-[#C59B27] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-[#8C7A6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {isMobileFilterOpen && (
        <div className="mb-8 p-6 rounded-2xl bg-[#FAF7F2] border border-[#E2D7C3] shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2D7C3]">
            <h3 className="font-display text-sm font-bold text-[#4A0E17]">Refine by Preferences</h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#6B1724] hover:underline font-semibold"
            >
              Reset all filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            {/* Price Filter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-2">Price Range</p>
              <div className="space-y-1.5 text-xs text-[#4A0E17]">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-5000', label: 'Under ₹5,000' },
                  { id: '5000-10000', label: '₹5,000 – ₹10,000' },
                  { id: '10000-20000', label: '₹10,000 – ₹20,000' },
                  { id: 'above-20000', label: 'Above ₹20,000' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === opt.id}
                      onChange={() => setSelectedPriceRange(opt.id)}
                      className="accent-[#6B1724]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-2">Occasion</p>
              <div className="space-y-1.5 text-xs text-[#4A0E17]">
                {['all', 'Bridal', 'Festive', 'Party Wear', 'Office Wear', 'Everyday'].map(occ => (
                  <label key={occ} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(occ)}
                      className="accent-[#6B1724]"
                    />
                    <span>{occ === 'all' ? 'All Occasions' : occ}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-2">Availability</p>
              <label className="flex items-center gap-2 text-xs text-[#4A0E17] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded text-[#6B1724] focus:ring-[#C59B27]"
                />
                <span>Ready to Ship (In Stock Only)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-[#FAF7F2] rounded-2xl border border-[#E2D7C3] p-8">
          <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#4A0E17] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-[#C59B27]" />
          </div>
          <h3 className="font-display text-lg font-bold text-[#4A0E17]">No creations match your filter</h3>
          <p className="text-xs text-[#8C7A6B] mt-1 max-w-sm mx-auto">
            Try adjusting your price range or occasion, or reset filters to browse the entire RoopRiwaaz treasury.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2.5 bg-[#4A0E17] text-[#DFBE68] text-xs font-semibold rounded-full shadow-sm hover:bg-[#6B1724] transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
