import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Placeholder product data
const PLACEHOLDER_PRODUCT = {
  id: "1",
  name: "GeekVape Aegis Legend 3",
  brand: "GEEKVAPE",
  price: 89990,
  stock: 15,
  shortDescription: "El mod más resistente del mercado con certificación IP68, pantalla TFT de 1.08 pulgadas y potencia de hasta 200W.",
  description: `El GeekVape Aegis Legend 3 representa la evolución definitiva de la línea Aegis. 
  
Con certificación IP68, este mod es completamente resistente al agua, polvo y golpes, haciéndolo perfecto para cualquier situación. Su nuevo chipset AS-200 ofrece una respuesta de disparo ultrarrápida de 0.03 segundos.

Características destacadas:
- Potencia máxima de 200W
- Pantalla TFT de 1.08 pulgadas a todo color
- Batería dual 18650 (no incluidas)
- Certificación IP68 (agua, polvo y golpes)
- Modo bypass, VW, TC y curva personalizada
- Puerto de carga USB-C de carga rápida`,
  specs: [
    { label: "Potencia", value: "5-200W" },
    { label: "Resistencia", value: "0.05-3.0Ω" },
    { label: "Pantalla", value: "1.08\" TFT" },
    { label: "Batería", value: "Dual 18650" },
    { label: "Certificación", value: "IP68" },
    { label: "Conexión", value: "510" },
  ],
  images: [
    "https://images.unsplash.com/photo-1560924739-3b4e1f8b8b8b?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop&auto=format",
  ],
  reviews: [
    { id: 1, author: "Carlos M.", rating: 5, date: "2026-03-15", comment: "Excelente calidad, muy resistente. Lo mejor que he comprado." },
    { id: 2, author: "María G.", rating: 4, date: "2026-03-10", comment: "Muy buen producto, aunque la batería podría durar un poco más." },
    { id: 3, author: "Juan P.", rating: 5, date: "2026-02-28", comment: "Increíble diseño y rendimiento. Totalmente recomendado." },
  ],
};

type Tab = "descripcion" | "especificaciones" | "resenas";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("descripcion");
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const product = PLACEHOLDER_PRODUCT;

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
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

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
            <Link to="/catalogo?categoria=equipos" className="text-[#444444] hover:text-white transition-colors">
              Equipos
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images.map((image, index) => (
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
            </div>

            {/* Right Column - Product Info (40%) */}
            <div 
              className={`lg:col-span-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              {/* Brand */}
              <span className="text-xs font-medium tracking-[0.15em] text-[#444444] uppercase">
                {product.brand}
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
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-[0.1em] uppercase bg-[rgba(0,255,0,0.1)] text-[#00ff88] border border-[rgba(0,255,0,0.3)] rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full mr-2"></span>
                  En Stock
                </span>
              </div>

              {/* Short Description */}
              <p className="mt-6 text-sm text-[#444444] leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Quantity Selector */}
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

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <button className="w-full py-4 bg-[#00D4FF] hover:bg-[rgba(0,212,255,0.9)] text-black text-xs font-semibold tracking-[0.1em] uppercase rounded-md transition-colors">
                  Agregar al Carrito
                </button>
                <button className="w-full py-4 bg-transparent border border-white hover:bg-[rgba(255,255,255,0.05)] text-white text-xs font-semibold tracking-[0.1em] uppercase rounded-md transition-colors">
                  Agregar a Favoritos
                </button>
              </div>

              {/* Divider */}
              <div className="mt-8 border-t border-[#1a1a1a]"></div>

              {/* Specs Table */}
              <div className="mt-8">
                <h3 className="text-xs font-medium tracking-[0.15em] text-[#444444] uppercase mb-4">
                  Especificaciones
                </h3>
                <dl className="space-y-3">
                  {product.specs.slice(0, 4).map((spec) => (
                    <div key={spec.label} className="flex justify-between">
                      <dt className="text-sm text-[#444444]">{spec.label}</dt>
                      <dd className="text-sm text-white font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
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
                Descripcion
              </TabButton>
              <TabButton
                active={activeTab === "especificaciones"}
                onClick={() => setActiveTab("especificaciones")}
              >
                Especificaciones
              </TabButton>
              <TabButton
                active={activeTab === "resenas"}
                onClick={() => setActiveTab("resenas")}
              >
                Resenas
              </TabButton>
            </div>

            {/* Tab Content */}
            <div className="py-12 animate-on-scroll">
              {activeTab === "descripcion" && (
                <div className="max-w-3xl">
                  <p className="text-sm text-[#444444] leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "especificaciones" && (
                <div className="max-w-xl">
                  <dl className="space-y-4">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between py-3 border-b border-[#1a1a1a]"
                      >
                        <dt className="text-sm text-[#444444]">{spec.label}</dt>
                        <dd className="text-sm text-white font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {activeTab === "resenas" && (
                <div className="max-w-2xl space-y-8">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="pb-8 border-b border-[#1a1a1a] last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {review.author}
                          </span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                filled={i < review.rating}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-[#444444]">{review.date}</span>
                      </div>
                      <p className="text-sm text-[#444444] leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#00D4FF" : "none"}
      stroke="#00D4FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
