import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [styleVersion, setStyleVersion] = useState<"A" | "B">("A");

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
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setStyleVersion("A")}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
              styleVersion === "A" 
                ? "bg-primary text-white" 
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            Estilo A
          </button>
          <button
            onClick={() => setStyleVersion("B")}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
              styleVersion === "B" 
                ? "bg-primary text-white" 
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            Estilo B
          </button>
        </div>

        <div className="relative mb-6">
          <button
            data-testid="button-currency-selector"
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-primary/30"
          >
            <span className="font-medium text-slate-700">{selectedCurrency}</span>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
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

        {styleVersion === "A" ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Price collection</h2>
              <p className="text-slate-500">¿Para qué categoría de producto estás recopilando datos?</p>
            </div>
            
            <div className="space-y-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`card-category-${category.id}`}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
                      <p className="text-sm text-slate-400">ID: {category.id}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      data-testid={`button-capture-${category.id}`}
                      onClick={() => navigate("/camera")}
                      className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 font-semibold text-base"
                    >
                      Agregar fotos
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      data-testid={`button-manual-${category.id}`}
                      className="w-full h-12 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-base"
                    >
                      Carga manual
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Categorías</h2>
              <p className="text-slate-500">Selecciona una categoría para continuar</p>
            </div>
            
            <div className="space-y-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`card-category-${category.id}`}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-5 mb-3">
                    <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pl-1">
                    <Button
                      data-testid={`button-capture-${category.id}`}
                      onClick={() => navigate("/camera")}
                      className="flex-1 h-11 rounded-2xl bg-primary hover:bg-primary/90 font-semibold"
                    >
                      Agregar fotos
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      data-testid={`button-manual-${category.id}`}
                      className="flex-1 h-11 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Carga manual
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
