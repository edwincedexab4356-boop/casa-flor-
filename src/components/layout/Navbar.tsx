import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';
import { ShoppingBag, Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsAdminOpen, brandConfig } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Colecciones', href: '#colecciones' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Nuestra esencia', href: '#esencia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#263D32]/10 py-3.5 shadow-[0_2px_15px_rgba(38,61,50,0.03)]'
            : 'bg-[#F8F5EF] md:bg-[#F8F5EF]/90 backdrop-blur-sm py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263D32]"
            aria-label="CASAFLOR — Inicio"
          >
            <BrandLogo isScrolled={isScrolled} />
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs tracking-[0.14em] uppercase font-medium text-[#252521]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative py-1 whitespace-nowrap text-[#252521] hover:text-[#263D32] transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#263D32] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart & Admin trigger) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Discreet Admin Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#263D32]/60 hover:text-[#263D32] p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263D32]"
              title="Panel de Administración"
              aria-label="Administración"
            >
              <Shield size={16} />
            </button>

            {/* Shopping Bag / Selection Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#263D32] hover:text-[#1A2B23] transition-all active:scale-[0.97] rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263D32]"
              aria-label={`Bolsa floral con ${cartCount} arreglos`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#632F3B] text-[#F8F5EF] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#263D32] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263D32]"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#252521]/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-[#F8F5EF] w-full max-h-[85vh] rounded-t-2xl p-6 shadow-2xl flex flex-col border-t border-[#263D32]/10 overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-[#263D32]/10">
              <BrandLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#263D32] hover:opacity-70 transition-opacity"
                aria-label="Cerrar menú móvil"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="py-6 flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base tracking-[0.16em] uppercase text-[#252521] hover:text-[#263D32] py-2 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-[#263D32]/10 text-center text-xs text-[#252521]/80 space-y-2">
              <p className="font-editorial text-base text-[#263D32] font-semibold">
                {brandConfig.address}
              </p>
              <p>
                Teléfono:{' '}
                <a
                  href={`tel:${brandConfig.phone}`}
                  className="font-semibold text-[#263D32] underline underline-offset-2"
                >
                  {brandConfig.phoneDisplay}
                </a>
              </p>
              <div className="pt-3">
                <a
                  href={brandConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#632F3B] hover:underline font-medium"
                >
                  Instagram: {brandConfig.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
