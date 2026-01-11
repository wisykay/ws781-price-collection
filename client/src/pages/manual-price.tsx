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
  { id: "1", name: "Super Can Adulto Carne", sku: "SUP-CAR-2K", image: "/product_photos/super_can_adulto_carne.png", price: "" },
  { id: "2", name: "Super Can Adulto Pollo", sku: "SUP-POL-2K", image: "/product_photos/super_can_adulto_pollo.png", price: "" },
  { id: "3", name: "Super Can Cachorro", sku: "SUP-CAC-1K", image: "/product_photos/super_can_cachorro.png", price: "" },
  { id: "4", name: "RINGO Adulto Original", sku: "RIN-ADU-2K", image: "/product_photos/ringo_adulto.png", price: "" },
  { id: "5", name: "RINGO Cachorro", sku: "RIN-CAC-1K", image: "/product_photos/ringo_cachorro.png", price: "" },
  { id: "6", name: "Dogourmet Carne y Cereales", sku: "DOG-CAR-2K", image: "/product_photos/dogourmet_carne.png", price: "" },
  { id: "7", name: "Dogourmet Pollo y Cereales", sku: "DOG-POL-2K", image: "/product_photos/dogourmet_pollo.png", price: "" },
  { id: "8", name: "Dogourmet Cachorro", sku: "DOG-CAC-1K", image: "/product_photos/dogourmet_cachorro.png", price: "" },
  { id: "9", name: "Filpo Adulto", sku: "FIL-ADU-2K", image: "/product_photos/filpo_adulto.png", price: "" },
  { id: "10", name: "Filpo Cachorro", sku: "FIL-CAC-1K", image: "/product_photos/filpo_cachorro.png", price: "" },
  { id: "11", name: "Dog Chow Adulto Carne", sku: "DCH-CAR-2K", image: "/product_photos/dog_chow_adulto_carne.png", price: "" },
  { id: "12", name: "Dog Chow Adulto Pollo", sku: "DCH-POL-2K", image: "/product_photos/dog_chow_adulto_pollo.png", price: "" },
  { id: "13", name: "Dog Chow Cachorro", sku: "DCH-CAC-1K", image: "/product_photos/dog_chow_cachorro.png", price: "" },
  { id: "14", name: "Pedigree Adulto Carne", sku: "PED-CAR-2K", image: "/product_photos/pedigree_adulto_carne.png", price: "" },
  { id: "15", name: "Pedigree Adulto Pollo", sku: "PED-POL-2K", image: "/product_photos/pedigree_adulto_pollo.png", price: "" },
  { id: "16", name: "Pedigree Cachorro", sku: "PED-CAC-1K", image: "/product_photos/pedigree_cachorro.png", price: "" },
  { id: "17", name: "Chunky Adulto", sku: "CHU-ADU-2K", image: "/product_photos/chunky_adulto.png", price: "" },
  { id: "18", name: "Chunky Cachorro", sku: "CHU-CAC-1K", image: "/product_photos/chunky_cachorro.png", price: "" },
  { id: "19", name: "Nutrion Adulto", sku: "NUT-ADU-2K", image: "/product_photos/nutrion_adulto.png", price: "" },
  { id: "20", name: "Nutrion Cachorro", sku: "NUT-CAC-1K", image: "/product_photos/nutrion_cachorro.png", price: "" },
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
