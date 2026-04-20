import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[#444444] text-xs uppercase tracking-[0.2em] mb-4">En construcción</p>
          <h1 className="text-4xl font-bold text-white uppercase tracking-tight">Iniciar sesión</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
