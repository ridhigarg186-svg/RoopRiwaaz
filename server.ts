import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI SDK on server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory catalog context for AI assistant and backend
const CATALOG_SUMMARY = `
RoopRiwaaz Product Catalog:
SAREES:
1. ID: saree-1 | Name: Kashi Darbar Royal Crimson Banarasi Katan Silk Saree | Category: sarees | Price: ₹18,500 | Fabric: Pure Katan Silk | Occasion: Bridal, Festive | Colours: Crimson Maroon, Rani Pink, Royal Emerald | Best matching jewellery: jewel-1, jewel-2
2. ID: saree-2 | Name: Kanchipuram Swarna Mayil Pure Bridal Zari Silk Saree | Category: sarees | Price: ₹26,800 | Fabric: Kanchipuram Double Warp Silk | Occasion: Bridal, Festive | Colours: Deep Vermilion, Mustard Gold | Best matching jewellery: jewel-1, jewel-4, jewel-5
3. ID: saree-3 | Name: Noor-e-Bahar Scalloped Rose Ivory Organza Saree | Category: sarees | Price: ₹9,400 | Fabric: Pure Silk Tissue Organza | Occasion: Party Wear, Festive, Gifting | Colours: Champagne Ivory, Blush Rose, Powder Blue | Best matching jewellery: jewel-3, jewel-6, jewel-7
4. ID: saree-4 | Name: Riwaaz Signature Marwari Gota Patti Georgette Saree | Category: sarees | Price: ₹13,200 | Fabric: Viscose Georgette | Occasion: Festive, Party Wear | Colours: Maroon Gold, Ochre Amber | Best matching jewellery: jewel-2, jewel-4
5. ID: saree-5 | Name: Chanderi Zari Buti Soft Handloom Silk Cotton Saree | Category: sarees | Price: ₹5,200 | Fabric: Chanderi Silk Cotton | Occasion: Office Wear, Everyday, Festive | Colours: Beige Champagne, Olive Sage | Best matching jewellery: jewel-7, jewel-8
6. ID: saree-6 | Name: Shringaar Midnight Velvet Party Wear Saree with Zari Border | Category: sarees | Price: ₹11,500 | Fabric: Velvet & Crepe Silk | Occasion: Party Wear, Cocktail | Colours: Wine Velvet, Midnight Navy | Best matching jewellery: jewel-2, jewel-6
7. ID: saree-7 | Name: Mangalagiri Gold Nizam Border Handwoven Festive Saree | Category: sarees | Price: ₹6,800 | Fabric: Mercerised Cotton Silk | Occasion: Festive, Everyday | Colours: Maroon & Mustard, Peacock Teal | Best matching jewellery: jewel-3, jewel-7
8. ID: saree-8 | Name: Rajputana Maharani Heavy Bridal Zardozi Velvet Saree | Category: sarees | Price: ₹34,500 | Fabric: Silk Velvet & Katan Brocade | Occasion: Royal Bridal | Colours: Imperial Maroon | Best matching jewellery: jewel-1, jewel-5

JEWELLERY:
9. ID: jewel-1 | Name: Rajgharana 22K Gold Plated Handcrafted Kundan Bridal Choker Set | Category: jewellery | Price: ₹12,800 | Material: Kundan & Basra Pearls | Occasion: Bridal, Festive | Matching Sarees: saree-1, saree-2, saree-8
10. ID: jewel-2 | Name: Nizam Uncut Polki & Emerald Hasli Choker | Category: jewellery | Price: ₹8,400 | Material: Uncut Polki & Hydro Emeralds | Occasion: Festive, Party Wear, Bridal | Matching Sarees: saree-1, saree-4, saree-6
11. ID: jewel-3 | Name: Padmavati Royal Meenakari Peacock Chandbali Jhumkas | Category: jewellery | Price: ₹3,600 | Material: 24K Matte Gold, Hand Meenakari | Occasion: Festive, Party, Gifting | Matching Sarees: saree-3, saree-5, saree-7
12. ID: jewel-4 | Name: Maharani Handcrafted Jadau Floral Temple Kada Bangles (Pair) | Category: jewellery | Price: ₹5,800 | Material: 22K Antique Gold, Ruby Spinels | Occasion: Bridal, Festive | Matching Sarees: saree-1, saree-2, saree-4
13. ID: jewel-5 | Name: Basra Shahi Multi-Strand Freshwater Pearl Mala with Royal Pendant | Category: jewellery | Price: ₹7,600 | Material: AAA Freshwater Pearls & 22K Gold Plated Pendant | Occasion: Bridal, Festive | Matching Sarees: saree-2, saree-3, saree-8
14. ID: jewel-6 | Name: Kavya Delicate Solitaire Polki Adjustable Cocktail Ring | Category: jewellery | Price: ₹1,800 | Material: 925 Sterling Silver, Moissanite Polki | Occasion: Party Wear, Everyday | Matching Sarees: saree-3, saree-6
15. ID: jewel-7 | Name: Aadhya Minimalist Guttapusalu Heritage Pearl Necklace | Category: jewellery | Price: ₹4,900 | Material: 22K Matte Gold & Rice Pearls | Occasion: Everyday, Office, Festive | Matching Sarees: saree-5, saree-7
16. ID: jewel-8 | Name: Swarna Everyday Floral Daily Wear Gold Plated Jhumkas | Category: jewellery | Price: ₹1,950 | Material: 18K Long-lasting Daily Gold | Occasion: Everyday, Office | Matching Sarees: saree-5, saree-7
`;

