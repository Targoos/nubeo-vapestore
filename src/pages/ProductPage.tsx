import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useProduct } from "../hooks/useProduct";

type Tab = "descripcion" | "especificaciones" | "resenas";

const FALLBACK_IMAGE = "https://placehold.co/600x600/0d0d0d/444444?text=Sin+imagen";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, loading, error } = useProduct(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("descripcion");
  const [isVisible, setIsVisible] = useState(false);
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
      { threshold: 0.2 }
    );

    const elements = contentRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // --- Estados de carga y error ---

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

  // A partir de aquí, product está garantizado como no-null

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
        {/* Breadcrumb */}
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 py-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0ms" }}
        >
          <nav className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase">
            <Link to="/" className="text-[#444444] hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRightIcon />
            <Link to={categoryLink} className="text-[#444444] hover:text-white transition-colors">
              {categoryName}
            </Link>
            <ChevronRightIcon />
            <span className="text-[#00D4FF]">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column - Image Gallery (60%) */}
            <div
              className={`lg:col-span-3 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              {/* Main Image */}
              <div className="bg-[#0d0d0d] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Thumbnails — solo si hay más de una imagen */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
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

            {/* Right Column - Product Info (40%) */}
            <div
              className={`lg:col-span-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              {/* Categoría como etiqueta de marca */}
              <span className="text-xs font-medium tracking-[0.15em] text-[#444444] uppercase">
                {categoryName}
              </span>

              {/* Product Name */}
              <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-white leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <p className="mt-4 text-[2rem] font-bold text-[#00D4FF]">
                {formatPrice(product.price)}
              </p>

              {/* Stock Badge */}
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

              {/* Descripción */}
              {product.description && (
                <p className="mt-6 text-sm text-[#444444] leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Quantity Selector — solo si hay stock */}
              {product.stock > 0 && (
                <div className="mt-8">
                  <label className="text-xs font-medium tracking-[0.15em] text-[#444444] uppercase">
                    Cantidad
                  </label>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-12 h-12 flex items-center justify-center border border-[#1a1a1a] rounded-l-md text-[#444444] hover:text-white hover:border-[rgba(0,212,255,0.5)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MinusIcon />
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center border-t border-b border-[#1a1a1a] text-white font-medium">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="w-12 h-12 flex items-center justify-center border border-[#1a1a1a] rounded-r-md text-[#444444] hover:text-white hover:border-[rgba(0,212,255,0.5)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <button
                  disabled={product.stock === 0}
                  className="w-full py-4 bg-[#00D4FF] hover:bg-[rgba(0,212,255,0.9)] text-black text-xs font-semibold tracking-[0.1em] uppercase rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Agregar al Carrito
                </button>
                <button className="w-full py-4 bg-transparent border border-white hover:bg-[rgba(255,255,255,0.05)] text-white text-xs font-semibold tracking-[0.1em] uppercase rounded-md transition-colors">
                  Agregar a Favoritos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Tab Headers */}
            <div className="flex gap-8 border-b border-[#1a1a1a]">
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

            {/* Tab Content */}
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
                    Aún no hay reseñas para este producto. ¡Sé el primero en opinar!
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

// Tab Button Component
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
      className={`py-4 text-xs font-medium tracking-[0.15em] uppercase transition-colors border-b-2 -mb-px ${
        active
          ? "text-[#00D4FF] border-[#00D4FF]"
          : "text-[#444444] border-transparent hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

// Icons
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
