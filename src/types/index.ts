export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'custom_order';

export type CommercialMode = 'whatsapp' | 'persistent';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promoPrice?: number;
  category: string;
  images: string[];
  mainImage: string;
  availability: AvailabilityStatus;
  tags: string[];
  isPublished: boolean;
  order: number;
  isDemo?: boolean;
  dimensions?: string;
  careTips?: string;
  stemsInfo?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  dedicationNote?: string;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  deliveryDate?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  deliveryDate?: string;
  items: {
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    image: string;
    dedicationNote?: string;
  }[];
  total: number;
  status: 'pending' | 'in_preparation' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  orderMode: CommercialMode;
}

export interface BrandConfig {
  brandName: string;
  category: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  scheduleText: string;
  showSchedule: boolean;
  announcementText: string;
  showAnnouncement: boolean;
  commercialMode: CommercialMode;
  currency: string;
  currencySymbol: string;
  logoPath: string;
  logoWidthDesktop: string;
  logoWidthMobile: string;
  heroImagePath: string;
}