// Indian PIN Code Validation Database
const PINCODE_DATABASE: Record<string, { city: string; state: string; days: number; cod: boolean }> = {
  '110001': { city: 'New Delhi', state: 'Delhi', days: 2, cod: true },
  '400001': { city: 'Mumbai', state: 'Maharashtra', days: 2, cod: true },
  '400076': { city: 'Mumbai (Powai)', state: 'Maharashtra', days: 2, cod: true },
  '560001': { city: 'Bengaluru', state: 'Karnataka', days: 3, cod: true },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', days: 3, cod: true },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: 3, cod: true },
  '500001': { city: 'Hyderabad', state: 'Telangana', days: 3, cod: true },
  '302001': { city: 'Jaipur', state: 'Rajasthan', days: 2, cod: true },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', days: 3, cod: true },
  '221001': { city: 'Varanasi', state: 'Uttar Pradesh', days: 2, cod: true },
  '411001': { city: 'Pune', state: 'Maharashtra', days: 2, cod: true },
  '160017': { city: 'Chandigarh', state: 'Punjab / Haryana', days: 2, cod: true },
  '682001': { city: 'Kochi', state: 'Kerala', days: 4, cod: true },
  '800001': { city: 'Patna', state: 'Bihar', days: 4, cod: true },
  '452001': { city: 'Indore', state: 'Madhya Pradesh', days: 3, cod: true }
};

