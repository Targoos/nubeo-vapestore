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
    <footer className="bg-[#0a0a0a] border-t-3 border-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <span className="text-xl font-black tracking-[-0.08em] text-white uppercase">
            NUBEO
          </span>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-8">
            <a
              href="/terminos"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacidad"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="/contacto"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-[0.1em] text-neutral-600 uppercase">
            2026 NUBEO
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
