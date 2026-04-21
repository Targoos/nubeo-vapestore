import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { getProductBySlug } from "../repositories/productsRepository";
import type { Product } from "../types";
import designTokens from "../lib/designTokens";

type TabType = "descripcion" | "especificaciones" | "resenas";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("descripcion");
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getProductBySlug(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar producto");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Fade-in animation on scroll
  useEffect(() => {
    const content = contentRef.current;
    if (!content || hasAnimated.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const elements = ["breadcrumb", "gallery", "info", "specs", "tabs"];
          elements.forEach((el, index) => {
            setTimeout(() => {
              setVisibleElements((prev) => [...prev, el]);
            }, index * designTokens.animations.stagger.base);
          });
        }
      },
      { threshold: designTokens.animations.observerThreshold.default }
    );

    observer.observe(content);
    return () => observer.disconnect();
  }, [loading]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product?.stock || 99)));
  };

  // Placeholder images if product has none
  const images = product?.images?.length
    ? product.images
    : [
        "https://placehold.co/600x600/0a0a0a/444444?text=Producto",
        "https://placehold.co/600x600/0a0a0a/444444?text=Vista+2",
        "https://placehold.co/600x600/0a0a0a/444444?text=Vista+3",
        "https://placehold.co/600x600/0a0a0a/444444?text=Vista+4",
      ];

  const isVisible = (key: string) => visibleElements.includes(key);

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: designTokens.colors.background.primary }}
      >
        <Navbar />
        <main
          className="pt-16 flex items-center justify-center min-h-screen"
          style={{ paddingTop: designTokens.spacing.navbar.height }}
        >
          <div className="text-center">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin mx-auto"
              style={{
                borderColor: designTokens.colors.border.default,
                borderTopColor: designTokens.colors.accent.primary,
              }}
            />
            <p
              className="mt-4 text-xs uppercase"
              style={{
                color: designTokens.colors.foreground.secondary,
                letterSpacing: designTokens.typography.letterSpacing.wider,
              }}
            >
              Cargando producto...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: designTokens.colors.background.primary }}
      >
        <Navbar />
        <main className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p
              className="text-xs uppercase mb-4"
              style={{
                color: designTokens.colors.foreground.secondary,
                letterSpacing: designTokens.typography.letterSpacing.widest,
              }}
            >
              {error || "Producto no encontrado"}
            </p>
            <Link
              to="/catalogo"
              className="inline-block px-8 py-3 text-xs font-semibold uppercase"
              style={{
                backgroundColor: designTokens.buttons.primary.background,
                color: designTokens.buttons.primary.text,
                letterSpacing: designTokens.buttons.primary.letterSpacing,
                borderRadius: designTokens.buttons.primary.borderRadius,
              }}
            >
              Ver Catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryName = product.category?.name || "EQUIPOS";
  const brandName = product.category?.name || "NUBEO";
  const inStock = product.stock > 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: designTokens.colors.background.primary }}
    >
      <Navbar />

      <main className="pt-16" ref={contentRef}>
        {/* Breadcrumb */}
        <div
          className={`py-6 ${isVisible("breadcrumb") ? "animate-fade-in-up" : "opacity-0"}`}
          style={{
            paddingLeft: designTokens.spacing.section.paddingX,
            paddingRight: designTokens.spacing.section.paddingX,
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: designTokens.spacing.container.maxWidth }}
          >
            <nav className="flex items-center gap-2 text-xs uppercase" style={{ letterSpacing: designTokens.typography.letterSpacing.wider }}>
              <Link
                to="/"
                className="transition-colors"
                style={{ color: designTokens.colors.foreground.secondary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = designTokens.colors.foreground.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = designTokens.colors.foreground.secondary)}
              >
                Inicio
              </Link>
              <ChevronRightIcon />
              <Link
                to={`/catalogo?categoria=${categoryName.toLowerCase()}`}
                className="transition-colors"
                style={{ color: designTokens.colors.foreground.secondary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = designTokens.colors.foreground.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = designTokens.colors.foreground.secondary)}
              >
                {categoryName}
              </Link>
              <ChevronRightIcon />
              <span style={{ color: designTokens.colors.accent.primary }}>{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section
          className="pb-24"
          style={{
            paddingLeft: designTokens.spacing.section.paddingX,
            paddingRight: designTokens.spacing.section.paddingX,
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: designTokens.spacing.container.maxWidth }}
          >
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Image Gallery (60%) */}
              <div
                className={`w-full lg:w-[60%] ${isVisible("gallery") ? "animate-fade-in-up delay-100" : "opacity-0"}`}
              >
                {/* Main Image */}
                <div
                  className="relative aspect-square mb-4 overflow-hidden"
                  style={{
                    backgroundColor: designTokens.colors.background.elevated,
                    borderRadius: designTokens.borders.radius.lg,
                    border: `${designTokens.borders.width.default} solid ${designTokens.colors.border.default}`,
                  }}
                >
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className="aspect-square overflow-hidden transition-all"
                      style={{
                        backgroundColor: designTokens.colors.background.elevated,
                        borderRadius: designTokens.borders.radius.default,
                        border: `${designTokens.borders.width.default} solid ${
                          selectedImage === idx
                            ? designTokens.colors.border.active
                            : designTokens.colors.border.default
                        }`,
                      }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} vista ${idx + 1}`}
                        className="w-full h-full object-contain p-2"
                        crossOrigin="anonymous"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Product Info (40%) */}
              <div
                className={`w-full lg:w-[40%] ${isVisible("info") ? "animate-fade-in-up delay-200" : "opacity-0"}`}
              >
                {/* Brand */}
                <p
                  className="text-xs uppercase mb-2"
                  style={{
                    color: designTokens.colors.foreground.secondary,
                    letterSpacing: designTokens.typography.letterSpacing.wider,
                  }}
                >
                  {brandName}
                </p>

                {/* Product Name */}
                <h1
                  className="text-3xl sm:text-4xl font-semibold mb-4"
                  style={{
                    color: designTokens.colors.foreground.primary,
                    lineHeight: designTokens.typography.lineHeight.tight,
                  }}
                >
                  {product.name}
                </h1>

                {/* Price */}
                <p
                  className="text-2xl font-bold mb-4"
                  style={{ color: designTokens.colors.accent.primary }}
                >
                  ${product.price.toLocaleString("es-CL")}
                </p>

                {/* Stock Badge */}
                <div className="mb-6">
                  {inStock ? (
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium uppercase rounded-full"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        color: "#22c55e",
                        letterSpacing: designTokens.typography.letterSpacing.wide,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      En Stock
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium uppercase rounded-full"
                      style={{
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        color: "#ef4444",
                        letterSpacing: designTokens.typography.letterSpacing.wide,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Agotado
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p
                  className="mb-8"
                  style={{
                    color: designTokens.colors.foreground.secondary,
                    fontSize: designTokens.typography.fontSize.sm,
                    lineHeight: designTokens.typography.lineHeight.relaxed,
                  }}
                >
                  {product.description || "Equipo de vapeo premium con tecnología avanzada y diseño ergonómico. Ideal para usuarios que buscan calidad y rendimiento superior."}
                </p>

                {/* Quantity Selector */}
                <div className="mb-4">
                  <label
                    className="block text-xs uppercase mb-2"
                    style={{
                      color: designTokens.colors.foreground.secondary,
                      letterSpacing: designTokens.typography.letterSpacing.wider,
                    }}
                  >
                    Cantidad
                  </label>
                  <div
                    className="inline-flex items-center"
                    style={{
                      border: `${designTokens.borders.width.default} solid ${designTokens.colors.border.default}`,
                      borderRadius: designTokens.borders.radius.default,
                    }}
                  >
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50"
                      style={{ color: designTokens.colors.foreground.primary }}
                    >
                      <MinusIcon />
                    </button>
                    <span
                      className="w-12 text-center font-medium"
                      style={{
                        color: designTokens.colors.foreground.primary,
                        fontSize: designTokens.typography.fontSize.sm,
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50"
                      style={{ color: designTokens.colors.foreground.primary }}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!inStock}
                  className="w-full py-4 text-xs font-semibold uppercase transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                  style={{
                    backgroundColor: designTokens.buttons.primary.background,
                    color: designTokens.buttons.primary.text,
                    letterSpacing: designTokens.buttons.primary.letterSpacing,
                    borderRadius: designTokens.buttons.primary.borderRadius,
                  }}
                >
                  Agregar al Carrito
                </button>

                {/* Add to Favorites Button */}
                <button
                  className="w-full py-4 text-xs font-semibold uppercase flex items-center justify-center gap-2 transition-all mb-8"
                  style={{
                    backgroundColor: designTokens.buttons.secondary.background,
                    color: designTokens.buttons.secondary.text,
                    border: designTokens.buttons.secondary.border,
                    letterSpacing: designTokens.buttons.secondary.letterSpacing,
                    borderRadius: designTokens.buttons.secondary.borderRadius,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = designTokens.buttons.secondary.backgroundHover;
                    e.currentTarget.style.border = designTokens.buttons.secondary.borderHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = designTokens.buttons.secondary.background;
                    e.currentTarget.style.border = designTokens.buttons.secondary.border;
                  }}
                >
                  <HeartIcon />
                  Agregar a Favoritos
                </button>

                {/* Divider */}
                <div
                  className="mb-6"
                  style={{
                    height: designTokens.borders.width.default,
                    backgroundColor: designTokens.colors.border.default,
                  }}
                />

                {/* Specs Mini Table */}
                <div
                  className={`${isVisible("specs") ? "animate-fade-in-up delay-300" : "opacity-0"}`}
                >
                  <h3
                    className="text-xs uppercase font-medium mb-4"
                    style={{
                      color: designTokens.colors.foreground.primary,
                      letterSpacing: designTokens.typography.letterSpacing.wider,
                    }}
                  >
                    Especificaciones
                  </h3>
                  <div className="space-y-3">
                    <SpecRow label="Marca" value={brandName} />
                    <SpecRow label="Modelo" value={product.name} />
                    <SpecRow label="Potencia" value="200W máx." />
                    <SpecRow label="Resistencia" value="0.1Ω - 3.0Ω" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section
          className={`pb-24 ${isVisible("tabs") ? "animate-fade-in-up delay-400" : "opacity-0"}`}
          style={{
            paddingLeft: designTokens.spacing.section.paddingX,
            paddingRight: designTokens.spacing.section.paddingX,
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: designTokens.spacing.container.maxWidth }}
          >
            {/* Tab Headers */}
            <div
              className="flex gap-8 mb-8"
              style={{
                borderBottom: `${designTokens.borders.width.default} solid ${designTokens.colors.border.default}`,
              }}
            >
              <TabButton
                active={activeTab === "descripcion"}
                onClick={() => setActiveTab("descripcion")}
              >
                Descripción
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
                Reseñas
              </TabButton>
            </div>

            {/* Tab Content */}
            <div
              className="min-h-[200px]"
              style={{
                color: designTokens.colors.foreground.secondary,
                fontSize: designTokens.typography.fontSize.sm,
                lineHeight: designTokens.typography.lineHeight.relaxed,
              }}
            >
              {activeTab === "descripcion" && (
                <div className="space-y-4">
                  <p>
                    {product.description ||
                      "El equipo premium que estabas buscando. Diseñado con los más altos estándares de calidad, este dispositivo ofrece una experiencia de vapeo inigualable."}
                  </p>
                  <p>
                    Cuenta con tecnología de chipset avanzada que garantiza una respuesta instantánea y un rendimiento consistente. Su diseño ergonómico permite un agarre cómodo durante uso prolongado.
                  </p>
                  <p>
                    Compatible con una amplia gama de atomizadores y resistencias, este equipo se adapta a tu estilo de vapeo preferido.
                  </p>
                </div>
              )}
              {activeTab === "especificaciones" && (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6"
                  style={{
                    backgroundColor: designTokens.colors.background.surface,
                    borderRadius: designTokens.borders.radius.lg,
                    border: `${designTokens.borders.width.default} solid ${designTokens.colors.border.default}`,
                  }}
                >
                  <SpecDetailRow label="Marca" value={brandName} />
                  <SpecDetailRow label="Modelo" value={product.name} />
                  <SpecDetailRow label="Potencia Máxima" value="200W" />
                  <SpecDetailRow label="Rango de Resistencia" value="0.1Ω - 3.0Ω" />
                  <SpecDetailRow label="Tipo de Batería" value="Dual 18650" />
                  <SpecDetailRow label="Capacidad de Tanque" value="5.5ml" />
                  <SpecDetailRow label="Material" value="Aleación de Zinc" />
                  <SpecDetailRow label="Pantalla" value="TFT Color 0.96&quot;" />
                </div>
              )}
              {activeTab === "resenas" && (
                <div className="text-center py-12">
                  <p style={{ color: designTokens.colors.foreground.secondary }}>
                    Aún no hay reseñas para este producto.
                  </p>
                  <button
                    className="mt-4 px-6 py-2 text-xs font-semibold uppercase"
                    style={{
                      backgroundColor: designTokens.colors.accent.primaryMuted,
                      color: designTokens.colors.accent.primary,
                      letterSpacing: designTokens.typography.letterSpacing.wide,
                      borderRadius: designTokens.borders.radius.default,
                      border: `${designTokens.borders.width.default} solid ${designTokens.colors.accent.primaryBorder}`,
                    }}
                  >
                    Escribir Reseña
                  </button>
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

// Helper Components

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span
        className="text-xs uppercase"
        style={{
          color: designTokens.colors.foreground.secondary,
          letterSpacing: designTokens.typography.letterSpacing.wider,
        }}
      >
        {label}
      </span>
      <span
        className="text-sm"
        style={{ color: designTokens.colors.foreground.primary }}
      >
        {value}
      </span>
    </div>
  );
}

function SpecDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-xs uppercase"
        style={{
          color: designTokens.colors.foreground.secondary,
          letterSpacing: designTokens.typography.letterSpacing.wider,
        }}
      >
        {label}
      </span>
      <span style={{ color: designTokens.colors.foreground.primary }}>
        {value}
      </span>
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
      className="pb-4 text-xs font-medium uppercase transition-colors relative"
      style={{
        color: active
          ? designTokens.colors.accent.primary
          : designTokens.colors.foreground.secondary,
        letterSpacing: designTokens.typography.letterSpacing.wider,
      }}
    >
      {children}
      {active && (
        <span
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: designTokens.colors.accent.primary }}
        />
      )}
    </button>
  );
}

// Icons

function ChevronRightIcon() {
  return (
    <svg
      width={designTokens.icons.size.xs}
      height={designTokens.icons.size.xs}
      viewBox="0 0 24 24"
      fill="none"
      stroke={designTokens.colors.foreground.secondary}
      strokeWidth={designTokens.icons.stroke.width}
      strokeLinecap={designTokens.icons.stroke.lineCap}
      strokeLinejoin={designTokens.icons.stroke.lineJoin}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width={designTokens.icons.size.sm}
      height={designTokens.icons.size.sm}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={designTokens.icons.stroke.width}
      strokeLinecap={designTokens.icons.stroke.lineCap}
      strokeLinejoin={designTokens.icons.stroke.lineJoin}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width={designTokens.icons.size.sm}
      height={designTokens.icons.size.sm}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={designTokens.icons.stroke.width}
      strokeLinecap={designTokens.icons.stroke.lineCap}
      strokeLinejoin={designTokens.icons.stroke.lineJoin}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width={designTokens.icons.size.md}
      height={designTokens.icons.size.md}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={designTokens.icons.stroke.width}
      strokeLinecap={designTokens.icons.stroke.lineCap}
      strokeLinejoin={designTokens.icons.stroke.lineJoin}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
