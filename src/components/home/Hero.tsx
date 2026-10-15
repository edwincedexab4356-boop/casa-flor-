import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, ArrowDown, ChevronRight } from 'lucide-react';
import heroBackupImg from '../../assets/images/hero_casaflor_arrangement_1792107271065.jpg';

export const Hero: React.FC = () => {
  const { brandConfig } = useStore();
  const [imgSrc, setImgSrc] = useState(brandConfig.heroImagePath || '/images/hero-casaflor.jpg');

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappPhone = brandConfig.whatsappNumber ? brandConfig.whatsappNumber.replace(/[^0-9]/g, '') : '';
  const hasValidWhatsApp = Boolean(whatsappPhone && whatsappPhone.length >= 7);

  const heroWhatsAppUrl = hasValidWhatsApp
    ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
        '¡Hola CASAFLOR! Me comunico desde su web para consultar disponibilidad de arreglos florales en Avenida Espavé, Colón.'
      )}`
    : null;

  return (
    <section id="inicio" className="relative min-h-[88vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background subtle architectural warm frame */}
      <div className="absolute inset-0 bg-[#F8F5EF] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Editorial Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 pt-2 lg:pt-0">
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#263D32] uppercase">
              EL ARTE DE REGALAR FLORES
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.08] font-normal text-[#252521] mb-5 tracking-tight text-balance">
            Hay emociones que florecen.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#4A4A45] leading-relaxed max-w-xl mb-8 font-light">
            Arreglos florales para celebrar, sorprender y convertir momentos especiales en recuerdos. Confeccionados con devoción botánica en Avenida Espavé, Colón.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={scrollToCatalog}
              className="btn-luxury-primary shadow-xs group"
            >
              <span>Explorar catálogo</span>
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>

            {hasValidWhatsApp && heroWhatsAppUrl && (
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-secondary"
              >
                <MessageCircle size={15} />
                <span>Consultar por WhatsApp</span>
              </a>
            )}
          </div>

          {/* Editorial Location Micro-indicator */}
          <div className="mt-10 pt-6 border-t border-[#263D32]/10 flex items-center gap-4 text-xs text-[#263D32]/80">
            <div className="w-1.5 h-1.5 rounded-full bg-[#632F3B]" />
            <span className="tracking-wide">
              Boutique & Taller Floral · {brandConfig.address}
            </span>
          </div>
        </div>

        {/* Right Column: Hero Floral Image with Editorial Depth */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative group overflow-hidden rounded-sm bg-[#263D32]/5 p-2 sm:p-3 border border-[#263D32]/10 shadow-[0_12px_40px_rgba(38,61,50,0.06)]">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[16/11] overflow-hidden rounded-xs bg-[#E7ECE4]">
              <img
                src={imgSrc}
                alt="Arreglo floral de autor CASAFLOR"
                onError={() => {
                  // If /images/hero-casaflor.jpg fails to load, gracefully fallback to bundled luxury asset
                  if (imgSrc !== heroBackupImg) {
                    setImgSrc(heroBackupImg);
                  }
                }}
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Subtle editorial photo tag in corner */}
            <div className="absolute bottom-5 right-5 bg-[#F8F5EF]/90 backdrop-blur-xs px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-[#263D32] border border-[#263D32]/10">
              Colección Botánica
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-[#263D32]/60 hover:text-[#263D32] transition-colors cursor-pointer" onClick={scrollToCatalog}>
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Descubrir</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};
