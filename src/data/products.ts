import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- SAREES ---
  {
    id: 'saree-1',
    name: 'Kashi Darbar Royal Crimson Banarasi Katan Silk Saree',
    category: 'sarees',
    subCategory: 'banarasi',
    subCategoryLabel: 'Banarasi Silk',
    price: 18500,
    originalPrice: 24000,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Pure Katan Silk',
    occasion: ['Bridal', 'Festive'],
    colours: [
      { name: 'Crimson Maroon', hex: '#6B1724' },
      { name: 'Rani Pink', hex: '#A81C51' },
      { name: 'Royal Emerald', hex: '#1C4A34' }
    ],
    inStock: true,
    stockQuantity: 12,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isBridal: true,
    description: 'Handwoven in the ancient ghats of Varanasi by master weavers, this opulent Katan Silk saree features intricate Kadwa gold zari floral jaal with a regal temple shikargah border.',
    specifications: {
      'Weave Type': 'Varanasi Kadwa Handloom',
      'Fabric': '100% Pure Katan Mulberry Silk',
      'Zari Quality': 'Real Gold Tested Zari',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.8 Metres, Unstitched Matching Crimson Silk)',
      'Total Weight': '780 grams',
      'Certification': 'Silk Mark Certified'
    },
    matchingProductIds: ['jewel-1', 'jewel-2'],
    careInstructions: [
      'Strictly Dry Clean Only',
      'Store wrapped in breathable muslin or soft cotton cloth',
      'Avoid direct spray of perfumes on zari work',
      'Air the saree in shade every 6 months'
    ]
  },
  {
    id: 'saree-2',
    name: 'Kanchipuram Swarna Mayil Pure Bridal Zari Silk Saree',
    category: 'sarees',
    subCategory: 'silk',
    subCategoryLabel: 'Kanjivaram Silk',
    price: 26800,
    originalPrice: 32000,
    discountPercent: 16,
    rating: 5.0,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Kanchipuram Silk',
    occasion: ['Bridal', 'Festive'],
    colours: [
      { name: 'Deep Vermilion', hex: '#8B1E1E' },
      { name: 'Mustard Gold', hex: '#D4AF37' }
    ],
    inStock: true,
    stockQuantity: 8,
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isBridal: true,
    description: 'An heirloom Kanjivaram silk saree adorned with classic Mayil (peacock) and Rudraksha motifs in pure silver-gold zari dip, finished with a heavy contrast pallu.',
    specifications: {
      'Weave Type': 'Traditional Korvai Handloom',
      'Fabric': 'Double Warp Pure Kanchipuram Silk',
      'Zari Quality': 'Grade 1 Tested Gold Zari',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.8 Metres Contrast Gold)',
      'Total Weight': '860 grams',
      'Certification': 'Silk Mark & Handloom India Certified'
    },
    matchingProductIds: ['jewel-1', 'jewel-4', 'jewel-5'],
    careInstructions: [
      'Dry Clean Only',
      'Iron on reverse with low heat over a protective cotton cloth',
      'Never use plastic covers for long term storage'
    ]
  },
  {
    id: 'saree-3',
    name: 'Noor-e-Bahar Scalloped Rose Ivory Organza Saree',
    category: 'sarees',
    subCategory: 'organza',
    subCategoryLabel: 'Organza Saree',
    price: 9400,
    originalPrice: 12500,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Pure Tissue Organza',
    occasion: ['Party Wear', 'Festive', 'Gifting'],
    colours: [
      { name: 'Champagne Ivory', hex: '#F4EFE6' },
      { name: 'Blush Rose', hex: '#E2A9A9' },
      { name: 'Powder Blue', hex: '#ADC3D1' }
    ],
    inStock: true,
    stockQuantity: 15,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    description: 'Featherlight pure organza draped with celestial grace. Hand-embellished scalloped borders adorned with delicate pita zari and micro-pearl cutwork.',
    specifications: {
      'Weave Type': 'Sheer Powerloom Organza with Hand Embroidery',
      'Fabric': '100% Pure Silk Organza',
      'Work': 'Hand Cutwork & Pita Gota Embroidery',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.85 Metres Raw Silk Blouse Fabric)',
      'Total Weight': '420 grams'
    },
    matchingProductIds: ['jewel-3', 'jewel-6', 'jewel-7'],
    careInstructions: [
      'Gentle Dry Clean Only',
      'Do not wring or steam press directly'
    ]
  },
  {
    id: 'saree-4',
    name: 'Riwaaz Signature Marwari Gota Patti Georgette Saree',
    category: 'sarees',
    subCategory: 'designer',
    subCategoryLabel: 'Designer Saree',
    price: 13200,
    originalPrice: 16500,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1610030469668-935a8286a2fe?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610030469668-935a8286a2fe?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Viscose Georgette',
    occasion: ['Festive', 'Party Wear'],
    colours: [
      { name: 'Maroon Gold', hex: '#4A0E17' },
      { name: 'Ochre Amber', hex: '#C59B27' }
    ],
    inStock: true,
    stockQuantity: 10,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    description: 'Inspired by the regal palaces of Jaipur, this rich georgette saree features genuine silver-gold ribbon Gota Patti craftsmanship with dori hand-stitch details.',
    specifications: {
      'Fabric': 'Heavy Viscose Georgette (60gm)',
      'Craft': 'Jaipuri Handcrafted Gota Patti & Zardozi',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.8 Metres Embroidered Blouse Piece)',
      'Total Weight': '650 grams'
    },
    matchingProductIds: ['jewel-2', 'jewel-4'],
    careInstructions: ['Dry Clean Only', 'Steam press on low setting from reverse']
  },
  {
    id: 'saree-5',
    name: 'Chanderi Zari Buti Soft Handloom Silk Cotton Saree',
    category: 'sarees',
    subCategory: 'cotton',
    subCategoryLabel: 'Handloom Cotton',
    price: 5200,
    originalPrice: 6800,
    discountPercent: 23,
    rating: 4.7,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1583391733975-00c5c4e0f5b9?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733975-00c5c4e0f5b9?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Chanderi Silk Cotton',
    occasion: ['Office Wear', 'Everyday', 'Festive'],
    colours: [
      { name: 'Beige Champagne', hex: '#EDE5D8' },
      { name: 'Olive Sage', hex: '#6B7A60' },
      { name: 'Turmeric Yellow', hex: '#D69E2E' }
    ],
    inStock: true,
    stockQuantity: 24,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: false,
    description: 'Woven in the heartland of Madhya Pradesh, this lightweight Chanderi saree boasts gossamer softness, delicate ashrafi zari motifs, and breathable summer comfort.',
    specifications: {
      'Weave Type': 'Traditional Chanderi Handloom',
      'Fabric': '70% Cotton 30% Mulberry Silk',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.8 Metres Running Cotton Silk)',
      'Total Weight': '390 grams'
    },
    matchingProductIds: ['jewel-7', 'jewel-8'],
    careInstructions: ['Gentle hand wash in cold water or dry clean', 'Dry in shade']
  },
  {
    id: 'saree-6',
    name: 'Shringaar Midnight Velvet Party Wear Saree with Zari Border',
    category: 'sarees',
    subCategory: 'party',
    subCategoryLabel: 'Party Wear',
    price: 11500,
    originalPrice: 14900,
    discountPercent: 22,
    rating: 4.9,
    reviewCount: 21,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Micro Velvet & Crepe Silk',
    occasion: ['Party Wear', 'Festive'],
    colours: [
      { name: 'Wine Velvet', hex: '#3B0918' },
      { name: 'Midnight Navy', hex: '#0F1E36' }
    ],
    inStock: true,
    stockQuantity: 11,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    description: 'A contemporary cocktail dream: micro-velvet drape seamlessly paired with flowing satin crepe, trimmed with handcrafted metallic sequins and bullion thread embroidery.',
    specifications: {
      'Fabric': 'Italian Micro Velvet & Satin Silk',
      'Work': 'Hand Embroidered Bullion Zardozi Border',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.85 Metres Heavy Embellished Velvet Blouse Piece)',
      'Total Weight': '820 grams'
    },
    matchingProductIds: ['jewel-2', 'jewel-6'],
    careInstructions: ['Specialist Dry Clean Only', 'Never spray water or iron directly on velvet pile']
  },
  {
    id: 'saree-7',
    name: 'Mangalagiri Gold Nizam Border Handwoven Festive Saree',
    category: 'sarees',
    subCategory: 'festive',
    subCategoryLabel: 'Festive Handloom',
    price: 6800,
    originalPrice: 8500,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1610030469614-25c777e38713?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610030469614-25c777e38713?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Pure Handloom Silk Cotton',
    occasion: ['Festive', 'Everyday', 'Gifting'],
    colours: [
      { name: 'Maroon & Mustard', hex: '#6B1724' },
      { name: 'Peacock Teal', hex: '#114B5F' }
    ],
    inStock: true,
    stockQuantity: 18,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    description: 'Celebrated for its signature tightly woven Nizam zari border and pure organic yarn, this Mangalagiri saree breathes cultural dignity and unmatched drape.',
    specifications: {
      'Weave Type': 'Mangalagiri Pitloom Handloom',
      'Fabric': 'Mercerised Cotton with Pure Mulberry Silk Warp',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (0.8 Metres)',
      'Total Weight': '510 grams'
    },
    matchingProductIds: ['jewel-3', 'jewel-7'],
    careInstructions: ['Dry Clean for first two washes, cold gentle hand wash thereafter']
  },
  {
    id: 'saree-8',
    name: 'Rajputana Maharani Heavy Bridal Zardozi Velvet Saree',
    category: 'sarees',
    subCategory: 'bridal',
    subCategoryLabel: 'Bridal Couture',
    price: 34500,
    originalPrice: 42000,
    discountPercent: 18,
    rating: 5.0,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Silk Velvet & Katan Brocade',
    occasion: ['Bridal'],
    colours: [
      { name: 'Imperial Maroon', hex: '#4A0E17' }
    ],
    inStock: true,
    stockQuantity: 5,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isBridal: true,
    description: 'The pinnacle of Indian bridal grandeur. Hand-embroidered with Dabka, Nakshi, sequins, and French wire knots, taking over 180 artisan hours to complete.',
    specifications: {
      'Craft': 'Heritage Rajasthani Royal Zardozi',
      'Fabric': 'Silk Velvet Pallu with Katan Silk Body',
      'Saree Length': '5.5 Metres',
      'Blouse Piece': 'Included (1 Metre Heavy Handcrafted Zardozi Blouse Fabric)',
      'Total Weight': '1100 grams'
    },
    matchingProductIds: ['jewel-1', 'jewel-5'],
    careInstructions: ['Strictly Professional Dry Clean Only', 'Store in acid-free tissue paper']
  },

  // --- JEWELLERY ---
  {
    id: 'jewel-1',
    name: 'Rajgharana 22K Gold Plated Handcrafted Kundan Bridal Choker Set',
    category: 'jewellery',
    subCategory: 'bridal-sets',
    subCategoryLabel: 'Bridal Jewellery Sets',
    price: 12800,
    originalPrice: 16000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Brass Alloy, Uncut Kundan Stones, Basra Pearls',
    plating: '22K Micro Antique Gold Plated',
    occasion: ['Bridal', 'Festive'],
    colours: [
      { name: 'Kundan Gold & Pearl', hex: '#DFBE68' },
      { name: 'Emerald Drop', hex: '#1C4A34' }
    ],
    inStock: true,
    stockQuantity: 14,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isBridal: true,
    description: 'A majestic bridal set comprising a grand choker necklace, matching chandelier jhumkas, and a delicate maang tikka. Hand-set with glass-backed Kundan stones and finished with clusters of natural Basra seed pearls.',
    specifications: {
      'Set Includes': '1 Choker Necklace, 1 Pair of Jhumka Earrings, 1 Maang Tikka',
      'Base Metal': 'Hypoallergenic Copper-Brass Alloy',
      'Plating': '22K Gold Micron Electroplating with Antique Lacquer',
      'Stones Used': 'Hand-cut Glass Polki & Kundan with Meenakari Reverse',
      'Pearls': 'Natural Cultured Shell & Basra-style Seed Pearls',
      'Earring Closure': 'Push back with safety screw lock',
      'Necklace Closure': 'Adjustable Gold Dori (Cord)'
    },
    matchingProductIds: ['saree-1', 'saree-2', 'saree-8'],
    careInstructions: [
      'Keep away from water, soap, sanitizers and perfumes',
      'Store each ornament in airtight ziplock pouches provided',
      'Wipe clean with a soft dry chamois cloth after wear'
    ]
  },
  {
    id: 'jewel-2',
    name: 'Nizam Uncut Polki & Emerald Hasli Choker',
    category: 'jewellery',
    subCategory: 'kundan-polki',
    subCategoryLabel: 'Kundan & Polki',
    price: 8400,
    originalPrice: 10500,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 36,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Copper Alloy, Raw Uncut Polki Stones, Hydro Emeralds',
    plating: '22K Vintage Yellow Gold Plated',
    occasion: ['Festive', 'Party Wear', 'Bridal'],
    colours: [
      { name: 'Emerald & Gold', hex: '#1C4A34' },
      { name: 'Ruby Red & Gold', hex: '#6B1724' }
    ],
    inStock: true,
    stockQuantity: 9,
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    description: 'Reminiscent of Hyderabadi Nizam royal heirlooms, this structured Hasli choker boasts raw uncut Polki stones lined with vivid Zambian-hue emerald drops and meenakari reverse engraving.',
    specifications: {
      'Base Metal': 'Copper Alloy',
      'Plating': 'Antique 22K Gold Dip',
      'Stone Setting': 'Bezel Setting with Foiled Polki Stones',
      'Weight': '115 grams',
      'Included': 'Choker Necklace with Matching Stud Earrings'
    },
    matchingProductIds: ['saree-1', 'saree-4', 'saree-6'],
    careInstructions: ['Store in moisture-free pouch', 'Avoid direct contact with chemicals']
  },
  {
    id: 'jewel-3',
    name: 'Padmavati Royal Meenakari Peacock Chandbali Jhumkas',
    category: 'jewellery',
    subCategory: 'earrings-jhumkas',
    subCategoryLabel: 'Earrings & Jhumkas',
    price: 3600,
    originalPrice: 4800,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 58,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Silver Brass, Hand Enamelling, Seed Pearls',
    plating: '24K Matte Gold Plating',
    occasion: ['Festive', 'Party Wear', 'Everyday', 'Gifting'],
    colours: [
      { name: 'Champagne Gold', hex: '#DFBE68' },
      { name: 'Rani Meena', hex: '#A81C51' }
    ],
    inStock: true,
    stockQuantity: 28,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    description: 'Handcrafted Chandbali earrings featuring graceful peacock silhouettes, intricate floral hand-enamelled Meenakari on reverse, and cascading Basra pearl ghungroos.',
    specifications: {
      'Earring Length': '7.5 cm',
      'Weight per pair': '42 grams (Comfort-balanced for all-day wear)',
      'Closure': 'Hypoallergenic Bombay Screw with Silicone Cushion',
      'Craft': 'Jaipuri Hand Meenakari & Kundan Jadau'
    },
    matchingProductIds: ['saree-3', 'saree-5', 'saree-7'],
    careInstructions: ['Wipe clean with dry cloth', 'Do not submerge in liquids']
  },
  {
    id: 'jewel-4',
    name: 'Maharani Handcrafted Jadau Floral Temple Kada Bangles (Pair)',
    category: 'jewellery',
    subCategory: 'bangles',
    subCategoryLabel: 'Bangles & Bracelets',
    price: 5800,
    originalPrice: 7200,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1611591475879-da60a3c792c0?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1611591475879-da60a3c792c0?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Brass Alloy, Ruby Spinels, CZ Polki',
    plating: '22K Matte Gold with Antique Patina',
    occasion: ['Bridal', 'Festive'],
    colours: [
      { name: 'Temple Antique Gold', hex: '#C59B27' }
    ],
    inStock: true,
    stockQuantity: 16,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    description: 'A regal pair of openable temple kada bangles sculpted with floral filigree and encrusted with teardrop synthetic rubies and uncut Jadau stones.',
    specifications: {
      'Sizes Available': '2.4, 2.6, 2.8 Indian Bangle Sizing',
      'Closure': 'Concealed Side Screw Lock for easy wear',
      'Quantity': 'Set of 2 Kadas',
      'Weight': '88 grams total'
    },
    matchingProductIds: ['saree-1', 'saree-2', 'saree-4'],
    careInstructions: ['Store individually in provided velvet pouch']
  },
  {
    id: 'jewel-5',
    name: 'Basra Shahi Multi-Strand Freshwater Pearl Mala with Royal Pendant',
    category: 'jewellery',
    subCategory: 'pearl',
    subCategoryLabel: 'Pearl Jewellery',
    price: 7600,
    originalPrice: 9500,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Natural Freshwater Pearls, 22K Gold Plated Silver Pendant',
    plating: '22K Gold Plating',
    occasion: ['Bridal', 'Festive', 'Party Wear'],
    colours: [
      { name: 'Lustrous Ivory Pearl', hex: '#FAF7F2' }
    ],
    inStock: true,
    stockQuantity: 12,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    description: 'Seven luxurious strands of AAA-grade oval freshwater pearls strung with silk knots, converging on an intricately engraved royal pendant with uncut stones.',
    specifications: {
      'Necklace Length': '45 cm with adjustable extension cord',
      'Pearl Quality': 'AAA Grade Cultured Freshwater Pearls (4-5mm)',
      'Pendant Work': 'Handcrafted Pachchikam Stone Setting',
      'Weight': '92 grams'
    },
    matchingProductIds: ['saree-2', 'saree-3', 'saree-8'],
    careInstructions: ['Pearls need natural air; avoid keeping sealed for years without wearing']
  },
  {
    id: 'jewel-6',
    name: 'Kavya Delicate Solitaire Polki Adjustable Cocktail Ring',
    category: 'jewellery',
    subCategory: 'rings',
    subCategoryLabel: 'Rings',
    price: 1800,
    originalPrice: 2400,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Sterling Silver 925 core, Moissanite Polki',
    plating: '18K Yellow Gold Micron Plating',
    occasion: ['Party Wear', 'Everyday', 'Gifting'],
    colours: [
      { name: 'Gold & Clear Stone', hex: '#DFBE68' }
    ],
    inStock: true,
    stockQuantity: 32,
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: false,
    description: 'An ethereal statement ring featuring an oversized faceted mirror Polki stone encircled by a delicate halo of micro-pearls with an adjustable comfort shank.',
    specifications: {
      'Ring Size': 'Free Size / Adjustable (fits Indian sizes 10 to 20)',
      'Metal': 'Hallmarked 925 Sterling Silver Base',
      'Weight': '9.8 grams'
    },
    matchingProductIds: ['saree-3', 'saree-6'],
    careInstructions: ['Avoid hand sanitizers and soaps while wearing ring']
  },
  {
    id: 'jewel-7',
    name: 'Aadhya Minimalist Guttapusalu Heritage Pearl Necklace',
    category: 'jewellery',
    subCategory: 'necklaces',
    subCategoryLabel: 'Necklaces & Pendants',
    price: 4900,
    originalPrice: 6200,
    discountPercent: 21,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Copper Alloy, Rice Pearls, Emerald Accents',
    plating: '22K Matte Antique Gold Plating',
    occasion: ['Everyday', 'Office Wear', 'Festive', 'Gifting'],
    colours: [
      { name: 'Antique Gold', hex: '#C59B27' }
    ],
    inStock: true,
    stockQuantity: 20,
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: true,
    description: 'An elegant interpretation of the classical South Indian Guttapusalu necklace, adorned with bunches of delicate rice pearls that dance gracefully along the neckline.',
    specifications: {
      'Style': 'Contemporary Guttapusalu Choker',
      'Earrings Included': 'Matching Floral Pearl Studs',
      'Length': '38 cm with extender',
      'Weight': '48 grams'
    },
    matchingProductIds: ['saree-5', 'saree-7'],
    careInstructions: ['Store flat in soft cloth pouch']
  },
  {
    id: 'jewel-8',
    name: 'Swarna Everyday Floral Daily Wear Gold Plated Jhumkas',
    category: 'jewellery',
    subCategory: 'everyday',
    subCategoryLabel: 'Everyday Jewellery',
    price: 1950,
    originalPrice: 2600,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'
    ],
    fabricOrMaterial: 'Brass Alloy',
    plating: '18K Long-lasting Daily Wear Gold Plating',
    occasion: ['Everyday', 'Office Wear', 'Gifting'],
    colours: [
      { name: 'Warm Gold', hex: '#DFBE68' }
    ],
    inStock: true,
    stockQuantity: 45,
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: false,
    description: 'Light as a feather and effortlessly stylish. Crafted for modern Indian women who cherish daily ethnic grace without ear fatigue.',
    specifications: {
      'Earring Length': '3.2 cm',
      'Weight per pair': '12 grams',
      'Skin Friendly': '100% Nickel-free & Lead-free'
    },
    matchingProductIds: ['saree-5', 'saree-7'],
    careInstructions: ['Dry wipe after everyday use']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'ROOP10',
    discountPercent: 10,
    minOrderValue: 2000,
    maxDiscount: 1500,
    description: '10% OFF on all handcrafted sarees & jewellery (Min order ₹2,000)',
    active: true
  },
  {
    code: 'BRIDAL15',
    discountPercent: 15,
    minOrderValue: 15000,
    maxDiscount: 4500,
    description: '15% Festive & Bridal discount on orders above ₹15,000',
    active: true
  },
  {
    code: 'WELCOME500',
    discountPercent: 12,
    minOrderValue: 3500,
    maxDiscount: 1000,
    description: 'Welcome reward for first-time shoppers at RoopRiwaaz',
    active: true
  }
];
