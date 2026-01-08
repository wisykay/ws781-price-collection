import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, Pencil, X, ZoomIn, ChevronDown, ChevronUp, Package, Plus } from "lucide-react";
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
  { id: "1", name: "GALLETAS MARIA 200G", variant: "Individual", usualPrice: 1.01, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { id: "2", name: "GALLETAS SODA 200G", variant: "Individual", usualPrice: 0.99, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "3", name: "GALLETAS OREO 154G", variant: "Individual", usualPrice: 2.50, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop" },
  { id: "4", name: "GALLETAS CHIPS AHOY 128G", variant: "Individual", usualPrice: 2.25, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "5", name: "GALLETAS RITZ 100G", variant: "Individual", usualPrice: 1.75, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { id: "6", name: "GALLETAS CLUB SOCIAL 234G", variant: "Pack x6", usualPrice: 3.25, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop" },
  { id: "7", name: "GALLETAS Festival 403G", variant: "Individual", usualPrice: 2.80, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "8", name: "GALLETAS DUCALES 294G", variant: "Individual", usualPrice: 2.15, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { id: "9", name: "GALLETAS SALTINAS 300G", variant: "Individual", usualPrice: 1.95, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop" },
  { id: "10", name: "GALLETAS KRAKER BRAN 200G", variant: "Individual", usualPrice: 1.65, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "11", name: "GALLETAS NOEL RECREO 360G", variant: "Pack x12", usualPrice: 4.50, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { id: "12", name: "GALLETAS BELVITA 250G", variant: "Individual", usualPrice: 3.10, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop" },
  { id: "13", name: "GALLETAS TOSH 270G", variant: "Individual", usualPrice: 2.45, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "14", name: "GALLETAS WAFER ITALO 100G", variant: "Individual", usualPrice: 0.85, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { id: "15", name: "GALLETAS CIRCUS 200G", variant: "Individual", usualPrice: 1.20, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop" },
  { id: "16", name: "GALLETAS CHOCOCHIPS 150G", variant: "Individual", usualPrice: 1.80, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "17", name: "GALLETAS BARQUILLO 100G", variant: "Pack x4", usualPrice: 2.00, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { id: "18", name: "GALLETAS ARTESANALES 300G", variant: "Individual", usualPrice: 3.50, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop" },
  { id: "19", name: "GALLETAS DIGESTIVE 400G", variant: "Individual", usualPrice: 2.90, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop" },
  { id: "20", name: "GALLETAS CHOCOLINAS 170G", variant: "Individual", usualPrice: 1.55, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
];

const initialPrices: DetectedPrice[] = [
  { id: "1", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop", price: 1.01, assignedProducts: [] },
  { id: "2", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop", price: 0.98, assignedProducts: [] },
  { id: "3", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", price: 2.50, assignedProducts: [] },
  { id: "4", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop", price: 1.75, assignedProducts: [] },
  { id: "5", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop", price: 3.25, assignedProducts: [] },
  { id: "6", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop", price: 2.15, assignedProducts: [] },
  { id: "7", image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=200&h=200&fit=crop", price: 0.85, assignedProducts: [] },
  { id: "8", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=200&h=200&fit=crop", price: 1.95, assignedProducts: [] },
  { id: "9", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200&h=200&fit=crop", price: 4.50, assignedProducts: [] },
  { id: "10", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop", price: 2.80, assignedProducts: [] },
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
  const unassignedProducts = allProducts.filter(p => !assignedProductIds.has(p.id));

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
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
          onClick={() => setPreviewImage(null)}
        >
          <div className="flex items-center justify-between p-4">
            <button
              data-testid="button-close-preview"
              onClick={() => setPreviewImage(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-white font-bold text-xl">
              ${previewImage.price.toFixed(2)}
            </span>
            <div className="w-10" />
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={previewImage.image.replace('w=200&h=200', 'w=800&h=800')}
              alt="Vista ampliada"
              className="max-w-full max-h-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="p-4 pb-8">
            <p className="text-center text-white/70 text-sm">
              Toca fuera de la imagen para cerrar
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            data-testid="button-back"
            onClick={() => navigate("/select-price")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-primary">WISY</h1>
            <p className="text-xs text-muted-foreground">Galletas y Bizcochos</p>
          </div>
          <div className="w-10" />
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Productos asignados</span>
            <span className="text-xs font-medium text-primary">{totalProductsAssigned}/{totalProducts}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          {unassignedProducts.length > 0 && (
            <p className="text-xs text-amber-600 mt-2">
              {unassignedProducts.length} productos sin precio asignado
            </p>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-32 max-w-lg mx-auto w-full">
        <p className="text-sm text-muted-foreground mb-4">
          Cada precio puede asignarse a múltiples productos. Toca + para agregar productos.
        </p>

        <div className="space-y-3">
          {prices.map((priceItem, index) => (
            <motion.div
              key={priceItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-white rounded-2xl card-shadow border overflow-hidden transition-all ${
                priceItem.assignedProducts.length > 0 
                  ? "border-emerald-200" 
                  : expandedPriceId === priceItem.id 
                    ? "border-primary" 
                    : "border-slate-100"
              }`}
            >
              <div className="p-3 flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <button
                    data-testid={`button-preview-${priceItem.id}`}
                    onClick={() => setPreviewImage(priceItem)}
                    className="relative group"
                  >
                    <img
                      src={priceItem.image}
                      alt={`Precio ${priceItem.price}`}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 rounded-xl transition-colors">
                      <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </button>
                  {priceItem.assignedProducts.length > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{priceItem.assignedProducts.length}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {editingPriceId === priceItem.id ? (
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-primary">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          data-testid={`input-price-${priceItem.id}`}
                          autoFocus
                          className="w-20 text-lg font-bold text-primary bg-white border border-primary/30 rounded-lg px-2 py-0.5 outline-none focus:border-primary"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEditedPrice(priceItem.id);
                            if (e.key === "Escape") setEditingPriceId(null);
                          }}
                        />
                        <button
                          onClick={() => saveEditedPrice(priceItem.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-xl font-bold text-primary">
                          ${priceItem.price.toFixed(2)}
                        </span>
                        <button
                          data-testid={`button-edit-${priceItem.id}`}
                          onClick={() => startEditingPrice(priceItem)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {priceItem.assignedProducts.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {priceItem.assignedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-lg pl-2 pr-1 py-0.5"
                        >
                          <span className="text-xs text-emerald-800 max-w-[120px] truncate">
                            {product.name}
                          </span>
                          <button
                            data-testid={`button-remove-${priceItem.id}-${product.id}`}
                            onClick={() => removeProductFromPrice(priceItem.id, product.id)}
                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-emerald-200 text-emerald-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Sin productos asignados</span>
                  )}
                </div>

                <button
                  data-testid={`button-expand-${priceItem.id}`}
                  onClick={() => {
                    setExpandedPriceId(expandedPriceId === priceItem.id ? null : priceItem.id);
                    setSearchQuery("");
                  }}
                  className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-colors ${
                    expandedPriceId === priceItem.id 
                      ? "bg-primary text-white" 
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {expandedPriceId === priceItem.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {expandedPriceId === priceItem.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-100"
                  >
                    <div className="p-3 bg-slate-50">
                      <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Buscar producto para agregar..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          data-testid={`input-search-${priceItem.id}`}
                          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                        />
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {getAvailableProducts().length > 0 ? (
                          getAvailableProducts().map((product) => (
                            <button
                              key={product.id}
                              data-testid={`product-${priceItem.id}-${product.id}`}
                              onClick={() => addProductToPrice(priceItem.id, product)}
                              className="w-full flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors text-left"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {product.variant} · Usual ${product.usualPrice.toFixed(2)}
                                </p>
                              </div>
                              <Plus className="w-5 h-5 text-primary" />
                            </button>
                          ))
                        ) : (
                          <p className="text-center text-sm text-muted-foreground py-4">
                            {searchQuery ? "No se encontraron productos" : "Todos los productos ya están asignados"}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
        <Button
          data-testid="button-confirm-all"
          onClick={handleConfirmAll}
          disabled={totalProductsAssigned < totalProducts}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold card-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {totalProductsAssigned < totalProducts 
            ? `Faltan ${totalProducts - totalProductsAssigned} productos por asignar`
            : "Confirmar todas las asignaciones"
          }
        </Button>
      </div>
    </div>
    </>
  );
}
