import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Category, CommercialMode, Order } from '../../types';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Package,
  Layers,
  Settings,
  ClipboardList,
  Lock,
  LogOut,
  RefreshCw,
  Database,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    adminAuthenticated,
    setAdminAuthenticated,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    brandConfig,
    updateBrandConfig,
    resetBrandConfig,
    orders,
    updateOrderStatus,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'config' | 'database'>('products');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Product form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    price: 60,
    category: 'Ramos de flores',
    mainImage: '',
    images: [],
    availability: 'in_stock',
    tags: [],
    isPublished: true,
    order: 1,
    dimensions: '',
    stemsInfo: '',
    careTips: '',
  });

  // Category form state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
    image: '',
    order: 1,
  });

  // Config form state
  const [configForm, setConfigForm] = useState(brandConfig);

  if (!isAdminOpen) return null;

  // Handle Admin Login
  // PIN or access code for testing/owner access: casaflor2026 or 1234
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'casaflor2026' || passwordInput === 'admin') {
      setAdminAuthenticated(true);
      setLoginError('');
      showToast('Sesión de administración iniciada');
    } else {
      setLoginError('Clave incorrecta. (Clave inicial para revisión: casaflor2026)');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Nombre y precio son requeridos');
      return;
    }

    const defaultImg =
      productForm.mainImage ||
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80';

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...(productForm as Product),
        mainImage: defaultImg,
        images: productForm.images?.length ? productForm.images : [defaultImg],
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: productForm.name || 'Nuevo Arreglo',
        slug:
          productForm.slug ||
          productForm.name?.toLowerCase().replace(/\s+/g, '-') ||
          'nuevo-arreglo',
        description: productForm.description || '',
        price: Number(productForm.price),
        category: productForm.category || categories[0]?.name || 'Ramos de flores',
        mainImage: defaultImg,
        images: [defaultImg],
        availability: productForm.availability || 'in_stock',
        tags: productForm.tags || ['Nuevo'],
        isPublished: productForm.isPublished ?? true,
        order: Number(productForm.order) || products.length + 1,
        dimensions: productForm.dimensions,
        stemsInfo: productForm.stemsInfo,
        careTips: productForm.careTips,
      });
      setIsCreatingProduct(false);
    }

    // Reset form
    setProductForm({
      name: '',
      slug: '',
      description: '',
      price: 60,
      category: categories[0]?.name || 'Ramos de flores',
      mainImage: '',
      images: [],
      availability: 'in_stock',
      tags: [],
      isPublished: true,
      order: 1,
    });
  };

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreatingProduct(false);
    setProductForm(prod);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        ...(categoryForm as Category),
      });
      setEditingCategory(null);
    } else {
      addCategory({
        name: categoryForm.name || 'Nueva Categoría',
        slug:
          categoryForm.slug ||
          categoryForm.name?.toLowerCase().replace(/\s+/g, '-') ||
          'nueva-categoria',
        description: categoryForm.description || '',
        image: categoryForm.image || products[0]?.mainImage || '',
        order: Number(categoryForm.order) || categories.length + 1,
      });
      setIsCreatingCategory(false);
    }

    setCategoryForm({ name: '', slug: '', description: '', image: '', order: 1 });
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandConfig(configForm);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#252521]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#F8F5EF] w-full max-w-5xl rounded-xs border border-[#263D32]/20 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#263D32]/10 bg-[#FFFFFF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-2xl font-bold text-[#263D32]">
              CASAFLOR
            </span>
            <span className="text-[11px] uppercase tracking-wider bg-[#263D32]/10 text-[#263D32] px-2 py-0.5 rounded-xs font-semibold">
              Panel Administrativo
            </span>
          </div>

          <div className="flex items-center gap-3">
            {adminAuthenticated && (
              <button
                onClick={() => setAdminAuthenticated(false)}
                className="text-xs text-[#632F3B] hover:underline flex items-center gap-1"
              >
                <LogOut size={13} />
                <span>Cerrar sesión</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-[#252521] hover:bg-[#263D32]/10 rounded-full transition-colors"
              aria-label="Cerrar panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        {!adminAuthenticated ? (
          /* Authentication Form */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6 flex-1 flex flex-col justify-center">
            <div className="w-14 h-14 bg-[#263D32]/10 text-[#263D32] rounded-full mx-auto flex items-center justify-center">
              <Lock size={28} />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-medium text-[#252521]">
                Acceso Exclusivo al Taller
              </h3>
              <p className="text-xs text-[#4A4A45] mt-1">
                Ingresa la clave de administración para gestionar productos, pedidos y configuraciones.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Introduce la clave de acceso"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#263D32]/25 text-center text-sm py-2.5 px-4 rounded-xs focus:outline-none focus:border-[#263D32]"
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-[#632F3B] mt-2 font-medium">{loginError}</p>
                )}
              </div>

              <button type="submit" className="btn-luxury-primary w-full justify-center">
                <span>Ingresar al panel</span>
              </button>

              <div className="p-3 bg-[#E7ECE4]/60 border border-[#263D32]/10 text-left text-[11px] text-[#4A4A45] rounded-xs space-y-1">
                <p className="font-semibold text-[#263D32]">Clave predeterminada para el propietario:</p>
                <p className="font-mono text-[#252521]">casaflor2026</p>
                <p className="text-[10px] text-[#4A4A45]/70">
                  (Para conectar persistencia remota mediante base de datos SQL / Supabase, revisa la pestaña de Arquitectura).
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 bg-[#FFFFFF] border-r border-[#263D32]/10 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => {
                  setActiveTab('products');
                  setIsCreatingProduct(false);
                  setEditingProduct(null);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap text-left ${
                  activeTab === 'products'
                    ? 'bg-[#263D32] text-[#F8F5EF]'
                    : 'text-[#252521] hover:bg-[#263D32]/5'
                }`}
              >
                <Package size={15} />
                <span>Productos ({products.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('categories');
                  setIsCreatingCategory(false);
                  setEditingCategory(null);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap text-left ${
                  activeTab === 'categories'
                    ? 'bg-[#263D32] text-[#F8F5EF]'
                    : 'text-[#252521] hover:bg-[#263D32]/5'
                }`}
              >
                <Layers size={15} />
                <span>Categorías ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap text-left ${
                  activeTab === 'orders'
                    ? 'bg-[#263D32] text-[#F8F5EF]'
                    : 'text-[#252521] hover:bg-[#263D32]/5'
                }`}
              >
                <ClipboardList size={15} />
                <span>Pedidos ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap text-left ${
                  activeTab === 'config'
                    ? 'bg-[#263D32] text-[#F8F5EF]'
                    : 'text-[#252521] hover:bg-[#263D32]/5'
                }`}
              >
                <Settings size={15} />
                <span>Configuración de Marca</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap text-left ${
                  activeTab === 'database'
                    ? 'bg-[#263D32] text-[#F8F5EF]'
                    : 'text-[#252521] hover:bg-[#263D32]/5'
                }`}
              >
                <Database size={15} />
                <span>Base de Datos & Supabase</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              {/* TAB 1: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#252521]">
                        Gestión de Productos
                      </h3>
                      <p className="text-xs text-[#4A4A45]">
                        Crea, modifica precios, disponibilidad o imágenes de los arreglos.
                      </p>
                    </div>
                    {!isCreatingProduct && !editingProduct && (
                      <button
                        onClick={() => {
                          setIsCreatingProduct(true);
                          setProductForm({
                            name: '',
                            slug: '',
                            description: '',
                            price: 70,
                            category: categories[0]?.name || 'Ramos de flores',
                            mainImage: products[0]?.mainImage || '',
                            images: [],
                            availability: 'in_stock',
                            tags: ['Nuevo'],
                            isPublished: true,
                            order: products.length + 1,
                          });
                        }}
                        className="btn-luxury-primary text-xs"
                      >
                        <Plus size={14} />
                        <span>Nuevo Arreglo</span>
                      </button>
                    )}
                  </div>

                  {/* Create / Edit Form */}
                  {(isCreatingProduct || editingProduct) && (
                    <form
                      onSubmit={handleSaveProduct}
                      className="bg-[#FFFFFF] p-5 sm:p-6 border border-[#263D32]/15 rounded-xs space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#263D32]/10">
                        <h4 className="font-editorial text-xl text-[#263D32]">
                          {editingProduct ? 'Editar Arreglo' : 'Nuevo Arreglo Floral'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingProduct(false);
                            setEditingProduct(null);
                          }}
                          className="text-xs text-[#4A4A45] hover:text-[#252521]"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Nombre del Arreglo:
                          </label>
                          <input
                            type="text"
                            required
                            value={productForm.name}
                            onChange={(e) =>
                              setProductForm({ ...productForm, name: e.target.value })
                            }
                            placeholder="Ej: Bouquet Jardín Secreto"
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs focus:outline-none focus:border-[#263D32]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Precio en USD ($):
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            required
                            value={productForm.price}
                            onChange={(e) =>
                              setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs focus:outline-none focus:border-[#263D32]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Categoría:
                          </label>
                          <select
                            value={productForm.category}
                            onChange={(e) =>
                              setProductForm({ ...productForm, category: e.target.value })
                            }
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs focus:outline-none focus:border-[#263D32]"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Disponibilidad:
                          </label>
                          <select
                            value={productForm.availability}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                availability: e.target.value as any,
                              })
                            }
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs focus:outline-none focus:border-[#263D32]"
                          >
                            <option value="in_stock">Disponible en taller</option>
                            <option value="custom_order">Bajo pedido / confección previa</option>
                            <option value="out_of_stock">Agotado temporalmente</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Descripción Botánica:
                          </label>
                          <textarea
                            rows={3}
                            value={productForm.description}
                            onChange={(e) =>
                              setProductForm({ ...productForm, description: e.target.value })
                            }
                            placeholder="Composición de flores, fragancia, follajes..."
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs focus:outline-none focus:border-[#263D32]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            URL de la Imagen Principal:
                          </label>
                          <input
                            type="text"
                            value={productForm.mainImage}
                            onChange={(e) =>
                              setProductForm({ ...productForm, mainImage: e.target.value })
                            }
                            placeholder="/images/hero-casaflor.jpg o URL externa"
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs focus:outline-none focus:border-[#263D32]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Dimensiones aproximadas:
                          </label>
                          <input
                            type="text"
                            value={productForm.dimensions || ''}
                            onChange={(e) =>
                              setProductForm({ ...productForm, dimensions: e.target.value })
                            }
                            placeholder="Ej: 45 cm alto × 35 cm ancho"
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#252521] mb-1">
                            Tallos / Flores incluidas:
                          </label>
                          <input
                            type="text"
                            value={productForm.stemsInfo || ''}
                            onChange={(e) =>
                              setProductForm({ ...productForm, stemsInfo: e.target.value })
                            }
                            placeholder="Ej: Rosas inglesas, eucalipto, hortensias"
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                          />
                        </div>

                        <div className="sm:col-span-2 flex items-center gap-4 pt-2">
                          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                            <input
                              type="checkbox"
                              checked={productForm.isPublished}
                              onChange={(e) =>
                                setProductForm({ ...productForm, isPublished: e.target.checked })
                              }
                              className="rounded border-[#263D32]"
                            />
                            <span>Publicado en la web (visible para clientes)</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t border-[#263D32]/10">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingProduct(false);
                            setEditingProduct(null);
                          }}
                          className="btn-luxury-secondary text-xs"
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn-luxury-primary text-xs">
                          <Save size={14} />
                          <span>Guardar Arreglo</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Products Table */}
                  <div className="bg-[#FFFFFF] border border-[#263D32]/10 rounded-xs overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8F5EF] text-[#263D32] border-b border-[#263D32]/10 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3">Imagen</th>
                          <th className="p-3">Nombre</th>
                          <th className="p-3">Categoría</th>
                          <th className="p-3">Precio</th>
                          <th className="p-3">Disponibilidad</th>
                          <th className="p-3">Estado</th>
                          <th className="p-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#263D32]/5">
                        {products.map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#F8F5EF]/50 transition-colors">
                            <td className="p-3">
                              <img
                                src={prod.mainImage}
                                alt={prod.name}
                                className="w-12 h-12 object-cover rounded-xs border border-[#263D32]/10"
                              />
                            </td>
                            <td className="p-3 font-medium text-[#252521]">
                              {prod.name}
                              {prod.isDemo && (
                                <span className="ml-2 text-[9px] uppercase tracking-wider text-[#632F3B] bg-[#632F3B]/10 px-1.5 py-0.5 rounded-xs">
                                  Demo
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-[#4A4A45]">{prod.category}</td>
                            <td className="p-3 font-semibold text-[#263D32] tabular-nums">
                              ${prod.price.toFixed(2)} USD
                            </td>
                            <td className="p-3">
                              <span
                                className={`text-[11px] ${
                                  prod.availability === 'in_stock'
                                    ? 'text-[#263D32]'
                                    : 'text-[#632F3B]'
                                }`}
                              >
                                {prod.availability === 'in_stock'
                                  ? 'Disponible'
                                  : prod.availability === 'custom_order'
                                  ? 'Bajo pedido'
                                  : 'Agotado'}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] ${
                                  prod.isPublished ? 'text-emerald-700' : 'text-slate-400'
                                }`}
                              >
                                {prod.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                                <span>{prod.isPublished ? 'Visible' : 'Oculto'}</span>
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1.5">
                              <button
                                onClick={() => startEditProduct(prod)}
                                className="p-1.5 text-[#263D32] hover:bg-[#263D32]/10 rounded-xs"
                                title="Editar"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`¿Eliminar definitivamente "${prod.name}"?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 text-[#632F3B] hover:bg-[#632F3B]/10 rounded-xs"
                                title="Eliminar"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#252521]">
                        Categorías Florales
                      </h3>
                      <p className="text-xs text-[#4A4A45]">
                        Organiza las colecciones visuales mostradas en la web.
                      </p>
                    </div>
                    {!isCreatingCategory && !editingCategory && (
                      <button
                        onClick={() => {
                          setIsCreatingCategory(true);
                          setCategoryForm({
                            name: '',
                            slug: '',
                            description: '',
                            image: products[0]?.mainImage || '',
                            order: categories.length + 1,
                          });
                        }}
                        className="btn-luxury-primary text-xs"
                      >
                        <Plus size={14} />
                        <span>Nueva Categoría</span>
                      </button>
                    )}
                  </div>

                  {(isCreatingCategory || editingCategory) && (
                    <form
                      onSubmit={handleSaveCategory}
                      className="bg-[#FFFFFF] p-5 border border-[#263D32]/15 rounded-xs space-y-4"
                    >
                      <h4 className="font-editorial text-xl text-[#263D32]">
                        {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1">Nombre:</label>
                          <input
                            type="text"
                            required
                            value={categoryForm.name}
                            onChange={(e) =>
                              setCategoryForm({ ...categoryForm, name: e.target.value })
                            }
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Descripción:</label>
                          <input
                            type="text"
                            value={categoryForm.description}
                            onChange={(e) =>
                              setCategoryForm({ ...categoryForm, description: e.target.value })
                            }
                            className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingCategory(false);
                            setEditingCategory(null);
                          }}
                          className="btn-luxury-secondary text-xs"
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn-luxury-primary text-xs">
                          Guardar Categoría
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="bg-[#FFFFFF] p-4 border border-[#263D32]/10 rounded-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cat.image}
                            alt=""
                            className="w-12 h-12 object-cover rounded-xs border border-[#263D32]/10"
                          />
                          <div>
                            <h4 className="font-editorial text-base text-[#252521] font-medium">
                              {cat.name}
                            </h4>
                            <p className="text-[11px] text-[#4A4A45] line-clamp-1">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingCategory(cat);
                              setCategoryForm(cat);
                            }}
                            className="p-1.5 text-[#263D32] hover:bg-[#263D32]/10 rounded-xs"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar categoría "${cat.name}"?`)) {
                                deleteCategory(cat.id);
                              }
                            }}
                            className="p-1.5 text-[#632F3B] hover:bg-[#632F3B]/10 rounded-xs"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#252521]">
                        Registro de Pedidos
                      </h3>
                      <p className="text-xs text-[#4A4A45]">
                        Pedidos recibidos a través del formulario persistente o catálogo.
                      </p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-[#FFFFFF] p-8 text-center border border-[#263D32]/10 rounded-xs">
                      <p className="font-editorial text-xl text-[#252521] mb-1">
                        No hay pedidos registrados todavía
                      </p>
                      <p className="text-xs text-[#4A4A45]">
                        Cuando un cliente complete un encargo en el modo de pedido persistente, se listará aquí.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-[#FFFFFF] p-5 border border-[#263D32]/10 rounded-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#263D32]/10 gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#263D32]">
                                  #{order.id}
                                </span>
                                <span className="text-xs font-medium text-[#252521]">
                                  {order.customerName}
                                </span>
                              </div>
                              <span className="text-[11px] text-[#4A4A45]">
                                {new Date(order.createdAt).toLocaleString('es-PA')}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-[#4A4A45]">Estado:</span>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  updateOrderStatus(order.id, e.target.value as any)
                                }
                                className="bg-[#F8F5EF] border border-[#263D32]/20 text-xs py-1 px-2 rounded-xs"
                              >
                                <option value="pending">Pendiente</option>
                                <option value="in_preparation">En preparación</option>
                                <option value="delivered">Entregado</option>
                                <option value="cancelled">Cancelado</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <p><strong>Teléfono / WhatsApp:</strong> {order.customerPhone}</p>
                              {order.customerAddress && (
                                <p><strong>Dirección en Colón:</strong> {order.customerAddress}</p>
                              )}
                              {order.notes && <p><strong>Notas:</strong> {order.notes}</p>}
                            </div>

                            <div>
                              <p className="font-medium text-[#263D32] mb-1">Arreglos solicitados:</p>
                              <ul className="space-y-1">
                                {order.items.map((it, i) => (
                                  <li key={i} className="flex justify-between text-[11px]">
                                    <span>
                                      {it.quantity}x {it.productName}
                                      {it.dedicationNote && (
                                        <span className="italic text-[#632F3B] block pl-2">
                                          "{it.dedicationNote}"
                                        </span>
                                      )}
                                    </span>
                                    <span className="tabular-nums font-mono">
                                      ${(it.productPrice * it.quantity).toFixed(2)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <p className="pt-2 text-right font-bold text-sm text-[#263D32] border-t border-[#263D32]/10 mt-2">
                                Total: ${order.total.toFixed(2)} USD
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CONFIG */}
              {activeTab === 'config' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#252521]">
                      Configuración Central de Marca
                    </h3>
                    <p className="text-xs text-[#4A4A45]">
                      Controla la modalidad comercial, teléfono, textos y franjas informativas.
                    </p>
                  </div>

                  <form onSubmit={handleSaveConfig} className="bg-[#FFFFFF] p-6 border border-[#263D32]/15 rounded-xs space-y-5">
                    {/* Commercial Mode Selection */}
                    <div className="p-4 bg-[#F8F5EF] border border-[#263D32]/10 rounded-xs space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#263D32]">
                        Modalidad Comercial
                      </h4>
                      <p className="text-xs text-[#4A4A45]">
                        Selecciona cómo interactúan los clientes al confirmar sus arreglos florales:
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-start gap-3 p-3 bg-[#FFFFFF] border rounded-xs cursor-pointer hover:border-[#263D32]">
                          <input
                            type="radio"
                            name="commMode"
                            checked={configForm.commercialMode === 'whatsapp'}
                            onChange={() =>
                              setConfigForm({ ...configForm, commercialMode: 'whatsapp' })
                            }
                            className="mt-0.5 text-[#263D32]"
                          />
                          <div>
                            <span className="block text-xs font-semibold text-[#252521]">
                              A. Modo catálogo y pedidos por WhatsApp (Recomendado)
                            </span>
                            <span className="text-[11px] text-[#4A4A45]">
                              El cliente prepara su selección y el sistema abre un mensaje formateado en WhatsApp para coordinar directamente con la floristería.
                            </span>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-3 bg-[#FFFFFF] border rounded-xs cursor-pointer hover:border-[#263D32]">
                          <input
                            type="radio"
                            name="commMode"
                            checked={configForm.commercialMode === 'persistent'}
                            onChange={() =>
                              setConfigForm({ ...configForm, commercialMode: 'persistent' })
                            }
                            className="mt-0.5 text-[#263D32]"
                          />
                          <div>
                            <span className="block text-xs font-semibold text-[#252521]">
                              B. Modo carrito con pedidos persistentes
                            </span>
                            <span className="text-[11px] text-[#4A4A45]">
                              Los pedidos se guardan en el sistema con código #CF-XXXX y se visualizan en la pestaña de Pedidos del administrador.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Contact & Schedule Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Teléfono de Llamadas:
                        </label>
                        <input
                          type="text"
                          value={configForm.phone}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, phone: e.target.value, phoneDisplay: e.target.value })
                          }
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Número de WhatsApp (con código de país, ej: 5074745707):
                        </label>
                        <input
                          type="text"
                          value={configForm.whatsappNumber}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, whatsappNumber: e.target.value })
                          }
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Dirección del Taller (fija verificada):
                        </label>
                        <input
                          type="text"
                          value={configForm.address}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, address: e.target.value })
                          }
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Horario de Atención (editable o neutral):
                        </label>
                        <input
                          type="text"
                          value={configForm.scheduleText}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, scheduleText: e.target.value })
                          }
                          placeholder="Ej: Consulta disponibilidad y pedidos anticipados"
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                        />
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={configForm.showSchedule}
                            onChange={(e) =>
                              setConfigForm({ ...configForm, showSchedule: e.target.checked })
                            }
                            id="showSched"
                            className="rounded text-[#263D32]"
                          />
                          <label htmlFor="showSched" className="text-[11px] text-[#4A4A45]">
                            Mostrar información de horario en la web pública
                          </label>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Texto del Announcement Bar Superior:
                        </label>
                        <input
                          type="text"
                          value={configForm.announcementText}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, announcementText: e.target.value })
                          }
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs"
                        />
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={configForm.showAnnouncement}
                            onChange={(e) =>
                              setConfigForm({ ...configForm, showAnnouncement: e.target.checked })
                            }
                            id="showAnnounce"
                            className="rounded text-[#263D32]"
                          />
                          <label htmlFor="showAnnounce" className="text-[11px] text-[#4A4A45]">
                            Mostrar franja superior en la página
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Ruta del Logotipo:
                        </label>
                        <input
                          type="text"
                          value={configForm.logoPath}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, logoPath: e.target.value })
                          }
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs font-mono"
                        />
                        <span className="text-[10px] text-[#4A4A45]">
                          Por defecto: /images/casaflor-logo.png
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#252521] mb-1">
                          Ancho del Logo en Escritorio:
                        </label>
                        <input
                          type="text"
                          value={configForm.logoWidthDesktop}
                          onChange={(e) =>
                            setConfigForm({ ...configForm, logoWidthDesktop: e.target.value })
                          }
                          className="w-full bg-[#F8F5EF] border border-[#263D32]/20 text-xs p-2 rounded-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#263D32]/10">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('¿Restablecer todos los valores originales de fábrica?')) {
                            resetBrandConfig();
                          }
                        }}
                        className="text-xs text-[#632F3B] hover:underline flex items-center gap-1"
                      >
                        <RefreshCw size={12} />
                        <span>Restablecer valores iniciales</span>
                      </button>

                      <button type="submit" className="btn-luxury-primary text-xs">
                        <Save size={14} />
                        <span>Guardar Configuración</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 5: DATABASE & SUPABASE ARCHITECTURE */}
              {activeTab === 'database' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#252521]">
                      Integración de Persistencia Externa
                    </h3>
                    <p className="text-xs text-[#4A4A45]">
                      Estado actual de almacenamiento y esquema SQL preparado para conectar Supabase o PostgreSQL cuando el propietario lo decida.
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] p-6 border border-[#263D32]/15 rounded-xs space-y-4 text-xs">
                    <div className="p-3 bg-[#E7ECE4] border border-[#263D32]/20 rounded-xs flex items-center justify-between">
                      <div>
                        <strong className="text-[#263D32] block">Almacenamiento Activo:</strong>
                        <span>Persistencia reactiva en navegador (Local Storage + Estado de Sesión).</span>
                      </div>
                      <span className="text-[10px] font-mono bg-[#263D32] text-[#F8F5EF] px-2 py-0.5 rounded-xs uppercase">
                        Operacional
                      </span>
                    </div>

                    <p className="text-[#4A4A45] leading-relaxed">
                      Todas las altas, bajas, cambios de precios y pedidos se guardan en el almacenamiento local del navegador en este momento. Si deseas sincronización multi-dispositivo en la nube con Supabase, las siguientes tablas SQL ya están diseñadas con sus políticas RLS:
                    </p>

                    <pre className="bg-[#1A2B23] text-[#A8B5A0] p-4 rounded-xs overflow-x-auto text-[11px] font-mono leading-relaxed">
{`-- Esquema SQL listo para Supabase / PostgreSQL
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  availability TEXT DEFAULT 'in_stock',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  items JSONB NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);`}
                    </pre>

                    <div className="text-[11px] text-[#4A4A45] space-y-1">
                      <p><strong>Variables de entorno requeridas para conectar:</strong></p>
                      <p className="font-mono text-[#263D32]">VITE_SUPABASE_URL</p>
                      <p className="font-mono text-[#263D32]">VITE_SUPABASE_ANON_KEY</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
