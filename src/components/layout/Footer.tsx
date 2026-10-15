import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';
import { Instagram, Phone, MapPin, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { brandConfig, setIsAdminOpen } = useStore();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A2B23] text-[#F8F5EF] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#263D32]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[#F8F5EF]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="brightness-200 contrast-125 filter">
              <BrandLogo />
            </div>
            <p className="text-xs text-[#F8F5EF]/70 max-w-sm font-light leading-relaxed">
              Floristería de autor ubicada en Avenida Espavé, Colón, Panamá. Creaciones botánicas para conmemorar la belleza de cada instante.
            </p>
            <div className="pt-2 text-xs text-[#A8B5A0]">
              <p>{brandConfig.address}</p>
              <p className="mt-1">
                Teléfono:{' '}
                <a
                  href={`tel:${brandConfig.phone.replace(/[^0-9]/g, '')}`}
                  className="text-[#F8F5EF] hover:underline underline-offset-2"
                >
                  {brandConfig.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8B7B2]">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#F8F5EF]/80">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleLinkClick(e, '#inicio')}
                  className="hover:text-[#F8F5EF] transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#colecciones"
                  onClick={(e) => handleLinkClick(e, '#colecciones')}
                  className="hover:text-[#F8F5EF] transition-colors"
                >
                  Colecciones
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={(e) => handleLinkClick(e, '#catalogo')}
                  className="hover:text-[#F8F5EF] transition-colors"
                >
                  Catálogo Digital
                </a>
              </li>
              <li>
                <a
                  href="#esencia"
                  onClick={(e) => handleLinkClick(e, '#esencia')}
                  className="hover:text-[#F8F5EF] transition-colors"
                >
                  Nuestra Esencia
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => handleLinkClick(e, '#contacto')}
                  className="hover:text-[#F8F5EF] transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Admin Access */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8B7B2]">
              Comunidad & Redes
            </h4>
            <p className="text-xs text-[#F8F5EF]/70 font-light leading-relaxed">
              Descubre nuestras últimas composiciones y montajes en nuestro perfil oficial de Instagram.
            </p>
            <div>
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#F8F5EF] hover:text-[#D8B7B2] transition-colors py-1"
              >
                <Instagram size={15} />
                <span>{brandConfig.instagramHandle}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#A8B5A0] hover:text-[#F8F5EF] transition-colors"
              >
                <Lock size={12} />
                <span>Acceso administrativo del taller</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F8F5EF]/50 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {brandConfig.brandName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F8F5EF] cursor-default">
              Colón, República de Panamá
            </span>
            <span>·</span>
            <span className="hover:text-[#F8F5EF] cursor-default">
              Floristería Boutique
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
