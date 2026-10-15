import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Phone, MapPin, Instagram, MessageCircle, Clock, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { brandConfig } = useStore();

  const phoneLink = `tel:${brandConfig.phone.replace(/[^0-9]/g, '')}`;
  const whatsappDigits = brandConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const hasWhatsApp = Boolean(whatsappDigits && whatsappDigits.length >= 7);
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
        '¡Hola CASAFLOR! Me gustaría consultar disponibilidad de flores y realizar un pedido en Avenida Espavé, Colón.'
      )}`
    : null;

  // Google Maps search query for Avenida Espavé, Colón, Panama
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Avenida Espavé, Colón, Provincia de Colón, Panamá'
  )}`;

  return (
    <section id="contacto" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8F5EF] border-t border-[#263D32]/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.24em] text-[#632F3B] uppercase block mb-3">
            ATENCIÓN & CONTACTO
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252521] tracking-tight mb-4">
            Coordina tu Detalle Floral
          </h2>
          <p className="text-sm text-[#4A4A45] font-light">
            Estamos a tu disposición para asesorarte personalmente en la selección y dedicatoria de cada arreglo.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: Dirección y Ubicación en Colón */}
          <div className="md:col-span-4 bg-[#FFFFFF] p-6 sm:p-8 border border-[#263D32]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#263D32]/5 flex items-center justify-center text-[#263D32] mb-5">
                <MapPin size={20} />
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#252521] mb-2">
                Ubicación del Taller
              </h3>
              <p className="text-xs text-[#263D32] uppercase tracking-wider font-semibold mb-2">
                Provincia de Colón, Panamá
              </p>
              <p className="text-sm text-[#4A4A45] font-light leading-relaxed mb-6">
                {brandConfig.address}
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#263D32] hover:text-[#632F3B] transition-colors"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Card 2: Contacto Telefónico y WhatsApp */}
          <div className="md:col-span-4 bg-[#FFFFFF] p-6 sm:p-8 border border-[#263D32]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#263D32]/5 flex items-center justify-center text-[#263D32] mb-5">
                <Phone size={20} />
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#252521] mb-2">
                Llamadas y Pedidos
              </h3>
              <p className="text-xs text-[#263D32] uppercase tracking-wider font-semibold mb-2">
                Línea Directa
              </p>
              <p className="font-editorial text-3xl font-semibold text-[#252521] mb-6 tracking-wide">
                <a
                  href={phoneLink}
                  className="hover:text-[#632F3B] transition-colors"
                  aria-label={`Llamar a ${brandConfig.phoneDisplay}`}
                >
                  {brandConfig.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <a
                href={phoneLink}
                className="btn-luxury-secondary w-full justify-center text-xs"
              >
                <Phone size={14} />
                <span>Llamar ahora</span>
              </a>

              {hasWhatsApp && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary w-full justify-center text-xs"
                >
                  <MessageCircle size={14} />
                  <span>Escribir por WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Card 3: Instagram & Horario */}
          <div className="md:col-span-4 bg-[#FFFFFF] p-6 sm:p-8 border border-[#263D32]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#263D32]/5 flex items-center justify-center text-[#263D32] mb-5">
                <Instagram size={20} />
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#252521] mb-2">
                Instagram Oficial
              </h3>
              <p className="text-xs text-[#632F3B] uppercase tracking-wider font-semibold mb-2">
                {brandConfig.instagramHandle}
              </p>
              <p className="text-xs text-[#4A4A45] font-light leading-relaxed mb-6">
                Sigue nuestras creaciones florales diarias, novedades de temporada y montajes botánicos especiales.
              </p>

              {brandConfig.showSchedule && (
                <div className="pt-4 border-t border-[#263D32]/10">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#263D32] mb-1">
                    <Clock size={13} />
                    <span>Disponibilidad</span>
                  </div>
                  <p className="text-xs text-[#4A4A45] font-light">
                    {brandConfig.scheduleText}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6">
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-secondary w-full justify-center text-xs"
              >
                <Instagram size={14} />
                <span>Ver perfil en Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
