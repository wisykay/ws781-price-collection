import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: string;
}

const initialProducts: Product[] = [
  { id: "1", name: "Super Can Carne Hueso 4Kg", sku: "SUP-CAR-4K", image: "/product_photos/Super Can Carne Hueso 4Kg.jpg", price: "" },
  { id: "2", name: "Super Can 2Kg", sku: "SUP-2K", image: "/product_photos/Super Can 2Kg.jpg", price: "" },
  { id: "3", name: "Super Can 18Kg", sku: "SUP-18K", image: "/product_photos/Super Can 18Kg.jpg", price: "" },
  { id: "4", name: "RINGO Adulto 1Kg", sku: "RIN-ADU-1K", image: "/product_photos/RINGO Adulto 1Kg.jpg", price: "" },
  { id: "5", name: "RINGO 2Kg", sku: "RIN-2K", image: "/product_photos/RINGO 2Kg.jpg", price: "" },
  { id: "6", name: "RINGO 30Kg", sku: "RIN-30K", image: "/product_photos/RINGO 30Kg.jpg", price: "" },
  { id: "7", name: "RINGO 1Kg", sku: "RIN-1K", image: "/product_photos/RINGO 1Kg.jpg", price: "" },
  { id: "8", name: "Dogourmet 1Kg", sku: "DOG-1K", image: "/product_photos/Dogourmet 1Kg.jpg", price: "" },
  { id: "9", name: "Dogourmet 10Kg", sku: "DOG-10K", image: "/product_photos/Dogourmet 10Kg.jpg", price: "" },
  { id: "10", name: "Dogourmet 18Kg", sku: "DOG-18K", image: "/product_photos/Dogourmet 18Kg.jpg", price: "" },
  { id: "11", name: "Dogourmet Carne Parrilla 4Kg", sku: "DOG-CAR-4K", image: "/product_photos/Dogourmet carne parrilla 4Kg.jpg", price: "" },
  { id: "12", name: "Dog Chow 4Kg", sku: "DCH-4K", image: "/product_photos/Dog Chow 4kg.jpg", price: "" },
  { id: "13", name: "Dog Chow 20Kg", sku: "DCH-20K", image: "/product_photos/Dog Chow 20kg.jpg", price: "" },
  { id: "14", name: "Pedigree 3Kg", sku: "PED-3K", image: "/product_photos/Pedigree 3Kg.jpg", price: "" },
  { id: "15", name: "Filpo 30 Kilos", sku: "FIL-30K", image: "/product_photos/Filpo 30  Kilos.jpg", price: "" },
  { id: "16", name: "Champs Carne 20Kg", sku: "CHA-20K", image: "/product_photos/Champs Carne 20Kg.jpg", price: "" },
  { id: "17", name: "Guardián 25Kg", sku: "GUA-25K", image: "/product_photos/Guardián 25 Kg.jpg", price: "" },
  { id: "18", name: "K NINA Carne 4Kg", sku: "KNI-4K", image: "/product_photos/K NINA Carne 4kg.jpg", price: "" },
  { id: "19", name: "Perrarina 4Kg", sku: "PER-4K", image: "/product_photos/Perrarina 4Kg PDV.jpg", price: "" },
  { id: "20", name: "Protican 4Kg", sku: "PRO-4K", image: "/product_photos/Protican 4kg PDV.jpg", price: "" },
];

export default function ManualPricePage() {
  const [, navigate] = useLocation();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [tempPrice, setTempPrice] = useState("");
    
  const filledCount = products.filter(p => p.price && parseFloat(p.price) > 0).length;
  const totalProducts = products.length;
  const progress = (filledCount / totalProducts) * 100;

  const handlePriceChange = (productId: string, value: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, price: value } : p
    ));
  };

  const openNumpad = (product: Product) => {
    setActiveProduct(product);
    setTempPrice(product.price);
  };

  const handleNumpadPress = (key: string) => {
    if (key === "C") {
      setTempPrice("");
    } else if (key === "⌫") {
      setTempPrice(prev => prev.slice(0, -1));
    } else if (key === ".") {
      if (!tempPrice.includes(".")) {
        setTempPrice(prev => prev + ".");
      }
    } else {
      setTempPrice(prev => prev + key);
    }
  };

  const confirmPrice = () => {
    if (activeProduct) {
      handlePriceChange(activeProduct.id, tempPrice);
      setActiveProduct(null);
      setTempPrice("");
    }
  };

  const handleConfirmAll = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            data-testid="button-back"
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-primary">WISY</h1>
            <p className="text-xs text-slate-500">Precio manual · Mascotas</p>
          </div>
          <div className="w-10" />
        </div>
        
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg">
              <span className="text-sm">💵</span>
              <span className="text-xs font-medium text-slate-600">USD - Dólar</span>
            </div>
            <span className="text-xs text-slate-500">{filledCount}/{totalProducts} con precio · {Math.round(progress)}%</span>
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
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Ingresa los precios</h2>
          <p className="text-sm text-slate-500">Escribe el precio de cada producto</p>
        </div>

        <div className="flex items-center justify-between px-2 py-2 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
          <span>Producto</span>
          <span>Precio $</span>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="flex items-center gap-3 p-3"
              data-testid={`product-row-${product.id}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0 border border-primary/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-slate-400">SKU: {product.sku}</p>
              </div>
              
              <button
                onClick={() => openNumpad(product)}
                className={`w-20 h-11 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-colors ${
                  product.price && parseFloat(product.price) > 0
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
                data-testid={`input-price-${product.id}`}
              >
                {product.price && parseFloat(product.price) > 0 ? product.price : "0.00"}
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <Button
          data-testid="button-confirm-all"
          onClick={handleConfirmAll}
          disabled={filledCount === 0}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold disabled:opacity-50"
        >
          {filledCount === 0 
            ? "Ingresa al menos un precio"
            : `Confirmar ${filledCount} precios`
          }
        </Button>
      </div>

      {activeProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end"
          onClick={() => setActiveProduct(null)}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="w-full bg-white rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <p className="text-sm text-slate-500 mb-1">Precio</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-primary">$</span>
                <span className="text-5xl font-bold text-primary">
                  {tempPrice || "0"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-1">{activeProduct.name}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((key) => (
                <button
                  key={key}
                  onClick={() => handleNumpadPress(key)}
                  className={`h-16 rounded-2xl text-2xl font-bold transition-colors ${
                    key === "⌫"
                      ? "bg-slate-100 text-slate-600 active:bg-slate-200"
                      : "bg-slate-100 text-primary active:bg-slate-200"
                  }`}
                  data-testid={`numpad-${key}`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleNumpadPress("C")}
                className="h-14 rounded-2xl bg-red-100 text-red-500 font-bold text-lg"
                data-testid="numpad-clear"
              >
                C
              </button>
              <Button
                onClick={confirmPrice}
                className="h-14 rounded-2xl bg-primary font-bold text-lg"
                data-testid="numpad-confirm"
              >
                Listo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
