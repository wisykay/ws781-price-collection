import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Check, X, Plus, Pencil, Settings2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  variant: string;
  usualPrice: number;
  image: string;
}

interface DetectedPrice {
  id: string;
  image: string;
  price: number;
  assignedProducts: Product[];
}

const allProducts: Product[] = [
  { id: "1", name: "Super Can Carne Hueso 4Kg", variant: "4Kg", usualPrice: 12.50, image: "/product_photos/Super%20Can%20Carne%20Hueso%204Kg.jpg" },
  { id: "2", name: "Super Can 2Kg", variant: "2Kg", usualPrice: 6.80, image: "/product_photos/Super%20Can%202Kg.jpg" },
  { id: "3", name: "Super Can 18Kg", variant: "18Kg", usualPrice: 45.00, image: "/product_photos/Super%20Can%2018Kg.jpg" },
  { id: "4", name: "RINGO 30Kg", variant: "30Kg", usualPrice: 65.00, image: "/product_photos/RINGO%2030Kg.jpg" },
  { id: "5", name: "RINGO 1Kg", variant: "1Kg", usualPrice: 3.50, image: "/product_photos/RINGO%201Kg.jpg" },
  { id: "6", name: "RINGO Adulto 1Kg", variant: "1Kg", usualPrice: 3.80, image: "/product_photos/RINGO%20Adulto%201Kg.jpg" },
  { id: "7", name: "RINGO 2Kg", variant: "2Kg", usualPrice: 6.50, image: "/product_photos/RINGO%202Kg.jpg" },
  { id: "8", name: "Filpo 30 Kilos", variant: "30Kg", usualPrice: 58.00, image: "/product_photos/Filpo%2030%20%20Kilos.jpg" },
  { id: "9", name: "Dogourmet Carne Parrilla 4Kg", variant: "4Kg", usualPrice: 14.50, image: "/product_photos/Dogourmet%20carne%20parrilla%204Kg.jpg" },
  { id: "10", name: "Dogourmet 1Kg", variant: "1Kg", usualPrice: 4.20, image: "/product_photos/Dogourmet%201Kg.jpg" },
  { id: "11", name: "Dogourmet 10Kg", variant: "10Kg", usualPrice: 32.00, image: "/product_photos/Dogourmet%2010Kg.jpg" },
  { id: "12", name: "Dogourmet 18Kg", variant: "18Kg", usualPrice: 52.00, image: "/product_photos/Dogourmet%2018Kg.jpg" },
  { id: "13", name: "Perrarina 4Kg PDV", variant: "4Kg", usualPrice: 11.00, image: "/product_photos/Perrarina%204Kg%20PDV.jpg" },
  { id: "14", name: "K NINA Carne 4kg", variant: "4Kg", usualPrice: 13.50, image: "/product_photos/K%20NINA%20Carne%204kg.jpg" },
  { id: "15", name: "Protican 4kg PDV", variant: "4Kg", usualPrice: 10.80, image: "/product_photos/Protican%204kg%20PDV.jpg" },
  { id: "16", name: "Dog Chow 4kg", variant: "4Kg", usualPrice: 15.00, image: "/product_photos/Dog%20Chow%204kg.jpg" },
  { id: "17", name: "Dog Chow 20kg", variant: "20Kg", usualPrice: 68.00, image: "/product_photos/Dog%20Chow%2020kg.jpg" },
  { id: "18", name: "Pedigree 3Kg", variant: "3Kg", usualPrice: 12.80, image: "/product_photos/Pedigree%203Kg.jpg" },
  { id: "19", name: "Champs Carne 20Kg", variant: "20Kg", usualPrice: 48.00, image: "/product_photos/Champs%20Carne%2020Kg.jpg" },
  { id: "20", name: "Guardián 25 Kg", variant: "25Kg", usualPrice: 55.00, image: "/product_photos/Guardi%C3%A1n%2025%20Kg.jpg" },
];

const initialPrices: DetectedPrice[] = [
  { id: "1", image: "/image_1767940330318.png", price: 16.20, assignedProducts: [] },
  { id: "2", image: "/image_1767940340771.png", price: 4.50, assignedProducts: [] },
  { id: "3", image: "/image_1767940349913.png", price: 2.85, assignedProducts: [] },
  { id: "4", image: "/image_1767940357463.png", price: 2.20, assignedProducts: [] },
  { id: "5", image: "/image_1767940363396.png", price: 1.40, assignedProducts: [] },
  { id: "6", image: "/image_1767940370290.png", price: 0.80, assignedProducts: [] },
  { id: "7", image: "/image_1767940378950.png", price: 1.60, assignedProducts: [] },
  { id: "8", image: "/image_1767940385862.png", price: 1.50, assignedProducts: [] },
  { id: "9", image: "/image_1767940392730.png", price: 0.70, assignedProducts: [] },
  { id: "10", image: "/image_1767940406076.png", price: 224.84, assignedProducts: [] },
  { id: "11", image: "/image_1767940418028.png", price: 0.93, assignedProducts: [] },
];

