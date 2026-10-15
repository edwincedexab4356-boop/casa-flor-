/**
 * CASAFLOR — Luxury Floral Experience
 * Avenida Espavé, Colón, Provincia de Colón, Panamá
 * Tel: 474-5707 | Instagram: @casaflor_pty
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { CollectionsSection } from './components/home/CollectionsSection';
import { CatalogSection } from './components/catalog/CatalogSection';
import { BrandEssenceSection } from './components/home/BrandEssenceSection';
import { VisualGallery } from './components/home/VisualGallery';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { AdminModal } from './components/admin/AdminModal';
import { Toast } from './components/common/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#F8F5EF] text-[#252521] flex flex-col font-sans selection:bg-[#263D32] selection:text-[#F8F5EF]">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Global Luxury Navigation */}
        <Navbar />

        {/* Main Content Flow */}
        <main className="flex-1">
          <Hero />
          <CollectionsSection />
          <CatalogSection />
          <BrandEssenceSection />
          <VisualGallery />
          <ContactSection />
        </main>

        {/* Editorial Footer */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <AdminModal />
        <Toast />
      </div>
    </StoreProvider>
  );
}
