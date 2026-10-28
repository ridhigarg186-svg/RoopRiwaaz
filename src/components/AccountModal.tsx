import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  Truck, 
  Clock, 
  RotateCcw, 
  X, 
  Check, 
  Plus,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, ShippingAddress } from '../types';

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    updateUserProfile,
    orders,
    cancelOrder,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    setCurrentView,
    setSelectedProduct,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of mind / Found another color');

  // Address form state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'Home'
  });

  // Profile edit state
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '');

  if (!currentUser) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#4A0E17] flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#C59B27]" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#4A0E17]">
          Welcome to RoopRiwaaz
        </h2>
        <p className="text-xs text-[#8C7A6B] mt-2 mb-6">
          Please log in to view your order history, manage saved addresses, and track royal shipments.
        </p>
      </div>
    );
  }

  // Wishlist products
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: nameInput, phone: phoneInput });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    const updated = [...(currentUser.savedAddresses || []), newAddress];
    updateUserProfile({ savedAddresses: updated });
    setIsAddingAddress(false);
    setNewAddress({
      name: currentUser.name,
      phone: currentUser.phone,
      street: '',
      apartment: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'Home'
    });
    showToast('New delivery address saved', 'success');
  };

  const handleConfirmCancel = () => {
    if (!cancelModalOrder) return;
    cancelOrder(cancelModalOrder.id, cancelReason);
    setCancelModalOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* Account Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#4A0E17] to-[#3B0918] text-[#FAF7F2] mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#DFBE68]/40 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#DFBE68]/20 border-2 border-[#DFBE68] flex items-center justify-center text-[#DFBE68] text-xl font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#DFBE68] font-bold block">
              Royal Member Club
            </span>
            <h1 className="font-display text-2xl font-bold text-[#FAF7F2]">
              {currentUser.name}
            </h1>
            <p className="text-xs text-[#EDE5D8]/80">{currentUser.email} · {currentUser.phone}</p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[#EDE5D8] rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3 bg-white p-3 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-1">
          {[
            { id: 'orders', label: 'Order History', icon: Package, count: orders.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: currentUser.savedAddresses.length },
            { id: 'profile', label: 'Profile Details', icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4A0E17] text-[#DFBE68] shadow-sm'
                    : 'text-[#4A0E17] hover:bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive ? 'bg-[#DFBE68] text-[#2C1810]' : 'bg-[#F4EFE6] text-[#8C7A6B]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-[#4A0E17]">
                Your Orders & Tracking
              </h2>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E2D7C3]">
                  <Package className="w-10 h-10 text-[#8C7A6B] mx-auto mb-2" />
                  <p className="text-xs text-[#8C7A6B]">You have not placed any orders yet.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-5 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F4EFE6]">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C7A6B]">Order Ref</span>
                        <p className="text-xs font-mono font-bold text-[#4A0E17]">{order.orderNumber}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C7A6B]">Date</span>
                        <p className="text-xs font-medium text-[#2C1810]">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C7A6B]">Total</span>
                        <p className="text-xs font-bold text-[#6B1724] tabular-nums">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-[#1C4A34]/10 text-[#1C4A34]'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-[#DFBE68]/20 text-[#4A0E17]'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-[#F4EFE6]">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.product.image}
                              alt={it.product.name}
                              className="w-12 h-14 object-cover rounded-lg border border-[#E2D7C3] shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-[#2C1810]">{it.product.name}</p>
                              <p className="text-[11px] text-[#8C7A6B]">Qty: {it.quantity} · Shade: {it.selectedColour}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#6B1724] tabular-nums">
                            ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F4EFE6]">
                      <button
                        onClick={() => setSelectedOrderForTracking(order)}
                        className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Shipment Status</span>
                      </button>

                      {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                        <button
                          onClick={() => setCancelModalOrder(order)}
                          className="px-4 py-2 border border-[#E2D7C3] text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        >
                          Request Cancellation
                        </button>
                      )}

                      {order.status === 'Delivered' && (
                        <button
                          onClick={() => showToast('Return pickup request scheduled within 48 hours.', 'info')}
                          className="px-4 py-2 border border-[#E2D7C3] text-xs font-semibold text-[#4A0E17] hover:bg-[#F4EFE6] rounded-xl transition-colors flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Initiate 7-Day Return</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-[#4A0E17]">
                Your Royal Wishlist ({wishlistProducts.length})
              </h2>

              {wishlistProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E2D7C3]">
                  <Heart className="w-10 h-10 text-[#8C7A6B] mx-auto mb-2" />
                  <p className="text-xs text-[#8C7A6B]">You have no saved creations in your wishlist.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistProducts.map(p => (
                    <div
                      key={p.id}
                      className="p-3 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F4EFE6] mb-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-rose-600 hover:scale-110 transition-transform"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <p className="text-[10px] text-[#8C7A6B] uppercase font-bold">{p.subCategoryLabel}</p>
                        <h4 
                          onClick={() => {
                            setSelectedProduct(p);
                            setCurrentView('product-detail');
                          }}
                          className="font-display text-xs font-bold text-[#2C1810] truncate hover:text-[#6B1724] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <p className="text-xs font-extrabold text-[#6B1724] mt-1 tabular-nums">
                          ₹{p.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(p, 1)}
                        className="mt-3 w-full py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#DFBE68] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[#4A0E17]">
                  Saved Shipping Addresses
                </h2>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-3 py-1.5 bg-[#4A0E17] text-[#DFBE68] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="p-5 bg-white rounded-2xl border border-[#E2D7C3] space-y-3 animate-in fade-in duration-150">
                  <h4 className="font-display text-xs font-bold text-[#4A0E17]">New Delivery Address</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-[#E2D7C3]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone (+91)"
                      value={newAddress.phone}
                      onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-[#E2D7C3]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="House / Street Address"
                      value={newAddress.street}
                      onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="col-span-2 px-3 py-2 rounded-lg border border-[#E2D7C3]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newAddress.city}
                      onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-[#E2D7C3]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={newAddress.state}
                      onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-[#E2D7C3]"
                    />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="PIN Code"
                      value={newAddress.pincode}
                      onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value.replace(/\D/g, '') })}
                      className="px-3 py-2 rounded-lg border border-[#E2D7C3]"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4A0E17] text-[#DFBE68] rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 border border-[#E2D7C3] rounded-lg text-xs font-semibold text-[#8C7A6B]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentUser.savedAddresses.map((addr, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs text-xs space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#4A0E17]">{addr.name}</span>
                      <span className="text-[10px] bg-[#F4EFE6] text-[#4A0E17] px-2 py-0.5 rounded font-bold">
                        {addr.addressType}
                      </span>
                    </div>
                    <p className="text-[#6B7280]">{addr.street}</p>
                    <p className="text-[#6B7280]">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-[#6B7280]">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="p-6 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs max-w-lg space-y-4">
              <h2 className="font-display text-lg font-bold text-[#4A0E17]">
                Personal Profile
              </h2>
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3] bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#8C7A6B] block mb-1">Phone Number (+91)</label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2D7C3]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4A0E17] text-[#DFBE68] rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Tracking Modal */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] w-full max-w-md rounded-2xl p-6 border border-[#E2D7C3] shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2D7C3]">
              <div>
                <h3 className="font-display text-sm font-bold text-[#4A0E17]">
                  Shipment Tracking · {selectedOrderForTracking.orderNumber}
                </h3>
                <p className="text-[11px] text-[#8C7A6B]">Courier: BlueDart Royal Express (AWB: #773928104)</p>
              </div>
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="p-1 rounded-full text-[#8C7A6B] hover:text-[#4A0E17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2D7C3] text-xs">
              {selectedOrderForTracking.trackingSteps.map((st, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                    st.completed ? 'bg-[#1C4A34] border-[#1C4A34]' : 'bg-white border-[#8C7A6B]'
                  }`} />
                  <p className={`font-bold ${st.completed ? 'text-[#1C4A34]' : 'text-[#8C7A6B]'}`}>
                    {st.title}
                  </p>
                  <p className="text-[11px] text-[#6B7280]">{st.description} · <em>{st.date}</em></p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrderForTracking(null)}
              className="w-full py-2.5 bg-[#4A0E17] text-[#DFBE68] rounded-xl text-xs font-bold"
            >
              Close Tracking
            </button>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] w-full max-w-sm rounded-2xl p-6 border border-[#E2D7C3] shadow-2xl space-y-4 animate-in zoom-in-95">
            <h3 className="font-display text-sm font-bold text-rose-700">
              Cancel Order {cancelModalOrder.orderNumber}?
            </h3>
            <p className="text-xs text-[#6B7280]">
              Orders that have not yet reached transit dispatch are eligible for full instant refund to your original payment method.
            </p>
            <div>
              <label className="text-xs font-semibold text-[#4A0E17] block mb-1">Reason for cancellation:</label>
              <select
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#E2D7C3] bg-white"
              >
                <option value="Change of mind / Found another color">Change of mind / Found another color</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Need delivery earlier than estimated">Need delivery earlier than estimated</option>
                <option value="Other">Other reasons</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Cancellation
              </button>
              <button
                onClick={() => setCancelModalOrder(null)}
                className="px-4 py-2 border border-[#E2D7C3] text-xs font-semibold rounded-lg text-[#8C7A6B]"
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
