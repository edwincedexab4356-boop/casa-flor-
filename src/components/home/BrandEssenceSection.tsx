import React from 'react';
import { useStore } from '../../context/StoreContext';
import atelierImg from '../../assets/images/editorial_botanical_studio_1792107273746.jpg';

export const BrandEssenceSection: React.FC = () => {
  const { brandConfig } = useStore();

  return (
    <section id="esencia" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#F8F5EF] border-t border-[#263D32]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Large Editorial Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden rounded-xs border border-[#263D32]/15 shadow-[0_12px_40px_rgba(38,61,50,0.06)] bg-[#E7ECE4]">
              <img
                src={atelierImg}
                alt="Mesa de trabajo y proceso floral en CASAFLOR"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#263D32]/5 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Subtle editorial floating caption */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#4A4A45]">
              <span className="font-editorial italic text-sm text-[#263D32]">
                Taller y selección de botánica viva
              </span>
              <span className="font-mono text-[11px] text-[#A8B5A0]">
                Avenida Espavé, Colón
              </span>
            </div>
          </div>

          {/* Emotional & Editorial Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.24em] text-[#632F3B] uppercase block mb-3">
                FILOSOFÍA BOTÁNICA
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252521] leading-[1.12] tracking-tight text-balance">
                Cada flor tiene algo que decir.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#4A4A45] leading-relaxed font-light">
              En CASAFLOR concebimos cada diseño floral como un diálogo entre la naturaleza y las emociones humanas. Creemos en la belleza orgánica de las curvas naturales, en la frescura de los tallos recién cortados y en el impacto sereno de una paleta cromática equilibrada.
            </p>

            <p className="text-sm text-[#4A4A45] leading-relaxed font-light">
              Nuestra boutique en Avenida Espavé reúne arreglos pensados para celebrar aniversarios, expresar gratitud, acompañar momentos trascendentes o simplemente transformar el ambiente cotidiano con la fragancia y la armonía botánica.
            </p>

            {/* Curated Principles */}
            <div className="pt-6 border-t border-[#263D32]/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-editorial text-lg text-[#263D32] mb-1 font-medium">
                  Corte y Selección Rigurosa
                </h4>
                <p className="text-xs text-[#4A4A45] font-light leading-normal">
                  Elegimos cada flor por su longevidad, apertura gradual y textura.
                </p>
              </div>
              <div>
                <h4 className="font-editorial text-lg text-[#263D32] mb-1 font-medium">
                  Presentación Distinguida
                </h4>
                <p className="text-xs text-[#4A4A45] font-light leading-normal">
                  Envolturas en lino natural, papeles kraft crudos y jarrones de gres artesanal.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#263D32] font-semibold hover:text-[#632F3B] transition-colors"
              >
                <span>Conoce el día a día en {brandConfig.instagramHandle}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
