import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const capturedImages = [
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
];

export default function CameraPage() {
  const [, navigate] = useLocation();
  const [captures, setCaptures] = useState(capturedImages);

  const handleCapture = () => {
    const newImages = [
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop",
      ...captures,
    ];
    setCaptures(newImages.slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=1200&fit=crop')`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-6">
          <button
            data-testid="button-back"
            onClick={() => navigate("/")}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <Button
            data-testid="button-done"
            onClick={() => navigate("/assign-product")}
            className="px-6 h-11 rounded-full bg-primary hover:bg-primary/90 font-semibold"
          >
            Hecho
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6">
          <div className="flex items-center justify-center gap-8 mb-8">
            <button
              data-testid="button-settings"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button
              data-testid="button-capture"
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
            >
              <div className="w-16 h-16 rounded-full border-4 border-slate-300" />
            </button>
            
            <button
              data-testid="button-flash"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl p-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-700 font-medium">
            Captura todos los precios de la categoría.
          </p>
          <span className="text-primary font-semibold">{captures.length} fotos</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2">
          {captures.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex-shrink-0"
            >
              <img
                src={img}
                alt={`Captura ${index + 1}`}
                data-testid={`img-capture-${index}`}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <button
                data-testid={`button-remove-capture-${index}`}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
