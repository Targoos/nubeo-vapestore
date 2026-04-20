import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Footer />
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111111] border-t-4 border-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            NUBEO
          </span>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="/terminos"
              className="text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-[#FFE600] transition-colors"
            >
              Términos
            </a>
            <a
              href="/privacidad"
              className="text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-[#FFE600] transition-colors"
            >
              Privacidad
            </a>
            <a
              href="/contacto"
              className="text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-[#FFE600] transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm font-mono text-gray-500">
            &copy; 2026 NUBEO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
