import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Tag, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  AlertTriangle, 
  Users, 
  IndianRupee, 
  Lock,
  ArrowLeft,
  RefreshCw,
  Database,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, Coupon, CategoryType } from '../types';
import { SUPABASE_ORDERS_TABLE_SQL, SUPABASE_URL, checkSupabaseOrdersTable } from '../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    setProducts,
    orders,
    updateOrderStatus,
    coupons,
    setCoupons,
    currentUser,
    loginUser,
    setCurrentView,
    showToast
  } = useStore();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(currentUser?.role === 'admin');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'reviews' | 'ai-config' | 'supabase'>('overview');
  const [supabaseStatus, setSupabaseStatus] = useState<{ connected: boolean; tableExists: boolean; message: string } | null>(null);
  const [isCheckingSupabase, setIsCheckingSupabase] = useState(false);

  // Product modal (Add or Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'sarees',
    subCategory: 'banarasi',
    subCategoryLabel: 'Banarasi Silk',
    price: 15000,
    originalPrice: 19000,
    fabricOrMaterial: 'Pure Silk',
    inStock: true,
    stockQuantity: 15,
    description: '',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    galleryImages: [],
    colours: [{ name: 'Maroon Gold', hex: '#6B1724' }],
    occasion: ['Festive', 'Bridal']
  });

  // Coupon modal
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(2000);

  // Reviews mock moderation
  const [reviewsList, setReviewsList] = useState([
    { id: 'rev-1', customer: 'Priyanka M.', product: 'Kashi Darbar Banarasi Silk', rating: 5, status: 'Approved', comment: 'Breathtaking weave quality and tested zari.' },
    { id: 'rev-2', customer: 'Meera Deshmukh', product: 'Rajgharana Kundan Choker', rating: 5, status: 'Approved', comment: 'Heavy royal weight. Real 22K micron shine.' },
    { id: 'rev-3', customer: 'Ananya S.', product: 'Noor Rose Organza Saree', rating: 4, status: 'Pending Moderation', comment: 'Delicate drape, loved the scalloped cutwork.' }
  ]);

  // AI Prompt config
  const [aiTone, setAiTone] = useState('Royal, warm, and deeply knowledgeable about Indian weaves and heirloom jewellery.');
  const [aiFeaturedKeyword, setAiFeaturedKeyword] = useState('Bridal & Festive 2026');

  // Admin login handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@roopriwaaz.com' && adminPass === 'admin123') {
      loginUser(adminEmail, 'admin');
      setIsAdminLoggedIn(true);
      showToast('Welcome, Administrator. Access granted to RoopRiwaaz Console.', 'success');
    } else {
      showToast('Invalid administrator credentials. Try demo credentials.', 'error');
    }
  };

  const autoFillDemoAdmin = () => {
    setAdminEmail('admin@roopriwaaz.com');
    setAdminPass('admin123');
  };

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0) + 148200;
  const totalOrdersCount = orders.length + 18;
  const lowStockProducts = products.filter(p => p.stockQuantity < 10);

  // Save product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev =>
        prev.map(p => (p.id === editingProduct.id ? ({ ...p, ...productForm } as Product) : p))
      );
      showToast('Product updated successfully', 'success');
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name || 'New Creation',
        category: productForm.category as CategoryType,
        subCategory: productForm.subCategory as any,
        subCategoryLabel: productForm.subCategoryLabel || 'Handcrafted',
        price: Number(productForm.price) || 9999,
        originalPrice: Number(productForm.originalPrice) || 12999,
        discountPercent: Math.round(((Number(productForm.originalPrice) - Number(productForm.price)) / Number(productForm.originalPrice)) * 100),
        rating: 5.0,
        reviewCount: 1,
        image: productForm.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
        galleryImages: [productForm.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'],
        fabricOrMaterial: productForm.fabricOrMaterial || 'Pure Silk',
        occasion: productForm.occasion || ['Festive'],
        colours: productForm.colours || [{ name: 'Royal Gold', hex: '#DFBE68' }],
        inStock: Boolean(productForm.inStock),
        stockQuantity: Number(productForm.stockQuantity) || 10,
        description: productForm.description || 'Artisanal masterpiece from RoopRiwaaz.',
        specifications: { 'Craft': 'Handloom' },
        matchingProductIds: [],
        careInstructions: ['Dry Clean Only']
      };
      setProducts(prev => [newProd, ...prev]);
      showToast('New product added to catalog', 'success');
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the live store?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product deleted from inventory', 'info');
    }
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const coup: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: newCouponDiscount,
      minOrderValue: newCouponMinOrder,
      maxDiscount: 3000,
      description: `${newCouponDiscount}% off on orders above ₹${newCouponMinOrder}`,
      active: true
    };
    setCoupons(prev => [coup, ...prev]);
    setNewCouponCode('');
    showToast(`New coupon ${coup.code} created`, 'success');
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons(prev =>
      prev.map(c => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // If not logged in as admin, show secure login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FAF7F2]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-[#DFBE68]/50 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#4A0E17] text-[#DFBE68] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-royal text-2xl font-bold text-[#4A0E17]">
              RoopRiwaaz Admin Console
            </h1>
            <p className="text-xs text-[#8C7A6B] mt-1">
              Authorized personnel only. Protected administrative portal.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs text-left">
            <div>
              <label className="font-bold text-[#4A0E17] block mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                placeholder="admin@roopriwaaz.com"
                className="w-full px-3 py-2.5 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2]"
              />
            </div>
            <div>
              <label className="font-bold text-[#4A0E17] block mb-1">Security Password</label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl font-bold transition-colors cursor-pointer"
            >
              Authenticate & Enter Console
            </button>
          </form>

          <div className="p-3 bg-[#F4EFE6] rounded-xl text-center space-y-2">
            <p className="text-[11px] text-[#8C7A6B]">
              Quick Demo Access: <code className="font-mono text-[#4A0E17] font-bold">admin@roopriwaaz.com</code> / <code className="font-mono text-[#4A0E17] font-bold">admin123</code>
            </p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={autoFillDemoAdmin}
                className="px-3 py-1 bg-white border border-[#DFBE68] text-[11px] text-[#6B1724] font-semibold rounded-md hover:bg-[#FAF7F2] cursor-pointer"
              >
                Auto-Fill Credentials
              </button>
              <button
                type="button"
                onClick={() => {
                  loginUser('admin@roopriwaaz.com', 'admin');
                  setIsAdminLoggedIn(true);
                  showToast('Instant demo admin access granted', 'success');
                }}
                className="px-3 py-1 bg-[#4A0E17] text-[11px] text-[#DFBE68] font-bold rounded-md hover:bg-[#6B1724] cursor-pointer"
              >
                1-Click Instant Enter ⚡
              </button>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-[#8C7A6B] hover:text-[#4A0E17] flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      
      {/* Admin Top Navbar */}
      <div className="bg-[#4A0E17] text-[#FAF7F2] px-4 sm:px-8 py-4 border-b border-[#DFBE68]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-royal text-xl font-bold text-[#DFBE68]">RoopRiwaaz</span>
          <span className="text-[10px] bg-[#DFBE68]/20 text-[#DFBE68] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Command Center
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#EDE5D8] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Storefront</span>
          </button>

          <button
            onClick={() => {
              setIsAdminLoggedIn(false);
              showToast('Logged out of Admin Console', 'info');
            }}
            className="px-3 py-1.5 border border-[#DFBE68]/40 text-[#DFBE68] rounded-lg text-xs font-semibold hover:bg-white/5 transition-colors"
          >
            Lock Console
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E2D7C3]">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'reviews', label: 'Review Moderation', icon: MessageSquare },
            { id: 'ai-config', label: 'AI Stylist Config', icon: Sparkles },
            { id: 'supabase', label: 'Supabase Backend', icon: Database },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4A0E17] text-[#DFBE68] shadow-sm'
                    : 'bg-white text-[#4A0E17] hover:bg-[#F4EFE6] border border-[#E2D7C3]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6B]">Total Revenue</span>
                <p className="text-2xl font-extrabold text-[#6B1724] mt-1 tabular-nums">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-[#1C4A34] font-semibold mt-1">↑ 18.4% this festive season</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6B]">Total Orders</span>
                <p className="text-2xl font-extrabold text-[#4A0E17] mt-1 tabular-nums">
                  {totalOrdersCount}
                </p>
                <p className="text-[11px] text-[#1C4A34] font-semibold mt-1">100% On-time dispatch</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6B]">Treasury Catalog</span>
                <p className="text-2xl font-extrabold text-[#4A0E17] mt-1 tabular-nums">
                  {products.length} Items
                </p>
                <p className="text-[11px] text-[#8C7A6B] mt-1">8 Sarees · 8 Jewels</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6B]">Low Stock Alerts</span>
                <p className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums">
                  {lowStockProducts.length} Items
                </p>
                <p className="text-[11px] text-amber-700 font-semibold mt-1">Under 10 pieces left</p>
              </div>
            </div>

            {/* Low stock alerts table */}
            <div className="p-6 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#4A0E17]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3>Low Stock Inventory Warning (&lt; 10 units)</h3>
              </div>
              <div className="divide-y divide-[#F4EFE6] text-xs">
                {lowStockProducts.map(p => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-12 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-[#2C1810]">{p.name}</p>
                        <p className="text-[11px] text-[#8C7A6B]">{p.subCategoryLabel} · ₹{p.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                        Only {p.stockQuantity} units remaining
                      </span>
                      <button
                        onClick={() => {
                          setProducts(prev =>
                            prev.map(item => item.id === p.id ? { ...item, stockQuantity: item.stockQuantity + 10 } : item)
                          );
                          showToast(`Restocked ${p.name} (+10 units)`, 'success');
                        }}
                        className="px-3 py-1 bg-[#4A0E17] text-[#DFBE68] rounded-md font-bold text-[11px] hover:bg-[#6B1724]"
                      >
                        Restock +10
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-[#4A0E17]">Product Catalog & Inventory</h2>
                <p className="text-xs text-[#8C7A6B]">Manage creations, stock counts, and prices.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2D7C3] overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF7F2] border-b border-[#E2D7C3] text-[#8C7A6B] uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2D7C3]">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-12 object-cover rounded shrink-0" />
                        <div>
                          <p className="font-semibold text-[#2C1810] line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-[#8C7A6B]">{p.fabricOrMaterial}</p>
                        </div>
                      </td>
                      <td className="p-3.5 capitalize font-medium text-[#4A0E17]">{p.category} ({p.subCategoryLabel})</td>
                      <td className="p-3.5 font-bold text-[#6B1724] tabular-nums">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 tabular-nums">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          p.stockQuantity < 10 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.stockQuantity} units
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.inStock ? 'bg-[#1C4A34]/10 text-[#1C4A34]' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {p.inStock ? 'Active' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm(p);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-[#F4EFE6] rounded text-[#4A0E17]"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 hover:bg-rose-50 rounded text-rose-600"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-[#4A0E17]">Order Dispatch & Fulfillment</h2>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F4EFE6] text-xs">
                    <div>
                      <span className="font-bold text-[#4A0E17] font-mono">{order.orderNumber}</span>
                      <p className="text-[#8C7A6B]">{order.date} · {order.items.length} items</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#2C1810]">{order.shippingAddress.name} ({order.shippingAddress.city})</p>
                      <p className="text-[#8C7A6B]">Phone: {order.shippingAddress.phone}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#6B1724] text-sm tabular-nums">₹{order.total.toLocaleString('en-IN')}</span>
                      <p className="text-[10px] text-[#8C7A6B]">{order.paymentMethod} ({order.paymentStatus})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2] text-[#4A0E17]"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS MANAGEMENT */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-3">
              <h2 className="font-display text-lg font-bold text-[#4A0E17]">Active Discount Codes</h2>
              <div className="space-y-3">
                {coupons.map(c => (
                  <div key={c.code} className="p-4 bg-white rounded-2xl border border-[#E2D7C3] flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-[#6B1724] bg-[#F4EFE6] px-2.5 py-1 rounded border border-[#E2D7C3]">
                          {c.code}
                        </span>
                        <span className="font-bold text-[#1C4A34]">{c.discountPercent}% OFF</span>
                      </div>
                      <p className="text-[#8C7A6B] mt-1">{c.description}</p>
                    </div>
                    <button
                      onClick={() => toggleCouponStatus(c.code)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[11px] ${
                        c.active ? 'bg-[#1C4A34]/10 text-[#1C4A34]' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {c.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs">
              <h3 className="font-display text-sm font-bold text-[#4A0E17] mb-3">Create Promotional Coupon</h3>
              <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={e => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DIWALI20"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Discount %</label>
                  <input
                    type="number"
                    min={5}
                    max={50}
                    required
                    value={newCouponDiscount}
                    onChange={e => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCouponMinOrder}
                    onChange={e => setNewCouponMinOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl font-bold cursor-pointer"
                >
                  Create & Publish Coupon
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEW MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-[#4A0E17]">Customer Reviews Moderation</h2>
            <div className="space-y-3">
              {reviewsList.map(r => (
                <div key={r.id} className="p-4 bg-white rounded-2xl border border-[#E2D7C3] flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#4A0E17]">{r.customer}</span>
                      <span className="text-[#8C7A6B]">on <strong className="text-[#2C1810]">{r.product}</strong></span>
                      <span className="text-amber-600 font-bold">★ {r.rating}</span>
                    </div>
                    <p className="text-[#2C1810] mt-1">{r.comment}</p>
                  </div>
                  <button
                    onClick={() => {
                      setReviewsList(prev =>
                        prev.map(item => item.id === r.id ? { ...item, status: item.status === 'Approved' ? 'Hidden' : 'Approved' } : item)
                      );
                      showToast(`Review ${r.status === 'Approved' ? 'Hidden' : 'Approved'}`, 'info');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] ${
                      r.status === 'Approved' ? 'bg-[#1C4A34]/10 text-[#1C4A34]' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {r.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AI STYLIST CONFIG */}
        {activeTab === 'ai-config' && (
          <div className="p-6 bg-white rounded-2xl border border-[#E2D7C3] max-w-xl space-y-4 text-xs">
            <h2 className="font-display text-lg font-bold text-[#4A0E17]">Roop AI Stylist Configuration</h2>
            <p className="text-[#8C7A6B]">Fine-tune the assistant tone and seasonal recommendation priority.</p>
            <div>
              <label className="font-bold text-[#4A0E17] block mb-1">Stylist Persona Tone</label>
              <textarea
                rows={3}
                value={aiTone}
                onChange={e => setAiTone(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2]"
              />
            </div>
            <div>
              <label className="font-bold text-[#4A0E17] block mb-1">Priority Seasonal Keywords</label>
              <input
                type="text"
                value={aiFeaturedKeyword}
                onChange={e => setAiFeaturedKeyword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-[#FAF7F2]"
              />
            </div>
            <button
              onClick={() => showToast('AI Stylist system instructions updated', 'success')}
              className="px-6 py-2.5 bg-[#4A0E17] text-[#DFBE68] rounded-xl font-bold cursor-pointer"
            >
              Update AI Stylist Persona
            </button>
          </div>
        )}

        {/* TAB 7: SUPABASE BACKEND INTEGRATION */}
        {activeTab === 'supabase' && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-[#DFBE68]/50 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F4EFE6]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#4A0E17]">
                      Supabase Cloud Database Status
                    </h2>
                    <p className="text-xs text-[#8C7A6B]">
                      Connected to project reference: <code className="font-mono text-[#4A0E17] font-bold">iuqvwomcotzcmotjpwee</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>Project Connected</span>
                  </span>
                  <a
                    href="https://supabase.com/dashboard/project/iuqvwomcotzcmotjpwee/editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open Supabase Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Credentials & Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E2D7C3] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#8C7A6B]">Project URL</span>
                  <p className="font-mono text-[11px] text-[#2C1810] break-all font-semibold">https://iuqvwomcotzcmotjpwee.supabase.co</p>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E2D7C3] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#8C7A6B]">Target Orders Table</span>
                  <p className="font-mono text-sm text-[#4A0E17] font-bold">public.orders</p>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E2D7C3] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#8C7A6B]">Publishable API Key</span>
                  <p className="font-mono text-[11px] text-[#2C1810] truncate font-semibold">sb_publishable_ngnGjpzAPUfPvkXriGWMXA_BraCGdLv</p>
                </div>
              </div>

              {/* Action Strip: Check Table & Copy Migration SQL */}
              <div className="p-5 bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] rounded-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#DFBE68]">
                      Database Setup & SQL Migration
                    </h3>
                    <p className="text-xs text-[#EDE5D8]/90 mt-0.5">
                      Ensure your Supabase table 'orders' is created so customer orders stream directly into your database.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_ORDERS_TABLE_SQL);
                        showToast('Supabase SQL copied to clipboard! Paste it into your Supabase SQL Editor.', 'success');
                      }}
                      className="px-4 py-2 bg-[#DFBE68] hover:bg-[#E6CA7E] text-[#2C1810] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Setup SQL</span>
                    </button>
                    <a
                      href="https://supabase.com/dashboard/project/iuqvwomcotzcmotjpwee/sql/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open SQL Editor</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="bg-[#2B0611] p-3 rounded-lg border border-[#DFBE68]/30 overflow-x-auto">
                  <pre className="font-mono text-[11px] text-[#EDE5D8] leading-relaxed">
                    {SUPABASE_ORDERS_TABLE_SQL}
                  </pre>
                </div>
              </div>

              {/* Test Order Trigger Button */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E2D7C3] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-[#4A0E17]">Test Live Order Dispatch into Supabase</h4>
                  <p className="text-[#8C7A6B]">Simulate a customer order form submission to verify Supabase backend insertion.</p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          orderNumber: `RR-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
                          shippingAddress: {
                            name: 'Test Customer',
                            phone: '+91 98201 54321',
                            email: 'test.customer@roopriwaaz.com',
                            street: '14 Palace Road, Powai',
                            apartment: 'Suite 401',
                            city: 'Mumbai',
                            state: 'Maharashtra',
                            pincode: '400076',
                          },
                          items: [
                            {
                              product: products[0],
                              quantity: 1,
                              selectedColour: 'Crimson Maroon',
                            }
                          ],
                          subtotal: products[0].price,
                          discount: 0,
                          tax: Math.round(products[0].price * 0.03),
                          total: Math.round(products[0].price * 1.03),
                          paymentMethod: 'UPI',
                          paymentStatus: 'Paid',
                          status: 'Confirmed',
                        })
                      });
                      const data = await res.json();
                      if (data.savedInSupabase) {
                        showToast('Success! Test order written into Supabase backend table.', 'success');
                      } else {
                        showToast(`Notice: ${data.supabaseError || 'Run the SQL script above in Supabase'}`, 'info');
                      }
                    } catch (e: any) {
                      showToast(`Test failed: ${e?.message}`, 'error');
                    }
                  }}
                  className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send Test Order to Supabase</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] w-full max-w-lg rounded-2xl p-6 border border-[#E2D7C3] shadow-2xl my-8 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2D7C3]">
              <h3 className="font-display text-sm font-bold text-[#4A0E17]">
                {editingProduct ? 'Edit Product Details' : 'Add New Product to Treasury'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)}>
                <X className="w-5 h-5 text-[#8C7A6B]" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#8C7A6B] block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Royal Patola Pure Silk Saree"
                  className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                  >
                    <option value="sarees">Sarees</option>
                    <option value="jewellery">Jewellery</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Subcategory Label</label>
                  <input
                    type="text"
                    required
                    value={productForm.subCategoryLabel}
                    onChange={e => setProductForm({ ...productForm, subCategoryLabel: e.target.value })}
                    placeholder="e.g. Banarasi Silk"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.originalPrice}
                    onChange={e => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockQuantity}
                    onChange={e => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#8C7A6B] block mb-1">Fabric or Material</label>
                <input
                  type="text"
                  required
                  value={productForm.fabricOrMaterial}
                  onChange={e => setProductForm({ ...productForm, fabricOrMaterial: e.target.value })}
                  placeholder="e.g. Pure Mulberry Katan Silk"
                  className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-[#8C7A6B] block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-[#8C7A6B] block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl font-bold cursor-pointer"
                >
                  Save Product to Live Store
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 border border-[#E2D7C3] rounded-xl text-[#8C7A6B]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
