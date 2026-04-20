import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { FeaturedProducts } from "./components/FeaturedProducts";

function App() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Footer />
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
              NUBEO
            </span>
            <p className="mt-4 text-sm text-[#444444] leading-relaxed">
              Equipos de vapeo premium y accesorios. Calidad en la que puedes confiar.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-xs tracking-[0.15em] text-white uppercase font-medium">
              Tienda
            </span>
            <ul className="mt-4 space-y-3">
              <li><FooterLink href="/equipos">Equipos</FooterLink></li>
              <li><FooterLink href="/atomizadores">Atomizadores</FooterLink></li>
              <li><FooterLink href="/repuestos">Repuestos</FooterLink></li>
              <li><FooterLink href="/esencias">Esencias</FooterLink></li>
            </ul>
          </div>

          <div>
            <span className="text-xs tracking-[0.15em] text-white uppercase font-medium">
              Soporte
            </span>
            <ul className="mt-4 space-y-3">
              <li><FooterLink href="/contacto">Contacto</FooterLink></li>
              <li><FooterLink href="/faq">Preguntas Frecuentes</FooterLink></li>
              <li><FooterLink href="/envios">Envíos</FooterLink></li>
              <li><FooterLink href="/devoluciones">Devoluciones</FooterLink></li>
            </ul>
          </div>

          <div>
            <span className="text-xs tracking-[0.15em] text-white uppercase font-medium">
              Legal
            </span>
            <ul className="mt-4 space-y-3">
              <li><FooterLink href="/terminos">Términos</FooterLink></li>
              <li><FooterLink href="/privacidad">Privacidad</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#444444]">
            2026 Nubeo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <SocialLink href="#" aria-label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <TwitterIcon />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm text-[#444444] hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function SocialLink({ href, children, ...props }: { href: string; children: React.ReactNode; "aria-label": string }) {
  return (
    <a
      href={href}
      className="p-2 text-[#444444] hover:text-[#00D4FF] transition-colors"
      {...props}
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

export default App;
