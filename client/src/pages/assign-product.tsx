import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, Tag, Pencil, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetectedPrice {
  id: string;
  image: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  variant: string;
  usualPrice: number;
  image: string;
}

const initialPrices: DetectedPrice[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop",
    price: 1.01,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    price: 0.98,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    price: 0.74,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop",
    price: 12.0,
  },
];

const products: Product[] = [
  {
    id: "1",
    name: "PAN HARINA MAIZ AMARILLA 1KG",
    variant: "Individual",
    usualPrice: 1.01,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "PAN HARINA MAIZ BLANCO 1KG",
    variant: "Individual",
    usualPrice: 0.99,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "HARINA DE TRIGO 1KG",
    variant: "Pack x3",
    usualPrice: 2.50,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    name: "AVENA QUAKER 400G",
    variant: "Individual",
    usualPrice: 1.75,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop",
  },
];

export default function AssignProductPage() {
  const [, navigate] = useLocation();
  const [prices, setPrices] = useState<DetectedPrice[]>(initialPrices);
  const [selectedPrice, setSelectedPrice] = useState<string>("1");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [previewImage, setPreviewImage] = useState<DetectedPrice | null>(null);

  const currentPrice = prices.find((p) => p.id === selectedPrice);
  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedProduct) {
      navigate("/");
    }
  };

  const startEditing = () => {
    if (currentPrice) {
      setEditValue(currentPrice.price.toFixed(2));
      setIsEditingPrice(true);
    }
  };

  const saveEdit = () => {
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue) && numValue >= 0 && currentPrice) {
      setPrices(prices.map(p => 
        p.id === currentPrice.id ? { ...p, price: numValue } : p
      ));
    }
    setIsEditingPrice(false);
  };

  const cancelEdit = () => {
    setIsEditingPrice(false);
    setEditValue("");
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
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "50%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-32 max-w-lg mx-auto w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-slate-600">Precio seleccionado:</span>
            </div>
            
            <AnimatePresence mode="wait">
              {isEditingPrice ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xl font-bold text-primary">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    data-testid="input-edit-current-price"
                    autoFocus
                    className="w-24 text-xl font-bold text-primary bg-white border border-primary/30 rounded-lg px-2 py-1 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <button
                    data-testid="button-save-current-price"
                    onClick={saveEdit}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    data-testid="button-cancel-edit-current"
                    onClick={cancelEdit}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="display"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl font-bold text-primary">
                    $ {currentPrice?.price.toFixed(2)}
                  </span>
                  <button
                    data-testid="button-edit-current-price"
                    onClick={startEditing}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-muted-foreground">
            Toca el lápiz para corregir el precio si el OCR lo capturó mal
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Selecciona el precio a asignar</span>
          <span className="text-primary font-medium text-sm">{prices.length} precios</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 -mx-4 px-4">
          {prices.map((item) => (
            <div key={item.id} className="relative flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                data-testid={`price-thumb-${item.id}`}
                onClick={() => {
                  setSelectedPrice(item.id);
                  setIsEditingPrice(false);
                }}
                className={`relative rounded-xl overflow-hidden transition-all ${
                  selectedPrice === item.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.image}
                  alt={`$${item.price}`}
                  className="w-20 h-20 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-1.5 py-1">
                  <span className="text-xs font-bold text-white">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                {selectedPrice === item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 left-1"
                  >
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
              <button
                data-testid={`button-zoom-${item.id}`}
                onClick={() => setPreviewImage(item)}
                className="absolute top-1 right-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white transition-colors shadow-sm"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <div className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
            +
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-slate-700 mb-3">
            Productos sugeridos para el precio seleccionado
          </p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar un producto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-product"
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                data-testid={`product-card-${product.id}`}
                onClick={() => setSelectedProduct(product.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white card-shadow border transition-all ${
                  selectedProduct === product.id
                    ? "border-primary ring-1 ring-primary"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1">{product.variant}</p>
                  <p className="text-xs text-slate-500">
                    Generalmente <span className="font-medium text-slate-700">${product.usualPrice.toFixed(2)}</span>
                  </p>
                </div>
                
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedProduct === product.id
                    ? "bg-primary border-primary"
                    : "border-slate-300"
                }`}>
                  {selectedProduct === product.id && (
                    <Check className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron productos</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
        <Button
          data-testid="button-confirm-assignment"
          onClick={handleConfirm}
          disabled={!selectedProduct}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold card-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar asignación
        </Button>
      </div>
    </div>
    </>
  );
}
