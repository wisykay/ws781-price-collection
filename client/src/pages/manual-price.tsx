import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, X, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  size: string;
}

const allProducts: Product[] = [
  { id: "1", name: "Super Can Adulto Carne", brand: "Super Can", size: "2kg", image: "/product_photos/super_can_adulto_carne.png" },
  { id: "2", name: "Super Can Adulto Pollo", brand: "Super Can", size: "2kg", image: "/product_photos/super_can_adulto_pollo.png" },
  { id: "3", name: "Super Can Cachorro", brand: "Super Can", size: "1kg", image: "/product_photos/super_can_cachorro.png" },
  { id: "4", name: "RINGO Adulto Original", brand: "RINGO", size: "2kg", image: "/product_photos/ringo_adulto.png" },
  { id: "5", name: "RINGO Cachorro", brand: "RINGO", size: "1kg", image: "/product_photos/ringo_cachorro.png" },
  { id: "6", name: "Dogourmet Carne y Cereales", brand: "Dogourmet", size: "2kg", image: "/product_photos/dogourmet_carne.png" },
  { id: "7", name: "Dogourmet Pollo y Cereales", brand: "Dogourmet", size: "2kg", image: "/product_photos/dogourmet_pollo.png" },
  { id: "8", name: "Dogourmet Cachorro", brand: "Dogourmet", size: "1.5kg", image: "/product_photos/dogourmet_cachorro.png" },
  { id: "9", name: "Filpo Adulto", brand: "Filpo", size: "2kg", image: "/product_photos/filpo_adulto.png" },
  { id: "10", name: "Filpo Cachorro", brand: "Filpo", size: "1kg", image: "/product_photos/filpo_cachorro.png" },
  { id: "11", name: "Dog Chow Adulto Carne", brand: "Dog Chow", size: "2kg", image: "/product_photos/dog_chow_adulto_carne.png" },
  { id: "12", name: "Dog Chow Adulto Pollo", brand: "Dog Chow", size: "2kg", image: "/product_photos/dog_chow_adulto_pollo.png" },
  { id: "13", name: "Dog Chow Cachorro", brand: "Dog Chow", size: "1.5kg", image: "/product_photos/dog_chow_cachorro.png" },
  { id: "14", name: "Pedigree Adulto Carne", brand: "Pedigree", size: "2kg", image: "/product_photos/pedigree_adulto_carne.png" },
  { id: "15", name: "Pedigree Adulto Pollo", brand: "Pedigree", size: "2kg", image: "/product_photos/pedigree_adulto_pollo.png" },
  { id: "16", name: "Pedigree Cachorro", brand: "Pedigree", size: "1.5kg", image: "/product_photos/pedigree_cachorro.png" },
  { id: "17", name: "Chunky Adulto", brand: "Chunky", size: "2kg", image: "/product_photos/chunky_adulto.png" },
  { id: "18", name: "Chunky Cachorro", brand: "Chunky", size: "1kg", image: "/product_photos/chunky_cachorro.png" },
  { id: "19", name: "Nutrion Adulto", brand: "Nutrion", size: "2kg", image: "/product_photos/nutrion_adulto.png" },
  { id: "20", name: "Nutrion Cachorro", brand: "Nutrion", size: "1kg", image: "/product_photos/nutrion_cachorro.png" },
];

interface ManualPrice {
  id: string;
  price: number;
  assignedProducts: Product[];
}

