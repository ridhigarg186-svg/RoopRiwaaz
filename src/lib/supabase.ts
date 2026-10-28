import { createClient } from '@supabase/supabase-js';
import { Order } from '../types';

export const SUPABASE_URL = 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  'https://iuqvwomcotzcmotjpwee.supabase.co';

export const SUPABASE_ANON_KEY = 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
  'sb_publishable_ngnGjpzAPUfPvkXriGWMXA_BraCGdLv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_ORDERS_TABLE_SQL = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/iuqvwomcotzcmotjpwee/sql):

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    customer_email TEXT,
    street TEXT,
    apartment TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    items JSONB,
    subtotal NUMERIC,
    discount NUMERIC,
    tax NUMERIC,
    total NUMERIC,
    payment_method TEXT,
    payment_status TEXT,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & policies for customer checkouts
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select" 
ON public.orders 
FOR SELECT 
USING (true);
`;

export interface SupabaseOrderPayload {
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  items: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    selectedColour?: string;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payment_method: string;
  payment_status: string;
  status: string;
}

/**
 * Saves order form details into the Supabase 'orders' table
 */
export async function saveOrderToSupabase(order: Order, customerEmail?: string) {
  try {
    const simplifiedItems = order.items.map(it => ({
      id: it.product.id,
      name: it.product.name,
      category: it.product.category,
      price: it.product.price,
      quantity: it.quantity,
      selectedColour: it.selectedColour,
    }));

    // Format payload with standard snake_case columns
    const payload: SupabaseOrderPayload = {
      order_number: order.orderNumber,
      customer_name: order.shippingAddress.name,
      customer_phone: order.shippingAddress.phone,
      customer_email: customerEmail || 'customer@roopriwaaz.com',
      street: order.shippingAddress.street,
      apartment: order.shippingAddress.apartment || '',
      city: order.shippingAddress.city,
      state: order.shippingAddress.state,
      pincode: order.shippingAddress.pincode,
      items: simplifiedItems,
      subtotal: order.subtotal,
      discount: order.discount,
      tax: order.tax,
      total: order.total,
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      status: order.status,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase order insert notice:', error.message || error);
      return {
        success: false,
        error: error.message,
        tableMissing: error.message?.includes('does not exist') || error.message?.includes('schema cache'),
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error('Error saving order to Supabase:', err);
    return {
      success: false,
      error: err?.message || 'Unknown network error',
    };
  }
}

/**
 * Check if the Supabase orders table exists
 */
export async function checkSupabaseOrdersTable() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (error) {
      return {
        connected: true,
        tableExists: false,
        message: error.message,
      };
    }

    return {
      connected: true,
      tableExists: true,
      message: 'Orders table is active and receiving live checkout submissions.',
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: err?.message || 'Unable to reach Supabase project',
    };
  }
}
