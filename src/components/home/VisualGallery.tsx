import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import heroImg from '../../assets/images/hero_casaflor_arrangement_1792107271065.jpg';
import bouquetImg from '../../assets/images/collection_ramos_bouquet_1792107271833.jpg';
import rosesImg from '../../assets/images/collection_rosas_roses_1792107272582.jpg';
import centerpieceImg from '../../assets/images/collection_especiales_centerpiece_1792107272602.jpg';
import atelierImg from '../../assets/images/editorial_botanical_studio_1792107273746.jpg';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    image: bouquetImg,
    title: 'Bouquet en Papel Crudo y Lino',
    subtitle: 'Texturas botánicas y envolturas artesanales',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g-2',
    image: rosesImg,
    title: 'Rosas de Jardín y Matices Borgoña',
    subtitle: 'Composición profunda en gres marfil',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-3',
    image: centerpieceImg,
    title: 'Centro Escultural Ikebana',
    subtitle: 'Orquídeas y ramas brotadas en cuenco de piedra',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-4',
    image: atelierImg,
    title: 'Mesa de Corte y Enlace Floral',
    subtitle: 'La quietud del taller antes de cada entrega',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'g-5',
    image: heroImg,
    title: 'Armonía Matinal en Travertino',
    subtitle: 'Ranúnculos, rosas rubor y hojas delicadas',
    aspect: 'aspect-[4/3]',
  },
];

export const VisualGallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8F5EF] border-t border-[#263D32]/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.24em] text-[#263D32] uppercase block mb-3">
              UNIVERSO VISUAL
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252521] tracking-tight">
              La Belleza de lo Efímero
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4A45] max-w-sm font-light">
            Instantáneas editoriales de nuestros arreglos, materiales botánicos y momentos en el taller.
          </p>
        </div>

        {/* Magazine-style asymmetric photo masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {GALLERY_ITEMS.map((item, index) => {
            const colSpan =
              index === 0
                ? 'lg:col-span-4'
                : index === 1
                ? 'lg:col-span-8'
                : index === 2
                ? 'lg:col-span-7'
                : index === 3
                ? 'lg:col-span-5'
                : 'lg:col-span-12';

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative overflow-hidden bg-[#263D32]/5 border border-[#263D32]/10 cursor-pointer ${colSpan} ${item.aspect}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252521]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-[#F8F5EF]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-xl font-medium text-[#F8F5EF]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#D8B7B2] font-light">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="p-2 bg-[#F8F5EF]/20 backdrop-blur-xs rounded-full">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-[#252521]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#F8F5EF] p-2 sm:p-3 rounded-xs overflow-hidden relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#252521]/70 text-[#F8F5EF] hover:bg-[#252521] transition-colors"
              aria-label="Cerrar ampliación"
            >
              <X size={18} />
            </button>
            <div className="aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-[#263D32]/5">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain bg-[#252521]"
              />
            </div>
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#252521]">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-[#4A4A45] font-light">
                  {activeItem.subtitle}
                </p>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#263D32] font-medium font-mono">
                CASAFLOR · Colón
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