export default function ManualPricePage() {
  const [, navigate] = useLocation();
  const [prices, setPrices] = useState<ManualPrice[]>([]);
  const [modalPriceId, setModalPriceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPrice, setShowAddPrice] = useState(false);
  const [newPriceValue, setNewPriceValue] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
    
  const totalProductsAssigned = prices.reduce((sum, p) => sum + p.assignedProducts.length, 0);
  const totalProducts = allProducts.length;
  const progress = (totalProductsAssigned / totalProducts) * 100;
  const unassignedCount = totalProducts - totalProductsAssigned;

  const handleAddPrice = () => {
    const value = parseFloat(newPriceValue);
    if (!isNaN(value) && value > 0) {
      const newPrice: ManualPrice = {
        id: `manual-${Date.now()}`,
        price: value,
        assignedProducts: [],
      };
      setPrices([...prices, newPrice]);
      setNewPriceValue("");
      setShowAddPrice(false);
    }
  };

  const handleToggleProduct = (priceId: string, product: Product) => {
    setPrices(prices.map(p => {
      if (p.id === priceId) {
        const exists = p.assignedProducts.find(ap => ap.id === product.id);
        if (exists) {
          return { ...p, assignedProducts: p.assignedProducts.filter(ap => ap.id !== product.id) };
        } else {
          return { ...p, assignedProducts: [...p.assignedProducts, product] };
        }
      }
      return p;
    }));
  };

  const handleSaveEdit = (priceId: string) => {
    const value = parseFloat(editValue);
    if (!isNaN(value) && value > 0) {
      setPrices(prices.map(p => 
        p.id === priceId ? { ...p, price: value } : p
      ));
    }
    setEditingPriceId(null);
    setEditValue("");
  };

  const handleDeletePrice = (priceId: string) => {
    setPrices(prices.filter(p => p.id !== priceId));
  };

  const handleConfirmAll = () => {
    navigate("/");
  };

  const modalPrice = prices.find(p => p.id === modalPriceId);
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <AnimatePresence>
      {modalPriceId && modalPrice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end"
          onClick={() => {
            setModalPriceId(null);
            setSearchQuery("");
          }}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full bg-white rounded-t-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Asignar productos a ${modalPrice.price.toFixed(2)}
                </h3>
                <span className="text-sm text-primary font-medium">
                  {modalPrice.assignedProducts.length} seleccionados
                </span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100 border-none outline-none text-sm"
                  data-testid="input-search-products"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-3">
                {filteredProducts.map((product) => {
                  const isSelected = modalPrice.assignedProducts.some(p => p.id === product.id);
                  return (
                    <motion.button
                      key={product.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleProduct(modalPriceId, product)}
                      className={`relative p-2 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                      data-testid={`product-option-${product.id}`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-cover rounded-lg mb-2"
                      />
                      <p className="text-xs font-medium text-slate-700 line-clamp-2 text-center">
                        {product.name}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100">
              <Button
                data-testid="button-done-modal"
                onClick={() => {
                  setModalPriceId(null);
                  setSearchQuery("");
                }}
                className="w-full h-12 rounded-xl bg-primary font-semibold"
              >
                Listo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {showAddPrice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowAddPrice(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-white rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Agregar precio</h3>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newPriceValue}
                onChange={(e) => setNewPriceValue(e.target.value)}
                className="w-full h-14 pl-10 pr-4 rounded-xl bg-slate-100 border-2 border-slate-200 focus:border-primary outline-none text-2xl font-bold text-center"
                data-testid="input-new-price"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddPrice(false)}
                className="flex-1 h-12 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddPrice}
                className="flex-1 h-12 rounded-xl bg-primary"
                data-testid="button-confirm-add-price"
              >
                Agregar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
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
            <span className="text-xs text-slate-500">{totalProductsAssigned}/{totalProducts} productos · {Math.round(progress)}%</span>
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
        {prices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Sin precios agregados</h3>
            <p className="text-sm text-slate-500 mb-6">Agrega precios manualmente y asigna productos</p>
            <Button
              onClick={() => setShowAddPrice(true)}
              className="h-12 px-6 rounded-xl bg-primary"
              data-testid="button-add-first-price"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar primer precio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {prices.map((priceItem, index) => {
              const hasProducts = priceItem.assignedProducts.length > 0;
              
              return (
                <motion.div
                  key={priceItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`rounded-2xl overflow-hidden ${hasProducts 
                    ? 'bg-slate-100 border border-slate-300 card-shadow' 
                    : 'bg-white card-shadow border border-slate-100'}`}
                  data-testid={`price-card-${priceItem.id}`}
                >
                  <div className={`flex items-center gap-4 p-4 ${hasProducts ? '' : 'border-b border-slate-100'}`}>
                    {editingPriceId === priceItem.id ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-24 h-12 pl-8 pr-2 rounded-xl bg-white border-2 border-primary outline-none text-lg font-bold"
                            autoFocus
                          />
                        </div>
                        <button
                          onClick={() => handleSaveEdit(priceItem.id)}
                          className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPriceId(null);
                            setEditValue("");
                          }}
                          className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingPriceId(priceItem.id);
                            setEditValue(priceItem.price.toString());
                          }}
                          className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white border border-slate-200 hover:border-primary transition-colors"
                        >
                          <span className="text-2xl font-bold text-primary">
                            ${priceItem.price.toFixed(2)}
                          </span>
                        </button>
                        
                        <div className="flex-1">
                          <p className="text-sm text-slate-600">
                            {hasProducts ? `${priceItem.assignedProducts.length} productos asignados` : "Tocar para asignar"}
                          </p>
                          <p className="text-xs text-slate-400">Toca el precio para editar</p>
                        </div>
                        
                        <button
                          onClick={() => handleDeletePrice(priceItem.id)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {hasProducts && (
                    <div className="px-4 pb-3">
                      <div className="flex items-center gap-1.5">
                        {priceItem.assignedProducts.slice(0, 5).map((product) => (
                          <img
                            key={product.id}
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-sm object-cover border-2 border-slate-200"
                          />
                        ))}
                        {priceItem.assignedProducts.length > 5 && (
                          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium bg-slate-400 text-white">
                            +{priceItem.assignedProducts.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 p-3 bg-slate-100/50">
                    <button
                      onClick={() => setModalPriceId(priceItem.id)}
                      className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-colors ${hasProducts 
                        ? 'bg-slate-700 text-white hover:bg-slate-600' 
                        : 'bg-primary text-white hover:bg-primary/90'}`}
                    >
                      {hasProducts ? (
                        <>
                          <Settings2 className="w-3.5 h-3.5" />
                          <span>Modificar</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Asignar</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <div className="flex gap-3">
          {prices.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowAddPrice(true)}
              className="h-12 px-4 rounded-xl border-slate-200"
              data-testid="button-add-more-price"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
          <Button
            data-testid="button-confirm-all"
            onClick={handleConfirmAll}
            disabled={prices.length === 0 || unassignedCount === totalProducts}
            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold disabled:opacity-50"
          >
            {prices.length === 0 
              ? "Agrega un precio para continuar"
              : unassignedCount === totalProducts
                ? "Asigna productos para continuar"
                : "Confirmar precios"
            }
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
