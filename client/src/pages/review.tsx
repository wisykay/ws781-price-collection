import { useLocation } from "wouter";
import { ArrowLeft, Check, Share2, FileDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock data that would come from the previous step
const reviewedProducts = [
  { id: "1", name: "Super Can Carne Hueso 4Kg", price: 16.20, image: "/product_photos/Super%20Can%20Carne%20Hueso%204Kg.jpg", method: "OCR" },
  { id: "2", name: "Super Can 2Kg", price: 4.50, image: "/product_photos/Super%20Can%202Kg.jpg", method: "OCR" },
  { id: "3", name: "Super Can 18Kg", price: 45.00, image: "/product_photos/Super%20Can%2018Kg.jpg", method: "Manual" },
  { id: "4", name: "RINGO 30Kg", price: 65.00, image: "/product_photos/RINGO%2030Kg.jpg", method: "OCR" },
  { id: "5", name: "RINGO 1Kg", price: 3.50, image: "/product_photos/RINGO%201Kg.jpg", method: "OCR" },
  { id: "6", name: "RINGO Adulto 1Kg", price: 3.80, image: "/product_photos/RINGO%20Adulto%201Kg.jpg", method: "OCR" },
  { id: "7", name: "RINGO 2Kg", price: 6.50, image: "/product_photos/RINGO%202Kg.jpg", method: "Manual" },
];

export default function ReviewPage() {
  const [, navigate] = useLocation();
  const totalItems = reviewedProducts.length;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate("/assign-product")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-900">Resumen</h1>
            <p className="text-xs text-slate-500">Mascotas · {totalItems} productos</p>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Productos con precio asignado
          </h2>
          
          <div className="space-y-4">
            {reviewedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-slate-900 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                      product.method === 'OCR' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {product.method}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <p className="text-base font-bold text-slate-900">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => navigate("/assign-product")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <div className="flex gap-3 max-w-lg mx-auto">
           <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl border-slate-200 text-slate-700"
            onClick={() => {}}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            className="flex-[2] h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold"
            onClick={() => navigate("/")}
          >
            Finalizar y Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
