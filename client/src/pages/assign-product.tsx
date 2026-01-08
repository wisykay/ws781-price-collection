import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, Pencil, X, Image, ChevronUp, Plus } from "lucide-react";
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
  const [expandedPriceId, setExpandedPriceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [previewImage, setPreviewImage] = useState<DetectedPrice | null>(null);

  const totalProductsAssigned = prices.reduce((sum, p) => sum + p.assignedProducts.length, 0);
  const totalProducts = allProducts.length;
  const progress = (totalProductsAssigned / totalProducts) * 100;

  const getAssignedProductIds = () => {
    const ids = new Set<string>();
    prices.forEach(p => p.assignedProducts.forEach(prod => ids.add(prod.id)));
    return ids;
  };

  const assignedProductIds = getAssignedProductIds();
  const unassignedCount = totalProducts - totalProductsAssigned;

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
    setSearchQuery("");
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
    
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            data-testid="button-back"
            onClick={() => navigate("/select-price")}
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
      </header>

      <main className="flex-1 px-4 py-4 pb-28">
        <div className="space-y-2">
          {prices.map((priceItem, index) => {
            const isExpanded = expandedPriceId === priceItem.id;
            const hasProducts = priceItem.assignedProducts.length > 0;
            
            return (
              <motion.div
                key={priceItem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <div 
                  className="flex items-center gap-3 p-3 cursor-pointer"
                  onClick={() => {
                    setExpandedPriceId(isExpanded ? null : priceItem.id);
                    setSearchQuery("");
                  }}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${hasProducts ? 'bg-emerald-50' : 'bg-primary/5'}`}>
                    {editingPriceId === priceItem.id ? (
                      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                        <span className="text-sm font-bold text-primary">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          data-testid={`input-price-${priceItem.id}`}
                          autoFocus
                          className="w-12 text-sm font-bold text-primary bg-transparent outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEditedPrice(priceItem.id);
                            if (e.key === "Escape") setEditingPriceId(null);
                          }}
                          onBlur={() => saveEditedPrice(priceItem.id)}
                        />
                      </div>
                    ) : (
                      <span className={`text-lg font-bold ${hasProducts ? 'text-emerald-600' : 'text-primary'}`}>
                        ${priceItem.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {hasProducts ? (
                      <p className="text-sm text-slate-700">
                        {priceItem.assignedProducts.length} producto{priceItem.assignedProducts.length > 1 ? 's' : ''}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">Sin productos</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      data-testid={`button-photo-${priceItem.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(priceItem);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                      <Image className="w-4 h-4" />
                    </button>
                    
                    <button
                      data-testid={`button-edit-${priceItem.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditingPrice(priceItem);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                      isExpanded ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {hasProducts && (
                  <div className="px-3 pb-2 -mt-1 flex gap-1 overflow-x-auto">
                    {priceItem.assignedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="relative flex-shrink-0 group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border-2 border-emerald-400"
                        />
                        <button
                          data-testid={`button-remove-${priceItem.id}-${product.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProductFromPrice(priceItem.id, product.id);
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-slate-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2.5 h-2.5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 p-3 bg-slate-50">
                        <div className="relative mb-2">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            data-testid={`input-search-${priceItem.id}`}
                            className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-200 text-sm outline-none focus:border-primary"
                          />
                        </div>

                        <div className="max-h-36 overflow-y-auto space-y-1">
                          {getAvailableProducts().length > 0 ? (
                            getAvailableProducts().slice(0, 6).map((product) => (
                              <button
                                key={product.id}
                                data-testid={`product-${priceItem.id}-${product.id}`}
                                onClick={() => addProductToPrice(priceItem.id, product)}
                                className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white text-left"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-8 h-8 rounded-md object-cover flex-shrink-0"
                                />
                                <span className="text-sm text-slate-700 truncate flex-1">{product.name}</span>
                                <Plus className="w-4 h-4 text-primary flex-shrink-0" />
                              </button>
                            ))
                          ) : (
                            <p className="text-center text-xs text-slate-400 py-2">
                              {searchQuery ? "Sin resultados" : "Todos asignados"}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
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
