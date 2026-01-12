import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { X, RotateCcw, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const priceTagImages = [
  "/price_tag_1.jpg",
  "/price_tag_2.jpg",
  "/price_tag_3.jpg",
  "/price_tag_4.jpg",
  "/price_tag_5.jpg",
];

export default function CameraPage() {
  const [, navigate] = useLocation();
  const [captures, setCaptures] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleCapture = () => {
    const newCapture = priceTagImages[captures.length % priceTagImages.length];
    setCaptures([...captures, newCapture]);
  };

  const handleRemove = (index: number) => {
    setCaptures(captures.filter((_, i) => i !== index));
  };

  const handleDone = () => {
    if (captures.length > 0) {
      setShowPreview(true);
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Mascotas</h1>
            <p className="text-sm text-slate-500">@Default Store</p>
          </div>
          <button
            data-testid="button-close"
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 p-4 pb-2 overflow-hidden">
          <div className="relative bg-slate-100 rounded-2xl overflow-hidden h-full">
            <img
              src={captures[currentImage] || captures[0]}
              alt="Price tag"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
              {currentImage + 1} / {captures.length}
            </div>
          </div>
        </main>

        <div className="px-4 pt-2 pb-4">
          <div className="flex gap-2 overflow-x-auto mb-4">
            {captures.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex-shrink-0"
              >
                <button
                  onClick={() => setCurrentImage(index)}
                  className={`block rounded-xl overflow-hidden border-2 transition-colors ${
                    currentImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Captura ${index + 1}`}
                    data-testid={`img-capture-${index}`}
                    className="w-14 h-14 object-cover"
                  />
                </button>
                <button
                  data-testid={`button-remove-capture-${index}`}
                  onClick={() => handleRemove(index)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              data-testid="button-retake"
              onClick={() => setShowPreview(false)}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-primary"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              data-testid="button-add-more"
              onClick={() => setShowPreview(false)}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-primary"
            >
              <Camera className="w-5 h-5" />
            </button>
            <Button
              data-testid="button-continue"
              onClick={() => navigate("/assign-product")}
              className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 font-semibold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=1200&fit=crop')`,
          }}
        />

        {captures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-4 bottom-4"
          >
            <button
              onClick={() => setShowPreview(true)}
              className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/50"
            >
              <img
                src={captures[captures.length - 1]}
                alt="Last capture"
                className="w-full h-full object-cover"
              />
            </button>
          </motion.div>
        )}
      </div>

      <div className="bg-black px-4 py-6 flex flex-col items-center">
        <button
          data-testid="button-capture"
          onClick={handleCapture}
          className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95 mb-3"
        >
          <div className="w-14 h-14 rounded-full bg-white" />
        </button>
        
        {captures.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-medium mb-4"
          >
            {captures.length} Photo{captures.length > 1 ? "s" : ""}
          </motion.p>
        )}

        <Button
          data-testid="button-done"
          onClick={handleDone}
          disabled={captures.length === 0}
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-semibold text-lg disabled:opacity-50"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
