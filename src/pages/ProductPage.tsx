import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../features/cart/CartContext";
import { formatCLP } from "../utils/format";

type Tab = "descripcion" | "especificaciones" | "resenas";

const FALLBACK_IMAGE =
  "https://placehold.co/600x600/0d0d0d/444444?text=Sin+imagen";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, loading, error } = useProduct(slug);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("descripcion");
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.2 },
    );

    const elements = contentRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[#444444] tracking-[0.1em] uppercase">
              Cargando producto...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#080808]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-sm">
            <p className="text-4xl font-bold text-white mb-4">404</p>
            <p className="text-sm text-[#444444] mb-8">
              {error ?? "Este producto no existe o fue eliminado."}
            </p>
            <Link
              to="/catalogo"
              className="inline-block px-6 py-3 bg-[#00D4FF] text-black text-xs font-semibold tracking-[0.1em] uppercase rounded-md"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [FALLBACK_IMAGE];
  const categoryName = product.category?.name ?? "Catálogo";
  const categorySlug = product.category?.slug ?? "";
  const categoryLink = categorySlug
    ? `/catalogo?categoria=${categorySlug}`
    : "/catalogo";

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="pt-16" ref={contentRef}>
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0ms" }}
        >
          <nav className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase overflow-x-auto">
            <Link
              to="/"
              className="text-[#444444] hover:text-white transition-colors whitespace-nowrap"
            >
              Inicio
            </Link>
            <ChevronRightIcon />
            <Link
              to={categoryLink}
              className="text-[#444444] hover:text-white transition-colors whitespace-nowrap"
            >
              {categoryName}
            </Link>
            <ChevronRightIcon />
            <span className="text-[#00D4FF] truncate max-w-[120px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div
              className={`lg:col-span-3 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              <div className="bg-[#0d0d0d] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4 mt-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border transition-all duration-200 ${
                        selectedImage === index
                          ? "border-[#00D4FF]"
                          : "border-[#1a1a1a] hover:border-[rgba(0,212,255,0.5)]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} vista ${index + 1}`}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`lg:col-span-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              <span className="text-xs font-medium tracking-[0.15em] text-[#444444] uppercase">
                {categoryName}
              </span>

              <h1 className="mt-2 text-xl sm:text-2xl lg:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {product.name}
              </h1>

              <p className="mt-4 text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#00D4FF]">
                {formatCLP(product.price)}
              </p>

              <div className="mt-4">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-[0.1em] uppercase bg-[rgba(0,255,0,0.1)] text-[#00ff88] border border-[rgba(0,255,0,0.3)] rounded-full">
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full mr-2"></span>
                    En Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-[0.1em] uppercase bg-[rgba(255,0,0,0.1)] text-red-400 border border-[rgba(255,0,0,0.3)] rounded-full">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                    Sin Stock
                  </span>
                )}
              </div>

              {product.description && (
                <p className="mt-6 text-sm text-[#444444] leading-relaxed">
                  {product.description}
                </p>
              )}

              {product.stock > 0 && (
                <div className="mt-8">
                  <label className="text-xs font-medium tracking-[0.15em] text-[#444444] uppercase">
                    Cantidad
                  </label>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#1a1a1a] rounded-l-md text-[#444444] hover:text-white hover:border-[rgba(0,212,255,0.5)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MinusIcon />
                    </button>
                    <div className="w-12 sm:w-16 h-10 sm:h-12 flex items-center justify-center border-t border-b border-[#1a1a1a] text-white font-medium text-sm sm:text-base">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#1a1a1a] rounded-r-md text-[#444444] hover:text-white hover:border-[rgba(0,212,255,0.5)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <button
                  disabled={product.stock === 0}
                  onClick={() => {
                    const added = addToCart(product, quantity);
                    if (added) {
                      setIsAdded(true);
                      setTimeout(() => setIsAdded(false), 2000);
                    }
                  }}
                  className={`w-full py-4 text-black text-xs font-semibold tracking-[0.1em] uppercase rounded-md transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    isAdded
                      ? "bg-[#00ff88] hover:bg-[rgba(0,255,136,0.9)]"
                      : "bg-[#00D4FF] hover:bg-[rgba(0,212,255,0.9)]"
                  }`}
                >
                  {isAdded ? "✓ Agregado" : "Agregar al Carrito"}
                </button>
                <button className="w-full py-4 bg-transparent border border-white hover:bg-[rgba(255,255,255,0.05)] text-white text-xs font-semibold tracking-[0.1em] uppercase rounded-md transition-colors">
                  Agregar a Favoritos
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 sm:gap-8 border-b border-[#1a1a1a] overflow-x-auto">
              <TabButton
                active={activeTab === "descripcion"}
                onClick={() => setActiveTab("descripcion")}
              >
                Descripción
              </TabButton>
              <TabButton
                active={activeTab === "resenas"}
                onClick={() => setActiveTab("resenas")}
              >
                Reseñas
              </TabButton>
            </div>

            <div className="py-12 animate-on-scroll">
              {activeTab === "descripcion" && (
                <div className="max-w-3xl">
                  {product.description ? (
                    <p className="text-sm text-[#444444] leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  ) : (
                    <p className="text-sm text-[#444444]">
                      Este producto aún no tiene descripción detallada.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "resenas" && (
                <div className="max-w-2xl">
                  <p className="text-sm text-[#444444]">
                    Aún no hay reseñas para este producto. ¡Sé el primero en
                    opinar!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-2 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase transition-colors border-b-2 -mb-px whitespace-nowrap ${
        active
          ? "text-[#00D4FF] border-[#00D4FF]"
          : "text-[#444444] border-transparent hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#444444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
