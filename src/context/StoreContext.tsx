import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, BrandConfig, CommercialMode } from '../types';
import { INITIAL_BRAND_CONFIG } from '../config/brand.config';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialData';

interface StoreContextType {
  // Brand Configuration
  brandConfig: BrandConfig;
  updateBrandConfig: (newConfig: Partial<BrandConfig>) => void;
  resetBrandConfig: () => void;

  // Catalog
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Category CRUD
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, note?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Commercial orders
  orders: Order[];
  placePersistentOrder: (customer: { name: string; phone: string; address?: string; notes?: string; deliveryDate?: string }) => Order;
  generateWhatsAppLink: (customer?: { name?: string; address?: string; notes?: string }) => string;
  generateProductInquiryLink: (product: Product) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Admin Modal
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminAuthenticated: boolean;
  setAdminAuthenticated: (auth: boolean) => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BRAND: 'casaflor_brand_v1',
  PRODUCTS: 'casaflor_products_v1',
  CATEGORIES: 'casaflor_categories_v1',
  CART: 'casaflor_cart_v1',
  ORDERS: 'casaflor_orders_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Brand Config
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
      if (saved) return { ...INITIAL_BRAND_CONFIG, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return INITIAL_BRAND_CONFIG;
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_CATEGORIES;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brandConfig));
    } catch (e) {
      console.error(e);
    }
  }, [brandConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const updateBrandConfig = (newConfig: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Configuración de marca actualizada');
  };

  const resetBrandConfig = () => {
    setBrandConfig(INITIAL_BRAND_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    showToast('Valores restablecidos a la configuración inicial');
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" añadido al catálogo`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`"${updated.name}" actualizado`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
    showToast('Producto eliminado');
  };

  // Category CRUD
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Categoría "${newCat.name}" añadida`);
  };

  const updateCategory = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`Categoría "${updated.name}" actualizada`);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    showToast('Categoría eliminada');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, note?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          dedicationNote: note || next[existingIndex].dedicationNote,
        };
        return next;
      }
      return [...prev, { product, quantity, dedicationNote: note }];
    });
    showToast(`"${product.name}" añadido a la selección`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Arreglo retirado de la selección');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp order formatting
  const generateWhatsAppLink = (customer?: { name?: string; address?: string; notes?: string }) => {
    const phone = brandConfig.whatsappNumber.replace(/[^0-9]/g, '');
    if (!phone) return '#';

    let message = `¡Hola CASAFLOR! Me gustaría coordinar un pedido desde su catálogo web:\n\n`;

    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}* (x${item.quantity}) — $${(item.product.price * item.quantity).toFixed(2)}\n`;
      if (item.dedicationNote) {
        message += `   _Nota/Dedicatoria: "${item.dedicationNote}"_\n`;
      }
    });

    message += `\n*Total estimado: $${cartTotal.toFixed(2)} USD*`;

    if (customer?.name) {
      message += `\n\n*Datos de contacto:*`;
      message += `\nNombre: ${customer.name}`;
      if (customer.address) message += `\nDirección en Colón: ${customer.address}`;
      if (customer.notes) message += `\nDetalles adicionales: ${customer.notes}`;
    }

    message += `\n\n¿Tienen disponibilidad para coordinar la entrega o retiro en Avenida Espavé? Muchas gracias.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateProductInquiryLink = (product: Product) => {
    const phone = brandConfig.whatsappNumber.replace(/[^0-9]/g, '');
    if (!phone) return '#';

    const message = `¡Hola CASAFLOR! Quisiera consultar disponibilidad y detalles sobre el arreglo *${product.name}* ($${product.price.toFixed(2)} USD) visto en su web. ¿Tienen fecha próxima de entrega o confección? Gracias.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // Persistent orders
  const placePersistentOrder = (customer: {
    name: string;
    phone: string;
    address?: string;
    notes?: string;
    deliveryDate?: string;
  }): Order => {
    const newOrder: Order = {
      id: `CF-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      deliveryDate: customer.deliveryDate,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        productPrice: c.product.price,
        quantity: c.quantity,
        image: c.product.mainImage,
        dedicationNote: c.dedicationNote,
      })),
      total: cartTotal,
      status: 'pending',
      notes: customer.notes,
      createdAt: new Date().toISOString(),
      orderMode: 'persistent',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Pedido #${newOrder.id} registrado con éxito`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Estado del pedido ${orderId} actualizado a ${status}`);
  };

  return (
    <StoreContext.Provider
      value={{
        brandConfig,
        updateBrandConfig,
        resetBrandConfig,
        products,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        selectedProduct,
        setSelectedProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placePersistentOrder,
        generateWhatsAppLink,
        generateProductInquiryLink,
        updateOrderStatus,
        isAdminOpen,
        setIsAdminOpen,
        adminAuthenticated,
        setAdminAuthenticated,
        toastMessage,
        showToast,
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
