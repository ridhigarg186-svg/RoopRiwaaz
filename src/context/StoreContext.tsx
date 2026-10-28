import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, Coupon, CategoryType, SareeSubCategory, JewellerySubCategory } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColour?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColour?: string) => void;
  removeFromCart: (productId: string, selectedColour?: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartFinalTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategoryFilter: CategoryType | null;
  setSelectedCategoryFilter: (cat: CategoryType | null) => void;
  selectedSubCategoryFilter: string | null;
  setSelectedSubCategoryFilter: (sub: string | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAiStylistOpen: boolean;
  setIsAiStylistOpen: (open: boolean) => void;

  // User & Auth
  currentUser: UserProfile | null;
  loginUser: (email: string, role?: 'customer' | 'admin') => boolean;
  logoutUser: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: any, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD') => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string, reason: string) => boolean;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('roop_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('roop_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('roop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('roop_wishlist');
    return saved ? JSON.parse(saved) : ['saree-1', 'jewel-1'];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryType | null>(null);
  const [selectedSubCategoryFilter, setSelectedSubCategoryFilter] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Drawers & Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState<boolean>(false);

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('roop_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-101',
      name: 'Aditi Sharma',
      email: 'aditi.sharma@example.com',
      phone: '+91 98201 54321',
      role: 'customer',
      savedAddresses: [
        {
          name: 'Aditi Sharma',
          phone: '+91 98201 54321',
          street: 'B-402, Lotus Residency, Powai',
          apartment: 'Near Hiranandani Gardens',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400076',
          addressType: 'Home'
        }
      ]
    };
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('roop_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-101',
        orderNumber: 'RR-2026-9481',
        date: '2026-10-24',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            selectedColour: 'Crimson Maroon'
          },
          {
            product: INITIAL_PRODUCTS[9],
            quantity: 1,
            selectedColour: 'Champagne Gold'
          }
        ],
        subtotal: 22100,
        discount: 1500,
        shipping: 0,
        tax: 618,
        total: 21218,
        status: 'In Transit',
        shippingAddress: {
          name: 'Aditi Sharma',
          phone: '+91 98201 54321',
          street: 'B-402, Lotus Residency, Powai',
          apartment: 'Near Hiranandani Gardens',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400076',
          addressType: 'Home'
        },
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        trackingSteps: [
          { title: 'Order Placed', description: 'Received & verified', date: 'Oct 24, 11:20 AM', completed: true },
          { title: 'Quality Inspection', description: 'Handloom certified & packed in royal gift box', date: 'Oct 25, 03:45 PM', completed: true },
          { title: 'Dispatched via BlueDart Express', description: 'AWB #773928104', date: 'Oct 26, 09:10 AM', completed: true, current: true },
          { title: 'Out for Delivery', description: 'Expected delivery by 6:00 PM', date: 'Tomorrow', completed: false }
        ]
      }
    ];
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('roop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('roop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('roop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('roop_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('roop_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('roop_user');
    }
  }, [currentUser]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColour?: string) => {
    const defaultColor = selectedColour || (product.colours[0]?.name ?? 'Default');
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColour === defaultColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColour: defaultColor }];
    });
    showToast(`Added ${product.name.slice(0, 32)}... to shopping bag`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedColour?: string) => {
    setCart(prev => {
      if (quantity <= 0) {
        return prev.filter(
          item => !(item.product.id === productId && (!selectedColour || item.selectedColour === selectedColour))
        );
      }
      return prev.map(item => {
        if (item.product.id === productId && (!selectedColour || item.selectedColour === selectedColour)) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string, selectedColour?: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && (!selectedColour || item.selectedColour === selectedColour))
      )
    );
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Royal Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    const rawDiscount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    cartDiscount = Math.min(rawDiscount, appliedCoupon.maxDiscount);
  }

  // Free shipping above ₹999
  const cartShipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 150;
  // Indian GST 3% for luxury handloom & jewellery
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.03);
  const cartFinalTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping + cartTax);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value of ₹${found.minOrderValue.toLocaleString('en-IN')} required for ${found.code}`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved ₹${Math.min((cartSubtotal * found.discountPercent) / 100, found.maxDiscount).toLocaleString('en-IN')}`, 'success');
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // User auth
  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: role === 'admin' ? 'Royal Administrator' : formattedName,
      email,
      phone: '+91 98201 54321',
      role,
      savedAddresses: currentUser?.savedAddresses || [
        {
          name: formattedName,
          phone: '+91 98201 54321',
          street: 'B-402, Lotus Residency, Powai',
          apartment: 'Near Hiranandani Gardens',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400076',
          addressType: 'Home'
        }
      ]
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have been logged out securely.', 'info');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...profile });
    showToast('Profile updated successfully', 'success');
  };

  // Orders
  const placeOrder = async (shippingAddress: any, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD'): Promise<Order> => {
    const orderNumber = `RR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      total: cartFinalTotal,
      status: 'Confirmed',
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      trackingSteps: [
        { title: 'Order Confirmed', description: 'Payment verified & order acknowledged', date: 'Just now', completed: true, current: true },
        { title: 'Handcrafted Packaging', description: 'Wrapped in royal velvet gift casing', date: 'Pending', completed: false },
        { title: 'Express BlueDart Dispatch', description: 'With tamper-evident luxury seal', date: 'Pending', completed: false },
        { title: 'Delivered', description: 'To your doorstep', date: 'Pending', completed: false }
      ]
    };

    // Save into Supabase backend table via API and Supabase client
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newOrder,
          shippingAddress: {
            ...shippingAddress,
            email: currentUser?.email || 'customer@roopriwaaz.com',
          },
        }),
      });
      const data = await response.json();
      if (data.savedInSupabase) {
        showToast('Order confirmed & saved to your Supabase backend table!', 'success');
      } else {
        showToast('Order placed successfully! (Saved in local database)', 'success');
      }
    } catch (err) {
      console.warn('Backend order recording notice:', err);
    }

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return { ...ord, status };
        }
        return ord;
      })
    );
    showToast(`Order status updated to ${status}`, 'success');
  };

  const cancelOrder = (orderId: string, reason: string): boolean => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return { ...ord, status: 'Cancelled' };
        }
        return ord;
      })
    );
    showToast(`Order cancelled. Reason: ${reason}`, 'info');
    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartFinalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        setCoupons,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedSubCategoryFilter,
        setSelectedSubCategoryFilter,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAiStylistOpen,
        setIsAiStylistOpen,
        currentUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        orders,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        toasts,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
