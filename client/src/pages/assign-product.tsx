import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, X, Plus, ChevronDown, Eye, Clock, Camera, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  variant: string;
  usualPrice: number;
  image: string;
}

interface DetectedPrice {
  id: string;
  image: string;
  price: number;
  assignedProducts: Product[];
}

const allProducts: Product[] = [
  { id: "1", name: "GALLETAS MARIA 200G", variant: "Individual", usualPrice: 1.01, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "2", name: "GALLETAS SODA 200G", variant: "Individual", usualPrice: 0.99, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
  { id: "3", name: "GALLETAS OREO 154G", variant: "Individual", usualPrice: 2.50, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&h=80&fit=crop" },
  { id: "4", name: "GALLETAS CHIPS AHOY 128G", variant: "Individual", usualPrice: 2.25, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "5", name: "GALLETAS RITZ 100G", variant: "Individual", usualPrice: 1.75, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
  { id: "6", name: "GALLETAS CLUB SOCIAL 234G", variant: "Pack x6", usualPrice: 3.25, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&h=80&fit=crop" },
  { id: "7", name: "GALLETAS Festival 403G", variant: "Individual", usualPrice: 2.80, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "8", name: "GALLETAS DUCALES 294G", variant: "Individual", usualPrice: 2.15, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
  { id: "9", name: "GALLETAS SALTINAS 300G", variant: "Individual", usualPrice: 1.95, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&h=80&fit=crop" },
  { id: "10", name: "GALLETAS KRAKER BRAN 200G", variant: "Individual", usualPrice: 1.65, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "11", name: "GALLETAS NOEL RECREO 360G", variant: "Pack x12", usualPrice: 4.50, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
  { id: "12", name: "GALLETAS BELVITA 250G", variant: "Individual", usualPrice: 3.10, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&h=80&fit=crop" },
  { id: "13", name: "GALLETAS TOSH 270G", variant: "Individual", usualPrice: 2.45, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "14", name: "GALLETAS WAFER ITALO 100G", variant: "Individual", usualPrice: 0.85, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
  { id: "15", name: "GALLETAS CIRCUS 200G", variant: "Individual", usualPrice: 1.20, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&h=80&fit=crop" },
  { id: "16", name: "GALLETAS CHOCOCHIPS 150G", variant: "Individual", usualPrice: 1.80, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "17", name: "GALLETAS BARQUILLO 100G", variant: "Pack x4", usualPrice: 2.00, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
  { id: "18", name: "GALLETAS ARTESANALES 300G", variant: "Individual", usualPrice: 3.50, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=80&h=80&fit=crop" },
  { id: "19", name: "GALLETAS DIGESTIVE 400G", variant: "Individual", usualPrice: 2.90, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=80&h=80&fit=crop" },
  { id: "20", name: "GALLETAS CHOCOLINAS 170G", variant: "Individual", usualPrice: 1.55, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=80&h=80&fit=crop" },
];

const initialPrices: DetectedPrice[] = [
  { id: "1", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=800&fit=crop", price: 1.01, assignedProducts: [] },
  { id: "2", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=800&fit=crop", price: 0.98, assignedProducts: [] },
  { id: "3", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop", price: 2.50, assignedProducts: [] },
  { id: "4", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=800&fit=crop", price: 1.75, assignedProducts: [] },
  { id: "5", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=800&fit=crop", price: 3.25, assignedProducts: [] },
  { id: "6", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop", price: 2.15, assignedProducts: [] },
  { id: "7", image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&h=800&fit=crop", price: 0.85, assignedProducts: [] },
  { id: "8", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&h=800&fit=crop", price: 1.95, assignedProducts: [] },
  { id: "9", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=800&fit=crop", price: 4.50, assignedProducts: [] },
  { id: "10", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop", price: 2.80, assignedProducts: [] },
];

export default function AssignProductPage() {
  const [, navigate] = useLocation();
  const [prices, setPrices] = useState<DetectedPrice[]>(initialPrices);
  const [modalPriceId, setModalPriceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [previewImage, setPreviewImage] = useState<DetectedPrice | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");

  const totalProductsAssigned = prices.reduce((sum, p) => sum + p.assignedProducts.length, 0);
  const totalProducts = allProducts.length;
  const progress = (totalProductsAssigned / totalProducts) * 100;
  const unassignedCount = totalProducts - totalProductsAssigned;

  const getAssignedProductIds = () => {
    const ids = new Set<string>();
    prices.forEach(p => p.assignedProducts.forEach(prod => ids.add(prod.id)));
    return ids;
  };

  const assignedProductIds = getAssignedProductIds();
  const modalPrice = prices.find(p => p.id === modalPriceId);

  const getAvailableProducts = () => {
    return allProducts.filter(p => 
      !assignedProductIds.has(p.id) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleConfirmAll = () => {
    if (totalProductsAssigned === totalProducts) {
      navigate("/");
    }
  };

  const addProductToPrice = (priceId: string, product: Product) => {
    setPrices(prices.map(p => 
      p.id === priceId 
        ? { ...p, assignedProducts: [...p.assignedProducts, product] } 
        : p
    ));
  };

  const removeProductFromPrice = (priceId: string, productId: string) => {
    setPrices(prices.map(p => 
      p.id === priceId 
        ? { ...p, assignedProducts: p.assignedProducts.filter(prod => prod.id !== productId) } 
        : p
    ));
  };

  const startEditingPrice = (price: DetectedPrice) => {
    setEditingPriceId(price.id);
    setEditValue(price.price.toFixed(2));
  };

  const saveEditedPrice = (priceId: string) => {
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setPrices(prices.map(p => 
        p.id === priceId ? { ...p, price: numValue } : p
      ));
    }
    setEditingPriceId(null);
  };

  const isProductAssignedToThisPrice = (productId: string, priceId: string) => {
    const price = prices.find(p => p.id === priceId);
    return price?.assignedProducts.some(p => p.id === productId) ?? false;
  };

  return (
    <>
    <AnimatePresence>
      {previewImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={() => setPreviewImage(null)}
        >
          <div className="flex items-center justify-between p-4">
            <button
              data-testid="button-close-preview"
              onClick={() => setPreviewImage(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-white font-bold text-2xl">
              ${previewImage.price.toFixed(2)}
            </span>
            <div className="w-10" />
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={previewImage.image}
              alt="Foto del precio"
              className="max-w-full max-h-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {modalPrice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end"
          onClick={() => {
            setModalPriceId(null);
            setSearchQuery("");
          }}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full bg-white rounded-t-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Productos para ${modalPrice.price.toFixed(2)}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {modalPrice.assignedProducts.length} asignados
                  </p>
                </div>
                <button
                  data-testid="button-close-modal"
                  onClick={() => {
                    setModalPriceId(null);
                    setSearchQuery("");
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-modal"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {modalPrice.assignedProducts.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Asignados a este precio
                  </p>
                  <div className="space-y-2">
                    {modalPrice.assignedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 bg-slate-500 rounded-xl border border-slate-600"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{product.name}</p>
                          <p className="text-xs text-slate-300">{product.variant}</p>
                        </div>
                        <button
                          data-testid={`button-remove-modal-${product.id}`}
                          onClick={() => removeProductFromPrice(modalPrice.id, product.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-400 text-white hover:bg-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getAvailableProducts().length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Disponibles ({getAvailableProducts().length})
                  </p>
                  <div className="space-y-2">
                    {getAvailableProducts().map((product) => (
                      <button
                        key={product.id}
                        data-testid={`product-modal-${product.id}`}
                        onClick={() => addProductToPrice(modalPrice.id, product)}
                        className="w-full flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.variant} · Usual ${product.usualPrice.toFixed(2)}</p>
                        </div>
                        <Plus className="w-5 h-5 text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {getAvailableProducts().length === 0 && modalPrice.assignedProducts.length === 0 && (
                <p className="text-center text-slate-400 py-8">
                  Todos los productos ya están asignados a otros precios
                </p>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <Button
                data-testid="button-done-modal"
                onClick={() => {
                  setModalPriceId(null);
                  setSearchQuery("");
                }}
                className="w-full h-12 rounded-xl bg-primary font-semibold"
              >
                Listo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            data-testid="button-back"
            onClick={() => navigate("/camera")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-900">Asignar productos</h1>
            <p className="text-xs text-slate-500">Galletas y Bizcochos</p>
          </div>
          <div className="w-10" />
        </div>
        
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-500">{totalProductsAssigned} de {totalProducts} productos</span>
            <span className="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="px-4 pb-3">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "list" | "cards")}
            data-testid="select-view-mode"
            className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:border-primary cursor-pointer"
          >
            <option value="list">Vista Lista</option>
            <option value="cards">Vista Tarjetas</option>
          </select>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-28">
        {viewMode === "cards" ? (
          /* CARD VIEW */
          <div className="space-y-4">
            {prices.map((priceItem, index) => {
              const hasProducts = priceItem.assignedProducts.length > 0;
              const priceProgress = hasProducts ? (priceItem.assignedProducts.length / 5) * 100 : 0;
              
              return (
                <motion.div
                  key={priceItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                  data-testid={`price-card-${priceItem.id}`}
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Price Tag Image */}
                    <div className="relative">
                      <img
                        src={priceItem.image}
                        alt="Price tag"
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <button
                        onClick={() => setPreviewImage(priceItem)}
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-primary"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Price Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800">${priceItem.price.toFixed(2)}</h3>
                      <p className="text-sm text-slate-500">
                        {hasProducts ? `${priceItem.assignedProducts.length} productos` : "Sin productos"}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${hasProducts ? 'bg-slate-100 text-slate-700' : 'bg-primary/10 text-primary'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{hasProducts ? "Asignado" : "Pendiente"}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min(priceProgress, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{Math.min(Math.round(priceProgress), 100)}%</span>
                    </div>
                  </div>
                  
                  {/* Assigned Products Preview */}
                  {hasProducts && (
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                      {priceItem.assignedProducts.map((product) => (
                        <div key={product.id} className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border-2 border-slate-200"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewImage(priceItem)}
                      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver Foto</span>
                    </button>
                    <button
                      onClick={() => setModalPriceId(priceItem.id)}
                      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Asignar</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="space-y-3">
            {prices.map((priceItem, index) => {
              const hasProducts = priceItem.assignedProducts.length > 0;
            
            return (
              <motion.div
                key={priceItem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center gap-3"
                data-testid={`price-row-${priceItem.id}`}
              >
                {/* Price box - separate with light bg and dark border */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-slate-200">
                    <span className="text-lg font-bold text-slate-800">
                      ${priceItem.price.toFixed(2)}
                    </span>
                  </div>
                  {/* Eye icon in corner */}
                  <button
                    data-testid={`button-photo-${priceItem.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(priceItem);
                    }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md border border-slate-200 text-primary"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>

                {/* Products box - unified styling */}
                <div 
                  className={`flex-1 flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${hasProducts ? 'bg-slate-600 text-white shadow-md border border-slate-700' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'}`}
                  onClick={() => setModalPriceId(priceItem.id)}
                >
                  {/* Products area */}
                  <div className="flex-1 min-w-0">
                    {hasProducts ? (
                      <div className="flex items-center gap-1">
                        {priceItem.assignedProducts.slice(0, 3).map((product) => (
                          <img
                            key={product.id}
                            src={product.image}
                            alt={product.name}
                            className="w-9 h-9 rounded-xl object-cover border-2 border-white/40 shadow-sm"
                          />
                        ))}
                        {priceItem.assignedProducts.length > 3 && (
                          <span className="w-9 h-9 rounded-xl bg-slate-500 flex items-center justify-center text-sm font-medium text-white">
                            ...
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Toca para asignar productos</p>
                    )}
                  </div>

                  {/* Count badge + chevron */}
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${hasProducts ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {hasProducts ? (
                      <span className="text-sm font-bold">{priceItem.assignedProducts.length}</span>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <Button
          data-testid="button-confirm-all"
          onClick={handleConfirmAll}
          disabled={unassignedCount > 0}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold disabled:opacity-50"
        >
          {unassignedCount > 0 
            ? `${unassignedCount} productos sin asignar`
            : "Confirmar asignaciones"
          }
        </Button>
      </div>
    </div>
    </>
  );
}
