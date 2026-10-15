/**
 * CASAFLOR — Configuración Central de Marca
 * 
 * Reglas de logotipo:
 * El archivo del logotipo real se ubicará en /public/images/casaflor-logo.png.
 * Si el archivo tiene otro nombre, basta con cambiar BRAND_LOGO.
 */

import { BrandConfig } from '../types';
import heroBackupImg from '../assets/images/hero_casaflor_arrangement_1792107271065.jpg';

export const BRAND_LOGO = "/images/casaflor-logo.png";
export const BRAND_LOGO_WIDTH_DESKTOP = "165px";
export const BRAND_LOGO_WIDTH_MOBILE = "125px";

export const HERO_IMAGE = "/images/hero-casaflor.jpg";
export const HERO_BACKUP_IMAGE = heroBackupImg;

export const INITIAL_BRAND_CONFIG: BrandConfig = {
  brandName: "CASAFLOR",
  category: "Floristería",
  address: "Avenida Espavé, Colón, Provincia de Colón, Panamá",
  phone: "474-5707",
  phoneDisplay: "474-5707",
  whatsappNumber: "5074745707", // Formato internacional Panamá para enlace directo
  instagramUrl: "https://www.instagram.com/casaflor_pty/",
  instagramHandle: "@casaflor_pty",
  scheduleText: "Consulta disponibilidad y pedidos anticipados",
  showSchedule: true,
  announcementText: "Un detalle floral puede decirlo todo.",
  showAnnouncement: true,
  commercialMode: "whatsapp", // "whatsapp" (Modo catálogo y pedido WhatsApp) o "persistent" (Modo carrito y pedidos persistentes)
  currency: "USD",
  currencySymbol: "$",
  logoPath: BRAND_LOGO,
  logoWidthDesktop: BRAND_LOGO_WIDTH_DESKTOP,
  logoWidthMobile: BRAND_LOGO_WIDTH_MOBILE,
  heroImagePath: HERO_IMAGE,
};
