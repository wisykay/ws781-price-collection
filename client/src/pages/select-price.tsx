import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetectedPrice {
  id: string;
  image: string;
  price: number;
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

export default function SelectPricePage() {
  const [, navigate] = useLocation();
  const [prices, setPrices] = useState<DetectedPrice[]>(initialPrices);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleContinue = () => {
    if (selectedPrice) {
      navigate("/assign-product");
    }
  };

  const startEditing = (e: React.MouseEvent, item: DetectedPrice) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.price.toFixed(2));
  };

  const saveEdit = (id: string) => {
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setPrices(prices.map(p => 
        p.id === id ? { ...p, price: numValue } : p
      ));
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            data-testid="button-back"
            onClick={() => navigate("/camera")}
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
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-32 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-800">
              Selecciona un precio detectado
            </h2>
          </div>
          <span className="text-primary font-medium">{prices.length} precios</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Toca el lápiz para corregir si el OCR capturó mal el precio
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {prices.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              data-testid={`price-card-${item.id}`}
              onClick={() => editingId !== item.id && setSelectedPrice(item.id)}
              className={`relative bg-white rounded-2xl overflow-hidden card-shadow transition-all cursor-pointer ${
                selectedPrice === item.id
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={item.image}
                  alt={`Precio $${item.price}`}
                  className="w-full h-full object-cover"
                />
                {selectedPrice === item.id && editingId !== item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              
              <div className={`py-3 px-3 transition-colors ${
                selectedPrice === item.id ? "bg-primary/5" : "bg-white"
              }`}>
                <AnimatePresence mode="wait">
                  {editingId === item.id ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-lg font-bold text-slate-800">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        data-testid={`input-price-${item.id}`}
                        autoFocus
                        className="flex-1 w-full text-lg font-bold text-primary bg-white border border-primary/30 rounded-lg px-2 py-1 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(item.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                      <button
                        data-testid={`button-save-price-${item.id}`}
                        onClick={() => saveEdit(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        data-testid={`button-cancel-edit-${item.id}`}
                        onClick={cancelEdit}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className={`text-lg font-bold ${
                        selectedPrice === item.id ? "text-primary" : "text-slate-800"
                      }`}>
                        $ {item.price.toFixed(2)}
                      </span>
                      <button
                        data-testid={`button-edit-price-${item.id}`}
                        onClick={(e) => startEditing(e, item)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {!selectedPrice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="relative w-48 h-48 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="clipboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(231 68% 50%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(231 68% 65%)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect x="50" y="30" width="100" height="140" rx="12" fill="url(#clipboardGradient)" stroke="hsl(231 68% 50%)" strokeWidth="2" />
                <rect x="70" y="20" width="60" height="20" rx="6" fill="hsl(231 68% 50%)" />
                <circle cx="100" cy="30" r="4" fill="white" />
                <rect x="65" y="60" width="70" height="8" rx="4" fill="hsl(231 68% 50%)" opacity="0.3" />
                <rect x="65" y="80" width="50" height="8" rx="4" fill="hsl(231 68% 50%)" opacity="0.3" />
                <rect x="65" y="100" width="60" height="8" rx="4" fill="hsl(231 68% 50%)" opacity="0.3" />
                <circle cx="145" cy="145" r="30" fill="hsl(231 68% 50%)" opacity="0.15" />
                <path d="M135 145 L143 153 L158 138" stroke="hsl(231 68% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-muted-foreground text-center max-w-xs">
              Selecciona un precio detectado para asignarlo a un producto
            </p>
          </motion.div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
        <Button
          data-testid="button-confirm"
          onClick={handleContinue}
          disabled={!selectedPrice}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold card-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar asignación
        </Button>
      </div>
    </div>
  );
}
