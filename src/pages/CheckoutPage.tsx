import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Mock cart data for display
const mockCartItems = [
  {
    id: 1,
    name: "Voopoo Drag X Plus",
    brand: "VOOPOO",
    price: 54990,
    quantity: 1,
  },
  {
    id: 2,
    name: "Freemax Maxus Pro Tank",
    brand: "FREEMAX",
    price: 32990,
    quantity: 2,
  },
  {
    id: 3,
    name: "Nasty Juice Trap Queen",
    brand: "NASTY JUICE",
    price: 8990,
    quantity: 3,
  },
];

const provincias = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "CABA",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

export function CheckoutPage() {
  const subtotal = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Title */}
          <div className="animate-fade-in-up mb-10">
            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">
              CHECKOUT
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT COLUMN - Shipping & Payment Form */}
            <div className="lg:w-[60%] space-y-8">
              {/* Shipping Data Section */}
              <section
                className="animate-fade-in-up bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-6"
                style={{ animationDelay: "100ms" }}
              >
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-6">
                  DATOS DE ENVIO
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre completo */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors"
                      placeholder="juan@email.com"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors"
                      placeholder="+54 11 1234 5678"
                    />
                  </div>

                  {/* Dirección */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Direccion
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors"
                      placeholder="Av. Corrientes 1234, Piso 5, Depto A"
                    />
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors"
                      placeholder="Buenos Aires"
                    />
                  </div>

                  {/* Provincia */}
                  <div>
                    <label
                      htmlFor="province"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Provincia
                    </label>
                    <select
                      id="province"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm focus:border-[#00D4FF] focus:outline-none transition-colors appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-[#444444]">
                        Seleccionar provincia
                      </option>
                      {provincias.map((provincia) => (
                        <option key={provincia} value={provincia}>
                          {provincia}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Código postal */}
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-xs text-[#444444] uppercase tracking-[0.1em] mb-2"
                    >
                      Codigo postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md px-4 py-3 text-white text-sm placeholder:text-[#444444] focus:border-[#00D4FF] focus:outline-none transition-colors"
                      placeholder="1414"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method Section */}
              <section
                className="animate-fade-in-up bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-6"
                style={{ animationDelay: "200ms" }}
              >
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-6">
                  METODO DE PAGO
                </h2>

                {/* Stripe Branding Card */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-[#080808] border border-[#1a1a1a] rounded-md">
                  <LockIcon />
                  <span className="text-sm text-[#444444]">
                    Pago seguro con Stripe
                  </span>
                  <div className="ml-auto">
                    <StripeBadge />
                  </div>
                </div>

                {/* Stripe Card Element Placeholder */}
                <div
                  id="stripe-card-element"
                  className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-md p-4 min-h-[50px] flex items-center"
                >
                  <span className="text-[#444444] text-sm">
                    El elemento de tarjeta se cargara aqui
                  </span>
                </div>

                {/* Stripe Error Message Area */}
                <div className="mt-3 min-h-[20px]">
                  {/* Error messages will appear here */}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN - Order Summary */}
            <div className="lg:w-[40%]">
              <div
                className="animate-fade-in-up bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-6 lg:sticky lg:top-24"
                style={{ animationDelay: "300ms" }}
              >
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-6">
                  RESUMEN DEL PEDIDO
                </h2>

                {/* Cart Items List */}
                <div className="space-y-4 mb-6">
                  {mockCartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b border-[#1a1a1a] last:border-b-0 last:pb-0"
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-16 h-16 bg-[#080808] border border-[#1a1a1a] rounded-md flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-10 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] rounded" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#444444] uppercase tracking-[0.1em]">
                          {item.brand}
                        </span>
                        <p className="text-sm text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#444444]">
                          Cant: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm text-white font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#444444]">Subtotal</span>
                    <span className="text-sm text-white">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#444444]">Envio</span>
                    <span className="text-sm text-[#00D4FF]">Envio gratis</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#1a1a1a] my-4" />

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-white uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[#00D4FF]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Confirm Order Button */}
                <button className="w-full py-4 bg-[#00D4FF] text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors">
                  CONFIRMAR PEDIDO
                </button>

                {/* Secure Payment Notice */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <LockIcon className="w-4 h-4 text-[#444444]" />
                  <span className="text-xs text-[#444444]">
                    Pago 100% seguro
                  </span>
                </div>

                {/* Stripe Logo Badge */}
                <div className="flex items-center justify-center mt-4">
                  <StripeBadgeFull />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LockIcon({ className = "w-5 h-5 text-[#00D4FF]" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function StripeBadge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="16"
      viewBox="0 0 60 25"
      fill="none"
    >
      <path
        d="M59.64 14.28c0-4.83-2.35-8.64-6.85-8.64-4.52 0-7.25 3.81-7.25 8.6 0 5.67 3.23 8.54 7.86 8.54 2.26 0 3.97-.51 5.26-1.23v-3.78c-1.29.65-2.77 1.05-4.64 1.05-1.84 0-3.47-.65-3.68-2.88h9.27c0-.25.03-1.23.03-1.66zm-9.37-1.79c0-2.14 1.31-3.03 2.51-3.03 1.17 0 2.4.89 2.4 3.03h-4.91zM38.9 5.64c-1.86 0-3.05.87-3.72 1.47l-.25-1.17h-4.17v22.14l4.73-1.01.01-5.37c.68.49 1.68 1.19 3.34 1.19 3.38 0 6.45-2.72 6.45-8.71-.01-5.48-3.14-8.54-6.39-8.54zm-1.12 13.11c-1.11 0-1.77-.4-2.23-.89l-.02-7.02c.49-.54 1.17-.92 2.25-.92 1.72 0 2.91 1.93 2.91 4.4 0 2.53-1.17 4.43-2.91 4.43zM25.33.5l-4.75 1.01v3.87l4.75-1.01V.5zM20.58 5.94h4.75v16.61h-4.75V5.94zM15.87 7.61l-.3-1.67h-4.1v16.61h4.73V11.5c1.12-1.46 3.01-1.19 3.6-1.19V5.94c-.61 0-2.82-.25-3.93 1.67zM6.24 2.23L1.6 3.2l-.02 15.21c0 2.81 2.11 4.88 4.92 4.88 1.56 0 2.7-.29 3.32-.63v-3.84c-.61.25-3.61 1.12-3.61-1.69V9.69h3.61V5.94H6.21l.03-3.71z"
        fill="#6772E5"
      />
    </svg>
  );
}

function StripeBadgeFull() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#080808] border border-[#1a1a1a] rounded-md">
      <span className="text-[10px] text-[#444444] uppercase tracking-[0.1em]">
        Powered by
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="20"
        viewBox="0 0 60 25"
        fill="none"
      >
        <path
          d="M59.64 14.28c0-4.83-2.35-8.64-6.85-8.64-4.52 0-7.25 3.81-7.25 8.6 0 5.67 3.23 8.54 7.86 8.54 2.26 0 3.97-.51 5.26-1.23v-3.78c-1.29.65-2.77 1.05-4.64 1.05-1.84 0-3.47-.65-3.68-2.88h9.27c0-.25.03-1.23.03-1.66zm-9.37-1.79c0-2.14 1.31-3.03 2.51-3.03 1.17 0 2.4.89 2.4 3.03h-4.91zM38.9 5.64c-1.86 0-3.05.87-3.72 1.47l-.25-1.17h-4.17v22.14l4.73-1.01.01-5.37c.68.49 1.68 1.19 3.34 1.19 3.38 0 6.45-2.72 6.45-8.71-.01-5.48-3.14-8.54-6.39-8.54zm-1.12 13.11c-1.11 0-1.77-.4-2.23-.89l-.02-7.02c.49-.54 1.17-.92 2.25-.92 1.72 0 2.91 1.93 2.91 4.4 0 2.53-1.17 4.43-2.91 4.43zM25.33.5l-4.75 1.01v3.87l4.75-1.01V.5zM20.58 5.94h4.75v16.61h-4.75V5.94zM15.87 7.61l-.3-1.67h-4.1v16.61h4.73V11.5c1.12-1.46 3.01-1.19 3.6-1.19V5.94c-.61 0-2.82-.25-3.93 1.67zM6.24 2.23L1.6 3.2l-.02 15.21c0 2.81 2.11 4.88 4.92 4.88 1.56 0 2.7-.29 3.32-.63v-3.84c-.61.25-3.61 1.12-3.61-1.69V9.69h3.61V5.94H6.21l.03-3.71z"
          fill="#6772E5"
        />
      </svg>
    </div>
  );
}
