import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Search, SlidersHorizontal, Eye, Plus, Check } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setSelectedProduct,
    addToCart,
    brandConfig,
  } = useStore();

  // Filter published products (in public view only show published products)
  const publishedProducts = products.filter((p) => p.isPublished);

  // Filter by category
  const categoryFiltered =
    selectedCategory === 'all'
      ? publishedProducts
      : publishedProducts.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Filter by search query
  const searchFiltered = categoryFiltered.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  // Sort
  const sortedProducts = [...searchFiltered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.order - b.order;
  });

  return (
    <section id="catalogo" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8F5EF] border-t border-[#263D32]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.24em] text-[#263D32] uppercase block mb-3">
            CATÁLOGO BOTÁNICO
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#252521] tracking-tight mb-4">
            Arreglos Florales de Autor
          </h2>
          <p className="text-sm text-[#4A4A45] font-light">
            Cada arreglo es confeccionado a mano con flores seleccionadas en su punto óptimo de apertura. Precios en dólares estadounidenses (USD).
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#263D32]/10">
          {/* Category Tabs (Interactive Filter Controls as permitted by constitution) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium rounded-xs whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#263D32] text-[#F8F5EF] shadow-xs'
                  : 'bg-transparent text-[#252521]/70 hover:text-[#252521] hover:bg-[#263D32]/5'
              }`}
            >
              Todos ({publishedProducts.length})
            </button>
            {categories.map((cat) => {
              const count = publishedProducts.filter(
                (p) => p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium rounded-xs whitespace-nowrap transition-all ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#263D32] text-[#F8F5EF] shadow-xs'
                      : 'bg-transparent text-[#252521]/70 hover:text-[#252521] hover:bg-[#263D32]/5'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="Buscar arreglo o flor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#263D32]/15 text-xs text-[#252521] placeholder-[#252521]/40 rounded-xs pl-8 pr-3 py-2 focus:outline-none focus:border-[#263D32] transition-colors"
              />
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#252521]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#252521]/50 hover:text-[#252521]"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar productos"
                className="appearance-none bg-[#FFFFFF] border border-[#263D32]/15 text-xs text-[#252521] rounded-xs pl-3 pr-8 py-2 focus:outline-none focus:border-[#263D32] cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a mayor</option>
                <option value="price-desc">Precio: Mayor a menor</option>
              </select>
              <SlidersHorizontal
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#252521]/50 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#FFFFFF]/60 border border-[#263D32]/10 p-8 rounded-sm">
            <p className="font-editorial text-2xl text-[#252521] mb-2">
              No encontramos arreglos con los filtros actuales
            </p>
            <p className="text-xs text-[#4A4A45] mb-6">
              Intenta seleccionar otra categoría o restablecer la búsqueda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-luxury-secondary text-xs"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={brandConfig.currencySymbol}
                onSelect={() => setSelectedProduct(product)}
                onAdd={() => addToCart(product, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  onSelect: () => void;
  onAdd: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol,
  onSelect,
  onAdd,
}) => {
  const isAvailable = product.availability === 'in_stock';
  const isCustomOrder = product.availability === 'custom_order';

  return (
    <div className="group bg-[#FFFFFF] border border-[#263D32]/10 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(38,61,50,0.06)] hover:-translate-y-0.5">
      {/* Product Image Box */}
      <div
        className="relative aspect-[4/3] bg-[#E7ECE4] overflow-hidden cursor-pointer"
        onClick={onSelect}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-[#252521]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="p-2.5 bg-[#F8F5EF] text-[#263D32] hover:bg-[#263D32] hover:text-[#F8F5EF] rounded-full shadow-md transition-colors"
            title="Ver detalle del arreglo"
            aria-label="Ver detalle"
          >
            <Eye size={16} />
          </button>
          {isAvailable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="p-2.5 bg-[#263D32] text-[#F8F5EF] hover:bg-[#1A2B23] rounded-full shadow-md transition-colors"
              title="Añadir a selección"
              aria-label="Añadir al pedido"
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        {/* Availability subtle indicator (top left) */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {product.isDemo && (
            <span className="text-[10px] tracking-wider uppercase font-medium bg-[#F8F5EF]/90 text-[#632F3B] px-2 py-0.5 border border-[#632F3B]/20">
              Muestra
            </span>
          )}
          {isCustomOrder && (
            <span className="text-[10px] tracking-wider uppercase font-medium bg-[#263D32]/85 text-[#F8F5EF] px-2 py-0.5">
              Bajo pedido
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata clean unboxed text (zero pill rule) */}
          <div className="flex items-center gap-2 text-[11px] text-[#4A4A45] uppercase tracking-wider mb-2 font-medium">
            <span>{product.category}</span>
            {product.tags.length > 0 && (
              <>
                <span aria-hidden="true" className="text-[#A8B5A0]">·</span>
                <span>{product.tags[0]}</span>
              </>
            )}
          </div>

          <h3
            onClick={onSelect}
            className="font-editorial text-xl font-medium text-[#252521] hover:text-[#263D32] transition-colors cursor-pointer tracking-tight mb-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#4A4A45] font-light line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & Primary Action */}
        <div className="pt-4 border-t border-[#263D32]/10 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#4A4A45]">Precio</span>
            <span className="font-editorial text-xl font-semibold text-[#263D32] tabular-nums">
              {currencySymbol}{product.price.toFixed(2)}
            </span>
          </div>

          <div>
            {isAvailable ? (
              <button
                onClick={onAdd}
                className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium text-[#263D32] border border-[#263D32] hover:bg-[#263D32] hover:text-[#F8F5EF] transition-all rounded-xs active:scale-[0.97]"
              >
                Añadir
              </button>
            ) : (
              <button
                onClick={onSelect}
                className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium text-[#632F3B] border border-[#632F3B]/40 hover:bg-[#632F3B] hover:text-[#F8F5EF] transition-all rounded-xs active:scale-[0.97]"
              >
                Consultar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