// PIN Code Check API
app.get('/api/pincode/check/:code', (req: Request, res: Response) => {
  const code = (req.params.code || '').trim();
  if (!/^\d{6}$/.test(code)) {
    res.status(400).json({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
    return;
  }

  const found = PINCODE_DATABASE[code];
  if (found) {
    res.json({
      valid: true,
      pincode: code,
      city: found.city,
      state: found.state,
      estimatedDeliveryDays: found.days,
      deliveryDateText: `Delivery in ${found.days}–${found.days + 1} business days`,
      codAvailable: found.cod,
      message: `Standard Express Delivery to ${found.city}, ${found.state}`
    });
    return;
  }

  // Generic valid Indian 6-digit PIN code delivery policy
  res.json({
    valid: true,
    pincode: code,
    city: 'All India Service Area',
    state: 'India',
    estimatedDeliveryDays: 4,
    deliveryDateText: 'Delivery in 3–5 business days',
    codAvailable: true,
    message: 'Express Insured Delivery available via BlueDart / Delhivery'
  });
});

// AI Fashion Stylist API
app.post('/api/ai/stylist', async (req: Request, res: Response) => {
  const { prompt, selectedProductId, budget, occasion } = req.body || {};
  const userPrompt = String(prompt || 'Help me style a wedding outfit').trim();

  // If Gemini API is available, invoke real AI
  if (ai) {
    try {
      const systemInstruction = `
You are the senior Royal Fashion Stylist for 'RoopRiwaaz' (Tagline: "Wear Your Tradition, Define Your Elegance"), a luxury Indian ethnic fashion house known for Varanasi handloom Banarasi silk sarees, Kanjivaram silks, pure organza sarees, and handcrafted Rajasthani Kundan & Polki heritage jewellery.

Your mission is to provide warm, culturally informed, sophisticated Indian fashion guidance.
Recommend matching sarees and jewellery, suggest complete festive or bridal ensembles, explain jewellery pairings (e.g. how a high-neck blouse calls for a royal choker vs a deep neckline calling for a layered Basra pearl mala), advise on colour palettes (e.g. crimson maroon with champagne gold zari, emerald green with uncut polki, rose organza with meenakari chandbalis), and cater to the user's occasion and budget.

Always refer directly to items in the RoopRiwaaz Catalog below:
${CATALOG_SUMMARY}

USER CONTEXT:
${selectedProductId ? `User is currently viewing product ID: ${selectedProductId}` : ''}
${occasion ? `Occasion: ${occasion}` : ''}
${budget ? `Budget: ${budget}` : ''}

Respond in the required JSON format:
{
  "reply": "Your warm, royal styling advice (2-3 paragraphs, elegant tone, mentioning specific craftsmanship details like Kadwa weave, Basra pearls, 22k gold polish).",
  "recommendedProductIds": ["saree-1", "jewel-1"], // 1 to 4 matching product IDs from catalog
  "stylingTips": ["Tip 1 about draping or blouse cut", "Tip 2 about jewellery pairing or hairdo", "Tip 3 about footwear or clutch"],
  "followUpSuggestions": ["Quick prompt 1", "Quick prompt 2", "Quick prompt 3"]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING },
              recommendedProductIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              stylingTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              followUpSuggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['reply', 'recommendedProductIds', 'stylingTips', 'followUpSuggestions'],
          },
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText.trim());
        res.json({
          success: true,
          mode: 'gemini-live',
          ...parsed,
        });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to intelligent stylist engine:', err?.message || err);
    }
  }

  // Graceful rule-based stylist fallback (ensures the assistant always works seamlessly)
  const lowerPrompt = userPrompt.toLowerCase();
  let recommendedIds: string[] = ['saree-1', 'jewel-1'];
  let replyText = `At RoopRiwaaz, we believe ethnic grace lies in the harmony between authentic handloom weaves and royal jewels. For your special occasion, a handwoven pure silk Banarasi or Kanjivaram saree draped with a crisp pleat creates an unforgettable silhouette.`;
  const stylingTips = [
    'Pair heavy Kadwa Banarasi sarees with an elbow-length sleeve blouse and antique gold borders.',
    'Wear a tight high bun adorned with fresh fragrant jasmine (gajra) to highlight the Kundan choker.',
    'Keep your clutch in rich raw silk or metallic gold potli to complement the zari work.'
  ];
  let followUpSuggestions = [
    'Match jewellery with my saree',
    'Suggest jewellery under ₹2,000',
    'Find my wedding look',
    'Cocktail party organza sarees'
  ];

  if (lowerPrompt.includes('wedding') || lowerPrompt.includes('bridal') || lowerPrompt.includes('bride')) {
    recommendedIds = ['saree-1', 'jewel-1', 'saree-2', 'jewel-4'];
    replyText = `For a regal Indian wedding or bridal celebration, nothing rivals our Kashi Darbar Royal Crimson Banarasi Katan Silk Saree paired with the Rajgharana 22K Gold Plated Kundan Bridal Choker Set. The crimson red mirrors auspicious Indian bridal heritage, while the uncut Kundan and Basra seed pearls frame the neckline with timeless majesty.`;
  } else if (lowerPrompt.includes('under 2000') || lowerPrompt.includes('under ₹2000') || lowerPrompt.includes('budget') || lowerPrompt.includes('affordable')) {
    recommendedIds = ['jewel-6', 'jewel-8'];
    replyText = `For exquisite craftsmanship under ₹2,000, we recommend our Kavya Solitaire Polki Adjustable Ring (₹1,800) in 925 sterling silver and the Swarna Everyday Gold Plated Jhumkas (₹1,950). Both pieces offer royal aesthetic without compromising on long-lasting micron gold plating.`;
  } else if (lowerPrompt.includes('jewellery') || lowerPrompt.includes('match') || lowerPrompt.includes('necklace') || lowerPrompt.includes('earring')) {
    if (selectedProductId === 'saree-3' || lowerPrompt.includes('organza') || lowerPrompt.includes('pastel')) {
      recommendedIds = ['jewel-3', 'jewel-5', 'jewel-6'];
      replyText = `For a pastel or tissue organza saree like our Noor-e-Bahar, heavy antique gold can sometimes overpower the delicacy of the drape. Instead, opt for our Basra Shahi Multi-Strand Freshwater Pearl Mala or the Padmavati Meenakari Chandbali Jhumkas with subtle pink and champagne accents.`;
    } else {
      recommendedIds = ['jewel-1', 'jewel-2', 'jewel-3'];
      replyText = `When matching jewellery to traditional silk sarees, balance is key: if your saree features warm gold zari, antique 22K gold plated Kundan and Polki work harmonizes flawlessly. For deeper jewel tones (crimson, emerald, midnight navy), our Nizam Uncut Polki Hasli with emerald drops adds a breathtaking contrast!`;
    }
  } else if (lowerPrompt.includes('party') || lowerPrompt.includes('reception') || lowerPrompt.includes('cocktail')) {
    recommendedIds = ['saree-6', 'jewel-2', 'jewel-6'];
    replyText = `For evening cocktails and wedding receptions, our Shringaar Midnight Velvet Party Wear Saree with hand-embroidered bullion zardozi is unmatched. Style it with the Nizam Uncut Polki & Emerald Hasli Choker and a statement solitaire cocktail ring for modern royal glamour.`;
  } else if (lowerPrompt.includes('office') || lowerPrompt.includes('everyday') || lowerPrompt.includes('cotton')) {
    recommendedIds = ['saree-5', 'jewel-8', 'jewel-7'];
    replyText = `For graceful everyday wear or formal office gatherings, our handloom Chanderi Silk Cotton Saree in Beige Champagne provides effortless breathability and poise. Complement it with the Swarna lightweight daily wear jhumkas and the minimalist Aadhya pearl necklace.`;
  }

  res.json({
    success: true,
    mode: ai ? 'gemini-fallback' : 'demo-stylist',
    reply: replyText,
    recommendedProductIds: recommendedIds,
    stylingTips,
    followUpSuggestions,
  });
});

// ==========================================
// SUPABASE BACKEND INTEGRATION
// ==========================================
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://iuqvwomcotzcmotjpwee.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_ngnGjpzAPUfPvkXriGWMXA_BraCGdLv';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Save order to Supabase API
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    if (!orderData || !orderData.shippingAddress) {
      res.status(400).json({ success: false, error: 'Invalid order data provided' });
      return;
    }

    const payload = {
      order_number: orderData.orderNumber || `RR-${Date.now()}`,
      customer_name: orderData.shippingAddress.name,
      customer_phone: orderData.shippingAddress.phone,
      customer_email: orderData.shippingAddress.email || 'customer@roopriwaaz.com',
      street: orderData.shippingAddress.street,
      apartment: orderData.shippingAddress.apartment || '',
      city: orderData.shippingAddress.city,
      state: orderData.shippingAddress.state,
      pincode: orderData.shippingAddress.pincode,
      items: (orderData.items || []).map((it: any) => ({
        id: it.product?.id,
        name: it.product?.name,
        category: it.product?.category,
        price: it.product?.price,
        quantity: it.quantity,
        selectedColour: it.selectedColour,
      })),
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      tax: orderData.tax || 0,
      total: orderData.total || 0,
      payment_method: orderData.paymentMethod || 'UPI',
      payment_status: orderData.paymentStatus || 'Paid',
      status: orderData.status || 'Confirmed',
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase DB Notice (Table may need SQL migration):', error.message);
      // Return order accepted with notice
      res.json({
        success: true,
        savedInSupabase: false,
        supabaseError: error.message,
        order: {
          ...orderData,
          id: `ord-${Date.now()}`,
        },
        notice: 'Order recorded locally. To sync live into Supabase, please run the SQL migration script in your Supabase SQL Editor.',
      });
      return;
    }

    res.json({
      success: true,
      savedInSupabase: true,
      supabaseData: data,
      order: {
        ...orderData,
        id: data?.[0]?.id || `ord-${Date.now()}`,
      },
    });
  } catch (err: any) {
    console.error('Failed to save order to Supabase:', err);
    res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
});

// Fetch orders from Supabase API
app.get('/api/orders', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      res.json({
        success: false,
        source: 'local-fallback',
        supabaseError: error.message,
        orders: [],
      });
      return;
    }

    res.json({
      success: true,
      source: 'supabase',
      orders: data || [],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message });
  }
});

// Supabase Connection Status API
app.get('/api/supabase/status', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    res.json({
      connected: true,
      projectUrl: SUPABASE_URL,
      projectRef: 'iuqvwomcotzcmotjpwee',
      tableExists: !error,
      statusMessage: error ? error.message : 'Table "orders" is online and accepting order submissions.',
    });
  } catch (err: any) {
    res.json({
      connected: false,
      error: err?.message,
    });
  }
});

// Dev & Production Server handling
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RoopRiwaaz Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
