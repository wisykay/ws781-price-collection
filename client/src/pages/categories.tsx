import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Keyboard, Camera } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  {
    id: "1B3C971",
    name: "Mascotas",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=120&h=120&fit=crop",
  },
  {
    id: "2B3C972",
    name: "Jabón Panela",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=120&h=120&fit=crop",
  },
  {
    id: "3B3C973",
    name: "Cerveza",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=120&h=120&fit=crop",
  },
];

const currencies = ["USD - Dólar", "EUR - Euro", "VES - Bolívar"];

export default function CategoriesPage() {
  const [, navigate] = useLocation();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            data-testid="button-back"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-primary">WISY</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 pb-32 max-w-lg mx-auto">
        
        <div className="relative mb-6">
          <p className="text-xs font-medium text-slate-500 mb-2 ml-1">Seleccionar moneda</p>
          <button
            data-testid="button-currency-selector"
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-primary/5 rounded-2xl border-2 border-primary/20 shadow-sm transition-all hover:border-primary/40"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span className="font-semibold text-slate-800">{selectedCurrency}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-primary transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
          </button>
          
          <AnimatePresence>
            {currencyOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden z-10"
              >
                {currencies.map((currency) => (
                  <button
                    key={currency}
                    data-testid={`currency-option-${currency}`}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setCurrencyOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                      currency === selectedCurrency ? "bg-primary/5 text-primary font-medium" : "text-slate-700"
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Categorías</h2>
              <p className="text-slate-500">Selecciona una categoría para continuar</p>
            </div>
            
            <div className="space-y-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  data-testid={`card-category-${category.id}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-8 h-8 object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 truncate">{category.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-400">7/18 completado</p>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">39%</span>
                      </div>
                    </div>
                    
                    <div className="w-20 flex-shrink-0">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '39%' }} />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    data-testid={`button-capture-${category.id}`}
                    onClick={() => navigate("/camera")}
                    className="w-full h-11 rounded-xl bg-primary flex items-center justify-center gap-2 text-white hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-sm font-medium">Capturar precio $</span>
                  </button>
                  
                  <button
                    data-testid={`button-manual-${category.id}`}
                    onClick={() => navigate("/manual-price")}
                    className="mt-3 w-full h-10 rounded-xl border border-slate-200 flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Keyboard className="w-4 h-4" />
                    <span className="text-sm font-medium">Agregar precio manual</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </>
      </main>
    </div>
  );
}
