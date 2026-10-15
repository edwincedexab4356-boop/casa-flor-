import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { X, Plus, Minus, MessageCircle, ShoppingBag, Check, Sparkles, Heart } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    brandConfig,
    generateProductInquiryLink,
    products,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [dedicationNote, setDedicationNote] = useState('');
  const [showDedicationInput, setShowDedicationInput] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setDedicationNote('');
    setShowDedicationInput(false);
  }, [selectedProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProduct]);

  if (!selectedProduct) return null;

  const isAvailable = selectedProduct.availability === 'in_stock';
  const isCustomOrder = selectedProduct.availability === 'custom_order';

  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, dedicationNote.trim() || undefined);
    setSelectedProduct(null);
  };

  const imagesList =
    selectedProduct.images && selectedProduct.images.length > 0
      ? selectedProduct.images
      : [selectedProduct.mainImage];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#252521]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="bg-[#F8F5EF] w-full max-w-4xl rounded-xs border border-[#263D32]/15 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#252521] bg-[#F8F5EF]/80 hover:bg-[#F8F5EF] backdrop-blur-xs rounded-full border border-[#263D32]/10 transition-colors"
          aria-label="Cerrar detalle"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-[#E7ECE4]/40 flex flex-col justify-between">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/3] sm:aspect-square bg-[#E7ECE4] overflow-hidden border border-[#263D32]/10">
              <img
                src={imagesList[activeImageIndex] || selectedProduct.mainImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.isDemo && (
                <div className="absolute top-3 left-3 bg-[#F8F5EF]/90 text-[#632F3B] text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[#632F3B]/20">
                  Arreglo de muestra
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-2.5 mt-4 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 shrink-0 border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#263D32] ring-1 ring-[#263D32]'
                        : 'border-[#263D32]/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Floral Stems & Dimensions Note */}
            <div className="mt-6 pt-4 border-t border-[#263D32]/10 space-y-1.5 text-xs text-[#4A4A45]">
              {selectedProduct.dimensions && (
                <p>
                  <strong className="font-medium text-[#252521]">Dimensiones:</strong>{' '}
                  {selectedProduct.dimensions}
                </p>
              )}
              {selectedProduct.stemsInfo && (
                <p>
                  <strong className="font-medium text-[#252521]">Botánica:</strong>{' '}
                  {selectedProduct.stemsInfo}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Availability */}
              <div className="flex items-center justify-between text-xs text-[#4A4A45] uppercase tracking-wider mb-2">
                <span>{selectedProduct.category}</span>
                <span
                  className={`font-medium ${
                    isAvailable
                      ? 'text-[#263D32]'
                      : isCustomOrder
                      ? 'text-[#632F3B]'
                      : 'text-amber-800'
                  }`}
                >
                  {isAvailable
                    ? 'Disponible en taller'
                    : isCustomOrder
                    ? 'Bajo confección previa'
                    : 'Agotado temporalmente'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#252521] tracking-tight mb-3">
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-editorial text-3xl font-semibold text-[#263D32] tabular-nums">
                  {brandConfig.currencySymbol}
                  {selectedProduct.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#4A4A45] uppercase tracking-wider">USD</span>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-[#4A4A45] leading-relaxed mb-6 font-light space-y-2">
                <p>{selectedProduct.description}</p>
                {selectedProduct.careTips && (
                  <p className="text-xs text-[#263D32] bg-[#A8B5A0]/15 p-2.5 rounded-xs border-l-2 border-[#263D32]">
                    <strong>Cuidado floral:</strong> {selectedProduct.careTips}
                  </p>
                )}
              </div>

              {/* Optional Dedication Note */}
              <div className="mb-6 pt-4 border-t border-[#263D32]/10">
                {!showDedicationInput ? (
                  <button
                    onClick={() => setShowDedicationInput(true)}
                    className="text-xs text-[#632F3B] hover:underline font-medium inline-flex items-center gap-1.5"
                  >
                    <Sparkles size={13} />
                    <span>¿Deseas incluir una tarjeta o dedicatoria personalizada?</span>
                  </button>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-[#252521] mb-1">
                      Mensaje de dedicatoria para la tarjeta (opcional):
                    </label>
                    <textarea
                      value={dedicationNote}
                      onChange={(e) => setDedicationNote(e.target.value)}
                      placeholder="Ej: Con todo mi amor para celebrar este día tan especial..."
                      rows={2}
                      className="w-full bg-[#FFFFFF] border border-[#263D32]/20 text-xs p-2.5 rounded-xs focus:outline-none focus:border-[#263D32]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="pt-6 border-t border-[#263D32]/10 space-y-4">
              {isAvailable ? (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider font-medium text-[#252521]">
                      Cantidad:
                    </span>
                    <div className="flex items-center border border-[#263D32]/20 rounded-xs bg-[#FFFFFF]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-[#252521] hover:bg-[#263D32]/5 transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-xs font-semibold tabular-nums text-[#252521]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-[#252521] hover:bg-[#263D32]/5 transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={handleAddToCart}
                      className="btn-luxury-primary flex-1 justify-center"
                    >
                      <ShoppingBag size={15} />
                      <span>Añadir a mi selección</span>
                    </button>

                    <a
                      href={generateProductInquiryLink(selectedProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-secondary justify-center text-xs"
                    >
                      <MessageCircle size={15} />
                      <span>Consultar por WhatsApp</span>
                    </a>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-xs text-[#4A4A45] mb-3">
                    Este arreglo se realiza bajo pedido anticipado. Escríbenos directamente para coordinar confección y fecha.
                  </p>
                  <a
                    href={generateProductInquiryLink(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-primary w-full justify-center"
                  >
                    <MessageCircle size={15} />
                    <span>Consultar confección por WhatsApp</span>
                  </a>
                </div>
              )}

              <p className="text-[11px] text-[#252521]/60 text-center font-light pt-2">
                Entregas y retiro en Colón · Avenida Espavé · Tel: {brandConfig.phoneDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Bar */}
        {relatedProducts.length > 0 && (
          <div className="p-6 bg-[#FFFFFF] border-t border-[#263D32]/10">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#263D32] mb-3">
              Otros arreglos de la misma colección:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => setSelectedProduct(rel)}
                  className="flex items-center gap-3 p-2 border border-[#263D32]/10 hover:border-[#263D32]/30 cursor-pointer transition-colors bg-[#F8F5EF]/40"
                >
                  <img
                    src={rel.mainImage}
                    alt={rel.name}
                    className="w-12 h-12 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#252521] truncate font-editorial">
                      {rel.name}
                    </p>
                    <p className="text-[11px] font-semibold text-[#263D32] tabular-nums">
                      ${rel.price.toFixed(2)} USD
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
