import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Pencil, Camera, Check, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Category {
  id: string;
  name: string;
  image: string;
  completed: number;
  total: number;
  status: "completed" | "in-progress" | "pending";
}

const categories: Category[] = [
  {
    id: "1",
    name: "Margarina",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=120&h=120&fit=crop",
    completed: 7,
    total: 18,
    status: "in-progress",
  },
  {
    id: "2",
    name: "Bebidas",
    image: "https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=120&h=120&fit=crop",
    completed: 7,
    total: 7,
    status: "completed",
  },
  {
    id: "3",
    name: "Harinas",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop",
    completed: 0,
    total: 4,
    status: "pending",
  },
  {
    id: "4",
    name: "Lácteos",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop",
    completed: 3,
    total: 12,
    status: "in-progress",
  },
];

const currencies = ["USD - Dólar", "EUR - Euro", "VES - Bolívar"];

export default function CategoriesPage() {
  const [, navigate] = useLocation();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const getStatusConfig = (status: Category["status"]) => {
    switch (status) {
      case "completed":
        return {
          label: "Completado",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          icon: Check,
          progressColor: "bg-emerald-500",
        };
      case "in-progress":
        return {
          label: "En progreso",
          color: "text-primary",
          bgColor: "bg-primary/5",
          icon: Clock,
          progressColor: "bg-primary",
        };
      case "pending":
        return {
          label: "Pendiente",
          color: "text-muted-foreground",
          bgColor: "bg-muted",
          icon: Package,
          progressColor: "bg-gray-300",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            data-testid="button-back"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-primary">WISY:</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 pb-32 max-w-lg mx-auto">
        <div className="relative mb-8">
          <button
            data-testid="button-currency-selector"
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-white rounded-2xl border border-slate-200 card-shadow transition-all hover:border-primary/30"
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
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 card-shadow-lg overflow-hidden z-10"
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

        <div className="space-y-4">
          {categories.map((category, index) => {
            const statusConfig = getStatusConfig(category.status);
            const progress = (category.completed / category.total) * 100;
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                data-testid={`card-category-${category.id}`}
                className="bg-white rounded-3xl p-5 card-shadow border border-slate-100 hover:border-primary/20 transition-all"
              >
                <div className="flex gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    {category.status === "completed" && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-semibold text-slate-800">{category.name}</h3>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig.bgColor}`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.color}`} />
                        <span className={`text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.completed}/{category.total} Productos
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`h-full rounded-full ${statusConfig.progressColor}`}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-500 min-w-[3rem] text-right">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    data-testid={`button-manual-${category.id}`}
                    className="flex-1 h-12 rounded-xl border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-medium"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Carga Manual
                  </Button>
                  <Button
                    data-testid={`button-capture-${category.id}`}
                    onClick={() => navigate("/camera")}
                    className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-medium"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capturar Precios
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
        <Button
          data-testid="button-submit-all"
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold card-shadow-lg"
        >
          Enviar todas las categorías
        </Button>
      </div>
    </div>
  );
}
