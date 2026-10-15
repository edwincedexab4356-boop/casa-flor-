import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const CollectionsSection: React.FC = () => {
  const { categories, setSelectedCategory } = useStore();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="colecciones" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#263D32]/10 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.24em] text-[#632F3B] uppercase block mb-3">
              COLECCIONES EXCLUSIVAS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252521] tracking-tight">
              Flores para cada sentimiento.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4A45] max-w-sm font-light">
            Selección curada de tallos frescos, flores de corte de temporada y composiciones botánicas listas para cautivar.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            // Asymmetric layout spans to create editorial variety
            const spanClass =
              index === 0
                ? 'md:col-span-7 aspect-[16/10]'
                : index === 1
                ? 'md:col-span-5 aspect-[4/3] md:aspect-auto'
                : index === 2
                ? 'md:col-span-4 aspect-[4/3]'
                : index === 3
                ? 'md:col-span-4 aspect-[4/3]'
                : 'md:col-span-4 aspect-[4/3]';

            return (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className={`group relative overflow-hidden bg-[#263D32]/5 border border-[#263D32]/10 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(38,61,50,0.08)] ${spanClass}`}
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252521]/80 via-[#252521]/30 to-transparent transition-opacity duration-300 group-hover:via-[#252521]/40" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-[#F8F5EF] z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono tracking-wider text-[#D8B7B2]">
                      0{index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F8F5EF]/15 backdrop-blur-xs flex items-center justify-center text-[#F8F5EF] group-hover:bg-[#F8F5EF] group-hover:text-[#263D32] transition-colors">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight mb-2 text-[#F8F5EF]">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F8F5EF]/85 line-clamp-2 max-w-md font-light">
                      {category.description}
                    </p>
                    <span className="inline-block mt-3 text-[11px] tracking-[0.16em] uppercase text-[#D8B7B2] font-medium group-hover:text-[#F8F5EF] transition-colors">
                      Ver colección en catálogo &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
