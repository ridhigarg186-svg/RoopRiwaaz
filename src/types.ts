export type CategoryType = 'sarees' | 'jewellery';

export type SareeSubCategory = 
  | 'banarasi' 
  | 'silk' 
  | 'designer' 
  | 'organza' 
  | 'cotton' 
  | 'party' 
  | 'bridal' 
  | 'festive';

export type JewellerySubCategory = 
  | 'bridal-sets' 
  | 'kundan-polki' 
  | 'earrings-jhumkas' 
  | 'necklaces' 
  | 'bangles' 
  | 'rings' 
  | 'pearl' 
  | 'everyday';

export type OccasionType = 'Bridal' | 'Festive' | 'Party Wear' | 'Office Wear' | 'Everyday' | 'Gifting';

export interface ColourOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  subCategory: SareeSubCategory | JewellerySubCategory;
  subCategoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  fabricOrMaterial: string;
  plating?: string;
  occasion: OccasionType[];
  colours: ColourOption[];
  inStock: boolean;
  stockQuantity: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isBridal?: boolean;
  description: string;
  specifications: Record<string, string>;
  matchingProductIds: string[];
  careInstructions: string[];
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColour?: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'Home' | 'Work';
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'In Transit' | 'Delivered' | 'Cancelled';

export interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending';
  trackingSteps: TrackingStep[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderValue: number;
  maxDiscount: number;
  description: string;
  active: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: ShippingAddress[];
}