export default function AssignProductPage() {
  const [, navigate] = useLocation();
  const [prices, setPrices] = useState<DetectedPrice[]>(initialPrices);
  const [modalPriceId, setModalPriceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [previewImage, setPreviewImage] = useState<DetectedPrice | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD - Dólar");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  
  const currencies = ["USD - Dólar", "EUR - Euro", "VES - Bolívar"];
  
  const totalProductsAssigned = prices.reduce((sum, p) => sum + p.assignedProducts.length, 0);
  const totalProducts = allProducts.length;
  const progress = (totalProductsAssigned / totalProducts) * 100;
  const unassignedCount = totalProducts - totalProductsAssigned;

  const getAssignedProductIds = () => {
    const ids = new Set<string>();
    prices.forEach(p => p.assignedProducts.forEach(prod => ids.add(prod.id)));
    return ids;
  };

  const assignedProductIds = getAssignedProductIds();
  const modalPrice = prices.find(p => p.id === modalPriceId);

  const getAvailableProducts = () => {
    return allProducts.filter(p => 
      !assignedProductIds.has(p.id) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleConfirmAll = () => {
    if (totalProductsAssigned === totalProducts) {
      navigate("/");
    }
  };

  const addProductToPrice = (priceId: string, product: Product) => {
    setPrices(prices.map(p => 
      p.id === priceId 
        ? { ...p, assignedProducts: [...p.assignedProducts, product] } 
        : p
    ));
  };

  const removeProductFromPrice = (priceId: string, productId: string) => {
    setPrices(prices.map(p => 
      p.id === priceId 
        ? { ...p, assignedProducts: p.assignedProducts.filter(prod => prod.id !== productId) } 
        : p
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

  const isProductAssignedToThisPrice = (productId: string, priceId: string) => {
    const price = prices.find(p => p.id === priceId);
    return price?.assignedProducts.some(p => p.id === productId) ?? false;
  };

  return (
    <>
    <AnimatePresence>
      {previewImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={() => setPreviewImage(null)}
        >
          <div className="flex items-center justify-between p-4">
            <button
              data-testid="button-close-preview"
              onClick={() => setPreviewImage(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-white font-bold text-2xl">
              ${previewImage.price.toFixed(2)}
            </span>
            <div className="w-10" />
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={previewImage.image}
              alt="Foto del precio"
              className="max-w-full max-h-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {modalPrice && (
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Productos para ${modalPrice.price.toFixed(2)}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {modalPrice.assignedProducts.length} asignados
                  </p>
                </div>
                <button
                  data-testid="button-close-modal"
                  onClick={() => {
                    setModalPriceId(null);
                    setSearchQuery("");
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-modal"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {modalPrice.assignedProducts.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Asignados a este precio
                  </p>
                  <div className="space-y-2">
                    {modalPrice.assignedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 bg-slate-500 rounded-xl border border-slate-600"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{product.name}</p>
                          <p className="text-xs text-slate-300">{product.variant}</p>
                        </div>
                        <button
                          data-testid={`button-remove-modal-${product.id}`}
                          onClick={() => removeProductFromPrice(modalPrice.id, product.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-400 text-white hover:bg-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getAvailableProducts().length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Disponibles ({getAvailableProducts().length})
                  </p>
                  <div className="space-y-2">
                    {getAvailableProducts().map((product) => (
                      <button
                        key={product.id}
                        data-testid={`product-modal-${product.id}`}
                        onClick={() => addProductToPrice(modalPrice.id, product)}
                        className="w-full flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.variant} · Usual ${product.usualPrice.toFixed(2)}</p>
                        </div>
                        <Plus className="w-5 h-5 text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {getAvailableProducts().length === 0 && modalPrice.assignedProducts.length === 0 && (
                <p className="text-center text-slate-400 py-8">
                  Todos los productos ya están asignados a otros precios
                </p>
              )}
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
    
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            data-testid="button-back"
            onClick={() => navigate("/camera")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-primary">WISY</h1>
            <p className="text-xs text-slate-500">Mascotas</p>
          </div>
          <div className="w-10" />
        </div>
        
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <span className="text-sm">💵</span>
              <span className="text-xs font-semibold text-primary">{selectedCurrency.split(' ')[0]}</span>
              <ChevronDown className={`w-3 h-3 text-primary transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            <span className="text-xs text-slate-500">{totalProductsAssigned}/{totalProducts} productos · {Math.round(progress)}%</span>
          </div>
          
          <AnimatePresence>
            {currencyOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
              >
                {currencies.map((currency) => (
                  <button
                    key={currency}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setCurrencyOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${
                      currency === selectedCurrency ? "bg-primary/5 text-primary font-medium" : "text-slate-700"
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>

              </header>

      <main className="flex-1 px-4 py-4 pb-28">
          <div className="space-y-4">
            {prices.map((priceItem, index) => {
              const hasProducts = priceItem.assignedProducts.length > 0;
              const priceProgress = hasProducts ? (priceItem.assignedProducts.length / 5) * 100 : 0;
              
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
                  {/* Card Top - Price Display */}
                  <div className={`flex items-center gap-4 p-4 ${hasProducts ? '' : 'border-b border-slate-100'}`}>
                    {/* Large Price */}
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white border border-slate-200">
                      <span className="text-2xl font-bold text-primary">
                        ${priceItem.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <p className="text-sm text-slate-600">
                        {hasProducts ? `${priceItem.assignedProducts.length} productos asignados` : "Tocar a asignar"}
                      </p>
                    </div>
                    
                    {/* Price Tag Thumbnail */}
                    <img
                      src={priceItem.image}
                      alt="Price tag"
                      className="w-12 h-12 rounded-lg object-cover opacity-80"
                    />
                  </div>
                  
                  {/* Assigned Products Strip */}
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
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 p-3 bg-slate-100/50">
                    <button
                      onClick={() => setPreviewImage(priceItem)}
                      className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-colors ${hasProducts 
                        ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300' 
                        : 'border border-slate-300 text-slate-600 hover:bg-white'}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Editar Precio</span>
                    </button>
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
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <Button
          data-testid="button-confirm-all"
          onClick={handleConfirmAll}
          disabled={unassignedCount > 0}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold disabled:opacity-50"
        >
          {unassignedCount > 0 
            ? `${unassignedCount} productos sin asignar`
            : "Confirmar asignaciones"
          }
        </Button>
      </div>
    </div>
    </>
  );
}
