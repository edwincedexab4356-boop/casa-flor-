import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Order } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    brandConfig,
    placePersistentOrder,
    generateWhatsAppLink,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  const isWhatsAppMode = brandConfig.commercialMode === 'whatsapp';

  const handlePersistentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Por favor introduce al menos tu nombre y teléfono para registrar el pedido.');
      return;
    }

    const order = placePersistentOrder({
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      notes: deliveryNotes,
    });

    setCompletedOrder(order);
  };

  const handleWhatsAppCheckout = () => {
    const waUrl = generateWhatsAppLink({
      name: customerName,
      address: customerAddress,
      notes: deliveryNotes,
    });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#252521]/50 backdrop-blur-xs flex justify-end">
      <div className="bg-[#F8F5EF] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#263D32]/15 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#263D32]/10 flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <h3 className="font-editorial text-2xl font-medium text-[#252521]">
              Tu Selección Floral
            </h3>
            <span className="text-xs text-[#263D32] bg-[#A8B5A0]/20 px-2 py-0.5 rounded-full font-medium">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1.5 text-[#252521]/70 hover:text-[#252521] rounded-full hover:bg-[#263D32]/5 transition-colors"
            aria-label="Cerrar bolsa"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {completedOrder ? (
            /* Confirmation State for Persistent Mode */
            <div className="text-center py-10 px-4 space-y-4">
              <div className="w-16 h-16 bg-[#263D32]/10 text-[#263D32] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-editorial text-2xl text-[#252521]">
                Pedido Registrado #{completedOrder.id}
              </h4>
              <p className="text-xs text-[#4A4A45] leading-relaxed max-w-xs mx-auto">
                Tu solicitud ha sido guardada en nuestro sistema. La floristería se pondrá en contacto al teléfono{' '}
                <strong className="text-[#252521]">{completedOrder.customerPhone}</strong> para confirmar los detalles de entrega.
              </p>
              <div className="bg-[#FFFFFF] p-4 border border-[#263D32]/10 rounded-xs text-left text-xs space-y-1.5">
                <p><strong>Cliente:</strong> {completedOrder.customerName}</p>
                {completedOrder.customerAddress && (
                  <p><strong>Entrega en Colón:</strong> {completedOrder.customerAddress}</p>
                )}
                <p><strong>Total:</strong> ${completedOrder.total.toFixed(2)} USD</p>
                <p className="text-[11px] text-[#A8B5A0] font-mono">
                  Estado: Pendiente de confirmación
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `¡Hola CASAFLOR! Acabo de registrar el pedido #${completedOrder.id} por $${completedOrder.total.toFixed(2)} USD a nombre de ${completedOrder.customerName}. ¿Podríamos confirmar los tiempos de entrega? Gracias.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary text-xs justify-center"
                >
                  <MessageCircle size={15} />
                  <span>Avisar a la floristería por WhatsApp</span>
                </a>
                <button
                  onClick={closeDrawer}
                  className="btn-luxury-secondary text-xs justify-center"
                >
                  Cerrar y seguir navegando
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E7ECE4] mx-auto flex items-center justify-center text-[#263D32]/60">
                <X size={20} />
              </div>
              <p className="font-editorial text-2xl text-[#252521]">Tu bolsa está vacía</p>
              <p className="text-xs text-[#4A4A45] font-light max-w-xs mx-auto">
                Explora nuestras colecciones y añade arreglos de autor para coordinar tu entrega o dedicatoria.
              </p>
              <button
                onClick={closeDrawer}
                className="btn-luxury-secondary text-xs uppercase"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 bg-[#FFFFFF] border border-[#263D32]/10 rounded-xs"
                  >
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-xs border border-[#263D32]/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-editorial text-base font-medium text-[#252521] leading-tight truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-[#263D32] font-semibold tabular-nums">
                            ${item.product.price.toFixed(2)} USD
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#4A4A45]/60 hover:text-[#632F3B] p-1 transition-colors"
                          aria-label={`Eliminar ${item.product.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {item.dedicationNote && (
                        <p className="text-[11px] italic text-[#632F3B] truncate">
                          Nota: "{item.dedicationNote}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#263D32]/20 rounded-xs bg-[#F8F5EF]">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#263D32]/10 text-[#252521]"
                            aria-label="Restar 1"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#263D32]/10 text-[#252521]"
                            aria-label="Sumar 1"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-xs font-medium text-[#252521] tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details Form */}
              <div className="bg-[#FFFFFF] p-4 border border-[#263D32]/10 rounded-xs space-y-3">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#263D32]">
                  Datos para coordinar la entrega en Colón
                </h5>
                <div>
                  <label className="block text-[11px] text-[#4A4A45] mb-1">Tu Nombre o Quien Envía:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Sofía Morales"
                    className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#263D32]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A4A45] mb-1">Teléfono o WhatsApp:</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ej: 6000-0000"
                    className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#263D32]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A4A45] mb-1">Dirección de Entrega o Retiro:</label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Ej: Retiro en Taller / Entrega en Colón 4 Altos"
                    className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#263D32]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A4A45] mb-1">Comentarios / Fecha deseada:</label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Ej: Entregar en la mañana del viernes"
                    className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#263D32]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!completedOrder && cart.length > 0 && (
          <div className="p-5 border-t border-[#263D32]/10 bg-[#FFFFFF] space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-[#4A4A45]">
                Subtotal Estimado:
              </span>
              <span className="font-editorial text-2xl font-bold text-[#263D32] tabular-nums">
                ${cartTotal.toFixed(2)} USD
              </span>
            </div>

            <p className="text-[10px] text-[#4A4A45] leading-normal font-light">
              * Precios sin cargos de flete. La entrega o retiro se coordina directamente con el taller de CASAFLOR en Avenida Espavé.
            </p>

            {isWhatsAppMode ? (
              /* Mode A: WhatsApp direct flow */
              <button
                onClick={handleWhatsAppCheckout}
                className="btn-luxury-primary w-full justify-center"
              >
                <MessageCircle size={16} />
                <span>Enviar pedido por WhatsApp</span>
              </button>
            ) : (
              /* Mode B: Persistent database / local record flow */
              <button
                onClick={handlePersistentSubmit}
                className="btn-luxury-primary w-full justify-center"
              >
                <ShieldCheck size={16} />
                <span>Registrar pedido en taller</span>
              </button>
            )}

            <button
              onClick={clearCart}
              className="w-full text-center text-[11px] text-[#632F3B] hover:underline"
            >
              Vaciar selección
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
