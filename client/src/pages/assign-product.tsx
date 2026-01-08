import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, Pencil, X, ZoomIn, ChevronDown, ChevronUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetectedPrice {
  id: string;
  image: string;
  price: number;
  assignedProduct?: Product | null;
}

interface Product {
  id: string;
  name: string;
  variant: string;
  usualPrice: number;
  image: string;
}

const initialPrices: DetectedPrice[] = [
  { id: "1", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop", price: 1.01, assignedProduct: null },
  { id: "2", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop", price: 0.98, assignedProduct: null },
  { id: "3", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", price: 0.74, assignedProduct: null },
  { id: "4", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop", price: 12.0, assignedProduct: null },
  { id: "5", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop", price: 2.50, assignedProduct: null },
  { id: "6", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop", price: 3.25, assignedProduct: null },
];

const products: Product[] = [
  { id: "1", name: "PAN HARINA MAIZ AMARILLA 1KG", variant: "Individual", usualPrice: 1.01, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "2", name: "PAN HARINA MAIZ BLANCO 1KG", variant: "Individual", usualPrice: 0.99, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "3", name: "HARINA DE TRIGO 1KG", variant: "Pack x3", usualPrice: 2.50, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "4", name: "AVENA QUAKER 400G", variant: "Individual", usualPrice: 1.75, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "5", name: "ACEITE VEGETAL 1L", variant: "Individual", usualPrice: 3.25, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "6", name: "ARROZ TIPO 1 1KG", variant: "Individual", usualPrice: 0.85, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "7", name: "LECHE EN POLVO 400G", variant: "Individual", usualPrice: 4.50, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
  { id: "8", name: "AZUCAR REFINADA 1KG", variant: "Individual", usualPrice: 0.75, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
];

export default function AssignProductPage() {
  const [, navigate] = useLocation();
  const [prices, setPrices] = useState<DetectedPrice[]>(initialPrices);
  const [expandedPriceId, setExpandedPriceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [previewImage, setPreviewImage] = useState<DetectedPrice | null>(null);

  const assignedCount = prices.filter(p => p.assignedProduct).length;
  const progress = (assignedCount / prices.length) * 100;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmAll = () => {
    if (assignedCount === prices.length) {
      navigate("/");
    }
  };

  const assignProduct = (priceId: string, product: Product) => {
    setPrices(prices.map(p => 
      p.id === priceId ? { ...p, assignedProduct: product } : p
    ));
    setExpandedPriceId(null);
    setSearchQuery("");
  };

  const unassignProduct = (priceId: string) => {
    setPrices(prices.map(p => 
      p.id === priceId ? { ...p, assignedProduct: null } : p
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
              $ {previewImage.price.toFixed(2)}
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
          <h1 className="text-2xl font-bold tracking-tight text-primary">WISY:</h1>
          <div className="w-10" />
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progreso de asignación</span>
            <span className="text-xs font-medium text-primary">{assignedCount}/{prices.length} asignados</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-32 max-w-lg mx-auto w-full">
        <p className="text-sm text-muted-foreground mb-4">
          Asigna un producto a cada precio capturado. Toca la imagen para ampliar.
        </p>

        <div className="space-y-3">
          {prices.map((priceItem, index) => (
            <motion.div
              key={priceItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl card-shadow border overflow-hidden transition-all ${
                priceItem.assignedProduct 
                  ? "border-emerald-200" 
                  : expandedPriceId === priceItem.id 
                    ? "border-primary" 
                    : "border-slate-100"
              }`}
            >
              <div className="p-3 flex items-center gap-3">
                <div className="relative">
                  <button
                    data-testid={`button-preview-${priceItem.id}`}
                    onClick={() => setPreviewImage(priceItem)}
                    className="relative"
                  >
                    <img
                      src={priceItem.image}
                      alt={`Precio ${priceItem.price}`}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 rounded-xl transition-colors">
                      <ZoomIn className="w-5 h-5 text-white opacity-0 hover:opacity-100" />
                    </div>
                  </button>
                  {priceItem.assignedProduct && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
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
                  
                  {priceItem.assignedProduct ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-700 truncate">
                        {priceItem.assignedProduct.name}
                      </span>
                      <button
                        data-testid={`button-unassign-${priceItem.id}`}
                        onClick={() => unassignProduct(priceItem.id)}
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        Cambiar
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Sin asignar</span>
                  )}
                </div>

                {!priceItem.assignedProduct && (
                  <button
                    data-testid={`button-expand-${priceItem.id}`}
                    onClick={() => setExpandedPriceId(expandedPriceId === priceItem.id ? null : priceItem.id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                      expandedPriceId === priceItem.id 
                        ? "bg-primary text-white" 
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {expandedPriceId === priceItem.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <Package className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {expandedPriceId === priceItem.id && !priceItem.assignedProduct && (
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
                          placeholder="Buscar producto..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          data-testid={`input-search-${priceItem.id}`}
                          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                        />
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {filteredProducts.map((product) => (
                          <button
                            key={product.id}
                            data-testid={`product-${priceItem.id}-${product.id}`}
                            onClick={() => assignProduct(priceItem.id, product)}
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
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                          </button>
                        ))}
                        
                        {filteredProducts.length === 0 && (
                          <p className="text-center text-sm text-muted-foreground py-4">
                            No se encontraron productos
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
          disabled={assignedCount < prices.length}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold card-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {assignedCount < prices.length 
            ? `Asignar ${prices.length - assignedCount} precios pendientes`
            : "Confirmar todas las asignaciones"
          }
        </Button>
      </div>
    </div>
    </>
  );
}
